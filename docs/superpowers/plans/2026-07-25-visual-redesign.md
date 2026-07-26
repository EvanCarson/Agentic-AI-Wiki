# Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's ad-hoc styling with a designed visual system — Space Grotesk / Inter / JetBrains Mono on a signal-blue near-white palette, driven by a 10-step type scale and 10-step spacing scale — across all 688 pages, in one PR.

**Architecture:** Pure CSS/token change. Five layers applied in order: (1) verification harness, (2) token layer, (3) scale application, (4) component restyle, (5) mobile header fix. No IA, route, manifest, content, or component-structure changes. Nothing under `src/content/` is touched.

**Tech Stack:** Astro 5 static build, plain CSS (`src/styles/guide.css` + `src/styles/site.css` + per-layout `<style is:global>`), Node's built-in test runner, Playwright + Chromium (already installed).

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-07-25-visual-redesign-design.md`. Where this plan and the spec disagree, the spec wins.
- **Never edit `src/content/`.** Content fragments and manifests are out of scope.
- **Never edit routes, IA, or component structure.** Restyle only.
- **Bilingual:** every change must hold for `/` and `/zh/`. Chinese pages use a system CJK stack.
- **Both themes:** every colour change must be verified in light *and* dark.
- **Contrast floor:** WCAG AA — 4.5:1 for text under 24px (or under 18.66px bold), 3:1 at or above.
- **Gates before PR:** `npm run build` (no new warnings) · `npm run verify` · `npm test` · `npm run search:index && npm run test:search`.
- **Changelog is mandatory:** one new file at `src/content/changelog/entries/<YYYY-MM-DD>-<slug>.ts`, bilingual, date == merge date. This is the one permitted `src/content/` write.
- **Vendor brand colours `--tab-anthropic` / `--tab-openai` must not change.**
- **Work in a worktree** under `.worktrees/`, never the main checkout.

---

## File Structure

| File | Responsibility | Task |
|---|---|---|
| `scripts/lib/contrast.mjs` | **new** — colour maths: parse, composite alpha, ratio | 1 |
| `scripts/lib/static-server.mjs` | **new** — serve `dist/` for browser-based tests | 1 |
| `scripts/__tests__/design-system.test.mjs` | **new** — the permanent guard | 1 |
| `src/styles/tokens.css` | **new** — the whole token layer, extracted from `guide.css` | 2 |
| `src/styles/guide.css` | content-surface styles; tokens removed, scale applied | 2,3,5,7,9 |
| `src/styles/site.css` | chrome styles; scale applied; header fix | 4,5,6,8 |
| `src/layouts/BaseLayout.astro` | font loading; imports `tokens.css` | 2 |
| `src/layouts/BlogLayout.astro` | blog-scoped styles | 4,8 |
| `src/components/*.astro` | scoped styles only | 4,8 |
| `src/content/changelog/entries/…` | release note | 11 |

`tokens.css` is new because the token block currently lives at the top of `guide.css`, mixed with content styles. Extracting it is what lets Task 1's test and every later task reference one authoritative source.

---

## Task 1: Verification harness

Build the guard first. Some assertions pass today (contrast — fixed 2026-07-25) and prove the harness works; others fail today (header height, tap targets) and define what the redesign must achieve.

**Files:**
- Create: `scripts/lib/contrast.mjs`
- Create: `scripts/lib/static-server.mjs`
- Create: `scripts/__tests__/design-system.test.mjs`
- Modify: `package.json` (add `test:design` script)

**Interfaces:**
- Produces: `parseColor(str) -> [r,g,b,a]`, `composite(layers) -> [r,g,b]`, `contrastRatio(fg, bg) -> number`, `requiredRatio(px, weight) -> 4.5|3`, `startStaticServer(dir) -> {url, close()}`. Tasks 6–9 rely on `npm run test:design` passing.

- [ ] **Step 1: Write the colour library**

```javascript
// scripts/lib/contrast.mjs
// Colour maths for the design-system tests.
//
// Two things this must get right, both learned from real failures:
//   1. Composite rgba() overlays. An ad-hoc scanner that skipped this
//      reported the Concepts reading-path chips at 1:1 when they are
//      actually 14.29:1 — a checker that cries wolf gets ignored.
//   2. Operate on *computed* values from a real browser, never CSS source.

/** Parse "rgb(r, g, b)" / "rgba(r, g, b, a)" / "#rrggbb" -> [r,g,b,a]. */
export function parseColor(str) {
  if (typeof str !== 'string') return null;
  const s = str.trim();
  if (s.startsWith('#')) {
    const h = s.length === 4
      ? '#' + [1, 2, 3].map((i) => s[i] + s[i]).join('')
      : s;
    return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).concat(1);
  }
  const nums = s.match(/[\d.]+/g);
  if (!nums || nums.length < 3) return null;
  const [r, g, b] = nums.slice(0, 3).map(Number);
  const a = nums.length > 3 ? Number(nums[3]) : 1;
  return [r, g, b, a];
}

