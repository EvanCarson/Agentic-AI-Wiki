# Agentic AI Wiki — Design Spec

**Date:** 2026-05-16
**Status:** Approved pending spec review

## Purpose

Turn a single hand-crafted 1.2 MB HTML document (`agentic_ai_guide_1.html`, "The
Agentic AI Field Guide" — a 6-part, 22-chapter editorial SPA) into a matured,
growing knowledge platform: **Agentic AI Wiki**. The Field Guide becomes the
flagship multi-chapter *series*; the platform is built to accumulate standalone
posts over time. Deployed to Vercel.

## Goals

- Preserve the existing visual design language verbatim (palette, type,
  rules/borders, roman-numeral structure, code aesthetic).
- Promote each of the 22 chapters to its own real, deep-linkable URL within a
  unified design system and global navigation.
- Provide a homepage that positions the platform as a living knowledge base.
- Make future authoring scalable (Markdown/MDX), not hand-built mega-files.
- Static, fast, SEO-friendly, one-step Vercel deploy.

## Non-Goals

- No CMS, auth, comments, search, or analytics in this iteration.
- No redesign of the existing chapter content — it is migrated as-is.
- No standalone posts authored in this iteration (the `posts` system exists and
  the homepage handles the empty state, but seeding content is out of scope).

## Tech Stack

- **Astro** (static output, `output: 'static'`).
- Deployed to **Vercel** (auto-detected Astro build; no custom adapter needed
  for static).
- `@astrojs/sitemap` for SEO. `@astrojs/mdx` for future post authoring.
- Google Fonts: Fraunces, JetBrains Mono, Inter (with `preconnect`).

## Branding

- Site/brand: **Agentic AI Wiki**.
- Nav brand reads "Agentic AI Wiki" with the existing accent dot motif.
- The migrated series retains its own title: "The Agentic AI Field Guide".

## Content Model

Two Astro content collections:

### `field-guide` (flagship series)

- 22 chapters across 6 parts. Part/chapter structure and titles are lifted from
  the guide's existing `PART_CHAPTERS` JS map:
  - `0 Foundations`: LLM Mental Model, Prompts, Tool Use, Async Python
  - `I Build`: The Loop, Retrieval, Real Loop, First Eval Suite
  - `II Ship`: Observability, Cost & Latency, Safety, Deployment
  - `III Evaluate`: Eval-Driven Dev, Three Layers, LLM-as-Judge, Benchmarks & CI
  - `IV Specialize`: Code Agents, Computer Use, Research, Multi-Agent
  - `V Frontier`: What to Read
- Each chapter body is the **existing hand-crafted HTML, preserved verbatim**,
  rendered through a shared `ChapterLayout`.
- Storage: `src/content/field-guide/<slug>.html` (one file per chapter) plus a
  `src/content/field-guide/manifest.ts` (or JSON) describing the ordered
  parts → chapters → {slug, title, part label, roman, chapter number}.

### `posts` (standalone, future growth)

- MDX/Markdown authored, same design system via `PostLayout`.
- Starts empty. Homepage and any post index degrade gracefully when empty.

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — Direction A (editorial masthead + structured part index) with B's featured-series block folded in |
| `/field-guide` | Full structured table of contents for the series |
| `/field-guide/<chapter-slug>` | Individual chapter page (×22) |
| `/posts/<slug>` | Standalone post (future) |
| `/about` | About the wiki |

## Components

- `BaseLayout` — `<head>`, fonts, global CSS tokens, sitewide meta/OG.
- `SiteHeader` — global nav: **Agentic AI Wiki** brand · Field Guide · Posts ·
  About. Replaces the old in-page SPA top-nav.
- `SiteFooter` — minimal, brand + links.
- `ChapterLayout` — wraps verbatim chapter HTML; adds breadcrumb
  (Field Guide / Part), in-part chapter sub-nav, and prev/next chapter links
  derived from the manifest.
- `SeriesTOC` — the structured part/chapter index used on `/field-guide` and
  echoed on the homepage.
- `PostLayout` — layout for MDX posts.
- Code-tab behaviour (Anthropic ⇄ OpenAI switcher): preserved by keeping the
  existing CSS classes and shipping one small global client script replicating
  the original `switchTab` — no per-component rewrite, zero behaviour drift.

## Homepage (Direction A + featured block)

1. Global header.
2. Editorial masthead: kicker "A Living Knowledge Base", Fraunces headline with
   accent emphasis.
3. Featured Series block (from Direction B): bold-bordered card — "The Agentic
   AI Field Guide", 6 parts · 22 chapters · "Start reading →".
4. Structured part index: the 6 parts as a grid with roman numerals and chapter
   counts, each linking into the series (reuses `SeriesTOC`).
5. "Latest" strip: recent standalone posts; hidden/placeholder when empty.
6. Footer.

## Migration

One-time, reproducible:

1. Source `agentic_ai_guide_1.html` is copied into the repo at
   `legacy/agentic_ai_guide_1.html` and committed for provenance.
2. A Node script (`scripts/extract-chapters.mjs`) parses the source, extracts
   each `<div class="page" data-page="X">…</div>` inner HTML into
   `src/content/field-guide/<slug>.html`, and emits the manifest from the
   embedded `PART_CHAPTERS` map (slug = page id mapped to a readable slug, e.g.
   `f1` → `llm-mental-model`).
3. Extracted chapter files and manifest are committed; the build does not parse
   the source at build time.
4. The original global `<style>` is extracted once into
   `src/styles/guide.css` (design tokens + all chapter/code/component classes),
   loaded globally so chapter HTML renders identically.

## SEO & Quality

- Per-page `<title>` and meta description (chapter title + summary).
- Open Graph tags via `BaseLayout`.
- `@astrojs/sitemap`.
- Smooth-scroll / anchor behaviour preserved.

## Testing / Acceptance

- `astro build` completes with no errors (primary gate).
- A check script asserts all 22 chapter routes are generated and non-empty.
- Local `astro dev` visual smoke: homepage, `/field-guide`, a sampling of
  chapters including one with code-tabs, confirms design parity with the
  original and working tab switching + prev/next nav.
- Successful Vercel deployment (production URL reachable, homepage + a chapter
  load correctly).

## Risks & Decisions

- **Chapter content stays raw HTML, not Markdown.** Decision: accepted — it is
  imported legacy content; fidelity to the original design outweighs
  authoring uniformity. All *new* content is MDX.
- **Large source file.** Mitigated: parsed once by a committed script;
  extracted artifacts are committed so builds are parse-free.
- **Code-tab interactivity.** Mitigated: preserve original classes + a single
  global script rather than rewriting as framework components — eliminates
  behaviour-drift risk.
- **Slug stability.** Slugs are defined once in the manifest; changing them
  later breaks deep links — treated as a stable contract.

## Out of Scope / Future

- Search, tags/topics pages, RSS feed, dark mode, comments.
- Authoring the first standalone posts.
- CI pipeline (build gate is run locally / on Vercel for now).
