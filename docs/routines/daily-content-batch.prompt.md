You are shipping the daily content batch for the **Agentic AI Wiki** — a bilingual (English/Chinese) static Astro site, live at https://menuagentic.com, in this repository.

Goal: ship **2 AI Blog posts, 2 new pages** across Concepts / Deep-Dives / Playbooks / Operations, **and 1 enhanced existing page** — end-to-end, merged to `main`, in ONE pull request. Go up to 4 new non-blog pages only when the gap list and the week's material genuinely justify it; never trade the enhancement slot away for a new page. You have standing authorization from the owner to pick the topics and to merge without asking.

The owner's priority, in their words: the site should "contain enough good information for people to read and use". Usefulness of what is already published counts as much as adding more.

## 1. Read the conventions first — they are in the repo and they are binding

- `CLAUDE.md` at the repo root. Read it fully before writing anything. It defines the content model, the MANDATORY changelog entry, the verification gates, and the workflow.
- `src/content/blogs/AUTHORING.md` — mandatory before drafting either blog post.
- Then open two or three existing fragments in each section you are writing into, together with their `zh/` counterparts, and MATCH THEM. Do not invent markup.

**The four non-blog sections share one skeleton.** Concepts, Deep-Dives, Playbooks and Operations all use the same fragment shape:

```html
<section class="phase">
  <div class="phase-num">…</div>
  <div class="week">…</div>
  <h2>…</h2>
  <p class="goal">…</p>
  <div class="step">
    <div class="step-num">STEP 1</div>
    <h3>…</h3>
    …
  </div>
  …
</section>
```

with the shared class vocabulary (`<div class="callout">`, `<div class="callout tip">`, `<code class="inline">`, `<a class="xref">`, `<pre class="standalone">`). `<table>` is styled ONLY in the blog layout — in non-blog fragments use lists, `<pre class="standalone">`, or a class you find in a sibling fragment. Syntax-highlight spans may use only `.c-atk .c-cm .c-err .c-fn .c-kw .c-out .c-st`. Every `<a>` in a non-blog fragment carries `class="xref"`, external links included — an unclassed link renders browser-default blue and fails the dark-mode contrast gate. Only three things vary by section:

- **The `.week` header line** — `Concepts · <Group>`, `Deep Dive · <Group>`, `Playbook · <Group>`, `Operation · <Group>`. Write ampersands as `&amp;`.
- **The `.phase-num` code** — the series letter is **per group, not per section** (Deep-Dives alone uses 11 letters across its 11 groups). Copy the letter from an existing sibling in the same group and continue from that group's current maximum. Never invent a letter: a new letter means a new group file, which is out of scope for a daily batch.
- **Length** — match the siblings: Concepts run about 4 STEPs, Deep-Dives 5–6, Playbooks and Operations 6.

**Registration and URLs differ by section:**

| Section | Register the page in | Public URL |
|---|---|---|
| Concepts | the flat `entries` array in `src/content/concepts/manifest.ts` | `/concepts/<slug>/` |
| Deep-Dives | the `entries` array in `src/content/deep-dives/groups/<key>.ts` | `/deep-dives/<key>/<slug>/` |
| Playbooks | `src/content/playbooks/groups/<key>.ts` | `/playbooks/<key>/<slug>/` |
| Operations | `src/content/operations/groups/<key>.ts` | `/operations/<key>/<slug>/` |
| AI Blog | a new file `src/content/blogs/posts/<merge-date>-<slug>.ts` | `/blogs/<slug>/` |

Chinese routes are the same paths under `/zh/`. Every registered entry carries a bilingual title, summary and group.

**Out of scope: the Books section** (`src/content/books/`). It is a hand-edited book; never add or edit book chapters.

## 2. Pick the new topics — derive the gap list yourself

Do not trust any candidate list you were handed; it ages. Read, in full:

- `src/content/concepts/manifest.ts`
- `src/content/deep-dives/groups/*.ts`, `src/content/playbooks/groups/*.ts`, `src/content/operations/groups/*.ts`
- `src/content/blogs/posts/*.ts` — every existing post and its tags
- the ten most recent files in `src/content/changelog/entries/`

**Where a topic belongs:**

- **Concepts** — defines one idea; encyclopedia length.
- **Deep-Dive** — a long essay developing one theme inside an existing group.
- **Playbook** — how to *build* a particular class of agent.
- **Operation** — how to *run, evaluate or govern* an agent in production.

File each page where it actually belongs. When a topic could honestly sit in two sections, break the tie toward the **thinner** one (count entries in the manifests you just read). That is a tiebreaker, not an override: never file a page somewhere it does not belong in order to even out a count.

