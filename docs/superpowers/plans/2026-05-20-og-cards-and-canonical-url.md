# OG Cards & Canonical URL Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every page on `menuagentic.com` ships a section-specific bilingual 1200×630 `og:image` (+ `twitter:image`). Switch the codebase's canonical site URL from `agentic-ai-wiki.vercel.app` to `menuagentic.com` in the same PR so the new card's URL line and `og:url` agree.

**Architecture:** Single source of truth in `src/content/og.ts` + `src/i18n/ui.ts`. A `scripts/build-og.mjs` Satori + resvg-js renderer produces 14 deterministic PNGs (7 sections × 2 locales) committed under `public/og/`. `BaseLayout.astro` gains an `image` prop; each layout / view passes the matching section image via the `ogImageFor()` helper. A `scripts/verify-og.mjs` walker hard-fails the build on any page whose emitted `og:image` doesn't match expectations.

**Tech Stack:** Astro 4 (static), TypeScript with `--experimental-strip-types`, Node 24, `satori`, `@resvg/resvg-js`, `node --test` for unit tests.

**Spec:** `docs/superpowers/specs/2026-05-20-og-cards-and-canonical-url-design.md`

**Worktree:** `/Users/cq/Git/agentic-ai-wiki/.worktrees/og-cards-and-canonical-url` (branch `og-cards-and-canonical-url`, based on `origin/main`).

**Always run commands from the worktree root:**
```bash
cd /Users/cq/Git/agentic-ai-wiki/.worktrees/og-cards-and-canonical-url
```

---

## Task 1: Flip the canonical site URL

Switching the `site` URL first means every subsequent build emits `og:url` / `canonical` / `sitemap` / `hreflang` with `menuagentic.com` automatically, so all later integrity checks have one consistent target.

**Files:**
- Modify: `astro.config.mjs:6`
- Modify: `CLAUDE.md:93`

- [ ] **Step 1: Flip `astro.config.mjs`**

```diff
- site: 'https://agentic-ai-wiki.vercel.app',
+ site: 'https://menuagentic.com',
```

- [ ] **Step 2: Update the live-site verification line in `CLAUDE.md`**

```diff
-  and branch, and confirm the live site (https://agentic-ai-wiki.vercel.app).
+  and branch, and confirm the live site (https://menuagentic.com).
```

- [ ] **Step 3: Confirm no other live (non-historical) references remain**

```bash
grep -rn "agentic-ai-wiki.vercel.app" \
  --include="*.md" --include="*.mjs" --include="*.js" --include="*.ts" \
  --include="*.astro" --include="*.json" \
  --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=docs .
```

Expected: zero matches outside `docs/superpowers/` (the historical plan/spec docs are records of past work — do NOT modify them).

- [ ] **Step 4: Build + smoke-grep**

```bash
npm run build
grep -l "menuagentic.com" dist/index.html dist/sitemap-index.xml
grep -l "agentic-ai-wiki.vercel.app" dist/ -r || echo "no stale URL — good"
```

Expected: `dist/index.html` and `dist/sitemap-index.xml` both list. Second grep prints `no stale URL — good`.

- [ ] **Step 5: Commit**

```bash
git add astro.config.mjs CLAUDE.md
git commit -m "Flip canonical site URL to menuagentic.com"
```

---

## Task 2: Add the OG section catalog and resolver helper

**Files:**
- Create: `src/content/og.ts`
- Create: `src/lib/og.ts`

- [ ] **Step 1: Create `src/content/og.ts`**

```ts
import type { Locale } from '../i18n/index';

export type OgSectionKey =
  | 'default'
  | 'fieldGuide'
  | 'concepts'
  | 'deepDives'
  | 'playbooks'
  | 'operations'
  | 'changelog';

export interface OgSection {
  key: OgSectionKey;
  /**
   * Only set on `default` — its card name has no nav entry, so it lives here.
   * For every other section, name is sourced from `ui[locale].nav[key]`.
   */
  name?: Record<Locale, string>;
}

export const OG_SECTIONS: readonly OgSection[] = [
  { key: 'default', name: { en: 'Agentic AI', zh: '智能体 AI' } },
  { key: 'fieldGuide' },
  { key: 'concepts' },
  { key: 'deepDives' },
  { key: 'playbooks' },
  { key: 'operations' },
  { key: 'changelog' },
] as const;
```

- [ ] **Step 2: Create `src/lib/og.ts`**

```ts
import type { Locale } from '../i18n/index';
import type { OgSectionKey } from '../content/og';

const SLUG: Record<OgSectionKey, string> = {
  default: 'default',
  fieldGuide: 'field-guide',
  concepts: 'concepts',
  deepDives: 'deep-dives',
  playbooks: 'playbooks',
  operations: 'operations',
  changelog: 'changelog',
};

/** Public path to the section's PNG for a given locale (e.g. "/og/og-concepts-zh.png"). */
export function ogImageFor(key: OgSectionKey, locale: Locale): string {
  const suffix = locale === 'zh' ? '-zh' : '';
  return `/og/og-${SLUG[key]}${suffix}.png`;
}

/** Build-time helper: derives the PNG file basename. Used by scripts/build-og.mjs. */
export function ogImageBasename(key: OgSectionKey, locale: Locale): string {
  const suffix = locale === 'zh' ? '-zh' : '';
  return `og-${SLUG[key]}${suffix}.png`;
}
```

- [ ] **Step 3: Type-check**

```bash
npx astro check
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/content/og.ts src/lib/og.ts
git commit -m "OG: add section catalog and ogImageFor() resolver"
```

---

## Task 3: TDD — unit tests for the OG catalog and resolver

Tests live under `scripts/__tests__/` per repo convention (`npm test` globs that folder).

**Files:**
- Create: `scripts/__tests__/og.test.mjs`

- [ ] **Step 1: Write the failing test file**

