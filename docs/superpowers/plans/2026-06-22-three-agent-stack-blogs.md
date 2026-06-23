# Three Agent-Stack Blog Posts — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship three coordinated blog posts in one merge — (A) voice-agent platforms (ElevenLabs / Vapi / Retell / OpenAI gpt-realtime), (B) agent memory infrastructure (Mem0 / Letta / Zep / Cognee), (C) durable execution engines (Temporal / Inngest / Restate / Cloudflare Workflows) — all bilingual, diagram-rich, with one combined changelog entry, passing every verification gate.

**Architecture:** Same as PR #86 — the `/blogs` section infrastructure (BlogLayout, manifest glob, JSON-LD emitter, tag pages, OG, nav) already exists. This plan authors three new posts only: metadata under `src/content/blogs/posts/`, bilingual fragments under `src/content/blogs/{en,zh}/`, co-located SVGs under `public/blogs/<slug>/`, and one combined changelog entry. No infra code changes.

**Tech Stack:** Astro 4 static, TypeScript, Node test runner, Pagefind. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-06-22-three-agent-stack-blogs-design.md`

**Authoring guide:** `src/content/blogs/AUTHORING.md` is normative.

**Slugs (referenced throughout):**
- **Post A:** `elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime`
- **Post B:** `mem0-vs-letta-vs-zep-vs-cognee`
- **Post C:** `temporal-vs-inngest-vs-restate-vs-cloudflare-workflows`

**Branch / worktree:** `feature/blog-three-agent-stack-posts-2026-06-22` in `.worktrees/blog-three-agent-stack`. Branched from **`origin/main`** — NOT from the PR #86 branch — so the two PRs merge independently.

**Note on dates:** Today is 2026-06-22. All post `date:` fields and filename prefixes use `2026-06-22`. Date bump in Task 16 if calendar moves before merge.

**Conventions reminder:**
- Bilingual en/zh; identical structural HTML; zh internal links use `/zh/` prefix.
- Hook lede opener — no `TL;DR`/`Summary`/`Overview`/`Intro` label (CLAUDE.md Document-openers rule).
- SVGs: viewBox-based, themeable CSS vars only (no bare hex except inside `var(... , #fallback)`), `role="img"` + `<title>` + `<desc>` + `aria-labelledby`. No `<script>`, no `on*=`.
- Tables ≤4 columns in the article column.
- All internal links target pre-existing wiki pages — verify before commit.
- All edits inside the worktree, never on `main`.

**Citation rigor:** Every numeric claim must trace to a primary source URL in *Further reading*. If unverifiable, remove the number from the prose.

---

## Task 1: Worktree setup + spec/plan commit

Same structure as PR #86's Task 1.

- [ ] **Step 1: Fetch + worktree**

```bash
git fetch origin
git worktree add -b feature/blog-three-agent-stack-posts-2026-06-22 .worktrees/blog-three-agent-stack origin/main
```

- [ ] **Step 2: Copy spec + plan**

```bash
cp docs/superpowers/specs/2026-06-22-three-agent-stack-blogs-design.md .worktrees/blog-three-agent-stack/docs/superpowers/specs/
cp docs/superpowers/plans/2026-06-22-three-agent-stack-blogs.md .worktrees/blog-three-agent-stack/docs/superpowers/plans/
```

- [ ] **Step 3: cd, install, baseline build**

```bash
cd .worktrees/blog-three-agent-stack && npm ci && npm run build
```
Expected: build clean. **All subsequent commands run from this worktree.**

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/specs/2026-06-22-three-agent-stack-blogs-design.md docs/superpowers/plans/2026-06-22-three-agent-stack-blogs.md
git commit -m "docs: spec + plan for three agent-stack blog posts"
```

---

## Task 2: Scaffold all three post metadata + stub fragments

**Files:** 9 new (3 metadata + 6 stubs)

- [ ] **Step 1: Baseline test**

```bash
node --test --experimental-strip-types scripts/__tests__/blogs.test.mjs
```
Expected: PASS.

- [ ] **Step 2: Post A metadata**

`src/content/blogs/posts/2026-06-22-elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime.ts`:
```ts
import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-22',
  slug: 'elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime',
  title: L(
    'ElevenLabs vs Vapi vs Retell vs OpenAI gpt-realtime: Four Bets on How Your Agent Should Talk Back',
    'ElevenLabs、Vapi、Retell 与 OpenAI gpt-realtime：让智能体开口说话的四种下注方式',
  ),
  summary: L(
    'Voice is now the interface most agents will spend the most time in — and four platforms have made architecturally opposite bets on how to wire speech, language, and tool-use into one round-trip. The right pick depends less on TTS voice quality than on whether you control the audio path, the model, or just the prompt.',
    '语音正变成大多数智能体停留时间最久的界面——而四家平台在如何把语音、语言与工具调用合并到一次往返里做了架构上完全相反的下注。选哪一家，关键并非 TTS 音质，而是你掌握的是音频通路、模型本身，还是只能改一下 prompt。',
  ),
  tags: ['agent-comparison', 'voice-agents', 'realtime', 'developer-tools'],
};

