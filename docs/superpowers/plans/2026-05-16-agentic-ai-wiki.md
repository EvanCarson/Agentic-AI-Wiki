# Agentic AI Wiki Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-file `legacy/agentic_ai_guide_1.html` into a static Astro knowledge platform ("Agentic AI Wiki") where each Field Guide chapter is its own URL, with a homepage and Vercel deploy.

**Architecture:** Astro static site. The legacy global `<style>` is extracted once into a global stylesheet so migrated chapter HTML renders pixel-identically. Each `<div class="page" data-page="X">` block is extracted verbatim into `src/content/field-guide/<slug>.html` and imported raw. A hand-written manifest defines part/chapter order and slugs and drives routing, the table of contents, and prev/next navigation. Standalone posts use a real MDX content collection for future authoring.

**Tech Stack:** Astro, `@astrojs/mdx`, `@astrojs/sitemap`, `node-html-parser` (extraction script only, devDependency), npm, Node 24, Vercel (static).

**Note on counts:** The legacy file has 22 `data-page` blocks: 1 `intro` + 21 chapters (Foundations 4, Build 4, Ship 4, Evaluate 4, Specialize 4, Frontier 1). The spec's "22 chapters" meant the 22 blocks; this plan treats it precisely as **21 chapters + 1 intro**. The `intro` block's `.hero` is reused on `/field-guide`; its in-page TOC is replaced by our `SeriesTOC`.

---

## File Structure

```
astro.config.mjs                     # Astro config: site, mdx, sitemap
package.json                         # deps + scripts
tsconfig.json                        # Astro strict TS base
src/
  styles/
    guide.css                        # extracted verbatim from legacy <style>
    site.css                         # NEW: global header/footer/homepage chrome
  content/
    config.ts                        # Astro collections: `posts` (MDX) only
    field-guide/
      manifest.ts                    # ordered parts -> chapters {slug,title,...}
      <slug>.html                    # 22 extracted bodies (21 chapters + intro)
    posts/                           # empty (future MDX posts)
  components/
    SiteHeader.astro
    SiteFooter.astro
    SeriesTOC.astro
  layouts/
    BaseLayout.astro                 # <head>, fonts, css, OG/meta, header/footer
    ChapterLayout.astro              # breadcrumb + in-part subnav + prev/next
    PostLayout.astro
  pages/
    index.astro                      # homepage (Direction A + featured block)
    about.astro
    field-guide/
      index.astro                    # series landing: intro hero + SeriesTOC
      [slug].astro                   # 21 chapter pages
    posts/
      [...slug].astro                # standalone posts (future)
scripts/
  extract-chapters.mjs               # one-time, reproducible extraction
  verify-chapters.mjs                # build gate: assert all chapters present
  __tests__/extract-chapters.test.mjs
legacy/agentic_ai_guide_1.html       # source (already committed)
```

---