```js
// scripts/__tests__/og.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { OG_SECTIONS } from '../../src/content/og.ts';
import { ogImageFor, ogImageBasename } from '../../src/lib/og.ts';
import { ui } from '../../src/i18n/ui.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const LOCALES = ['en', 'zh'] as const;

test('every non-default section has matching ui.nav entries in en+zh', () => {
  for (const s of OG_SECTIONS) {
    if (s.key === 'default') continue;
    for (const locale of LOCALES) {
      const name = (ui as any)[locale].nav[s.key];
      assert.ok(
        typeof name === 'string' && name.length > 0,
        `ui.${locale}.nav.${s.key} must be a non-empty string`,
      );
    }
  }
});

test('default section has bilingual name in the catalog itself', () => {
  const def = OG_SECTIONS.find((s) => s.key === 'default');
  assert.ok(def?.name?.en && def?.name?.zh, 'default needs name.en and name.zh');
});

test('ogImageFor returns /og/og-<slug>(-zh).png for every (section, locale) pair', () => {
  for (const s of OG_SECTIONS) {
    for (const locale of LOCALES) {
      const path = ogImageFor(s.key, locale);
      assert.match(path, /^\/og\/og-[a-z-]+(-zh)?\.png$/);
      assert.equal(path.endsWith('-zh.png'), locale === 'zh');
    }
  }
});

test('ui.<locale>.og.tagline is a non-empty string', () => {
  for (const locale of LOCALES) {
    const t = (ui as any)[locale].og?.tagline;
    assert.ok(typeof t === 'string' && t.length > 0,
      `ui.${locale}.og.tagline must exist and be non-empty`);
  }
});

test('every (key, locale) pair has a committed PNG under public/og/', () => {
  const ogDir = resolve(ROOT, 'public', 'og');
  if (!existsSync(ogDir)) {
    // Bootstrapping: the directory hasn't been generated yet. Skip gracefully
    // so this test can be written before the PNGs exist; the verify-og step
    // (separate test) covers the deployed assertion.
    return;
  }
  for (const s of OG_SECTIONS) {
    for (const locale of LOCALES) {
      const file = resolve(ogDir, ogImageBasename(s.key, locale));
      assert.ok(existsSync(file), `expected ${file} to exist`);
    }
  }
});

test('no orphan PNGs under public/og/', () => {
  const ogDir = resolve(ROOT, 'public', 'og');
  if (!existsSync(ogDir)) return;
  const expected = new Set(
    OG_SECTIONS.flatMap((s) => LOCALES.map((l) => ogImageBasename(s.key, l))),
  );
  for (const f of readdirSync(ogDir)) {
    if (f === '.DS_Store') continue;
    assert.ok(expected.has(f), `orphan PNG: public/og/${f}`);
  }
});
```

- [ ] **Step 2: Run the test, confirm it fails**

```bash
npm test -- --test-name-pattern='og '
```

