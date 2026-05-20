# Site Enhancement Research — Design

**Date:** 2026-05-19
**Status:** Approved (pending review of this spec)
**Owner:** EvanCarson

## Goal

Run a structured discovery exercise on the Agentic AI Wiki: five parallel
research agents, each viewing the site through a different lens, generate
candidate enhancements; synthesise their output into **20 ranked ideas** (tiered
P0/P1/P2); produce HTML+PNG mockups for each; file one GitHub issue per idea
plus a single umbrella tracking issue.

This spec describes **the research workflow itself** — not any specific
enhancement. The output is research artifacts (issues + mockups + a report on a
research branch). Whether any individual idea is ever built is a separate
decision the user makes by triaging the resulting backlog.

## Why now

The site has grown organically: 22 Field Guide chapters, 33 Concepts, 51
Deep-Dives across (now) ~11 groups. `NAVIGATION-PLAN.md` already identifies IA
gaps (no lateral movement, no "start here", weak breadcrumbs). A focused
multi-lens audit lets us catch the **next** wave of issues — content gaps,
peer-site features we're missing, perf/SEO/a11y wins, retention mechanics —
before deciding what to build next.

## Non-goals

- Not implementing any of the ideas. This run produces issues + mockups only.
- Not modifying site content or structure. No `manifest.ts` edits, no new
  fragments, no changelog entry (research artifacts ≠ user-facing changes).
- Not opening a PR. The research branch is pushed so issue bodies can link to
  committed mockups by raw URL, but it stays unmerged.

## Architecture

### Orchestration

Five `Agent` subagents are dispatched **in parallel** in a single
tool-call block (per `superpowers:dispatching-parallel-agents`). Each agent is
constrained to its lens, has a uniform JSON output contract, and runs against
the same codebase snapshot (`main` @ 5b94ca3 or newer at execution time).

After all five report back, the orchestrator (main session) merges → dedupes →
ranks → tiers, then builds mockups and files issues sequentially.

```
┌─ Agent 1: UX / IA ─────────┐
├─ Agent 2: Content quality ─┤
├─ Agent 3: Competitor scan ─┤── parallel ──┐
├─ Agent 4: SEO / Perf / a11y┤              │
└─ Agent 5: Engagement ──────┘              ▼
                                  ┌──────────────────┐
                                  │ Merge + dedupe   │
                                  │ Rank → P0/P1/P2  │
                                  │ Trim to 20       │
                                  └────────┬─────────┘
                                           ▼
                                  ┌──────────────────┐
                                  │ 20× HTML mockup  │
                                  │ 40× PNG screen-  │
                                  │ shot (desk+mob)  │
                                  └────────┬─────────┘
                                           ▼
                                  ┌──────────────────┐
                                  │ Labels (idempot) │
                                  │ 20 issues + 1    │
                                  │ umbrella issue   │
                                  └──────────────────┘
```

### Agent contract

Every agent receives the same boilerplate plus a lens-specific brief, and MUST
return a single JSON object of this shape:

```jsonc
{
  "lens": "ux-ia" | "content" | "competitor" | "seo-perf" | "engagement",
  "ideas": [
    {
      "id": "ux-01",                       // lens-scoped local id
      "title": "Concise idea title",
      "problem": "1–3 sentences: what's broken / missing",
      "proposal": "1–3 sentences: what to do about it",
      "evidence": "Why this matters — references to files / pages / metrics / competitor patterns",
      "impact": "H" | "M" | "L",
      "effort": "S" | "M" | "L",
      "risk":   "L" | "M" | "H",
      "competitor_examples": ["url-or-name", ...],   // [] if none
      "affected_pages": ["/concepts/...", "/field-guide/...", ...],
      "mockup_hint": "One paragraph telling the mockup author what to draw"
    }
  ],
  "notes": "Anything the merger needs to know — overlaps the agent spotted, etc."
}
```

Target output per agent: **5–7 idea cards**. Total raw pool ≈ 25–35; expected
to dedupe down to ~22–24, then trimmed to exactly 20.

### Agent briefs

#### Agent 1 — UX / Information Architecture
- **Mission.** Audit site navigation, breadcrumbs, prev/next, mobile sidebar
  collapse, scent-of-information, cross-surface lateral movement.
