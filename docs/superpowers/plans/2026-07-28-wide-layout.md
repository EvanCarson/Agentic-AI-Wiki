# Wide Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop the article shell freezing at 1180px on wide screens, so a 1728px viewport spends 144px per side on margin instead of 274px and the reading column grows from 536px/63 characters to 760px/69 characters at 18px.

**Architecture:** Bounded rail-to-edge. The nav and TOC rails sit 32px from the viewport edge and the whole shell is fluid up to a 1440px ceiling; past the ceiling it centres, which is what MDN and Next.js do and what stops the text becoming an island at 2560px. Two derived breakpoints (1024, 1360) control which rails exist. A `--w-measure` token caps running text so extra width buys columns and rails, never longer lines.

**Tech Stack:** Astro 4 static site, plain CSS with a custom-property token layer (`src/styles/tokens.css`), Playwright-driven design guard against built HTML (`scripts/__tests__/design/system.mjs`), `node:test`.

**Spec:** `docs/superpowers/specs/2026-07-28-wide-layout-design.md`

**Worktree:** `.worktrees/wide-layout`, branch `design/wide-layout`, forked from `origin/main` at `d0d5bcb`. All paths below are relative to that worktree root. Never edit the main checkout.

## Global Constraints

- **Tokens are the only source of truth.** No hardcoded `font-size`, `padding`, `max-width`, `transition` duration, or radius in any rule you touch. Use `--t-*` / `--s-*` / the new `--w-*`. Enforced by `scripts/__tests__/design-tokens.test.mjs` and `font-weights.test.mjs`.
- **Never regex a CSS file line-agnostically.** A previous `transition:` rewrite matched the word inside a comment and destroyed the `prefers-reduced-motion` block. Edit with exact string matches.
- **Same-specificity ties lose on source order.** A `@media` block that redefines a property must appear *after* the base rule it overrides. Every override in this plan is verified by reading the *computed* value from built HTML, never by assuming the CSS applied.
- **Astro scoped styles beat global ones.** A rule in a component's `<style>` block gets an `.astro-XXXX` class appended, so it is (0,2,1) against site.css's (0,1,1). Any cap that must apply inside `BlogLayout` has to live in `BlogLayout`'s own style block.
- **Phone rendering must not change.** 375px, 390px and 430px render byte-identical. Proven by SHA-256 comparison of full-page screenshots in Task 9, not by inspection.
- **Both locales.** `zh` pages carry different label widths in the rails and set `--track-mul: 0.15`. Every visual assertion runs against a `/zh/` page too.
- **The guard must be able to fail.** For every assertion added, revert the fix, confirm the test names real elements and reports the real number, restore. Any DOM-walking assertion also asserts a non-zero `seen` count.
- **A changelog entry file ships in this PR** at `src/content/changelog/entries/2026-07-28-wide-layout.ts`, bilingual, per `CLAUDE.md`. Task 10.
- **Verification gates**, all four must pass before the PR: `npm run build`, `npm run verify`, `npm test`, `npm run test:design`.

## Reference numbers

Measured against the shipped build. Every assertion in this plan is checked against these.

| viewport | shipped column | shipped prose | target prose |
|---|---|---|---|
| 390 | 390 | 350px / 41ch | **unchanged** |
| 430 | 430 | 390px / 46ch | **unchanged** |
| 768 | 768 | 672px / **80ch** | 595px / 70ch |
| 901 | 353 | 257px / **30ch** | 595px / 70ch |
| 1024 | 476 | 380px / 45ch | 544px / 64ch |
| 1280 | 632 | 536px / 63ch | 595px / 70ch |
| 1360 | 632 | 536px / 63ch | 584px / 61ch @18px |
| 1440 | 632 | 536px / 63ch | 664px / 69ch @18px |
| 1728 | 632 | 536px / 63ch | 664px / 69ch @18px |
| 2560 | 632 | 536px / 63ch | 664px / 69ch @18px |

Index pages, shipped, at 1728: `/concepts/` items 97ch, changelog entries 98ch, blog card summaries 108ch, About ledes 87ch, home card taglines 102ch. Target: ≤78ch everywhere.

Gutter per side at 1728: shipped 274px (15.9% of viewport). Target ≤12%.

---

## File Structure

| file | responsibility after this change |
|---|---|
| `src/styles/tokens.css` | **modified.** Owns the five new `--w-*` width tokens and `--t-prose`, including the `@media (min-width: 1360px)` step. The only place a layout width or prose size is defined. |
| `src/styles/site.css` | **modified.** Owns the article shell geometry, the breakpoint ladder, the TOC accordion, `.wrap`, and every index-page grid. Grid column counts move here from inline `style` attributes. |
| `src/styles/guide.css` | **modified.** Article prose declarations switch `--t-base` → `--t-prose` and gain the `--w-measure` cap. No geometry lives here. |
| `src/layouts/BlogLayout.astro` | **modified.** Dead `.blog-shell` rule deleted; the measure cap for blog prose added to its scoped block, because a global rule cannot reach it. |
| `src/components/pages/SectionIndexView.astro` | **modified.** Inline `style` attributes on the entry list replaced by classes, so the list can gain a second column and be swept by a CSS-source audit. |
| `src/components/pages/DeepDivesView.astro` | **modified.** Inline grid declaration moved into `site.css`. |
| `src/components/pages/AboutView.astro`, `src/pages/privacy.astro`, `src/pages/zh/privacy.astro` | **modified.** Inline `max-width:760px` removed in favour of the token. |
| `scripts/__tests__/design/system.mjs` | **modified.** The measure assertion widens from one viewport / three article pages to nine viewports / article + index pages; a dead-gutter assertion and a prose-size assertion are added. |
| `src/content/changelog/entries/2026-07-28-wide-layout.ts` | **created.** Bilingual changelog entry. |

Task order is chosen so each task leaves the tree green and independently reviewable: tokens first (inert), then the measure cap (fixes 768px and every index page with no geometry change), then the shell, then type, then the blog bug, then the inline-style extraction (no visual change), then the index widths, then verification.

---

## Task 1: Capture the phone baseline

This must run **before any source change**, on the unmodified build. It produces the artifact Task 9 compares against.

**Files:**
- Create: `/Users/cq/.claude/jobs/69e28ade/tmp/phone-baseline/` (outside the repo — a verification artifact, not content)
- Create (temporary, deleted in the same task): `scratch-phone-shots.mjs` at the worktree root

**Interfaces:**
- Produces: PNG files named `<width>-<theme>-<slug>.png` under the baseline directory, and `baseline.sha256` listing their hashes. Task 9 regenerates the same names against the changed build and diffs the hash lists.

- [ ] **Step 1: Build the unmodified tree**

```bash
cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/wide-layout
git status --short   # must be empty — this baseline is only valid on a clean tree
npm run build
```

Expected: build completes, `dist/` is populated, no new warnings.

- [ ] **Step 2: Write the screenshot script**

Create `scratch-phone-shots.mjs` at the worktree root. It must live in the repo root so `import { chromium } from 'playwright'` resolves against `node_modules`.

```js
// Full-page phone screenshots, hashed. Run once on the unmodified tree
// (Task 1) and once on the finished tree (Task 9); the hash lists must be
// identical. Chromium renders deterministically for identical input, so a
// byte-identical PNG is a legitimate "nothing changed" proof.
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { startStaticServer } from './scripts/lib/static-server.mjs';

const OUT = process.argv[2];
if (!OUT) throw new Error('usage: node scratch-phone-shots.mjs <output-dir>');
mkdirSync(OUT, { recursive: true });

const WIDTHS = [375, 390, 430];
const THEMES = ['light', 'dark'];
const PATHS = [
  ['chapter', '/field-guide/llm-mental-model/'],
  ['concept', '/concepts/prompt-caching/'],
  ['home', '/'],
  ['concepts-index', '/concepts/'],
  ['changelog', '/changelog/'],
  ['blogs-index', '/blogs/'],
  ['about', '/about/'],
  ['zh-chapter', '/zh/field-guide/llm-mental-model/'],
  ['zh-home', '/zh/'],
];

const server = await startStaticServer('./dist');
const browser = await chromium.launch();
const lines = [];

for (const w of WIDTHS) {
  for (const theme of THEMES) {
    const ctx = await browser.newContext({
      viewport: { width: w, height: 900 }, colorScheme: theme, deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    for (const [slug, path] of PATHS) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      // Freeze anything that could differ between runs for reasons unrelated
      // to layout: the details elements the changelog script opens by width,
      // and any transition mid-flight.
      await page.waitForTimeout(500);
      const name = `${w}-${theme}-${slug}.png`;
      const buf = await page.screenshot({ path: `${OUT}/${name}`, fullPage: true });
      lines.push(`${createHash('sha256').update(buf).digest('hex')}  ${name}`);
    }
    await ctx.close();
  }
}

await browser.close();
await server.close();
writeFileSync(`${OUT}/baseline.sha256`, lines.sort().join('\n') + '\n');
console.log(`wrote ${lines.length} screenshots to ${OUT}`);
```

- [ ] **Step 3: Run it against the unmodified build**

```bash
node scratch-phone-shots.mjs /Users/cq/.claude/jobs/69e28ade/tmp/phone-baseline
wc -l /Users/cq/.claude/jobs/69e28ade/tmp/phone-baseline/baseline.sha256
```

Expected: `wrote 54 screenshots to …` and `54` lines. If any count is lower, a path 404'd — fix the path list before continuing, because a missing baseline is a silent gap in the phone-parity proof.

- [ ] **Step 4: Remove the scratch script from the worktree**

```bash
rm scratch-phone-shots.mjs
git status --short   # must be empty
```

The script is reproduced verbatim in Task 9, so nothing is lost. Keeping it out of the tree keeps the diff to real changes.

- [ ] **Step 5: No commit**

This task commits nothing — it produces an out-of-repo artifact. Confirm `git status --short` is empty and move on.

---

## Task 2: Width and prose tokens

Inert: nothing consumes them yet, so nothing renders differently. The point is to land the values and their reasoning in one reviewable step.

**Files:**
- Modify: `src/styles/tokens.css` (insert after the spacing scale, ~line 28; append the media query at end of file)
- Test: `scripts/__tests__/design-tokens.test.mjs`

