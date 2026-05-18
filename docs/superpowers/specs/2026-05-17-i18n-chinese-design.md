# Agentic AI Wiki — Chinese Version (i18n) Design Spec

**Date:** 2026-05-17
**Issue:** EvanCarson/Agentic-AI-Wiki#1 — "Support Multiple language version" (Add Chinese version)
**Status:** Approved pending spec review

## Purpose

Add a full Simplified-Chinese version of the Agentic AI Wiki alongside the
existing English site: every UI surface and all Field Guide content
(21 chapters + intro) available in Chinese at human-quality. The site becomes
bilingual; English remains the default at existing URLs.

## Goals

- English keeps its current URLs unchanged (`/`, `/field-guide/<slug>`,
  `/about`, `/posts`). Chinese mirrors under `/zh/…`.
- All 21 chapters + intro translated to human-quality Simplified Chinese,
  each independently reviewed before acceptance.
- All interface chrome localized.
- Code is never altered by translation; technical terminology is consistent
  across all chapters via a shared glossary.
- Correct SEO for a bilingual site (hreflang, lang, localized metadata,
  sitemap covering both locales).
- Nothing ships until the entire bilingual experience is complete and the
  verification gate is green for both locales.

## Non-Goals

- No Traditional Chinese (zh-Hant) or any third locale in this iteration.
- No machine-translation-only output; no per-locale content fallback (a `/zh`
  route exists only when its translation exists, and launch requires all 22).
- No translation of the standalone `posts` collection content (it is empty);
  only the posts UI/empty-state is localized.
- No language auto-detection/redirect; locale is chosen via an explicit
  switcher and URL.

## Decisions (from brainstorming)

- **Scope:** Full human-quality, all 22 bodies, block until complete.
- **Production:** Agent translates each chapter; an independent review
  subagent verifies each; translate → review → fix loop per chapter.
- **Routing:** English at root, Chinese under `/zh`, Simplified (zh-Hans),
  `defaultLocale: en`, Astro built-in i18n.
- **Code/terms:** Code blocks byte-verbatim; code comments and explanatory
  string-literal prose translated; established technical terms bilingual on
  first use (`中文（English）`); shared glossary enforces consistency.

## Architecture

Approach A (chosen): locale-scoped content directories + Astro built-in i18n
routing. Rejected: per-file `.zh.html` suffix (messy globs, weak separation);
i18n message-catalog libraries (overkill for hand-managed HTML).

### Routing & config

