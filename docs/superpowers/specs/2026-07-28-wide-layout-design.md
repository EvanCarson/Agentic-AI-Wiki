# Wide layout: spend the screen on reading, not on margins

**Date:** 2026-07-28
**Status:** implemented, shipped 2026-07-28
**Scope:** `src/styles/tokens.css`, `src/styles/site.css`, `src/styles/guide.css`,
`src/layouts/BlogLayout.astro`, `src/components/pages/*.astro`,
`scripts/__tests__/design/system.mjs`

---

## 1. The problem, measured

Reported: on a wide screen the page carries too much white space, and the content
reads as crowded. Both halves are true at once, and they have the same cause — a
shell frozen at 1180px while the viewport is 1728px.

Measured in Chromium against built HTML at 1728px (MacBook Pro 16" logical width):

| | measured |
|---|---|
| `.chapter-shell` | 1180px, hard cap — identical at 1280, 1440, 1920, 2560 |
| outer gutter | **274px per side, 32% of the viewport unused** |
| left nav rail | 232px |
| article column | 632px |
| prose | **536px = 63 characters at 16px** |
| right TOC rail | 220px |

The site header is already edge-to-edge — brand at x=0, language switch at the
right edge, a 2px rule spanning the full width. The body below it sits in a
1180px island aligned to nothing. That mismatch is a large part of what reads as
wasted space.

### 1.1 Two defects found while measuring

**A. The 901–1180px band is broken.** Both rails switch on at 901px, but the
shell has no width to give them:

| viewport | article column | prose |
|---|---|---|
| 901px | 353px | **257px = 30 characters** |
| 1000px | 452px | 356px = 42 characters |
| 1100px | 552px | 456px = 54 characters |
| 1180px | 632px | 536px = 63 characters |

The whole band sits under the project's own 60-character floor. The measure
guard runs at 1280px only, so it has never seen this.

**B. `:global(.blog-shell) { max-width: 1080px }` is dead code.**
`src/layouts/BlogLayout.astro:352` sits inside a `<style is:global>` block.
`:global()` is a directive for Astro's *scoping* pass, and `is:global` opts
the whole block out of scoping entirely — so the compiler never rewrites the
wrapper, and the literal selector `:global(.blog-shell)` ships into the
compiled CSS. That is not valid CSS selector syntax, so browsers discard the
rule outright: it was never in a cascade contest with `.chapter-shell` at
all, just absent from the browser's view of the stylesheet. The computed
value is 1180px — `.chapter-shell`'s own, uncontested. Its comment claims to
widen the shell for wide tables, but 1080 < 1180, so it was wrong in both
directions even on its own terms. This is a seventh member of the "a
reference hid where a CSS-source sweep cannot see it" family already
recorded in the project's notes, not a same-specificity tie: the rule was
not competing, it did not exist as far as the browser was concerned.

**C. Index pages run long lines today.** Inside the 860px `.wrap`, with no
`max-width` on any of them: `/concepts/` list items 97ch, changelog entries 98ch,
blog card summaries 108ch, About ledes 87ch, home card taglines 102ch. The
measure guard covers three article pages and no index page.

**D. 768px runs 80 characters**, over the guard's own 78 ceiling. The guard does
not measure at 768px.

---

## 2. Reference research

Ten documentation and reading sites measured in Chromium at 1728px, using the
same character metric as the project's guard (canvas `measureText` over the
lowercase alphabet plus space).

| site | left rail | reading column | right TOC | outer gutter |
|---|---|---|---|---|
| **this site** | 232 | **536px / 63ch** | 220 | **274** |
| Next.js docs | 284 | 690px / 85ch | 224 | 164 |
| MDN | 304 | 752px / 90ch | 304 | 144 |
| Astro (Starlight) | 300 | 720px / 90ch | ~256 | 0 |
| GitHub docs | 326 | 720px / 90ch | 400 | 0 |
| VitePress (Vue) | 272 | 688px / 83ch | 224 | 176 |
| React docs | 320 | 896px / 99ch | 320 | 0 |
| Kubernetes docs | 255 | 861px / 105ch | 284 | 24 |
| Tailwind docs | 288 | — | 288 | ~200 |
| Stripe docs | ~300 | 518px + code panel | — | 0 |

Nobody caps at 1180px. The tightest full cap in the field is Next.js at 1400px
and MDN at 1440px. The reading column median is ~720px against this site's 536px.

### 2.1 What happens at 2560px — this decides the design

