# Orchestration-Framework Comparison Post — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the AI Blog's third post — *LangGraph vs CrewAI vs Claude Managed Agents vs OpenAI Agents SDK: Four Architectures of the Orchestration Layer* — bilingual, diagram-rich, passing all gates, with "where does your agent's state live?" as the spine.

**Architecture:** The `/blogs` section infrastructure already exists (BlogLayout, manifest glob, tag pages, OG keys, nav). This plan only authors a new post: metadata under `src/content/blogs/posts/`, bilingual fragments under `src/content/blogs/{en,zh}/`, ~12 co-located SVGs under `public/blogs/<slug>/`, and a changelog entry. No section/infra code changes.

**Tech Stack:** Astro 4 (static), TypeScript, Node test runner (`node --test --experimental-strip-types`), Pagefind, Vercel build pipeline. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-05-28-blog-orchestration-framework-comparison-design.md` (read it — it carries the thesis, per-section talking points, and the four load-bearing decisions the prose must land).

**Authoring guide:** `src/content/blogs/AUTHORING.md` is normative for HTML skeleton, SVG conventions, FAQ JSON-LD rules, and the `is:global` gotcha. Match the first post file-for-file in shape.

**Slug:** `langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk`

**Branch / worktree:** `feature/blog-orchestration-framework-comparison-2026-05-28` in `.worktrees/blog-orchestration-framework-comparison`. Branch from **`origin/main`** (local `main` lags origin here). Run all commands from that worktree directory.

**Note on dates:** Written 2026-05-28. The post `date` field, both filename prefixes (post + changelog), and the snapshot-date note must equal the **merge day**. Use `2026-05-28` as the working date; rename + bump if the calendar moves before merge.

**Conventions reminder:**
- Bilingual en/zh; identical structural HTML; `<pre>` (if any) byte-identical; zh internal links use the `/zh/` prefix.
- Hook lede opener, no `TL;DR`/label (`CLAUDE.md`).
- SVG colors are CSS vars only; every SVG has `role="img"` + `<title>` + `<desc>`; no `<script>`/`on*=`.
- All internal links target **pre-existing** pages — the intra-PR forward-link gate gotcha does **not** apply.
- All edits inside the worktree, never on `main`.

---

## Task 1: Create the worktree and move the spec in

**Files:**
- Create: `.worktrees/blog-orchestration-framework-comparison/` (worktree)
- Move: the spec + this plan into the worktree's tree

- [ ] **Step 1: Fetch and create the worktree from origin/main**

```bash
git fetch origin
git worktree add -b feature/blog-orchestration-framework-comparison-2026-05-28 .worktrees/blog-orchestration-framework-comparison origin/main
```
Expected: `Preparing worktree ... HEAD is now at <sha>`.

- [ ] **Step 2: Copy spec + plan into the worktree**

```bash
cp docs/superpowers/specs/2026-05-28-blog-orchestration-framework-comparison-design.md \
   .worktrees/blog-orchestration-framework-comparison/docs/superpowers/specs/
cp docs/superpowers/plans/2026-05-28-blog-orchestration-framework-comparison.md \
   .worktrees/blog-orchestration-framework-comparison/docs/superpowers/plans/