**Field Guide is off-limits.** It is a numbered linear curriculum; inserting a chapter renumbers the series.

**Blog posts.** Two per run. The corpus runs roughly two-thirds "X vs Y vs Z" comparisons and one-third news analysis — pick whichever the week actually warrants, including two of the same kind. Prefer a post you can ground in verified specifics over one you can only assert.

## 2a. Start from what readers search for

A weekly job (`.github/workflows/search-demand.yml`) ranks real questions — Google and Bing search queries, Stack Exchange, Hacker News — against the site's own pages. Consult it before the gap list.

- **Load the queue.** `gh run download "$(gh run list --workflow search-demand.yml --status success --limit 1 --json databaseId -q '.[0].databaseId')" -n search-queue -D /tmp/sq` writes `/tmp/sq/search-queue.json`. If that fails (no `gh` auth, no run yet, artifact expired), run `node scripts/search-demand/harvest.mjs --out /tmp/sq/search-queue.json` instead: public sources only, about a minute.
- **Read it.** `newQuestions` holds `gap` and `partial` questions ranked by demand, each with its `bestMatch` page. `weakPages` (ranking 8–30) and `lowClickPages` (seen, rarely clicked) fill only once search data exists; an empty list carries a `reason`. Statuses come from keyword overlap, so open the best-match page before trusting one: a `gap` may be covered in other words, and a news headline is not a question.
- **Pick from it.**
  - One of the two new pages answers a `gap` question: one a reader would actually type, that belongs in a section, and that its best match genuinely does not answer.
  - The §2b rebuild slot takes a `weakPages` or `lowClickPages` entry first, then the best-match page of a `partial` question. Only if none qualifies, fall back to §2b's thinnest-and-oldest rule. §2b's 60-day skip still applies.
  - Everything else comes from §2 as before.
- **Question-page rule.** On a page chosen to answer a question, new or rebuilt, the first sentence of `p.goal` answers the question in at most 30 words, and the question's own wording appears on the page (`h2`, lede or a STEP heading) so a search engine can match it. For a `lowClickPages` entry, rewrite the title, summary and lede against its `topQueries`.
- **Report** which queue `id`s you used, and for what. If the queue was empty or unavailable, say so and proceed as before.

## 2b. Pick and rebuild ONE existing page

The original seed pages (written May 2026, roughly 650–850 English words) were never revisited. They are correct but generic: no named products, no numbers, no sources. Newer pages around them are far richer. Each run rebuilds one.

- **Pick.** For every English fragment in Concepts / Deep-Dives / Playbooks / Operations, compute word count (`sed 's/<[^>]*>//g' <file> | wc -w`) and last-commit date (`git log -1 --format=%cs -- <file>`). Choose from the thinnest and oldest, preferring a page whose subject has moved (versions, pricing, benchmarks, protocols) or that many newer pages link to. Skip any page rebuilt in the last 60 days (search recent changelog entries for its slug). If a candidate turns out to be already specific and current, pick another — a cosmetic edit does not count.
- **Rewrite in place.** Same slug, same file paths, same `.phase-num`, same `.week` — never rename or move it; its URL is indexed. Keep what was right. Rebuild it around one load-bearing argument with verified, dated specifics ("as of <month year>"), at least one worked example, and `xref` links to newer sibling pages that now exist. Aim for roughly twice the original length, within the section's STEP norms. Write a new `p.goal` that follows the document-openers rule.
- **Refresh the entry's `summary`** (both locales) in its manifest or group file so the index describes the rebuilt page, not the old one.
- Rewrite the Chinese file against your final English, as for a new page.

## 3. Quality bar — this is the part that matters

Every page — new or rebuilt — must **argue one non-obvious, load-bearing point**, not survey a field. Read `src/content/concepts/en/small-and-local-models.html` and `src/content/concepts/en/agent-cost-control.html` for the register: specific numbers, named trade-offs, opinionated recommendations, and a closing `<div class="callout tip">` telling the reader what to actually do.