/**
 * Flatten a stack of colour layers into one opaque colour.
 * `layers` is ordered nearest-element-first (as collected walking up the
 * DOM); compositing runs bottom-up. Assumes white under everything, which
 * only matters if the page has no opaque background at all.
 */
export function composite(layers) {
  let base = [255, 255, 255];
  for (let i = layers.length - 1; i >= 0; i--) {
    const c = Array.isArray(layers[i]) ? layers[i] : parseColor(layers[i]);
    if (!c) continue;
    const a = c[3] ?? 1;
    base = [0, 1, 2].map((k) => c[k] * a + base[k] * (1 - a));
  }
  return base;
}

function relativeLuminance([r, g, b]) {
  const lin = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

/** WCAG contrast ratio. Accepts arrays or colour strings. */
export function contrastRatio(fg, bg) {
  const f = Array.isArray(fg) ? fg : parseColor(fg);
  const b = Array.isArray(bg) ? bg : parseColor(bg);
  const [hi, lo] = [relativeLuminance(f), relativeLuminance(b)].sort((x, y) => y - x);
  return Number(((hi + 0.05) / (lo + 0.05)).toFixed(2));
}

/** WCAG AA threshold: 3:1 for large text, else 4.5:1. */
export function requiredRatio(px, fontWeight) {
  const bold = Number(fontWeight) >= 700;
  return px >= 24 || (px >= 18.66 && bold) ? 3 : 4.5;
}
```

- [ ] **Step 2: Write the static server**

```javascript
// scripts/lib/static-server.mjs
// Minimal static file server for tests. Astro emits absolute asset paths
// (/_astro/...), so file:// URLs load the HTML without its CSS — which
// would make every computed-style assertion meaningless.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

export async function startStaticServer(root) {
  const server = createServer(async (req, res) => {
    try {
      // Strip the query string and block traversal above `root`.
      const rel = normalize(decodeURIComponent(req.url.split('?')[0]))
        .replace(/^(\.\.[/\\])+/, '');
      let file = join(root, rel);
      try {
        if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
      } catch {
        file = join(root, rel, 'index.html');
      }
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const { port } = server.address();
  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise((r) => server.close(r)),
  };
}
```

- [ ] **Step 3: Write the design-system test**

```javascript
// scripts/__tests__/design-system.test.mjs
// Permanent guard for the visual system. Runs against BUILT HTML in a real
// browser, because two near-misses on 2026-07-25 were invisible in CSS
// source: a rule declaring 28px that computed to 17px, and a colour set by
// an inline style attribute that no stylesheet could override.
//
// Requires `npm run build` first. Skips (does not fail) when dist/ is absent
// so `npm test` stays runnable on a clean checkout.
import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startStaticServer } from '../lib/static-server.mjs';
import { parseColor, composite, contrastRatio, requiredRatio } from '../lib/contrast.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DIST = resolve(ROOT, 'dist');
const HAS_DIST = existsSync(DIST);

const PAGES = [
  '/', '/concepts/', '/field-guide/',
  '/concepts/prompt-caching/',
  '/deep-dives/mcp/mcp-building-servers-in-practice/',
  '/operations/agentops/kill-switches/',
  '/playbooks/coding-and-computer-use-agents/coding-agent-architecture/',
  '/blogs/nemo-guardrails-vs-guardrails-ai-vs-llama-guard-vs-llm-guard/',
  '/changelog/',
  '/zh/concepts/prompt-caching/',
];
const VIEWPORTS = [{ w: 390, h: 844 }, { w: 1280, h: 900 }];
const THEMES = ['light', 'dark'];

let server, browser;

before(async () => {
  if (!HAS_DIST) return;
  server = await startStaticServer(DIST);
  browser = await chromium.launch();
});
after(async () => {
  await browser?.close();
  await server?.close();
});

/** Collect every text-bearing leaf with its computed colour + composited bg. */
async function auditPage(page) {
  return page.evaluate(() => {
    const out = [];
    document.querySelectorAll('body *').forEach((el) => {
      const text = (el.innerText || '').trim();
      if (!text || el.children.length) return;
      const cs = getComputedStyle(el);
      const layers = [];
      for (let n = el; n; n = n.parentElement) {
        const bg = getComputedStyle(n).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)') layers.push(bg);
      }
      out.push({
        label: (el.className || el.tagName).toString().slice(0, 40),
        color: cs.color,
        layers,
        px: parseFloat(cs.fontSize),
        weight: cs.fontWeight,
      });
    });
    return out;
  });
}

describe('design system', { skip: HAS_DIST ? false : 'run `npm run build` first' }, () => {
  for (const theme of THEMES) {
    for (const vp of VIEWPORTS) {
      test(`contrast AA — ${theme} @ ${vp.w}px`, async () => {
        const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme });
        const page = await ctx.newPage();
        const failures = [];
        for (const path of PAGES) {
          await page.goto(server.url + path, { waitUntil: 'load' });
          for (const el of await auditPage(page)) {
            const ratio = contrastRatio(parseColor(el.color).slice(0, 3), composite(el.layers));
            const need = requiredRatio(el.px, el.weight);
            if (ratio < need) failures.push(`${path} ${el.label} ${el.px}px ${ratio}<${need}`);
          }
        }
        await ctx.close();
        assert.deepEqual(failures, [], `contrast failures:\n${failures.join('\n')}`);
      });
    }
  }

  test('no horizontal overflow at 390px', async () => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    const bad = [];
    for (const path of PAGES) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      const over = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (over) bad.push(path);
    }
    await ctx.close();
    assert.deepEqual(bad, [], `pages scroll horizontally: ${bad.join(', ')}`);
  });

  test('mobile header is a single row', async () => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(server.url + '/concepts/prompt-caching/', { waitUntil: 'load' });
    const h = await page.evaluate(() => {
      const el = document.querySelector('.site-header');
      const rows = new Set([...el.querySelectorAll('nav a')].map((a) => Math.round(a.getBoundingClientRect().top)));
      return { height: Math.round(el.getBoundingClientRect().height), rows: rows.size };
    });
    await ctx.close();
    assert.ok(h.height <= 60, `header is ${h.height}px, expected <= 60`);
    assert.equal(h.rows, 1, `header nav wraps to ${h.rows} rows, expected 1`);
  });

  test('tap targets are at least 44px on mobile', async () => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(server.url + '/concepts/prompt-caching/', { waitUntil: 'load' });
    const small = await page.evaluate(() =>
      [...document.querySelectorAll('.site-header a, .site-header button')]
        .map((el) => ({ t: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 24), h: Math.round(el.getBoundingClientRect().height) }))
        .filter((x) => x.h > 0 && x.h < 44));
    await ctx.close();
    assert.deepEqual(small, [], `header controls under 44px: ${JSON.stringify(small)}`);
  });

  test('prose measure is 60-75 characters', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const bad = [];
    for (const path of ['/concepts/prompt-caching/', '/deep-dives/mcp/mcp-building-servers-in-practice/', '/blogs/nemo-guardrails-vs-guardrails-ai-vs-llama-guard-vs-llm-guard/']) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      const chars = await page.evaluate(() => {
        const p = [...document.querySelectorAll('main p')].find((x) => x.innerText.trim().length > 250);
        if (!p) return null;
        const cs = getComputedStyle(p);
        const c = document.createElement('canvas').getContext('2d');
        c.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const ab = 'abcdefghijklmnopqrstuvwxyz ';
        return Math.round(p.getBoundingClientRect().width / (c.measureText(ab).width / ab.length));
      });
      if (chars !== null && (chars < 60 || chars > 78)) bad.push(`${path} = ${chars} chars`);
    }
    await ctx.close();
    assert.deepEqual(bad, [], `measure out of range:\n${bad.join('\n')}`);
  });
});
```

The measure upper bound is 78, not 75 — the canvas average-glyph estimate runs a few characters optimistic versus true rendered line length, and a test that fails on a 76 would be noise.

- [ ] **Step 4: Add the script**

In `package.json` `scripts`, add:

```json
"test:design": "npm run build && node --test --experimental-strip-types scripts/__tests__/design-system.test.mjs"
```

- [ ] **Step 5: Run it against the current site to establish the baseline**

Run: `npm run test:design`
Expected — this is the red state that defines the work:
- contrast tests **PASS** (fixed 2026-07-25; proves the harness is calibrated, not broken)
- `no horizontal overflow` **PASS**
- `mobile header is a single row` **FAIL** — "header is 155px, expected <= 60"
- `tap targets` **FAIL** — nav links are 37px
- `prose measure` **PASS** (blog capped 2026-07-25)

If a contrast test fails here, the harness has a bug — fix the harness before touching any design code.

- [ ] **Step 6: Capture before-screenshots**

```bash
npm run build
npx serve dist -l 4321 &
node scripts/screenshot.mjs --base http://localhost:4321 --out docs/superpowers/screenshots/redesign-before
kill %1
```

Note `serve` must run **without** `-s`; the SPA flag rewrites real paths to `index.html`.

- [ ] **Step 7: Commit**

```bash
git add scripts/lib/contrast.mjs scripts/lib/static-server.mjs \
        scripts/__tests__/design-system.test.mjs package.json \
        docs/superpowers/screenshots/redesign-before
