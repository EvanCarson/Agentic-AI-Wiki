# Multi-Agent Wiki Content Enrichment — Design

Date: 2026-05-18
Status: Approved
Repo: EvanCarson/Agentic-AI-Wiki (Astro static site, bilingual en/zh, Vercel auto-deploy)

## Goal

Enrich the Agentic AI Wiki beyond the existing technical Field Guide by adding
two new bilingual sections — a beginner→intermediate **Concepts** encyclopedia
and **Deep-Dives** advanced posts — produced by a coordinated fleet of 16 agents
that log their research as structured GitHub Issues and deliver one consolidated
PR with screenshots.

## Content Architecture

Two new content collections, separate from `field-guide`, both authored in
English + Chinese (matching existing `Localized` pattern):

- **`/concepts`** — "AI & Agentic AI Explained". Encyclopedia entries for
  newcomers and intermediates: what is AI/ML, LLMs, tokens & embeddings, the
  agent loop, RAG, tool use, memory, the model & tooling ecosystem.
- **`/deep-dives`** — advanced practitioner essays: agent architectures &
  patterns, agent protocols & interop (MCP / A2A / function calling), memory &
  context engineering, safety/alignment/agentic security.

Implementation surface:

- `src/content/config.ts` — add `concepts` and `deep-dives` collections with
  schemas (title `Localized`, summary, order, tags, updated date).
- Routes: `src/pages/concepts/index.astro`, `concepts/[slug].astro`,
  `deep-dives/index.astro`, `deep-dives/[slug].astro` + `/zh` mirrors.
- Section index/manifest files listing ordered entries (mirrors the
  `field-guide/manifest.ts` pattern).
- `SiteHeader` nav links + `src/i18n/ui.ts` keys for new sections.
- Content files live under `src/content/concepts/{en,zh}/` and
  `src/content/deep-dives/{en,zh}/` (MDX or HTML consistent with existing).

## Agent Fleet (16 agents, 5 phases)

**Conflict-avoidance contract:** shared files (`config.ts`, route pages, nav,
i18n, section index/manifest files) are edited ONLY in the sequential
Scaffold (Phase 1) and Integrate (Phase 3) phases. Parallel content agents
(Phase 2) and QA agents (Phase 4) write ONLY their own disjoint files. All work
on one branch `feat/wiki-content-enrichment` in an isolated git worktree.

| Phase | Agents | Mode | Responsibility |
|---|---|---|---|
| 0 Recon | R1 | seq | Build site, screenshot current state, create master tracking Issue + per-area sub-Issues with labels |
| 1 Scaffold | A1 | seq | Add collections, routes, nav, i18n, empty section indexes; commit with build green |
| 2 Content | C1–C8 | parallel | Each files its own Issue (research + sources + outline), then writes bilingual content into its own dedicated files |
| 3 Integrate | I1 | seq | Register all entries in section manifests, cross-links, run build+verify+test, fix breakage |
| 4 QA | Q1–Q4 | parallel | Accessibility/responsive, SEO/metadata, content fact-check & editorial consistency, visual-design consistency + screenshots |
| 5 Finalize | orchestrator | seq | Full screenshot set, open one consolidated PR linking/closing all Issues |

### Phase 2 content agents (≥5 on distinct AI topics)

Concepts:
- C1 — AI Foundations 101 (AI/ML, neural nets, LLMs, training vs inference, tokens, embeddings)
- C2 — Agentic AI Explained (what is an agent, the loop, autonomy levels, agents vs chatbots vs workflows)
- C3 — Core Building Blocks (prompting basics, RAG explained, tool use, memory, context windows)
- C4 — The AI Model & Tooling Ecosystem (model families, providers, modalities, open vs closed)

Deep-Dives:
- C5 — Agent Architectures & Design Patterns (ReAct, plan-execute, reflection, orchestration)
- C6 — Agent Protocols & Interop (MCP, A2A, function/tool-calling standards)
- C7 — Memory & Context Engineering (short/long-term memory, compaction, retrieval-augmented memory)
- C8 — Safety, Alignment & Agentic Security (prompt injection, guardrails, red-teaming, agentic risk)

## GitHub Logging

- One **master tracking Issue**: checklist of all areas, labels
  `enhancement` + `documentation`.
- One **sub-Issue per content area** (C1–C8): research summary, authoritative
  sources, proposed outline, acceptance criteria; cross-linked to master.
- Single consolidated PR at the end; body links and closes all Issues and
  embeds screenshots.

## Screenshots

Add `playwright` + Chromium as devDependencies. A capture script renders
desktop (1280px) + mobile (390px) shots of new pages against the built site
(`astro build` → `astro preview`). Images uploaded and embedded in the PR via
`gh`.

## Risks & Mitigations

- Parallel git writes → strict per-agent file ownership; shared files only in
  sequential phases.
- 16 agents = high token cost → accepted per explicit "15+" request; recon +
  scaffold gate before the expensive parallel wave.
- Content accuracy → dedicated Phase-4 fact-check + editorial agent over all
  new content.
- Vercel auto-PR bot exists on this repo → we open our own PR explicitly and do
  not depend on the bot.

## Success Criteria

- `npm run build`, `npm run verify`, `npm test` all pass on the branch.
- `/concepts` and `/deep-dives` (+ `/zh` mirrors) render with ≥8 new bilingual
  entries, reachable from site nav.
- Master Issue + 8 sub-Issues filed and cross-linked.
- One consolidated PR open with screenshots, linking all Issues.