**Interfaces:**
- Produces: `--w-shell`, `--w-wrap`, `--w-rail-nav`, `--w-rail-toc`, `--w-measure`, `--t-prose`. Tasks 3–8 consume these names exactly.

- [ ] **Step 1: Write the failing test**

Append to `scripts/__tests__/design-tokens.test.mjs`:

```js
// The layout widths added 2026-07-28. Source-level, like the rules above:
// this asserts the token layer exists and is declared once, in tokens.css.
// Whether the rendered page honours it is the design guard's job.
test('layout width tokens are declared in tokens.css', () => {
  const src = read('../../src/styles/tokens.css');
  const required = ['--w-shell', '--w-wrap', '--w-rail-nav', '--w-rail-toc', '--w-measure', '--t-prose'];
  const missing = required.filter((t) => !new RegExp(`^\\s*${t}\\s*:`, 'm').test(src));
  assert.deepEqual(missing, [], `width tokens missing from tokens.css: ${missing.join(', ')}`);
});

// --t-prose is the whole point of the 2026-07-28 layout change: 16px until
// the column is wide enough to carry 18px, which is 1360px. Without the
// step, the widened column measures 82 characters and breaks the guard's
// own 78 ceiling. Asserted here so a future edit cannot quietly drop the
// media query and leave a token that never changes.
test('--t-prose steps up at the 1360px breakpoint', () => {
  const src = read('../../src/styles/tokens.css');
  const step = src.match(/@media\s*\(min-width:\s*1360px\)\s*\{[^}]*:root\s*\{[^}]*--t-prose\s*:\s*([^;]+);/);
  assert.ok(step, '--t-prose has no @media (min-width: 1360px) override in tokens.css');
  assert.match(step[1].trim(), /var\(--t-md\)/, `--t-prose must step to var(--t-md), got ${step[1].trim()}`);
});

// A vw-based clamp on the rails was designed and rejected: the shell caps at
// 1440px while vw keeps growing, so vw rails widen past the cap and the
// article column SHRINKS as the screen widens — measured 851px at 1440 down
// to 765px at 1728, pushing the measure to 79 characters. Guarded because
// clamp() is the intuitive thing to reach for here and it is wrong.
test('rail widths do not depend on the viewport', () => {
  const src = read('../../src/styles/tokens.css');
  for (const t of ['--w-rail-nav', '--w-rail-toc']) {
    const decl = src.match(new RegExp(`^\\s*${t}\\s*:\\s*([^;]+);`, 'm'));
    assert.ok(decl, `${t} not declared`);
    assert.doesNotMatch(decl[1], /vw|vmin|vmax|%/,
      `${t} must be a fixed length, not viewport-relative — got ${decl[1].trim()}`);
  }
});
```

- [ ] **Step 2: Run it to verify it fails**

```bash
node --test --experimental-strip-types scripts/__tests__/design-tokens.test.mjs
```

Expected: FAIL — `width tokens missing from tokens.css: --w-shell, --w-wrap, --w-rail-nav, --w-rail-toc, --w-measure, --t-prose`, and `--t-prose has no @media (min-width: 1360px) override`.

- [ ] **Step 3: Add the tokens**

In `src/styles/tokens.css`, immediately after the spacing scale block (the line `--s-5: 24px; --s-6: 32px; --s-7: 48px; --s-8: 64px; --s-9: 96px;`), insert:

```css

  /* ---- layout widths (2026-07-28) ----
   * The shell was frozen at 1180px, so a 1728px screen spent 274px per side
   * on dead margin — 32% of the viewport — while the article carried 536px of
   * prose at 63 characters. Ten reference documentation sites measured in
   * Chromium at 1728px run 690-900px reading columns; none caps at 1180.
   *
   * The ceiling, not full bleed, is the load-bearing decision. Measured at
   * 2560px: the pure rail-to-edge sites (React, GitHub, Astro) strand the
   * text with ~512px of void between rail and prose, and Kubernetes, which
   * caps nothing, grows the line to 159 characters. MDN (1440px) and Next.js
   * (1400px) cap and centre, and never show more than 48px between rail and
   * text, because the ceiling is chosen so the middle region IS the reading
   * width — there is no slack left to strand it in. */
  --w-shell: 1440px;
  --w-wrap: 1080px;

  /* Fixed lengths, deliberately NOT clamp(224px, 17vw, 288px). The shell caps
   * at 1440px while vw keeps growing, so viewport-relative rails widen past
   * the cap and the article column shrinks as the screen widens — measured
   * 851px at 1440px down to 765px at 1728px, which also pushed the measure to
   * 79 characters at 1440px. Fixed rails keep the column monotonic. */
  --w-rail-nav: 288px;
  --w-rail-toc: 264px;

  /* 62ch, not the 72ch the classic measure would suggest. `ch` is the advance
   * width of the `0` glyph — 0.6em in Inter — while the character the design
   * guard measures averages 0.531em, so `ch` runs ~13% wide. Measured at
   * 18px: 1ch = 10.79px against one guard-character at 9.56px. 62ch is
   * therefore 70 guard-characters, and since both scale linearly with
   * font-size that equivalence holds at every step of the type scale. A token
   * set to 72ch would silently deliver 81 characters. */
  --w-measure: 62ch;

  /* Article body text. Steps to --t-md at 1360px — see the @media at the foot
   * of this file. Separate from --t-base so cards, nav and chrome, which also
   * use --t-base, are untouched by the step. */
  --t-prose: var(--t-base);
```

- [ ] **Step 4: Add the step, at the END of tokens.css**

Append to the very end of `src/styles/tokens.css`:

```css

/* --t-prose steps up where the column can carry it. Declared at the foot of
 * the file, after the :root block it overrides: a @media block that redefines
 * a custom property at the same specificity loses to the base declaration on
 * source order, and this repo has shipped that exact bug three times
 * (.nav-toggle display twice, brand padding twice). Moving this rule above
 * the :root block will silently disable it, and the token test will catch
 * the deletion but not the reorder — the design guard's prose-size assertion
 * in Task 5 is what catches the reorder.
 *
 * 1360px is derived, not chosen: 18px sustains 60 characters only once the
 * article column reaches ~670px, which is where the shell arrives at 1360px
 * with both rails present. */
@media (min-width: 1360px) {
  :root { --t-prose: var(--t-md); }
}
```

- [ ] **Step 5: Run the test to verify it passes**

```bash
node --test --experimental-strip-types scripts/__tests__/design-tokens.test.mjs
```

Expected: PASS, all tests in the file.

- [ ] **Step 6: Confirm nothing renders differently**

```bash
npm run build && npm test
```

Expected: build clean, all unit tests pass. No consumer exists yet, so the rendered site is unchanged.

- [ ] **Step 7: Commit**

```bash
git add src/styles/tokens.css scripts/__tests__/design-tokens.test.mjs
git commit -m "feat(design): add layout width tokens and --t-prose

Inert — nothing consumes them yet. --w-measure is 62ch rather than 72ch
because CSS ch is Inter's 0 glyph at 0.6em while the guard's average
character is 0.531em, so 62ch is what actually delivers 70 characters.
Rails are fixed lengths, not a vw clamp: the shell caps at 1440 while vw
does not, so vw rails shrink the article column as the screen widens.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XQpNvBzrE9ueMsrK72nw4A"
```

---

## Task 3: Cap running text at the measure

No geometry changes. This alone fixes 768px (80ch → 70ch) and every index page (97–108ch → ~70ch), and it is what makes Task 8's widening safe.

**Files:**
- Modify: `src/styles/guide.css` (`.outro p` at ~line 856; new block appended near the phase body rules)
- Modify: `src/styles/site.css` (index-page prose)
- Not modified: `src/layouts/BlogLayout.astro` — it already carries its own measured 58ch cap (see Step 5)
- Test: `scripts/__tests__/design/system.mjs`

**Interfaces:**
- Consumes: `--w-measure` from Task 2.
- Produces: `MEASURE_PAGES` and `measureChars(page)` in `system.mjs`, reused by Task 4 and Task 8.

- [ ] **Step 1: Write the failing test**

In `scripts/__tests__/design/system.mjs`, replace the whole existing `test('prose measure is 60-75 characters', …)` block (starts at ~line 393, ends at the `});` before the `SYNTAX_CLASSES` comment) with:

```js
  // The shipped guard ran at ONE viewport (1280px) against THREE article
  // pages, which is why three separate measure defects shipped green: 30
  // characters at 901px (both rails switching on with no width to hold them),
  // 80 characters at 768px, and 97-108 characters on every index page, none
  // of which has ever had a max-width.
  //
  // The window is 60-78 at >=768px. Below 700px it is 35-78: 60 characters at
  // 16px needs 510px of column, which does not exist in a 390px viewport, so
  // asserting 60 there would demand a font size no phone should use.
  const MEASURE_WIDTHS = [390, 430, 768, 901, 1024, 1152, 1280, 1360, 1440, 1728];
  const MEASURE_PAGES = [
    '/field-guide/llm-mental-model/',
    '/concepts/prompt-caching/',
    '/deep-dives/mcp/mcp-building-servers-in-practice/',
    '/blogs/nemo-guardrails-vs-guardrails-ai-vs-llama-guard-vs-llm-guard/',
    '/',
    '/concepts/',
    '/changelog/',
    '/blogs/',
    '/about/',
    '/privacy/',
    '/zh/concepts/prompt-caching/',
  ];

  /**
   * Width in characters of every substantial run of text on the page, using
   * the average advance of the lowercase alphabet plus space in each block's
   * own computed font. Returns {max, worst} plus `seen` so a selector that
   * stops matching cannot pass vacuously.
   */
  const measureChars = () => {
    const c = document.createElement('canvas').getContext('2d');
    const ab = 'abcdefghijklmnopqrstuvwxyz ';
    const visible = (el) => {
      const b = el.getBoundingClientRect();
      if (b.width < 1 || b.height < 1) return false;
      const cs = getComputedStyle(el);
      return cs.visibility !== 'hidden' && cs.display !== 'none';
    };
    // A block carries a line of text only if it has no block-level child.
    // Length-based rules are not enough: li.changelog-entry wraps <time> and
    // <details>, and BOTH ways of having no long child defeat them — below
    // 900px Chromium reports empty innerText for content inside a closed
    // <details>, and above it an entry whose bullets are each under the
    // threshold produces no qualifying child either. Either way the wrapper
    // survives as a "leaf" and its column width is read as a line length,
    // reporting a failure no CSS change could fix.
    const BLOCK_CHILD = 'p, li, ul, ol, div, section, table, pre, details, summary, figure, blockquote, h1, h2, h3, h4, h5, h6, time, nav, aside';
    const cands = [...document.querySelectorAll('main p, main li, .lede, .toc-desc, .entry-summary')]
      .filter((el) => el.innerText.trim().length >= 120 && visible(el) && !el.querySelector(BLOCK_CHILD));
    const leaves = cands.filter((el) => !cands.some((o) => o !== el && el.contains(o)));
    let max = 0, worst = null, seen = 0;
    for (const el of leaves) {
      seen++;
      const cs = getComputedStyle(el);
      c.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const chars = Math.round(el.getBoundingClientRect().width / (c.measureText(ab).width / ab.length));
      if (chars > max) {
        max = chars;
        worst = `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} ${Math.round(el.getBoundingClientRect().width)}px @${cs.fontSize}`;
      }
    }
    return { max, worst, seen };
  };

  for (const w of MEASURE_WIDTHS) {
    test(`prose measure is 60-78 characters (35-78 below 700px) @ ${w}px`, async () => {
      const [floor, ceiling] = w < 700 ? [35, 78] : [60, 78];
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      const bad = [];
      let total = 0;
      for (const path of MEASURE_PAGES) {
        await page.goto(server.url + path, { waitUntil: 'load' });
        const { max, worst, seen } = await page.evaluate(measureChars);
        total += seen;
        // A page with no multi-line prose at this width is not a failure —
        // /changelog/ below 900px is entirely inside a collapsed <details>
        // and its hero lede is 74 characters, so nothing on it can wrap.
        // Coverage is enforced across widths by the assertion below instead,
        // so a page cannot silently drop out of the audit.
        if (seen === 0) continue;
        if (max < floor || max > ceiling) bad.push(`${path} = ${max} chars (${worst})`);
      }
      await ctx.close();
      assert.ok(total > 0, 'measured nothing on any page — the selector list is stale');
      assert.deepEqual(bad, [], `measure outside ${floor}-${ceiling} @ ${w}px:\n${bad.join('\n')}`);
    });
  }

  // Per-width vacuity is legitimate; permanent vacuity is not. Every page in
  // the audit must yield a real measurement at at least one width, or it is
  // being listed as covered while contributing nothing — the "coverage
  // pretending to be coverage" failure this suite already guards elsewhere.
  test('every audited page is measured at some width', async () => {
    const uncovered = [];
    for (const path of MEASURE_PAGES) {
      let covered = false;
      for (const w of MEASURE_WIDTHS) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
        const page = await ctx.newPage();
        await page.goto(server.url + path, { waitUntil: 'load' });
        const { seen } = await page.evaluate(measureChars);
        await ctx.close();
        if (seen > 0) { covered = true; break; }
      }
      if (!covered) uncovered.push(path);
    }
    assert.deepEqual(uncovered, [], `measured at no width — listed as covered, contributes nothing:\n${uncovered.join('\n')}`);
  });
```

- [ ] **Step 2: Run it to verify it fails, and record which widths fail**

```bash
npm run test:design 2>&1 | grep -E "^(not ok|ok).*prose measure" 
```

Expected: FAIL at 768, 901, 1024, 1152, 1280, 1360, 1440 and 1728. Record the reported numbers — 768 should report ~80 chars from an index page, 901 should report 30 chars from `/field-guide/llm-mental-model/`. If 390 or 430 fail, stop: the floor is wrong for phones and the window needs revisiting before any CSS is written.

- [ ] **Step 3: Cap article and index prose**

In `src/styles/guide.css`, replace the `.outro p` rule (~line 856):

```css
.outro p { font-size: var(--t-sm); color: var(--muted); line-height: var(--lh-sm); max-width: 60ch; margin: 0 auto; }
```

with:

```css
.outro p { font-size: var(--t-sm); color: var(--muted); line-height: var(--lh-sm); max-width: var(--w-measure); margin: 0 auto; }
```

Then append this block to `src/styles/guide.css`, immediately before the `/* ============ TABLET+ ============ */` comment:

```css
/* ============ MEASURE ============ */
/* Running text is capped; everything else takes the full column. This is the
 * rule that makes the 2026-07-28 widening safe — without it, a wider shell
 * only buys longer lines. It also fixes two defects that predate the
 * widening: 768px measured 80 characters, and no index page had a max-width
 * at all (97-108 characters).
 *
 * Applies to prose wherever it sits, including inside .callout, .deliverable,
 * .qa and .observe — those are prose boxes whose SURFACE spans the column
 * while their content is ordinary running text, and an uncapped .deliverable p
 * measured 82 characters at 768px. What is exempt is the non-prose content
 * that the extra column width exists for in the first place: pre, table,
 * .diagram, .threat-grid and .code-tabs are never selected here, so they are
 * exempt by construction rather than by reset. */
.phase p,
.step p,
.step ul li,
.phase .goal,
.shell-plan-section p,
.shell-plan-section ul.outline li strong {
  max-width: var(--w-measure);
}
```

- [ ] **Step 4: Cap index-page prose**

Append to `src/styles/site.css`, at the end of the file:

```css
/* ---- Measure cap, index and landing pages (2026-07-28) ----
   These carried no max-width at all: measured at 1728px, /concepts/ items ran
   97 characters, changelog entries 98, blog card summaries 108, About ledes
   87 and home card taglines 102. Capping them shortens lines that were
   already too long, and it is what lets .wrap widen in a later commit without
   the extra width turning into extra line length.

   `.lede` is deliberately bare rather than `.hero .lede`. It started as
   `.hero .lede`, which never matched the About page (AboutView puts the lede
   inside `<section class="wrap">`, not inside the hero). Unscoping it also
   reaches /privacy/ and /zh/privacy/, which use the class on nine body
   elements — two of them `<ul>`s — not just on a hero lede. That is intended:
   those paragraphs were running ~82 characters. /privacy/ is in the design
   suite's MEASURE_PAGES so the wider reach stays tested. */
.lede,
.toc-desc,
.home-card-tagline,
.blog-card-summary,
.changelog-items li,
.entry-summary {
  max-width: var(--w-measure);
}
```

`.entry-summary` does not exist yet — it is the class Task 7 gives the entry summary that is currently an inline-styled `<div>` in `SectionIndexView.astro`. Declaring it here now is deliberate: the rule is inert until Task 7 lands, and the alternative (adding it in Task 7) splits one concept across two commits. The `/concepts/` measure assertion therefore still fails after this task and passes after Task 7.

- [ ] **Step 5: Blog prose — no rule to add**

`BlogLayout.astro` already carries its own measure cap, predating this branch: `.blog-article p, ul, ol, blockquote, h2, h3, .blog-header-summary { max-width: 58ch; }`, with its own in-browser provenance in the comment above it (`ch` is the width of "0", wider than the average lowercase glyph, so 58ch lands at ~70 real characters). This task adds **no** blog rule. A `var(--w-measure)` rule was added here originally and removed as dead code: it sat earlier in the same scoped block at identical specificity, so the 58ch rule won and the token rule never applied. Swapping the 58ch rule to the token is a separate change — it would move every post from ~70 to ~74 characters — and is out of scope here.

- [ ] **Step 6: Run the guard**

```bash
npm run build && npm run test:design 2>&1 | grep -E "prose measure"
```

Expected: `prose measure` PASSES at 390, 430, 768, 1152, 1280, 1360, 1440 and 1728. It FAILS at 901 and 1024 only, and only on the four article pages, reporting roughly 30 and 45 characters — the starved article column that Task 4 widens. `/changelog/` and `/about/` are fully resolved at every width.

A page with no multi-line prose at a given width (e.g. `/changelog/` below
900px, entirely inside a collapsed `<details>`, hero lede 74 characters) is
**not** a per-width failure — a block shorter than the measure can never
produce a long line, so there is nothing to check. Silently dropping the
check per-width would let a page fall out of coverage unnoticed, so coverage
is enforced separately, across widths, by `every audited page is measured at
some width`: that test FAILS, naming `/concepts/` only (its entry summaries
aren't measurable until Task 7's `.entry-summary` class lands — a documented
intermediate state, not a permanent exemption). This is the expected
intermediate state; record it so the next task's reviewer knows what is
outstanding.

- [ ] **Step 7: Assert the blog measure as an outcome, from computed styles not source**

The article and index caps are proven by Step 6's numbers — 768px cannot move from 80 to ≤78 characters unless the cap computed. The blog is measured separately because its cap lives in `BlogLayout.astro` rather than in either stylesheet. Assert the **character count**, not the presence of a `max-width`: an earlier version of this test asserted only `maxW !== 'none'` and `width <= 700px`, which passed identically whether the token rule applied or the pre-existing 58ch rule did — and the 58ch rule was in fact the one winning, so the assertion verified a mechanism it could not see. Append to `scripts/__tests__/design/system.mjs`, inside the `describe` block:

```js
  // Renamed from "blog prose is capped by --w-measure", which asserted only
  // that a max-width existed. It passed identically whether this branch's
  // token rule applied or the pre-existing 58ch rule did — and in fact the
  // 58ch rule won, later in the same scoped block at equal specificity, so
  // the assertion verified a mechanism it could not see. Assert the outcome.
  test('blog prose measures 60-78 characters', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const bad = [];
    for (const path of [
      '/blogs/nemo-guardrails-vs-guardrails-ai-vs-llama-guard-vs-llm-guard/',
      '/zh/blogs/nemo-guardrails-vs-guardrails-ai-vs-llama-guard-vs-llm-guard/',
    ]) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      const got = await page.evaluate(() => {
        const el = [...document.querySelectorAll('.blog-article p')].find((x) => x.innerText.trim().length > 250);
        if (!el) return null;
        const cs = getComputedStyle(el);
        const c = document.createElement('canvas').getContext('2d');
        c.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const ab = 'abcdefghijklmnopqrstuvwxyz ';
        const w = el.getBoundingClientRect().width;
        return { chars: Math.round(w / (c.measureText(ab).width / ab.length)), w: Math.round(w) };
      });
      if (!got) { bad.push(`${path} found no .blog-article p over 250 chars`); continue; }
      if (got.chars < 60 || got.chars > 78) bad.push(`${path} = ${got.chars} chars (${got.w}px)`);
    }
    await ctx.close();
    assert.deepEqual(bad, [], `blog measure out of range:\n${bad.join('\n')}`);
  });
```

