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
   routines console). The file's body below its first line is the prompt
   verbatim; the only intended difference is the trailing newline.

If the two ever disagree, the cloud copy is what ran — reconcile toward
whichever is *correct*, then fix both.

## Inventory

| Routine | ID | Schedule | Model | Prompt |
|---|---|---|---|---|
| Agentic AI Wiki — daily content batch | `trig_01HqEwzFioT3yAUYVxVbiZZY` | `0 8 * * *` UTC (1am PDT / midnight PST) | `claude-opus-5` | [`daily-content-batch.prompt.md`](./daily-content-batch.prompt.md) |

Manage at <https://claude.ai/code/routines>. Routines cannot be deleted through
the API — use that page.

**DST caveat:** cron is fixed UTC, so the daily batch fires an hour earlier in
local terms each winter. Harmless; `0 9 * * *` would pin it to 1am year-round
at the cost of drifting the other way in summer.

## Daily content batch — what it does and why it is shaped this way

Ships **2 AI Blog posts and 3 pages** across Concepts / Deep-Dives / Playbooks /
Operations in a single PR, squash-merged to `main`, which auto-deploys. It may
go up to 5 non-blog pages when the material justifies it.

| Decision | Choice | Why |
|---|---|---|
| Sections in scope | Concepts, Deep-Dives, Playbooks, Operations | Field Guide is a numbered linear curriculum; inserting a chapter renumbers the series. |
| Count | 2 blog + 3 pages floor, 5 pages ceiling | Guarantees a daily floor without forcing padding on a thin news day. |
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