| site | behaviour at 2560px | space between left rail and text |
|---|---|---|
| React docs | rails stay at the viewport edge | **512px of void per side** |
| GitHub docs | rails stay at the edge | ~517px |
| Astro (Starlight) | rails stay at the edge | ~596px |
| Kubernetes | no cap at all | prose grows to **1305px / 159ch** |
| **MDN** | **shell caps at 1440 and centres** | **48px** |
| **Next.js** | **shell caps at 1400 and centres** | **~48px** |

MDN and Next.js only look rail-to-edge at 1728px because they are fluid up to
their ceiling. Past it the whole shell centres, so the text is never stranded:
the ceiling is chosen so that the middle region *is* the reading width, leaving
no slack to strand it in. Pure rail-to-edge produces the void.

**Adopted: bounded rail-to-edge.** Rails hug the viewport edges and everything is
fluid up to a 1440px ceiling; past the ceiling the whole shell centres.

---

## 3. The organizing principle

> Extra viewport width buys **more columns and wider rails — never longer lines.**

Every rule below follows from it. Where a container grows past the reading
measure, the surplus goes to a second grid column or to a rail, and the text
itself is capped.

---

## 4. Tokens

New in `src/styles/tokens.css`:

```css
--w-shell:    1440px;   /* article shell ceiling; past this the shell centres */
--w-wrap:     1080px;   /* single-column index and landing pages (was 860px) */
--w-rail-nav: 288px;    /* left chapter nav (was 232px) */
--w-rail-toc: 264px;    /* right in-page TOC (was 220px) */
--w-measure:  62ch;     /* cap on any running-text block */
--t-prose:    16px;     /* article body text; steps to 18px at >=1360px */
```

### 4.1 Why `--w-measure` is 62ch and not 72ch

CSS `ch` is the advance width of the `0` glyph. Measured in-browser, Inter's is
**~0.631em** — not the ~0.6em this section originally assumed — against a
guard-character (the design guard's own canvas average of a-z plus space) at
~0.531em, so `ch` runs **~19% wider, not ~13%**. Measured at 18px: `1ch` =
11.36px and one guard-character = 9.56px.

So **`62ch` delivers about 74 guard-characters, not 70**, and because both
units scale linearly with font size, that holds at every size. The section's
actual point survives the correction: a token set to the classic
72-character measure would still deliver far more than 72 characters — just
more like 88, not 81. `58ch` is what actually lands at ~70 — independently
confirmed by `BlogLayout`'s own separate, pre-existing 58ch cap, which
measures ~70 characters in-browser by the same method. Two independent
measurements landing on the same ~1.19–1.2 ratio, against this section's own
~1.13, is what makes the correction conclusive rather than a second guess.

**Consequence.** 74 sits only 4 characters below the guard's 78-character
ceiling — real headroom, but thin, wherever `--w-measure` alone (not a
narrower article column) is the binding constraint. This does not touch the
widths the design was reviewed and approved at: 1440px and above never bind
against the cap — the column itself is the constraint there — and measure 69
characters, so the approved reading experience is unaffected.

**Available follow-up, not applied here.** Dropping `--w-measure` to 58ch
would restore the originally intended ~70 characters, widen the margin to
the ceiling from 4 to 8, and let `BlogLayout`'s hardcoded `58ch` become
`var(--w-measure)` — unifying the site on one measure token instead of two
numbers that presently just happen to coincide. Deliberately not done now:
it would change a rendered value inside the shell-widening's own reviewed
range, and this branch's phone-parity proof (375/390/430px byte-identical,
both themes) was established against the shipped 62ch value — changing it
would need that proof re-run before it could be trusted again.

`--w-measure` applies to running text only. The families it is applied to
(**five** live article-prose selectors, not six — see the dead-CSS note below):

- article prose — `.phase p`, `.step p`, `.step li`, `.phase .goal`,
  `.deliverable .checklist li`
- index prose — `.lede`, `.toc-desc`, `.home-card-tagline`,
  `.blog-card-summary`, `.changelog-items li`, `.entry-summary`

**`.step li`, not `.step ul li`.** The cap first shipped as `.step ul li`, so an
`<ol>` inside a `.step` matched nothing and ran **96 characters at 901px and 95
at 1280px** against the 78-character ceiling, on at least 8 pages
(`/field-guide/llm-as-judge/`, `/field-guide/first-eval-suite/`,
`/field-guide/prompts/`, `/deep-dives/retrieval-and-rag/choosing-a-vector-database/`
and their `/zh/` counterparts). Before the widening those items sat at 30–63
characters, so the widening is what made them long. `.step li` is safe as a
*cap* selector because it sets `max-width` alone: the arrow-marker box —
`padding`, `position: relative`, the `::before` glyph — stays on `.step ul li`,
where widening it to `.step li` would give a numbered item an arrow *and* a
number at the wrong indent. Ordered items get their type from a separate
`.step ol li { font-size: var(--t-prose); line-height: var(--lh-base) }`.