```

- [ ] **Step 3: cd in, install, baseline build**

```bash
cd .worktrees/blog-orchestration-framework-comparison && npm ci && npm run build
```
Expected: build completes, no warnings — green baseline.

- [ ] **Step 4: Commit spec + plan**

```bash
git add docs/superpowers/specs/2026-05-28-blog-orchestration-framework-comparison-design.md docs/superpowers/plans/2026-05-28-blog-orchestration-framework-comparison.md
git commit -m "docs: spec + plan for orchestration-framework comparison post"
```

---

## Task 2: Scaffold post metadata + stub fragments (structural gate)

**Files:**
- Create: `src/content/blogs/posts/2026-05-28-langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk.ts`
- Create: `src/content/blogs/en/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk.html`
- Create: `src/content/blogs/zh/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk.html`
- Test: `scripts/__tests__/blogs.test.mjs` (existing — do not edit)

- [ ] **Step 1: Run the blogs test for a baseline**

Run: `node --test --experimental-strip-types scripts/__tests__/blogs.test.mjs`
Expected: PASS on the current tree.

- [ ] **Step 2: Write the post metadata file**

Create the posts file:
```ts
import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-05-28',
  slug: 'langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk',
  title: L(
    'LangGraph vs CrewAI vs Claude Managed Agents vs OpenAI Agents SDK: Four Architectures of the Orchestration Layer',
    'LangGraph、CrewAI、Claude Managed Agents 与 OpenAI Agents SDK：编排层的四种架构',
  ),
  summary: L(
    'Four orchestration frameworks let you wire up the same workflow — and the feature lists nearly match. The thing that decides which one survives production is invisible there: where your agent’s state actually lives.',
    '四款编排框架都能搭起同一个工作流，功能清单也几乎一致。真正决定谁能扛住生产环境的那一点却看不见：你的智能体状态究竟存在哪里。',
  ),
  tags: ['agent-comparison', 'architecture', 'agent-frameworks', 'orchestration'],
};

export default post;
```

- [ ] **Step 3: Create stub bilingual fragments**

`en/...html`:
```html
<p class="lede">STUB — replaced in Task 7.</p>
```
`zh/...html`:
```html
<p class="lede">占位 —— 将在任务 7 中替换。</p>
```

- [ ] **Step 4: Run blogs test + build**

Run: `node --test --experimental-strip-types scripts/__tests__/blogs.test.mjs && npm run build`
Expected: blogs test PASS (slug unique, date prefix `2026-05-28`, tags valid, both fragments exist); build emits `/blogs/<slug>/index.html` + `/zh/blogs/<slug>/index.html`.

- [ ] **Step 5: Commit**

```bash
git add src/content/blogs/posts/2026-05-28-langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk.ts src/content/blogs/en/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk.html src/content/blogs/zh/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk.html
git commit -m "feat(blog): scaffold orchestration-framework comparison post"
```

---

## Task 3: Author the four logo SVGs

**Files:**
- Create: `public/blogs/<slug>/logos/langgraph.svg`
- Create: `.../logos/crewai.svg`
- Create: `.../logos/claude-managed-agents.svg`
- Create: `.../logos/openai-agents-sdk.svg`

(`<slug>` = `langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk` throughout.)

- [ ] **Step 1: Create the directory**

`mkdir -p public/blogs/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk/logos`

- [ ] **Step 2: Author each 32×32 logo**

Same rules as the first post's logos: `viewBox="0 0 32 32"`, `role="img"`, `aria-label="<Name> logo"`, CSS-var colors, a clean abstract monogram per product (do not reproduce trademarked marks pixel-for-pixel). Skeleton:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="LangGraph logo">
  <rect x="2" y="2" width="28" height="28" rx="6" fill="var(--accent, #d4421e)" />
  <path d="M..." fill="var(--paper)" />
</svg>
```
Acceptance: 4 valid SVGs, distinct glyphs, no scripts.

- [ ] **Step 3: Verify parse + commit**

```bash
for f in public/blogs/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk/logos/*.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8'));console.log('ok','$f')"; done
git add public/blogs/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk/logos
git commit -m "feat(blog): orchestration-framework logos"
```

---

## Task 4: Author the four architecture SVGs

**Files:**
- Create: `public/blogs/<slug>/arch-langgraph.svg`
- Create: `public/blogs/<slug>/arch-crewai.svg`
- Create: `public/blogs/<slug>/arch-claude-managed-agents.svg`
- Create: `public/blogs/<slug>/arch-openai-agents-sdk.svg`

- [ ] **Step 1: `arch-langgraph.svg`**