- **Inputs.** `NAVIGATION-PLAN.md`, all `manifest.ts` files, `src/layouts/`,
  `src/components/`, the live deployed site
  (https://agentic-ai-wiki.vercel.app), `src/styles/site.css` +
  `src/styles/guide.css`.
- **Look for.** Missing prev/next, breadcrumb gaps, mobile nav weakness,
  related-pages absence, sidebar overload on Deep-Dives, missing "start here"
  affordances, locale-switcher friction, anchor-link scent on long pages.

#### Agent 2 — Content quality & gaps
- **Mission.** Spot missing topics, stale sections, inconsistent tone en↔zh,
  weak intros, jargon walls, uneven depth.
- **Inputs.** Field Guide chapters, Concepts manifest + fragments,
  Deep-Dives per-group files + fragments (note the May 2026 per-group refactor
  under `src/content/deep-dives/groups/<key>.ts`), both locales.
- **Look for.** Concept→Deep-Dive pairs that don't yet exist, Field Guide
  chapters where the "next step" essay is missing, zh translations that read
  machine-literal (CLAUDE.md flags this as a defect), missing TL;DR / key
  takeaways patterns, code blocks without language tags.

#### Agent 3 — Competitor scan
- **Mission.** Survey peer sites and identify features/patterns this wiki
  doesn't have yet but should.
- **Inputs.** WebSearch + WebFetch on a curated list:
  Lilian Weng's blog, Anthropic's "Building effective agents", Hugging Face
  agents cookbook, Smol-AI News, Chip Huyen, Eugene Yan, Simon Willison's
  weblog, DeepMind blog, OpenAI cookbook, Microsoft AI agents docs,
  TheAINotes, Promptingguide.ai.
- **Look for.** Patterns this site lacks: e.g. estimated reading time,
  printable / "long-read" view, footnote / citation conventions, TOC scroll
  spy, "what changed since" diff badges on entries, dark-mode polish,
  cite-this-page citation snippet, public roadmap.
- **MUST cite.** Every competitor idea includes a URL the user can verify.

#### Agent 4 — SEO / Performance / Accessibility
- **Mission.** Find concrete shippable wins.
- **Inputs.** `astro.config.mjs`, `vercel.json`, built `dist/` (run
  `npm run build` first if not present), page source HTML, both locales'
  sitemap entries, `src/styles/*.css` for contrast.
- **Look for.** Missing OG / Twitter cards on detail pages, missing JSON-LD
  (`Article` / `BreadcrumbList`), `<img>` without `loading="lazy"`, large
  blocking CSS, missing skip-to-content link, focus rings on interactive
  elements, contrast issues, broken or thin `<h1>`s, missing canonical hreflang
  pairs, Pagefind index tuning (filters?), `lang` attribute correctness on zh
  pages, prefers-reduced-motion respect, color contrast in dark mode if any.

#### Agent 5 — Engagement / Retention
- **Mission.** Propose mechanics that bring readers back or deepen a single
  visit.
- **Inputs.** Live site walkthrough + competitor patterns.
- **Look for.** RSS / Atom feed, newsletter capture (without ads/CMP cost),
  "save for later" via localStorage, copy-code-block button, share-this-page
  with anchor pre-selected, citation snippet, "what others read next",
  changelog highlight on home, "new since your last visit" via localStorage,
  end-of-article CTA (next chapter / related deep-dives), in-page feedback
  ("was this useful?" thumbs).

## Synthesis

After all five agents return:

1. **Pool & normalise.** Flatten all `ideas[]` into one array, prefix `id`
   with lens (already done by the contract).
2. **Dedupe.** Two ideas are duplicates if their `proposal` solves the same
   problem on the same surface. Merge: keep the strongest framing, union the
   `competitor_examples`, list contributing lenses.
3. **Score & tier.** Heuristic, not a formula:
   - **P0** (target 4–6) — `impact=H`, `effort ∈ {S, M}`, `risk=L`. Things we'd
     ship next sprint without debate.
   - **P1** (target 7–9) — `impact=H` + `effort=L`, OR `impact=M` + `effort=S/M`.
     Worth doing; needs scoping.
   - **P2** (target 5–8) — speculative, `effort=L` with uncertain payoff, or
     `impact=L`. Backlog candidates / "considered."
4. **Trim to 20.** If >20 survivors, the weakest P2s are cut and listed in the
   umbrella issue's "Considered & dropped" appendix with a one-line reason.
5. **Sanity check.** No lens monopolises P0 (target ≤ 2 P0s per lens). If one
   does, re-balance by promoting strong-P1s from other lenses.

## Mockup pipeline

For each of the 20 ranked ideas:

1. **HTML mockup.** `docs/research/mockups/<NN>-<idea-slug>.html` — full HTML
   document that imports the site's CSS (`../../../src/styles/site.css` and
   `../../../src/styles/guide.css`) so it looks like a real page. The mockup
   shows the **after** state. For IA / nav changes, also embed a "before"
   block above the "after" so the diff is legible.
2. **Screenshots.** `scripts/research/screenshot-mockup.mjs` uses Playwright
   (already a devDep) to render each `.html` at two viewports:
   - Desktop: 1280×800 → `<NN>-<idea-slug>.desktop.png`
   - Mobile:  390×844  → `<NN>-<idea-slug>.mobile.png`
   Both PNGs land in `docs/research/mockups/screenshots/`.