git commit -m "test: design-system harness (contrast, measure, header, tap targets)"
```

---

## Task 2: Token layer

**Files:**
- Create: `src/styles/tokens.css`
- Modify: `src/styles/guide.css:1-87` (remove the `:root` blocks)
- Modify: `src/layouts/BaseLayout.astro:56-58` (fonts), plus the stylesheet import

**Interfaces:**
- Produces: `--t-2xs … --t-display`, `--lh-*`, `--s-0 … --s-9`, `--surface`, `--accent-on-inverse`, and retuned `--paper` / `--ink` / `--accent` / `--accent-ink` / `--muted`. Every later task consumes these.

- [ ] **Step 1: Create the token file**

```css
/* src/styles/tokens.css
 *
 * The single source of truth for type, space, and colour.
 * Extracted from guide.css so the design system is not interleaved with
 * content styles. Imported first by BaseLayout, before guide.css.
 *
 * Contrast (verified, WCAG AA):
 *   18.00 light body   #12130F on #FBFBF9      16.11 dark body   #EDEDE8 on #101110
 *   10.19 light muted  #3D4038 on #FBFBF9       7.65 dark muted  #A3A69C on #101110
 *    6.09 light accent #1A52E0 on #FBFBF9       7.02 dark accent #6E9BFF on #101110
 *    5.65 light accent #1A52E0 on #F1F3EE       6.48 dark accent #6E9BFF on #191A18
 */