export default post;
```

- [ ] **Step 3: Post B metadata**

`src/content/blogs/posts/2026-06-22-mem0-vs-letta-vs-zep-vs-cognee.ts`:
```ts
import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-22',
  slug: 'mem0-vs-letta-vs-zep-vs-cognee',
  title: L(
    'Mem0 vs Letta vs Zep vs Cognee: Four Bets on What "Agent Memory" Actually Means',
    'Mem0、Letta、Zep 与 Cognee：关于"智能体记忆"到底是什么的四种下注方式',
  ),
  summary: L(
    'A 128K-token context window degrades past the first thousand tokens and vanishes the moment the session ends. The agent-memory infrastructure market crossed $6 billion in 2026 because "throw it all in the context" stopped being a strategy — and four frameworks now bet differently on what memory should rank, store, and forget.',
    '12.8 万 token 的上下文窗口在前一千个 token 之后就开始衰减，会话一结束更是一干二净。智能体记忆基础设施市场在 2026 年突破 60 亿美元——因为"全部塞进上下文"已经不再是一条可行的策略——而四家框架对"记忆应该排什么、存什么、忘什么"做出了不同的下注。',
  ),
  tags: ['agent-comparison', 'memory', 'infrastructure', 'agent-frameworks'],
};

export default post;
```

- [ ] **Step 4: Post C metadata**

`src/content/blogs/posts/2026-06-22-temporal-vs-inngest-vs-restate-vs-cloudflare-workflows.ts`:
```ts
import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-22',
  slug: 'temporal-vs-inngest-vs-restate-vs-cloudflare-workflows',
  title: L(
    'Temporal vs Inngest vs Restate vs Cloudflare Workflows: Four Bets on Keeping Your Agent Alive for 30 Minutes',
    'Temporal、Inngest、Restate 与 Cloudflare Workflows：让智能体活过 30 分钟的四种下注方式',
  ),
  summary: L(
    'Naive agent loops die on minute 29 of a 30-minute job. Durable-execution engines journal every step so the next process can pick up exactly where the previous one died — and 2026 was the year hyperscalers shipped their own. Four engines now compete on the same primitive, with very different architectures and bills.',
    '朴素的智能体循环在 30 分钟作业的第 29 分钟死掉。持久化执行引擎会把每一步记录到日志，下一个进程就能从上次中断的位置接着干——而 2026 正是各家超大规模云厂商也下场推出自家产品的年份。四款引擎围绕同一个原语竞争，但架构与账单差得很远。',
  ),
  tags: ['agent-comparison', 'infrastructure', 'orchestration', 'durable-execution'],
};