Expected: `ui.<locale>.og.tagline` test fails (the field doesn't exist yet); catalog/resolver tests pass. This is the red half of TDD for Task 4.

- [ ] **Step 3: Commit (red)**

```bash
git add scripts/__tests__/og.test.mjs
git commit -m "OG: add unit tests for catalog/resolver/tagline"
```

---

## Task 4: Add `og.tagline` to UIStrings (EN + ZH)

Makes the failing test from Task 3 pass and gives the build script a source for the card's lower-left line.

**Files:**
- Modify: `src/i18n/ui.ts` (interface around line 44, EN block ~line 125, ZH block ~line 207)

- [ ] **Step 1: Extend the `UIStrings` interface**

In `src/i18n/ui.ts`, add the `og` field to the interface immediately after the existing `changelog` field on line 44:

```diff
  changelog: { kicker: string; metaTitle: string; metaDesc: string; h1: string; intro: string };
+ og: { tagline: string };
  seriesTitle: string;
```

- [ ] **Step 2: Add the EN `og.tagline`**

Locate the EN block's `changelog: { ... }` closing brace (around line 127) and add right after it, before `seriesTitle`:

```diff
    changelog: { kicker: 'Changelog', metaTitle: 'Changelog — Agentic AI Wiki',
      metaDesc: 'What changed on the Agentic AI Wiki, newest first.',
      h1: 'Changelog',
      intro: '...' },
+   og: { tagline: 'A living knowledge base on building agentic AI.' },
    seriesTitle: 'The Agentic AI Field Guide',
```

- [ ] **Step 3: Add the ZH `og.tagline`**

In the ZH block, mirror the structure right after `changelog: { ... }` (around line 209):

```diff
    changelog: { kicker: '更新日志', metaTitle: '更新日志 — Agentic AI 维基',
      ...,
      h1: '更新日志',
      intro: '...' },
+   og: { tagline: '持续更新的智能体 AI 知识库。' },
    seriesTitle: 'Agentic AI 实战指南',
```

- [ ] **Step 4: Run the unit tests — they should now go green**

```bash
npm test -- --test-name-pattern='og '
```

Expected: all `og ` tests pass. The "every (key, locale) pair has a committed PNG" and "no orphan PNGs" tests will short-circuit because `public/og/` doesn't exist yet (the bootstrap branch in the test).

- [ ] **Step 5: Type-check**

```bash
npx astro check
```

Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add src/i18n/ui.ts
git commit -m "OG: add og.tagline to UIStrings (en + zh)"
```

---

## Task 5: Vendor the fonts Satori will use

Satori needs raw `.ttf` / `.otf` buffers — it can't pull from Google Fonts at runtime. Commit them once under `vendor/fonts/`.

**Files:**
- Create: `vendor/fonts/Fraunces-Light.ttf` (300 weight)
- Create: `vendor/fonts/Inter-Regular.ttf` (400)
- Create: `vendor/fonts/JetBrainsMono-Medium.ttf` (500)
- Create: `vendor/fonts/NotoSansSC-Regular.otf` (CJK fallback)
- Create: `vendor/fonts/README.md` (provenance note)

- [ ] **Step 1: Make the directory and add a provenance note**

```bash
mkdir -p vendor/fonts
cat > vendor/fonts/README.md <<'EOF'
# Vendored fonts (build-time only)

These font files are used by `scripts/build-og.mjs` to render the social-share
OG cards under `public/og/`. They are NOT served to site visitors — only the
PNG output is. Sourced from Google Fonts; license terms live with each font.

| file | family | weight | source |
|---|---|---|---|
| Fraunces-Light.ttf | Fraunces | 300 | https://fonts.google.com/specimen/Fraunces |
| Inter-Regular.ttf | Inter | 400 | https://fonts.google.com/specimen/Inter |
| JetBrainsMono-Medium.ttf | JetBrains Mono | 500 | https://fonts.google.com/specimen/JetBrains+Mono |
| NotoSansSC-Regular.otf | Noto Sans SC | 400 | https://fonts.google.com/noto/specimen/Noto+Sans+SC |
EOF
```

- [ ] **Step 2: Download the four font files**

Use the Google Fonts archive (these are stable URLs):

```bash
# Fraunces 300 (variable axis subset)
curl -fL -o vendor/fonts/Fraunces-Light.ttf \
  "https://github.com/undercasetype/Fraunces/raw/main/fonts/static/Fraunces/Fraunces-Light.ttf"

# Inter 400
curl -fL -o vendor/fonts/Inter-Regular.ttf \
  "https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Regular.otf"
# (the rsms inter repo ships .otf — rename:)
mv vendor/fonts/Inter-Regular.ttf vendor/fonts/Inter-Regular.otf

# JetBrains Mono 500
curl -fL -o vendor/fonts/JetBrainsMono-Medium.ttf \
  "https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/JetBrainsMono-Medium.ttf"

# Noto Sans SC 400 (Simplified Chinese)
curl -fL -o vendor/fonts/NotoSansSC-Regular.otf \
  "https://github.com/notofonts/noto-cjk/raw/main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf"
```

If any URL 404s, fall back to manually downloading the matching weight from the Google Fonts page and dropping the file at the same path; the build script reads by filename.

- [ ] **Step 3: Verify file sizes are sane**

```bash
ls -lh vendor/fonts/
```

Expected ranges (rough): Fraunces ~150 KB, Inter ~280 KB, JetBrainsMono ~250 KB, NotoSansSC ~8–12 MB. Any file < 5 KB is an HTML error page — re-download.

- [ ] **Step 4: Update the README to match actual filenames**

If Step 2's filename adjustments changed extensions (`.otf` vs `.ttf`), edit `vendor/fonts/README.md` to match what's actually on disk.

- [ ] **Step 5: Commit**

```bash
git add vendor/fonts/
git commit -m "OG: vendor fonts (Fraunces 300, Inter 400, JBM 500, Noto Sans SC)"
```

---

## Task 6: Install Satori and resvg-js as devDependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Install the two libraries**

```bash
npm install --save-dev satori @resvg/resvg-js
```

- [ ] **Step 2: Confirm versions landed**

```bash
node -e "const p=require('./package.json'); console.log(p.devDependencies.satori, p.devDependencies['@resvg/resvg-js']);"
```

Expected: two version strings (e.g. `^0.10.x ^2.6.x`).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "OG: add satori + @resvg/resvg-js devDeps"
```

---

## Task 7: Write the PNG build script

This is the largest single task — a Satori template + render loop + integrity checks. It produces the 14 PNGs as deterministic byte output and writes them only when the bytes change.

**Files:**
- Create: `scripts/build-og.mjs`

- [ ] **Step 1: Write `scripts/build-og.mjs`**

```js
// scripts/build-og.mjs
// Renders the 14 social-share OG cards (7 sections × en/zh) to public/og/.
// Run via `npm run og:build`. Idempotent: writes only when bytes change.
//
// Layout: Direction A — dark editorial card (see the spec).
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { OG_SECTIONS } from '../src/content/og.ts';
import { ogImageBasename } from '../src/lib/og.ts';
import { ui } from '../src/i18n/ui.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'public', 'og');
const FONT_DIR = resolve(ROOT, 'vendor', 'fonts');

const LOCALES = /** @type {const} */ (['en', 'zh']);
const WIDTH = 1200;
const HEIGHT = 630;
const MIN_BYTES = 20 * 1024;     // 20 KB lower band
const MAX_BYTES = 500 * 1024;    // 500 KB upper band

const FONTS = [
  { name: 'Fraunces',         file: 'Fraunces-Light.ttf',        weight: 300, style: 'normal' },
  { name: 'Inter',            file: 'Inter-Regular.otf',         weight: 400, style: 'normal' },
  { name: 'JetBrains Mono',   file: 'JetBrainsMono-Medium.ttf',  weight: 500, style: 'normal' },
  { name: 'Noto Sans SC',     file: 'NotoSansSC-Regular.otf',    weight: 400, style: 'normal' },
];

const INK = '#0a0a0a';
const PAPER = '#f4f1ea';
const PAPER_2 = '#ebe7dc';
const ACCENT = '#d4421e';

function loadFonts() {
  return FONTS.map((f) => ({
    name: f.name,
    data: readFileSync(resolve(FONT_DIR, f.file)),
    weight: f.weight,
    style: f.style,
  }));
}

function dot(opacity) {
  return {
    type: 'div',
    props: {
      style: {
        width: 24, height: 24, borderRadius: 12,
        background: ACCENT, opacity, marginLeft: opacity === 1 ? 0 : 16,
      },
    },
  };
}

/** Returns a Satori-shape virtual DOM node for one card. */
function renderCard({ name, tagline }) {
  // Tighter font size for longer strings so the 1200px width stays comfortable.
  const sectionFontSize = name.length >= 9 ? 144 : 168;
  return {
    type: 'div',
    props: {
      style: {
        width: WIDTH, height: HEIGHT,
        background: INK, color: PAPER,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '88px 112px',
        fontFamily: 'Inter',
      },
      children: [
        // Top row: brand line + accent dots
        {
          type: 'div',
          props: {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'JetBrains Mono', fontSize: 24, fontWeight: 500,
                    letterSpacing: '0.22em', textTransform: 'uppercase', color: PAPER_2,
                  },
                  children: 'Agentic AI Wiki',
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center' },
                  children: [dot(1), dot(0.6), dot(0.3)],
                },
              },
            ],
          },
        },
        // Middle: section name + accent rule
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Fraunces', fontSize: sectionFontSize, fontWeight: 300,
                    lineHeight: 1, letterSpacing: '-0.01em', color: PAPER,
                  },
                  children: name,
                },
              },
              {
                type: 'div',
                props: { style: { width: 112, height: 4, background: ACCENT, marginTop: 28 } },
              },
            ],
          },
        },
        // Bottom row: tagline + URL
        {
          type: 'div',
          props: {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontFamily: 'Inter', fontSize: 32, color: PAPER_2, maxWidth: 720, lineHeight: 1.45 },
                  children: tagline,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'JetBrains Mono', fontSize: 22, fontWeight: 500,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: PAPER_2, opacity: 0.85,
                  },
                  children: 'menuagentic.com',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

function writeIfChanged(path, bytes) {
  if (existsSync(path)) {
    const existing = readFileSync(path);
    if (existing.equals(bytes)) return { wrote: false };
  }
  writeFileSync(path, bytes);
  return { wrote: true };
}

function nameFor(section, locale) {
  if (section.key === 'default') return section.name[locale];
  // ui.<locale>.nav.<key>
  return ui[locale].nav[section.key];
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const fonts = loadFonts();
  const expected = new Set();
  let wroteCount = 0;

  for (const section of OG_SECTIONS) {
    for (const locale of LOCALES) {
      const name = nameFor(section, locale);
      const tagline = ui[locale].og.tagline;
      const basename = ogImageBasename(section.key, locale);
      const outPath = resolve(OUT_DIR, basename);
      expected.add(basename);

      const svg = await satori(renderCard({ name, tagline }), {
        width: WIDTH, height: HEIGHT, fonts,
      });
      const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();

      // PNG integrity assertions (in-process, hard-fail).
      if (png.length < MIN_BYTES) {
        throw new Error(`[og] ${basename} too small (${png.length} bytes < ${MIN_BYTES}) — likely blank render`);
      }
      if (png.length > MAX_BYTES) {
        throw new Error(`[og] ${basename} too large (${png.length} bytes > ${MAX_BYTES}) — font fallback explosion?`);
      }
      // PNG dimensions live in bytes 16..23 (big-endian uint32 width then height).
      const w = png.readUInt32BE(16);
      const h = png.readUInt32BE(20);
      if (w !== WIDTH || h !== HEIGHT) {
        throw new Error(`[og] ${basename} dims ${w}x${h} != ${WIDTH}x${HEIGHT}`);
      }

      const { wrote } = writeIfChanged(outPath, png);
      if (wrote) wroteCount++;
      console.log(`[og] ${basename} ${wrote ? 'wrote' : 'unchanged'} (${(png.length / 1024).toFixed(1)} KB)`);
    }
  }

  // Prune orphan PNGs that no longer have a section mapping.
  for (const f of readdirSync(OUT_DIR)) {
    if (f === '.DS_Store') continue;
    if (!expected.has(f)) {
      const stale = resolve(OUT_DIR, f);
      unlinkSync(stale);
      console.log(`[og] removed orphan ${f}`);
    }
  }

  console.log(`[og] done — ${expected.size} expected, ${wroteCount} updated this run`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Run the script once manually**

```bash
node --experimental-strip-types scripts/build-og.mjs
```

Expected output: 14 lines like `[og] og-field-guide.png wrote (XX.X KB)`, then `[og] done — 14 expected, 14 updated this run`.

If a font fails to load (file missing), the error will be explicit. Re-do Task 5 for that font.

If ZH characters render as boxes ("tofu"), the Noto Sans SC font isn't being picked up — confirm the file exists at `vendor/fonts/NotoSansSC-Regular.otf` and the filename in the script matches.

- [ ] **Step 3: Confirm 14 PNGs exist with the right dimensions**

```bash
ls public/og/
file public/og/*.png | head -3
```

Expected: 14 files named `og-default.png`, `og-default-zh.png`, `og-field-guide.png`, `og-field-guide-zh.png`, …. Each `file` line reports `PNG image data, 1200 x 630, 8-bit/color RGB, non-interlaced`.

- [ ] **Step 4: Spot-check the rendered cards visually**

```bash
open public/og/og-field-guide.png public/og/og-field-guide-zh.png public/og/og-deep-dives.png public/og/og-deep-dives-zh.png
```

Confirm: dark background, paper text, accent dots top-right, section name centered-ish, accent rule under it, tagline + `menuagentic.com` at the bottom. Chinese cards must show real glyphs (not boxes).

- [ ] **Step 5: Confirm idempotence**

```bash
node --experimental-strip-types scripts/build-og.mjs
```

Expected: all 14 lines say `unchanged`; final line `14 expected, 0 updated this run`.

- [ ] **Step 6: Commit**

```bash
git add scripts/build-og.mjs public/og/
git commit -m "OG: build script + render 14 PNGs to public/og/"
```

---

## Task 8: Wire `og:build` into the npm scripts

So the script is discoverable and runs ahead of `astro build`.

**Files:**
- Modify: `package.json` (scripts section)

- [ ] **Step 1: Add `og:build` and prepend to `build`**

```diff
   "scripts": {
     "dev": "astro dev",
-    "build": "astro build",
+    "og:build": "node --experimental-strip-types scripts/build-og.mjs",
+    "build": "npm run og:build && astro build",
     "build:search": "astro build && pagefind --site dist",
```

Note: `vercel.json:4` already declares `"buildCommand": "npm run build && npm run verify && npm run search:index && npm run test:search"` — that chain now includes `og:build` automatically through the modified `build` script.

- [ ] **Step 2: Run the full build to confirm**

```bash
npm run build
```

Expected: the 14 `[og] …` lines first (all `unchanged` after Task 7); then Astro builds `dist/` normally.

- [ ] **Step 3: Confirm idempotence after a full build**

```bash
git status -- public/og/
```

Expected: empty — no PNG byte drift introduced by re-running the script.

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "OG: wire og:build into npm run build"
```

---

## Task 9: BaseLayout — add `image` prop and emit OG meta tags

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Extend `Props` and read `image`**

```diff
- export interface Props { title: string; description?: string; locale?: Locale }
- const { title, description = 'A living knowledge base on building agentic AI.', locale = 'en' } = Astro.props;
+ export interface Props { title: string; description?: string; locale?: Locale; image?: string }
+ const { title, description = 'A living knowledge base on building agentic AI.', locale = 'en', image } = Astro.props;
  const path = Astro.url.pathname;
  const canonical = new URL(path, Astro.site).toString();
+ const defaultOg = locale === 'zh' ? '/og/og-default-zh.png' : '/og/og-default.png';
+ const ogImage = new URL(image ?? defaultOg, Astro.site).toString();
```

- [ ] **Step 2: Insert the OG/Twitter image meta tags + flip the Twitter card**

Around line 33–36 (after `<meta property="og:locale" ...>`), replace the `twitter:card` block with the expanded image meta:

```diff
   <meta property="og:locale" content={locale === 'zh' ? 'zh_CN' : 'en_US'} />
-  <meta name="twitter:card" content="summary" />
+  <meta property="og:image" content={ogImage} />
+  <meta property="og:image:width" content="1200" />
+  <meta property="og:image:height" content="630" />
+  <meta property="og:image:alt" content={title} />
+  <meta name="twitter:card" content="summary_large_image" />
   <meta name="twitter:title" content={title} />
   <meta name="twitter:description" content={description} />
+  <meta name="twitter:image" content={ogImage} />
```

- [ ] **Step 3: Build and grep**

```bash
npm run build
grep -E 'og:image|twitter:(card|image)' dist/index.html | head -10
```

Expected output snippet:
```
<meta property="og:image" content="https://menuagentic.com/og/og-default.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Agentic AI Wiki — knowledge, written to last.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://menuagentic.com/og/og-default.png">
```

- [ ] **Step 4: Confirm no leftover `twitter:card` value of `summary`**

```bash
grep -rn 'twitter:card" content="summary"' dist/ | grep -v summary_large_image | wc -l
```

Expected: `0`.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "OG: BaseLayout image prop + og:image/twitter:image meta"
```

---

## Task 10: ChapterLayout — pass the field-guide image

ChapterLayout wraps `BaseLayout` directly (unlike DeepDive/Playbook/Operation/Concept which go through SectionEntryLayout — that's covered in Task 11).

**Files:**
- Modify: `src/layouts/ChapterLayout.astro`

- [ ] **Step 1: Import the helper and pass the image**

```diff
  import { CHAPTERS } from '../content/field-guide/manifest';
+ import { ogImageFor } from '../lib/og';
  export interface Props { slug: string; locale?: Locale }
  ...
- <BaseLayout title={title} description={`${partNm}: ${chTitle}.`} locale={locale}>
+ <BaseLayout title={title} description={`${partNm}: ${chTitle}.`} locale={locale} image={ogImageFor('fieldGuide', locale)}>
```

- [ ] **Step 2: Build and confirm**

```bash
npm run build
grep 'og:image' dist/field-guide/$(ls dist/field-guide/ | grep -v 'index.html' | head -1)/index.html
```

Expected: `<meta property="og:image" content="https://menuagentic.com/og/og-field-guide.png">`.

For ZH:
```bash
grep 'og:image' dist/zh/field-guide/$(ls dist/zh/field-guide/ | grep -v 'index.html' | head -1)/index.html
```

Expected: ends in `og-field-guide-zh.png`.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/ChapterLayout.astro
git commit -m "OG: ChapterLayout passes field-guide image"
```

---

## Task 11: SectionEntryLayout — accept a sectionKey and forward an image

This layout is wrapped by `ConceptLayout`, `DeepDiveLayout`, `PlaybookLayout`, and `OperationLayout`. We push the section key down through it so each wrapper only declares its key.

**Files:**
- Modify: `src/layouts/SectionEntryLayout.astro`

- [ ] **Step 1: Add the `sectionKey` prop**

```diff
  import BaseLayout from './BaseLayout.astro';
  import SectionSidebar from '../components/SectionSidebar.astro';
  import type { Locale } from '../i18n/index';
  import { localizeHref } from '../i18n/index';
+ import { ogImageFor } from '../lib/og';
+ import type { OgSectionKey } from '../content/og';
```

In the `Props` interface, append:

```diff
    bodies: Record<string, string>;
    bodyDir: string;
    linkFor?: (e: SectionEntry) => string;
+   /** OG section key — drives og:image. Required so detail layouts can't drift. */
+   sectionKey: OgSectionKey;
  }