:root {
  /* ---- type scale: 10 steps replacing 24 ad-hoc sizes ---- */
  --t-2xs: 11px;   --lh-2xs: 1.4;
  --t-xs: 13px;    --lh-xs: 1.45;
  --t-sm: 14px;    --lh-sm: 1.55;
  --t-base: 16px;  --lh-base: 1.65;
  --t-md: 18px;    --lh-md: 1.55;
  --t-lg: 22px;    --lh-lg: 1.3;
  --t-xl: 28px;    --lh-xl: 1.22;
  --t-2xl: 36px;   --lh-2xl: 1.18;
  --t-3xl: clamp(40px, 5vw, 56px);  --lh-3xl: 1.12;
  --t-display: clamp(48px, 9vw, 84px); --lh-display: 0.9;

  /* ---- spacing scale: 4px-based, geometric above 16 ---- */
  --s-0: 2px;  --s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px;
  --s-5: 24px; --s-6: 32px; --s-7: 48px; --s-8: 64px; --s-9: 96px;

  /* ---- families ---- */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  /* zh pages load no CJK webfont; name the good system faces in order. */
  --font-cjk: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
              'Noto Sans CJK SC', 'Source Han Sans SC', sans-serif;

  /* ---- colour: light ---- */
  --ink: #12130F;
  --paper: #FBFBF9;
  --surface: #F1F3EE;
  --paper-2: var(--surface);      /* alias — retire after this release */
  --muted: #3D4038;
  --accent: #1F5EFF;              /* rules, borders, display type */
  --accent-ink: #1A52E0;          /* small text on light — 6.09:1 */
  --accent-on-inverse: #6E9BFF;   /* small text on --surface-inverse */
  --accent-soft: #E4EAFB;

  /* Always-dark surface, both themes (callouts, deliverables, page-nav). */
  --surface-inverse: #0E0F0D;
  --surface-inverse-text: #FBFBF9;

  --border-soft: rgba(18, 19, 15, 0.14);
  --border-softer: rgba(18, 19, 15, 0.09);

  /* Code. Retuned cool; every token contrast-checked against --code-bg. */
  --code-bg: #14161A;
  --code-text: #E3E7EE;
  --code-comment: #8B94A3;
  --code-key: #9FB4FF;
  --code-str: #8FD59B;
  --code-fn: #6FD3E0;

  /* Q&A block. */
  --q-bg: #F4F1E6;
  --q-border: #B8860B;
  --q-answer: #3A3530;

  /* Vendor brand colours — NOT ours to restyle. */
  --tab-anthropic: #d4421e;
  --tab-openai: #10a37f;

  --nav-h: 56px;
  --subnav-h: 0px;
}

/* Dark tokens. Two rules because CSS cannot put an at-rule inside a
   comma-separated selector list: one for the explicit toggle, one for the
   OS preference on roots not opted into light. */
