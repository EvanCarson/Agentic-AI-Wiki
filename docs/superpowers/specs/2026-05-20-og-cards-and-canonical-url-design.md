# Social-share OG cards + canonical URL fix — design

- **Issue:** [#34](https://github.com/EvanCarson/Agentic-AI-Wiki/issues/34) `[P0] Add default OG / Twitter card image across all pages`
- **Branch:** `og-cards-and-canonical-url`
- **Date drafted:** 2026-05-20
- **Status:** design — pending user approval before implementation plan

## Goal

Every page on `menuagentic.com` ships an `og:image` and `twitter:image`. Each of the seven top-level groupings (default, Field Guide, Concepts, Deep-Dives, Playbooks, Operations, Changelog) gets its own bilingual 1200×630 card. PNGs are generated from a single templated build script — adding a new section is a one-line edit, not a Figma session.

The new card's URL line says `menuagentic.com`, so this PR also fixes the codebase's stale references to the old `agentic-ai-wiki.vercel.app` domain (`astro.config.mjs`, `CLAUDE.md`, README). Without that fix the new card would say one domain while `og:url`, `canonical`, sitemap, and `hreflang` all point at the other — a self-inconsistent head.

## Non-goals (explicit — to keep PR reviewable)

- **Per-page generated OG images** with the page title rendered into the card. Stays a follow-up issue; the `image` prop accepts a per-page override, so a future PR can plug in `@vercel/og` at the route level without re-plumbing layouts.
- **Dark-mode-aware OG images.** OG cards are shared as static images — no dark-mode dependency. Dark mode (issue #44) is a separate PR.
- **Issues #41 (TOC), #44 (dark mode), #45 (Pagefind filters).** Separate parallel PRs after this one.
- **A new brand SVG / favicon.** The three accent dots already serve as the brand mark across the site.
- **Sitemap regeneration as a separate step.** The `astro.config.mjs` `site` URL change emits a corrected sitemap automatically on next build.

## Card design (locked: "Direction A — dark editorial")

- 1200×630 PNG, ink (#0a0a0a) background, paper (#f4f1ea) title text.
- Top row: `AGENTIC AI WIKI` in JetBrains Mono 500, 12 px, 0.22 em tracking (left); three accent dots `#d4421e` at full / 60% / 30% opacity (right).
- Centre: section name in Fraunces 300, 84 px (72 px when the string is long — e.g., `Deep-Dives`, `深度剖析`), tight leading. A 56×2 px accent rule sits 14 px below.
- Bottom row: site tagline in Inter 16 px (left); `menuagentic.com` in JetBrains Mono 11 px, 0.12 em tracking, 85% opacity (right).
- Mockup committed at `.superpowers/brainstorm/.../og-direction-a-final.html` for design reference (not shipped).

## Section catalog

Source of truth: `src/i18n/ui.ts` for ZH/EN section names; the OG manifest holds only keys + the default-card strings.

| key | EN name | ZH name (from `ui.zh.nav`) | files |
|---|---|---|---|
| `default` | `Agentic AI` | `智能体 AI` | `og-default.png`, `og-default-zh.png` |
| `fieldGuide` | `Field Guide` | `实战指南` | `og-field-guide.png`, `og-field-guide-zh.png` |
| `concepts` | `Concepts` | `概念` | `og-concepts.png`, `og-concepts-zh.png` |
| `deepDives` | `Deep-Dives` | `深度剖析` | `og-deep-dives.png`, `og-deep-dives-zh.png` |
| `playbooks` | `Playbooks` | `实战手册` | `og-playbooks.png`, `og-playbooks-zh.png` |
| `operations` | `Operations` | `运维` | `og-operations.png`, `og-operations-zh.png` |
| `changelog` | `Changelog` | `更新日志` | `og-changelog.png`, `og-changelog-zh.png` |

Note: the `deepDives` *nav* label `深度剖析` differs from the in-page Deep-Dive header line `深入解析` mandated by `CLAUDE.md`. The card uses the nav label, because that is what represents the *section* across the site.

Tagline (single string per locale; lives in `ui.ts` under a new `og.tagline` field):
- EN: `A living knowledge base on building agentic AI.` (matches the `BaseLayout.astro` default `description`).
- ZH: `持续更新的智能体 AI 知识库。` (matches the homepage hero `kicker` voice at `ui.ts:159`).

## Architecture

```
src/i18n/ui.ts                ← SOURCE OF TRUTH for names + tagline
                                (existing file; +1 `og.tagline` field)
       │
       ├──► scripts/build-og.mjs     reads ui + section list → 14 PNGs
       │                              (Satori → SVG → resvg-js → PNG)
       │
       └──► src/layouts/*.astro      passes /og/<file>.png to BaseLayout
                                      via the helper

src/content/og.ts             ← SECTION KEY catalogue (no copy)
src/lib/og.ts                 ← ogImageFor(key, locale) helper
public/og/*.png               ← 14 committed PNGs (deterministic)
```

Two files own user-facing copy (`ui.ts`, plus the `default` strings in `og.ts`); one file owns the section list (`og.ts`); one file owns the resolver (`lib/og.ts`); one file owns the render (`scripts/build-og.mjs`). Layouts only know about the resolver.

## Implementation surface

### 1. Source-of-truth files

**`src/content/og.ts`** — new.
```ts
export const OG_SECTIONS = [
  { key: 'default',     name: { en: 'Agentic AI', zh: '智能体 AI' } },
  { key: 'fieldGuide'  },
  { key: 'concepts'    },
  { key: 'deepDives'   },
  { key: 'playbooks'   },
  { key: 'operations'  },
  { key: 'changelog'   },
] as const;
export type OgKey = (typeof OG_SECTIONS)[number]['key'];
```

Non-`default` entries pull `name` from `ui[locale].nav[key]` at build time.

**`src/i18n/ui.ts`** — add `og.tagline` to each locale.
```ts
en: { ..., og: { tagline: 'A living knowledge base on building agentic AI.' } }
zh: { ..., og: { tagline: '持续更新的智能体 AI 知识库。' } }
```

**`src/lib/og.ts`** — new resolver.
```ts
export function ogImageFor(key: OgKey, locale: Locale): string {
  const suffix = locale === 'zh' ? '-zh' : '';
  const slug = key === 'default' ? 'default'
             : key === 'fieldGuide' ? 'field-guide'
             : key === 'deepDives'  ? 'deep-dives'
             : key;                                  // concepts/playbooks/operations/changelog
  return `/og/og-${slug}${suffix}.png`;
}
```

### 2. `BaseLayout.astro`

```diff
- export interface Props { title: string; description?: string; locale?: Locale }
- const { title, description = '...', locale = 'en' } = Astro.props;
+ export interface Props { title: string; description?: string; locale?: Locale; image?: string }
+ const { title, description = '...', locale = 'en', image } = Astro.props;
+ const defaultOg = locale === 'zh' ? '/og/og-default-zh.png' : '/og/og-default.png';
+ const ogImage = new URL(image ?? defaultOg, Astro.site).toString();
```

In `<head>` (after `og:locale`):
```html
<meta property="og:image" content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content={title} />
<meta name="twitter:image" content={ogImage} />
```

Flip `<meta name="twitter:card" content="summary">` → `summary_large_image`.

### 3. Detail layouts

Each wraps `BaseLayout` and passes `image={ogImageFor(<key>, locale)}`:

| layout | key |
|---|---|
| `src/layouts/ChapterLayout.astro` | `fieldGuide` |
| `src/layouts/ConceptLayout.astro` and any concept-route use of `SectionEntryLayout.astro` | `concepts` |
| `src/layouts/DeepDiveLayout.astro` | `deepDives` |
| `src/layouts/PlaybookLayout.astro` | `playbooks` |
| `src/layouts/OperationLayout.astro` | `operations` |

### 4. Index + changelog pages

These use `BaseLayout` directly, so they pass the prop themselves. Files:
- `src/pages/concepts.astro` + `src/pages/zh/concepts.astro`
- `src/pages/deep-dives.astro` + `src/pages/zh/deep-dives.astro`
- `src/pages/playbooks.astro` + `src/pages/zh/playbooks.astro`
- `src/pages/operations.astro` + `src/pages/zh/operations.astro`
- `src/pages/changelog.astro` + `src/pages/zh/changelog.astro`

Field Guide's index page lives under `src/pages/field-guide.astro` (and ZH mirror) — also wire it.

Home, About, 404, and any page that doesn't pass `image` falls through to the locale-aware default automatically.

### 5. Image build pipeline

**`scripts/build-og.mjs`** — Satori + resvg-js.

```js
import { satori } from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { ui } from '../src/i18n/ui.ts';
import { OG_SECTIONS } from '../src/content/og.ts';
import { ogImageFor } from '../src/lib/og.ts';

for (const section of OG_SECTIONS) {
  for (const locale of ['en', 'zh']) {
    const name = section.key === 'default'
      ? section.name[locale]
      : ui[locale].nav[section.key];
    const tagline = ui[locale].og.tagline;
    const svg = await satori(renderCard({ name, tagline }), {
      width: 1200, height: 630,
      fonts: [fraunces300, jetbrainsMono500, interRegular, notoSansSC],
    });
    const png = new Resvg(svg).render().asPng();
    writeIfChanged(`public/og/${basename(ogImageFor(section.key, locale))}`, png);
  }
}
```

- `renderCard()` is a Satori JSX-shape literal that mirrors the Direction A layout exactly.
- Fonts committed under `vendor/fonts/`: `Fraunces-Light.ttf` (300), `Inter-Regular.ttf` (400), `JetBrainsMono-Medium.ttf` (500), `NotoSansSC-Regular.subset.otf` (CJK fallback). Total ≈ 2 MB; commit once. Satori requires raw font buffers — it can't pull from Google Fonts at build time.
- `writeIfChanged()` reads the existing file and only overwrites when bytes differ. Combined with deterministic Satori output, this means `og:build` is idempotent.

**`package.json`:**
```diff
- "build": "astro check && astro build"
+ "og:build": "node scripts/build-og.mjs",
+ "build": "npm run og:build && astro check && astro build",
```

PNGs commit to `public/og/`. Committing them means Vercel does not need the Satori toolchain on every deploy build for the script to be re-runnable locally; it also makes diffs on the actual rendered output visible in PRs when the template or strings change.

### 6. Canonical URL migration

Folded into this PR so the head is self-consistent.

1. **`astro.config.mjs:6`** — `site: 'https://agentic-ai-wiki.vercel.app'` → `site: 'https://menuagentic.com'`. Side effects (all desired): `og:url`, `canonical`, `sitemap.xml`, `hreflang`, and the absolute URL Satori stamps into each card all switch to the new domain.
2. **`CLAUDE.md`** — Workflow section: "confirm the live site (https://agentic-ai-wiki.vercel.app)" → `https://menuagentic.com`.
3. **`README.md`** — grep for the old domain; update any references found.
4. No redirect work required; `*.vercel.app` keeps working as the Vercel deploy alias and `menuagentic.com` is already the primary domain serving production traffic.

## Verification gates

### A. Unit tests (`npm test`) — new `tests/og.test.mjs`
1. **Catalog well-formedness** — every `OG_SECTIONS[i].key` either equals `'default'` or exists in both `ui.en.nav` and `ui.zh.nav`. Catches dropping a translation when adding a section.
2. **`ogImageFor()` round-trip** — for every (key, locale) pair, returns a `/og/og-<...>.png` path that exists on disk under `public/og/`. Catches drift between catalog and committed PNGs.
3. **No orphan PNGs** — every file in `public/og/` corresponds to a (key, locale) pair in the catalog.
4. **Tagline strings exist** — `ui.en.og.tagline` and `ui.zh.og.tagline` are non-empty strings.

### B. PNG integrity (inside `scripts/build-og.mjs`, hard-fails the build)
5. **All 14 files written.**
6. **Each PNG decodes to exactly 1200×630.**
7. **File size in band** — 20 KB ≤ size ≤ 500 KB. Detects blank renders (too small) or font-fallback explosions (too large).
8. **< 5 MB** (Twitter's hard limit; implied by #7 but explicit).

### C. Build-output assertions (extend `npm run verify` — `scripts/verify-og.mjs`)
9. **`og:image` mapping per route** — `/field-guide/**` → `og-field-guide(-zh).png`, `/concepts/**` → `og-concepts(-zh).png`, etc.; home / about / 404 → `og-default(-zh).png`. Any unmapped route hard-fails — an unannotated new layout can't ship with the wrong image.
10. **Twitter card upgraded** — every page has `summary_large_image`; zero leftover `summary`.
11. **Meta tag well-formedness** — every page has `og:image`, `og:image:width=1200`, `og:image:height=630`, non-empty `og:image:alt`, `twitter:image`. URLs absolute and start with `https://menuagentic.com/`.
12. **Canonical URL migration** — zero occurrences of `agentic-ai-wiki.vercel.app` anywhere in `dist/**`.
13. **Sitemap & hreflang** — `dist/sitemap-*.xml` contains only `menuagentic.com` URLs; every page's `hreflang` link uses `menuagentic.com`.

### D. Determinism (CI)
14. **Idempotence** — CI step: `npm run og:build && git diff --exit-code public/og/`. Fails the PR if committed PNGs drift from what the script regenerates.

### E. Manual gates (PR description checklist)
15. **Twitter Card Validator** — one EN page (e.g. `/concepts/what-is-an-agent/`) + one ZH page. Screenshot in PR.
16. **LinkedIn Post Inspector** — same two URLs. Screenshot in PR.
17. **Quick visual scan of all 14 PNGs locally** — primary watch is ZH glyph rendering (Satori font fallback can produce tofu boxes if the SC font subset doesn't cover a glyph).

### F. Pre-existing tests (no change needed)
- `npm run verify` — bilingual completeness across all sections.
- `deep-dives-manifest.test.mjs`, `changelog.test.mjs` — catch malformed manifest / changelog entries.

| Concern | Where | Trigger |
|---|---|---|
| Catalog shape | `tests/og.test.mjs` | `npm test` |
| PNG integrity | `scripts/build-og.mjs` (in-process) | `npm run og:build` |
| `dist/` assertions | `scripts/verify-og.mjs` (called from `npm run verify`) | `npm run verify` |
| Determinism | CI workflow step | every push |
| Social-card validators | PR checklist | manual, pre-merge |

## Changelog entry (required by `CLAUDE.md`)

New file: `src/content/changelog/entries/<merge-date>-og-cards-and-canonical-url.ts`. Date is re-confirmed and the file renamed on the merge day per the CLAUDE.md deploy-date rule.

```ts
import { type ChangelogEntry, L } from '../types';
export default {
  date: '<merge-date>',
  title: L(
    'Social-share OG cards + canonical URL fix',
    '社交分享 OG 卡片 + 规范网址修复'
  ),
  items: [
    L(
      'Every page now ships an og:image and twitter:image. Each top-level section (Field Guide, Concepts, Deep-Dives, Playbooks, Operations, Changelog) has its own bilingual 1200×630 card.',
      '每个页面现在都会输出 og:image 与 twitter:image。每个顶级版块（实战指南、概念、深度剖析、实战手册、运维、更新日志）都有自己的双语 1200×630 卡片。'
    ),
    L(
      'Twitter card upgraded from `summary` to `summary_large_image`.',
      'Twitter 卡片从 `summary` 升级为 `summary_large_image`。'
    ),
    L(
      'Canonical site URL switched from agentic-ai-wiki.vercel.app to menuagentic.com — also fixes og:url, sitemap, and hreflang.',
      '站点规范网址已从 agentic-ai-wiki.vercel.app 切换为 menuagentic.com — 同时修复了 og:url、sitemap 与 hreflang。'
    ),
    L(
      'New `npm run og:build` regenerates all 14 PNGs from a single template via Satori + resvg-js. Adding a new section is a one-line change in src/content/og.ts.',
      '新增 `npm run og:build`，通过 Satori + resvg-js 从单一模板重新生成全部 14 张 PNG。新增版块只需在 src/content/og.ts 中加一行。'
    ),
  ],
} satisfies ChangelogEntry;
```

## Work breakdown (input for the implementation plan)

1. **Scaffolding** — `src/content/og.ts`, `src/lib/og.ts`, `vendor/fonts/` with the four font files, `src/i18n/ui.ts` gains `og.tagline` (EN + ZH).
2. **Build script** — `scripts/build-og.mjs` (Satori + resvg-js) with `writeIfChanged`. Wire `og:build` into `npm run build`. Generate and commit the 14 PNGs.
3. **`BaseLayout` meta tags** — add `image` prop, emit `og:image` / `twitter:image` / dimensions / alt, flip Twitter card.
4. **Detail layouts** — pass `image={ogImageFor(key, locale)}` from Chapter / Concept (and Section­EntryLayout for concept routes) / DeepDive / Playbook / Operation layouts.
5. **Index + changelog pages** — pass the section image from each section's index `.astro` (EN + ZH).
6. **URL migration** — flip `astro.config.mjs` `site`; update `CLAUDE.md` Workflow line and any `README.md` reference.
7. **Verification additions** — `tests/og.test.mjs`; extend `npm run verify` with `scripts/verify-og.mjs`; add the CI idempotence step.
8. **Changelog entry** — per CLAUDE.md rule; re-date on merge day.
9. **Manual social-card validators** — Twitter Card Validator + LinkedIn Post Inspector against the deploy preview; paste screenshots in PR.

## Risk register

| risk | likelihood | mitigation |
|---|---|---|
| ZH glyphs render as tofu in Satori | M | Vendor a Noto Sans SC subset OTF; PNG integrity check (#B7) flags suspicious file sizes; manual visual scan (#E17) is the human-eye gate. |
| Vercel build doesn't have the Satori toolchain in path | L | Commit the rendered PNGs to `public/og/`. The deploy build does not need to regenerate them; only `npm run build` locally re-runs `og:build`. The CI idempotence check (#D14) keeps the commit in sync with the script. |
| Astro `site` change breaks an unnoticed absolute link | L | Verify gate (#C12) hard-fails on any leftover `agentic-ai-wiki.vercel.app` string in `dist/`. |
| `image` prop drift — a future layout ships without it | M | Verify gate (#C9) hard-fails on any route whose `og:image` doesn't match the per-section expectation. |
| Fraunces 300 weight not in repo | L | Confirmed required and added to `vendor/fonts/` during scaffolding step (#1). |

## Open questions for the implementation plan

These are deferred to the writing-plans step, not strategic enough to need design-level resolution:

- Exact import path for `ui.ts` and `og.ts` from `scripts/build-og.mjs` — does the Node loader handle `.ts` natively, or do we need `tsx` / `esbuild-runner`? Decide while writing the script step.
- Whether `scripts/verify-og.mjs` is a new file or an extension to the existing `scripts/verify.mjs` (whichever file `npm run verify` currently runs).
- Whether `src/pages/field-guide.astro` exists or the Field Guide index is at a different path — the writing-plans step will grep and confirm.