Run `npm run test:design 2>&1 | grep -A3 "blog prose measures"`. Expected: PASS, at 69 characters (en) and 70 (zh).

- [ ] **Step 8: Commit**

```bash
git add src/styles/guide.css src/styles/site.css scripts/__tests__/design/system.mjs
git commit -m "fix(design): cap running text at the measure; widen the guard

The measure guard ran at one viewport against three article pages, so three
defects shipped green: 30 characters at 901px, 80 at 768px, and 97-108 on
every index page, none of which had a max-width at all. The guard now runs
at ten viewports across article and index pages in both locales.

The blog needs no rule: BlogLayout already carries its own measured 58ch cap,
asserted here as a character count rather than as the presence of a max-width.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XQpNvBzrE9ueMsrK72nw4A"
```

---

## Task 4: The article shell — geometry and breakpoint ladder

**Files:**
- Modify: `src/styles/site.css` — `.chapter-shell` (~line 224), `.chapter-side` (~line 230), `.chapter-toc` (~line 265), the `@media (max-width: 900px)` blocks (~line 319 and ~line 337)
- Test: `scripts/__tests__/design/system.mjs`

**Interfaces:**
- Consumes: `--w-shell`, `--w-rail-nav`, `--w-rail-toc` from Task 2.
- Produces: the geometry every later assertion measures. Column formula: `< 1024px` full width; `1024–1359px` = `W − 384`; `≥ 1360px` = `min(W, 1440) − 680`.

- [ ] **Step 1: Write the failing test**

Append inside the `describe('design system', …)` block in `scripts/__tests__/design/system.mjs`:

```js
  // The reported bug: at 1728px the shell froze at 1180px and spent 274px per
  // side — 15.9% of the viewport — on dead margin, while the article carried
  // 536px of prose. No reference documentation site measured caps at 1180.
  for (const w of [1440, 1728]) {
    test(`article shell leaves no dead gutter @ ${w}px`, async () => {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      const bad = [];
      for (const path of ['/field-guide/llm-mental-model/', '/concepts/prompt-caching/', '/zh/concepts/prompt-caching/']) {
        await page.goto(server.url + path, { waitUntil: 'load' });
        const pct = await page.evaluate(() => {
          const el = document.querySelector('.chapter-shell');
          if (!el) return null;
          return Math.round((el.getBoundingClientRect().left / window.innerWidth) * 1000) / 10;
        });
        if (pct === null) { bad.push(`${path} has no .chapter-shell`); continue; }
        if (pct > 12) bad.push(`${path} gutter ${pct}% of viewport`);
      }
      await ctx.close();
      assert.deepEqual(bad, [], `dead gutter over 12% @ ${w}px:\n${bad.join('\n')}`);
    });
  }

  // Both rails switched on at 901px against a shell that had no width to give
  // them, leaving the article 353px and the prose 257px — 30 characters. The
  // ladder below is derived: the TOC rail plus its gap costs 296px, so below
  // ~1290px the remaining column cannot hold 60 characters at 16px.
  test('rails only appear where the column can still hold 60 characters', async () => {
    const bad = [];
    for (const [w, wantNav, wantToc] of [
      [900, false, false], [1023, false, false],
      [1024, true, false], [1359, true, false],
      [1360, true, true], [1728, true, true],
    ]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(server.url + '/field-guide/llm-mental-model/', { waitUntil: 'load' });
      const got = await page.evaluate(() => {
        const railed = (sel) => {
          const el = document.querySelector(sel);
          if (!el) return false;
          const cs = getComputedStyle(el);
          if (cs.display === 'none') return false;
          // A rail is a rail only while it is beside the article. The TOC
          // below 1360px is in flow above it at full width, which is not a rail.
          return el.getBoundingClientRect().width < window.innerWidth * 0.5;
        };
        return { nav: railed('.chapter-side'), toc: railed('.chapter-toc') };
      });
      await ctx.close();
      if (got.nav !== wantNav) bad.push(`@${w}px nav rail ${got.nav}, want ${wantNav}`);
      if (got.toc !== wantToc) bad.push(`@${w}px toc rail ${got.toc}, want ${wantToc}`);
    }
    assert.deepEqual(bad, [], `breakpoint ladder wrong:\n${bad.join('\n')}`);
  });
```

- [ ] **Step 2: Run it to verify it fails**

```bash
npm run test:design 2>&1 | grep -E "dead gutter|breakpoint ladder"
```

Expected: FAIL. Gutter reports `15.9%` at 1728 and `9.0%` at 1440 (so 1440 may pass — that is fine, 1728 is the reported bug). Ladder reports `@900px toc rail false, want false` passing but `@1024px toc rail true, want false` and `@1359px toc rail true, want false` failing.

- [ ] **Step 3: Widen the shell and the rails**

In `src/styles/site.css`, replace:

```css
/* Chapter page: two-column shell with sticky left chapter nav. */
.chapter-shell {
  display: flex; gap: var(--s-6); align-items: flex-start;
  max-width: 1180px; margin: 0 auto; padding: 0 var(--s-4);
}
```

with:

```css
/* Chapter page: bounded rail-to-edge shell.
   Rails sit --s-6 from the viewport edge and the whole thing is fluid up to
   --w-shell, past which it centres. The ceiling is the load-bearing part:
   measured at 2560px, the sites that keep rails at the edge forever (React,
   GitHub, Astro) leave ~512px of void between rail and text, while MDN and
   Next.js cap at 1440/1400 and never show more than 48px, because the
   ceiling is chosen so the middle region IS the reading width.
   The site header is already edge-to-edge; at 1180px the body below it was
   an island aligned to nothing. */
.chapter-shell {
  display: flex; gap: var(--s-6); align-items: flex-start;
  max-width: var(--w-shell); margin: 0 auto; padding: 0 var(--s-6);
}
```

Replace `width: 232px;` in `.chapter-side` with `width: var(--w-rail-nav);` and `width: 220px;` in `.chapter-toc` with `width: var(--w-rail-toc);`. Change nothing else in either rule.

- [ ] **Step 4: Replace the breakpoint blocks**

Replace this block (~line 318):

```css
/* Mobile: TOC moves above the article as a collapsible accordion. */
@media (max-width: 900px) {
  .chapter-toc {
    display: none;
  }
}
```

with:

```css
/* Below 900px the TOC is not rendered at all. Unchanged from the shipped
   design and deliberately so — the 2026-07-28 layout change guarantees phone
   rendering is byte-identical, and adding an accordion here would break that
   promise for the one class of device it was made about. */
@media (max-width: 899.98px) {
  .chapter-toc {
    display: none;
  }
}
```

Then replace this block (~line 337):

```css
@media (max-width: 900px) {
  .chapter-side { display: none; }
  .chapter-shell { padding: 0; }
  .mobile-section-nav { display: block; }
}
```

with:

```css
/* --- Breakpoint ladder (2026-07-28) -------------------------------------
   Both derived from where a rail can appear without starving the text, not
   chosen for roundness.

   1024: below it neither rail fits. The shipped design switched BOTH on at
   901px against a shell with no width to hold them, leaving the article
   353px and the prose 257px — 30 characters, under this project's own 60
   floor, at every width from 901 to 1180. The guard ran at 1280 only and
   never saw it.

   1360: the TOC rail plus its gap costs 296px, so below ~1290px the
   remaining column cannot hold 60 characters at 16px. 1360 clears that with
   margin and is also where --t-prose steps to 18px, so "both rails" and
   "larger type" are one wide-layout mode rather than two breakpoints to
   reason about separately. */
@media (max-width: 1023.98px) {
  .chapter-side { display: none; }
  .chapter-shell { padding: 0; }
  .mobile-section-nav { display: block; }
}

/* 900-1359px: the TOC exists but not as a rail. It renders in flow above the
   article, collapsed — the accordion the comment above the .chapter-toc
   display:none rule has promised since the redesign and which was never
   actually implemented. Raising the rail to 1360px without this would take
   the TOC away from every common laptop width. */
@media (min-width: 900px) and (max-width: 1359.98px) {
  .chapter-shell { flex-wrap: wrap; }
  .chapter-toc {
    order: -1;
    width: 100%;
    position: static;
    max-height: none;
    overflow-y: visible;
    border-left: 0;
    padding-left: var(--s-4);
    padding-right: var(--s-4);
    margin-bottom: var(--s-4);
  }
  /* The rail was always narrow enough to wrap by itself, so nothing ever
     capped it. In flow at full width it is the first place a TOC entry can
     run long: /deep-dives/mcp/mcp-building-servers-in-practice/ carries a
     190-character sentence-style h2 that rendered as a single unbroken line
     at 1280px, against a 78-character ceiling. Capping the item rather than
     the list keeps the h3 indent working. */
  .chapter-toc-item { max-width: var(--w-measure); }
}
```

- [ ] **Step 5: Run the guard**

```bash
npm run build && npm run test:design 2>&1 | grep -E "dead gutter|breakpoint ladder|prose measure"
```

Expected: `dead gutter` PASS at both widths. `breakpoint ladder` PASS. `prose measure` PASSES at all ten widths — 390, 430, 768, 901, 1024, 1152, 1280, 1360, 1440, 1728 — because the measure cap (`--w-measure`, already wired into `guide.css`, `site.css` and `BlogLayout.astro` by an earlier task) bounds the widened column at 62ch regardless of the raw column width; expect roughly 74 characters at the capped widths and 64 at 1024. This requires the `.chapter-toc-item { max-width: var(--w-measure); }` rule inside the 900–1359.98px accordion block above — without it, the accordion is the first context that ever lays the TOC out full-width, and a long sentence-style `<h2>` (e.g. the 190-character heading on `/deep-dives/mcp/mcp-building-servers-in-practice/`) renders as a single unbroken line at 1280px, failing `prose measure` at 901, 1024, 1152 and 1280 with no other change to explain it. `every audited page is measured at some width` still fails, naming `/concepts/` only — its entry summaries get their class in a later task, not this one.

- [ ] **Step 6: Verify the numbers against the plan's reference table**

```bash
npm run test:design 2>&1 | grep -E "no horizontal overflow"
```