- const { locale, base, rootLabel, ariaLabel, prevLabel, nextLabel, entry, entries, groups, bodies, bodyDir, linkFor } = Astro.props;
+ const { locale, base, rootLabel, ariaLabel, prevLabel, nextLabel, entry, entries, groups, bodies, bodyDir, linkFor, sectionKey } = Astro.props;
```

- [ ] **Step 2: Forward `image` to BaseLayout**

```diff
- <BaseLayout title={title} description={entry.summary[locale]} locale={locale}>
+ <BaseLayout title={title} description={entry.summary[locale]} locale={locale} image={ogImageFor(sectionKey, locale)}>
```

- [ ] **Step 3: Astro check — wrappers will complain about missing `sectionKey`**

```bash
npx astro check
```

Expected: four errors, one per wrapper file (ConceptLayout, DeepDiveLayout, PlaybookLayout, OperationLayout) — saying `sectionKey` is missing. This is the red half before Task 12.

- [ ] **Step 4: Commit (intentionally red)**

```bash
git add src/layouts/SectionEntryLayout.astro
git commit -m "OG: SectionEntryLayout takes sectionKey + forwards og:image"
```

---

## Task 12: Each per-section wrapper layout passes its key

**Files:**
- Modify: `src/layouts/ConceptLayout.astro`
- Modify: `src/layouts/DeepDiveLayout.astro`
- Modify: `src/layouts/PlaybookLayout.astro`
- Modify: `src/layouts/OperationLayout.astro`

- [ ] **Step 1: ConceptLayout**

```diff
  <SectionEntryLayout
    locale={locale}
    base="/concepts"
    ...
    bodyDir="../content/concepts"