## Task 1: Scaffold Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/env.d.ts`, `.nvmrc`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "agentic-ai-wiki",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "extract": "node scripts/extract-chapters.mjs",
    "verify": "node scripts/verify-chapters.mjs",
    "test": "node --test scripts/__tests__/"
  },
  "dependencies": {
    "astro": "^4.16.0",
    "@astrojs/mdx": "^3.1.0",
    "@astrojs/sitemap": "^3.2.0"
  },
  "devDependencies": {
    "node-html-parser": "^6.1.13"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://agentic-ai-wiki.vercel.app',
  output: 'static',
  integrations: [mdx(), sitemap()],
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{ "extends": "astro/tsconfigs/strict", "include": [".astro", "src"] }
```

- [ ] **Step 4: Create `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

- [ ] **Step 5: Create `.nvmrc`**

```
24
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`
Expected: completes, `node_modules/` created, no peer-dep errors that abort install.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/env.d.ts .nvmrc
git commit -m "chore: scaffold Astro project"
```

---

## Task 2: Extract the legacy global stylesheet

**Files:**
- Create: `src/styles/guide.css`

- [ ] **Step 1: Extract the `<style>` block from the legacy file**

Run:
```bash
mkdir -p src/styles
node -e "const fs=require('fs');const h=fs.readFileSync('legacy/agentic_ai_guide_1.html','utf8');const m=h.match(/<style>([\s\S]*?)<\/style>/);if(!m){console.error('no style block');process.exit(1)}fs.writeFileSync('src/styles/guide.css',m[1].trim()+'\n');console.log('wrote',m[1].length,'chars')"
```
Expected: prints `wrote <N> chars` where N > 5000.

- [ ] **Step 2: Verify the design tokens survived**

Run: `grep -c -- '--accent' src/styles/guide.css`
Expected: a number `>= 1` (the `:root` custom properties are present).

- [ ] **Step 3: Commit**

```bash
git add src/styles/guide.css
git commit -m "feat: extract legacy global stylesheet as guide.css"
```

---

## Task 3: Chapter manifest

**Files:**
- Create: `src/content/field-guide/manifest.ts`

- [ ] **Step 1: Create the manifest**

```ts
// Ordered structure for the Agentic AI Field Guide series.
// `page` is the legacy data-page id; `slug` is the public URL segment.
export interface Chapter {
  page: string;   // legacy data-page id, e.g. "f1"
  slug: string;   // URL slug, e.g. "llm-mental-model"
  num: string;    // chapter number within part, e.g. "01"
  title: string;
}
export interface Part {
  key: string;    // legacy part key
  roman: string;  // "0", "I", ...
  name: string;
  chapters: Chapter[];
}

export const PARTS: Part[] = [
  { key: 'f', roman: '0', name: 'Foundations', chapters: [
    { page: 'f1', slug: 'llm-mental-model', num: '01', title: 'LLM Mental Model' },
    { page: 'f2', slug: 'prompts',          num: '02', title: 'Prompts' },
    { page: 'f3', slug: 'tool-use',         num: '03', title: 'Tool Use' },
    { page: 'f4', slug: 'async-python',     num: '04', title: 'Async Python' },
  ]},
  { key: 'b', roman: 'I', name: 'Build', chapters: [
    { page: 'p1', slug: 'the-loop',         num: '01', title: 'The Loop' },
    { page: 'p2', slug: 'retrieval',        num: '02', title: 'Retrieval' },
    { page: 'p3', slug: 'real-loop',        num: '03', title: 'Real Loop' },
    { page: 'p4', slug: 'first-eval-suite', num: '04', title: 'First Eval Suite' },
  ]},
  { key: 's', roman: 'II', name: 'Ship', chapters: [
    { page: 's1', slug: 'observability',    num: '01', title: 'Observability' },
    { page: 's2', slug: 'cost-and-latency', num: '02', title: 'Cost & Latency' },
    { page: 's3', slug: 'safety',           num: '03', title: 'Safety' },
    { page: 's4', slug: 'deployment',       num: '04', title: 'Deployment' },
  ]},
  { key: 'e', roman: 'III', name: 'Evaluate', chapters: [
    { page: 'e1', slug: 'eval-driven-dev',  num: '01', title: 'Eval-Driven Dev' },
    { page: 'e2', slug: 'three-layers',     num: '02', title: 'Three Layers' },
    { page: 'e3', slug: 'llm-as-judge',     num: '03', title: 'LLM-as-Judge' },
    { page: 'e4', slug: 'benchmarks-and-ci',num: '04', title: 'Benchmarks & CI' },
  ]},
  { key: 'x', roman: 'IV', name: 'Specialize', chapters: [
    { page: 'x1', slug: 'code-agents',      num: '01', title: 'Code Agents' },
    { page: 'x2', slug: 'computer-use',     num: '02', title: 'Computer Use' },
    { page: 'x3', slug: 'research',         num: '03', title: 'Research' },
    { page: 'x4', slug: 'multi-agent',      num: '04', title: 'Multi-Agent' },
  ]},
  { key: 'r', roman: 'V', name: 'Frontier', chapters: [
    { page: 'r1', slug: 'what-to-read',     num: '01', title: 'What to Read' },
  ]},
];

// Flat, ordered list of all chapters (drives prev/next + routing).
export const CHAPTERS = PARTS.flatMap(p =>
  p.chapters.map(c => ({ ...c, partKey: p.key, partName: p.name, partRoman: p.roman }))
);

export type FlatChapter = (typeof CHAPTERS)[number];

export function chapterBySlug(slug: string): FlatChapter | undefined {
  return CHAPTERS.find(c => c.slug === slug);
}
```

- [ ] **Step 2: Type-check the manifest compiles**

Run: `npx tsc --noEmit --strict src/content/field-guide/manifest.ts`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add src/content/field-guide/manifest.ts
git commit -m "feat: add field-guide chapter manifest"
```

---

## Task 4: Chapter extraction script (TDD)

**Files:**
- Create: `scripts/extract-chapters.mjs`, `scripts/__tests__/extract-chapters.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// scripts/__tests__/extract-chapters.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractPages } from '../extract-chapters.mjs';

const SAMPLE = `<!DOCTYPE html><html><body>
<div class="page active" data-page="intro"><h1>Intro Body</h1></div>
<div class="page" data-page="f1"><section><h2>LLM</h2></section></div>
<div class="page" data-page="r1"><p>Frontier</p></div>
<script>const x=1;</script>
</body></html>`;

test('extracts one entry per data-page block', () => {
  const pages = extractPages(SAMPLE);
  assert.equal(pages.length, 3);
});

test('keys by data-page id and preserves inner HTML verbatim', () => {
  const pages = extractPages(SAMPLE);
  const f1 = pages.find(p => p.page === 'f1');
  assert.ok(f1);
  assert.equal(f1.html.trim(), '<section><h2>LLM</h2></section>');
});

test('does not include the trailing script block as a page', () => {
  const pages = extractPages(SAMPLE);
  assert.ok(!pages.some(p => p.html.includes('const x=1')));
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '../extract-chapters.mjs'` (or `extractPages is not a function`).

- [ ] **Step 3: Write `scripts/extract-chapters.mjs`**

```js
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Parse HTML, return [{ page, html }] for every <div class="page" data-page>. */
export function extractPages(htmlString) {
  const root = parse(htmlString, { comment: false });
  const nodes = root.querySelectorAll('div.page[data-page]');
  return nodes.map(n => ({
    page: n.getAttribute('data-page'),
    html: n.innerHTML,
  }));
}

// CLI: write each page body to src/content/field-guide/<page>.html
function main() {
  const src = readFileSync(join(ROOT, 'legacy/agentic_ai_guide_1.html'), 'utf8');
  const pages = extractPages(src);
  const outDir = join(ROOT, 'src/content/field-guide');
  mkdirSync(outDir, { recursive: true });
  for (const { page, html } of pages) {
    writeFileSync(join(outDir, `${page}.html`), html.trim() + '\n');
  }
  console.log(`extracted ${pages.length} pages:`, pages.map(p => p.page).join(', '));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/extract-chapters.mjs scripts/__tests__/extract-chapters.test.mjs
git commit -m "feat: add tested chapter extraction script"
```

---

## Task 5: Run extraction & commit chapter bodies

**Files:**
- Create: `src/content/field-guide/intro.html` + 21 chapter `.html` files

- [ ] **Step 1: Run the extraction**

Run: `npm run extract`
Expected: `extracted 22 pages: intro, f1, f2, f3, f4, p1, p2, p3, p4, s1, s2, s3, s4, e1, e2, e3, e4, x1, x2, x3, x4, r1`

- [ ] **Step 2: Verify 22 files exist and are non-empty**

Run: `ls src/content/field-guide/*.html | wc -l && find src/content/field-guide -name '*.html' -empty`
Expected: prints `22` and no empty-file paths.

- [ ] **Step 3: Spot-check one chapter and the code-tabs chapter retained markup**

Run: `grep -l 'code-tabs' src/content/field-guide/*.html && grep -c 'phase-num' src/content/field-guide/f1.html`
Expected: at least `f3.html` (and others) listed; `f1.html` count `>= 1`.

- [ ] **Step 4: Commit the extracted bodies**

```bash
git add src/content/field-guide/*.html
git commit -m "feat: extract 22 verbatim field-guide bodies (21 chapters + intro)"
```

---

## Task 6: Content collections config (posts only)

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 1: Create the collections config**

```ts
import { defineCollection, z } from 'astro:content';

// Only `posts` is a managed collection. Field-guide bodies are raw HTML
// imported by glob and driven by manifest.ts (not a content collection).
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
```

- [ ] **Step 2: Generate Astro types and type-check**

Run: `npx astro sync && npx astro check`
Expected: `astro sync` writes `.astro/types.d.ts`; `astro check` reports `0 errors` (warnings are acceptable).

- [ ] **Step 3: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: add posts content collection"
```

---

## Task 7: BaseLayout + site chrome stylesheet

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/styles/site.css`

- [ ] **Step 1: Create `src/styles/site.css`** (new chrome only — reuses guide.css tokens)

```css
/* Global chrome for the wiki. Reuses the :root tokens from guide.css. */
.site-header {
  position: sticky; top: 0; z-index: 200;
  display: flex; align-items: stretch; height: var(--nav-h);
  background: var(--paper); border-bottom: 2px solid var(--ink);
}
.site-header .brand {
  display: flex; align-items: center; gap: 8px; padding: 0 16px;
  font-family: 'JetBrains Mono', monospace; font-size: 11px;
  letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600;
  color: var(--ink); text-decoration: none; border-right: 1px solid var(--ink);
}
.site-header .brand .dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; }
.site-header nav { display: flex; }
.site-header nav a {
  display: flex; align-items: center; padding: 0 14px;
  font-family: 'JetBrains Mono', monospace; font-size: 10px;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted);
  text-decoration: none; border-right: 1px solid rgba(0,0,0,0.15);
}
.site-header nav a:hover, .site-header nav a[aria-current="page"] {
  color: var(--ink); background: var(--paper-2);
}
.site-footer {
  border-top: 2px solid var(--ink); margin-top: 64px; padding: 28px 20px;
  font-family: 'JetBrains Mono', monospace; font-size: 11px;
  letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted);
}
.wrap { max-width: 860px; margin: 0 auto; }
.chapter-nav {
  display: flex; justify-content: space-between; gap: 16px;
  border-top: 1px solid var(--ink); margin-top: 48px; padding-top: 20px;
}
.chapter-nav a {
  font-family: 'Fraunces', serif; color: var(--accent); text-decoration: none;
}
.breadcrumb {
  font-family: 'JetBrains Mono', monospace; font-size: 11px;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted);
  padding: 16px 20px 0;
}
.breadcrumb a { color: var(--muted); text-decoration: none; }
.breadcrumb a:hover { color: var(--accent); }
```

- [ ] **Step 2: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/guide.css';
import '../styles/site.css';
import SiteHeader from '../components/SiteHeader.astro';
import SiteFooter from '../components/SiteFooter.astro';
export interface Props { title: string; description?: string; }
const { title, description = 'A living knowledge base on building agentic AI.' } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site).toString();
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
</head>
<body>
  <SiteHeader />
  <main>
    <slot />
  </main>
  <SiteFooter />