`viewBox="0 0 900 500"`, AUTHORING §3 skeleton. Boxes: **graph** of nodes (hero) with **conditional edges** drawn between them; an explicit **state object** box that nodes read/write (emphasize it — this is the thesis); a **checkpointer** box wired to the state (durability/replay). Hero `var(--accent)`; state object `var(--accent-soft)` and prominently labeled; arrows `currentColor`. `<title>`: "LangGraph architecture".

- [ ] **Step 2: `arch-crewai.svg`**

Boxes: **crew** (hero) containing **role-agents** (e.g. Researcher / Writer / Reviewer); a **tasks** list; a **process** selector (sequential vs hierarchical). Show context threaded implicitly between agents (lighter arrows, no explicit external state store — contrast with LangGraph). `<title>`: "CrewAI architecture".

- [ ] **Step 3: `arch-claude-managed-agents.svg`**

Draw a clear **client | server** split (dashed boundary). Client side: submit goal, poll/stream. Server side (hero, enclosing): the **agent loop**, **tool execution**, and the **state** held server-side (label it "state lives here" to land the thesis). `<title>`: "Claude Managed Agents architecture".

- [ ] **Step 4: `arch-openai-agents-sdk.svg`**

Boxes: **Runner** loop (hero) → **Agent** (instructions + tools) → **handoffs** to other agents → **guardrails** (input/output) → **session** (process-local state, label as ephemeral-unless-persisted). `<title>`: "OpenAI Agents SDK architecture".

- [ ] **Step 5: Verify parse + commit**

Parse loop over `arch-*.svg`; expect `ok` ×4.
```bash
git add public/blogs/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk/arch-*.svg
git commit -m "feat(blog): orchestration architecture diagrams"
```

---

## Task 5: Author the feature-matrix heatmap SVG

**Files:**
- Create: `public/blogs/<slug>/data-feature-matrix.svg`

- [ ] **Step 1: Author the heatmap**

`viewBox="0 0 900 500"`. Rows = LangGraph, CrewAI, Claude Managed Agents, OpenAI Agents SDK. Columns = **State durability · Control-flow · Multi-agent first-class · Streaming · Human-in-the-loop · Self-hosted vs managed**. Levels weak `var(--paper-2)` / medium `var(--accent-soft)` / strong `var(--accent)`; 1–2 word cell labels; bottom legend; `role="img"` + `<title>`/`<desc>`; no caption text inside.

Cell guidance (relative contrast, snapshot-dependent — verify against current docs):
- LangGraph: State=Checkpointed(strong) · Control-flow=Graph(strong) · Multi-agent=Subgraphs(strong) · Streaming=Yes(strong) · HITL=Yes(strong) · Hosting=Self/Platform(medium)
- CrewAI: State=In-memory(weak) · Control-flow=Roles+tasks(medium) · Multi-agent=Native(strong) · Streaming=Partial(medium) · HITL=Limited(weak) · Hosting=Self(medium)
- Claude Managed Agents: State=Server-held(strong) · Control-flow=Server loop(medium) · Multi-agent=Single harness(weak — NOT multi-agent-first; do not claim sub-agents as a headline primitive) · Streaming=Yes(strong) · HITL=Steer via events(medium) · Hosting=Managed(strong — but the Environment can be a self-hosted sandbox on your own infra)
- OpenAI Agents SDK: State=Session(medium — in-memory default, pluggable backends, no built-in checkpoint/replay) · Control-flow=Code+handoffs(medium) · Multi-agent=Handoffs(medium) · Streaming=Yes(strong) · HITL=Guardrails(medium) · Hosting=Self(medium)

