# AI Blog Section — Design

**Date:** 2026-05-22
**Status:** Drafted via brainstorming on 2026-05-22; pending user review before plan.
**Author:** Agentic AI Wiki (drafted with Claude)

## 1. Problem & goals

The site has five content surfaces (Field Guide, Concepts, Deep-Dives, Playbooks, Operations) and all of them are **evergreen reference** content: undated, body-only HTML fragments, no images, ordered by editorial intent rather than recency. There is no surface for **time-ordered, opinionated, image-rich long-form posts** — the kind of writing that compares products, explains a release, or argues for a position.

This design adds a new top-level section, **AI Blog** (nav label "AI Blog" / "AI 博客", URL prefix `/blogs`), and ships it with a first post: a deep technical comparison of OpenClaw, OpenHuman, and Hermes Agent.

**Goals:**

1. Add a chronological, tag-indexed blog section that respects the site's existing conventions (bilingual en/zh, body-only HTML fragments, build-time generation, no JS dependency).
2. Introduce image/diagram conventions (SVG-first, theme-aware, co-located under `public/blogs/<slug>/`).
3. Establish a project-wide opener convention (hook lede, no "TL;DR" labels) — codified in CLAUDE.md.
4. Ship the first post — *OpenClaw vs OpenHuman vs Hermes Agent: Three Architectures of the Open-Source Agent Stack* — optimized for SEO on both individual-project searches and the three-way comparison query.

**Non-goals (deferred):**

- Comments, email subscribe, RSS feed (revisit at ≥3 posts).
- Pagination on the index (revisit at ~20 posts).
- Per-post OG image generation (use section default for v1).
- Per-author profile pages (single default author).
- Backfilling existing fragments to the new hook-lede rule (rule applies to new content only).
- Author bio block on detail pages.
- Featured post on the home page.

## 2. Information architecture

**Reader mental model.** The existing sections answer "what is X" (Concepts), "how does it work" (Deep-Dives), "what to build" (Playbooks), and "how to run it" (Operations). The blog answers **"what's new and how does it stack up"** — dated, comparative, opinionated.

**Top nav grows from 7 to 8 slots:**

| Slot | EN | ZH | Status |
|---|---|---|---|
| 1 | Field Guide | 实战指南 | unchanged |
| 2 | Concepts | 概念 | unchanged |
| 3 | Deep-Dives | 深度剖析 | unchanged |
| 4 | Playbooks | 实战手册 | unchanged |
| 5 | Operations | 运维 | unchanged |
| 6 | **AI Blog** | **AI 博客** | **new** |
| 7 | Changelog | 更新日志 | unchanged |
| 8 | About | 关于 | unchanged |

**URL structure.**

| Path | Purpose |
|---|---|
| `/blogs` | Reverse-chronological index (newest first) |
| `/blogs/<slug>` | Individual post |
| `/blogs/tag/<tag>` | All posts with that tag |
| `/zh/blogs/...` | Bilingual mirror of all of the above |

**Taxonomy.** Tags only — flat, lowercase-kebab-case strings. No nested groups. Tag pages generate automatically from posts. No predefined tag list; tags grow organically and are validated only for shape (kebab-case, no spaces).

## 3. Content model & file layout

