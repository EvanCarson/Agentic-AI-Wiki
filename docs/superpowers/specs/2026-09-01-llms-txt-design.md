# llms.txt: a generated map of the site for the tools that now send readers

**Date:** 2026-09-01
**Status:** implementing (standing autonomous-shipping directive; issue #184)
**Scope:** `src/lib/llms-txt.ts`, `src/pages/llms.txt.ts`, `src/pages/zh/llms.txt.ts`,
`scripts/__tests__/llms-txt.test.mjs`, one sentence in `src/i18n/ui.ts` (About copy) and
its placeholder in `src/components/pages/AboutView.astro`, one changelog entry.

---

## 1. The problem

The 2026-08-31 growth audit (#171) found a site that produces supply and does no
demand-side work. The mechanical items shipped in #172–#183. One lever stayed open:
the site offers nothing to the AI assistants that are already sending it readers.
In the 30 days to 2026-09-01, `gemini.google.com` and `claude.ai` both appear in the
referrer list, and the share of arrivals that are citations from an assistant's answer
is growing across the web generally.

A model deciding which of ~490 pages to fetch for a question currently has two
sources: the sitemap, which is bare URLs, and the HTML itself. Neither carries the
one thing the decision needs — a title and a one-line summary per page — even though
the section manifests hold exactly that, in both languages, for every page.

`llms.txt` (llmstxt.org) is the convention for this: a Markdown file at the site root
with a required H1, an optional blockquote summary, optional prose, then H2 sections
whose bodies are lists of `- [title](url): notes`. A section headed `## Optional`
carries a defined meaning: links a reader can skip when context is short. It is not a
Google ranking signal and is not being built as one.

## 2. Approaches considered

- **A. Hand-written `public/llms.txt`.** Stale by tomorrow: the daily routine ships
  five pages a day. Rejected.
- **B. Generated at build time from the manifests, one file per locale.** Chosen.
  Mirrors how `src/lib/rss.ts` is built and extends itself every time the routine
  publishes, with no change to the routine — the same reason the `<title>` in #177 is
  derived rather than stored.
- **C. B plus `llms-full.txt`** with every article's text. The spec does not define
  it; it would need fragment-to-Markdown conversion of ~490 articles with inline SVGs
  and weigh several megabytes. Deferred. Adding it later does not change the index.

## 3. The document

English, abbreviated:

```
# Agentic AI Wiki

> An open, bilingual (English / 简体中文) knowledge base on building agentic AI: …
> 490 pages in each language, updated daily.

Every page below also exists in Simplified Chinese at the same path under /zh/ …
A scheduled AI agent drafts part of this site; the About page says how.

## Concepts: AI Foundations

- [What is AI, ML & Deep Learning?](https://menuagentic.com/concepts/what-is-ai/): AI, machine learning, and deep learning are nested circles …

## Deep-Dives: Agent Security

- [Prompt-Injection Defense in 2026](https://menuagentic.com/deep-dives/agent-security/prompt-injection-defense-2026/): …

## Field Guide: Build

- [01 · The Loop](https://menuagentic.com/field-guide/the-loop/)

## AI Blog

- [Title](https://menuagentic.com/blogs/<slug>/): summary (2026-09-01)

## Optional

- [Chinese edition (简体中文)](https://menuagentic.com/zh/llms.txt): the same index with Chinese titles and summaries, pointing at the /zh/ pages
- [AI Blog RSS feed](https://menuagentic.com/rss.xml)
- [Changelog](https://menuagentic.com/changelog/): what changed, newest first
- [About](https://menuagentic.com/about/): what the site covers, who maintains it, and how it is written
- [Source on GitHub](https://github.com/EvanCarson/Agentic-AI-Wiki)
```

Rules, and why each is what it is:

- **H1** is the brand. The **blockquote** names the six sections and states the page
  count, computed from the sources at build time so the number stays true.
- **Details paragraph** carries the two facts a tool cannot infer from the list: every
  page exists in both languages at the same path with a `/zh/` prefix, and part of
  the site is drafted by a scheduled agent. The disclosure sentence mirrors the About
  page and claims no more than it does.
- **One H2 per group, not per section** (`Concepts: AI Foundations`, `Deep-Dives:
  Agent Security`, …, 30 headings in all). The group is the only cluster signal the
  file has, and it lets a reader skip a cluster whole. A per-section layout would bury
  "Agent Security" in a 109-line list. Field Guide sections are its parts; the
  Field Guide is a regular section, not Optional — 26 links, and it is the only
  ordered curriculum on the site.
- **Order:** Concepts (the definitions) → Deep-Dives → Playbooks → Operations → Field
  Guide → AI Blog → Optional. Within a section, manifest order; blog posts newest first.
- **Entry note** is the manifest summary. Blog entries append the date in parentheses:
  a post is a dated argument and the date is the one fact its summary omits. Field
  Guide chapters carry no summary, so the entry is `[NN · Title](url)` with the
  chapter number the site itself uses.
- **Blog title** is the headline (`title`), not `searchTitle`. The width budget that
  motivated #177 does not exist here; a model wants the real title.
- **Concepts groups** are bucketed by exact group string in order of first appearance,
  the same merge semantic as `groupedEntries()`. The group-key drift defect from #167
  would surface here as a forked heading, exactly as it did on the index — a second
  place to notice it, not something to paper over.
- **Chinese file** (`/zh/llms.txt`): Chinese titles, summaries, blurb and headings
  (the nav names — 概念 / 深度剖析 / 实战手册 / 运维 / 实战指南 / AI 博客 — with a
  full-width colon) and `/zh/` URLs. `## Optional` stays literal in both files: it is a
  keyword with defined meaning, not a label to translate. Each file's Optional section
  links the other edition.
- **Escaping:** `[` and `]` in titles are backslash-escaped; a note is collapsed to one
  line. URLs are kebab-case slugs and need nothing.
- **Size:** ~490 links per file, ~100 KB. The convention's larger adopters ship more.

## 4. Where it lives, and how it is served

- **`src/lib/llms-txt.ts`** — pure. `catalogFor(locale, sources)` turns the six
  manifests into a document model; `renderLlmsTxt(doc, site)` turns that into the
  text; `buildLlmsTxt(locale, site, sources)` composes them. `sources` is passed in
  because the manifests are Vite `import.meta.glob` modules and cannot load under
  `node --test`; this is the `blog-backlinks.ts` pattern. The bilingual strings the
  file needs (section names, blurb, Optional labels) live in a small table inside the
  module: `ui.ts` imports `./index` without an extension and cannot load under node
  either, and the blurb is specific to this file anyway. Section names are copied from
  the nav strings so the two never disagree.
- **Routes** `src/pages/llms.txt.ts` and `src/pages/zh/llms.txt.ts` import the
  manifests and call the builder. The static build writes `dist/llms.txt` and
  `dist/zh/llms.txt`.
- **Content-Type.** Verified live on 2026-09-01: Vercel serves `.txt` as
  `text/plain; charset=utf-8` (checked against `/robots.txt` on the `.vercel.app`
  host). No `vercel.json` rule is needed; the Response header in the route covers
  `astro dev` only, as the feeds' does. Post-merge check on the live file; if the
  charset is missing, add two literal `source` rules, one per path (the #174 lesson).
- **Sitemap** excludes endpoints (`rss.xml` is not in it — verified), so the file
  does not appear there. **`check-internal-links`** scans only HTML but resolves any
  existing file, so the About link to `/llms.txt` validates against `dist/`.
- **Discovery for humans:** one sentence in the About page's "What's covered"
  paragraph, both locales, with a `%LLMS%` placeholder filled by
  `localizeHref('/llms.txt', locale)`. No `robots.txt` hint and no `<link>` tag: no
  standard defines either, and tools that look for the file look at the root.

## 5. Tests

Unit, over fixtures (`scripts/__tests__/llms-txt.test.mjs`):

- The first line is the H1; the blockquote follows it.
- Headings appear in section order with the group names; non-adjacent entries with
  the same Concepts group merge into one heading.
- English URLs are absolute on the site origin, never contain `/zh/`, end in `/`;
  Chinese URLs all carry `/zh/`. Grouped-section URLs carry the group segment.
- A blog note ends with its date; a Field Guide entry carries its chapter number and
  no note.
- Each locale's Optional section links the other edition's file.
- A `]` in a title is escaped; a multi-line summary is one line in the output.
- The number of `- [` lines equals the fixture's page count plus the Optional links,
  and the blockquote's page count matches.

Integration: when `dist/` exists, every same-origin URL in `dist/llms.txt` and
`dist/zh/llms.txt` resolves to a built `index.html` (or an existing file, for the
feeds and the other edition). Skipped, not failed, when `dist/` is absent so `npm test`
still passes in a fresh worktree.

Gates before merge: `build`, `verify`, `test`, `search:index && test:search`, and
`test:design` (no page changes, but `main` is at 56/0 and a failure now is ours).

## 6. Not doing

`llms-full.txt` and per-page `.md` variants (§2, C). A Follow-column link: About is
the documented home for how the site works, and the footer would gain a fourth item
for a file only tools read.
