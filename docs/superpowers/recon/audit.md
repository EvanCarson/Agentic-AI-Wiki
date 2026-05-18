# Recon Audit — Current Site (R1)

Date: 2026-05-18
Branch: `feat/wiki-content-enrichment` (worktree `.worktrees/wiki-enrichment`)
Repo: EvanCarson/Agentic-AI-Wiki — Astro 4 static site, bilingual en/zh, Vercel auto-deploy.

This audit is the binding reference for all later phases (Scaffold A1, Content
C1–C8, Integrate I1, QA Q1–Q4). New content MUST match the conventions below.

---

## 1. Information Architecture (current)

Single section site. Routes (Astro `output: 'static'`, `i18n.prefixDefaultLocale: false`):

| URL (en) | URL (zh) | Source |
|---|---|---|
| `/` | `/zh/` | `src/pages/index.astro` → `HomeView.astro` |
| `/field-guide` | `/zh/field-guide` | `src/pages/field-guide/index.astro` → `FieldGuideView.astro` |
| `/field-guide/<slug>` | `/zh/field-guide/<slug>` | `src/pages/field-guide/[slug].astro` → `ChapterLayout.astro` |
| `/posts` | `/zh/posts` | `src/pages/posts/index.astro` → `PostsView.astro` (currently empty) |
| `/posts/<slug>` | `/zh/posts/<slug>` | `src/pages/posts/[...slug].astro` → `PostLayout.astro` |
| `/about` | `/zh/about` | `src/pages/about.astro` → `AboutView.astro` |

- en pages live at `src/pages/...`; zh mirrors live at `src/pages/zh/...` and are
  thin wrappers that render the SAME view component with `locale="zh"`.
- The Field Guide is 22 chapters across 6 parts (Foundations/Build/Ship/Evaluate/
  Specialize/Frontier), structured entirely in `src/content/field-guide/manifest.ts`.
- There is NO `/concepts` or `/deep-dives` yet. Adding them is Phase 1's job.

## 2. Content file format & collection conventions

There are TWO distinct content models in this repo. Know which you are using.

### a) Field Guide model — raw HTML + manifest (NOT a content collection)
- Bodies are plain `.html` fragments (no frontmatter) at
  `src/content/field-guide/{en,zh}/<page>.html` (e.g. `f1.html`, `p1.html`).
  Same base filename in both `en/` and `zh/` dirs = the bilingual pair.
- They are NOT an Astro content collection. They are loaded with
  `import.meta.glob('../content/field-guide/*/*.html', { query: '?raw', import: 'default', eager: true })`
  and injected via `<article set:html={body} />`.
- Order, slugs, numbering, and **localized titles** live in
  `src/content/field-guide/manifest.ts`, NOT in the HTML.
- HTML body structure (see `en/f1.html`): top-level `<section class="phase">`
  with `.phase-num`, `.week`, `<h2>` title, `<p class="goal">`, then
  `<div class="step">` blocks (`.step-num`, `<h3>`, `<h4>`, `<p>`). Code uses
  `<pre class="standalone">` / `<pre class="trace standalone">` with manual
  syntax spans (`.c-kw`, `.c-st`, `.c-cm`, `.c-out`, `code.inline`). Styling is
  in `src/styles/guide.css`. The `intro.html` file additionally contains a
  `<section class="hero">` and `<nav class="toc">` consumed by `FieldGuideView`.

### b) Posts model — MDX content collection
- `src/content/config.ts` defines ONE collection, `posts` (`type: 'content'`),
  schema: `title` (string), `description` (string), `pubDate` (coerced date),
  `draft` (bool, default false). Files are MDX in `src/content/posts/`
  (directory currently empty). Rendered via `getCollection('posts')`.
- This collection schema is single-language (plain `title` string), so it does
  NOT currently model the bilingual `Localized` pattern.

### Implication for the new sections (per design spec)
The design spec says new content lives at `src/content/concepts/{en,zh}/` and
`src/content/deep-dives/{en,zh}/`, "MDX or HTML consistent with existing", with
`config.ts` collections (`title` Localized, summary, order, tags, updated date)
and `field-guide/manifest.ts`-style ordered manifest files.
**Decision is Phase 1 (A1)'s, not content agents'.** The lowest-risk, most
consistent path = mirror the Field Guide model: per-locale HTML fragments +
a `manifest.ts` per section holding `Localized` titles/slugs/order. Content
agents (C1–C8) should assume:
- they write `src/content/<section>/{en,zh}/<page>.html` fragment pairs only;
- they do NOT edit `config.ts`, route pages, nav, i18n, or the section manifest
  (those are sequential-phase, shared-file edits — conflict-avoidance contract);
- they reuse the existing `guide.css` class vocabulary (`.phase`, `.step`,
  `<pre class="standalone">`, `code.inline`, etc.) so visual style matches.
A1 confirms the exact format; C-agents must follow whatever A1 lands and the
sub-issue acceptance criteria.

## 3. The `Localized` bilingual pattern (MUST follow)

