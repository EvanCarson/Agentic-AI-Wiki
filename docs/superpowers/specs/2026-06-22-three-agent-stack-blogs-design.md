# Three Agent-Stack Blog Posts — June 2026 (Design)

Three coordinated blog posts on what's currently load-bearing in the agent stack: the **voice interface** layer (voice-native agents), the **state** layer (durable memory infrastructure), and the **runtime** layer (durable execution). All three ship together as one PR, full bilingual (en/zh), and follow `src/content/blogs/AUTHORING.md` exactly.

## Goal

Refresh the AI Blog index with three timely comparison posts that earn their place against the existing 16 posts (13 on `main` + 3 in PR #86) by covering three layers of the agent stack that none of those posts touches end-to-end:

- **Post A** — first voice-agent coverage on the site.
- **Post B** — first dedicated agent-memory infrastructure comparison (the existing pgvector/Pinecone post covers vector DBs, not agent memory frameworks).
- **Post C** — first durable-execution coverage; pairs naturally with the existing LangGraph/CrewAI/Claude-Managed/OpenAI Agents SDK framework comparison (which touches orchestration but not runtime durability).

Together the three posts read as a stack: *what your user hears* → *what your agent remembers* → *how your agent survives a 30-minute job*.

## Audience

Same as the rest of the blog: engineers and technical product readers who already understand agents and want a current, opinionated map of the agent infrastructure landscape.

## Scope

Three posts only. All three dated **2026-06-22** (bump before merge if the calendar moves, per AUTHORING §0). Published together on one merge day.

In scope:
- Four-way head-to-head comparison of voice-agent platforms (Post A).
- Four-way head-to-head comparison of agent-memory infrastructure (Post B).
- Four-way head-to-head comparison of durable-execution engines (Post C).

Out of scope:
- Conversational AI as a market category — focus is on the **developer-facing platforms** that ship voice-agent primitives.
- Vector databases (already covered by `pgvector-vs-pinecone-vs-weaviate-vs-qdrant`).
- LangGraph/CrewAI/etc. as orchestration frameworks (already covered by the earlier orchestration comparison) — Post C focuses on the **durable-execution runtime** that sits beneath orchestration.
- Agent frameworks for voice (e.g., LiveKit Agents) get a passing mention only; the post is about voice-native platforms.
- Small-language-model / on-device topic — deferred (partial overlap with PR #86's open-weights story).
- AI safety / regulation / policy — deferred (different register from this catalog's tooling pragmatism).
- New navigation / IA changes.

## Files

| Path | Purpose |
|---|---|
| `src/content/blogs/posts/2026-06-22-elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime.ts` | Post A metadata. |
| `src/content/blogs/en/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime.html` | Post A English body. |
| `src/content/blogs/zh/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime.html` | Post A Chinese body. |
| `public/blogs/elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime/*.svg` | Post A diagrams (4) + logos (4). |
| `src/content/blogs/posts/2026-06-22-mem0-vs-letta-vs-zep-vs-cognee.ts` | Post B metadata. |
| `src/content/blogs/en/mem0-vs-letta-vs-zep-vs-cognee.html` | Post B English body. |
| `src/content/blogs/zh/mem0-vs-letta-vs-zep-vs-cognee.html` | Post B Chinese body. |
| `public/blogs/mem0-vs-letta-vs-zep-vs-cognee/*.svg` | Post B diagrams (4) + logos (4). |
| `src/content/blogs/posts/2026-06-22-temporal-vs-inngest-vs-restate-vs-cloudflare-workflows.ts` | Post C metadata. |
| `src/content/blogs/en/temporal-vs-inngest-vs-restate-vs-cloudflare-workflows.html` | Post C English body. |
| `src/content/blogs/zh/temporal-vs-inngest-vs-restate-vs-cloudflare-workflows.html` | Post C Chinese body. |
| `public/blogs/temporal-vs-inngest-vs-restate-vs-cloudflare-workflows/*.svg` | Post C diagrams (4) + logos (4). |
| `src/content/changelog/entries/2026-06-22-three-agent-stack-blogs.ts` | One combined changelog entry covering all three posts. |

One combined changelog entry for the trio (matches the batch-1 pattern).

---

## Post A — *ElevenLabs vs Vapi vs Retell vs OpenAI gpt-realtime*

**Slug:** `elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime`

**Title (en):** *ElevenLabs vs Vapi vs Retell vs OpenAI gpt-realtime: Four Bets on How Your Agent Should Talk Back*

**Title (zh):** *ElevenLabs、Vapi、Retell 与 OpenAI gpt-realtime：让智能体开口说话的四种下注方式*

**Summary (en):** Voice is now the interface most agents will spend the most time in — and four platforms have made architecturally opposite bets on how to wire speech, language, and tool-use into one round-trip. The right pick depends less on TTS voice quality than on whether you control the audio path, the model, or just the prompt.

**Summary (zh):** 语音正变成大多数智能体停留时间最久的界面——而四家平台在如何把语音、语言与工具调用合并到一次往返里做了架构上完全相反的下注。选哪一家，关键并非 TTS 音质，而是你掌握的是音频通路、模型本身，还是只能改一下 prompt。

**Tags:** `agent-comparison` (reused), `voice-agents` (new), `realtime` (new), `developer-tools` (reused — for the "build, don't buy" angle).

**Lede stance:** Lead with the shift ("voice is now the interface most agents will spend the most time in"). Take a side: the choice is about which layer of the stack you own — audio (Vapi's bet), language model (OpenAI's bet), end-to-end agent (Retell's bet), or voice quality + orchestration (ElevenLabs Conversational AI's bet).

**Section outline** (9-block standard comparison shape):

1. Hook lede
2. At a glance — 4-column table (Platform · Approach · Self-hosted? · Latency profile) + bar chart of round-trip latency (illustrative, snapshot-framed) + 4×5 feature heatmap matrix
3. ElevenLabs Conversational AI — deep dive: TTS-grade voice quality, knowledge-base + tool-use, hosted SaaS, voice cloning ecosystem advantage
4. Vapi — deep dive: orchestration-first, pluggable STT/LLM/TTS, voice-as-a-stack, programmable phone numbers, dev-friendly pricing model
5. Retell AI — deep dive: end-to-end voice agent platform with built-in turn-taking, contact-center positioning
6. OpenAI gpt-realtime — deep dive: audio-native model (GA Aug 2025), SIP integration, single-model latency advantage, no orchestration layer
7. Cross-cutting comparison — 4 `<h3>` axes, each a single comparative paragraph addressing all four: *Where audio lives* (their stack vs your stack) / *Model choice freedom* / *Telephony integration* / *Per-minute economics*
8. When to pick which — 4-column decision matrix table by use case (consumer voice assistant / contact center / phone-only / web embed with knowledge base)
9. FAQ (6 Q/A → FAQPage JSON-LD): *Can I run any of these self-hosted? · Which is cheapest at scale? · Does gpt-realtime support function calling? · How do I handle barge-in/interruption? · Which one ships with telephony out of the box? · What about open-source voice agent stacks (LiveKit, Pipecat)?*
10. Further reading

**Diagrams** (4 SVGs):
- `data-latency-comparison.svg` (900×400) — round-trip latency bar chart, illustrative snapshot
- `arch-elevenlabs.svg` (900×500) — architecture
- `arch-openai-realtime.svg` (900×500) — single-model audio-native architecture
- `data-feature-matrix.svg` (900×400) — 4 platforms × 5 axes heatmap

Plus 4 vendor logos under `logos/`: `elevenlabs.svg`, `vapi.svg`, `retell.svg`, `openai.svg`.

---

## Post B — *Mem0 vs Letta vs Zep vs Cognee*

**Slug:** `mem0-vs-letta-vs-zep-vs-cognee`

**Title (en):** *Mem0 vs Letta vs Zep vs Cognee: Four Bets on What "Agent Memory" Actually Means*

**Title (zh):** *Mem0、Letta、Zep 与 Cognee：关于"智能体记忆"到底是什么的四种下注方式*

**Summary (en):** A 128K-token context window degrades past the first thousand tokens and vanishes the moment the session ends. The agent-memory infrastructure market crossed $6 billion in 2026 because "throw it all in the context" stopped being a strategy — and four frameworks now bet differently on what memory should rank, store, and forget.

**Summary (zh):** 12.8 万 token 的上下文窗口在前一千个 token 之后就开始衰减，会话一结束更是一干二净。智能体记忆基础设施市场在 2026 年突破 60 亿美元——因为"全部塞进上下文"已经不再是一条可行的策略——而四家框架对"记忆应该排什么、存什么、忘什么"做出了不同的下注。

**Tags:** `agent-comparison` (reused), `memory` (reused), `infrastructure` (reused), `agent-frameworks` (reused).

**Lede stance:** Lead with the numbers (128K windows degrade past ~1K useful tokens; $6.27B market; 35% CAGR). Thesis: "Storage isn't the moat; *ranking* is." Name the four bets explicitly: extraction-pipeline-first (Mem0), agent-OS-first (Letta), temporal-knowledge-graph-first (Zep), graph-from-anything-first (Cognee).

**Section outline** (9-block standard comparison shape):

1. Hook lede
2. At a glance — 4-column table (Framework · Approach · Self-hosted? · Headline strength) + bar chart of GitHub stars (snapshot) + 4×5 feature heatmap
3. Mem0 — deep dive: extraction pipeline → vector + graph + key-value; user-scoped memory by default
4. Letta (formerly MemGPT) — deep dive: agent-as-a-server, MemGPT paper's "memory hierarchy" thesis productized
5. Zep — deep dive: temporal knowledge graph (Graphiti) underneath, time-aware retrieval, fact decay
6. Cognee — deep dive: build-a-graph-from-anything pipeline, ontology-aware, RAG-graph hybrid
7. Cross-cutting comparison — 4 `<h3>` axes: *What gets stored* (raw vs extracted facts) / *How retrieval ranks* (vector / temporal / graph / hybrid) / *Where the memory lives* (their service vs your DB) / *Schema discipline* (free-form vs ontology)
8. When to pick which — 4-column decision matrix by use case
9. FAQ (6 Q/A): *Do I need a vector DB if I use one of these? · Which is best for multi-user SaaS? · Can these replace a RAG pipeline? · What about MemGPT — is Letta a fork or a rename? · How do I handle fact contradictions? · What about Supermemory and Cogito?*
10. Further reading

**Diagrams** (4 SVGs):
- `data-stars-comparison.svg` (900×400) — GitHub stars snapshot bar chart
- `arch-mem0.svg` (900×500) — extraction pipeline → multi-store architecture
- `arch-zep.svg` (900×500) — temporal knowledge graph architecture
- `data-feature-matrix.svg` (900×400) — 4 frameworks × 5 axes heatmap

Plus 4 vendor logos under `logos/`: `mem0.svg`, `letta.svg`, `zep.svg`, `cognee.svg`.

---

## Post C — *Temporal vs Inngest vs Restate vs Cloudflare Workflows*

**Slug:** `temporal-vs-inngest-vs-restate-vs-cloudflare-workflows`

**Title (en):** *Temporal vs Inngest vs Restate vs Cloudflare Workflows: Four Bets on Keeping Your Agent Alive for 30 Minutes*

**Title (zh):** *Temporal、Inngest、Restate 与 Cloudflare Workflows：让智能体活过 30 分钟的四种下注方式*

**Summary (en):** Naive agent loops die on minute 29 of a 30-minute job. Durable-execution engines journal every step so the next process can pick up exactly where the previous one died — and 2026 was the year hyperscalers shipped their own. Four engines now compete on the same primitive, with very different architectures and bills.

**Summary (zh):** 朴素的智能体循环在 30 分钟作业的第 29 分钟死掉。持久化执行引擎会把每一步记录到日志，下一个进程就能从上次中断的位置接着干——而 2026 正是各家超大规模云厂商也下场推出自家产品的年份。四款引擎围绕同一个原语竞争，但架构与账单差得很远。

**Tags:** `agent-comparison` (reused), `infrastructure` (reused), `orchestration` (reused), `durable-execution` (new).

**Lede stance:** Lead with the failure mode ("agent dies on minute 29 of 30"). Thesis: durable execution is the runtime that makes any orchestration framework actually survive production. Name the four architectural bets: code-as-workflow at maximum control (Temporal), event-driven with DX-first ergonomics (Inngest), virtual-objects with exactly-once semantics (Restate), edge-native serverless (Cloudflare Workflows).

**Section outline** (9-block standard comparison shape):

1. Hook lede
2. At a glance — 4-column table (Engine · Approach · Self-hosted? · Pricing shape) + bar chart of cold-start latency or maturity-by-stars (snapshot) + 4×5 feature heatmap
3. Temporal — deep dive: workflow-as-code, history event journal, mature ecosystem, durable timers/queries/signals
4. Inngest — deep dive: function-as-workflow, step-level retries, dev-server-first DX, agent kit integration
5. Restate — deep dive: virtual objects + RPC + exactly-once journal, no idempotency keys required, newest entrant
6. Cloudflare Workflows — deep dive: edge-native, V8-isolate runtime, integrated with Workers/Queues/D1, GA in late 2025
7. Cross-cutting comparison — 4 `<h3>` axes: *Programming model* (workflow-as-code / step functions / virtual objects / handler graph) / *Determinism story* / *Pricing shape* (per-action vs per-step vs included-with-platform) / *Operational footprint* (self-host vs SaaS vs hyperscaler-included)
8. When to pick which — 4-column decision matrix by use case (long-running LLM workflows / agent tool-call retries / event-driven SaaS / edge-deployed agents)
9. FAQ (6 Q/A): *Is durable execution different from a job queue? · Do I need this if I use LangGraph checkpoints? · What about AWS Step Functions / Durable Functions? · Can I run this self-hosted? · What's the cold-start cost? · Which one survives a region outage?*
10. Further reading — internal link to the earlier `langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk` post (orchestration vs runtime distinction matters)

**Diagrams** (4 SVGs):
- `data-cold-start-or-stars.svg` (900×400) — snapshot bar chart (pick whichever is more defensible — likely GitHub stars or commit recency)
- `arch-temporal.svg` (900×500) — workflow worker + history service architecture
- `arch-restate.svg` (900×500) — virtual objects + journal architecture (contrast with Temporal)
- `data-feature-matrix.svg` (900×400) — 4 engines × 5 axes heatmap

Plus 4 vendor logos under `logos/`: `temporal.svg`, `inngest.svg`, `restate.svg`, `cloudflare.svg`.

---

## Citation rigor

Every numeric claim must be verifiable against an upstream primary source, and that source must appear in *Further reading*. Working list of load-bearing claims to verify before publishing:

- OpenAI gpt-realtime GA date (Aug 2025) and $32/M input pricing.
- SoundHound Amelia 7 launch / 30M annual interactions (CES 2026).
- Agent-memory market $6.27B in 2026, 35% CAGR — cite the report source.
- Context window "degrades past ~1K useful tokens" — cite the research that demonstrates this (likely Lost-in-the-Middle paper or 2026 follow-up).
- Letta renamed from MemGPT — cite Letta's own announcement.
- Temporal / Inngest / Restate maturity claims — cite each project's docs/repo.
- Cloudflare Workflows GA (late 2025) — cite Cloudflare blog.
- AWS Durable Functions GA — cite AWS blog (used only in Post C FAQ).

Any number that can't be traced to a primary source URL is removed from the prose.

## Voice and conventions

Match the established voice from the existing 16 blog posts: hook lede with stakes named in the first 30 words, no throat-clearing, no `TL;DR` label, counter-numbered `<h2>` (set by `BlogLayout`), comparative prose in cross-cutting sections (never four sequential descriptions), product names + technical identifiers stay in English (`ElevenLabs`, `Vapi`, `gpt-realtime`, `SIP`, `Mem0`, `Letta`, `MemGPT`, `Graphiti`, `Temporal`, `Inngest`, `Restate`, `Cloudflare Workflows`, `V8 isolate`, etc.). Tables ≤4 columns per AUTHORING §11.

## Verification gates (per AUTHORING §10 + project CLAUDE.md)

```
npm run build       # no new warnings
npm run verify      # bilingual complete, internal links resolve, OG meta on every page
npm test            # all green incl. blogs.test.mjs (slug uniqueness, date prefix, tag shape)
npm run search:index && npm run test:search   # pagefind index builds, search test passes
```

Manual: open each post at `/blogs/<slug>` and `/zh/blogs/<slug>`, toggle dark mode, click TOC entries, view-source to confirm `"@type":"BlogPosting"` and `"@type":"FAQPage"` JSON-LD blocks.

## Workflow

- One git worktree under `.worktrees/blog-three-agent-stack`, branched from `origin/main` (not from the still-open PR #86 branch, to avoid coupling the two merges).
- Branch: `feature/blog-three-agent-stack-posts-2026-06-22`.
- One PR per the trio, with one combined changelog entry.
- Date bump check right before push: if past 2026-06-22, rename all 4 date-prefixed files (3 post `.ts` + 1 changelog `.ts`) and bump the `date:` fields.

## Out-of-scope risks acknowledged

- Some platforms cited (Cloudflare Workflows GA, AWS Durable Functions GA, Letta renaming, exact OpenAI gpt-realtime pricing) need re-verification at draft time. If a fact has moved by publish day, the prose updates or removes the claim.
- The agent-memory market size figure ($6.27B / 35% CAGR) comes from a single market-research source — if a second source disagrees materially, the post softens to a directional claim rather than a precise number.
- Voice latency numbers in Post A's bar chart are illustrative snapshots — the figcaption frames them as such.