Expected: PASS at 375, 390 and 768. If 768 fails, the `flex-wrap` block is overflowing — check that `.chapter-toc` at `width: 100%` is inside a shell with `padding: 0`, which means its own `padding-left/right` is what keeps it off the edge.

- [ ] **Step 7: Commit**

```bash
git add src/styles/site.css scripts/__tests__/design/system.mjs
git commit -m "feat(design): bounded rail-to-edge article shell

The shell was frozen at 1180px, spending 274px per side at 1728px while the
article carried 536px of prose. It is now fluid to a 1440px ceiling with
rails --s-6 from the edge, centring past the ceiling — the MDN/Next.js
model, which at 2560px shows 48px between rail and text where the
never-cap sites show ~512px of void.

Also fixes the 901-1180px band, where both rails switched on against a
shell with no width to hold them and left the article 30 characters wide.
The TOC now waits for 1360px and renders as an in-flow accordion below
that — the behaviour the existing comment claimed and never implemented.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XQpNvBzrE9ueMsrK72nw4A"
```

---

## Task 5: Step article prose to 18px at 1360px

**Files:**
- Modify: `src/styles/guide.css` — five declarations at ~lines 320, 353, 377, 424, 427
- Test: `scripts/__tests__/design/system.mjs`

**Interfaces:**
- Consumes: `--t-prose` from Task 2, the shell geometry from Task 4.
- Produces: the final measure numbers — 61ch at 1360, 69ch at 1440 and above.

- [ ] **Step 1: Write the failing test**

Append inside the `describe` block in `scripts/__tests__/design/system.mjs`:

```js
  // --t-prose is declared in :root and stepped in a @media at the foot of
  // tokens.css. A same-specificity custom-property override loses to the base
  // declaration on source order, and this repo has shipped that bug three
  // times — so assert the COMPUTED size, at a width either side of the step.
  // The source-level token test cannot see a reorder; this can.
  test('article prose steps to 18px at 1360px and not before', async () => {
    const bad = [];
    for (const [w, want] of [[390, '16px'], [1280, '16px'], [1359, '16px'], [1360, '18px'], [1728, '18px']]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      for (const path of ['/field-guide/llm-mental-model/', '/zh/field-guide/llm-mental-model/']) {
        await page.goto(server.url + path, { waitUntil: 'load' });
        const got = await page.evaluate(() => {
          const p = [...document.querySelectorAll('.step p')].find((x) => x.innerText.trim().length > 250);
          return p ? getComputedStyle(p).fontSize : null;
        });
        if (got === null) bad.push(`@${w}px ${path} found no .step p over 250 chars`);
        else if (got !== want) bad.push(`@${w}px ${path} = ${got}, want ${want}`);
      }
      await ctx.close();
    }
    assert.deepEqual(bad, [], `--t-prose step wrong:\n${bad.join('\n')}`);
  });
```

- [ ] **Step 2: Run it to verify it fails**

```bash
npm run test:design 2>&1 | grep -A3 "article prose steps"
```

Expected: FAIL — `@1360px /field-guide/llm-mental-model/ = 16px, want 18px` and the same at 1728. The 390/1280/1359 cases already pass, which is what confirms the assertion is reading a real element rather than reporting a default.

- [ ] **Step 3: Swap the five declarations**

In `src/styles/guide.css`, change `var(--t-base)` to `var(--t-prose)` in exactly these five places. Match each string exactly; do not regex the file.

`.phase .goal` (~line 320) — inside the rule, change:

```css
  font-size: var(--t-base);
```

to:

```css
  font-size: var(--t-prose);
```

Note: this rule is preceded by a long comment ending *"Raising it needs the column to widen first, which is a layout change, not a type change."* Replace that final sentence with: *"That layout change landed 2026-07-28; the lede now rides --t-prose with the rest of the article body."*

`.shell-plan-section p` (~line 353):

```css
.shell-plan-section p { font-size: var(--t-prose); line-height: var(--lh-base); margin-bottom: var(--s-3); color: var(--q-answer); }
```

`.shell-plan-section ul.outline li strong` (~line 377):

```css
.shell-plan-section ul.outline li strong { display: block; font-size: var(--t-prose); line-height: var(--lh-base); margin-bottom: var(--s-0); }
```

`.step p` (~line 424):

```css
.step p { font-size: var(--t-prose); line-height: var(--lh-base); margin-bottom: var(--s-4); }
```

`.step ul li` (~line 427):

```css
.step ul li { padding: var(--s-1) 0 var(--s-1) var(--s-4); position: relative; line-height: var(--lh-base); font-size: var(--t-prose); }
```

Leave `body { font-size: var(--t-base); }` alone — cards, nav and chrome must not move.

- [ ] **Step 4: Run the guard**

```bash
npm run build && npm run test:design 2>&1 | grep -E "article prose steps|prose measure"
```

Expected: `article prose steps` PASS. `prose measure` PASS at 390, 430, 768, 901, 1024, 1152, 1280, 1360, 1440, 1728 — **except** any width still failing on `/concepts/`, which waits for Task 7.

- [ ] **Step 5: Commit**

```bash
git add src/styles/guide.css scripts/__tests__/design/system.mjs
git commit -m "feat(design): step article prose to 18px above 1360px

The widened column measures 82 characters at 16px, over this project's own
78 ceiling. At 18px it measures 69 and the guard needs no relaxation.

This also closes the judgement call recorded at guide.css:314 — the lede was
held at --t-base because .phase capped prose at 536px where 18px measured 56,
under the 60 floor, and widening the column was 'a layout change, not a type
change'. That layout change is the previous commit.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XQpNvBzrE9ueMsrK72nw4A"
```

---

## Task 6: Delete the dead `.blog-shell` rule

**Files:**
- Modify: `src/layouts/BlogLayout.astro` — the `:global(.blog-shell)` rule at ~line 347–354, and the `blog-shell` class at ~line 162
- Test: `scripts/__tests__/design/system.mjs`

**Interfaces:**
- Consumes: `--w-shell` from Task 2, `.chapter-shell` geometry from Task 4.
- Produces: blog article column at `min(W,1440) − 384` = 1056px at 1440 and above.

- [ ] **Step 1: Write the failing test**

Append inside the `describe` block in `scripts/__tests__/design/system.mjs`:

```js
  // BlogLayout carried `:global(.blog-shell) { max-width: 1080px }` whose
  // comment claimed it widened the shell for wide comparison tables. It did
  // neither: 1080 is narrower than the 1180 it meant to override, and the
  // rule sat inside a <style is:global> block, which Astro's scoping pass
  // never touches — so :global() was never rewritten, the literal selector
  // shipped into the compiled CSS, and browsers dropped the whole rule as
  // invalid. It was never in a cascade contest with .chapter-shell at all;
  // it just wasn't there. Computed value: 1180px, .chapter-shell's own.
  // Seventh instance of "a reference hid where a CSS-source sweep cannot see
  // it" in this repo — not a same-specificity tie, since nothing was tied.
  // Asserted on the COMPUTED value, which is the only thing that would have
  // caught it.
  test('the blog shell uses the standard shell width', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const bad = [];
    for (const path of [
      '/blogs/nemo-guardrails-vs-guardrails-ai-vs-llama-guard-vs-llm-guard/',
      '/zh/blogs/nemo-guardrails-vs-guardrails-ai-vs-llama-guard-vs-llm-guard/',
    ]) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      const got = await page.evaluate(() => {
        const shell = document.querySelector('.chapter-shell');
        const main = document.querySelector('.chapter-main');
        if (!shell || !main) return null;
        return {
          maxW: getComputedStyle(shell).maxWidth,
          main: Math.round(main.getBoundingClientRect().width),
        };
      });
      if (!got) { bad.push(`${path} has no .chapter-shell/.chapter-main`); continue; }
      if (got.maxW !== '1440px') bad.push(`${path} shell max-width computed ${got.maxW}, want 1440px`);
      if (got.main < 1000) bad.push(`${path} article column ${got.main}px, want >=1000px`);
    }
    await ctx.close();
    assert.deepEqual(bad, [], `blog shell wrong:\n${bad.join('\n')}`);
  });
```

- [ ] **Step 2: Run it to verify it fails**

```bash
npm run test:design 2>&1 | grep -A3 "blog shell uses"
```

Expected: **PASS, before any code change.** This is the rare case where the guard cannot be proved red first: the `:global(.blog-shell)` rule sits inside a `<style is:global>` block, so Astro's scoping pass never rewrites the `:global()` wrapper, the literal (invalid) selector ships into the compiled CSS, and every browser drops the whole rule. `.chapter-shell`'s own value (`1440px` after Task 4) was already what computed, with or without the dead rule present — the defect is invisible to the browser, not merely invisible to a CSS-source read. Confirm this by running the command anyway and observing the pass; do not treat a pass here as a sign the test is wrong. The proof that the assertion is real is not a pre-fix red run — it is the deliberate-break check in Task 9 Step 4 (`check "blog shell" … 's/max-width: var(--w-shell)/max-width: 1180px/' "blog shell uses"`), which mutates `.chapter-shell` itself and confirms the assertion fails loudly when the shell actually changes.

- [ ] **Step 3: Delete the rule**

In `src/layouts/BlogLayout.astro`, delete this entire block (~lines 347–354):

```css
  /* ---- Wider shell for blog detail pages ------------------------------ */
  /* The default .chapter-shell maxes at 1180px (article column ≈ 868px),
     which is fine for narrow prose but cramps wide content like the
     "At a glance" 8-column comparison table. Widen specifically for
     blog detail pages so the article column gets ~1050px. */
  :global(.blog-shell) {
    max-width: 1080px;
  }
```

- [ ] **Step 4: Remove the now-unused class**

In `src/layouts/BlogLayout.astro` (~line 162), change:

```html
  <div class="chapter-shell blog-shell">
```

to:

```html
  <div class="chapter-shell">
```

Before deleting, confirm nothing else uses it:

```bash
grep -rn "blog-shell" src/ && echo "STILL REFERENCED — do not remove the class" || echo "safe to remove"
```

Expected: `safe to remove` after the two edits above.

- [ ] **Step 5: Run the guard**

```bash
npm run build && npm run test:design 2>&1 | grep -E "blog shell uses|prose measure"
```