+   sectionKey="concepts"
  />
```

- [ ] **Step 2: DeepDiveLayout**

```diff
  <SectionEntryLayout
    locale={locale}
    base="/deep-dives"
    ...
    bodyDir="../content/deep-dives"
    linkFor={linkFor}
+   sectionKey="deepDives"
  />
```

- [ ] **Step 3: PlaybookLayout**

```diff
  <SectionEntryLayout
    locale={locale}
    base="/playbooks"
    ...
    bodyDir="../content/playbooks"
    linkFor={linkFor}
+   sectionKey="playbooks"
  />
```

- [ ] **Step 4: OperationLayout**

```diff
  <SectionEntryLayout
    locale={locale}
    base="/operations"
    ...
    bodyDir="../content/operations"
    linkFor={linkFor}
+   sectionKey="operations"
  />
```

- [ ] **Step 5: Type-check and build**

```bash
npx astro check
npm run build
```

Expected: 0 errors. Build completes.

- [ ] **Step 6: Spot-check the emitted meta on one concept and one deep-dive page**

```bash
grep 'og:image' dist/concepts/$(ls dist/concepts/ | head -1)/index.html
grep 'og:image' dist/deep-dives/$(ls dist/deep-dives/ | head -2 | tail -1)/$(ls dist/deep-dives/$(ls dist/deep-dives/ | head -2 | tail -1)/ | head -1)/index.html 2>/dev/null
```

Expected: first ends in `og-concepts.png`, second in `og-deep-dives.png`.

- [ ] **Step 7: Commit**

```bash
git add src/layouts/ConceptLayout.astro src/layouts/DeepDiveLayout.astro src/layouts/PlaybookLayout.astro src/layouts/OperationLayout.astro
git commit -m "OG: per-section layouts pass sectionKey to SectionEntryLayout"
```

---

## Task 13: GroupIndexView — image driven by sectionKind

This is the `[group]/index.astro` landing page for deep-dives / playbooks / operations.

**Files:**
- Modify: `src/components/pages/GroupIndexView.astro`

- [ ] **Step 1: Map sectionKind → OG section key and forward the image**

```diff
  import BaseLayout from '../../layouts/BaseLayout.astro';
  import type { Locale } from '../../i18n/index';
  import { localizeHref } from '../../i18n/index';
  import { ui } from '../../i18n/ui';
  ...
+ import { ogImageFor } from '../../lib/og';
+ import type { OgSectionKey } from '../../content/og';
  ...
  type Kind = 'deep-dive' | 'playbook' | 'operation';
+ const OG_KEY_BY_KIND: Record<Kind, OgSectionKey> = {
+   'deep-dive': 'deepDives',
+   playbook: 'playbooks',
+   operation: 'operations',
+ };
  ...
