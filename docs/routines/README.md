# Routines

Scheduled **cloud** Claude Code agents that ship work to this repository on a
cron schedule. Each one runs in an isolated cloud session with its own fresh
clone — it cannot see anything on a maintainer's machine, so **everything the
agent needs to know must live in its prompt or in the repo itself**
(`CLAUDE.md`, `src/content/blogs/AUTHORING.md`, the manifests).

This directory tracks the prompts under version control. It is documentation,
not configuration: nothing here is read at build time, and editing a file here
does not change what the cloud agent does.

## The sync rule

The cloud routine is what **executes**. The `.prompt.md` file here is the
copy that gets **reviewed** — the reason it exists is that a prompt which
merges to production unattended deserves the same review as code, and a prompt
that only lives in a web console gets none.

They are kept in step by hand. Changing a routine is therefore two steps, and
skipping either one is the failure mode this directory exists to make visible:

1. Edit the `.prompt.md` file and merge it, so the change is reviewed and the
   history records who changed what and why.
2. Push the same text to the routine (`/schedule` in Claude Code, or the
   routines console). The file is the prompt verbatim, from its first line;
   the only intended difference is the trailing newline.

If the two ever disagree, the cloud copy is what ran — reconcile toward
whichever is *correct*, then fix both.

## Inventory

| Routine | ID | Schedule | Model | Prompt |
|---|---|---|---|---|
| Agentic AI Wiki — daily content batch | `trig_01HqEwzFioT3yAUYVxVbiZZY` | `0 8 * * *` UTC (1am PDT / midnight PST) | `claude-opus-5` | [`daily-content-batch.prompt.md`](./daily-content-batch.prompt.md) |

Manage at <https://claude.ai/code/routines>. Routines cannot be deleted through
the API — use that page.

The daily batch reads one scheduled **workflow**, not a routine:
[`search-demand.yml`](../../.github/workflows/search-demand.yml) runs
`scripts/search-demand/harvest.mjs` every Monday at 06:00 UTC and uploads
`search-queue.json` as the artifact `search-queue` (90-day retention). See
"The search-demand queue" below.

**DST caveat:** cron is fixed UTC, so the daily batch fires an hour earlier in
local terms each winter. Harmless; `0 9 * * *` would pin it to 1am year-round
at the cost of drifting the other way in summer.

## Daily content batch — what it does and why it is shaped this way

Ships **2 AI Blog posts, 2 new pages** across Concepts / Deep-Dives / Playbooks /
Operations, **and 1 rebuilt existing page**, in a single PR squash-merged to
`main`, which auto-deploys. It may go up to 4 new pages when the material
justifies it, but never trades the rebuild slot away. Topics start from the
search-demand queue (§2a of the prompt) where it has something real, and from
the agent's own gap list otherwise.

| Decision | Choice | Why |
|---|---|---|
| Sections in scope | Concepts, Deep-Dives, Playbooks, Operations | Field Guide is a numbered linear curriculum; inserting a chapter renumbers the series. |
| Count | 2 blog + 2 new pages + 1 rebuild; up to 4 new pages | Guarantees a daily floor without forcing padding on a thin news day. The rebuild slot is fixed because the original seed pages were never revisited, and usefulness of what is published counts as much as adding more. |
| Rebuild pick (§2b) | A `weakPages` / `lowClickPages` entry, then a `partial` question's best-match page, then the thinnest-and-oldest page | Pages already ranking 8–30, or seen and skipped, are the cheapest traffic to win. The 2026-10-17 dry run found real questions mostly *partly* answered (9 answered, 17 partial, 4 gaps), so upgrading beats adding. |
| New-page pick (§2a) | One of the two answers a `gap` question from the queue; the gap list decides the rest | Ties supply to demand without letting a keyword heuristic set the whole agenda. The best match travels with every question, which guards against writing a page the site already has. |
| Question pages | First sentence of the lede answers in ≤30 words; the question's wording appears on the page | That is what a search engine matches and what a skimmer needs. |
| PR shape | One branch, one PR, one changelog entry | Matches the one-entry-per-PR rule in `CLAUDE.md`; one merge, one deploy. |
| Blog post type | The agent's call | The corpus is ~⅔ comparisons, ~⅓ news analysis. Mandating a mix would force a weak post in weeks that only warrant one kind. |
| Execution | The agent's call; outcome enforced | Mandating sequential work optimises the wrong thing. What matters is that a batch reads as one author in both languages, so the prompt enforces *that* and leaves the mechanism open. |
| Section tiebreak | Prefer the thinner section | A tiebreaker only — a page is never filed somewhere it does not belong in order to even out a count. |

Two clauses carry most of the quality weight, and both are easy to delete by
accident when editing:

- **Ship fewer rather than pad.** The floor is a floor, not a quota. A padded
  page is worse than no page on a wiki whose whole pitch is that every page
  argues something.
- **Voice is not delegable.** However the run parallelises, every shipped
  English sentence passes through one editing pass by the agent, and the
  Chinese is written against that same agent's English. This is the failure
  mode no gate in `npm run verify` can catch.

### The search-demand queue

`scripts/search-demand/harvest.mjs` collects questions from Google Search Console
and Bing Webmaster (when their secrets are set), Stack Exchange and Hacker News,
matches each against the site's English pages by keyword overlap, and writes
`newQuestions` (gap/partial, ranked by demand), `weakPages` and `lowClickPages`.
Design and the owner's one-off secret setup:
`docs/superpowers/specs/2026-10-18-search-demand-queue-design.md`.

- **Weekly, as an artifact.** A PR opened with the Actions token does not
  trigger the required `gates` check, so the job uploads a file instead of
  committing one. The routine downloads it with `gh run download`, and runs the
  harvester itself (public sources only) if that fails.
- **Missing secrets are fine.** Until search data exists, the queue runs on
  Stack Exchange and Hacker News, and the two page lists are empty with a `reason`.
- **Statuses are a heuristic.** The prompt tells the agent to open the best-match
  page before trusting a `gap` or `partial`.

### Repo facts the prompt depends on

These were verified against the tree on 2026-07-28. If any of them stops being
true, the prompt is wrong and needs updating in the same PR as the change:

- The four non-blog sections share **one** fragment skeleton. Only the `.week`
  label, the `.phase-num` letter, and the STEP count vary (Concepts ~4,
  Deep-Dives 5–6, Playbooks and Operations 6).
- The `.phase-num` series letter is **per group, not per section** — Deep-Dives
  uses 11 letters across its 11 group files.
- URL shapes are not uniform: Concepts and AI Blog are flat
  (`/concepts/<slug>/`, `/blogs/<slug>/`), while Deep-Dives, Playbooks and
  Operations carry a group segment (`/<section>/<group-key>/<slug>/`). This
  matters for `a.xref` targets and for the post-merge HTTP 200 check.

### Known limitation

The routine's `allowed_tools` are `Bash, Read, Write, Edit, Glob, Grep,
WebSearch, WebFetch` — there is no subagent tool, so "parallelize the run
however you like" is currently inert and every run is sequential. The clause is
kept because the voice contract attached to it still binds. Add `Task` to
`allowed_tools` if fan-out is ever wanted.