Expected: `blog shell uses` PASS, reporting a 1056px article column. `prose measure` unchanged from Task 5 — the blog's prose is capped at 58ch by `BlogLayout.astro`'s own pre-existing rule (Task 3 Step 5), so widening its column gives the wide tables room without touching the line length.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/BlogLayout.astro scripts/__tests__/design/system.mjs
git commit -m "fix(design): delete BlogLayout's dead shell override

:global(.blog-shell) { max-width: 1080px } claimed in its comment to widen
the shell for wide comparison tables. 1080 is narrower than the 1180 it
meant to override, and it lost a same-specificity source-order tie to
.chapter-shell regardless, computing 1180px. Sixth instance of that failure
mode here, and the reason the new assertion reads the computed value.

The blog column now inherits the standard shell and lands at 1056px at
1440px and above, up from 884px — the wide-table headroom the dead rule was
asking for. Prose is unaffected, being capped at --w-measure.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XQpNvBzrE9ueMsrK72nw4A"
```

---

## Task 7: Move inline layout styles into CSS

No visual change — every value is preserved exactly. This exists because a CSS-source sweep structurally cannot see an inline `style` attribute, which is the first item on this repo's own list of recurring bug classes, and because Task 8 cannot give the entry list a second column while its grid lives in an attribute.

**Files:**
- Modify: `src/components/pages/SectionIndexView.astro` (~lines 87–92)
- Modify: `src/components/pages/DeepDivesView.astro` (~line 26)
- Modify: `src/components/pages/AboutView.astro` (~line 29)
- Modify: `src/pages/privacy.astro` (~line 9), `src/pages/zh/privacy.astro`
- Modify: `src/styles/site.css` (new classes)
- Test: `scripts/__tests__/design/system.mjs`

**Interfaces:**
- Consumes: `--w-measure` from Task 2, `.entry-summary` declared inert in Task 3.
- Produces: `.entry-list`, `.entry-item`, `.entry-link`, `.entry-title`, `.entry-summary`, `.group-card-grid`, `.wrap--prose`. Task 8 gives `.entry-list` and `.group-card-grid` their column counts.

- [ ] **Step 1: Write the failing test**

Append inside the `describe` block in `scripts/__tests__/design/system.mjs`:

```js
  // Inline style attributes are the first entry on this repo's list of
  // recurring bug classes: a CSS-source sweep structurally cannot see them,
  // and four separate font/colour defects have hidden there. Layout
  // properties are the ones that matter for the 2026-07-28 widening, because
  // a grid whose column count lives in an attribute cannot be changed by a
  // breakpoint. Content-level inline styles (visibility on the page-nav
  // spacer) are not layout and stay allowed.
  test('no layout property is set by an inline style attribute', () => {
    const banned = /(max-width|grid-template-columns|display\s*:\s*grid)/;
    const bad = [];
    let seen = 0;
    const walk = (dir) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        const p = resolve(dir, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.name === 'index.html') {
          const html = readFileSync(p, 'utf8');
          for (const m of html.matchAll(/\sstyle="([^"]*)"/g)) {
            seen++;
            if (banned.test(m[1])) {
              bad.push(`${p.slice(DIST.length)} → ${m[1].slice(0, 90)}`);
            }
          }
        }
      }
    };
    walk(DIST);
    assert.ok(seen > 0, 'found no inline style attributes at all — the walk is broken');
    assert.deepEqual([...new Set(bad)].slice(0, 20), [],
      `layout properties in inline style attributes:\n${[...new Set(bad)].slice(0, 20).join('\n')}`);
  });
```

- [ ] **Step 2: Run it to verify it fails**

```bash
npm run build && npm run test:design 2>&1 | grep -A8 "no layout property"
```

Expected: FAIL, listing at minimum the `grid-template-columns:repeat(auto-fit,minmax(280px,1fr))` from Deep-Dives group indexes and `max-width:760px` from `/about/` and `/privacy/`.

- [ ] **Step 3: Add the classes to `site.css`**

Append to `src/styles/site.css`:

```css
/* ---- Index entry lists (2026-07-28) ----
   Lifted out of inline style attributes in SectionIndexView.astro. Values are
   byte-for-byte what the attributes set; the only reason this moved is that a
   column count living in an attribute cannot be changed by a breakpoint, and
   an attribute is invisible to every CSS-source audit this repo runs. */
.entry-list { list-style: none; padding: 0; margin: 0; }
.entry-item { padding: var(--s-3) 0; border-bottom: 1px solid var(--border-soft); }
.entry-link { text-decoration: none; color: var(--ink); display: block; }
.entry-title {
  font-family: var(--font-display);
  font-size: var(--t-md);
  line-height: var(--lh-md);
}
.entry-summary {
  color: var(--muted);
  font-size: var(--t-sm);
  line-height: var(--lh-sm);
  margin-top: var(--s-1);
}

/* Deep-Dive group cards. Same lift, same values. */
.group-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--s-3);
  margin-top: var(--s-5);
}

/* Prose-only pages (About, Privacy). Replaces an inline max-width:760px that
   two files carried independently. */
.wrap--prose { max-width: 760px; }
```

`.entry-summary` already has its `max-width: var(--w-measure)` from Task 3's block at the foot of the file; that block comes later in source order, so the cap wins. Do not duplicate it here.

- [ ] **Step 4: Rewrite the SectionIndexView markup**

In `src/components/pages/SectionIndexView.astro`, replace:

```html
            <ul class="toc-list" style="list-style:none;padding:0;margin:0;">
              {g.items.map(e => (
                <li style="padding:var(--s-3) 0;border-bottom:1px solid var(--border-soft);">
                  <a class="entry-link" href={localizeHref(`${base}/${e.slug}`, locale)} style="text-decoration:none;color:var(--ink);display:block;">
                    <div style="font-family:var(--font-display);font-size:var(--t-md);line-height:var(--lh-md);">{e.title[locale]}</div>
                    <div style="color:var(--muted);font-size:var(--t-sm);line-height:var(--lh-sm);margin-top:var(--s-1);">{e.summary[locale]}</div>
                  </a>
                </li>
              ))}
            </ul>
```

with:

```html
            <ul class="entry-list">
              {g.items.map(e => (
                <li class="entry-item">
                  <a class="entry-link" href={localizeHref(`${base}/${e.slug}`, locale)}>
                    <div class="entry-title">{e.title[locale]}</div>
                    <div class="entry-summary">{e.summary[locale]}</div>
                  </a>
                </li>
              ))}
            </ul>
```

The class is renamed `toc-list` → `entry-list` deliberately: `toc-list` is also the class on a *grid* in `DeepDivesView.astro`, so one name meant two layouts. Check nothing else styles the old name:

```bash
grep -rn "toc-list" src/ | grep -v chapter-toc-list
```

Expected: only `DeepDivesView.astro` remains, which Step 5 renames too.

- [ ] **Step 5: Rewrite the DeepDivesView markup**

In `src/components/pages/DeepDivesView.astro`, replace:

```html
    <div class="toc-list" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--s-3);margin-top:var(--s-5);">
```

with:

```html
    <div class="group-card-grid">
```

- [ ] **Step 6: Rewrite the prose-page containers**

In `src/components/pages/AboutView.astro`, replace:

```html
  <section class="wrap" style="padding:var(--s-6) var(--s-4);max-width:760px;">
```

with:

```html
  <section class="wrap wrap--prose about-body">
```

and add to `src/styles/site.css`:

```css
.about-body { padding: var(--s-6) var(--s-4); }
```

In `src/pages/privacy.astro` and `src/pages/zh/privacy.astro`, replace:

```html
  <section class="wrap" data-pagefind-ignore style="padding:var(--s-5) 20px;max-width:760px;">
```

with:

```html
  <section class="wrap wrap--prose privacy-body" data-pagefind-ignore>
```

and add to `src/styles/site.css`:

```css
/* 20px, not var(--s-4): matches the un-tokenised 20px that .callout and other
   full-bleed blocks escape with `margin: … -20px`. The two must agree or the
   bleed over/undershoots the viewport edge. */
.privacy-body { padding: var(--s-5) 20px; }
```

Read the actual attribute in each privacy file before replacing — if the padding differs from `var(--s-5) 20px`, preserve what is there rather than what is written here, and adjust `.privacy-body` to match.

- [ ] **Step 7: Run the guard and confirm nothing moved**

```bash
npm run build && npm run test:design 2>&1 | grep -E "no layout property|prose measure|contrast AA"
```

Expected: `no layout property` PASS. `prose measure` — `/concepts/` now passes too, because `.entry-summary` exists and picks up the cap declared in Task 3. `contrast AA` unchanged at every theme and viewport.

- [ ] **Step 8: Confirm no visual regression on the index pages**

```bash
npm run verify && npm test
```

Expected: both pass. `verify` catches a broken route or orphaned entry, which is the realistic risk of a markup rewrite.

- [ ] **Step 9: Commit**

```bash
git add src/styles/site.css src/components/pages/SectionIndexView.astro src/components/pages/DeepDivesView.astro src/components/pages/AboutView.astro src/pages/privacy.astro src/pages/zh/privacy.astro scripts/__tests__/design/system.mjs
git commit -m "refactor(design): move layout styles out of inline attributes

Values preserved exactly; nothing renders differently. Inline style
attributes are the first entry on this repo's list of recurring bug classes
— a CSS-source sweep cannot see them — and a grid whose column count lives
in an attribute cannot be changed by a breakpoint, which the next commit
needs to do.

