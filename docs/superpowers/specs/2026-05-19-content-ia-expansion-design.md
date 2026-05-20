# Content IA Expansion — Design

**Date:** 2026-05-19
**Status:** Drafted via brainstorming on 2026-05-19; pending user review before plan.
**Author:** Chen Qian (with Claude)

## 1. Problem & goals

The site has grown to roughly:

- **Field Guide** — 22 chapters (a structured course; not in scope here)
- **Concepts** — 33 entries across 4 groups (AI Foundations, Agentic AI, Building Blocks, AI Ecosystem)
- **Deep-Dives** — ~105 essays across **17 groups**

The top nav has 5 content slots (Field Guide / Concepts / Deep-Dives / Changelog / About) but Deep-Dives alone carries 17 groups and ~105 essays at a single URL prefix. Readers can't form a mental map of the section; everything looks coequal even though some essays are conceptual fundamentals, some are applied playbooks, and some are run-time operational concerns.

**Goals:**

1. Restructure top-level IA so the site's depth is visible without bloating the header.
2. Add a URL hierarchy that reflects the new structure (section → group → entry).
3. Produce a prioritized content backlog of additions the new structure makes obvious — no commitment to write yet.

**Non-goals:**

- Reshaping the Field Guide.
- Re-doing Concepts groups.
- Adding redirects for old Deep-Dives URLs (deliberate trade-off; see §3).
- Writing any of the backlog entries in this PR; this is design + IA only.

## 2. New top-level information architecture

Top nav grows from 5 to 7 slots:

| Slot | EN | ZH | Status |
|---|---|---|---|
| 1 | Field Guide | 实战指南 | unchanged |
| 2 | Concepts | 概念 | unchanged |
| 3 | Deep-Dives | 深度剖析 | scope narrowed |
| 4 | **Playbooks** | **实战手册** | **new** |
| 5 | **Operations** | **运维** | **new** |
| 6 | Changelog | 更新日志 | unchanged |
| 7 | About | 关于 | unchanged |

**Reader mental model:**
- *Deep-Dives* = "how an agent works under the hood" (engineering fundamentals)
- *Playbooks* = "what to build" (applied / domain / role-specific)
- *Operations* = "how to run it" (eval, monitor, cost, safety, governance)

**Group reshuffle (17 → 8 + 4 + 5):**

| Stays in **Deep-Dives** (8) | Moves to **Playbooks** (4) | Moves to **Operations** (5) |
|---|---|---|
| architectures-and-patterns | domain-playbooks | agentops |
| memory-and-context | coding-and-computer-use-agents | evaluation-and-observability |
| retrieval-and-rag | voice-realtime-agents | economics-roi |
| protocols-and-interop | agent-ux-and-human-interaction | governance-compliance |
| tool-capability-design |  | safety-and-security |
| reasoning-and-test-time-compute |  |  |
| training-agentic-models |  |  |
| multi-agent-systems |  |  |

`agent-ux-and-human-interaction` is a judgement call (has both applied and conceptual content). Placed in Playbooks because the bulk of its entries describe applied UX patterns; the few conceptual entries (e.g., `designing-for-trust`, `transparency-and-explainability`) can be cross-linked from Deep-Dives via the `related` mechanism (§4).

## 3. URL structure & file layout

### URL pattern

Three layers per section. The group is **in the URL** so essays self-locate:

```
/<section>/                          ← section landing
/<section>/<group>/                  ← group landing
/<section>/<group>/<slug>            ← entry
```

EN and ZH mirror each other:

```
/deep-dives/architectures-and-patterns/react-pattern
/zh/deep-dives/architectures-and-patterns/react-pattern

/playbooks/coding-and-computer-use-agents/coding-agent-architecture
/zh/playbooks/coding-and-computer-use-agents/coding-agent-architecture

/operations/agentops/incident-response-for-agents
/zh/operations/agentops/incident-response-for-agents
```

### URL move scope

**Every** Deep-Dives essay's URL changes — not just the moved ones — because we're adding the group segment to all. ~52 essays move section (Playbooks/Operations), ~53 stay in Deep-Dives but still gain the `/<group>/` segment.

**No redirects** are added; old `/deep-dives/<slug>` URLs return 404. This was an explicit choice given the site's age and minimal inbound traffic. Acceptable consequence: a brief re-crawl window where Google de-indexes old URLs and indexes new ones. The internal-link sweep (§7) prevents in-site 404s.

### File layout

Extends today's `src/content/deep-dives/groups/*.ts` pattern to each new section:

```
src/content/
  deep-dives/
    groups/                   ← 8 group files remain
      architectures-and-patterns.ts
      memory-and-context.ts
      …
    en/  zh/                  ← HTML fragments stay
    manifest.ts               ← thin aggregator (unchanged shape)
  playbooks/                  ← NEW, mirrors deep-dives shape
    groups/                   ← 4 group files
      domain-playbooks.ts
      coding-and-computer-use-agents.ts
      voice-realtime-agents.ts
      agent-ux-and-human-interaction.ts
    en/  zh/                  ← HTML fragments physically MOVED here
    manifest.ts
  operations/                 ← NEW, mirrors deep-dives shape
    groups/                   ← 5 group files
      agentops.ts
      evaluation-and-observability.ts
      economics-roi.ts
      governance-compliance.ts
      safety-and-security.ts
    en/  zh/                  ← HTML fragments physically MOVED here
    manifest.ts
```

HTML fragments for moved essays are **moved**, not copied. Each section has its own manifest aggregator (mirrors today's `deep-dives/manifest.ts` glob-based pattern).

## 4. Page templates

Three templates, each used by all three sections — parameterized by section, not duplicated.

### 4.1 Section landing (`/<section>/`)

```
[Kicker]   Operations
[H1]       How to run agents in production
[Lede]     One paragraph: what this section covers, who it's for.
[Group grid — N cards, one per group]
  ┌────────────────────────────────────────────┐
  │ AgentOps                                   │
  │ Rolling out, versioning, scaling,          │
  │ recovering from failures.                  │
  │ 6 essays →                                 │
  └────────────────────────────────────────────┘
```

The lede + per-group blurbs use the existing `guide.css` callout vocabulary.

### 4.2 Group landing (`/<section>/<group>/`)

```
[Breadcrumb]  Operations / AgentOps
[H1]          AgentOps
[Lede]        Two sentences: the group's thesis and how its essays connect.
[Reading order]
  1. Rollout & versioning →
  2. Designing for failure →
  3. Idempotency & retries →
  4. Durable state & resumability →
  5. Incident response for agents →
  6. Concurrency & scaling →
[Related]
  • Concepts: the-agent-loop, tools-actions-environments
  • Field Guide: r1 (ship & operate)
  • Other deep-dives: tracing-and-observability
```

Reading order = the order entries appear in the group file (authors curate). Related = the union of related-pointers declared on entries in the group, de-duplicated.

### 4.3 Entry page (`/<section>/<group>/<slug>`)

HTML fragment unchanged. The in-page kicker line updates from
`Deep Dive · <Group>` → `<Section> · <Group>`:

| Section | EN kicker | ZH kicker |
|---|---|---|
| Deep-Dives | `Deep Dive · <Group>` | `深度剖析 · <Group>` |
| Playbooks | `Playbook · <Group>` | `实战手册 · <Group>` |
| Operations | `Operation · <Group>` | `运维 · <Group>` |

Singular kicker noun mirrors the existing "Deep Dive · <Group>" convention.

## 5. Manifest additions

Two optional fields, both bilingual where applicable. Both added to the existing `Entry`/`Group` types used by `deep-dives/groups/*.ts` and inherited by the new sections.

### 5.1 `groupSummary` (per group file)

```ts
// in playbooks/groups/coding-and-computer-use-agents.ts
export default {
  key: 'coding-and-computer-use-agents',
  order: 2,
  title: L('Coding & computer-use agents', '编码与计算机使用智能体'),
  groupSummary: L(
    'Agents that read code, write code, run tools, and drive a computer — the patterns, harnesses, and pitfalls.',
    '能读代码、写代码、运行工具并驱动计算机的智能体——它们的模式、外壳与陷阱。'
  ),
  entries: [ … ]
}
```

One source of truth: used on the section landing card AND as the group landing's lede. Prevents drift between the two.

### 5.2 `related` (per entry, optional)

```ts
{
  slug: 'incident-response-for-agents',
  …,
  related: {
    concepts:    ['the-agent-loop'],
    fieldGuide:  ['r1'],
    deepDives:   ['tracing-and-observability'],
    playbooks:   [],
    operations:  []
  }
}
```

Used by the group landing's "Related" block. Optional — omitted entries don't render. The group landing computes the union across its entries and de-duplicates.

## 6. i18n, navigation chrome, search, sitemap

### 6.1 `src/i18n/ui.ts`

Adds:
- `nav.playbooks` (EN `Playbooks` / ZH `实战手册`)
- `nav.operations` (EN `Operations` / ZH `运维`)
- `playbooks: { metaTitle, metaDesc, h1, tagline, emptyHtml }` mirror of `deepDives`
- `operations: { metaTitle, metaDesc, h1, tagline, emptyHtml }` mirror of `deepDives`
- Updates `deepDives.tagline` to reflect narrower scope:
  - EN: `Engineering fundamentals — architectures, memory, RAG, protocols, tools, reasoning, training, multi-agent.`
  - ZH: `工程基础 —— 架构、记忆、RAG、协议、工具、推理、训练、多智能体。`

`UIStrings` interface gets `playbooks` and `operations` fields with the same shape as `deepDives`.

### 6.2 Header / footer

Header nav: 7 items. Verify visually that the desktop row still fits at the existing brand-width — current header already uses a wrap-friendly layout, but check at 1024px and 1280px. Mobile drawer already handles overflow.

If the footer lists sections, mirror the additions there.

### 6.3 Breadcrumbs

| Page | Breadcrumb |
|---|---|
| Section landing | (none — kicker only) |
| Group landing | `<Section> / <Group>` |
| Entry | `<Section> / <Group> / <Entry title>` |

EN/ZH labels read from `ui.ts`.

### 6.4 Search

`src/scripts/search.*`:
- Index all entries from all 5 content sources: FG, Concepts, Deep-Dives, Playbooks, Operations.
- Add a **section facet** to result chips: `[Field Guide]`, `[Concept]`, `[Deep-Dive]`, `[Playbook]`, `[Operation]` (singular, mirroring kicker convention).
- Group label remains the secondary chip.
- Bilingual facet labels via `ui.ts`.

### 6.5 Sitemap

`src/pages/sitemap.xml.ts`:
- Emit every new section landing, group landing, and entry — EN and ZH.
- Drop old `/deep-dives/<slug>` URLs entirely. (No redirects, by §3 decision → Google drops them on next crawl.)
- One `lastmod` per route, ISO date.

### 6.6 RSS / Atom

If a feed exists, mirror the URL changes; otherwise skip.

### 6.7 robots.txt

Unchanged.

## 7. Internal cross-link sweep

The single most consequential operational task in this refactor. Every URL changes, so every internal reference must be rewritten in the same PR.

**Mechanical sweep:**
```bash
rg -n "/deep-dives/[a-z]" src/ public/
```
For every hit, rewrite to the new `/<section>/<group>/<slug>` form. Hit locations expected:
- HTML fragments under `src/content/**/en/*.html` and `src/content/**/zh/*.html` (inline `<a href>` to other essays)
- Field Guide chapters that link out to deep-dives
- About copy in `src/i18n/ui.ts` (`coveredHtml` etc.) — but those use the top-level `/deep-dives/` index, so likely unchanged
- Concepts that cross-reference deep-dives
- Home page's `latest` block
- Search index data, if pre-baked
- Sitemap generator

**One-off verification script:** `scripts/check-internal-links.mjs`
- Walks built `dist/`
- For every internal `<a href>` (not external), asserts the target file exists in `dist/`
- Reports broken links with file + line
- Wired into `npm run verify` so any future drift is caught at the gate

## 8. Verification & tests

### 8.1 Manifest tests (extends `deep-dives-manifest.test.mjs`)

For each of the 3 sections (`deep-dives`, `playbooks`, `operations`):
- Shape valid (every entry has `slug`, `title`, `summary`; every group has `key`, `order`, `title`, `groupSummary`)
- Slug uniqueness within a section
- Group keys unique within a section
- Bilingual fragments exist (`en/<slug>.html` AND `zh/<slug>.html`) for every slug
- Every `related` slug actually resolves to an entry in its declared source

### 8.2 Existing gates (CLAUDE.md)

All must pass:
```
npm run build      # static build to dist/
npm run verify     # bilingual completeness / no orphans
npm test           # extraction unit tests + new manifest tests
```

`npm run verify` now also invokes `scripts/check-internal-links.mjs`.

## 9. Changelog

**One concise entry** (not a multi-bullet wall). Single bilingual title + 2–3 bullets at most:

- EN title: `Restructured site IA — added Playbooks and Operations sections`
- ZH title: `调整站点信息架构 —— 新增"实战手册"与"运维"板块`
- Bullets cover: new sections, URL pattern change, no redirects (heads-up to anyone with bookmarks).

File: `src/content/changelog/entries/<merge-date>-ia-restructure-playbooks-operations.ts`. Date matches actual merge day per CLAUDE.md convention.

## 10. Out-of-scope follow-ups (Part B — content backlog)

A prioritized list of gaps the new structure exposes. **Backlog only — no commitment to write in this PR.** Tackled in separate PRs after IA lands.

Priority tags:
- **P0** — needed so the section feels coherent at launch
- **P1** — high-leverage near-term additions
- **P2** — nice-to-have, opportunistic

### 10.1 Concepts (beginner mirrors for deep-dive-only topics)

| Slug (proposed) | Group | Priority |
|---|---|---|
| `guardrails-101` | Building Blocks | **P0** |
| `prompt-injection-101` | Agentic AI | **P0** |
| `evals-101` | Building Blocks | **P0** |
| `mcp-and-tool-standards-101` | Ecosystem | P1 |
| `memory-101` | Agentic AI | P1 |
| `multi-agent-101` | Agentic AI | P1 |
| `observability-and-tracing-101` | Building Blocks | P1 |
| `fine-tuning-vs-rag` | Ecosystem | P1 |
| `cost-and-token-economics-101` | Ecosystem | P2 |
| `latency-basics` | Building Blocks | P2 |

### 10.2 Deep-Dives (no P0 — section is already coherent post-slim)

| Group | P1 | P2 |
|---|---|---|
| architectures-and-patterns | spec-driven agents, agent state machines | event-driven agents |
| memory-and-context | context engineering, hierarchical memory, episodic vs semantic | summary buffers |
| retrieval-and-rag | agentic RAG, query rewriting, multi-hop retrieval, retrieval eval | corrective RAG |
| protocols-and-interop | MCP transport deep-dive, agent cards / AGNTCY, OAuth for agents | A2A vs MCP comparison |
| tool-capability-design | streaming tools, tool versioning, idempotent tools | tool registries |
| reasoning-and-test-time-compute | parallel sampling, deliberation budgets | scratchpads |
| training-agentic-models | synthetic data for agents, RL environment design | tool-use distillation |
| multi-agent-systems | coordination protocols, role specialization | agent marketplaces |

### 10.3 Playbooks (new section needs launch P0s)

| Group | P0 | P1 | P2 |
|---|---|---|---|
| domain-playbooks | finance-agents, healthcare-agents, legal-agents | research-agents-applied, HR/recruiting agents | education agents |
| coding-and-computer-use-agents | browser-agents, IDE-agents | terminal-agents, mobile-app agents | game-playing agents |
| voice-realtime-agents | outbound-voice-agents | multilingual voice, voice-agent-eval | voice + vision |
| agent-ux-and-human-interaction | progressive-disclosure-ux | agent-personas, conversation-repair | accessibility for agents |

### 10.4 Operations (new section needs launch P0s)

| Group | P0 | P1 | P2 |
|---|---|---|---|
| agentops | feature-flags-for-agents, kill-switches | canary-rollouts-for-agents | blue-green for agents |
| evaluation-and-observability | online-vs-offline-evals | trace-driven-evals, eval-data-versioning | eval-cost-management |
| economics-roi | per-customer-economics | model-arbitrage, prompt-cost-ladders | usage-pricing patterns |
| governance-compliance | EU-AI-Act-for-agents, NIST-AI-RMF-for-agents | vendor-risk-for-agent-deps | model-cards-for-agents |
| safety-and-security | scoped-credentials-for-agents, agent-identity | SSRF-and-network-isolation, data-exfil-patterns-deep | supply-chain risk |

### 10.5 Cross-cutting (optional)

| Item | Priority | Notes |
|---|---|---|
| `/paths/` page — curated reading paths by audience (engineer, PM, exec, security) | P1 | Uses existing entries; no new content needed initially |
| Antipatterns index — cross-section collection | P2 | Tag-based, no new URLs |
| "What's new in agents" rolling brief | P2 | Separate cadence from site changelog |

### 10.6 Totals

- **10** new Concepts (3 P0 / 5 P1 / 2 P2)
- **29** new Deep-Dives (0 P0 / 21 P1 / 8 P2)
- **19** new Playbooks (7 P0 / 8 P1 / 4 P2)
- **21** new Operations (8 P0 / 8 P1 / 5 P2)
- **~80** new entries total over time; **18 P0** needed for launch coherence

## 11. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Every URL changes → temporary SEO de-indexing | Accepted trade-off (site is young, minimal inbound). Sitemap submitted on deploy speeds re-crawl. |
| In-site 404s from missed internal links | `scripts/check-internal-links.mjs` runs in `npm run verify`; PR cannot merge with broken internal links. |
| Header overflow at narrow desktop widths | Visual check at 1024px / 1280px before merge; mobile drawer already covers small screens. |
| Group landing pages feel empty for groups with 4 entries | `groupSummary` + `related` block keep the page substantive even with few entries. |
| Refactor PR is large and risky | This spec stays IA-only; backlog content lands in separate, small PRs afterwards. |

## 12. Out of scope (explicit)

- Writing any backlog entries (§10).
- Changing the Field Guide structure.
- Reshuffling Concept groups.
- Adding tags / audience facets (`/paths/` is a P1 follow-up).
- Adding URL redirects (deliberate choice, §3).
- Any visual redesign beyond what's needed to surface the new sections.