**One file per post** under `src/content/blogs/posts/<YYYY-MM-DD>-<slug>.ts` (mirrors the changelog's one-file-per-entry pattern; concurrent PRs adding posts never collide on a shared manifest).

```ts
// src/content/blogs/types.ts
import type { Localized } from '../../i18n/index';

export interface BlogPost {
  date: string;              // 'YYYY-MM-DD' — must equal filename prefix (test-enforced)
  slug: string;              // kebab-case, must be unique, must equal filename slug
  title: Localized;          // L(en, zh)
  summary: Localized;        // 1–2 sentences, used on cards and as <meta description>
  tags: string[];            // lowercase kebab-case
  author?: Localized;        // optional; defaults to `ui[locale].blog.defaultAuthor` ("Agentic AI Wiki" / "智能体 AI 维基")
  ogImage?: string;          // optional absolute path; defaults to /og/og-blog[-zh].png
  readingTimeMin?: number;   // optional override; auto-computed from fragment word count otherwise
}

export const L = (en: string, zh: string): Localized => ({ en, zh });
```

**Body fragments** at `src/content/blogs/{en,zh}/<slug>.html` — body-only HTML, same conventions as other sections (`.phase`, `.step`, `.callout`, `<pre class="standalone">`).

**Aggregator** at `src/content/blogs/manifest.ts`:

```ts
interface PostModule { default: BlogPost }
const modules = import.meta.glob<PostModule>('./posts/*.ts', { eager: true });

export const POSTS: BlogPost[] = Object.entries(modules)
  .map(([path, m]) => ({ ...m.default, _filename: path.split('/').pop()! }))
  .sort((a, b) => b._filename.localeCompare(a._filename));

export function postBySlug(slug: string): BlogPost | undefined { /* ... */ }
export function postsByTag(tag: string): BlogPost[] { /* ... */ }
export function allTags(): string[] { /* dedup + sort */ }
```

Sort is filename-descending (newest-date wins; slug breaks ties within a day). Matches the changelog aggregator pattern.

**File layout:**

```
src/content/blogs/
  types.ts
  manifest.ts
  posts/
    2026-05-22-openclaw-vs-openhuman-vs-hermes-agent.ts
  en/
    openclaw-vs-openhuman-vs-hermes-agent.html
  zh/
    openclaw-vs-openhuman-vs-hermes-agent.html

public/blogs/
  openclaw-vs-openhuman-vs-hermes-agent/
    arch-openclaw.svg
    arch-openhuman.svg
    arch-hermes.svg
    compare-memory.svg
    compare-tools.svg
    compare-security.svg
    compare-deployment.svg
    compare-extensibility.svg
    logos/
      openclaw.svg
      openhuman.svg
      hermes.svg
```

## 4. Pages, layout & components

| File | What it does |
|---|---|
| `src/pages/blogs/index.astro` | Chronological index (BlogsView component) |
| `src/pages/blogs/[slug].astro` | Post detail (BlogLayout) |
| `src/pages/blogs/tag/[tag].astro` | Per-tag listing (BlogTagView) |
| `src/pages/zh/blogs/index.astro` | zh index |
| `src/pages/zh/blogs/[slug].astro` | zh detail |
| `src/pages/zh/blogs/tag/[tag].astro` | zh tag listing |
| `src/layouts/BlogLayout.astro` | Detail layout: header (date · author · tags), body slot, footer ("More tagged X" + "Latest posts", 3 each). No sibling-by-group sidebar. |
| `src/components/pages/BlogsView.astro` | Index: hero + reverse-chronological list of post cards |
| `src/components/pages/BlogTagView.astro` | Tag-filtered list + "Tagged: <tag>" heading |
| `src/components/BlogCard.astro` | Shared card: date · reading time · title · summary · tag pills |

`[slug].astro` and `tag/[tag].astro` use `getStaticPaths()` to enumerate from `POSTS` and `allTags()` respectively.

## 5. Site integration

**`src/i18n/ui.ts`** — add `nav.blog` plus a `blog` block (en + zh):

```ts
nav: { ..., blog: 'AI Blog' /* zh: 'AI 博客' */ },
blog: {
  metaTitle: 'AI Blog — Agentic AI Wiki',
  metaDesc:  'Long-form posts on the state of agentic AI — comparisons, architecture deep-dives, field notes.',
  h1: 'AI Blog',
  tagline: 'Long-form posts, comparisons, and field notes from the agentic frontier.',
  postedOn: 'Posted',
  byline: 'By',
  readingTime: 'min read',
  taggedWith: 'Tagged',
  latestPosts: 'Latest posts',
  allPosts: 'All posts',
  allTags: 'All tags',
  backToBlog: '← Back to AI Blog',
  defaultAuthor: 'Agentic AI Wiki',  // zh: '智能体 AI 维基'
}
```

zh strings translated faithfully.

**`src/components/SiteHeader.astro`** — insert `{ href: '/blogs', label: t.nav.blog }` between Operations and Changelog in the `links` array.

**`src/content/og.ts`** — add `'blog'` to `OgSectionKey`. `scripts/build-og.mjs` regenerates `og-blog.png` + `og-blog-zh.png` automatically on `npm run og:build`.

**`src/lib/og.ts`** — `pagefindFilterFor('blog', locale)` returns "AI Blog" / "AI 博客"; `ogImageFor('blog', locale)` returns the section default path.

**Pagefind** — blog pages are included in the search index with filter label "AI Blog" (set via `pagefindFilter` prop on BlogLayout).

**Sitemap** — `@astrojs/sitemap` picks up the new routes automatically.

**Home page** — no change in this PR; "Latest from the AI Blog" block on the home page is a deferred follow-up.

## 6. Image & diagram conventions

| Type | Format | Where | Notes |
|---|---|---|---|
| Architecture / comparison diagrams | **SVG**, hand-authored, body-only (no scripts) | `public/blogs/<slug>/<name>.svg` | Use `currentColor` + CSS vars (`var(--ink)`, `var(--accent)`, `var(--border-soft)`) for fills/strokes so they theme-switch. `viewBox`-based, no fixed pixel sizes. `role="img"` + `<title>` + `<desc>` children for a11y. |
| Screenshots / photos | PNG or JPG | `public/blogs/<slug>/<name>.png` | Provide `width`, `height`, `loading="lazy"`, descriptive bilingual `alt`. |
| Logos | SVG preferred, PNG fallback | `public/blogs/<slug>/logos/<project>.svg` | Tiny, used in comparison-table cells. |

Referenced from HTML fragments with absolute paths (`/blogs/<slug>/foo.svg`). `<figure>` + `<figcaption>` wrap diagrams; captions are translated prose (not byte-mirrored).

## 7. First post — *OpenClaw vs OpenHuman vs Hermes Agent*

**Slug:** `openclaw-vs-openhuman-vs-hermes-agent`
**Date:** the day this PR merges (per the changelog deploy-date rule, applied here too).
**Title (en):** *OpenClaw vs OpenHuman vs Hermes Agent: Three Architectures of the Open-Source Agent Stack*
**Title (zh):** *OpenClaw、OpenHuman 与 Hermes Agent：开源智能体栈的三种架构*
**Tags:** `agent-comparison`, `open-source`, `architecture`, `agent-frameworks`
**Length:** ~3,000–4,000 English words; matching zh translation.

**Hook lede (en, between `<h1>` and first `<h2>`):**

> *Pick the wrong open-source agent and you rebuild from zero. OpenClaw, OpenHuman, and Hermes Agent are not the same animal — one sandboxes your machine, one memorizes you, one learns from its own failures. Here's the architecture, side by side.*

The zh lede is translated faithfully — same beats, not a byte-for-byte mirror.

**Outline:**

1. **At a glance** (first `<h2>`). Three-row comparison table: *Project · Released · Stars · Primary niche · Memory model · Sandboxing · LLM coupling · Deployment shape*. Logos in the leftmost cell.
2. **The three projects in 60 seconds.** Three short paragraphs, one per project, each with a one-liner thesis. Inline logos.
3. **OpenClaw — deep dive.** Diagram 1 (`arch-openclaw.svg`): agent loop with Task Brain (SQLite ledger), skill sandbox, eBPF hook, integration adapters. Subsections: control loop · Task Brain ledger · sandboxing model · integration surface.
4. **OpenHuman — deep dive.** Diagram 2 (`arch-openhuman.svg`): 118 connectors → 20-min fetcher → memory tree → SQLite store → Tauri UI → agent. Subsections: connector model · memory tree compression · user-context-first prompting · desktop runtime.
5. **Hermes Agent — deep dive.** Diagram 3 (`arch-hermes.svg`): user goal → planner ↔ tool library (40+) ↔ LLM backend → episodic memory store → retrieval-augmented next-task. Subsections: planner loop · tool library · episodic memory · model-agnostic backend.
6. **Cross-cutting comparison.** Five subsections, each with a side-by-side mini-diagram:
   - **Memory model** (`compare-memory.svg`) — transactional ledger vs life-context tree vs episodic case base.
   - **Tool / skill model** (`compare-tools.svg`) — sandboxed Skills vs connector pull + native tools vs built-in tool library.
   - **Security / sandboxing** (`compare-security.svg`) — eBPF least-privilege vs OS-level desktop trust vs process isolation.
   - **Deployment topology** (`compare-deployment.svg`) — always-on local runtime vs desktop app vs self-hosted always-on service.
   - **Extensibility** (`compare-extensibility.svg`) — Skill SDK vs connector plugins vs tool registration + model swap.
7. **Decision matrix — when to pick which.** Three-column table: *Use OpenClaw if… / Use OpenHuman if… / Use Hermes if…* paired against use cases (devops automation, personal assistant, autonomous research agent, etc.).
8. **FAQ.** ~6 questions, each as `<h3>` + short answer. Hand-authored in the fragment under `<section class="faq">` so BlogLayout's JSON-LD parser can emit `FAQPage` schema.
   - Which has the most GitHub stars?
   - Can I run any of them on a Raspberry Pi or a small VPS?
   - Which is the most secure for production use?
   - Which works best as a personal assistant?
   - Are they interoperable?
   - Which model backends do they support?
9. **Further reading.** Internal cross-links to relevant existing entries (`the-agent-loop`, `tools-actions-environments`, `sandboxing-and-execution`, `autonomy-levels`); external links to each project's repo + docs.

**Diagram count:** 8 SVGs (3 architecture, 5 cross-cutting mini) + 3 project logos.

## 8. SEO, accessibility & schema

**Per-post SEO scaffolding** (emitted by BlogLayout):

- `<title>` from post title; `<meta name="description">` from post summary.
- OG image: post's `ogImage` if set, else `/og/og-blog[-zh].png` section default.
- `<link rel="canonical">` and `hreflang` alternates (already standard via BaseLayout).
- **JSON-LD `BlogPosting`:** `headline`, `description`, `datePublished`, `dateModified` (= `date`), `author`, `image`, `mainEntityOfPage`, `inLanguage`, `keywords` (from `tags`).
- **JSON-LD `FAQPage`:** emitted when the fragment includes a marked-up `<section class="faq">` block. The layout parses `<h3>` (Q) + the immediately following `<p>` (A); no-op when the section is absent.

**Tag pages:** `<title>` (en) = "Posts tagged X — AI Blog · Agentic AI Wiki"; `<title>` (zh) = "标签：X — AI 博客 · 智能体 AI 维基"; `<meta description>` lists the top 3 post titles in that tag.

**Index page:** `<title>` and `<meta description>` from `ui[locale].blog.metaTitle` / `metaDesc`.

**Internal links from the first post** into `the-agent-loop`, `tools-actions-environments`, `sandboxing-and-execution`, `autonomy-levels`. Reciprocal back-links from those entries are a follow-up PR, not blocking.

**Accessibility:**

- Diagrams: `<svg role="img">` + `<title>` child + `aria-labelledby` to the `<title>` and a `<desc>` child for longer description; bilingual (en in en fragment, zh in zh fragment).
- Raster images: descriptive `alt` (not "image of…"), `width`, `height`, `loading="lazy"` except hero/above-fold.
- Heading hierarchy: one `<h1>` from BlogLayout (the post title), `<h2>` per top-level section, `<h3>` for subsections; no skipping levels.
- Tag pills: visible focus ring, `aria-label="Tagged: <tag>"` on the link.
- Color contrast: reuse existing site CSS tokens to stay AA across both themes.

## 9. CLAUDE.md addition — Document openers

Codifies the lede rule project-wide. Inserted between **Conventions** and **Verification gates**:

> ## Document openers
>
> Every content fragment opens with a **hook lede** — one short paragraph between
> the title and the first `<h2>` that does two jobs in one breath:
>
> 1. **Lead with the stakes.** Why a reader who clicks away loses something concrete.
> 2. **Name the takeaway.** A skimmer who reads only the first 30 words leaves with
>    a useful idea.
>
> No header label ("TL;DR", "Summary", "Overview", "Intro" — banned). No bullet
> list, no table, no fenced block. No throat-clearing ("In this post we'll…",
> "AI agents are everywhere…" — banned).
>
> Self-test: which sentence in your lede is doing the eye-catching work? If you
> can't point to one, rewrite until you can — and put it first.
>
> Both `en` and `zh` ledes are translated faithfully, not byte-mirrored. The rule
> applies to all new content; existing fragments are not required to retrofit.

## 10. Tests & verification gates

**New test file** `scripts/__tests__/blogs.test.mjs` enforces:

1. Each `posts/<YYYY-MM-DD>-<slug>.ts` filename's date prefix equals the exported `BlogPost.date`.
2. `BlogPost.slug` equals the filename slug.
3. Slug uniqueness across all posts.
4. Bilingual fragments exist at `src/content/blogs/{en,zh}/<slug>.html` for every registered post.
5. Tags are non-empty arrays of lowercase kebab-case strings (`/^[a-z0-9]+(-[a-z0-9]+)*$/`).
6. Required Localized fields (`title`, `summary`) populated for both `en` and `zh`.
7. Built detail page emits valid `BlogPosting` JSON-LD with required fields (follows the existing built-HTML snapshot pattern used by other section tests).

**Extended scripts:**

- `scripts/verify-chapters.mjs` — cover `src/content/blogs/{en,zh}/*.html` bilingual completeness.
- `scripts/check-internal-links.mjs` — already crawls `dist/`; no change needed, but the new routes get coverage automatically.

**Must pass before merge:**

```
npm run build      # static build to dist/, no new warnings
npm run verify     # bilingual completeness, internal links, OG meta
npm test           # extraction + manifest + new blog tests
```

## 11. Changelog entry

Per the project rule, this PR ships with one changelog entry file:

```
src/content/changelog/entries/<merge-date>-add-ai-blog-section.ts
```

Items (bilingual):

- New top-level "AI Blog" section with chronological feed, tags, and bilingual mirror.
- First post: *OpenClaw vs OpenHuman vs Hermes Agent — three architectures compared*, with eight diagrams.
- New project-wide rule in CLAUDE.md: hook-lede document openers, no "TL;DR" labels.

## 12. Risks & open questions

| Risk | Mitigation |
|---|---|
| First post's three projects could be moving fast — facts may go stale by merge day. | Verify each project's claimed stars / version / release date on the day of merge; the post is dated, so future-readers will read it in context. |
| The `<section class="faq">` JSON-LD parser is a new pattern. | Keep the parser tolerant — silent no-op if the section is absent or malformed; covered by a dedicated unit test. |
| SVG theme-awareness via CSS vars is new in this codebase. | Document the convention in this design and in the first post's diagram authoring; verify in both light and dark modes manually before merge. |
| New rule in CLAUDE.md may be over-strict in edge cases. | "Applies to new content only" clause already in the rule; revisit after the first follow-up post lands. |

## 13. Out of scope (deferred follow-ups)

- RSS feed for the blog index.
- Pagination on the index.
- Per-post OG image generation (currently uses section default).
- "Latest from the AI Blog" block on the home page.
- Reciprocal `xref` back-links from Field Guide / Concepts / Deep-Dives into the first post.
- Comments, email subscribe, per-author profile pages.
- Backfill of existing fragments to the new hook-lede rule.
