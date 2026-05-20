# Site enhancement research — 20 ideas, ranked

Methodology: five parallel research agents (UX/IA, content, competitor scan, SEO/perf/a11y, engagement) each produced 5–7 idea cards; output was deduped, scored, and tiered into P0/P1/P2.

Artifacts on branch `research/site-enhancements-2026-05-19`:

- Spec: https://github.com/EvanCarson/Agentic-AI-Wiki/blob/research/site-enhancements-2026-05-19/docs/superpowers/specs/2026-05-19-site-enhancement-research-design.md
- Plan: https://github.com/EvanCarson/Agentic-AI-Wiki/blob/research/site-enhancements-2026-05-19/docs/superpowers/plans/2026-05-19-site-enhancement-research.md
- Mockups: https://github.com/EvanCarson/Agentic-AI-Wiki/blob/research/site-enhancements-2026-05-19/docs/research/mockups
- Raw agent reports: https://github.com/EvanCarson/Agentic-AI-Wiki/blob/research/site-enhancements-2026-05-19/docs/research/raw

## P0 — Must-have

- #34 — **Add default OG / Twitter card image across all pages** — Every page is missing og:image and twitter:card image.
- #35 — **Code-block copy button with language badge** — Several Deep-Dive and Concept entries contain <pre> code blocks.
- #36 — **RSS / Atom feed for the Changelog** — The Changelog page already tracks dated content additions and changes, which is exactly the data an RSS feed should expo.
- #37 — **Deep-Dives index group jump-nav** — The Deep-Dives index is a single scrollable page with 75+ entries across 12 groups and no anchor jump-nav at the top.
- #38 — **Mobile prev/next nav on section detail pages** — On screens ≤900px the .chapter-side sidebar is hidden entirely and replaced with a single 'Browse all X →' back-link.

## P1 — High value

- #39 — **Add a 'Multi-Agent Systems' Concept entry** — The Concepts encyclopedia has no entry for multi-agent systems, yet the Deep-Dives section dedicates a full six-essay gr.
- #40 — **Persistent reading progress via localStorage** — The Field Guide is a 22-chapter linear course with no indication of how far a reader has progressed.
- #41 — **In-page scroll-spy table of contents for long entries** — Deep-Dive essays and Concept entries already have rich internal heading structure, but there is no in-page TOC that trac.
- #42 — **Scope Deep-Dives sidebar to current group** — The sidebar on a Deep-Dives detail page renders all 75 entries across all 12 groups — an extremely long, dense list that.
- #43 — **End-of-article 'Graduate to' CTA block** — Every concept and deep-dive article ends with prev/next within-section navigation — good for sequential readers but insu.
- #44 — **Dark mode toggle with system-preference default** — The site uses a fixed light theme with no dark mode toggle and no prefers-color-scheme media query in the CSS.
- #45 — **Add Pagefind section filters to scope search by content type** — The search index is a flat, undifferentiated corpus with no way for users to filter results to a specific section (Field.
- #46 — **Reading-path callout on Concepts and Deep-Dives index pages** — A newcomer landing on /concepts or /deep-dives sees a flat list of grouped entries with no recommended entry point, no s.
- #47 — **Add BreadcrumbList JSON-LD to detail pages; add WebSite JSON-LD to home** — Concept and deep-dive detail pages emit TechArticle JSON-LD but omit BreadcrumbList structured data.

## P2 — Nice-to-have

- #48 — **Expand Retrieval & RAG deep-dive group (currently only 2 entries)** — The Retrieval & RAG deep-dive group has exactly two entries (advanced-rag-architectures and graph-rag), making it the th.
- #49 — **Expand thin AI Ecosystem Concept pages (4 pages under 62 lines)** — Four AI Ecosystem Concept pages — inference-providers (57 lines), agent-frameworks (58 lines), modalities (60 lines), an.
- #50 — **Estimated reading time on Deep-Dive and Concept pages** — Every Deep-Dive and Concept entry can run 5–30 minutes of reading, yet the site shows no reading-time estimate.
- #51 — **Field Guide prev/next label legibility** — The Field Guide prev/next navigation buttons render labels like '0·4 Async Python' and 'I·1 The Loop', where '0' is the .
- #52 — **Add :focus-visible styles for header nav, sidebar links, and locale switcher** — Keyboard users who tab through the site-header nav links, the section sidebar (chapter-side-nav li a), and the locale sw.
- #53 — **Respect prefers-reduced-motion for smooth-scroll and CSS transitions** — guide.css sets html { scroll-behavior: smooth } globally without a @media (prefers-reduced-motion: reduce) override.

---

_This umbrella issue is the entry point. Each P-tagged issue links its mockups directly; close issues individually as they ship or as `wontfix`._