3. **Commit & push.** All HTML + PNGs on the research branch
   (`research/site-enhancements-2026-05-19`). The branch is pushed so issues
   can reference raw URLs.

Mockup style guidance:
- Reuse existing class vocabulary (`.phase`, `.step`, `.callout`, `.c-*`).
- For new components (e.g. a TOC scroll-spy), keep the visual language —
  same spacing scale, same border-radius, same accent colors.
- Don't invent fonts or palettes; pull from `src/styles/*.css`.

## Issue filing

### Labels (idempotent — created if missing)

| Label | Color | Purpose |
|---|---|---|
| `research` | gray | Discovery output, not yet committed work |
| `tier/P0` | red | Must-have / next sprint |
| `tier/P1` | orange | High value, scope first |
| `tier/P2` | yellow | Backlog candidate |
| `lens/ux-ia` | blue | Surfaced by IA audit |
| `lens/content` | green | Surfaced by content audit |
| `lens/competitor` | purple | Borrowed from a peer site |
| `lens/seo-perf` | teal | SEO / perf / a11y win |
| `lens/engagement` | pink | Retention / engagement |

### Per-idea issue

- **Title:** `[P0] <Idea title>` (tier prefix sorts the backlog naturally).
- **Labels:** `research` + one `tier/*` + one or more `lens/*`.
- **Body sections** (in order):
  1. **Problem** — verbatim from the merged idea card.
  2. **Proposal** — verbatim.
  3. **Mockup** — two embedded PNGs (desktop + mobile) via raw URLs against
     the research branch; link to the HTML file for live preview.
  4. **Evidence & competitor refs** — links + names.
  5. **Impact / Effort / Risk** — the H/M/L triple.
  6. **Affected pages** — file paths the change would touch.
  7. **Open questions** — anything the agent flagged as TBD.

### Umbrella issue

- **Title:** `Site enhancement research — 20 ideas, ranked (2026-05-19)`.
- **Labels:** `research` only.
- **Body:**
  1. **Intro** — methodology (5 lenses, parallel agents, dedupe → P0/P1/P2).
  2. **P0 — Must-have** — bullet list `#NNN — title — one-line pitch`.
  3. **P1 — High value** — same shape.
  4. **P2 — Nice-to-have** — same shape.
  5. **Considered & dropped** — appendix of cut ideas with one-line reason.
  6. **Where the artifacts live** — link to the research branch + a few
     example mockups.
- **Pinned**: yes (this is the entry point for triage).

## Validation

Before declaring done:

- [ ] `git push origin research/site-enhancements-2026-05-19` succeeded so
      raw URLs resolve.
- [ ] All 20 issues exist; `gh issue list --label research` returns 21
      (20 + umbrella).
- [ ] Each per-idea issue body successfully renders both screenshots
      (spot-check 3 random ones in the browser).
- [ ] Umbrella issue's idea links are valid (`#N` references resolve).
- [ ] Tier distribution within the 4–6 / 7–9 / 5–8 targets (allow ±1).
- [ ] No P0/P1/P2 label is monopolised by a single lens beyond the cap.
- [ ] Total wall-clock under 90 minutes; if it overruns, the orchestrator
      reports rather than silently spirals.

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Agents propose dozens of overlapping ideas | Strict JSON contract + lens scoping; dedupe step is explicit. |
| Mockups look nothing like the site | Mockups import the real CSS; if a CSS path breaks, the screenshot will show it. |
| Playwright doesn't render fonts the same as production | Acceptable — mockups are decisional aids, not pixel-perfect specs. |
| `gh` rate limits with 21 sequential issue creates | Issues are well under any GH limit. If hit, exponential backoff in the filing script. |
| User decides only 3 ideas matter — wasted effort on the other 17 mockups | Accepted. The point of discovery is to surface unknowns; cheap mockups buy that. |
| Research branch never gets cleaned up | Add a follow-up reminder; branch is git-ignored from `main` and harms nothing if left. |

## Out of scope (explicitly)

- Implementing any idea.
- Modifying `manifest.ts`, content fragments, or `src/i18n/ui.ts`.
- Adding a changelog entry (CLAUDE.md scope: site content/structure changes;
  research artifacts on a non-merged branch don't qualify).
- A search-index rebuild or any Pagefind config change.
- Translation of mockups to zh (mockups are decisional aids, not shipping
  content).

## Open questions for the user (to confirm before plan execution)

None — all clarifying questions answered in the brainstorming session above.

## Next step

This spec → `superpowers:writing-plans` to produce the executable
implementation plan (the actual sequence of tool calls, including the
five `Agent` dispatches).