</body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/site.css src/layouts/BaseLayout.astro
git commit -m "feat: add BaseLayout and site chrome styles"
```

---

## Task 8: SiteHeader and SiteFooter

**Files:**
- Create: `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`

- [ ] **Step 1: Create `src/components/SiteHeader.astro`**

```astro
---
const path = Astro.url.pathname;
const links = [
  { href: '/field-guide', label: 'Field Guide' },
  { href: '/posts', label: 'Posts' },
  { href: '/about', label: 'About' },
];
const isActive = (href: string) => path === href || path.startsWith(href + '/');
---
<header class="site-header">
  <a class="brand" href="/"><span class="dot"></span>Agentic AI Wiki</a>
  <nav>
    {links.map(l => (
      <a href={l.href} aria-current={isActive(l.href) ? 'page' : undefined}>{l.label}</a>
    ))}
  </nav>
</header>
```

- [ ] **Step 2: Create `src/components/SiteFooter.astro`**

```astro
---
const year = new Date().getFullYear();
---
<footer class="site-footer">
  <div class="wrap">Agentic AI Wiki — knowledge, written to last. © {year}</div>
</footer>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/SiteHeader.astro src/components/SiteFooter.astro
git commit -m "feat: add SiteHeader and SiteFooter"
```

---

## Task 9: SeriesTOC component

**Files:**
- Create: `src/components/SeriesTOC.astro`

- [ ] **Step 1: Create `src/components/SeriesTOC.astro`**

```astro
---
import { PARTS } from '../content/field-guide/manifest';
---
<nav class="toc">
  <h2>The whole path</h2>
  {PARTS.map(part => (
    <div class="toc-part">
      <div class="toc-part-label">
        <span class="roman">{part.roman}</span>
        <span class="name">{part.name}</span>
        <span class="meta">{part.chapters.length} chapter{part.chapters.length > 1 ? 's' : ''}</span>
      </div>
      <ul class="toc-list" style="list-style:none;padding:0;margin:0;">
        {part.chapters.map(ch => (
          <li style="padding:6px 0;border-bottom:1px solid rgba(0,0,0,0.15);">
            <a href={`/field-guide/${ch.slug}`} style="text-decoration:none;color:var(--ink);display:flex;gap:12px;">
              <span class="roman" style="font-style:italic;color:var(--accent);">{ch.num}</span>
              <span style="font-family:'Fraunces',serif;">{ch.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  ))}
</nav>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SeriesTOC.astro
git commit -m "feat: add SeriesTOC component"
```

---

## Task 10: ChapterLayout + code-tab script

**Files:**
- Create: `src/layouts/ChapterLayout.astro`

- [ ] **Step 1: Create `src/layouts/ChapterLayout.astro`**

The inline `<script>` replicates the legacy `switchTab` so preserved
`code-tabs`/`code-content` markup keeps working with zero rewrite.

```astro
---
import BaseLayout from './BaseLayout.astro';
import { CHAPTERS } from '../content/field-guide/manifest';
export interface Props { slug: string; }
const { slug } = Astro.props;
const idx = CHAPTERS.findIndex(c => c.slug === slug);
const ch = CHAPTERS[idx];
if (!ch) throw new Error(`Unknown chapter slug: ${slug}`);
const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;
const bodies = import.meta.glob('../content/field-guide/*.html', { query: '?raw', import: 'default', eager: true });
const body = bodies[`../content/field-guide/${ch.page}.html`] as string;
const title = `${ch.title} — The Agentic AI Field Guide`;
---
<BaseLayout title={title} description={`${ch.partName}: ${ch.title}. Part of the Agentic AI Field Guide.`}>
  <div class="breadcrumb wrap">
    <a href="/field-guide">Field Guide</a> / {ch.partRoman} {ch.partName} / {ch.title}
  </div>
  <article class="wrap" set:html={body} />
  <nav class="chapter-nav wrap">
    {prev ? <a href={`/field-guide/${prev.slug}`}>← {prev.title}</a> : <span></span>}
    {next ? <a href={`/field-guide/${next.slug}`}>{next.title} →</a> : <span></span>}
  </nav>
  <script is:inline>
    function switchTab(button) {
      const targetApi = button.dataset.api;
      document.querySelectorAll('.code-tabs').forEach(group => {
        const matching = group.querySelector('[data-api="' + targetApi + '"]');
        if (matching) {
          group.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
          matching.classList.add('active');
          let n = group.nextElementSibling;
          while (n && n.classList.contains('code-content')) {
            n.classList.toggle('active', n.dataset.api === targetApi);
            n = n.nextElementSibling;
          }
        }
      });
    }
    window.switchTab = switchTab;
  </script>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/ChapterLayout.astro
git commit -m "feat: add ChapterLayout with preserved code-tab behavior"
```

---

## Task 11: Chapter route

**Files:**
- Create: `src/pages/field-guide/[slug].astro`

- [ ] **Step 1: Create `src/pages/field-guide/[slug].astro`**

```astro
---
import ChapterLayout from '../../layouts/ChapterLayout.astro';
import { CHAPTERS } from '../../content/field-guide/manifest';
export function getStaticPaths() {
  return CHAPTERS.map(c => ({ params: { slug: c.slug } }));
}
const { slug } = Astro.params;
---
<ChapterLayout slug={slug as string} />
```

- [ ] **Step 2: Build and confirm 21 chapter pages render**

Run: `npm run build`
Expected: build succeeds; `find dist/field-guide -name index.html | wc -l` (next step) will confirm count.

- [ ] **Step 3: Verify generated chapter pages**

Run: `ls dist/field-guide/ && test -f dist/field-guide/llm-mental-model/index.html && echo OK`
Expected: 21 slug directories listed; prints `OK`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/field-guide/[slug].astro
git commit -m "feat: add field-guide chapter route"
```

---

## Task 12: Field Guide landing page

**Files:**
- Create: `src/pages/field-guide/index.astro`

- [ ] **Step 1: Create `src/pages/field-guide/index.astro`** (reuses intro `.hero`, then SeriesTOC)

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import SeriesTOC from '../../components/SeriesTOC.astro';
import { parse } from 'node-html-parser';
const bodies = import.meta.glob('../../content/field-guide/*.html', { query: '?raw', import: 'default', eager: true });
const introHtml = bodies['../../content/field-guide/intro.html'] as string;
const heroEl = parse(introHtml).querySelector('.hero');
const hero = heroEl ? heroEl.outerHTML : '';
---
<BaseLayout title="The Agentic AI Field Guide" description="A working engineer's guide to building agentic systems, end to end.">
  <div class="wrap" set:html={hero} />
  <div class="wrap"><SeriesTOC /></div>
</BaseLayout>
```

- [ ] **Step 2: Build and verify the landing page exists**

Run: `npm run build && test -f dist/field-guide/index.html && grep -q 'whole path' dist/field-guide/index.html && echo OK`
Expected: prints `OK`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/field-guide/index.astro
git commit -m "feat: add field-guide landing page"
```

---

## Task 13: Homepage (Direction A + featured block)

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SeriesTOC from '../components/SeriesTOC.astro';
import { CHAPTERS, PARTS } from '../content/field-guide/manifest';
import { getCollection } from 'astro:content';
const posts = (await getCollection('posts', p => !p.data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 3);
---
<BaseLayout title="Agentic AI Wiki" description="A living knowledge base on building agentic AI.">
  <section class="hero wrap">
    <div class="kicker">A Living Knowledge Base</div>
    <h1>Building <em>agentic</em> AI, from first principles to the frontier.</h1>
    <p class="lede">Notes and guides on building software that plans, calls tools, verifies its own work, and ships to real users.</p>
  </section>

  <section class="wrap" style="padding:0 20px 28px;">
    <a href="/field-guide" style="display:block;border:2px solid var(--ink);background:var(--paper-2);padding:20px;text-decoration:none;color:var(--ink);">
      <div class="kicker">Flagship Series</div>
      <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:26px;">The Agentic AI Field Guide</h2>
      <p style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-top:8px;">
        {PARTS.length} parts · {CHAPTERS.length} chapters · Start reading →
      </p>
    </a>
  </section>

  <div class="wrap" style="padding:0 20px;"><SeriesTOC /></div>

  {posts.length > 0 && (
    <section class="wrap" style="padding:28px 20px;">
      <h2 class="kicker">Latest</h2>
      <ul style="list-style:none;padding:0;margin:0;">
        {posts.map(p => (
          <li style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.15);">
            <a href={`/posts/${p.slug}`} style="font-family:'Fraunces',serif;color:var(--ink);text-decoration:none;">{p.data.title}</a>
          </li>
        ))}
      </ul>
    </section>
  )}
</BaseLayout>
```

- [ ] **Step 2: Build and verify the homepage**

Run: `npm run build && grep -q 'Flagship Series' dist/index.html && grep -q 'first principles to the frontier' dist/index.html && echo OK`
Expected: prints `OK`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add homepage (Direction A + featured series block)"
```

---

## Task 14: About page + posts route + PostLayout

**Files:**
- Create: `src/pages/about.astro`, `src/layouts/PostLayout.astro`, `src/pages/posts/[...slug].astro`, `src/pages/posts/index.astro`

- [ ] **Step 1: Create `src/layouts/PostLayout.astro`**

```astro
---
import BaseLayout from './BaseLayout.astro';
export interface Props { title: string; description: string; pubDate: Date; }
const { title, description, pubDate } = Astro.props;
---
<BaseLayout title={`${title} — Agentic AI Wiki`} description={description}>
  <article class="wrap" style="padding:24px 20px;">
    <div class="kicker">{pubDate.toISOString().slice(0, 10)}</div>
    <h1 style="font-family:'Fraunces',serif;font-weight:400;font-size:32px;">{title}</h1>
    <slot />
  </article>
</BaseLayout>
```

- [ ] **Step 2: Create `src/pages/posts/[...slug].astro`**

```astro
---
import { getCollection } from 'astro:content';
import PostLayout from '../../layouts/PostLayout.astro';
export async function getStaticPaths() {
  const posts = await getCollection('posts', p => !p.data.draft);
  return posts.map(post => ({ params: { slug: post.slug }, props: { post } }));
}
const { post } = Astro.props;
const { Content } = await post.render();
---
<PostLayout title={post.data.title} description={post.data.description} pubDate={post.data.pubDate}>
  <Content />
</PostLayout>
```

- [ ] **Step 3: Create `src/pages/posts/index.astro`** (graceful empty state)

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
const posts = (await getCollection('posts', p => !p.data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---
<BaseLayout title="Posts — Agentic AI Wiki" description="Standalone notes and essays on agentic AI.">
  <section class="wrap" style="padding:24px 20px;">
    <h1 style="font-family:'Fraunces',serif;font-weight:400;font-size:32px;">Posts</h1>
    {posts.length === 0
      ? <p class="lede">No standalone posts yet — start with the <a href="/field-guide" style="color:var(--accent);">Field Guide</a>.</p>
      : <ul style="list-style:none;padding:0;">{posts.map(p => (
          <li style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.15);">
            <a href={`/posts/${p.slug}`} style="font-family:'Fraunces',serif;color:var(--ink);text-decoration:none;">{p.data.title}</a>
          </li>))}</ul>}
  </section>
</BaseLayout>
```

- [ ] **Step 4: Create `src/pages/about.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="About — Agentic AI Wiki" description="About the Agentic AI Wiki.">
  <section class="wrap" style="padding:24px 20px;">
    <div class="kicker">About</div>
    <h1 style="font-family:'Fraunces',serif;font-weight:400;font-size:32px;">Agentic AI Wiki</h1>
    <p class="lede">A living knowledge base on building agentic AI. The flagship
      <a href="/field-guide" style="color:var(--accent);">Agentic AI Field Guide</a>
      walks from first principles to the frontier; standalone posts go deeper as the field moves.</p>
  </section>
</BaseLayout>
```

- [ ] **Step 5: Build and verify routes**

Run: `npm run build && test -f dist/about/index.html && test -f dist/posts/index.html && grep -q 'No standalone posts yet' dist/posts/index.html && echo OK`
Expected: prints `OK` (posts index renders the empty state; no `posts/<slug>` dirs since collection is empty).

- [ ] **Step 6: Commit**

```bash
git add src/pages/about.astro src/layouts/PostLayout.astro src/pages/posts/
git commit -m "feat: add about page, posts route, and PostLayout"
```

---

## Task 15: Chapter verification gate

**Files:**
- Create: `scripts/verify-chapters.mjs`

- [ ] **Step 1: Create `scripts/verify-chapters.mjs`**

```js
import { existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHAPTERS } from '../src/content/field-guide/manifest.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
let failed = 0;

for (const ch of CHAPTERS) {
  const body = join(ROOT, 'src/content/field-guide', `${ch.page}.html`);
  const page = join(ROOT, 'dist/field-guide', ch.slug, 'index.html');
  if (!existsSync(body) || statSync(body).size === 0) { console.error(`MISSING body: ${ch.page}.html`); failed++; }
  if (!existsSync(page) || statSync(page).size === 0) { console.error(`MISSING built page: /field-guide/${ch.slug}`); failed++; }
}
if (existsSync(join(ROOT, 'src/content/field-guide/intro.html')) === false) { console.error('MISSING intro.html'); failed++; }

if (failed) { console.error(`\n${failed} check(s) failed`); process.exit(1); }
console.log(`OK — all ${CHAPTERS.length} chapters present + built, intro present`);
```

- [ ] **Step 2: Run the gate against the existing build**

Run: `npm run build && node --experimental-strip-types scripts/verify-chapters.mjs`
Expected: `OK — all 21 chapters present + built, intro present`

- [ ] **Step 3: Wire `verify` script to include build typing flag**

Edit `package.json` `scripts.verify` to:
```json
"verify": "node --experimental-strip-types scripts/verify-chapters.mjs"
```

- [ ] **Step 4: Commit**

```bash
git add scripts/verify-chapters.mjs package.json
git commit -m "feat: add chapter verification gate"
```

---

## Task 16: Full verification + Vercel deploy

**Files:**
- Create: `vercel.json`, `README.md`

- [ ] **Step 1: Create `vercel.json`**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "astro",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

- [ ] **Step 2: Create `README.md`**

```markdown
# Agentic AI Wiki

A static Astro knowledge platform. Flagship series: The Agentic AI Field Guide.

## Develop
- `npm install`
- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run verify` — assert all chapters present and built
- `npm test` — extraction unit tests

## Content
- Field Guide chapters: `src/content/field-guide/*.html` (extracted verbatim
  from `legacy/`); order/slugs in `src/content/field-guide/manifest.ts`.
- Standalone posts: MDX in `src/content/posts/`.

## Deploy
Auto-deploys on push via Vercel (framework: Astro, output: `dist/`).
```

- [ ] **Step 3: Full local gate**

Run: `npm run test && npm run build && npm run verify`
Expected: tests pass; build succeeds; `OK — all 21 chapters present + built, intro present`.

- [ ] **Step 4: Local visual smoke (manual checkpoint)**

Run: `npm run preview` then open `http://localhost:4321/`, `/field-guide`, `/field-guide/tool-use` (has code-tabs), `/posts`, `/about`.
Expected: design matches the legacy look; code-tab buttons switch Anthropic/OpenAI; prev/next links work; header nav highlights current section. Stop the server after checking.

- [ ] **Step 5: Commit**

```bash
git add vercel.json README.md
git commit -m "chore: add Vercel config and README"
```

- [ ] **Step 6: Deploy to Vercel**

Run: `npx vercel --prod --yes` (first run prompts for login/link if not authenticated — if non-interactive, instruct the user to run `! npx vercel login` then re-run).
Expected: a production URL is printed; opening it shows the homepage; `<url>/field-guide/tool-use` loads with working code-tabs.

- [ ] **Step 7: Record the production URL**

Update `astro.config.mjs` `site:` to the real Vercel production URL (for correct canonical/sitemap), rebuild, redeploy.

```bash
git add astro.config.mjs
git commit -m "chore: set canonical site URL to production"
npx vercel --prod --yes
```

---

## Self-Review

**Spec coverage:**
- Astro static + Vercel → Tasks 1, 16. ✓
- Two collections (field-guide raw HTML + posts MDX) → Tasks 3–6, 14. ✓ (Design refinement: field-guide is glob-imported raw HTML driven by manifest, not an Astro collection — documented in Task 6; posts is the managed MDX collection.)
- 21 chapters + intro, verbatim HTML → Tasks 4, 5, 11, 12. ✓ (Spec said "22 chapters"; corrected to 21 + intro in header note.)
- Routes `/`, `/field-guide`, `/field-guide/<slug>`, `/posts/<slug>`, `/about` → Tasks 11–14. ✓ (`/posts` index added for graceful empty state per spec.)
- Components (Base/Header/Footer/ChapterLayout/SeriesTOC/PostLayout) → Tasks 7–10, 14. ✓
- Code-tab switcher preserved via classes + one script → Task 10. ✓
- Homepage Direction A + featured block → Task 13. ✓
- Design tokens preserved verbatim → Task 2 (guide.css). ✓
- SEO: per-page title/meta, OG, sitemap → Tasks 1 (sitemap integration), 7 (BaseLayout meta/OG). ✓
- Migration script committed + source in `legacy/` → Tasks 4, 5; source already committed. ✓
- Acceptance: build + 21-chapter check + visual smoke + deploy → Tasks 15, 16. ✓

**Placeholder scan:** No TBD/TODO; every code step shows full code; commands have expected output. ✓

**Type consistency:** `extractPages` (Task 4) returns `{page, html}` — consumed identically in Task 5 CLI and verify (Task 15). `CHAPTERS`/`PARTS`/`FlatChapter`/`chapterBySlug` defined in Task 3, used consistently in Tasks 10, 11, 13, 15. Glob key `../content/field-guide/${page}.html` consistent between Task 10 and Task 12 (path depth differs correctly: `../` vs `../../` per file location). ✓

No gaps found.