`astro.config.mjs` adds:

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'zh'],
  routing: { prefixDefaultLocale: false },
}
```

- English routes unchanged. Chinese routes are the same paths under `/zh`.
- Chapter slugs are identical across locales (stable deep-link contract);
  only the `/zh` prefix differs.

### Content & manifest model

- Move the 22 existing English bodies from `src/content/field-guide/*.html`
  to `src/content/field-guide/en/<page>.html` (no content change).
- Chinese bodies live at `src/content/field-guide/zh/<page>.html`.
- `src/content/field-guide/manifest.ts` remains the single source of truth for
  part/chapter structure, order, slugs, page ids, and roman/num. `title` and
  part `name` become per-locale maps:
  `title: { en: 'The Loop', zh: '主循环' }`, `name: { en: 'Build', zh: '构建' }`.
  Derived `CHAPTERS`/`PARTS`/`chapterBySlug` and the type exports adjust
  accordingly; helpers gain a `locale` parameter where they resolve display
  text.
- `extract-chapters.mjs` is updated only to write English bodies into the
  `en/` subdirectory (re-extraction must reproduce `en/` byte-identically,
  including the existing comment-preservation and dead-`page-nav` strip).
  It does not generate Chinese content.

### UI chrome

- New `src/i18n/ui.ts` exports `ui: Record<'en'|'zh', {...}>` containing every
  interface string: header nav labels + brand tagline, language switcher
  labels, breadcrumb wording, prev/next dir labels ("← prev"/"next →" →
  "← 上一章"/"下一章 →"), footer line, homepage kicker/h1/lede/featured block/
  "The whole path", posts title + empty-state, about page copy, sidebar
  `aria-label`. A typed `t(locale)` accessor returns the locale dictionary.
- `BaseLayout`, `SiteHeader`, `SiteFooter`, `ChapterSidebar`, `SeriesTOC`,
  `ChapterLayout`, `PostLayout`, and every page accept a `locale` prop
  (default `'en'`) and read display text from `ui[locale]` and localized
  manifest fields. No hardcoded user-facing English remains in these files.
- Page routes: existing English pages pass `locale="en"`. A parallel
  `src/pages/zh/` tree (`zh/index.astro`, `zh/about.astro`,
  `zh/field-guide/index.astro`, `zh/field-guide/[slug].astro`,
  `zh/posts/index.astro`, `zh/posts/[...slug].astro`) renders the same
  components with `locale="zh"`. Shared rendering logic is factored so the
  two trees differ only by the locale value and base path (no duplicated
  layout logic beyond the thin route files).

### Language switcher

- Compact switcher in `SiteHeader` showing `EN / 中文`, current locale marked
  `aria-current`. It links to the counterpart path: from an English path P,
  the Chinese link is `/zh${P}` (P === '/' → '/zh'); from a `/zh` path, strip
  the `/zh` prefix. Because slugs are identical across locales, the switcher
  always lands on the same chapter in the other language.

### Translation process & glossary

- `docs/i18n/zh-glossary.md` (committed before any chapter is translated)
  fixes recurring terminology and rules. Seed terms include (not exhaustive;
  extended as needed and then applied consistently):
  agent loop → 代理循环, tool use → 工具调用, eval/evaluation → 评估,
  retrieval → 检索, prompt → 提示词, context window → 上下文窗口,
  hallucination → 幻觉, observability → 可观测性, latency → 延迟,
  deployment → 部署, benchmark → 基准, multi-agent → 多代理.
- Translation rules: keep every HTML tag/attribute/class/id and code block
  byte-identical; translate prose, headings, captions, code comments, and
  explanatory string-literal prose; established technical terms appear as
  `中文（English）` on first use per chapter; numerals/identifiers/API names
  unchanged.
- Per body (intro + 21 chapters): translate → dispatch independent review
  subagent (checks: semantic accuracy vs English source, glossary/terminology
  consistency, HTML & code byte-fidelity, completeness/no dropped sections,
  fluent register) → fix loop until the reviewer returns pass. New recurring
  terms discovered mid-effort are added to the glossary and back-applied.

### SEO

- `BaseLayout` sets `<html lang>` to the active locale, localized
  `<title>`/`<meta description>`/OG, and emits `hreflang` alternate `<link>`s
  for `en`, `zh`, and `x-default` (→ en) pointing at the counterpart URLs.
- Sitemap includes both locales (Astro sitemap with i18n config).

## Verification / Acceptance

Extends the existing gate (`scripts/verify-chapters.mjs`):

- For **each** locale ('en','zh'): all 21 chapter pages + the locale's
  field-guide landing build and are non-trivial (existing size-threshold),
  intro body present, and per-locale orphan check (every built
  `/[zh/]field-guide/<dir>` maps to a manifest slug).
- Parity check: every `en/<page>.html` has a `zh/<page>.html` of plausible
  size, and all fenced/`<pre>`/`<code>` code-block text is byte-identical
  between the en and zh body of each page (guards against translated code).
- `npm test` (extraction unit tests, incl. `en/` output path), `npm run build`
  exit 0, `npx astro check` 0 errors.
- Manual bilingual smoke: homepage, `/field-guide`, a chapter with code-tabs,
  switcher round-trip — in both `/` and `/zh`.
- Branch `feat/i18n-zh`; merged to `main` only when the full bilingual gate is
  green. Deployment (Vercel) is the user's step post-merge.

## Risks & Decisions

- **Volume (~1.15MB across 22 bodies).** Mitigated by per-chapter
  translate→review→fix units and a shared glossary; implementation plan
  batches chapters.
- **Code fidelity.** Mitigated by the byte-identical code-block parity check
  in the gate and an explicit "never edit code" translation rule.
- **Terminology drift across 22 chapters.** Mitigated by the committed
  glossary applied and back-applied consistently; reviewer checks it.
- **Manifest shape change is cross-cutting.** Localized `title`/`name` touches
  every consumer; done as one infra task with `astro check` enforcing all
  call sites updated.
- **Route duplication.** Mitigated by keeping `zh/` route files thin and
  factoring shared rendering so only `locale` + base path differ.

## Out of Scope / Future

- Traditional Chinese or additional locales.
- Translating future standalone posts (process will reuse this infra).
- Locale auto-detection/redirect; per-user language preference.
- GitHub Actions CI (local + Vercel build gate only, as today).

## Implementation Phasing (for the plan)

1. i18n infrastructure: config, content move to `en/`, localized manifest,
   `ui.ts`, locale-aware components, `/zh` route tree, switcher, hreflang,
   extended verify gate (Chinese bodies absent ⇒ gate intentionally not yet
   green; infra verified via English parity + structure).
2. `docs/i18n/zh-glossary.md`.
3. Chapter translations in batches (intro + 21), each translate→review→fix.
4. Full bilingual verification, then merge.