:root[data-theme='dark'] {
  --ink: #EDEDE8;
  --paper: #101110;
  --surface: #191A18;
  --paper-2: var(--surface);
  --muted: #A3A69C;
  --accent: #6E9BFF;
  --accent-ink: #6E9BFF;
  --accent-on-inverse: #6E9BFF;
  --accent-soft: #16203A;
  --surface-inverse: #191A18;
  --surface-inverse-text: #EDEDE8;
  --border-soft: rgba(237, 237, 232, 0.16);
  --border-softer: rgba(237, 237, 232, 0.1);
  --q-bg: #1A1814;
  --q-border: #D4A040;
  --q-answer: #D4CEBC;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --ink: #EDEDE8;
    --paper: #101110;
    --surface: #191A18;
    --paper-2: var(--surface);
    --muted: #A3A69C;
    --accent: #6E9BFF;
    --accent-ink: #6E9BFF;
    --accent-on-inverse: #6E9BFF;
    --accent-soft: #16203A;
    --surface-inverse: #191A18;
    --surface-inverse-text: #EDEDE8;
    --border-soft: rgba(237, 237, 232, 0.16);
    --border-softer: rgba(237, 237, 232, 0.1);
    --q-bg: #1A1814;
    --q-border: #D4A040;
    --q-answer: #D4CEBC;
  }
}
```

- [ ] **Step 2: Delete the old token blocks from `guide.css`**

Remove lines 1–87 of `src/styles/guide.css` — the `:root`, `:root[data-theme="dark"]`, and `@media (prefers-color-scheme: dark)` blocks. The file now starts at the `* { box-sizing… }` reset. Delete nothing else.

- [ ] **Step 3: Swap the fonts and import tokens in `BaseLayout.astro`**

Replace the Google Fonts `<link>` (currently line 58) with:

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

Fraunces is gone; Space Grotesk replaces it. Keep both `preconnect` lines unchanged. Then ensure `tokens.css` is imported **before** `guide.css` wherever stylesheets are pulled in.

- [ ] **Step 4: Point the base families at the tokens**

In `guide.css`, the `body` rule becomes:

```css
body {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: var(--t-base);
  line-height: var(--lh-base);
  overflow-x: hidden;
  padding-bottom: var(--s-7);
  padding-top: 0;
}
:lang(zh) body { font-family: var(--font-body), var(--font-cjk); }
```

- [ ] **Step 5: Build and eyeball**

Run: `npm run build`
Expected: completes, 688 pages, no new warnings. The site will look half-done — old hardcoded sizes on new colours. That is expected until Task 5.

- [ ] **Step 6: Commit**

```bash
git add src/styles/tokens.css src/styles/guide.css src/layouts/BaseLayout.astro
git commit -m "feat(design): token layer — type scale, spacing scale, cool palette"
```

---

## Task 3: Apply the type scale in `guide.css`

**Files:** Modify `src/styles/guide.css`

**Interfaces:** Consumes Task 2's `--t-*` / `--lh-*` / `--font-*`.

- [ ] **Step 1: Replace every hardcoded `font-size` using this mapping**

| Current | Token | Current | Token |
|---|---|---|---|
| 9px, 10px, 11px | `--t-2xs` | 22px | `--t-lg` |
| 12px, 13px | `--t-xs` | 26px, 28px, 30px | `--t-xl` |
| 14px, 15px | `--t-sm` | 34px, 36px, 38px | `--t-2xl` |
| 16px, 17px | `--t-base` | 48px, 56px | `--t-3xl` |
| 18px, 19px, 20px | `--t-md` | 84px | `--t-display` |

Set the paired `line-height` from the same step. Two rules keep their family swapped as well:

```css
.step h3   { font-family: var(--font-display); font-size: var(--t-xl); line-height: var(--lh-xl); }
.phase-num { font-family: var(--font-display); font-size: var(--t-display); line-height: var(--lh-display); }
```

Every remaining `'Fraunces', serif` becomes `var(--font-display)`; every `'JetBrains Mono', monospace` becomes `var(--font-mono)`; every `'Inter', sans-serif` becomes `var(--font-body)`.

- [ ] **Step 2: Verify no hardcoded sizes or families remain**

```bash
grep -nE "font-size: *[0-9]" src/styles/guide.css || echo "clean"
grep -nE "Fraunces|'Inter'|'JetBrains Mono'" src/styles/guide.css || echo "clean"
```
Expected: `clean` twice.

- [ ] **Step 3: Build and run the design tests**

Run: `npm run test:design`
Expected: contrast + measure + overflow PASS; header and tap-target still FAIL (Task 6 fixes those).

- [ ] **Step 4: Commit**

```bash
git add src/styles/guide.css
git commit -m "refactor(design): drive guide.css typography from the scale"
```

---

## Task 4: Apply the type scale in `site.css`, layouts, and components

**Files:** Modify `src/styles/site.css`; **all eight** layouts — `BaseLayout`, `BlogLayout`, `ChapterLayout`, `ConceptLayout`, `DeepDiveLayout`, `OperationLayout`, `PlaybookLayout`, `SectionEntryLayout` (`.astro`); and every `src/components/*.astro` plus `src/components/pages/*.astro` (12 view files).

Do not stop at the three layouts that happen to have the largest style blocks — the per-section layouts each carry their own scoped rules, and missing one leaves that whole section on the old scale.

**Interfaces:** Consumes Task 2 tokens. Same mapping table as Task 3, Step 1.

- [ ] **Step 1: Sweep `site.css`** using the Task 3 mapping, including the family swaps.

- [ ] **Step 2: Sweep the layouts and components.** Scoped `<style>` blocks in `.astro` files use the same tokens — they are global custom properties and cross the scope boundary fine.

In `BlogLayout.astro`, keep the `max-width: 58ch` measure cap and the table scroll-shadow added on 2026-07-25; only their `font-size` / `font-family` declarations change.

- [ ] **Step 3: Verify**

```bash
grep -rnE "font-size: *[0-9]" src/styles/site.css src/layouts/ src/components/ || echo "clean"
grep -rnE "Fraunces|'Inter'|'JetBrains Mono'" src/styles/site.css src/layouts/ src/components/ || echo "clean"
```
Expected: `clean` twice. The second grep is the one that catches a layout you forgot — a missed file keeps rendering in Fraunces, which no longer loads, so that section silently falls back to a system serif.

- [ ] **Step 4: Build and test**

Run: `npm run build && npm run test:design`
Expected: unchanged from Task 3 — header and tap targets still red.

- [ ] **Step 5: Commit**

```bash
git add src/styles/site.css src/layouts src/components
git commit -m "refactor(design): drive chrome and layout typography from the scale"
```

---

## Task 5: Apply the spacing scale

**Files:** Modify `src/styles/guide.css`, `src/styles/site.css`, `src/layouts/*.astro`, `src/components/*.astro`

- [ ] **Step 1: Replace hardcoded padding/margin using this mapping**

| Current | Token | Current | Token |
|---|---|---|---|
| 2px | `--s-0` | 24px, 26px, 28px | `--s-5` |
| 4px, 5px, 6px | `--s-1` | 32px, 36px | `--s-6` |
| 8px, 10px | `--s-2` | 48px, 56px | `--s-7` |
| 12px, 14px | `--s-3` | 64px, 72px | `--s-8` |
| 16px, 18px, 20px | `--s-4` | 96px+ | `--s-9` |

Leave alone: `border-width`, `outline-offset`, `border-radius`, and the negative bleed margins (`margin: 18px -20px`) — those are structural, not rhythm, and snapping them shifts layouts.

- [ ] **Step 2: Build and compare against the before-screenshots**

```bash
npm run build
npx serve dist -l 4321 &
node scripts/screenshot.mjs --base http://localhost:4321 --out docs/superpowers/screenshots/redesign-after-spacing
kill %1
```
Open the before/after pairs. Spacing should look more regular; nothing should be visibly broken or overlapping.

- [ ] **Step 3: Commit**

```bash
git add src/styles src/layouts src/components
git commit -m "refactor(design): drive spacing from the scale"
```

---

## Task 6: Fix the mobile header

Makes two failing tests from Task 1 go green.

**Files:** Modify `src/styles/site.css:384-393`

- [ ] **Step 1: Replace the wrap rule with a scroll rule**

The current block is:

```css
@media (max-width: 640px) {
  .site-header { height: auto; flex-wrap: wrap; align-items: stretch; }
  .site-header .brand { … }
  .site-header nav { flex: 1 1 auto; flex-wrap: wrap; }
  .site-header nav a { padding: 10px 12px; }
}
```

Replace the header/nav declarations with:

```css
@media (max-width: 640px) {
  /* The 10 nav links need ~697px of intrinsic width in a 390px viewport.
     Wrapping produced 3 rows and a 155px sticky header — 18% of a phone
     screen, permanently. Scroll instead: one row, --nav-h tall.
     Same pattern guide.css already uses for the legacy .nav-parts. */
  .site-header { height: var(--nav-h); flex-wrap: nowrap; align-items: stretch; }
  .site-header nav {
    flex: 1 1 auto;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    /* Right-edge fade so a cut-off link reads as scrollable, not truncated
       — iOS hides scrollbars until touched. */
    background:
      linear-gradient(to right, var(--paper), var(--paper)) left center / 20px 100% no-repeat local,
      linear-gradient(to left, var(--paper), var(--paper)) right center / 20px 100% no-repeat local,
      linear-gradient(to right, var(--border-soft), transparent) left center / 12px 100% no-repeat scroll,
      linear-gradient(to left, var(--border-soft), transparent) right center / 12px 100% no-repeat scroll;
  }
  .site-header nav::-webkit-scrollbar { display: none; }
  .site-header nav a { padding: 0 var(--s-3); min-height: 44px; }
  .site-header .brand { padding: 0 var(--s-3); }
}
```

- [ ] **Step 2: Give every header control a 44px target**

Outside the media query, ensure `.site-header nav a`, `.lang-switch a`, `.theme-toggle`, and `.site-search-trigger` each resolve to at least 44px tall — `--nav-h` is 56px, so `align-items: stretch` plus no fixed height achieves it. Check the theme toggle specifically; it was 36×36.

- [ ] **Step 3: Run the design tests**

Run: `npm run test:design`
Expected: **all tests PASS**, including `mobile header is a single row` and `tap targets`.

- [ ] **Step 4: Verify visually at 390px** that the nav scrolls, the fade shows on the right, and nothing is clipped vertically.

- [ ] **Step 5: Commit**

```bash
git add src/styles/site.css
git commit -m "fix(design): mobile header scrolls instead of wrapping — 155px to 56px"
```

---

## Task 7: Restyle the entry body

The core reading surface: `.phase`, `.step`, `.step-num`, `.callout`, `.callout.warn`, `.observe`, `.deliverable`, `.threat-row`.

**Files:** Modify `src/styles/guide.css`

- [ ] **Step 1: Re-cut the callout hierarchy.** There are four block types (`.callout`, `.callout.warn`, `.observe`, `.deliverable`) and today they read as near-equal weight. Differentiate by *surface*, not by border colour alone: `.callout` on `--surface` with a left rule in `--accent`; `.callout.warn` on `--surface` with a left rule in `--q-border`; `.observe` on `--surface` with no rule; `.deliverable` on `--surface-inverse`. Keep all existing class names — content fragments depend on them.

- [ ] **Step 2: Keep `--accent-ink` on every small accent label.** `.step-num`, `.step h4`, `.observe .label`, `.threat-row .name`, `.kicker` and the `.step ul li::before` arrow were wired to `--accent-ink` on 2026-07-25 for AA. Do not revert them to `--accent` while restyling. `.deliverable .tag` and its checklist bullets stay on `--accent-on-inverse`.

- [ ] **Step 3: Build and run design tests**

Run: `npm run test:design`
Expected: all PASS. A contrast failure here means Step 2 was not honoured.

- [ ] **Step 4: Commit**

```bash
git add src/styles/guide.css
git commit -m "feat(design): re-cut entry-body callout hierarchy"
```

---

## Task 8: Restyle chrome, indexes, rails, and cards

**Files:** Modify `src/styles/site.css`, `src/components/BlogCard.astro`, `src/components/pages/*.astro`, `src/components/PageTOC.astro`, `src/components/BlogPostTOC.astro`, `src/components/ChapterSidebar.astro`, `src/components/SectionSidebar.astro`, `src/components/SiteFooter.astro`

- [ ] **Step 1: Restyle** header, footer, lang switch, theme toggle, search trigger, section index cards, the reading-path callout, blog cards, the TOC rails, and the `page-nav` prev/next buttons — all on the new tokens.

- [ ] **Step 2: Build, run design tests, and capture after-screenshots**

```bash
npm run build && npm run test:design
npx serve dist -l 4321 &
node scripts/screenshot.mjs --base http://localhost:4321 --out docs/superpowers/screenshots/redesign-after
kill %1
```
Expected: all design tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/styles/site.css src/components docs/superpowers/screenshots/redesign-after
git commit -m "feat(design): restyle chrome, indexes, rails, and cards"
```

---

## Task 9: Retune the code blocks

**Files:** Modify `src/styles/tokens.css` (if adjustment needed), `src/styles/guide.css`

**Interfaces:** Consumes `--code-*` from Task 2.

- [ ] **Step 1: Point code blocks at the new mono**

In `guide.css`, `pre`, `code`, and `.c-*` spans use `var(--font-mono)`.

- [ ] **Step 2: Write a contrast check for the syntax palette**

Add to `scripts/__tests__/design-system.test.mjs`, inside the `describe` block:

```javascript
test('syntax colours meet AA against the code background', async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(server.url + '/deep-dives/mcp/mcp-building-servers-in-practice/', { waitUntil: 'load' });
  const tokens = await page.evaluate(() => {
    const pre = document.querySelector('pre');
    if (!pre) return null;
    const bg = getComputedStyle(pre).backgroundColor;
    const out = [{ name: 'pre', color: getComputedStyle(pre).color, bg }];
    for (const cls of ['c-kw', 'c-st', 'c-fn', 'c-cm', 'c-out']) {
      const el = pre.querySelector('.' + cls);
      if (el) out.push({ name: cls, color: getComputedStyle(el).color, bg });
    }
    return out;
  });
  await ctx.close();
  if (!tokens) return; // page has no code block
  const bad = tokens
    .map((t) => ({ ...t, ratio: contrastRatio(parseColor(t.color).slice(0, 3), parseColor(t.bg).slice(0, 3)) }))
    .filter((t) => t.ratio < 4.5)
    .map((t) => `${t.name} ${t.ratio}`);
  assert.deepEqual(bad, [], `syntax tokens below 4.5:1: ${bad.join(', ')}`);
});
```

- [ ] **Step 3: Run it**

Run: `npm run test:design`
Expected: PASS. If a token fails, adjust that `--code-*` value in `tokens.css` and re-run — do not lower the threshold.

- [ ] **Step 4: Verify code blocks are byte-identical between locales.**

Run: `npm run verify`
Expected: "code blocks identical".

- [ ] **Step 5: Commit**

```bash
git add src/styles src/styles/tokens.css scripts/__tests__/design-system.test.mjs
git commit -m "feat(design): retune syntax palette for the cool system, with a contrast test"
```

---

## Task 10: CJK font stack

**Files:** Modify `src/styles/guide.css`

- [ ] **Step 1: Apply the CJK stack to zh pages**

Task 2 added `:lang(zh) body`. Extend it to the display and mono faces, since Space Grotesk has no CJK coverage and would otherwise fall back unpredictably mid-heading:

```css
:lang(zh) h1, :lang(zh) h2, :lang(zh) h3, :lang(zh) h4,
:lang(zh) .phase-num, :lang(zh) .step h3 {
  font-family: var(--font-display), var(--font-cjk);
}
:lang(zh) code, :lang(zh) pre { font-family: var(--font-mono), var(--font-cjk); }
```

- [ ] **Step 2: Verify a zh page renders with no fallback boxes**

```bash
npm run build
npx serve dist -l 4321 &
node scripts/screenshot.mjs --base http://localhost:4321 --out docs/superpowers/screenshots/redesign-zh
kill %1
```
Inspect `/zh/` and `/zh/concepts/prompt-caching/` at both viewports.

- [ ] **Step 3: Commit**

```bash
git add src/styles/guide.css docs/superpowers/screenshots/redesign-zh
git commit -m "feat(design): CJK system font stack for zh pages"
```

---

## Task 11: Full verification, changelog, PR

**Files:** Create `src/content/changelog/entries/<merge-date>-visual-redesign.ts`

- [ ] **Step 1: Run every gate**

```bash
npm run build && npm run verify && npm test && npm run search:index && npm run test:search && npm run test:design
```
Expected: build clean at 688 pages; verify reports 46,296 internal links; all tests pass.

- [ ] **Step 2: Lighthouse accessibility check.** Serve `dist`, run a mobile navigation audit on `/deep-dives/mcp/mcp-building-servers-in-practice/`. Expected: accessibility 100. Ignore Best Practices — it drops locally because Vercel's analytics scripts 404 off-platform.

- [ ] **Step 3: Write the changelog entry.** Copy an existing file under `src/content/changelog/entries/` as the template. `date` must equal the actual merge day and match the filename prefix. Bilingual `L(en, zh)` throughout, with fluent Chinese. Cover: new typeface system, the scale work (24→10 sizes, 29→10 spacing), the mobile header going 155px→56px, and the permanent contrast test.

- [ ] **Step 4: Commit and open the PR**

```bash
git add src/content/changelog/entries/
git commit -m "docs: changelog entry for the visual redesign"
git push -u origin <branch>
gh pr create --title "Design: visual system redesign — Space Grotesk / Inter on a signal-blue scale" --body "…"
```

The PR body must include: before/after screenshots, the measured deltas (header 155→56px, 24→10 font sizes, 29→10 spacing values), the full gate output, and an explicit note that no file under `src/content/` changed except the changelog entry.

- [ ] **Step 5: After merge** — sync `main`, remove the worktree and branch, and live-verify on https://menuagentic.com in both themes at 390px and 1280px.

---

## Self-Review

**Spec coverage**

| Spec section | Task |
|---|---|
| §2 Direction (fonts) | 2 |
| §3.1 Type scale | 2, 3, 4 |
| §3.2 Spacing scale | 2, 5 |
| §3.3 Colour | 2 |
| §3.4 Token migration | 2 |
| §3.5 CJK | 2, 10 |
| §4.1 Mobile header | 6 |
| §4.2 Restyle inventory | 7, 8 |
| §4.3 Syntax colours | 9 |
| §5 Rollout layering | task order |
| §6.1 Existing gates | 11 |
| §6.2 Change-specific checks | 1, 11 |
| §6.3 Permanent contrast test | 1, 9 |
| §7 Risks | 1 (screenshots), 9, 10 |

No gaps.

**Placeholder scan:** none. Every code step carries runnable code; every sweep step carries its full mapping table.

**Type consistency:** `parseColor` / `composite` / `contrastRatio` / `requiredRatio` / `startStaticServer` are defined in Task 1 and used with those exact names in Tasks 1 and 9. Token names in Task 2 match every consumer in Tasks 3–10.

**One deliberate deviation from the spec:** the measure test allows up to 78 characters where the spec says 60–75. The canvas average-glyph estimate runs slightly optimistic against true rendered line length, and a test that fails at 76 would be noise rather than signal.