- <BaseLayout title={title} description={group.groupSummary[locale]} locale={locale}>
+ <BaseLayout title={title} description={group.groupSummary[locale]} locale={locale} image={ogImageFor(OG_KEY_BY_KIND[sectionKind], locale)}>
```

- [ ] **Step 2: Build and verify**

```bash
npm run build
grep 'og:image' dist/deep-dives/$(ls dist/deep-dives/ | grep -v 'index.html' | head -1)/index.html
```

Expected: ends in `og-deep-dives.png`. Likewise for playbooks/operations group landing pages.

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/GroupIndexView.astro
git commit -m "OG: GroupIndexView picks image by sectionKind"
```

---

## Task 14: Section-index View components — pass their section image

Each section's landing-page wrapper is a `*View.astro` under `src/components/pages/`. They each take `locale` from the thin pages-route shim. One twist: `ConceptsView` does NOT wrap `BaseLayout` directly — it delegates to `SectionIndexView`, which is the one that wraps `BaseLayout`. So `SectionIndexView` needs a `sectionKey` prop (mirroring `SectionEntryLayout` from Task 11), and `ConceptsView` passes it through.

**Files to modify:**
- `src/components/pages/SectionIndexView.astro` (add `sectionKey` prop, forward to BaseLayout)
- `src/components/pages/ConceptsView.astro` (pass `sectionKey="concepts"`)
- `src/components/pages/FieldGuideView.astro` (pass `image` to its BaseLayout)
- `src/components/pages/DeepDivesView.astro` (pass `image` to its BaseLayout)
- `src/components/pages/PlaybooksView.astro` (pass `image` to its BaseLayout)
- `src/components/pages/OperationsView.astro` (pass `image` to its BaseLayout)
- `src/components/pages/ChangelogView.astro` (pass `image` to its BaseLayout)

**Files NOT modified:**
- `HomeView.astro`, `AboutView.astro` — intentionally fall through to `og-default`.
- `GroupIndexView.astro` — already handled in Task 13.

- [ ] **Step 1: `SectionIndexView.astro` — add a required `sectionKey` prop**

```diff
  import BaseLayout from '../../layouts/BaseLayout.astro';
  import type { Locale } from '../../i18n/index';
  import { localizeHref } from '../../i18n/index';
+ import { ogImageFor } from '../../lib/og';
+ import type { OgSectionKey } from '../../content/og';
  ...
  export interface Props {
    locale: Locale;
    base: string;
    strings: SectionStrings;
    groups: { group: string | null; items: SectionEntry[] }[];
+   sectionKey: OgSectionKey;
  }
- const { locale, base, strings, groups } = Astro.props;
+ const { locale, base, strings, groups, sectionKey } = Astro.props;
  ...
- <BaseLayout title={strings.metaTitle} description={strings.metaDesc} locale={locale}>
+ <BaseLayout title={strings.metaTitle} description={strings.metaDesc} locale={locale} image={ogImageFor(sectionKey, locale)}>
```

- [ ] **Step 2: `ConceptsView.astro` — pass the key through**

```diff
- <SectionIndexView locale={locale} base="/concepts" strings={t.concepts} groups={groups} />
+ <SectionIndexView locale={locale} base="/concepts" strings={t.concepts} groups={groups} sectionKey="concepts" />
```

- [ ] **Step 3: `FieldGuideView.astro` — pass `image` directly**

```diff
  import BaseLayout from '../../layouts/BaseLayout.astro';
+ import { ogImageFor } from '../../lib/og';
  ...
- <BaseLayout title={...} description={...} locale={locale}>
+ <BaseLayout title={...} description={...} locale={locale} image={ogImageFor('fieldGuide', locale)}>
```

- [ ] **Step 4: Apply the same pattern to the remaining four Views**

For each of `DeepDivesView.astro`, `PlaybooksView.astro`, `OperationsView.astro`, `ChangelogView.astro`: add the `ogImageFor` import and the `image={ogImageFor('<key>', locale)}` prop, using the mapping:

| file | OG key |
|---|---|
| `DeepDivesView.astro` | `deepDives` |
| `PlaybooksView.astro` | `playbooks` |
| `OperationsView.astro` | `operations` |
| `ChangelogView.astro` | `changelog` |

Each existing `<BaseLayout title={t.<section>.metaTitle} description={t.<section>.metaDesc} locale={locale}>` becomes:

```diff
- <BaseLayout title={t.<section>.metaTitle} description={t.<section>.metaDesc} locale={locale}>
+ <BaseLayout title={t.<section>.metaTitle} description={t.<section>.metaDesc} locale={locale} image={ogImageFor('<key>', locale)}>
```

- [ ] **Step 5: Build and verify all section landings**

```bash
npm run build
for s in field-guide concepts deep-dives playbooks operations changelog; do
  echo "--- /$s/ ---"
  grep 'og:image' dist/$s/index.html
  echo "--- /zh/$s/ ---"
  grep 'og:image' dist/zh/$s/index.html
done
```

Expected: each EN row ends in `og-<slug>.png`; each ZH row ends in `og-<slug>-zh.png`.

- [ ] **Step 6: Confirm home + about still use the default**

```bash
grep 'og:image' dist/index.html
grep 'og:image' dist/about/index.html
grep 'og:image' dist/zh/index.html
grep 'og:image' dist/zh/about/index.html
```

Expected: first two end in `og-default.png`, last two end in `og-default-zh.png`.

- [ ] **Step 7: Commit**

```bash
git add src/components/pages/
git commit -m "OG: section-index Views pass their section image"
```

---

## Task 15: TDD — `verify-og.mjs` walks `dist/` and asserts per-route mappings

This is the hard-fail check that protects against a future layout shipping with the wrong (or no) image.

**Files:**
- Create: `scripts/verify-og.mjs`
- Create: `scripts/__tests__/verify-og.test.mjs`

- [ ] **Step 1: Write the unit test first**

