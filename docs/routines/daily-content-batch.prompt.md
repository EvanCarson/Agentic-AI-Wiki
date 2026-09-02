You are shipping the daily content batch for the **Agentic AI Wiki** — a bilingual (English/Chinese) static Astro site, live at https://menuagentic.com, in this repository.

Goal: ship **2 AI Blog posts and 3 pages** across Concepts / Deep-Dives / Playbooks / Operations — end-to-end, merged to `main`, in ONE pull request. Go up to 5 non-blog pages (7 total) only when the gap list and the week's material genuinely justify it. You have standing authorization from the owner to pick the topics and to merge without asking.

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

with the shared class vocabulary (`<div class="callout">`, `<div class="callout tip">`, `<code class="inline">`, `<a class="xref">`, `<pre class="standalone">`). Only three things vary by section:

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

## 2. Pick the topics — derive the gap list yourself

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

File each page where it actually belongs. When a topic could honestly sit in two sections, break the tie toward the **thinner** one — take the current sizes from the manifests you just read (on 2026-07-28 they were Deep-Dives 102 entries, Concepts 63, Operations 41, Playbooks 31). That is a tiebreaker, not an override: never file a page somewhere it does not belong in order to even out a count.

**Field Guide is off-limits.** It is a numbered linear curriculum; inserting a chapter renumbers the series.

**Blog posts.** Two per run. The corpus runs roughly two-thirds "X vs Y vs Z" comparisons and one-third news analysis — pick whichever the week actually warrants, including two of the same kind. Prefer a post you can ground in verified specifics over one you can only assert.

## 3. Quality bar — this is the part that matters

Each page must **argue one non-obvious, load-bearing point**, not survey a field. Read `src/content/concepts/en/small-and-local-models.html` and `src/content/concepts/en/agent-cost-control.html` for the register: specific numbers, named trade-offs, opinionated recommendations, and a closing `<div class="callout tip">` telling the reader what to actually do.

- The opening `p.goal` — `p.lede` on a blog post — must follow CLAUDE.md's "document openers" rule: lead with the stakes, name the takeaway, no throat-clearing, no "TL;DR".
- Cross-link with `<a class="xref" href="…">` ONLY to pages that actually exist, and mind the group segment for Deep-Dives, Playbooks and Operations. `npm run verify` fails on a broken internal link.
- **Verify volatile facts with WebSearch** — protocol versions, adoption numbers, product names, pricing, release dates. Never write a current-events claim from memory. Prefer durable statements over datable ones.
- Chinese must be a faithful, fluent translation, never machine-literal. `<pre>` blocks must be byte-identical between locales; translate prose only. Internal links in `zh/` fragments take the `/zh/` prefix.

**Ship fewer rather than pad.** If a topic will not yield a real argument, drop it and ship what is left — the floor is 2 blog posts + 3 pages. A padded page is worse than no page on a wiki whose whole pitch is that every page argues something. Say in your report what you dropped and why.

**Voice is not delegable.** Parallelize the run however you like. But every English sentence that ships passes through one editing pass by you, and every Chinese page is written by you against your own English — never by a context that never read the argument. A draft that cannot reach register in one pass gets thrown away, not patched.

## 4. Blog-specific mechanics

`AUTHORING.md` governs. These four break silently:

- **SVGs** under `public/blogs/<slug>/` — viewBox-based, themeable colours only (`var(--ink)`, `var(--surface)`, `var(--accent, #d4421e)`, …; a bare hex is allowed only as the fallback inside `var()`), each with `role="img"` + `<title>` + `<desc>` + `aria-labelledby`, and no `<script>` or `on*=` handlers. Label geometry is enforced too, not just eyeballed: a CSS class-level `text-anchor` silently beats a per-element `text-anchor="start"/"end"` presentation attribute — that one bug has shipped two different visible symptoms, so check for both when hand-authoring a new diagram. First, two labels overlapping each other (once shipped 46px overlapping) or a label clipped past the viewBox (once shipped 8px over). Second, and easier to miss because nothing else on the page looks wrong, a label recentred onto a filled box it was never meant to touch — a row label that should end flush against a column of cells instead bleeds into the first one, or a legend entry lands on top of its own colour swatch. `npm run test:design` renders every blog post's inlined SVGs in a real browser and checks all three: same-line label collisions, labels escaping their viewBox, and labels sitting on a filled box (with an explicit, commented allowlist for the legitimate case — an arrow-crossing annotation centred on the connector between two boxes it legitimately grazes). It must pass before a content PR merges, same as every other gate in §6.
- **FAQ** — `<section class="faq">` with each `<h3>` immediately followed by a `<p>`, and no nested `<section>`. The JSON-LD parser bails at the first `</section>` and drops everything after it without warning.
- **Dates** — the post filename's date prefix must equal the `date:` field, and both must equal the actual merge day.
- **Tags** — lowercase kebab-case; reuse tags already present in `posts/*.ts` rather than minting near-duplicates.

## 5. Register and record

- Register every non-blog page in its section's manifest or group file (table in §1), with bilingual title, summary and group.
- Add ONE changelog entry at `src/content/changelog/entries/<YYYY-MM-DD>-<slug>.ts` covering the whole batch — blog posts and pages together. The filename date prefix MUST equal the `date` field and MUST be the actual merge day; get it with `date -u +%F`. A test enforces this.

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

Fix whatever fails. **Do not merge red, and never weaken, skip or delete a test to make it pass.** Note: `test:design` drives a real browser via Playwright. If the browser binary cannot be installed in this environment, say so explicitly in your report and continue with the other gates: CI runs `npm test` and `npm run test:design` on every pull request as the required `gates` check (`.github/workflows/ci.yml`), so the guard still runs before anything merges. A genuine assertion failure — locally or in CI — is not acceptable; fix it on the branch.

## 7. Ship

- Branch `content/batch-<YYYY-MM-DD>`, ONE pull request, squash-merge to `main`. `main` is protected — a PR is required and direct pushes are rejected.
- After opening the pull request, wait for the required `gates` check to finish: `gh pr checks <number> --watch --fail-fast` (about 6–8 minutes). Merge only once it is green — `main` requires it, and `gh pr merge` is refused while it is pending or red. If it is red, fix the cause on the branch and push again; never merge around it.
- Merging auto-deploys to production. Afterwards confirm every new page returns HTTP 200 on https://menuagentic.com in BOTH locales, using the URL shapes in §1: blog posts at `/blogs/<slug>/`, Concepts at `/concepts/<slug>/`, and Deep-Dives / Playbooks / Operations at `/<section>/<group-key>/<slug>/` — each also under `/zh/`.
- If `gh` is not authenticated and you cannot merge, push the branch, open the PR if possible, and clearly report that it awaits a manual merge. Do not force anything.

## Scope

Content only. Do not change CSS, layouts, components or design tokens — an unrelated design change does not belong in a content PR.

## Report

End with: the blog posts and pages shipped (slug + section), anything dropped and why, each gate's result, the PR link, and the live-verification status.