`.deliverable .checklist li` needed its own entry because `.deliverable` is not
nested inside `.step`. It ran **111–130 characters**. Only the cap is added — it
keeps its deliberately smaller `--t-2xs` monospace type, and 62ch of a
monospace face is ~62 characters, inside the 60–78 window.

**Dead CSS, recorded so the next reader does not re-derive it.** `.outro` and
`.shell-plan-section` belong to a removed stub-chapter feature:
`grep -rl outro src/ dist/` and `grep -rl shell-plan-section src/ dist/` both
return only the stylesheets themselves. Three selectors this branch touched
therefore match nothing and are no-ops — `.outro p`'s cap, and the `--t-prose`
swaps on `.shell-plan-section p` and `.shell-plan-section ul.outline li strong`.
The two `.shell-plan-section` entries have been removed from the MEASURE cap
block this branch added, per this project's own rule that a marker matching
nothing is under-coverage pretending to be coverage. The dead *rules* are left
in place: deleting them is unrelated cleanup, deliberately deferred to a
separate change.

No blog rule ships here: `BlogLayout` already had its own pre-existing
`max-width: 58ch` cap on article prose, and this branch deliberately leaves
it alone. `.lede` (not `.hero .lede`) is deliberate too — the About page puts
`p.lede` inside `section.wrap`, not inside the hero, so the scoped selector
never matched it; the bare class reaches About and privacy as well. The class
that ships for index entry summaries is `.entry-summary`, not
`.concept-summary`.

`.callout`, `.deliverable` and `.qa` are **not** exempt — they are prose boxes
whose surface spans the column but whose content is ordinary running text: an
uncapped `.deliverable p` measured 82 characters at 768px. `.phase p` reaches
their nested paragraphs as a descendant selector wherever they sit inside
article content, so they are capped by the same rule as everything else. What
is actually exempt is the non-prose content the extra width exists for:
`pre`, `table`, `.diagram`, `.threat-grid` and `.code-tabs` are never matched
by any cap selector, so they are exempt by construction rather than by an
explicit reset.

### 4.2 `--t-prose`

```css
:root { --t-prose: var(--t-base); }
@media (min-width: 1360px) { :root { --t-prose: var(--t-md); } }
```

Replaces `--t-base` at **five live** article-prose declarations in `guide.css`:
`.step p`, `.step ul li`, `.step ol li`, `.phase .goal`, and `.callout p` — the
last added because once the prose around a callout steps to 18px above 1360px, a
`--t-base` callout would be smaller than the page again, and `.step ol li` added
for exactly the same reason: an `<ol>` inside a `.step` had no font-size rule at
all, inherited `--t-base` from `body`, and stayed 16px while the bulleted list
beside it stepped to 18px. Two further declarations read `--t-prose` and are
**not** counted as coverage — `.shell-plan-section p` and
`.shell-plan-section ul.outline li strong` are dead CSS (§4.1), so the guard
that checks this step deliberately does not list them. `body` keeps
`--t-base` so cards, nav and chrome are untouched. The token itself is
declared as `var(--t-base)` stepping to `var(--t-md)` at the breakpoint, never
as a literal `16px`/`18px`, so it tracks either token if they ever change.

This also closes a judgement call the codebase recorded as blocked. The comment
at `guide.css:314` reads: *".phase caps prose at 536px, where 18px measures 56 —
under the 60-char floor the measure guard enforces. Raising it needs the column
to widen first, which is a layout change, not a type change."* This is that
layout change. The lede may move to `--t-prose` in the same edit.

---

## 5. Article shell

```css
.chapter-shell {
  display: flex;
  align-items: flex-start;
  gap: var(--s-6);                 /* 32px */
  padding: 0 var(--s-6);           /* rails 32px from the viewport edge */
  max-width: var(--w-shell);       /* 1440px */
  margin: 0 auto;
}
.chapter-side { width: var(--w-rail-nav); flex-shrink: 0; }
.chapter-toc  { width: var(--w-rail-toc); flex-shrink: 0; }
```