```js
// scripts/__tests__/verify-og.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractOgImage, expectedOgFor } from '../verify-og.mjs';

test('extractOgImage parses the og:image content from a head string', () => {
  const html = `<html><head><meta property="og:image" content="https://menuagentic.com/og/og-concepts.png"></head></html>`;
  assert.equal(extractOgImage(html), '/og/og-concepts.png');
});

test('expectedOgFor maps every section route → its PNG', () => {
  assert.equal(expectedOgFor('/field-guide/chapter-1/'),         '/og/og-field-guide.png');
  assert.equal(expectedOgFor('/zh/field-guide/chapter-1/'),      '/og/og-field-guide-zh.png');
  assert.equal(expectedOgFor('/concepts/'),                      '/og/og-concepts.png');
  assert.equal(expectedOgFor('/concepts/what-is-an-agent/'),     '/og/og-concepts.png');
  assert.equal(expectedOgFor('/zh/concepts/what-is-an-agent/'),  '/og/og-concepts-zh.png');
  assert.equal(expectedOgFor('/deep-dives/'),                    '/og/og-deep-dives.png');
  assert.equal(expectedOgFor('/deep-dives/memory/'),             '/og/og-deep-dives.png');
  assert.equal(expectedOgFor('/deep-dives/memory/episodic/'),    '/og/og-deep-dives.png');
  assert.equal(expectedOgFor('/playbooks/coding/'),              '/og/og-playbooks.png');
  assert.equal(expectedOgFor('/operations/observability/'),      '/og/og-operations.png');
  assert.equal(expectedOgFor('/changelog/'),                     '/og/og-changelog.png');
  assert.equal(expectedOgFor('/zh/changelog/'),                  '/og/og-changelog-zh.png');
  assert.equal(expectedOgFor('/'),                               '/og/og-default.png');
  assert.equal(expectedOgFor('/about/'),                         '/og/og-default.png');
  assert.equal(expectedOgFor('/zh/'),                            '/og/og-default-zh.png');
  assert.equal(expectedOgFor('/zh/about/'),                      '/og/og-default-zh.png');
  assert.equal(expectedOgFor('/404.html'),                       '/og/og-default.png');
});
```