toc-list is renamed: it named a <ul> in SectionIndexView and a grid in
DeepDivesView, so one class meant two layouts.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XQpNvBzrE9ueMsrK72nw4A"
```

---

## Task 8: Widen index pages and pin the grid column counts

**Files:**
- Modify: `src/styles/site.css` — `.wrap` (~line 215), `.home-grid` (~line 646), `.blog-list` (~line 783), `.changelog-entry` (~line 873), plus the new `.entry-list` and `.group-card-grid` from Task 7
- Test: `scripts/__tests__/design/system.mjs`

**Interfaces:**
- Consumes: `--w-wrap`, `--w-measure`, and the classes from Task 7.
- Produces: final index geometry. Gutter at 1728 drops from 434px to 324px per side.

- [ ] **Step 1: Write the failing test**

Append inside the `describe` block in `scripts/__tests__/design/system.mjs`:

```js
  // Every index grid moves from auto-fit to explicit column counts. auto-fit
  // derives its column count from a minmax floor against a container that is
  // about to change width, which is exactly how a widening turns the
  // homepage's clean 3+2 into a 4+1 orphan without anyone editing the grid.
  // Explicit counts are the thing that can be asserted.
  test('index grids hold their column counts across the widening', async () => {
    const bad = [];
    const cases = [
      ['/', '.home-grid', [[390, 1], [600, 2], [768, 3], [1728, 3]]],
      ['/blogs/', '.blog-list', [[390, 1], [768, 1], [1024, 2], [1728, 2]]],
      ['/deep-dives/', '.group-card-grid', [[390, 1], [768, 2], [1728, 2]]],
    ];
    for (const [path, sel, expectations] of cases) {
      for (const [w, want] of expectations) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
        const page = await ctx.newPage();
        await page.goto(server.url + path, { waitUntil: 'load' });
        const cols = await page.evaluate((s) => {
          const el = document.querySelector(s);
          if (!el) return null;
          return getComputedStyle(el).gridTemplateColumns.split(/\s+/).filter(Boolean).length;
        }, sel);
        await ctx.close();
        if (cols === null) bad.push(`${path} has no ${sel}`);
        else if (cols !== want) bad.push(`${path} ${sel} @${w}px = ${cols} cols, want ${want}`);
      }
    }
    assert.deepEqual(bad, [], `grid column counts wrong:\n${bad.join('\n')}`);
  });

  // The reported complaint was about the whole web view, not only article
  // pages: at 1728px the 860px .wrap left 434px per side.
  test('index pages leave no dead gutter @ 1728px', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1728, height: 900 } });
    const page = await ctx.newPage();
    const bad = [];
    for (const path of ['/', '/concepts/', '/blogs/', '/changelog/', '/zh/concepts/']) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      const pct = await page.evaluate(() => {
        const els = [...document.querySelectorAll('.wrap')].filter((e) => !e.classList.contains('wrap--prose'));
        if (!els.length) return null;
        const left = Math.min(...els.map((e) => e.getBoundingClientRect().left));
        return Math.round((left / window.innerWidth) * 1000) / 10;
      });
      if (pct === null) { bad.push(`${path} has no .wrap`); continue; }
      if (pct > 20) bad.push(`${path} gutter ${pct}%`);
    }
    await ctx.close();
    assert.deepEqual(bad, [], `index gutter over 20% @ 1728px:\n${bad.join('\n')}`);
  });
```

The index-page ceiling is 20%, not the article pages' 12%: a single-column landing page is legitimately narrower than a three-column article shell, and 1080px in 1728px is 18.75%.

- [ ] **Step 2: Run it to verify it fails**

```bash
npm run test:design 2>&1 | grep -A6 -E "index grids hold|index pages leave"
```

Expected: FAIL on both. Grid counts report `/blogs/ .blog-list @1024px = 1 cols, want 2`. Gutter reports `/ gutter 25.1%`.

- [ ] **Step 3: Widen `.wrap`**

In `src/styles/site.css`, replace:

```css
.wrap { max-width: 860px; margin: 0 auto; }
```

with:

```css
/* 860px left 434px per side unused at 1728px. Widened to --w-wrap, which is
   only safe because every running-text block inside it is capped at
   --w-measure (see the foot of this file) and every grid below has an
   explicit column count — otherwise the extra width buys nothing but longer
   lines, which is what these pages already had at 97-108 characters. */
.wrap { max-width: var(--w-wrap); margin: 0 auto; }
```

- [ ] **Step 4: Pin the grid column counts**

Replace `.home-grid`:

```css
.home-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--s-4);
}
```

with:

```css
/* Explicit counts, not auto-fit. The five cards are a fixed, designed set:
   at the widened .wrap, `auto-fit minmax(240px, 1fr)` resolves to four
   columns and leaves a single card alone on the second row. These
   breakpoints reproduce the shipped counts exactly (1 / 2 / 3); the cards
   simply grow from 264px to 341px. */