export default post;
```

- [ ] **Step 5: Six stub fragments**

For each of the three slugs, create the en + zh stub.

`src/content/blogs/en/<SLUG>.html`:
```html
<p class="lede">STUB — replaced in the body-authoring task for this post.</p>
```

`src/content/blogs/zh/<SLUG>.html`:
```html
<p class="lede">占位 —— 将在该文章的正文撰写任务中替换。</p>
```

- [ ] **Step 6: Test + build**

```bash
node --test --experimental-strip-types scripts/__tests__/blogs.test.mjs && npm run build
```
Expected: blogs test PASS; build emits `/blogs/<slug>/index.html` and `/zh/blogs/<slug>/index.html` for each (3 new slugs × 2 locales = 6 new pages; tag pages auto-update).

- [ ] **Step 7: Commit**

```bash
git add src/content/blogs/posts/2026-06-22-*.ts src/content/blogs/en/{elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime,mem0-vs-letta-vs-zep-vs-cognee,temporal-vs-inngest-vs-restate-vs-cloudflare-workflows}.html src/content/blogs/zh/{elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime,mem0-vs-letta-vs-zep-vs-cognee,temporal-vs-inngest-vs-restate-vs-cloudflare-workflows}.html
git commit -m "feat(blog): scaffold three June-2026 agent-stack posts"
```

---

## Task 3: Post A logos (4 SVGs)

**Files:** `public/blogs/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime/logos/{elevenlabs,vapi,retell,openai}.svg`

- [ ] **Step 1: mkdir**

```bash
mkdir -p public/blogs/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime/logos
```

- [ ] **Step 2: Author each 32×32 logo**

Per AUTHORING §3: `viewBox="0 0 32 32"`, `role="img"`, `aria-label`, CSS-var colors only, abstract monogram. Four distinct glyphs:
- **elevenlabs** — abstract waveform or stylized "11"
- **vapi** — phone/call icon
- **retell** — speech bubble with arrow or RT monogram
- **openai** — rotational mark (can be visually similar to PR #86 versions but author as fresh file)

- [ ] **Step 3: Verify + commit**

```bash
for f in public/blogs/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime/logos/*.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8'));console.log('ok','$f')"; done
git add public/blogs/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime/logos
git commit -m "feat(blog): voice-agents post logos"
```

---

## Task 4: Post A diagrams (4 SVGs)

**Files:** `public/blogs/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime/`
- `data-latency-comparison.svg`
- `arch-elevenlabs.svg`
- `arch-openai-realtime.svg`
- `data-feature-matrix.svg`

- [ ] **Step 1: `data-latency-comparison.svg`** (viewBox `0 0 900 400`, horizontal bar chart)

Round-trip latency (ms) — illustrative snapshot. Bars (top to bottom, ascending latency since "lower is better" for latency):
- **OpenAI gpt-realtime** — 350ms — `var(--accent)` (leader/lowest)
- **Vapi** — 600ms — `var(--accent-soft)`
- **Retell** — 700ms — `var(--accent-soft)`
- **ElevenLabs Conversational AI** — 850ms — `var(--paper-2)`

Dotted gridlines every 200ms (0/200/400/600/800/1000). Numeric labels at right edge with "ms" suffix. Chart title inside SVG: *"Round-trip latency (ms, snapshot)"*. `role="img"` + `<title>` + `<desc>` + `aria-labelledby`.

- [ ] **Step 2: `arch-elevenlabs.svg`** (viewBox `0 0 900 500`)

Layout: ElevenLabs Conversational AI hero (`var(--accent)`) at left → enclosed pipeline showing STT + LLM (pluggable) + TTS (ElevenLabs voice — strong) + tool-use → call audio out. Annotate "Voice quality is the moat" or similar.

`<title>`: "ElevenLabs Conversational AI — TTS-first voice agent".

- [ ] **Step 3: `arch-openai-realtime.svg`** (viewBox `0 0 900 500`)

Layout: ONE big hero box "gpt-realtime model" (`var(--accent)`) — audio in goes directly to the model, audio out comes directly out, no separate STT/LLM/TTS layer. SIP integration box on the side. Annotate "audio-native single model" to land the contrast with the pipeline approach.

`<title>`: "OpenAI gpt-realtime — single-model audio-native architecture".

- [ ] **Step 4: `data-feature-matrix.svg`** (viewBox `0 0 900 400`, heatmap)

4 rows: ElevenLabs / Vapi / Retell / OpenAI gpt-realtime
5 columns: **Self-hosted? · Model freedom · Telephony built-in · Voice quality · Latency**

Cell guidance:
- **ElevenLabs:** No (weak) / High — pluggable LLM (strong) / Yes (strong) / Best (strong) / Medium (medium)
- **Vapi:** No (weak) / High — pluggable STT/LLM/TTS (strong) / Yes (strong) / Good (medium) / Low (strong)
- **Retell:** No (weak) / Medium (medium) / Yes (strong) / Good (medium) / Low (strong)
- **OpenAI gpt-realtime:** No (weak) / Low — model is the platform (weak) / Yes (strong, via SIP) / Good (medium) / Best (strong)

Levels: weak `var(--paper-2)` / medium `var(--accent-soft)` / strong `var(--accent)` with 1-2 word in-cell labels. Bottom legend.

- [ ] **Step 5: Verify + commit**

```bash
for f in public/blogs/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime/{data-*,arch-*}.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8'));console.log('ok','$f')"; done
git add public/blogs/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime/{data-*,arch-*}.svg
git commit -m "feat(blog): voice-agents post diagrams"
```

---

## Task 5: Post A English body

**File:** `src/content/blogs/en/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime.html`

9-block standard comparison shape. Sections:

1. `<p class="lede">` — opens with "voice is now the interface most agents will spend the most time in"; names the four bets explicitly; first 30 words contain stakes + takeaway; "as of late June 2026" snapshot phrase.

2. `<section><h2>At a glance</h2>` — orienting sentence; 4-column table (Platform · Approach · Self-hosted? · Latency profile) with logos in first cell (24×24, `vertical-align:middle;margin-right:8px`); muted snapshot `<p>` note; `<figure>` with `data-latency-comparison.svg` + figcaption (snapshot framing); `<figure>` with `data-feature-matrix.svg` + figcaption.

3. `<section><h2>ElevenLabs Conversational AI</h2>` — 3 `<h3>`: *TTS-grade voice quality as the moat · Pluggable LLM, fixed TTS · Knowledge base + tool-use built in*.

4. `<section><h2>Vapi</h2>` — 3 `<h3>`: *Orchestration-first · Pluggable STT/LLM/TTS stack · Programmable phone numbers + dev-friendly pricing*. `<figure>` with `arch-elevenlabs.svg` actually doesn't fit here — keep the arch diagram in §3 for ElevenLabs. Vapi gets prose only.

5. `<section><h2>Retell AI</h2>` — 3 `<h3>`: *End-to-end voice agent platform · Built-in turn-taking and barge-in · Contact-center positioning*.

6. `<section><h2>OpenAI gpt-realtime</h2>` — `<figure>` with `arch-openai-realtime.svg`. 3 `<h3>`: *Audio-native single model (GA August 2025) · SIP integration and pricing · No orchestration layer*. Cite gpt-realtime GA date and $32/M input tokens pricing — verified at draft.

7. `<section><h2>Cross-cutting comparison</h2>` — 4 `<h3>`, each ONE comparative paragraph addressing all four: *Where audio lives* (their stack vs your stack) / *Model choice freedom* / *Telephony integration* / *Per-minute economics*. Comparative prose, not four sequential descriptions.

8. `<section><h2>When to pick which</h2>` — 4-column decision matrix table: Use case · Pick ElevenLabs · Pick Vapi · Pick OpenAI. Rows: consumer voice assistant / contact center / phone-only IVR replacement / web embed with knowledge base / lowest-latency / highest-voice-quality.

9. `<section class="faq"><h2>FAQ</h2>` — exactly these 6 `<h3>`/`<p>`:
   - *Can I run any of these self-hosted?*
   - *Which is cheapest at scale?*
   - *Does gpt-realtime support function calling?*
   - *How do I handle barge-in / interruption?*
   - *Which one ships with telephony out of the box?*
   - *What about open-source voice agent stacks (LiveKit Agents, Pipecat)?*

10. `<section><h2>Further reading</h2>` — `<h3>On this wiki:</h3>` ul (try `/concepts/the-agent-loop`, `/concepts/tools-actions-environments` — verify exist); `<h3>Project sources:</h3>` ul with ElevenLabs / Vapi / Retell / OpenAI gpt-realtime docs (use lab homepage as fallback if deep-link unverifiable).

**Build + JSON-LD:**

```bash
npm run build
grep -o '"@type":"BlogPosting"' dist/blogs/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime/index.html
grep -o '"@type":"FAQPage"' dist/blogs/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime/index.html
```

**Commit:**

```bash
git add src/content/blogs/en/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime.html
git commit -m "feat(blog): voice-agents post — English body"
```

Voice/style: hook lede cold open; comparative §7; ~2000-2500 words; opinionated; tone fair across all four.

---

## Task 6: Post A Chinese body

**File:** `src/content/blogs/zh/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime.html`

Mirror en structure with faithful zh prose. Keep product names + technical identifiers English (`ElevenLabs`, `Vapi`, `Retell`, `OpenAI`, `gpt-realtime`, `SIP`, `TTS`, `STT`, `LLM`, `IVR`, `LiveKit`, `Pipecat`, `barge-in`). Full-width punctuation in prose; ASCII inside `<code>`. zh lede includes "截至 2026 年 6 月下旬" snapshot phrase. Image `src` byte-identical to en. Internal links use `/zh/` prefix.

**Build + verify:**

```bash
npm run build
node scripts/check-internal-links.mjs
node scripts/verify-og.mjs
```

(`npm run verify` will still fail on Posts B and C stubs until later tasks; the individual gates suffice for now.)

**Commit:**

```bash
git add src/content/blogs/zh/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime.html
git commit -m "feat(blog): voice-agents post — Chinese body"
```

---

## Task 7: Post B logos (4 SVGs)

**Files:** `public/blogs/mem0-vs-letta-vs-zep-vs-cognee/logos/{mem0,letta,zep,cognee}.svg`

- [ ] **Step 1: mkdir**

```bash
mkdir -p public/blogs/mem0-vs-letta-vs-zep-vs-cognee/logos
```

- [ ] **Step 2: Author each 32×32 logo**

Per AUTHORING §3. Four distinct glyphs:
- **mem0** — stylized "M" or memory-card motif
- **letta** — abstract brain or "L" with ring (formerly MemGPT)
- **zep** — temporal/spiral motif (knowledge graph implication)
- **cognee** — connected-graph nodes

- [ ] **Step 3: Verify + commit**

```bash
for f in public/blogs/mem0-vs-letta-vs-zep-vs-cognee/logos/*.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8'));console.log('ok','$f')"; done
git add public/blogs/mem0-vs-letta-vs-zep-vs-cognee/logos
git commit -m "feat(blog): memory-infrastructure post logos"
```

---

## Task 8: Post B diagrams (4 SVGs)

**Files:** `public/blogs/mem0-vs-letta-vs-zep-vs-cognee/`
- `data-stars-comparison.svg`
- `arch-mem0.svg`
- `arch-zep.svg`
- `data-feature-matrix.svg`

- [ ] **Step 1: `data-stars-comparison.svg`** (viewBox `0 0 900 400`, horizontal bar chart)

GitHub stars (thousands, snapshot late June 2026 — illustrative). Defensible illustrative values:
- **Mem0** — 28k — `var(--accent)`
- **Letta** — 15k — `var(--accent-soft)`
- **Zep** — 3k — `var(--paper-2)`
- **Cognee** — 2k — `var(--paper-2)`

Chart title inside SVG: *"GitHub stars (thousands, snapshot)"*. `role="img"` + `<title>` + `<desc>` + `aria-labelledby`. Numeric labels at right edge.

- [ ] **Step 2: `arch-mem0.svg`** (viewBox `0 0 900 500`)

Layout: User input → **extraction pipeline** (hero, accent) → fans out to three stores: **vector store**, **key-value store**, **graph store** (all neutral). Retrieval combines all three. Annotate: "Extracted facts beat raw transcripts."

`<title>`: "Mem0 — extraction pipeline + multi-store retrieval".

- [ ] **Step 3: `arch-zep.svg`** (viewBox `0 0 900 500`)

Layout: Messages flow in → **Graphiti temporal knowledge graph** (hero, accent) → nodes carry **valid-at + invalid-at timestamps** → retrieval **time-aware ranking** (no decay of older facts that are still valid). Annotate: "Knowledge has a half-life."

`<title>`: "Zep — temporal knowledge graph (Graphiti)".

- [ ] **Step 4: `data-feature-matrix.svg`** (viewBox `0 0 900 400`, heatmap)

4 rows × 5 columns.
Rows: Mem0 / Letta / Zep / Cognee
Columns: **What gets stored** / **Retrieval strategy** / **Self-hosted** / **Schema discipline** / **Multi-user**

Cell guidance:
- **Mem0:** Extracted facts (strong) / Hybrid: vector + KV + graph (strong) / Yes (strong) / Free-form (medium) / Yes (strong)
- **Letta:** Working + archival memory hierarchy (strong) / Vector + recall (medium) / Yes (strong) / Free-form (medium) / Yes via agent-as-server (strong)
- **Zep:** Time-stamped facts (strong) / Temporal graph + vector (strong) / Yes (strong) / Light ontology (strong) / Yes (strong)
- **Cognee:** Graph-from-anything (strong) / Graph + RAG (strong) / Yes (strong) / Ontology-aware (strong) / Yes (medium)

- [ ] **Step 5: Verify + commit**

```bash
for f in public/blogs/mem0-vs-letta-vs-zep-vs-cognee/{data-*,arch-*}.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8'));console.log('ok','$f')"; done
git add public/blogs/mem0-vs-letta-vs-zep-vs-cognee/{data-*,arch-*}.svg
git commit -m "feat(blog): memory-infrastructure post diagrams"
```

---

## Task 9: Post B English body

**File:** `src/content/blogs/en/mem0-vs-letta-vs-zep-vs-cognee.html`

9-block standard comparison shape:

1. `<p class="lede">` — opens with the numbers (128K window degrades past ~1K useful tokens; $6.27B market; 35% CAGR); thesis: *"Storage isn't the moat; ranking is."*; names the four bets; "as of late June 2026" snapshot.

2. `<section><h2>At a glance</h2>` — 4-column table (Framework · Approach · Self-hosted? · Headline strength) with logos; muted snapshot `<p>`; `<figure>` `data-stars-comparison.svg` + figcaption; `<figure>` `data-feature-matrix.svg` + figcaption.

3. `<section><h2>Mem0</h2>` — `<figure>` `arch-mem0.svg`. 3 `<h3>`: *Extraction pipeline · Multi-store retrieval · User-scoped memory by default*.

4. `<section><h2>Letta (formerly MemGPT)</h2>` — 3 `<h3>`: *Agent-as-a-server architecture · MemGPT's working/archival memory hierarchy · The 2024 rename and what it signals*.

5. `<section><h2>Zep</h2>` — `<figure>` `arch-zep.svg`. 3 `<h3>`: *Graphiti temporal knowledge graph · Time-aware retrieval · Fact validity, not decay*.

6. `<section><h2>Cognee</h2>` — 3 `<h3>`: *Graph-from-anything pipeline · Ontology-aware ingestion · Hybrid graph + RAG retrieval*.

7. `<section><h2>Cross-cutting comparison</h2>` — 4 `<h3>` axes, each ONE comparative paragraph: *What gets stored* (raw vs extracted) / *How retrieval ranks* (vector / temporal / graph / hybrid) / *Where the memory lives* (their service vs your DB) / *Schema discipline*. Comparative prose, not four sequential.

8. `<section><h2>When to pick which</h2>` — 4-column decision matrix table; rows: consumer agent with per-user history / enterprise multi-tenant / time-sensitive facts (CRM, support) / build-from-existing-corpus.

9. `<section class="faq"><h2>FAQ</h2>` — 6 `<h3>`/`<p>`:
   - *Do I need a vector DB if I use one of these?*
   - *Which is best for multi-user SaaS?*
   - *Can these replace a RAG pipeline?*
   - *What about MemGPT — is Letta a fork or a rename?*
   - *How do I handle fact contradictions?*
   - *What about Supermemory and Cogito?*

10. `<section><h2>Further reading</h2>` — internal: `/blogs/pgvector-vs-pinecone-vs-weaviate-vs-qdrant` (cross-link), 1-2 concept pages (verify exist); project sources: Mem0 / Letta / Zep / Cognee docs.

**Build + JSON-LD + commit** — same pattern as Task 5.

---

## Task 10: Post B Chinese body

Mirror en structure. Keep technical identifiers English: `Mem0`, `Letta`, `MemGPT`, `Zep`, `Graphiti`, `Cognee`, `RAG`, `CRM`, `Supermemory`, `Cogito`, `KV`. Internal `/zh/` prefix. zh lede includes "截至 2026 年 6 月下旬".

Build + commit as Task 6 pattern.

---

## Task 11: Post C logos (4 SVGs)

**Files:** `public/blogs/temporal-vs-inngest-vs-restate-vs-cloudflare-workflows/logos/{temporal,inngest,restate,cloudflare}.svg`

- [ ] **Step 1: mkdir**

```bash
mkdir -p public/blogs/temporal-vs-inngest-vs-restate-vs-cloudflare-workflows/logos
```

- [ ] **Step 2: Author 32×32 logos**

Per AUTHORING §3. Four distinct glyphs:
- **temporal** — clock/spiral or workflow node graph
- **inngest** — function-block or step icon
- **restate** — re-circulating arrow or "R" with replay arc
- **cloudflare** — abstract cloud + lightning

- [ ] **Step 3: Verify + commit**

```bash
for f in public/blogs/temporal-vs-inngest-vs-restate-vs-cloudflare-workflows/logos/*.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8'));console.log('ok','$f')"; done
git add public/blogs/temporal-vs-inngest-vs-restate-vs-cloudflare-workflows/logos
git commit -m "feat(blog): durable-execution post logos"
```

---

## Task 12: Post C diagrams (4 SVGs)

**Files:** `public/blogs/temporal-vs-inngest-vs-restate-vs-cloudflare-workflows/`
- `data-stars-comparison.svg`
- `arch-temporal.svg`
- `arch-restate.svg`
- `data-feature-matrix.svg`

- [ ] **Step 1: `data-stars-comparison.svg`** (viewBox `0 0 900 400`)

GitHub stars (thousands, snapshot). Illustrative defensible values:
- **Temporal** — 14k — `var(--accent)`
- **Inngest** — 4.5k — `var(--accent-soft)`
- **Restate** — 3k — `var(--paper-2)`
- **Cloudflare Workflows** — N/A as standalone repo — annotate as "part of Workers"; show as `var(--paper-2)` with an asterisk and a footnote text-line inside the chart explaining "ships inside the Workers runtime; no standalone stars".

Chart title: *"GitHub stars (thousands, snapshot)"*. `role="img"` + `<title>` + `<desc>` + `aria-labelledby`.

- [ ] **Step 2: `arch-temporal.svg`** (viewBox `0 0 900 500`)

Layout: **Workflow worker process** (hero) on the left runs your workflow code → emits events to a **Temporal service** envelope (history event store + task queues) → worker can crash, new worker spins up, replays history to current state. Annotate "workflow-as-code; history is the source of truth."

`<title>`: "Temporal — workflow worker + history event store".

- [ ] **Step 3: `arch-restate.svg`** (viewBox `0 0 900 500`)

Layout: HTTP RPC → **Restate runtime** (hero) → routes to **virtual objects** with per-object journal → exactly-once semantics by design (journal records every external effect). Annotate "no idempotency keys needed; the journal is the deduplication."

`<title>`: "Restate — virtual objects + per-object journal".

Show the CONTRAST with Temporal explicitly: Temporal = code-replay model, Restate = handler-replay-with-journal model.

- [ ] **Step 4: `data-feature-matrix.svg`** (viewBox `0 0 900 400`, heatmap)

4 rows × 5 columns.
Rows: Temporal / Inngest / Restate / Cloudflare Workflows
Columns: **Programming model** / **Self-hosted** / **Determinism story** / **Cold-start** / **Telephony hyperscaler-included**

(Re-think column 5 — that doesn't make sense here. Let me use: **Programming model · Self-hosted · Determinism story · Cold-start · Multi-region**)

Cell guidance:
- **Temporal:** Workflow-as-code (strong) / Yes (strong) / Explicit determinism, code replay (strong) / Higher (worker) (medium) / Yes via Temporal Cloud (strong)
- **Inngest:** Step functions (strong) / Yes (strong) / Step-level retries (medium) / Low-medium (medium) / Yes (medium)
- **Restate:** Virtual objects + RPC (strong) / Yes (strong) / Journal exactly-once (strong) / Medium (medium) / Yes (medium)
- **Cloudflare Workflows:** Handler graph (medium) / No — Cloudflare only (weak) / Step-level retries (medium) / Edge-isolate fast (strong) / Yes — Cloudflare network (strong)

- [ ] **Step 5: Verify + commit**

```bash
for f in public/blogs/temporal-vs-inngest-vs-restate-vs-cloudflare-workflows/{data-*,arch-*}.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8'));console.log('ok','$f')"; done
git add public/blogs/temporal-vs-inngest-vs-restate-vs-cloudflare-workflows/{data-*,arch-*}.svg
git commit -m "feat(blog): durable-execution post diagrams"
```

---

## Task 13: Post C English body

**File:** `src/content/blogs/en/temporal-vs-inngest-vs-restate-vs-cloudflare-workflows.html`

9-block standard comparison shape:

1. `<p class="lede">` — opens with "agent dies on minute 29 of 30" failure mode; names the four architectural bets; "as of late June 2026"; thesis: *"Durable execution is the runtime that makes any orchestration framework actually survive production."*

2. `<section><h2>At a glance</h2>` — 4-column table (Engine · Approach · Self-hosted? · Pricing shape); logos; muted snapshot note; `<figure>` `data-stars-comparison.svg` + figcaption; `<figure>` `data-feature-matrix.svg` + figcaption.

3. `<section><h2>Temporal</h2>` — `<figure>` `arch-temporal.svg`. 3 `<h3>`: *Workflow-as-code · History event journal · Durable timers, queries, signals*.

4. `<section><h2>Inngest</h2>` — 3 `<h3>`: *Function-as-workflow with step-level retries · Dev-server-first DX · Agent kit integration*.

5. `<section><h2>Restate</h2>` — `<figure>` `arch-restate.svg`. 3 `<h3>`: *Virtual objects + RPC · Journal exactly-once · No idempotency keys required*.

6. `<section><h2>Cloudflare Workflows</h2>` — 3 `<h3>`: *V8-isolate runtime · Integrated with Workers / Queues / D1 · GA in late 2025*.

7. `<section><h2>Cross-cutting comparison</h2>` — 4 `<h3>` axes, each ONE comparative paragraph: *Programming model* / *Determinism story* / *Pricing shape* / *Operational footprint*. Comparative, not four sequential.

8. `<section><h2>When to pick which</h2>` — 4-column decision matrix table; rows: long-running LLM workflows / agent tool-call retries / event-driven SaaS / edge-deployed agents / regulated data residency.

9. `<section class="faq"><h2>FAQ</h2>` — 6 `<h3>`/`<p>`:
   - *Is durable execution different from a job queue?*
   - *Do I need this if I use LangGraph checkpoints?*
   - *What about AWS Step Functions / Durable Functions?*
   - *Can I run all four self-hosted?*
   - *What's the cold-start cost?*
   - *Which one survives a region outage?*

10. `<section><h2>Further reading</h2>` — internal: `/blogs/langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk` (orchestration vs runtime distinction); concept pages; project sources for each of the four engines.

**Build + JSON-LD + commit** — same pattern.

---

## Task 14: Post C Chinese body

Mirror en. Keep technical identifiers English: `Temporal`, `Inngest`, `Restate`, `Cloudflare Workflows`, `Workers`, `Queues`, `D1`, `V8 isolate`, `RPC`, `LangGraph`, `Step Functions`, `Durable Functions`, `idempotency key`. Internal `/zh/` prefix. zh lede includes snapshot phrase.

Build + commit as Task 6 pattern. After commit, run `npm run verify` and confirm it now passes cleanly (all 6 bodies real).

---

## Task 15: Combined changelog entry

**File:** `src/content/changelog/entries/2026-06-22-three-agent-stack-blogs.ts`

Use the same import pattern as the prior changelog entry (`import { L, type ChangelogEntry } from '../types.ts'; const entry: ChangelogEntry = { ... }; export default entry;`).

```ts
import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-06-22',
  title: L(
    'Three new AI Blog posts: voice agents, agent memory, and durable execution',
    'AI 博客新增三篇文章：语音智能体、智能体记忆与持久化执行',
  ),
  items: [
    L(
      'Added "ElevenLabs vs Vapi vs Retell vs OpenAI gpt-realtime" — a four-way comparison of voice-agent platforms organized around who owns the audio path.',
      '新增《ElevenLabs、Vapi、Retell 与 OpenAI gpt-realtime》——围绕"谁掌握音频通路"展开的四款语音智能体平台对比。',
    ),
    L(
      'Added "Mem0 vs Letta vs Zep vs Cognee" — a four-way comparison of agent-memory infrastructure built around the thesis that storage isn\'t the moat, ranking is.',
      '新增《Mem0、Letta、Zep 与 Cognee》——围绕"存储不是壁垒，排序才是"这一论点展开的四款智能体记忆基础设施对比。',
    ),
    L(
      'Added "Temporal vs Inngest vs Restate vs Cloudflare Workflows" — a four-way comparison of durable-execution engines, the runtime layer that keeps long-running agents alive.',
      '新增《Temporal、Inngest、Restate 与 Cloudflare Workflows》——长时间运行的智能体得以存活的运行时层：四款持久化执行引擎对比。',
    ),
    L(
      'New tags: voice-agents, realtime, durable-execution.',
      '新增标签：voice-agents、realtime、durable-execution。',
    ),
  ],
};

export default entry;
```

**Build + test + commit:**

```bash
npm run build && node --test --experimental-strip-types scripts/__tests__/changelog.test.mjs
git add src/content/changelog/entries/2026-06-22-three-agent-stack-blogs.ts
git commit -m "docs(changelog): three new June-2026 agent-stack blog posts"
```

---

## Task 16: Final verification + manual review + PR

Same as PR #86's Task 16 — gates, dev-server smoke test, JSON-LD spot-check, date-bump check. **Do not push or open PR** without controller confirmation.

- [ ] **Step 1: Gates** — `npm run build`, `npm run verify`, `npm test`, `npm run search:index && npm run test:search`. All must pass.

- [ ] **Step 2: Dev server smoke test** — `npm run dev &; sleep 6; curl -s -o /dev/null -w "%{http_code}\n" <url>` for each of 6 URLs (3 slugs × 2 locales). All HTTP 200. Kill dev server.

- [ ] **Step 3: JSON-LD spot-check** — for each slug × locale, grep `'"@type":"BlogPosting"'` and `'"@type":"FAQPage"'` in `dist/` — each = 1 match.

- [ ] **Step 4: Date-bump** — if today > 2026-06-22, rename 4 files (3 post + 1 changelog), update `date:` fields, update "as of late June 2026" phrases in 6 bodies, re-run tests, fixup commit.

- [ ] **Step 5: Push + PR** — only after controller confirms.

```bash
git push -u origin feature/blog-three-agent-stack-posts-2026-06-22
gh pr create --title "AI Blog: three June-2026 agent-stack posts (voice agents, memory, durable execution)" --body "$(cat <<'EOF'
## Summary

Three coordinated AI Blog posts on what's currently load-bearing in the agent stack — voice interface, durable memory, durable execution runtime:

- **Voice agents** — *ElevenLabs vs Vapi vs Retell vs OpenAI gpt-realtime: Four Bets on How Your Agent Should Talk Back*. Architectural comparison organized around who owns the audio path.
- **Agent memory** — *Mem0 vs Letta vs Zep vs Cognee: Four Bets on What "Agent Memory" Actually Means*. Comparison built around the thesis "storage isn't the moat; ranking is."
- **Durable execution** — *Temporal vs Inngest vs Restate vs Cloudflare Workflows: Four Bets on Keeping Your Agent Alive for 30 Minutes*. Runtime layer that survives long-running agent workflows.

Together the three read as a stack: what your user hears → what your agent remembers → how your agent survives a 30-minute job.

All three bilingual en/zh. ~24 themeable SVGs total. `BlogPosting` + `FAQPage` JSON-LD on each detail page. One combined changelog entry. New tags: `voice-agents`, `realtime`, `durable-execution`.

- Spec: `docs/superpowers/specs/2026-06-22-three-agent-stack-blogs-design.md`
- Plan: `docs/superpowers/plans/2026-06-22-three-agent-stack-blogs.md`

## Test plan

- [x] `npm run build` (no new warnings)
- [x] `npm run verify` (bilingual complete, internal links resolve, OG meta on every page)
- [x] `npm test` (blogs.test.mjs + changelog.test.mjs green)
- [x] `npm run search:index && npm run test:search`
- [x] All 6 detail URLs (3 slugs × 2 locales) return HTTP 200 in dev server
- [x] JSON-LD spot-check: BlogPosting × 1 and FAQPage × 1 on each of the 6 detail pages
- [ ] Manual browser review (dark mode toggle; TOC; figure rendering)
- [ ] Citation rigor spot-check: every numeric claim is framed as a snapshot and traces to a primary source in *Further reading*

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 6: Post-merge housekeeping** (after merge) — sync local main, `git worktree remove .worktrees/blog-three-agent-stack`, delete branch, confirm live at https://menuagentic.com/blogs/.

---

## Self-Review (completed during planning)

- **Spec coverage:** all 3 posts × {scaffold (T2), logos, diagrams, en body, zh body} + combined changelog (T15) + verification/PR (T16). Citation rigor threaded through SVG and body tasks. No gaps.
- **Placeholder scan:** no `TBD`/`TODO`/etc. Body authoring tasks defer prose substance to the executor (authored against the fixed skeleton + spec), which is correct for content work. SVG cell guidance includes "verify at draft time" markers for the snapshot-dependent values.
- **Type/path consistency:** all three slugs are spelled identically across all tasks; the branch name `feature/blog-three-agent-stack-posts-2026-06-22` and worktree path `.worktrees/blog-three-agent-stack` are consistent; tags in metadata (T2) match the new-tags announcement in changelog (T15).