Defined in `src/i18n/index.ts`:
- `LOCALES = ['en','zh']`, `DEFAULT_LOCALE = 'en'`, `type Locale`.
- `type Localized<T = string> = Record<Locale, T>` — i.e. `{ en, zh }`.
- Helpers: `tr(val, locale)`, `localizeHref(href, locale)` (en = identity; zh
  prefixes `/zh`), `switchLocalePath(path, to)`, `isLocale(v)`.
- `manifest.ts` uses `const L = (en, zh): Localized => ({ en, zh })` and stores
  every title/part-name as `L('English', '中文')`. New manifests MUST do the same.
- Every page goes through `BaseLayout` which sets `<html lang>`, canonical, and
  `hreflang` (`en`, `zh-Hans`, `x-default`) automatically from `locale` +
  `switchLocalePath`. New routes get this for free if they pass `locale`.

## 4. Layout & component conventions

- `BaseLayout.astro` — root shell: imports `styles/guide.css` + `styles/site.css`,
  Google Fonts (Fraunces / JetBrains Mono / Inter), `@vercel/analytics`,
  `SiteHeader`, `SiteFooter`. Props: `{ title, description?, locale? }`.
  All pages render through it.
- Page pattern: `src/pages/<route>.astro` is a thin wrapper importing a view
  from `src/components/pages/<Name>View.astro` with `locale="en"`; the zh mirror
  at `src/pages/zh/<route>.astro` does the same with `locale="zh"`. New sections
  MUST follow this exact en-page + zh-mirror + shared-View structure.
- `ChapterLayout.astro` — sidebar + breadcrumb + `<article set:html>` + prev/next
  page-nav, computed from `manifest.ts` index. A `/concepts` or `/deep-dives`
  detail layout should mirror this (it also includes an inline `switchTab`
  script for `.code-tabs`).
- Shared components: `SiteHeader`, `SiteFooter`, `ChapterSidebar`, `SeriesTOC`.
- Styling is global CSS classes (`guide.css`, `site.css`) plus heavy inline
  styles in views; uses CSS vars `--ink`, `--accent`, `--paper-2`, `--muted`.
  Fonts: Fraunces (serif headings), JetBrains Mono (kickers/meta), Inter (body).

## 5. Navigation structure

`src/components/SiteHeader.astro`:
- `links` array, currently 3 entries: `{href:'/field-guide'}`,
  `{href:'/posts'}`, `{href:'/about'}`, each `label: t.nav.<key>`.
- Hrefs are passed through `localizeHref(href, locale)`; active state via
  `isActive` (exact match or `startsWith(h + '/')`).
- **To add nav for new sections (Phase 1 only):** add entries to this `links`
  array AND add the corresponding `t.nav.*` keys (see §6). Order/placement is
  a Phase-1 decision.
- `SeriesTOC.astro` renders the Field Guide parts/chapters table from `PARTS`;
  a parallel TOC component per new section is a reasonable Phase-1 pattern.

## 6. i18n key conventions

`src/i18n/ui.ts`:
- `interface UIStrings` typed; `export const ui: Record<Locale, UIStrings>`
  with full `en` and `zh` objects. EVERY UI string is duplicated under both.
- Nav labels live under `nav: { fieldGuide, posts, about }`. Adding a section
  requires (a) extending the `UIStrings` interface, (b) adding the key to BOTH
  `ui.en` and `ui.zh`, (c) wiring it in `SiteHeader`. All Phase-1 work.
- Per-section meta lives in grouped objects (e.g. `fg: { metaTitle, metaDesc }`,
  `posts: { metaTitle, metaDesc, h1, emptyHtml }`). New sections should add an
  analogous group (e.g. `concepts: {...}`, `deepDives: {...}`).
- HTML-bearing strings use a `*Html` suffix and `set:html`; internal links use
  `%FG%`-style placeholders replaced with `localizeHref(...)`. Follow this.
- zh locale label is `zh-Hans` for sitemap/hreflang (see `astro.config.mjs`,
  `BaseLayout`).

## 7. Build / verify / test

- `npm run build` → static output to `dist/`.
- `npm run verify` → `scripts/verify-chapters.mjs` asserts all manifest chapters
  exist and built (currently field-guide–specific; Phase 3/4 may extend).
- `npm test` → node test runner over `scripts/__tests__/*.mjs`.
- `npm run preview` serves `dist/` (Astro preview; confirm port from output).
- Node version pinned via `.nvmrc`. Deploy is Vercel auto-on-push (a Vercel bot
  may auto-open PRs — we open our own consolidated PR explicitly).

## 8. Key rules for content agents (summary)

1. Content files = per-locale HTML fragment pairs at
   `src/content/<section>/{en,zh}/<page>.html`, same basename both sides.
2. Reuse `guide.css` class vocabulary (`.phase`/`.step`/`<pre class="standalone">`/
   `code.inline`/syntax spans) so visual style matches the Field Guide.
3. NEVER edit shared files (`config.ts`, route pages, `SiteHeader`,
   `i18n/ui.ts`, `i18n/index.ts`, section manifests) — those are sequential
   Phase 1/3 only. Content agents touch only their own disjoint fragment files.
4. All titles/labels follow the `Localized = { en, zh }` pattern; localized
   data lives in manifests, not in HTML bodies.
5. Every entry must exist in BOTH `en/` and `zh/`, build clean, and be
   reachable from nav (nav wiring is Phase 1/3, but content must support it).