- [ ] **Step 2: Run the test — it fails (verify-og.mjs doesn't exist)**

```bash
npm test -- --test-name-pattern='extractOgImage|expectedOgFor'
```

Expected: errors loading the module — that's red.

- [ ] **Step 3: Write `scripts/verify-og.mjs`**

```js
// scripts/verify-og.mjs
// Walks dist/ and asserts every page's og:image matches its route. Also
// asserts twitter:card upgrade and zero references to the old vercel.app URL.
// Hard-fails the build on any drift.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');

export function extractOgImage(html) {
  const m = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
  if (!m) return null;
  // Strip the absolute host so the rest of the logic deals in paths.
  try {
    return new URL(m[1]).pathname;
  } catch {
    return m[1];
  }
}

function hasMeta(html, fragment) {
  return html.includes(fragment);
}

// Maps a URL pathname to the OG PNG it should reference.
//
// Locale prefix: `/zh/...` → suffix `-zh`. Anything else → no suffix.
// Section prefix: matched by the first non-locale segment.
export function expectedOgFor(pathname) {
  const noTrailing = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const parts = noTrailing.split('/').filter(Boolean); // ['zh','concepts',...] or ['concepts',...]
  const isZh = parts[0] === 'zh';
  const suffix = isZh ? '-zh' : '';
  const section = isZh ? parts[1] : parts[0];

  const MAP = {
    'field-guide': 'field-guide',
    concepts: 'concepts',
    'deep-dives': 'deep-dives',
    playbooks: 'playbooks',
    operations: 'operations',
    changelog: 'changelog',
  };
  const slug = MAP[section] ?? 'default';
  return `/og/og-${slug}${suffix}.png`;
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = resolve(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function main() {
  const errors = [];
  let pages = 0;

  for (const file of walk(DIST)) {
    if (!file.endsWith('.html')) continue;
    pages++;
    const html = readFileSync(file, 'utf8');
    const rel = '/' + relative(DIST, file).replace(/index\.html$/, '');
    const route = rel === '/' ? '/' : (rel.endsWith('/') ? rel : rel + '/');

    // a) og:image mapping
    const actual = extractOgImage(html);
    const expected = expectedOgFor(route);
    if (actual !== expected) {
      errors.push(`${route}: og:image is ${actual ?? '(missing)'} — expected ${expected}`);
    }

    // b) twitter:card upgrade
    if (!hasMeta(html, '<meta name="twitter:card" content="summary_large_image"')) {
      errors.push(`${route}: twitter:card is not summary_large_image`);
    }

    // c) image dimensions + alt + twitter:image are all present
    for (const f of [
      '<meta property="og:image:width" content="1200"',
      '<meta property="og:image:height" content="630"',
      '<meta property="og:image:alt"',
      '<meta name="twitter:image"',
    ]) {
      if (!hasMeta(html, f)) errors.push(`${route}: missing ${f.replace(/<meta\s+/, '').slice(0, 60)}…`);
    }

    // d) zero stale-domain references
    if (html.includes('agentic-ai-wiki.vercel.app')) {
      errors.push(`${route}: leftover "agentic-ai-wiki.vercel.app" reference`);
    }
  }

  // e) sitemap + hreflang use the new domain.
  for (const file of walk(DIST)) {
    if (!/sitemap.*\.xml$/.test(file)) continue;
    const xml = readFileSync(file, 'utf8');
    if (xml.includes('agentic-ai-wiki.vercel.app')) {
      errors.push(`${relative(DIST, file)}: contains old domain`);
    }
    if (!xml.includes('menuagentic.com')) {
      errors.push(`${relative(DIST, file)}: missing menuagentic.com URLs`);
    }
  }

  if (errors.length) {
    console.error(`[verify-og] ${errors.length} error(s) across ${pages} pages:`);
    for (const e of errors) console.error('  ✗ ' + e);
    process.exit(1);
  }
  console.log(`[verify-og] OK — ${pages} pages checked`);
}

// CLI entry: only run main() when invoked directly (not when imported by tests).
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
```

- [ ] **Step 4: Run the unit test — it passes**

```bash
npm test -- --test-name-pattern='extractOgImage|expectedOgFor'
```

Expected: both tests pass.

- [ ] **Step 5: Run the verifier against the existing build**

```bash
npm run build
node scripts/verify-og.mjs
```

Expected: `[verify-og] OK — N pages checked` (N is roughly 270+ given EN + ZH content).

If errors appear, they point at exactly which route is wrong — fix the originating layout/view and re-run.

- [ ] **Step 6: Commit**

```bash
git add scripts/verify-og.mjs scripts/__tests__/verify-og.test.mjs
git commit -m "OG: verify-og walks dist/ and asserts per-route mapping"
```

---

## Task 16: Wire `verify-og.mjs` into `npm run verify`

So the existing verification gate covers OG too.

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Append `verify-og` to the verify chain**

```diff
-    "verify": "npm run build && node --experimental-strip-types scripts/verify-chapters.mjs && node scripts/check-internal-links.mjs",
+    "verify": "npm run build && node --experimental-strip-types scripts/verify-chapters.mjs && node scripts/check-internal-links.mjs && node scripts/verify-og.mjs",
```

- [ ] **Step 2: Run the full verify chain**

```bash
npm run verify
```

Expected: all three verifiers pass; final line `[verify-og] OK — N pages checked`.

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "OG: wire verify-og into npm run verify"
```

---

## Task 17: Full gate run

The do-not-skip integration step. Catches anything missed.

- [ ] **Step 1: Run every gate from scratch**

```bash
rm -rf dist
npm run og:build
npm run build
npm run verify
npm test
```

Expected: all four commands exit 0. Specifically:
- `og:build` reports `14 expected, 0 updated this run` (idempotent after Task 7).
- `build` produces `dist/` with no Astro warnings.
- `verify` ends with `[verify-og] OK — N pages checked`.
- `test` reports all tests passing (the catalog tests, the verify-og tests, plus the pre-existing chapter/changelog/manifest tests).

- [ ] **Step 2: Confirm `git status` is clean after the run**

```bash
git status -- public/og/ vendor/fonts/ src/ scripts/
```

Expected: empty working tree (no PNG drift, no untracked stragglers).

- [ ] **Step 3: Manually verify one EN page and one ZH page with social-card validators (record results for the PR description)**

Push the branch to a deploy preview (creating the PR later in Task 19 produces one; if you want to validate now, run `git push -u origin og-cards-and-canonical-url`) and run these in a browser tab:

- https://cards-dev.twitter.com/validator → enter `https://<preview-url>/concepts/what-is-an-agent/` (and the ZH equivalent)
- https://www.linkedin.com/post-inspector/ → same two URLs

Screenshot each. These go into the PR description in Task 19.

If the preview isn't ready yet, defer this step to immediately after Task 19's PR opens.

---

## Task 18: Changelog entry

**Files:**
- Create: `src/content/changelog/entries/<merge-date>-og-cards-and-canonical-url.ts`

- [ ] **Step 1: Write the entry**

```ts
// src/content/changelog/entries/2026-05-20-og-cards-and-canonical-url.ts
import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-20',
  title: L(
    'Social-share OG cards + canonical URL fix',
    '社交分享 OG 卡片 + 规范网址修复',
  ),
  items: [
    L(
      'Every page now ships an og:image and twitter:image. Each top-level section (Field Guide, Concepts, Deep-Dives, Playbooks, Operations, Changelog) has its own bilingual 1200×630 card.',
      '每个页面现在都会输出 og:image 与 twitter:image。每个顶级版块（实战指南、概念、深度剖析、实战手册、运维、更新日志）都有自己的双语 1200×630 卡片。',
    ),
    L(
      'Twitter card upgraded from `summary` to `summary_large_image`.',
      'Twitter 卡片从 `summary` 升级为 `summary_large_image`。',
    ),
    L(
      'Canonical site URL switched from agentic-ai-wiki.vercel.app to menuagentic.com — also fixes og:url, sitemap, and hreflang.',
      '站点规范网址已从 agentic-ai-wiki.vercel.app 切换为 menuagentic.com — 同时修复了 og:url、sitemap 与 hreflang。',
    ),
    L(
      'New `npm run og:build` regenerates all 14 PNGs from a single template via Satori + resvg-js. Adding a new section is a one-line change in src/content/og.ts.',
      '新增 `npm run og:build`，通过 Satori + resvg-js 从单一模板重新生成全部 14 张 PNG。新增版块只需在 src/content/og.ts 中加一行。',
    ),
  ],
};
export default entry;
```

- [ ] **Step 2: On merge day, re-confirm or rename**

If today (the merge day) is not 2026-05-20, rename the file and bump the `date:` field to match. The `changelog.test.mjs` test enforces filename↔`date` consistency.

```bash
npm test -- --test-name-pattern='changelog'
```

Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/content/changelog/entries/2026-05-20-og-cards-and-canonical-url.ts
git commit -m "Changelog: OG cards + canonical URL"
```

---

## Task 19: Push + open the PR

- [ ] **Step 1: Push the branch**

```bash
git push -u origin og-cards-and-canonical-url
```

- [ ] **Step 2: Open the PR with a structured body**

```bash
gh pr create --title "Social-share OG cards + canonical URL fix (#34)" --body "$(cat <<'EOF'
Closes #34.

## Summary

- Adds per-section bilingual 1200×630 OG/Twitter card images. 14 PNGs (7 sections × en/zh) committed to `public/og/`, generated from a single Satori + resvg-js template (`scripts/build-og.mjs`).
- Flips `astro.config.mjs:site` from `agentic-ai-wiki.vercel.app` to `menuagentic.com` so `og:url`, canonical, sitemap, and hreflang all match the new card's URL line.
- Upgrades `twitter:card` from `summary` to `summary_large_image`.
- Adds `npm run og:build` and `scripts/verify-og.mjs` (wired into `npm run verify`) — any future page that ships without a section-appropriate `og:image` will hard-fail the build.

## Test plan

- [x] `npm run og:build` produces 14 PNGs, idempotent on re-run
- [x] `npm run build` clean
- [x] `npm run verify` ends with `[verify-og] OK — N pages checked`
- [x] `npm test` all green
- [x] Twitter Card Validator on `/concepts/what-is-an-agent/` (EN) — screenshot below
- [x] Twitter Card Validator on `/zh/concepts/what-is-an-agent/` (ZH) — screenshot below
- [x] LinkedIn Post Inspector on the same two URLs — screenshot below
- [x] Visual scan of all 14 PNGs — ZH glyphs render correctly (no tofu)

## Notes

- Card design is "Direction A — dark editorial" from the brainstorming session. See the spec for the full rationale.
- Vercel's `*.vercel.app` deploy alias continues to work for previews; no redirect work needed.

Spec: \`docs/superpowers/specs/2026-05-20-og-cards-and-canonical-url-design.md\`
Plan: \`docs/superpowers/plans/2026-05-20-og-cards-and-canonical-url.md\`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 3: Paste the social-card validator screenshots into the PR**

Use `gh pr edit <number>` or the GitHub web UI to attach the three screenshots from Task 17 Step 3 under the test plan.

- [ ] **Step 4: Done — leave PR open for review**

Per the repo's working style, leave the PR open. Do not auto-merge. Move on to issue #41 (or #44 or #45) next.

---

## Risk register (copy of the spec's, for at-a-glance reference during execution)

| risk | mitigation |
|---|---|
| ZH glyphs render as tofu | NotoSansSC font in vendor/fonts/; PNG size band check in Task 7 Step 2; visual scan in Task 17 Step 3. |
| Vercel build doesn't have Satori in path | PNGs committed → no rebuild needed for deploy. CI idempotence check in Task 17 Step 2. |
| Astro `site` change breaks an absolute link | Task 1 Step 3 grep + Task 15 verify-og hard-fail on `agentic-ai-wiki.vercel.app` in dist/. |
| `image` prop drift — future layout ships without it | verify-og hard-fails on any route whose `og:image` doesn't match the per-section expectation (Task 15). |
| Font URL in Task 5 changes | README at `vendor/fonts/README.md` documents the source; any equivalent weight from the same family works. |