**Grounding facts (from the May-2026 research pass — use these; they correct training-memory defaults):** Claude Managed Agents = Anthropic's managed harness (launched 2026-04-08, beta; header `managed-agents-2026-04-01`), server-side stateful Sessions (history/container/outputs on Anthropic infra), SSE streaming, steer/interrupt by sending events; distinct from the Claude Agent SDK which runs in your env. LangGraph = pluggable checkpointers (in-memory/SQLite/Postgres/…) + durable execution & replay; LangGraph Platform exists (now under "LangSmith Deployment" branding — hedge the exact label). CrewAI = independent of LangChain now (historically built on it), Crews + Flows (Flows carry explicit event-driven state), native MCP + A2A. OpenAI Agents SDK = Sessions in-memory by default, handoffs for multi-agent, runs Claude/other models via the bundled LiteLLM adapter (e.g. `LitellmModel(model="anthropic/claude-opus-4-7")`). Avoid specific pricing numbers (low confidence).

- [ ] **Step 2: Verify parse + commit**

```bash
node -e "require('node-html-parser').parse(require('fs').readFileSync('public/blogs/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk/data-feature-matrix.svg','utf8'));console.log('ok')"
git add public/blogs/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk/data-feature-matrix.svg
git commit -m "feat(blog): orchestration feature matrix"
```

---

## Task 6: Author the three cross-cutting comparison SVGs

**Files:**
- Create: `public/blogs/<slug>/compare-state.svg`
- Create: `public/blogs/<slug>/compare-control-flow.svg`
- Create: `public/blogs/<slug>/compare-multi-agent.svg`

- [ ] **Step 1: Author all three**

Each `viewBox="0 0 900 300"`, **four columns** at x=125 / 375 / 625 / 875. Column header = framework; body = its stance on the axis. Accent the most-distinctive cell per axis. `role="img"` + `<title>`/`<desc>`.
- `compare-state.svg` — where state lives & durability (checkpointed object / in-memory crew / server-held / process session). This is the headline figure — make the contrast vivid.
- `compare-control-flow.svg` — control-flow model (graph edges / roles+tasks / server loop / code+handoffs).
- `compare-multi-agent.svg` — multi-agent stance (LangGraph subgraphs / CrewAI native crews / Claude Managed single harness — not multi-agent-first / OpenAI SDK handoffs).

- [ ] **Step 2: Verify parse + commit**

Parse loop over `compare-*.svg`; expect `ok` ×3.
```bash
git add public/blogs/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk/compare-*.svg
git commit -m "feat(blog): orchestration cross-cutting comparisons"
```

---

## Task 7: Write the English body fragment

**Files:**
- Modify: `src/content/blogs/en/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk.html` (replace stub)

Content authoring against the fixed structure below. Substance from spec §3–§9. Land the thesis (state ownership is the differentiator) and write **comparatively** in the cross-cutting section.

- [ ] **Step 1: Replace the stub with the full structure**

