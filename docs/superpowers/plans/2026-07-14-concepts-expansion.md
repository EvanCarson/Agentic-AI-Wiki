# Plan — Concepts expansion (5 pages)

**Issue:** #93 · **Branch:** `concepts-expansion-1` · **Merge target:** `main`

## Why

The Concepts encyclopedia teaches the fundamentals but is missing the five
topics that now define day-to-day agent work in 2026. Each already has
*deep-dive* coverage on the site but no entry-level concept — a reader who
lands on "the agent loop" has nowhere beginner-level to learn what MCP is,
how an agent remembers anything, or what "context engineering" means. These
are the highest-value gaps: durable fundamentals, high search intent, and
they connect the existing beginner ladder to the advanced deep-dive groups.

## The five pages

| Code | Slug | Title | Group |
|---|---|---|---|
| E10 | `what-is-mcp` | What Is the Model Context Protocol (MCP)? | The AI Model & Tooling Ecosystem |
| A10 | `agent-memory` | Agent Memory: Short-Term vs Long-Term | Agentic AI Explained |
| A11 | `computer-use` | Computer Use & GUI Agents | Agentic AI Explained |
| B11 | `context-engineering` | Context Engineering | Core Building Blocks |
| B12 | `fine-tuning-vs-rag-vs-prompting` | Fine-Tuning, RAG, or Prompting? | Core Building Blocks |

## Format (match existing concept fragments)

- `<section class="phase">` → `<div class="phase-num">CODE</div>` → `<div class="week">BREADCRUMB</div>` → `<h2>Title.</h2>` → `<p class="goal">HOOK LEDE</p>` → 3–4 `<div class="step">` blocks (each `<div class="step-num">STEP n</div>` + `<h3>` + prose/`<ul>`/`.callout`).
- Reference: `src/content/concepts/{en,zh}/reasoning-models.html`.
- Breadcrumbs: Ecosystem `Concepts · The AI Model & Tooling Ecosystem` / `概念 · AI 模型与工具生态`; Agentic `Concepts · Agentic AI Explained` / `概念 · 智能体 AI 详解`; Building `Concepts · Core Building Blocks` / `概念 · 核心构件`.
- Hook-lede rule (CLAUDE.md): stakes first, takeaway in first 30 words, no TL;DR/Overview label.
- Bilingual: en + zh faithful (not byte-mirror); `<pre>` byte-identical; zh full-width punctuation; product names/identifiers stay English.
- Cross-links use `.xref`; zh internal links get `/zh` prefix.

## Execution

1. Grounding research agent → per-topic fact-sheet (durable facts, verified proper nouns). ✅ dispatched.
2. Manifest: append all 5 `Entry` rows at EOF of `concepts/manifest.ts` (groupedEntries merges by group key → each lands at the end of its group bucket).
3. Dispatch 5 content subagents in parallel — each owns ONLY its `en/<slug>.html` + `zh/<slug>.html` (disjoint files, no shared-file race). Manifest owned by orchestrator.
4. Changelog entry `entries/2026-07-14-concepts-expansion.ts`.
5. Gates: `npm run build` (no new warnings), `npm run verify`, `npm test`. Then live-verify after merge.

## Guardrails for content subagents

- Integrity check after writing: en file is English, zh file is Chinese (linters can swap them).
- No fabricated stats; durable mechanics over volatile numbers.
- Xref targets must exist — verify slug lives in the group you link to.
- Each page ends by pointing to its advanced deep-dive group on-site.