- The opening `p.goal` — `p.lede` on a blog post — must follow CLAUDE.md's "document openers" rule: lead with the stakes, name the takeaway, no throat-clearing, no "TL;DR".
- Cross-link with `<a class="xref" href="…">` ONLY to pages that actually exist, and mind the group segment for Deep-Dives, Playbooks and Operations. `npm run verify` fails on a broken internal link.
- **Verify volatile facts with WebSearch** — protocol versions, adoption numbers, product names, pricing, release dates, benchmark results. Never write a current-events claim from memory. A plausible-sounding roadmap or future claim is the highest-risk sentence on any page: verify it or cut it. Distrust any third-party figure that exactly matches a vendor's own published number — trace it to the primary. Prefer durable statements over datable ones.
- Chinese must be a faithful, fluent translation, never machine-literal. `<pre>` blocks must be byte-identical between locales; translate prose only. Internal links in `zh/` fragments take the `/zh/` prefix.

**Ship fewer rather than pad.** If a topic will not yield a real argument, drop it and ship what is left. A padded page is worse than no page on a wiki whose whole pitch is that every page argues something. Say in your report what you dropped and why.

**Voice is not delegable.** Parallelize the run however you like. But every English sentence that ships passes through one editing pass by you, and every Chinese page is written by you against your own English — never by a context that never read the argument. A draft that cannot reach register in one pass gets thrown away, not patched.

## 4. Blog-specific mechanics

`AUTHORING.md` governs. These four break silently:

- **SVGs** under `public/blogs/<slug>/` — viewBox-based, themeable colours only (`var(--ink)`, `var(--surface)`, `var(--accent, #d4421e)`, …; a bare hex is allowed only as the fallback inside `var()`), each with `role="img"` + `<title>` + `<desc>` + `aria-labelledby`, and no `<script>` or `on*=` handlers.
- **FAQ** — `<section class="faq">` with each `<h3>` immediately followed by a `<p>`, and no nested `<section>`. The JSON-LD parser bails at the first `</section>` and drops everything after it without warning.
- **Dates** — the post filename's date prefix must equal the `date:` field, and both must equal the actual merge day.
- **Tags** — lowercase kebab-case; reuse tags already present in `posts/*.ts` rather than minting near-duplicates.

## 5. Register and record

- Register every new non-blog page in its section's manifest or group file (table in §1), with bilingual title, summary and group.
- Add ONE changelog entry at `src/content/changelog/entries/<YYYY-MM-DD>-<slug>.ts` covering the whole batch. The filename date prefix MUST equal the `date` field and MUST be the actual merge day; get it with `date -u +%F`. A test enforces this.
- **The changelog `title` is a headline, not a summary: at most 110 characters in English and 60 in Chinese — a test enforces this from 2026-10-17.** Something like "Two AI Blog posts, two new pages and a rebuilt Concepts page" is right. On a phone the collapsed title is all a reader sees, and long titles made the page ~62 screens long. Put the detail — each page's argument and numbers — in the `items` bullets, one bullet per page, the rebuilt page as its own bullet saying it was rebuilt and what it now argues.

## 6. Gates — all must pass before merging

```
npm run build
npm run verify
npm test
npm run test:design
npm run search:index && npm run test:search
```

Then, for each new blog post:

```
grep -o '"@type":"BlogPosting"' dist/blogs/<slug>/index.html   # must match
grep -o '"@type":"FAQPage"'     dist/blogs/<slug>/index.html   # must match if the post has a FAQ
```

Fix whatever fails. **Do not merge red, and never weaken, skip or delete a test to make it pass.** Note: `test:design` drives a real browser via Playwright; if the browser binary cannot be installed in this environment, say so explicitly in your report and continue with the other gates — that specific infrastructure failure is acceptable for a content-only change, but a genuine assertion failure is not.

## 7. Ship

- Branch `content/batch-<YYYY-MM-DD>`, ONE pull request, squash-merge to `main`. `main` is protected — a PR is required, direct pushes are rejected, and the required `gates` check must be green: wait with `gh pr checks <n> --watch` before merging.
- Merging auto-deploys to production. Afterwards confirm every new AND rebuilt page returns HTTP 200 in BOTH locales, using the URL shapes in §1: blog posts at `/blogs/<slug>/`, Concepts at `/concepts/<slug>/`, and Deep-Dives / Playbooks / Operations at `/<section>/<group-key>/<slug>/` — each also under `/zh/`. Check against https://agentic-ai-wiki.vercel.app (same deployment); do not poll faster than every 20 seconds.
- If `gh` is not authenticated and you cannot merge, push the branch, open the PR if possible, and clearly report that it awaits a manual merge. Do not force anything.

## Scope

Content only. Do not change CSS, layouts, components or design tokens — an unrelated design change does not belong in a content PR.

## Report

End with: the blog posts and new pages shipped (slug + section), the rebuilt page (slug, section, English word count before → after, and the one-line argument it now makes), anything dropped and why, each gate's result, the PR link, and the live-verification status.