Rail widths are **fixed px, not `vw`-based `clamp()`**. A `clamp(_, 17vw, _)` was
designed and rejected: because the shell caps at 1440 while `vw` keeps growing,
the rails widen past the cap and the article column *shrinks* as the screen
widens — 851px at 1440 down to 765px at 1728, which also pushes the measure to
79ch at 1440. Fixed rails make the column monotonic.

### 5.1 Breakpoint ladder

Two breakpoints. Each is derived from where a rail can appear without starving
the text, not chosen for roundness.

| band | rails | article column | prose (capped at `--w-measure`) |
|---|---|---|---|
| **< 1024px** | none | full width | 41ch @390 · 46ch @430 · 70ch @768 · 70ch @1023 |
| **1024–1359px** | nav only (`W − 384`) | 640px @1024 → 975px @1359 | 64ch @1024 · 70ch @1359 |
| **≥ 1360px** | nav + TOC (`min(W,1440) − 680`) | 680px @1360 → 760px @1440+ | 61ch @1360 · 69ch @1440 and above |

`--t-prose` steps to 18px at the same 1360px breakpoint, so "both rails" and
"larger type" are one coherent wide-layout mode rather than two.

Derivation of 1360: the TOC rail plus its gap costs 296px. Below ~1290px the
remaining column cannot hold 60 characters at 16px. 1360 clears that with margin
and coincides with where 18px type first sustains 60 characters.

**Every band lands inside the 60–78 guard window except the two phone widths**
(41ch at 390, 46ch at 430), which are unchanged from today and are inherent to
the viewport — 60 characters at 16px needs 510px in a 390px-wide screen.

### 5.2 Consequences at the widths that matter

| viewport | gutter/side | nav | column | TOC | prose |
|---|---|---|---|---|---|
| 1728 today | 274 | 232 | 632 | 220 | 536px / 63ch @16px |
| **1728 after** | **144** | **288** | **760** | **264** | **664px / 69ch @18px** |
| 1440 after | 0 | 288 | 760 | 264 | 664px / 69ch @18px |
| 2560 after | 560 | 288 | 760 | 264 | 664px / 69ch — 32px rail-to-text, no void |
| 901 today | 0 | 232 | 353 | 220 | **257px / 30ch** |
| 901 after | 0 | — | full | — | 595px / 70ch |

### 5.3 The TOC below 1360px

Today `.chapter-toc` is `display: none` below 900px, and the CSS comment above
that rule claims *"Mobile: TOC moves above the article as a collapsible
accordion"* — a behaviour that was never implemented. Raising the rail's
breakpoint to 1360px would remove the TOC from common laptop widths, so the
accordion must now exist:

Below 1360px, `.chapter-shell` wraps and `.chapter-toc` takes `order: -1` and
`width: 100%`, rendering in flow above the article. The markup is already there
— `PageTOC.astro` ships the `aria-expanded` toggle and the list. Net effect at
1280px: no rail, but a 70ch article (up from 54ch) and a TOC that is reachable
rather than absent.

**It renders expanded, not collapsed.** This section originally said
"collapsed"; that is not what ships and was never implemented.
`PageTOC.astro:13` sets `aria-expanded="true"` and nothing in the 900–1359px
band collapses it, so the panel opens at full height and the article's top edge
moves from y=115 to y=371 at 960–1359px. That is defensible for `.chapter-toc`
— the worst case site-wide is 9 entries — and the component's behaviour is
deliberately left alone. The spec is corrected to describe what ships.

**Blog posts need the same compensation, and it is a separate rule.** A blog
post's in-page TOC is `BlogPostTOC.astro`'s `<nav class="blog-toc">`, mounted
inside `.chapter-side`. It borrows the `.chapter-toc-*` *child* classes but is
not `.chapter-toc`, so the accordion above never matched it, while
`.chapter-side { display: none }` at ≤1023.98px took it away — leaving posts
with up to 40 headings no table of contents at all between 901 and 1023px, with
only a "Browse all AI Blog →" section link as fallback. Pre-branch the rail was
visible from 901px up, so that was a regression, and the argument at the top of
this section (raising the breakpoint must not remove the TOC from common
widths) applies to it verbatim.

The fix mirrors the `.chapter-toc` treatment in a `900px–1023.98px` band, and
above 1024px `.chapter-side` is already a visible rail holding the TOC, so the
band ends where that one begins. Two implementation notes that are load-bearing:

- The aside carries a `chapter-side-blogtoc` marker class and the rule is
  written as the compound `.chapter-side.chapter-side-blogtoc` (0,2,0), so it
  outranks `.chapter-side { display: none }` (0,1,0) on **specificity**, not on
  source order. Moving the block cannot silently disable it.
- The `.blog-toc` overrides themselves (drop the left-rail `border-right`, add
  the gutters `.chapter-shell` stops providing below 1024px) live in
  `BlogPostTOC.astro`'s own `<style>` block, **not** in `site.css`. Astro
  appends the component's scope class to those selectors, making them
  `.blog-toc[data-astro-cid-…]` (0,2,0); a `site.css` rule of shape `.blog-toc`
  is (0,1,0) and would compute as if never declared. This branch has been bitten
  by the scoped-vs-global cascade twice already.

Cost, measured, and it is real: the panel is one entry per heading, so on a
40-heading post the article's top edge moves from y=532 to y=1852 at 900–1023px
(zh: 522 → 1843). Bounding or collapsing it needs a component change and is
deliberately not done here.

### 5.4 Blog layout

Delete the dead `:global(.blog-shell)` rule. `BlogLayout` then inherits the
standard shell. It carries a left `BlogPostTOC` rail and no right TOC, so its
column becomes `min(W,1440) − 384` = **1056px at 1440 and above**, up from 884px
— which is the wide-table headroom the dead rule's comment was asking for. Its
prose is capped at `--w-measure` and lands at 664px/69ch, statistically
unchanged from today's 673px/69ch.

After deleting the rule, **read the computed `max-width` back from built HTML**
before calling it done. The failure being fixed here is precisely a rule that
looked applied and was not.

---

## 6. Index and landing pages

`.wrap`: `max-width: 860px` → `var(--w-wrap)` (1080px). Gutters at 1728px drop
from 434px to 324px per side.

Widening alone would only lengthen lines, so the grids retune in the same edit:

**Every grid moves from `auto-fit` to explicit column counts at explicit
breakpoints.** `auto-fit` derives the column count from a `minmax` floor against
a container that is about to change width, which is how a widening silently
turns a clean 3+2 into a 4+1. Explicit counts are deterministic, reviewable, and
assertable.

| surface | today | after |
|---|---|---|
| `.home-grid` (5 fixed cards) | `auto-fit minmax(240px)` → 1 / 2 / 3-up | `repeat(1)` <560, `repeat(2)` 560–759, **`repeat(3)` ≥760** — identical counts to today at every width, cards simply get wider (264px → 341px). `auto-fit minmax(240px)` at the new width would give 4-up and a 4+1 orphan |
| `.blog-list` | 1 column at all widths, summaries at 108ch | 1 column <1024, **2 columns ≥1024**. Summaries capped at measure |
| `.toc-list` (deep-dives, playbooks, operations, section indexes) | **inline** `auto-fit minmax(280px)` in `DeepDivesView.astro:26` | moves into `site.css` as `repeat(1)` <560, **`repeat(2)` ≥560** — today's counts preserved exactly, cards widen 400px → 520px. Deliberately *not* 3-up: the group counts are 11 / 4 / 5, and no single column count avoids a lone last-row card for all three, so today's composition is kept rather than traded for a different orphan |
| `/concepts/` entry lists | 1 column, 97ch | 1 column <900, **2 columns ≥900**, text capped at measure |
| `.changelog-entry` | date stacked above title, 98ch bullets | `grid-template-columns: 200px minmax(0,1fr)` at ≥900px — date left, detail right, bullets capped at measure. Timeline rail, dot and the collapsed-by-default `<details>` unchanged |
| About / privacy ledes | inline `style="max-width:760px"`, 87ch | inline styles removed; text capped by `--w-measure` |

Every running-text block inside `.wrap` gets `max-width: var(--w-measure)`. On
index pages this **shortens** lines that are already too long — 97–108ch down to
~70ch — so the cap is a reading fix in its own right, not just insurance.

Moving `.toc-list`'s grid and the About/privacy caps out of inline `style`
attributes addresses the failure mode the project notes flag first: references
that a CSS-source sweep structurally cannot see.

---

## 7. Guard changes

The project's own retrospective holds that every defect in the last cycle sat in
a dimension the guard did not measure. That is exactly true again: the measure
guard runs at **one viewport (1280px)** on **three article pages**, which is why
the 30-character band, the 80-character 768px case, and the 97–108ch index lines
all shipped green.

Three changes to `scripts/__tests__/design/system.mjs`:

1. **The measure assertion runs at 390, 768, 901, 1024, 1152, 1280, 1360, 1440
   and 1728**, not 1280 alone. The 60–78 window applies at ≥768px; below 700px
   the window is 35–78, because no 16px layout reaches 60 characters in a 390px
   viewport. This assertion fails today at 901px (30ch) and 768px (80ch).
   Its name is also corrected: the test is called
   `prose measure is 60-75 characters` while the code asserts 60–78. The name is
   the thing a future reader trusts, so it becomes
   `prose measure is 60-78 characters (35-78 below 700px)`.
2. **The same assertion covers index pages** — `/`, `/concepts/`, `/changelog/`,
   `/blogs/`, `/about/` — not only the three article pages. Fails today at
   97–108ch.
3. **New assertion: no dead gutter.** On article pages at 1440px and 1728px, the
   outer gutter is ≤12% of the viewport per side. Fails today at 15.9%.

Three further changes, added after the whole-branch review found each of the
defects they now catch:

4. **`MEASURE_PAGES` gains `/field-guide/llm-as-judge/`.** The list families
   escaped the cap on ~8 pages and the suite stayed green because every audited
   page happened to be built from the same three components. Proved to fail
   before the fix at 768 (80ch), 901 (96ch), 1152 (80ch), 1280 (95ch), 1440
   (79ch) and 1728px (79ch), all on the unclassed `li` of a `.step ol`.
5. **The `--t-prose` assertion lists every live consumer** — `.step p`,
   `.step ul li`, `.step ol li`, `.phase .goal`, `.callout p` — instead of two
   of them, across `llm-mental-model` and `llm-as-judge` in both locales.
   Neither page carries all five, so a selector missing from one page is not a
   failure; a selector found on **no** page at **no** width is, which is what
   makes "listed but never checked" impossible. Proved by reverting
   `.step ul li` to `var(--t-base)`: 8 named failures at 1360 and 1728px.
6. **New assertion: a blog post keeps a reachable table of contents above
   900px** — a rail where the column can hold 60 characters beside it, in flow
   above the article where it cannot, absent below 900px. The ladder assertion
   ran on one chapter page and structurally could not see `.blog-toc`. It
   checks rendered width, not just `display`: the failure mode was a
   `display: block` nav inside a `display: none` parent, which a `display`
   check alone reports as fine. Proved to fail before the fix at 900, 960 and
   1023px.

Per the project's standing rule, each new assertion is proved to fail before it
is trusted: revert the fix, confirm the test names real elements and reports the
real number, restore. Every DOM-walking assertion also asserts a non-zero `seen`
count.

---

## 8. Phone safety

The explicit requirement was that phone rendering must not break.

- Shell geometry changes apply at **≥1024px**. Below that the article is already
  full-width with no rails, and the rules that change are not in scope.
- The 16→18px `--t-prose` step is gated at **≥1360px**. No phone or tablet sees it.
- `--w-measure` binds only between ~700px and 1024px, where it shortens today's
  80ch to ~70ch — an improvement, and inside the guard window.
- **375px, 390px and 430px render byte-identical.** Proof required before merge:
  pixel-diff before/after screenshots at each width on a chapter page, a concepts
  page and the homepage, in both themes, plus the existing `no horizontal overflow
  at 375/390/768` assertions.
- The known 320px overflow of 14px is pre-existing and explicitly out of scope;
  it needs a shorter wordmark, which is a brand decision.

---

## 9. Verification gates

```
npm run build        # must complete with no new warnings
npm run verify       # bilingual completeness / no orphans
npm test             # unit tests
npm run test:design  # the guard, including the three new assertions
```

Plus, specific to this change:

- Re-measure the shell at 390, 430, 768, 901, 1024, 1152, 1280, 1360, 1440, 1728
  and 2560 and confirm every number in §5.1 and §5.2 from built HTML.
- Read back the computed `max-width` on `.chapter-shell` for a blog page and
  confirm the dead-rule deletion took effect (§5.4).
- Confirm no grid gains an orphan row: home 5 cards, blog list, deep-dive groups,
  concepts groups.
- Confirm both locales — `zh` pages carry different label widths in the rails.

A changelog entry file at
`src/content/changelog/entries/2026-07-28-wide-layout.ts` ships in the same PR,
bilingual, per `CLAUDE.md`.

---

## 10. Explicitly out of scope

- The 320px 14px overflow (brand decision).
- Per-entry dates on Field Guide / Deep-Dives (content-model change).
- `.callout.tip` (needs a new colour cleared for non-text contrast).
- Any redesign of index-page content beyond the grid retuning in §6.