.home-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: var(--s-4);
}
@media (min-width: 560px) {
  .home-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 760px) {
  .home-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

Replace `.blog-list`:

```css
/* Post list grid: single column with comfortable gap between cards. */
.blog-list {
  display: grid;
  gap: var(--s-3);
}
```

with:

```css
/* Post list: one column until the widened .wrap can hold two cards at a
   readable width. Summaries ran 108 characters in the single full-width
   column; they are capped at --w-measure and now sit in a column that is
   close to that width anyway. */
.blog-list {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: var(--s-3);
}
@media (min-width: 1024px) {
  .blog-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
```

Replace `.group-card-grid` (added in Task 7):

```css
.group-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--s-3);
  margin-top: var(--s-5);
}
```

with:

```css
/* Deliberately still two columns at the widened .wrap, not three. The group
   counts are 11 (Deep-Dives), 4 (Playbooks) and 5 (Operations); no single
   column count avoids leaving one card alone on the last row for all three,
   so the shipped composition is kept and the cards get wider instead —
   400px to 520px. */
.group-card-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: var(--s-3);
  margin-top: var(--s-5);
}
@media (min-width: 560px) {
  .group-card-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
```

- [ ] **Step 5: Give the entry list a second column**

Append to `src/styles/site.css`:

```css
/* The entry lists are the longest single-column runs on the site — 53
   Concepts in one column, at 97 characters before the measure cap. Two
   columns at the widened .wrap uses the width the cap gives back. */
@media (min-width: 900px) {
  .entry-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: var(--s-6);
  }
}
```

- [ ] **Step 6: Give changelog entries their date column**

Append to `src/styles/site.css`:

```css
/* Date to the left of the detail rather than stacked above it, so the
   widened .wrap is used by structure instead of by line length. The timeline
   rule, the accent dot and the collapsed-by-default <details> are unchanged
   — the dot is absolutely positioned against .changelog-entry, which stays
   the positioned ancestor. */
@media (min-width: 900px) {
  .changelog-entry {
    display: grid;
    grid-template-columns: 200px minmax(0, 1fr);
    column-gap: var(--s-5);
    align-items: start;
  }
  .changelog-date { padding-top: .35em; }
}
```

- [ ] **Step 7: Run the guard**

```bash
npm run build && npm run test:design
```

Expected: the full suite PASSES, including every `prose measure` width, both gutter assertions, the grid counts, the ladder, the prose step, the blog shell and the inline-style sweep.

- [ ] **Step 8: Confirm no card is left alone on a last row**

```bash
npm run test:design 2>&1 | grep -A6 "index grids hold"
```

Expected: PASS. Then inspect the three group index pages by eye at 1728px — the assertion pins the column count, not the aesthetic result, and Playbooks' four groups in two columns is the case that was chosen over three columns for exactly this reason.

- [ ] **Step 9: Commit**

```bash
git add src/styles/site.css scripts/__tests__/design/system.mjs
git commit -m "feat(design): widen index pages, pin every grid column count

.wrap goes 860px to --w-wrap, cutting the gutter at 1728px from 434px to
324px per side. Every grid moves from auto-fit to explicit counts at
explicit breakpoints: auto-fit derives its count from a minmax floor
against a container that is about to change width, which is how a widening
turns the homepage's 3+2 into a 4+1 with nobody editing the grid.

Entry lists gain a second column above 900px and changelog entries gain a
date column, so the extra width is spent on structure rather than on line
length — which the measure cap has already fixed at 97-108 characters.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XQpNvBzrE9ueMsrK72nw4A"
```

---

## Task 9: Prove phone rendering is unchanged, and prove the guard can fail

**Files:**
- Create (temporary, deleted in the same task): `scratch-phone-shots.mjs`, `scratch-prove-fail.sh`
- Reads: `/Users/cq/.claude/jobs/69e28ade/tmp/phone-baseline/baseline.sha256` from Task 1

**Interfaces:**
- Consumes: the Task 1 baseline.
- Produces: a pass/fail statement on phone parity that goes into the PR description.

- [ ] **Step 1: Recreate the screenshot script**

Create `scratch-phone-shots.mjs` at the worktree root with **exactly** the contents given in Task 1, Step 2. The script must be byte-identical or the comparison is meaningless.

- [ ] **Step 2: Screenshot the finished build**

```bash
npm run build
node scratch-phone-shots.mjs /Users/cq/.claude/jobs/69e28ade/tmp/phone-after
wc -l /Users/cq/.claude/jobs/69e28ade/tmp/phone-after/baseline.sha256
```

Expected: 54 lines, matching Task 1's count.

- [ ] **Step 3: Diff the hash lists**

```bash
diff /Users/cq/.claude/jobs/69e28ade/tmp/phone-baseline/baseline.sha256 \
     /Users/cq/.claude/jobs/69e28ade/tmp/phone-after/baseline.sha256 \
  && echo "PHONE PARITY: byte-identical at 375/390/430 in both themes"
```

Expected: `PHONE PARITY: byte-identical at 375/390/430 in both themes`.

**If any hash differs**, do not proceed and do not explain it away. Open the two PNGs for that name side by side and find the cause. The two legitimate possibilities are (a) `/concepts/` and `/blogs/` changed because the entry list and blog list gained columns at ≥900px — those breakpoints are above 430px, so a phone difference there means the media query is wrong; (b) the changelog `<details>` opened differently, which the script's 500ms settle should prevent. Anything else is a real regression in the promise this change was made under.

- [ ] **Step 4: Prove each new assertion can fail**

This repo's standing rule, and it has caught an incomplete fix before. For each of the eight new assertions, revert the specific fix, confirm the test fails naming real elements with real numbers, restore.

Create `scratch-prove-fail.sh`:

```bash
#!/bin/bash
# For each assertion added by this branch, break exactly the thing it guards
# and confirm it fails loudly. Restores the file after each check.
set -uo pipefail
cd "$(dirname "$0")"

check () {  # $1 = label, $2 = file, $3 = sed expression, $4 = test name filter
  echo "=== $1 ==="
  cp "$2" "$2.bak"
  sed -i '' "$3" "$2"
  npm run build >/dev/null 2>&1
  node --test --experimental-strip-types scripts/__tests__/design/system.mjs 2>&1 \
    | grep -E "^(not ok|ok).*$4" || echo "!!! assertion did not run at all"
  mv "$2.bak" "$2"
}

check "dead gutter"        src/styles/site.css   's/max-width: var(--w-shell)/max-width: 1180px/'      "dead gutter"
check "breakpoint ladder"  src/styles/site.css   's/max-width: 1023.98px/max-width: 899.98px/'         "breakpoint ladder"
check "prose step"         src/styles/guide.css  's/font-size: var(--t-prose); line-height: var(--lh-base); margin-bottom: var(--s-4)/font-size: var(--t-base); line-height: var(--lh-base); margin-bottom: var(--s-4)/' "article prose steps"
check "blog shell"         src/styles/site.css   's/max-width: var(--w-shell)/max-width: 1180px/'      "blog shell uses"
check "grid counts"        src/styles/site.css   's/\.blog-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }/.blog-list { grid-template-columns: repeat(3, minmax(0, 1fr)); }/' "index grids hold"
check "measure cap"        src/styles/guide.css  's/max-width: var(--w-measure);/max-width: none;/'    "prose measure"
check "blog cap"           src/layouts/BlogLayout.astro 's/max-width: var(--w-measure);/max-width: none;/' "blog prose is capped"
check "inline styles"      src/components/pages/DeepDivesView.astro 's/class="group-card-grid"/class="group-card-grid" style="grid-template-columns:repeat(4,1fr);"/' "no layout property"

npm run build >/dev/null 2>&1
echo "=== restored; rebuild clean ==="
```

- [ ] **Step 5: Run it and read every line**

```bash
chmod +x scratch-prove-fail.sh && ./scratch-prove-fail.sh
```

Expected: each block prints `not ok` for the assertion it broke. Any block printing `ok`, or `!!! assertion did not run at all`, means that assertion is vacuous — it does not name a real element, or the `sed` did not match. Fix the assertion (or the sed expression) until it genuinely fails, then restore. **An assertion that cannot fail is worse than no assertion**, because the suite reports green over it.

Every `sed` above targets a single-line, uniquely-worded declaration written by this plan. If one reports `!!! assertion did not run at all`, the declaration was reformatted during implementation — `grep` for it, update the expression to match what is actually on disk, and re-run rather than skipping the check.

- [ ] **Step 6: Clean up**

```bash
rm -f scratch-phone-shots.mjs scratch-prove-fail.sh src/styles/*.bak
git status --short   # must be empty
```

- [ ] **Step 7: No commit**

Nothing in this task changes tracked files. Confirm `git status --short` is empty. Carry the phone-parity result and the six `not ok` lines into the PR description.

---

## Task 10: Changelog entry and the full gate run

**Files:**
- Create: `src/content/changelog/entries/2026-07-28-wide-layout.ts`

**Interfaces:**
- Consumes: nothing. The changelog aggregator globs the directory at build time.

- [ ] **Step 1: Write the entry**

`CLAUDE.md` requires one entry file per unit of work, bilingual, with the filename date prefix equal to the `date` field, and that date being the day the change actually merges to `main`. Create `src/content/changelog/entries/2026-07-28-wide-layout.ts`:

```ts
import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-28',
  title: L(
    'A wider layout: the reading column grows 27%, and the 30-character band at 901px is gone',
    '更宽的版面：正文栏加宽 27%，901px 处那条「一行 30 字符」的窄带也修好了',
  ),
  items: [
    L(
      'The article shell no longer freezes at 1180px. It is now fluid up to 1440px with the navigation and contents rails sitting close to the viewport edge, and centres beyond that. On a 1728px screen the unused margin drops from 274px per side to 144px, and the reading column grows from 536px to 760px.',
      '正文外框不再卡死在 1180px。现在它在 1440px 以内自适应，左侧导航与右侧目录贴近视口边缘，超过 1440px 后整体居中。在 1728px 的屏幕上，两侧闲置的空白从每边 274px 降到 144px，正文栏从 536px 加宽到 760px。',
    ),
    L(
      'Body text on chapters and entries steps from 16px to 18px on wide screens, matching the blog. Line length is capped everywhere, so the extra width buys more columns and wider rails rather than longer lines.',
      '在宽屏上，章节与条目的正文字号从 16px 提升到 18px，与博客一致。每一处正文的行宽都设了上限，因此多出来的宽度用于增加栏数、加宽侧栏，而不是把行拉长。',
    ),
    L(
      'Fixed: between 901px and 1180px — a common split-screen and small-laptop width — both side rails appeared at once against a layout that had no room for them, squeezing the article to 30 characters a line. The contents rail now waits until there is room, and appears as a collapsible panel above the article below that.',
      '修复：在 901px 到 1180px 之间——分屏与小尺寸笔记本常见的宽度——两侧栏会同时出现，而版面根本容纳不下，正文被挤到一行仅 30 个字符。现在目录栏会等到宽度足够才出现，在此之下则以可折叠面板的形式显示在正文上方。',
    ),
    L(
      'Index pages widen too. Post lists and entry lists gain a second column, changelog entries move their date alongside the text, and the over-long lines on Concepts, the changelog and About are brought back within a comfortable measure.',
      '索引页同样加宽。文章列表与条目列表增加了第二栏，更新日志把日期移到正文一侧，「概念」、更新日志与「关于」页上过长的行也收回到了舒适的行宽之内。',
    ),
    L(
      'Phone rendering is unchanged — verified byte-identical at 375px, 390px and 430px in both themes.',
      '手机端渲染完全不变——已在 375px、390px、430px 三种宽度、明暗两种主题下逐像素校验一致。',
    ),
  ],
};
export default entry;
```

- [ ] **Step 2: Verify the date matches reality**

```bash
date +%F
```

If today is **not** 2026-07-28, rename the file and change the `date` field to the real merge day. `changelog.test.mjs` enforces that the filename prefix equals the `date` field, and `CLAUDE.md` is explicit that a stale changelog date is a defect.

- [ ] **Step 3: Run every gate**

```bash
npm run build && npm run verify && npm test && npm run test:design
```

Expected: all four pass. `npm run build` must complete with no *new* warnings — compare against the baseline build output from Task 1 if anything looks unfamiliar.

- [ ] **Step 4: Re-measure against the plan's reference table**

Confirm from the guard output that the final numbers match the targets: 70ch at 768, 70ch at 901, 64ch at 1024, 70ch at 1280, 61ch at 1360, 69ch at 1440 and 1728. A number outside ±2 of the target means a rail or gap value drifted from the spec — find it before opening the PR.

- [ ] **Step 5: Commit**

```bash
git add src/content/changelog/entries/2026-07-28-wide-layout.ts
git commit -m "docs(changelog): wide layout

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XQpNvBzrE9ueMsrK72nw4A"
```

- [ ] **Step 6: Push and open the PR**

```bash
git push -u origin design/wide-layout
gh pr create --title "fix(design): widen the layout — bounded rail-to-edge shell" --body "$(cat <<'BODY'
Fixes the reported problem: on a wide screen the page carried too much white
space and the content read as crowded. Both were the same cause — a shell
frozen at 1180px against a 1728px viewport.

## Measured

| | before | after |
|---|---|---|
| gutter per side @1728 | 274px (15.9%) | 144px |
| article column @1728 | 632px | 760px |
| prose @1728 | 536px / 63ch @16px | 664px / 69ch @18px |
| prose @901 | 257px / **30ch** | 595px / 70ch |
| prose @768 | 672px / **80ch** | 595px / 70ch |
| index lines @1728 | 97-108ch | ≤78ch |

## Approach

Bounded rail-to-edge. Ten reference documentation sites were measured in
Chromium at 1728px and 2560px; none caps at 1180. At 2560px the sites that
keep rails at the viewport edge forever strand the text with ~512px of void
per side, while MDN (1440px) and Next.js (1400px) cap and centre and never
show more than 48px. This takes the latter shape.

## Also fixed

- Both rails switched on at 901px against a shell with no width to hold
  them, leaving the article 30 characters wide from 901 to 1180.
- `BlogLayout`'s `:global(.blog-shell)` was dead code: the rule sat inside a
  `<style is:global>` block, whose scoping pass never rewrites `:global()`, so
  the literal selector shipped invalid and every browser dropped it; its
  column goes 884px → 1056px.
- Index pages had no `max-width` on any text block.
- Layout properties set by inline `style` attributes are now in CSS.

## Guard

The measure assertion ran at one viewport against three article pages, which
is why all of the above shipped green. It now runs at ten viewports across
article and index pages in both locales, plus new assertions for dead gutter,
the breakpoint ladder, the prose step, the blog shell width, grid column
counts and inline layout styles. Each was proved to fail before being trusted.

## Phone parity

375px, 390px and 430px render byte-identical in both themes, verified by
SHA-256 over full-page screenshots of nine pages before and after.

Spec: `docs/superpowers/specs/2026-07-28-wide-layout-design.md`
Plan: `docs/superpowers/plans/2026-07-28-wide-layout.md`

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01XQpNvBzrE9ueMsrK72nw4A
BODY
)"
```

---

## Self-review notes

**Spec coverage.** §4 tokens → Task 2. §4.1 `--w-measure` → Tasks 2, 3. §4.2 `--t-prose` → Tasks 2, 5. §5 shell → Task 4. §5.1 ladder → Task 4. §5.3 TOC accordion → Task 4. §5.4 blog → Task 6. §6 index pages → Tasks 7, 8. §7 guard → assertions distributed across Tasks 3–8, proof-of-failure in Task 9. §8 phone safety → Tasks 1, 9. §9 gates → Task 10. §10 out of scope → nothing in any task touches the 320px overflow, Field Guide dates, or `.callout.tip`.

**Known intermediate red states**, deliberate and called out where they occur: Task 3 leaves `prose measure` failing at 901 and 1024 only, on the four article pages (shell not yet widened), plus the separate coverage test failing on `/concepts/` (`.entry-summary` not yet emitted). Task 4 widens the shell but, because the measure cap already bounds the column at 62ch, `prose measure` passes at every width once Task 4 lands — the `/concepts/` coverage failure is the only one that survives, until Task 7. Every other task ends green.

**Names used consistently across tasks:** `--w-shell`, `--w-wrap`, `--w-rail-nav`, `--w-rail-toc`, `--w-measure`, `--t-prose`, `.entry-list`, `.entry-item`, `.entry-link`, `.entry-title`, `.entry-summary`, `.group-card-grid`, `.wrap--prose`, `.about-body`, `.privacy-body`, `MEASURE_WIDTHS`, `MEASURE_PAGES`, `measureChars`.