1. `<p class="lede">` — spec §3 en draft, **insert the "as of late May 2026" phrase** (the spec draft omits it on purpose).
2. `<section><h2>At a glance</h2>` — orienting sentence; 4-row `<table>` (Framework · Released / maintainer · Primary niche · Where it runs) with logo `<img>` in the first cell (`/blogs/<slug>/logos/<name>.svg`, 24×24); muted snapshot `<p>` note (spec §7); feature-matrix `<figure>` (`data-feature-matrix.svg`, 900×500, `loading="lazy"`).
3. `<section><h2>LangGraph — deep dive</h2>` — `<figure>` `arch-langgraph.svg`; `<h3>`: graph nodes & edges; the state object; the checkpointer / durability. Inline-link `/concepts/the-agent-loop`, `/deep-dives/architectures-and-patterns/plan-and-execute`, `/deep-dives/memory-and-context/short-vs-long-term-memory`.
4. `<section><h2>CrewAI — deep dive</h2>` — `<figure>` `arch-crewai.svg`; `<h3>`: crew/agent/task model; sequential vs hierarchical process; where context is threaded implicitly. Inline-link `/deep-dives/multi-agent-systems/supervisor-worker-pattern`.
5. `<section><h2>Claude Managed Agents — deep dive</h2>` — `<figure>` `arch-claude-managed-agents.svg`; `<h3>`: client/server split; server-side loop & tool execution; what you give up and gain by not holding the state.
6. `<section><h2>OpenAI Agents SDK — deep dive</h2>` — `<figure>` `arch-openai-agents-sdk.svg`; `<h3>`: agents + tools; handoffs; guardrails & sessions. Inline-link `/deep-dives/architectures-and-patterns/single-vs-multi-agent`.
7. `<section><h2>Cross-cutting comparison</h2>` — three `<h3>` + `<figure>` + comparative `<p>` units: Where state lives & durability (`compare-state.svg`); Control-flow model (`compare-control-flow.svg`); Multi-agent stance (`compare-multi-agent.svg`). Then a short `<h3>` "Where it runs & who operates it" with a small inline 4-row table. Link `/deep-dives/multi-agent-systems/multi-agent-when-and-why`, `/deep-dives/multi-agent-systems/multi-agent-topologies`, `/concepts/planning-and-termination` where natural.
8. `<section><h2>When to pick which</h2>` — `<table>`: Use case · Pick LangGraph if… · Pick CrewAI if… · Pick Claude Managed if… · Pick OpenAI Agents SDK if… (4–5 rows: durable long-running workflow, quick role-based prototype, don't-want-to-run-infra, minimal/code-first, complex branching control flow).
9. `<section class="faq"><h2>FAQ</h2>` — the six spec §6 questions, each `<h3>` immediately followed by exactly one `<p>`. No nested `<section>`.
10. `<section><h2>Further reading</h2>` — `<h3>On this wiki:</h3>` `<ul>` linking `/concepts/agent-frameworks`, `/concepts/the-agent-loop`, `/deep-dives/multi-agent-systems/supervisor-worker-pattern`; `<h3>Project sources:</h3>` `<ul>` each project's docs/repo.

- [ ] **Step 2: Build + confirm JSON-LD**

Run: `npm run build`
```bash
grep -o '"@type":"BlogPosting"' dist/blogs/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk/index.html
grep -o '"@type":"FAQPage"' dist/blogs/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk/index.html
```
Expected: both match once; no new warnings.

- [ ] **Step 3: Commit**

```bash
git add src/content/blogs/en/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk.html
git commit -m "feat(blog): orchestration comparison — English body"
```

---

## Task 8: Write the Chinese body fragment

**Files:**
- Modify: `src/content/blogs/zh/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk.html` (replace stub)

- [ ] **Step 1: Mirror en structure with faithful zh prose**

Identical structural HTML; faithful (not byte-mirror) translation. Keep product names + technical terms in English (LangGraph, CrewAI, Claude Managed Agents, OpenAI Agents SDK, checkpointer, handoffs, guardrails, session, API). Full-width zh punctuation in prose. **Every internal link gets the `/zh/` prefix.** zh lede from spec §3 zh draft + the "截至 2026 年 5 月下旬" snapshot phrase. Image `src` identical to en.

- [ ] **Step 2: Build + verify**

Run: `npm run verify`
Expected: build passes; bilingual check passes; `check-internal-links.mjs` resolves all links incl. `/zh/...`; `verify-og.mjs` passes.

- [ ] **Step 3: Commit**

```bash
git add src/content/blogs/zh/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk.html
git commit -m "feat(blog): orchestration comparison — Chinese body"
```

---

## Task 9: Add the changelog entry

**Files:**
- Create: `src/content/changelog/entries/2026-05-28-orchestration-framework-comparison.ts`

- [ ] **Step 1: Write the entry**

```ts
import { L } from '../types.ts';

export default {
  date: '2026-05-28',
  title: L(
    'New AI Blog post: four agent-orchestration frameworks compared',
    'AI 博客新文章：四款智能体编排框架对比',
  ),
  items: [
    L(
      'Added “LangGraph vs CrewAI vs Claude Managed Agents vs OpenAI Agents SDK” — a diagram-driven comparison built around one question the feature lists hide: where does your agent’s state actually live?',
      '新增《LangGraph、CrewAI、Claude Managed Agents 与 OpenAI Agents SDK》——围绕功能清单掩盖的一个问题展开的图解对比：你的智能体状态究竟存在哪里？',
    ),
    L('New tag: orchestration.', '新增标签：orchestration。'),
  ],
};
```

- [ ] **Step 2: Build + test + commit**

Run: `npm run build && node --test --experimental-strip-types scripts/__tests__/changelog.test.mjs`
Expected: changelog test PASS.
```bash
git add src/content/changelog/entries/2026-05-28-orchestration-framework-comparison.ts
git commit -m "docs(changelog): orchestration-framework comparison post"
```

---

## Task 10: Full verification + manual review + PR

- [ ] **Step 1: Run every gate**

```bash
npm run build
npm run verify
npm test
npm run search:index && npm run test:search
```
Expected: all green, no new warnings. Fix + re-commit anything that fails.

- [ ] **Step 2: Manual browser check**

`npm run dev`. Open `http://localhost:4321/blogs/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk`. Verify: lede border; all 8 figures render and theme-adapt (dark mode); the `compare-state.svg` reads as the headline figure; left-rail TOC lists every `<h2>`; tables don't overflow. Then `/zh/blogs/<slug>` + `/zh/` links.

- [ ] **Step 3: Confirm date**

If past 2026-05-28, rename post + changelog files, bump `date:` fields + snapshot note, re-run `npm test`.

- [ ] **Step 4: Push + open PR**

```bash
git push -u origin feature/blog-orchestration-framework-comparison-2026-05-28
gh pr create --title "AI Blog: orchestration-framework comparison (LangGraph / CrewAI / Claude Managed / OpenAI Agents SDK)" --body "$(cat <<'EOF'
## Summary
- Adds the AI Blog's third post: a diagram-driven comparison of LangGraph, CrewAI, Claude Managed Agents, and OpenAI Agents SDK, organized around "where does your agent's state actually live?"
- Bilingual en/zh; 12 themeable SVGs; BlogPosting + FAQPage JSON-LD; new tag orchestration.
- Spec: docs/superpowers/specs/2026-05-28-blog-orchestration-framework-comparison-design.md

## Test plan
- [ ] npm run build (no new warnings)
- [ ] npm run verify (bilingual complete, internal links resolve, OG meta)
- [ ] npm test (blogs.test.mjs + changelog.test.mjs green)
- [ ] npm run search:index && npm run test:search
- [ ] Manual: /blogs/<slug> + /zh/blogs/<slug>, dark mode, TOC, JSON-LD present
EOF
)"
```

- [ ] **Step 5: Post-merge housekeeping** (after merge)

Sync local `main`, `git worktree remove .worktrees/blog-orchestration-framework-comparison`, delete the branch, confirm live at `https://menuagentic.com/blogs/<slug>`.

---

## Self-Review (completed during planning)

- **Spec coverage:** thesis/4-decisions (state-centric) → Tasks 4–7; lineup → Task 2; title/hook → Tasks 2 & 7; sections → Task 7; SVG inventory (12) → Tasks 3–6; FAQ (6) → Task 7 §9; snapshot mechanic (lede phrase inserted in Task 7, table note) → Tasks 2 & 7; tags → Task 2; internal links (group-nested, verified) → Tasks 7–8; changelog → Task 9; gates → Task 10. No gaps.
- **Placeholder scan:** intentional deferrals are prose substance (Tasks 7–8, authored against the fixed skeleton + spec) and snapshot-dependent SVG cell readings (flagged). No stray TODO/undefined references.
- **Type/path consistency:** slug `langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk` and all asset paths, group-nested deep-dive URLs, and the four arch/logo filenames are identical across Tasks 2–10.
- **Note vs Plan A:** the only structural delta from the coding-agent plan is the lede already carries the snapshot phrase in A but is inserted in Task 7 here (spec §3 difference) — intentional, called out in both specs.
