# PR 2 — Deep-Dive Additions Across Existing Groups + `evaluating-agents` New Group

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 27 new Deep-Dive essays across 7 existing groups plus one new `evaluating-agents` group, delivering the "Deep-Dive additions" track of the approved slate.

**Architecture:** Each existing group receives new entries appended to its `src/content/deep-dives/groups/<key>.ts` file. One new group file `groups/evaluating-agents.ts` is created (order 100, between multi-agent-systems 90 and reasoning 120) with 3 essays. All 27 essays get bilingual HTML fragments under `src/content/deep-dives/{en,zh}/<slug>.html`. One xref back-pass follows drafting, then one bilingual changelog entry, then verification and PR opening.

**Tech Stack:** Astro + TypeScript for group files; body-only HTML fragments using existing `guide.css` class vocabulary (`.phase`, `.step`, `.callout`, `<pre class="standalone">`, `<pre class="trace">`, `<code class="inline">`, `.xref`); vitest for manifest tests.

**Approved slate:** `docs/superpowers/specs/2026-07-06-new-tech-pages-slate.md` (Track 2 section). The `evaluating-agents` design amendment was approved by the user at Checkpoint 1.

**Research source:** `docs/superpowers/specs/2026-07-06-new-tech-pages-research.md` §§3-5.

**PR 1 lessons applied (from `docs/superpowers/plans/2026-07-06-pr1-mcp-group.md` post-mortem):**
- Xref URLs to deep-dives: `/deep-dives/<group-key>/<slug>` (with group segment), zh prepends `/zh`.
- Xref URLs to operations: `/operations/<group-key>/<slug>` (also with group segment). Group keys: `safety-and-security`, `evaluation-and-observability`, `governance-compliance`, `economics-roi`, `agentops`.
- Xref URLs to playbooks: `/playbooks/<group-key>/<slug>`. Group keys: `agent-ux-and-human-interaction`, `coding-and-computer-use-agents`, `domain-playbooks`, `voice-realtime-agents`.
- Xref URLs to concepts: `/concepts/<slug>` (no group segment).
- Never forward-reference an essay not yet committed — internal-link check will fail. When a link seed points at a later essay in this plan, demote to plain prose; Task 28 back-pass adds the link after both essays exist.
- New Deep-Dive group scaffolds cannot commit with empty `entries` array (manifest test rejects). Scaffold + first essay ship in one commit (see Task 19).

---

## File structure

**Created (55 essay files + 1 new group + 1 changelog = 57 files):**

Per essay: `src/content/deep-dives/en/<slug>.html` + `src/content/deep-dives/zh/<slug>.html`. Slugs listed by target group below.

**Modified (7 existing group files):**
- `src/content/deep-dives/groups/architectures-and-patterns.ts` — append 4 entries.
- `src/content/deep-dives/groups/protocols-and-interop.ts` — append 5 entries.
- `src/content/deep-dives/groups/memory-and-context.ts` — append 4 entries.
- `src/content/deep-dives/groups/training-agentic-models.ts` — append 4 entries.
- `src/content/deep-dives/groups/multi-agent-systems.ts` — append 1 entry.
- `src/content/deep-dives/groups/reasoning-and-test-time-compute.ts` — append 1 entry.
- `src/content/deep-dives/groups/tool-capability-design.ts` — append 5 entries.

**Created (1 new group):**
- `src/content/deep-dives/groups/evaluating-agents.ts` — key `evaluating-agents`, order 100, 3 entries.

**Xref back-pass (Task 28) — modifies existing pages to link into new essays:**
- Estimated ~10-15 existing pages touched with one xref each per locale.

**Changelog (Task 29):**
- `src/content/changelog/entries/<merge-date>-pr2-deep-dive-additions.ts` — bilingual entry summarizing the batch.

---

## Standard essay-authoring workflow (referenced by all essay tasks)

**Phase-num prefix map (existing + new):**

| Group key | Prefix | Existing | New in PR 2 |
|---|---|---|---|
| architectures-and-patterns | D | D1-D8 | D9-D12 |
| protocols-and-interop | P | P1-P7 | P8-P12 |
| memory-and-context | M | M1-M7 | M8-M11 |
| retrieval-and-rag | R | R1-R8 | (no additions) |
| training-agentic-models | T | T1-T6 | T7-T10 |
| multi-agent-systems | G | G1-G6 | G7 |
| **evaluating-agents (new)** | **E** | (none) | E1-E3 |
| reasoning-and-test-time-compute | N | N1-N6 | N7 |
| tool-capability-design | K | K1-K6 | K7-K11 |

**Fragment shell (existing convention — copy exactly, adjust prefix/label):**

```html
<section class="phase">
  <div class="phase-num">{PREFIX}{N}</div>
  <div class="week">Deep Dive · {Group name}</div>
  <h2>{one-sentence-claim}</h2>
  <p class="goal">{hook lede — one paragraph, no header label, no bulleted opener}</p>

  <div class="step">
    <div class="step-num">STEP 1</div>
    <h3>{step 1 heading}</h3>
    <p>...</p>
  </div>
  <!-- more <div class="step"> blocks -->
</section>
```

**`.week` header text per group (en / zh):**

| Group | en | zh |
|---|---|---|
| architectures-and-patterns | Deep Dive · Architectures & Patterns | 深入解析 · 架构与模式 |
| protocols-and-interop | Deep Dive · Protocols & Interop | 深入解析 · 协议与互操作 |
| memory-and-context | Deep Dive · Memory & Context | 深入解析 · 记忆与上下文 |
| training-agentic-models | Deep Dive · Training | 深入解析 · 训练 |
| multi-agent-systems | Deep Dive · Multi-Agent | 深入解析 · 多智能体 |
| evaluating-agents | Deep Dive · Evaluating Agents | 深入解析 · 评估智能体 |
| reasoning-and-test-time-compute | Deep Dive · Reasoning | 深入解析 · 推理 |
| tool-capability-design | Deep Dive · Tool & Capability Design | 深入解析 · 工具与能力设计 |

(Verify against existing group's rendered header if unsure — grep `<div class="week">` in an existing en fragment of the same group.)

**Hook lede rule (from CLAUDE.md, mandatory).** One paragraph in `<p class="goal">` between title and first `.step`. Leads with stakes, names the takeaway. No banned openers ("TL;DR", "Summary", "In this post…", "AI agents are everywhere…"). No bullets, no fenced blocks.

**`<pre>` block rule (from CLAUDE.md, mandatory).** `<pre>` blocks byte-identical between en and zh. Only prose translates. Hash-verify with `sha256sum` on the extracted `<pre>` runs before commit.

**Xref markup.** `<a href="/deep-dives/<group-key>/<slug>" class="xref">visible text</a>` in en; prepend `/zh` in zh. Never inside `<pre>`, headings, or `<code>`. First natural mention only.

**Forward-ref discipline.** Never link an essay whose task hasn't run yet. When a link seed points at a later-drafted essay, demote to plain prose. Task 28 back-pass restores the link after both exist.

**The 8-step workflow per essay task:**

1. Append the new entry to `entries` in the appropriate `groups/<key>.ts` (or create the group file with the first entry, for the `evaluating-agents` scaffold in Task 19).
2. Run `npm test` — expect FAIL with a message about the new slug missing bilingual fragments.
3. Write `src/content/deep-dives/en/<slug>.html` per the content spec.
4. Write `src/content/deep-dives/zh/<slug>.html` — byte-identical `<pre>`, faithful prose translation.
5. Run `npm test` — expect PASS.
6. Run `npm run verify` — expect PASS.
7. Run `npm run build` — expect PASS with no new warnings.
8. Commit staged files with the per-task commit message.

---

## Draft order

Serial across all 27 essays. Grouped by target group to keep manifest edits scoped and reviews coherent:

1. **architectures-and-patterns** (D9-D12, 4 essays)
2. **protocols-and-interop** (P8-P12, 5 essays)
3. **memory-and-context** (M8-M11, 4 essays)
4. **training-agentic-models** (T7-T10, 4 essays)
5. **multi-agent-systems** (G7, 1 essay)
6. **evaluating-agents** (E1-E3, 3 essays — scaffold ships with E1)
7. **reasoning-and-test-time-compute** (N7, 1 essay)
8. **tool-capability-design** (K7-K11, 5 essays)

Within each group: must → should → stretch. Cross-links between new essays only reference already-committed ones; any not-yet-committed target is demoted to plain prose and Task 28 restores it.

**Parallelism option (optional optimization):** Essays targeting DIFFERENT groups can run in parallel (each subagent modifies a different `groups/<key>.ts` file, no conflict). If the executor wants throughput, dispatch one subagent per group in parallel; each subagent processes its group's essays serially. This plan is written as strictly serial for simplicity; parallelism is an executor optimization.

---

## Task 1 — Essay D9: `durable-execution-langgraph-plus-temporal`

**Files:**
- Modify: `src/content/deep-dives/groups/architectures-and-patterns.ts` (append entry)
- Create: `src/content/deep-dives/en/durable-execution-langgraph-plus-temporal.html`
- Create: `src/content/deep-dives/zh/durable-execution-langgraph-plus-temporal.html`

**Spec:** size L (~2300 words en), priority must, phase-num `D9`.

**Entry line:**

```ts
{ page: 'durable-execution-langgraph-plus-temporal', slug: 'durable-execution-langgraph-plus-temporal', title: L('Durable Execution: LangGraph + Temporal','持久执行：LangGraph + Temporal'), summary: L("Checkpointer-between-nodes vs Temporal-within-node — replay semantics, why LangGraph loops don't survive at 10k items, and the 'reasoning graph + durable runtime' pattern.",'节点间 checkpointer 与节点内 Temporal——回放语义、LangGraph 循环为何在 1 万条时撑不住，以及"推理图 + 持久运行时"这一模式。') },
```

**`<h2>` claim (en):** Durable execution is not a LangGraph feature vs a Temporal feature — the correct 2026 pattern is a reasoning graph on top of a durable runtime, and the seam between them is where teams get it wrong.

**`<h2>` claim (zh):** 持久执行不是"LangGraph 的一个特性 vs Temporal 的一个特性"——2026 年正确的做法是"推理图 + 持久运行时"，而团队踩坑的地方几乎全在两者的接缝处。

**Hook lede (en):** A LangGraph checkpointer saves state between nodes. Temporal saves state within a workflow function. Confuse the two and your 30-minute research agent crashes 27 minutes in with nothing to resume from. The 2026 pattern that ships is "reasoning graph on top of durable runtime": LangGraph orchestrates the reasoning shape, Temporal owns the durability guarantee. Cordum's engineering post benchmarked plain LangGraph loops failing at ~10k items where Temporal-backed executions kept going. The seam design — which side owns retries, which side owns idempotency, where the checkpoint boundary sits — is the whole game.

**Hook lede (zh):** LangGraph 的 checkpointer 在节点之间保存状态。Temporal 在工作流函数之内保存状态。把两者混为一谈，你的 30 分钟研究智能体会在第 27 分钟崩掉、且没有可续跑的状态。2026 年真正上线的模式是"推理图 + 持久运行时"：LangGraph 掌控推理形状，Temporal 承担持久性保证。Cordum 的工程文章基准跑出：纯 LangGraph 循环在约 1 万条目时崩溃，Temporal 承接的执行仍能继续。接缝设计——谁负责重试、谁负责幂等、checkpoint 边界放在哪里——就是全部博弈。

**Section outline (STEP N, en / zh):**

- STEP 1 — "Two flavors of durability" / "两种持久性口味"
- STEP 2 — "Where LangGraph checkpoints, where Temporal checkpoints" / "LangGraph 与 Temporal 分别在哪打点"
- STEP 3 — "The 10k-item cliff" / "1 万条目断崖"
- STEP 4 — "The reasoning-graph-plus-durable-runtime pattern" / "推理图 + 持久运行时模式"
- STEP 5 — "Idempotency and retries at the seam" / "接缝处的幂等与重试"
- STEP 6 — "When you don't need durability" / "何时不需要持久性"

**Content beats:** STEP 1: checkpointer-between-nodes (LangGraph) captures state between graph edges; Temporal's function-level checkpointing captures every `await`. STEP 2: side-by-side diagram of where a crash mid-execution lands you. STEP 3: Cordum benchmark cite — 10k items = threshold where in-memory graph state exceeds serialize/deserialize budget. STEP 4: the pattern — LangGraph nodes CALL Temporal activities (durable); each node's body is a Temporal workflow signal. STEP 5: seam rules — retries owned by the runtime, idempotency owned by the tool. STEP 6: latency-sensitive user-facing loops don't earn durability; interactive chats <5 min don't earn it.

**Required `<pre>` blocks:** One Python code block (~20 lines) showing a Temporal workflow function calling a LangGraph node as an activity (`<pre class="standalone">`). One trace-style diagram showing the seam (`<pre class="trace">`, ~12 lines).

**Cross-links:** `/deep-dives/architectures-and-patterns/pattern-landscape` (STEP 1), `/deep-dives/architectures-and-patterns/plan-and-execute` (STEP 4), `/concepts/agent-frameworks` (STEP 6).

**Sources:** research §4 (agent engineering) + https://cordum.io/blog/temporal-vs-langgraph + https://www.anthropic.com/engineering/managed-agents.

**8 steps:** Register entry → `npm test` (FAIL) → write en → write zh → `npm test` (PASS) → `npm run verify` → `npm run build` → commit `"Deep-Dive: D9 durable-execution-langgraph-plus-temporal"`.

---

## Task 2 — Essay D10: `context-caching-economics`

**Files:**
- Modify: `groups/architectures-and-patterns.ts`
- Create: `deep-dives/{en,zh}/context-caching-economics.html`

**Spec:** size M (~1400 words), should, `D10`, ⚠ benchmark-dep.

**Entry line:**

```ts
{ page: 'context-caching-economics', slug: 'context-caching-economics', title: L('Context Caching Economics','上下文缓存经济学'), summary: L('Cross-vendor cache pricing (Anthropic 1.25x write / 0.1x read; Gemini 90% off; OpenAI automatic 75-90%), TTL trade-offs, and how caching plus batch stacks to ~95% off list.','跨厂商缓存计价（Anthropic 写 1.25×/读 0.1×；Gemini 减 90%；OpenAI 自动 75%-90%）、TTL 取舍，以及缓存与批处理叠加至约减 95% 的做法。') },
```

**`<h2>` claim (en):** Context caching is the biggest 2026 unit-economics lever most teams under-use, and the fine print — write premium, TTL, invalidation — decides whether "90% off cached" is 90% off in practice or 30%.

**`<h2>` claim (zh):** 上下文缓存是 2026 年多数团队用得最不到位的单位经济性杠杆，而细则——写入溢价、TTL、失效——决定"缓存 9 折"在实操里究竟是 9 折还是 3 折。

**Hook lede (en):** Every model vendor now advertises "up to 90% cheaper" on cache hits, and every team's actual savings are half of that. Anthropic charges 1.25× the base rate on cache writes and gives you 0.1× on reads with a 5-minute TTL. Gemini quotes a uniform 90% off with a longer TTL but a minimum block size. OpenAI does it automatically with less control. Stack caching on top of batch and you're at roughly 95% off list — but only if your traffic shape lets the cache actually hit. This essay is the fine print, per vendor, and the request-shape decisions that turn advertised savings into real ones.

**Hook lede (zh):** 每家模型厂商都在宣传"缓存命中可省 90%"，而每个团队的实际节省差不多只有其一半。Anthropic 的缓存写入按基础价 1.25× 计费，读取按 0.1× 计费，TTL 只有 5 分钟。Gemini 报的是"统一 90% off"，TTL 更长，但有最小块大小。OpenAI 自动缓存，可控性更差。缓存叠加批处理大约 95% off——但仅当你的流量形状让缓存真能命中。这篇讲的就是细则、逐厂商，以及把"广告节省"变成"实际节省"的请求形状决定。

**Section outline:** STEP 1 "Cache pricing across vendors" / "跨厂商缓存计价". STEP 2 "TTL and the freshness / hit-rate trade" / "TTL 与新鲜度/命中率的取舍". STEP 3 "What actually gets cached (prompt prefixes, tool blocks, system)" / "真正被缓存的东西（提示前缀、工具块、system）". STEP 4 "Stacking caching with batch" / "缓存与批处理叠加". STEP 5 "When caching costs you money" / "缓存反而更贵的情形".

**Content beats:** STEP 1: side-by-side table Anthropic vs Gemini vs OpenAI (write premium, read discount, TTL, min block). STEP 2: 5-min TTL = same-session only; longer TTL = cross-user amortization. STEP 3: prefix-based caching means order matters — cacheable content first. STEP 4: batch API also 50% off; caching + batch = ~95%. STEP 5: high write premium hurts if you cache once and read <10 times.

**Required `<pre>` blocks:** One `<pre class="standalone">` sample showing an Anthropic request with `cache_control` on a system+tools block (~15 lines). One `<pre class="trace">` showing per-vendor pricing math with a concrete monthly-cost example (~12 lines).

**Cross-links:** `/concepts/cost-quality-latency` (STEP 1), `/deep-dives/memory-and-context/context-budgeting` (STEP 3), `/concepts/inference-providers` (STEP 1).

**Sources:** research §3 + https://leanlm.ai/blog/prompt-caching + https://ofox.ai/blog/prompt-caching-cost-math-anthropic-vs-openai-2026/.

**8 steps:** Same pattern. Commit: `"Deep-Dive: D10 context-caching-economics"`.

---

## Task 3 — Essay D11: `browser-agent-failure-modes`

**Files:** groups/architectures-and-patterns.ts + `browser-agent-failure-modes.html` en/zh.

**Spec:** M (~1400 words), should, `D11`.

**Entry line:**

```ts
{ page: 'browser-agent-failure-modes', slug: 'browser-agent-failure-modes', title: L('Browser Agent Failure Modes','浏览器智能体的失败模式'), summary: L('The six failure modes WebArena does not catch — DOM drift, screenshot ambiguity, login state, modal interruptions, rate-limit cliffs, irreversibility.','WebArena 抓不到的六种失败模式——DOM 漂移、截图歧义、登录状态、模态弹窗打断、限流断崖、不可逆操作。') },
```

**`<h2>` claim (en):** WebArena numbers say browser agents are close to shipping; the six failure modes benchmarks don't catch say they aren't, and each mode has a harness fix that doesn't need a better model.

**`<h2>` claim (zh):** WebArena 的分数看起来"浏览器智能体接近上线"；基准抓不到的六种失败模式则说"没接近"，而每一种都有不需要更强模型的外壳级修法。

**Hook lede (en):** WebArena's leaderboard put Claude Mythos Preview at 68.7% and dozens of "browser agents ship in 2026" posts followed. Then the same agents deployed to a real corporate portal timed out at 12% success. The gap is six failure modes benchmarks don't include: DOM drift between screenshots, screenshot ambiguity when a button is off-canvas, login state that expires mid-run, modal interruptions, per-tenant rate-limit cliffs, and irreversible actions the agent shouldn't have taken. Each has a fix in the harness, not the model.

**Hook lede (zh):** WebArena 排行榜上 Claude Mythos Preview 拿到 68.7%，然后几十篇"浏览器智能体 2026 年就要上线了"的帖子跟进。同样的智能体部署到真实企业门户，成功率超时降到 12%。差距在于六种基准不测的失败模式：截图之间的 DOM 漂移、按钮出画时的截图歧义、跑到一半过期的登录状态、模态弹窗打断、按租户设置的限流断崖，以及"本不该做出的"不可逆操作。每一种都是外壳（harness）而非模型的修法。

**Section outline:** STEP 1 "The gap between WebArena and prod" / "WebArena 与生产之间的差距". STEP 2 "DOM drift" / "DOM 漂移". STEP 3 "Screenshot ambiguity" / "截图歧义". STEP 4 "Login state and modals" / "登录状态与模态弹窗". STEP 5 "Rate-limit cliffs" / "限流断崖". STEP 6 "Irreversibility budgets" / "不可逆预算".

**Content beats:** Each STEP: describe the failure mode with a concrete trace, then the harness-level fix (DOM anchor hashing, viewport auto-scroll before screenshot, session-refresh checkpoint, dismiss-modal-first policy, exponential backoff with tenant awareness, undoable-vs-irreversible action classification).

**Required `<pre>` blocks:** One `<pre class="trace">` showing a failure trace across the six modes (~20 lines). One `<pre class="standalone">` showing the DOM-anchor-hashing fix (~12 lines Python or TS).

**Cross-links:** `/deep-dives/architectures-and-patterns/pattern-landscape` (STEP 1), `/deep-dives/architectures-and-patterns/tool-error-recovery` (STEP 6), `/playbooks/coding-and-computer-use-agents/browser-agents` (STEP 1).

**Sources:** research §3 + https://futureagi.com/blog/evaluating-browser-use-agents-2026/ + https://awesomeagents.ai/leaderboards/web-agent-benchmarks-leaderboard/.

**8 steps:** Same. Commit: `"Deep-Dive: D11 browser-agent-failure-modes"`.

---

## Task 4 — Essay D12: `claude-managed-agents-architecture`

**Files:** groups/architectures-and-patterns.ts + `claude-managed-agents-architecture.html` en/zh.

**Spec:** M (~1400 words), stretch, `D12`, ⚠ benchmark-dep.

**Entry line:**

```ts
{ page: 'claude-managed-agents-architecture', slug: 'claude-managed-agents-architecture', title: L('Claude Managed Agents: Architecture','Claude Managed Agents 架构'), summary: L('Durable session as append-only event log, stateless harness, wake(sessionId) recovery — and what the pattern gives up.','把持久会话建模为只追加事件日志、无状态外壳、wake(sessionId) 恢复——以及这一模式放弃了什么。') },
```

**`<h2>` claim (en):** Claude Managed Agents shipped "wake up where you left off" as a first-class primitive by making the session an append-only event log and the harness stateless; the design is worth reading even if you don't use the product.

**`<h2>` claim (zh):** Claude Managed Agents 通过把会话建模为只追加事件日志、外壳保持无状态，把"从上次断点唤醒"做成了一级原语；即便你不用这个产品，这份设计也值得读。

**Hook lede (en):** In April 2026 Anthropic shipped Managed Agents with a claimed 60% p50 / 90% p95 TTFT drop on resumption. The mechanism is a design most agent frameworks reach for eventually: the session is an append-only event log on Anthropic's side, the client harness is stateless, and `wake(sessionId)` replays the log. It buys durability without a Temporal-shaped runtime, but the constraints — no client-side branching, no partial replay — are real. This essay is the architecture, the trade-offs, and where the pattern generalizes.

**Hook lede (zh):** 2026 年 4 月 Anthropic 上线 Managed Agents，宣称恢复时 p50 TTFT 降 60%、p95 降 90%（数据待独立复核）。机制是多数智能体框架迟早都会走到的设计：会话是 Anthropic 侧的只追加事件日志，客户端外壳无状态，`wake(sessionId)` 回放日志。这换来了不需要 Temporal 级运行时的持久性，但代价——不能客户端分支、不能部分回放——是实实在在的。这篇讲架构、取舍，以及这套模式向何处泛化。

**Section outline:** STEP 1 "Append-only event log as the durable primitive" / "作为持久原语的只追加事件日志". STEP 2 "Stateless harness and wake(sessionId)" / "无状态外壳与 wake(sessionId)". STEP 3 "What the pattern gives up" / "这一模式放弃了什么". STEP 4 "When to build this yourself vs use Managed Agents" / "何时自建、何时用 Managed Agents".

**Content beats:** STEP 1: log entries are (turn, tool_call, tool_result, message). STEP 2: replay is deterministic if tools are idempotent. STEP 3: no branching, no partial replay, tool determinism required. STEP 4: build yourself if you need to own the log or if your tools are inherently non-deterministic.

**Required `<pre>` blocks:** One `<pre class="trace">` showing a session log with a wake replay (~18 lines JSON). One `<pre class="standalone">` showing a Python-side wake call (~10 lines).

**Cross-links:** `/deep-dives/architectures-and-patterns/durable-execution-langgraph-plus-temporal` (STEP 1 — exists after Task 1), `/concepts/agent-frameworks` (STEP 4).

**Sources:** https://www.anthropic.com/engineering/managed-agents. Note: TTFT numbers are vendor claims; keep language attributive.

**8 steps:** Same. Commit: `"Deep-Dive: D12 claude-managed-agents-architecture"`.

---

## Task 5 — Essay P8: `a2a-v1-deep-dive`

**Files:** groups/protocols-and-interop.ts + `a2a-v1-deep-dive.html` en/zh.

**Spec:** L (~2300 words), must, `P8`, ⚠ spec-dep.

**Entry line:**

```ts
{ page: 'a2a-v1-deep-dive', slug: 'a2a-v1-deep-dive', title: L('A2A v1.0: Task Lifecycle, Messages, Artifacts','A2A v1.0：任务生命周期、消息、产物'), summary: L("A2A hit v1.0 in April 2026 — nine task states (not four), Message vs Artifact split, A2A-Version header, breaking changes from pre-1.0, and 150+ org adoption.",'A2A 于 2026 年 4 月发布 v1.0——九种任务状态（不是四种）、Message 与 Artifact 之分、A2A-Version 头、pre-1.0 破坏性变更，以及 150+ 组织采纳。') },
```

**`<h2>` claim (en):** A2A v1.0 (April 2026) is not the same protocol as pre-1.0 — the nine-state task lifecycle, the Message vs Artifact distinction, and the versioning header are the load-bearing pieces the `a2a-communication` essay predates.

**`<h2>` claim (zh):** A2A v1.0（2026 年 4 月）与 pre-1.0 不是同一份协议——九种任务状态、Message 与 Artifact 之分、以及版本 header 才是承重件，而 `a2a-communication` 一文成文早于这些。

**Hook lede (en):** A2A shipped v1.0 on April 9, 2026, one year after Google announced it. 150+ member orgs, five official SDKs, adopted in Azure and Bedrock. The concept-level `a2a-communication` essay on this site predates it and describes four task states; v1.0 has nine, including `INPUT_REQUIRED`, `AUTH_REQUIRED`, and `REJECTED` — states you'll build your delegation logic around. The Message vs Artifact split (turns vs outputs), the `A2A-Version` header, and the streaming-per-transport model are the parts to read carefully. This essay is v1.0 the way you'll implement it.

**Hook lede (zh):** A2A 于 2026 年 4 月 9 日发布 v1.0，距 Google 首次宣布正好一年。150+ 组织成员、五个官方 SDK、在 Azure 与 Bedrock 中被采纳。本站概念层的 `a2a-communication` 一文成文早于 v1.0，描述的是四种任务状态；v1.0 有九种，包括 `INPUT_REQUIRED`、`AUTH_REQUIRED`、`REJECTED`——你会围绕它们构建委派逻辑。Message 与 Artifact 的拆分（回合 vs 输出）、`A2A-Version` 头，以及"按传输协议分别流式"的模型，才是要细读的部分。这篇写的是"你将去实现的" v1.0。

**Section outline:** STEP 1 "What changed from pre-1.0" / "相较 pre-1.0 有何变化". STEP 2 "The nine-state task lifecycle" / "九态任务生命周期". STEP 3 "Message vs Artifact" / "Message 与 Artifact". STEP 4 "Streaming per transport" / "按传输协议的流式". STEP 5 "Versioning: A2A-Version and migration" / "版本控制：A2A-Version 与迁移". STEP 6 "Adoption reality check" / "采纳现状核查".

**Content beats:** STEP 1: table of pre-1.0 → v1.0 breaking changes. STEP 2: state diagram + when each state fires. STEP 3: Message = a turn, Artifact = a deliverable; long-running tasks accumulate artifacts. STEP 4: SSE for JSON-RPC, native gRPC, HTTP streaming per binding. STEP 5: version header + negotiation. STEP 6: "150+ orgs" is LF marketing; actual production deploys are ~20 named.

**Required `<pre>` blocks:** One `<pre class="trace">` state-transition example showing INPUT_REQUIRED → completion (~18 lines JSON). One `<pre class="standalone">` showing an Agent Card JSON with `A2A-Version` (~15 lines).

**Cross-links:** `/deep-dives/protocols-and-interop/a2a-communication` (STEP 1), `/deep-dives/protocols-and-interop/interop-problem` (STEP 6), `/deep-dives/protocols-and-interop/capability-discovery` (STEP 3).

**Sources:** https://a2a-protocol.org/latest/specification/ + LF adoption press release.

**8 steps:** Same. Commit: `"Deep-Dive: P8 a2a-v1-deep-dive"`.

---

## Task 6 — Essay P9: `agent-cards-and-discovery`

**Files:** groups/protocols-and-interop.ts + `agent-cards-and-discovery.html` en/zh.

**Spec:** M (~1400 words), should, `P9`, ⚠ spec-dep.

**Entry line:**

```ts
{ page: 'agent-cards-and-discovery', slug: 'agent-cards-and-discovery', title: L('Agent Cards & Discovery','智能体卡片与发现'), summary: L("A2A's /.well-known/agent.json — capability declaration, extended cards, signing, caching, and how it compares with MCP registry-based discovery.",'A2A 的 /.well-known/agent.json——能力声明、扩展卡片、签名、缓存，以及与基于 MCP 注册表的发现相比是何差异。') },
```

**`<h2>` claim (en):** Agent Cards at `/.well-known/agent.json` are how A2A does discovery — same idea as OpenID Connect discovery, applied to agents, with signing as the open question.

**`<h2>` claim (zh):** A2A 通过 `/.well-known/agent.json` 上的 Agent Card 做发现——思路等同 OpenID Connect 的发现，只是应用到智能体，签名则是悬而未决的问题。

**Hook lede (en):** Agents advertise themselves at `/.well-known/agent.json` — capabilities, endpoints, versioning, extended-card location, cache hints. The pattern is stolen from OpenID Connect and works well until you ask "how do I trust this Agent Card?". The Signed Agent Cards proposal (A2A #1672) is still open. This essay is what's in the card today, what belongs there tomorrow, and how it contrasts with MCP's registry-based discovery — one pull vs push, both live in production.

**Hook lede (zh):** 智能体通过 `/.well-known/agent.json` 自我披露——能力、端点、版本、扩展卡片位置、缓存提示。这个模式借自 OpenID Connect，运转良好——直到你问"我怎么信任这张 Agent Card？"Signed Agent Cards 提案（A2A #1672）目前仍未合并。本文写的是：卡片里现在有什么、未来该有什么、以及和基于 MCP 注册表的发现相比一拉一推的差异。

**Section outline:** STEP 1 "The card shape today" / "今天卡片的形状". STEP 2 "Extended cards and the /.well-known convention" / "扩展卡片与 /.well-known 约定". STEP 3 "Signed cards: the unmerged proposal" / "签名卡片：尚未合并的提案". STEP 4 "Contrast: A2A card vs MCP registry" / "对比：A2A card 与 MCP registry". STEP 5 "Caching semantics" / "缓存语义".

**Content beats:** STEP 1: JSON schema for AgentCard v1.0. STEP 2: extended card = live-fetched detail, base card = static. STEP 3: ECDSA P-256 proposal, why unsigned cards are a trust hole. STEP 4: A2A pulls, MCP pushes; A2A per-org, MCP central index. STEP 5: cache TTL, revalidation, revocation.

**Required `<pre>` blocks:** One AgentCard JSON (~15 lines). One extended-card fetch showing content-negotiated response (~10 lines HTTP trace).

**Cross-links:** `/deep-dives/protocols-and-interop/capability-discovery` (STEP 1), `/deep-dives/mcp/mcp-registry-and-distribution` (STEP 4). NOTE: `a2a-v1-deep-dive` link seed exists (Task 5 already committed).

**Sources:** https://a2a-protocol.org/latest/specification/ + https://github.com/a2aproject/A2A/issues/1672.

**8 steps:** Same. Commit: `"Deep-Dive: P9 agent-cards-and-discovery"`.

---

## Task 7 — Essay P10: `acp-and-what-happened`

**Files:** groups/protocols-and-interop.ts + `acp-and-what-happened.html` en/zh.

**Spec:** S (~800 words), stretch, `P10`.

**Entry line:**

```ts
{ page: 'acp-and-what-happened', slug: 'acp-and-what-happened', title: L('ACP: What Happened','ACP：后来怎么了'), summary: L("A short post-mortem — ACP existed, was REST-native, was contributed to the Linux Foundation in July 2025, and folded into A2A. Useful because search still surfaces stale 'ACP vs A2A' content.",'一份简短的复盘——ACP 存在过、以 REST 为原生、于 2025 年 7 月被贡献给 Linux 基金会，并并入 A2A。之所以有用，是因为搜索仍会返回过时的"ACP vs A2A"内容。') },
```

**`<h2>` claim (en):** ACP was a real project, was folded into A2A in mid-2025, and every "ACP vs A2A" post older than August 2025 is stale — this short essay closes that door.

**`<h2>` claim (zh):** ACP 曾是真项目、于 2025 年年中并入 A2A，晚于 2025 年 8 月之前的每一篇"ACP vs A2A"都已过期——这篇短文把这扇门关上。

**Hook lede (en):** ACP (Agent Communication Protocol, IBM/AGNTCY) was contributed to the Linux Foundation in July 2025 and merged into A2A the same month. Every "should we use ACP or A2A" post older than that is stale. Search results have not caught up. This essay is short by design: what ACP was, why the merge made sense, and where its ideas ended up inside A2A v1.0.

**Hook lede (zh):** ACP（Agent Communication Protocol，IBM/AGNTCY）于 2025 年 7 月被贡献给 Linux 基金会，并在同月并入 A2A。晚于此之前的每一篇"我们该用 ACP 还是 A2A"都已过期。搜索结果尚未跟上。这篇按设计写得很短：ACP 是什么、并入为何合理、它的思路最终落在了 A2A v1.0 的哪里。

**Section outline:** STEP 1 "What ACP was" / "ACP 是什么". STEP 2 "The merger" / "合并". STEP 3 "Which ACP ideas survived" / "ACP 有哪些思路留存".

**Content beats:** STEP 1: REST-native, human-readable message model, IBM-led. STEP 2: LF-managed, merger driven by co-locating the two efforts under one governance. STEP 3: ACP's REST-first idea influenced A2A's HTTP binding.

**Required `<pre>` blocks:** None mandatory. Optional: a timeline diagram (`<pre class="trace">`, 6 lines).

**Cross-links:** `/deep-dives/protocols-and-interop/interop-problem` (STEP 1). NOTE: `a2a-v1-deep-dive` link seed exists (Task 5 committed).

**Sources:** https://agentcommunicationprotocol.dev/introduction/welcome + LF announcement.

**8 steps:** Same. Commit: `"Deep-Dive: P10 acp-and-what-happened"`.

---

## Task 8 — Essay P11: `ap2-and-agent-commerce`

**Files:** groups/protocols-and-interop.ts + `ap2-and-agent-commerce.html` en/zh.

**Spec:** M (~1400 words), stretch, `P11`, ⚠ spec-dep.

**Entry line:**

```ts
{ page: 'ap2-and-agent-commerce', slug: 'ap2-and-agent-commerce', title: L('AP2 & Agent Commerce','AP2 与智能体商务'), summary: L('The Agent Payments Protocol — Intent / Cart / Payment as W3C VCs, why it sits above A2A/MCP rather than inside them, and the stablecoin-rail pitch to keep skeptical of.','智能体支付协议——把 Intent/Cart/Payment 建模为 W3C VC，为何它位于 A2A/MCP 之上而非之内，以及需要保持怀疑的"稳定币轨道"话术。') },
```

**`<h2>` claim (en):** AP2 is a policy protocol (mandates as W3C VCs), not a payment rail — and knowing the difference is the whole read.

**`<h2>` claim (zh):** AP2 是一份策略协议（把授权建模为 W3C VC），不是支付轨道——搞清这点就是全部要读的东西。

**Hook lede (en):** Every "AP2 will make agents transact autonomously" post gets one thing wrong: AP2 is not a payment rail, it's a mandate protocol. Intent, Cart, and Payment are modeled as W3C Verifiable Credentials that the agent presents to a merchant; the actual money movement happens over whatever rails you already had. Google announced it in September 2025 with 60+ launch partners. This essay is what AP2 actually does, where it fits above A2A and MCP, and the stablecoin narrative to hold at arm's length.

**Hook lede (zh):** 每一篇"AP2 将让智能体自主交易"的帖子都把一件事讲错了：AP2 不是支付轨道，而是一份授权协议。Intent、Cart、Payment 被建模为 W3C 可验证凭证，智能体把它们出示给商户；真正的资金流动仍走你原本已有的轨道。Google 在 2025 年 9 月宣布 AP2，60+ 合作方启用。这篇讲 AP2 到底做什么、它如何位于 A2A 和 MCP 之上，以及那套需要保持怀疑的稳定币叙事。

**Section outline:** STEP 1 "Mandate, not rail" / "授权，不是轨道". STEP 2 "Intent / Cart / Payment as VCs" / "Intent/Cart/Payment 作为 VC". STEP 3 "Where AP2 sits in the stack" / "AP2 在栈中的位置". STEP 4 "The stablecoin pitch, examined" / "稳定币话术的检验". STEP 5 "Adoption reality" / "采纳现状".

**Content beats:** STEP 1: the VC-based mandate model — what it authorizes, not how money moves. STEP 2: three-VC lifecycle example. STEP 3: sits above MCP (agent-to-tool) and A2A (agent-to-agent). STEP 4: stablecoin rails are optional; most flows stay on cards. STEP 5: 60 partners at launch is a strong number, actual production merchant flows are thinner.

**Required `<pre>` blocks:** One VC-shaped JSON for a Cart mandate (~15 lines). Optional: a sequence diagram (`<pre class="trace">`, 10 lines).

**Cross-links:** NOTE: `a2a-v1-deep-dive` (Task 5) + `agent-cards-and-discovery` (Task 6) committed. `/deep-dives/protocols-and-interop/a2a-v1-deep-dive` and `/deep-dives/protocols-and-interop/agent-cards-and-discovery` in STEP 3.

**Sources:** https://ap2-protocol.org/ + https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol.

**8 steps:** Same. Commit: `"Deep-Dive: P11 ap2-and-agent-commerce"`.

---

## Task 9 — Essay P12: `agents-json-and-openapi-for-agents`

**Files:** groups/protocols-and-interop.ts + `agents-json-and-openapi-for-agents.html` en/zh.

**Spec:** M (~1400 words), stretch, `P12`.

**Entry line:**

```ts
{ page: 'agents-json-and-openapi-for-agents', slug: 'agents-json-and-openapi-for-agents', title: L('agents.json & OpenAPI for Agents','agents.json 与面向智能体的 OpenAPI'), summary: L('The agents.json v0.1 spec on top of OpenAPI, the AGENTS.md convention adopted by 20k+ repos, and why "just point the agent at your OpenAPI" does not fully work.','建立在 OpenAPI 之上的 agents.json v0.1 规范、被 20k+ 仓库采用的 AGENTS.md 约定，以及为什么"把 OpenAPI 直接给智能体"并不彻底奏效。') },
```

**`<h2>` claim (en):** OpenAPI is not sufficient for agent consumption — agents.json v0.1 and AGENTS.md are the practical patches, and their limits point at what MCP was actually solving.

**`<h2>` claim (zh):** OpenAPI 不足以让智能体直接消费——agents.json v0.1 与 AGENTS.md 是实操层的补丁，其局限恰好点出了 MCP 到底在解决什么。

**Hook lede (en):** "Point the agent at your OpenAPI spec" gets you the endpoints; it doesn't get you which endpoints to use in what order, when to bail out, or what a successful run looks like. Two conventions patched this in 2025: agents.json v0.1 layers agent-specific hints on top of OpenAPI, and AGENTS.md (adopted by 20k+ GitHub repos) sits at the repository level. Both help. Both point at the reasons MCP exists as a distinct protocol.

**Hook lede (zh):** "把 OpenAPI 给智能体"让它拿到端点；但没告诉它"用哪些、以什么顺序、什么时候放弃、成功长什么样"。2025 年出现了两种约定来打补丁：agents.json v0.1 在 OpenAPI 之上叠一层"面向智能体的提示"，AGENTS.md（被 20k+ GitHub 仓库采用）落在仓库层。两者都有用。两者也都指向了"MCP 为何是一份单独协议"的原因。

**Section outline:** STEP 1 "What OpenAPI misses" / "OpenAPI 缺什么". STEP 2 "agents.json v0.1" / "agents.json v0.1". STEP 3 "AGENTS.md at repo level" / "仓库层的 AGENTS.md". STEP 4 "Why MCP is still needed" / "为何仍需要 MCP".

**Content beats:** STEP 1: ordering, error semantics, resource-vs-tool boundary, consent hints. STEP 2: agents.json format sample, how it references an OpenAPI. STEP 3: AGENTS.md convention — repo-level docs for agent operators. STEP 4: MCP encodes a full session/lifecycle model; agents.json/AGENTS.md don't.

**Required `<pre>` blocks:** One agents.json sample (~12 lines). One AGENTS.md excerpt (~10 lines).

**Cross-links:** `/deep-dives/mcp/mcp-tool-design` (STEP 4), `/deep-dives/tool-capability-design/tool-discovery-and-docs` (STEP 1), `/deep-dives/protocols-and-interop/structured-tool-io` (STEP 4).

**Sources:** https://github.com/wild-card-ai/agents-json + AGENTS.md convention writeups.

**8 steps:** Same. Commit: `"Deep-Dive: P12 agents-json-and-openapi-for-agents"`.

---

## Task 10 — Essay M8: `memory-write-path-architectures`

**Files:** groups/memory-and-context.ts + `memory-write-path-architectures.html` en/zh.

**Spec:** L (~2300 words), must, `M8`.

**Entry line:**

```ts
{ page: 'memory-write-path-architectures', slug: 'memory-write-path-architectures', title: L('Memory Write-Path Architectures','记忆的写入路径架构'), summary: L('RAG-only is dead for stateful agents — the write path (what earns a slot, when to write, when to update) is the 2026 focus, and the four memory kinds (episodic, semantic, procedural, relational) each want a different policy.','对有状态智能体来说 RAG-only 已死——写入路径（谁配占位、何时写、何时更新）才是 2026 年的焦点，而四类记忆（情景、语义、程序、关系）各要各的策略。') },
```

**`<h2>` claim (en):** The read side of memory is a solved problem; the write side is where 2026 architectures diverge — episodic vs semantic vs procedural vs relational memory each want different write policies, and RAG-only is not one of them.

**`<h2>` claim (zh):** 记忆的读侧问题已解；2026 年的架构分歧出现在写侧——情景、语义、程序、关系四类记忆各要各的写策略，而 RAG-only 不是其中之一。

**Hook lede (en):** For years "give the agent memory" meant "put a vector store next to it." That works for the retrieval side. It falls over on the write side: what earns a memory slot, when the slot expires, who invalidates a stale entry, and whether the write is user-visible. 2026 memory architectures split by memory kind — episodic (event traces), semantic (facts), procedural (learned behaviors), relational (entity graphs) — and each demands its own write policy. This essay is the taxonomy, the write-time decisions, and where teams still ship RAG-only in 2026.

**Hook lede (zh):** 多年以来，"给智能体加记忆"意思是"旁边挂一份向量库"。这在读侧奏效。写侧则崩掉：谁配占用一个记忆槽、槽何时过期、过期条目谁去失效、写入是否用户可见。2026 年的记忆架构按记忆种类分——情景（事件轨迹）、语义（事实）、程序（学到的行为）、关系（实体图）——每一类都要求各自的写策略。这篇讲分类法、写时决策，以及"2026 年为何仍有团队只交付 RAG-only"。

**Section outline:** STEP 1 "The four memory kinds" / "四类记忆". STEP 2 "Write-path decisions" / "写入路径的决策". STEP 3 "Episodic memory writes" / "情景记忆写入". STEP 4 "Semantic memory writes and invalidation" / "语义记忆写入与失效". STEP 5 "Procedural and relational writes" / "程序与关系记忆写入". STEP 6 "User-visible writes and consent" / "用户可见的写入与同意".

**Content beats:** STEP 1: mini-taxonomy with example use cases. STEP 2: what earns / when / who invalidates / visibility. STEP 3: log-style, append-only, cheap to write. STEP 4: dedupe, provenance, hardest to invalidate. STEP 5: procedural = "how to do X" recipes; relational = graph edges. STEP 6: user-visible writes need consent surface.

**Required `<pre>` blocks:** One `<pre class="trace">` showing a write-policy decision tree (~15 lines). One `<pre class="standalone">` code sample of a write-gate function (~12 lines Python).

**Cross-links:** `/deep-dives/memory-and-context/short-vs-long-term-memory` (STEP 1), `/deep-dives/memory-and-context/memory-types` (STEP 1), `/deep-dives/memory-and-context/retrieval-augmented-memory` (STEP 2).

**Sources:** research §4 + https://medium.com/@Micheal-Lanham/knowledge-and-memory-beyond-rag-why-2026-agents-need-a-write-path-not-just-a-retriever-ae2547b7ffe9.

**8 steps:** Same. Commit: `"Deep-Dive: M8 memory-write-path-architectures"`.

---

## Task 11 — Essay M9: `memory-poisoning-defenses`

**Files:** groups/memory-and-context.ts + `memory-poisoning-defenses.html` en/zh.

**Spec:** M (~1400 words), should, `M9`.

**Entry line:**

```ts
{ page: 'memory-poisoning-defenses', slug: 'memory-poisoning-defenses', title: L('Memory Poisoning Defenses','记忆毒化防御'), summary: L('AgentPoison at 80% ASR with <0.1% poison; MemoryGraft, SpAIware, Morris-II — lifecycle defenses at ingestion, storage, retrieval, and monitoring.','AgentPoison 在毒化率 <0.1% 时达 80% ASR；MemoryGraft、SpAIware、Morris-II——在摄取、存储、检索、监控四段做生命周期防御。') },
```

**`<h2>` claim (en):** Memory poisoning is a real class of attack — AgentPoison hits 80% success at 0.1% poison — and the defenses live at four lifecycle stages, not at one "detect malicious input" checkpoint.

**`<h2>` claim (zh):** 记忆毒化是真实的攻击类别——AgentPoison 在 0.1% 毒化率下达 80% 成功率——而防御分布在生命周期的四段，而不是集中在一个"检测恶意输入"关卡。

**Hook lede (en):** AgentPoison achieves an 80% attack success rate against agent memory systems with under 0.1% poisoned entries. MemoryGraft, SpAIware, and the Morris-II worm each attack different layers. The naive defense — "sanitize input at write time" — fails because the input often looks benign; the exploit is in how the memory gets recalled later. The defense is a four-stage lifecycle: gate at ingestion, provenance at storage, quorum at retrieval, drift at monitoring.

**Hook lede (zh):** AgentPoison 在被投毒条目占比不到 0.1% 时，对智能体记忆系统实现 80% 攻击成功率。MemoryGraft、SpAIware、Morris-II 蠕虫分别攻击不同层。朴素防御——"写入时消毒"——失败，因为输入看起来往往无害；漏洞在于"记忆之后如何被回忆"。真正的防御是四段生命周期：摄取时做门控、存储时做溯源、检索时做多数决、监控时做漂移检测。

**Section outline:** STEP 1 "The threat catalog" / "威胁目录". STEP 2 "Ingestion-stage defense" / "摄取阶段的防御". STEP 3 "Storage-stage: provenance and versioning" / "存储阶段：溯源与版本". STEP 4 "Retrieval-stage: quorum and voting" / "检索阶段：多数决与投票". STEP 5 "Monitoring: drift detection" / "监控：漂移检测".

**Content beats:** STEP 1: AgentPoison, MemoryGraft, SpAIware, Morris-II. STEP 2: rate-limit writes per source, quarantine unfamiliar sources. STEP 3: attribute every memory to its source. STEP 4: retrieve k, vote for agreement, drop outliers. STEP 5: watch retrieval distribution over time.

**Required `<pre>` blocks:** One `<pre class="trace">` showing an AgentPoison attack trace (~15 lines). One `<pre class="standalone">` showing a quorum-retrieval function (~12 lines).

**Cross-links:** `/deep-dives/memory-and-context/evaluating-memory` (STEP 1), `/deep-dives/memory-and-context/memory-stores` (STEP 3), `/operations/safety-and-security/prompt-injection` (STEP 1), `/operations/safety-and-security/agentic-threat-model` (STEP 1).

**Sources:** research §4 + https://beyondscale.tech/blog/ai-agent-memory-poisoning-defense-guide.

**8 steps:** Same. Commit: `"Deep-Dive: M9 memory-poisoning-defenses"`.

---

## Task 12 — Essay M10: `long-context-effective-vs-advertised`

**Files:** groups/memory-and-context.ts + `long-context-effective-vs-advertised.html` en/zh.

**Spec:** M (~1400 words), should, `M10`, ⚠ benchmark-dep.

**Entry line:**

```ts
{ page: 'long-context-effective-vs-advertised', slug: 'long-context-effective-vs-advertised', title: L('Long Context: Effective vs Advertised','长上下文：有效 vs 广告'), summary: L('Why RULER, NoLiMa, MRCR v2 diverge from advertised token ceilings by 30-60 points past 200K — and how to budget accordingly.','为何 RULER、NoLiMa、MRCR v2 在 200K 以外与广告标称值有 30–60 分的差距——以及据此如何预算。') },
```

**`<h2>` claim (en):** A 1M-token context ceiling and 500K effective usable tokens are both true — RULER and NoLiMa disagree with the marketing page by 30 to 60 points past 200K, and this is now the honest planning number.

**`<h2>` claim (zh):** "1M 上下文上限"与"实际可用 500K"可以同真——RULER 与 NoLiMa 在 200K 之外与营销页有 30–60 分的分歧，这就是如今诚实的规划数字。

**Hook lede (en):** Gemini 3.5 Pro sells a 2M token ceiling. Claude Opus 4.7 sells 1M. Both are true numbers, and both are misleading planning numbers — RULER puts effective usable context at ~55% of the ceiling past 200K, NoLiMa agrees, MRCR v2 puts it lower. Budget your prompt to the effective number, not the advertised one. This essay is the benchmarks, why they diverge from marketing, and the three prompt-shape moves that recover some of the gap.

**Hook lede (zh):** Gemini 3.5 Pro 报的 ceiling 是 2M。Claude Opus 4.7 报 1M。都是真实数字，也都会误导规划——RULER 说 200K 以外的有效可用上下文约为 ceiling 的 55%，NoLiMa 一致，MRCR v2 更低。给提示词的预算按有效值，而不是广告值。这篇讲三份基准、它们与营销数字为何不同，以及三种能挽回部分差距的提示形状。

**Section outline:** STEP 1 "RULER, NoLiMa, MRCR v2 — what each measures" / "RULER、NoLiMa、MRCR v2——各自测的是什么". STEP 2 "The gap: 30 to 60 points past 200K" / "差距：200K 之外的 30–60 分". STEP 3 "Why the gap is real, not benchmark artifact" / "差距为何真实、并非基准伪影". STEP 4 "Three prompt-shape recoveries" / "三种提示形状的挽回". STEP 5 "The planning rule" / "规划规则".

**Content beats:** STEP 1: RULER = multi-task retrieval; NoLiMa = literal retrieval hidden in noise; MRCR = multi-round-context-recall v2. STEP 2: chart-worthy numbers per vendor per benchmark. STEP 3: attention shape, not benchmark bias. STEP 4: position anchoring, chunked recall, question-first-then-context. STEP 5: "plan to 60% of ceiling" is the survivable heuristic.

**Required `<pre>` blocks:** One `<pre class="trace">` per-vendor per-benchmark score table (~20 lines). One `<pre class="standalone">` showing a position-anchored prompt template (~12 lines).

**Cross-links:** `/deep-dives/memory-and-context/context-budgeting` (STEP 4), `/deep-dives/memory-and-context/context-compaction` (STEP 4), `/concepts/context-windows` (STEP 1).

**Sources:** https://ofox.ai/blog/long-context-llm-benchmarks-200k-tokens-2026/ + https://hub.stabilarity.com/long-context-retrieval-benchmarks-needle-in-haystack-and-beyond/.

**8 steps:** Same. Commit: `"Deep-Dive: M10 long-context-effective-vs-advertised"`.

---

## Task 13 — Essay M11: `learned-retrievers-and-memrl`

**Files:** groups/memory-and-context.ts + `learned-retrievers-and-memrl.html` en/zh.

**Spec:** M (~1400 words), stretch, `M11`.

**Entry line:**

```ts
{ page: 'learned-retrievers-and-memrl', slug: 'learned-retrievers-and-memrl', title: L('Learned Retrievers & MemRL','学习型检索器与 MemRL'), summary: L('MemRL treats store / retrieve / update / summarize / discard as tools optimized via RL — rank by learned utility rather than semantic similarity alone.','MemRL 把存/取/更新/摘要/丢弃当作用 RL 优化的工具——按学习到的效用排序，而不仅按语义相似度。') },
```

**`<h2>` claim (en):** Learned retrievers replace "similarity" as the ranking function with "utility for the current task" — and MemRL is the training recipe.

**`<h2>` claim (zh):** 学习型检索器把排序函数从"相似度"换成"对当前任务的效用"——MemRL 是训练配方。

**Hook lede (en):** Semantic similarity is a decent proxy for "will this help." A learned utility function is better. MemRL trains the memory system's read/write/update/discard actions with RL, using downstream task success as the reward. The result outperforms similarity-only ranking on stateful agent benchmarks. This essay is the recipe, the reward-design pitfalls, and when learned retrieval earns the complexity.

**Hook lede (zh):** 语义相似度是"能不能帮上忙"的可用代理。学习到的效用函数则更好。MemRL 用 RL 训练记忆系统的读/写/更新/丢弃动作，以下游任务成功作为奖励。在有状态智能体基准上，其结果优于仅按相似度的排序。这篇讲配方、奖励设计的陷阱，以及何时"学习型检索"值得那份复杂度。

**Section outline:** STEP 1 "Similarity as ranking, and its ceiling" / "以相似度为排序，及其上限". STEP 2 "MemRL: memory ops as RL actions" / "MemRL：把记忆操作当作 RL 动作". STEP 3 "Reward design pitfalls" / "奖励设计陷阱". STEP 4 "When learned retrieval earns the complexity" / "何时学习型检索值那份复杂度".

**Content beats:** STEP 1: similarity works for topic; fails for utility (correct doc but wrong facet). STEP 2: MemRL treats store/retrieve/update/summarize/discard as an action set; reward = downstream success. STEP 3: reward hacking, credit assignment across long horizons. STEP 4: high-stakes, high-reuse workloads only.

**Required `<pre>` blocks:** One `<pre class="trace">` showing similarity vs learned-utility disagreement (~15 lines). One `<pre class="standalone">` showing an action-space definition (~10 lines).

**Cross-links:** `/deep-dives/memory-and-context/retrieval-augmented-memory` (STEP 1), `/deep-dives/memory-and-context/memory-stores` (STEP 2), `/deep-dives/training-agentic-models/rl-for-tool-use` (STEP 2).

**Sources:** research §4.

**8 steps:** Same. Commit: `"Deep-Dive: M11 learned-retrievers-and-memrl"`.

---

## Task 14 — Essay T7: `rlvr-and-grpo-for-agents`

**Files:** groups/training-agentic-models.ts + `rlvr-and-grpo-for-agents.html` en/zh.

**Spec:** L (~2300 words), must, `T7`.

**Entry line:**

```ts
{ page: 'rlvr-and-grpo-for-agents', slug: 'rlvr-and-grpo-for-agents', title: L('RLVR & GRPO for Agents','面向智能体的 RLVR 与 GRPO'), summary: L('The 2026 recipe — SFT → DPO/SimPO → GRPO/DAPO with verifiable rewards; entropy collapse, KL drift, and the multi-turn algorithms (ARPO, StepPO, Turn-PPO).','2026 年的配方——SFT → DPO/SimPO → GRPO/DAPO 且带可核验奖励；熵坍缩、KL 漂移，以及多轮算法（ARPO、StepPO、Turn-PPO）。') },
```

**`<h2>` claim (en):** RLVR + GRPO is the 2026 canonical recipe for agentic post-training, and the failure modes — entropy collapse, KL drift, credit assignment across turns — have named fixes.

**`<h2>` claim (zh):** RLVR + GRPO 是 2026 年智能体后训练的标准配方，失败模式——熵坍缩、KL 漂移、跨轮次的信用分配——各有名字明确的修法。

**Hook lede (en):** By mid-2026 the frontier agent-training recipe converged: SFT to imitate, DPO or SimPO to align, GRPO or DAPO with a verifiable reward to optimize. RLVR (Reinforcement Learning with Verifiable Rewards) is the load-bearing idea — grade at the outcome, not the trajectory. The failure modes — entropy collapse when GRPO's group-relative signal saturates, KL drift from the base policy, credit assignment across multi-turn tool loops — each have named fixes (ARPO, StepPO, Turn-PPO). This essay is the recipe and the traps.

**Hook lede (zh):** 到 2026 年年中，前沿的智能体训练配方汇聚为：SFT 模仿、DPO 或 SimPO 对齐、GRPO 或 DAPO 配可核验奖励做优化。RLVR（可核验奖励的强化学习）是承重的思想——按结果打分，而不是按轨迹。失败模式——GRPO 组内相对信号饱和时的熵坍缩、相对底座策略的 KL 漂移、跨多轮工具循环的信用分配——各有名字明确的修法（ARPO、StepPO、Turn-PPO）。这篇讲配方与陷阱。

**Section outline:** STEP 1 "The three-stage recipe" / "三阶段配方". STEP 2 "Verifiable rewards" / "可核验奖励". STEP 3 "GRPO/DAPO and their signal" / "GRPO/DAPO 与其信号". STEP 4 "Entropy collapse and KL drift" / "熵坍缩与 KL 漂移". STEP 5 "Multi-turn: ARPO, StepPO, Turn-PPO" / "多轮：ARPO、StepPO、Turn-PPO". STEP 6 "When PPO or DPO alone is still fine" / "何时单用 PPO 或 DPO 仍然够用".

**Content beats:** STEP 1: SFT → DPO/SimPO → GRPO/DAPO. STEP 2: verifiable = pass/fail from code, unit tests, ground truth. STEP 3: GRPO's group-relative advantage; DAPO variants. STEP 4: entropy floor, KL leash to base. STEP 5: named multi-turn fixes and their differences. STEP 6: small models, low-stakes.

**Required `<pre>` blocks:** One `<pre class="standalone">` showing a GRPO training-step pseudocode (~18 lines). One `<pre class="trace">` showing entropy collapse curve indicators (~10 lines).

**Cross-links:** `/deep-dives/training-agentic-models/rl-for-tool-use` (STEP 1), `/deep-dives/training-agentic-models/rlhf-and-rlaif` (STEP 1), `/deep-dives/training-agentic-models/reward-design-and-hacking` (STEP 2).

**Sources:** research §3 + https://zylos.ai/research/2026-04-10-rl-posttraining-tool-using-agents-grpo-async-rl + https://www.turingpost.com/p/reasoning-rl-in-2026.

**8 steps:** Same. Commit: `"Deep-Dive: T7 rlvr-and-grpo-for-agents"`.

---

## Task 15 — Essay T8: `rl-fine-tuning-open-weights`

**Files:** groups/training-agentic-models.ts + `rl-fine-tuning-open-weights.html` en/zh.

**Spec:** M (~1400 words), should, `T8`.

**Entry line:**

```ts
{ page: 'rl-fine-tuning-open-weights', slug: 'rl-fine-tuning-open-weights', title: L('RL Fine-Tuning Open Weights','对开放权重做 RL 微调'), summary: L('SageMaker RFT + TRL v1.0 + LlamaFactory + VeRL let teams GRPO on Qwen3 / Llama 4 / DeepSeek V4 with in-house verifiable rewards — the "custom reasoning model" playbook.','SageMaker RFT + TRL v1.0 + LlamaFactory + VeRL 让团队可对 Qwen3/Llama 4/DeepSeek V4 用自有可核验奖励做 GRPO——"定制推理模型"打法。') },
```

**`<h2>` claim (en):** In 2026 you can GRPO an open-weight base against your own verifier — SageMaker RFT, TRL v1.0, LlamaFactory, VeRL — and the "should we tune or should we call the API" question flipped for verifiable tasks.

**`<h2>` claim (zh):** 2026 年，你可以对开放权重底座跑 GRPO、以自家 verifier 作为奖励——SageMaker RFT、TRL v1.0、LlamaFactory、VeRL——"该调还是该调 API"的问题在可核验任务上已经反转。

**Hook lede (en):** SageMaker shipped RFT-as-a-service in March 2026. TRL 1.0 stabilized the GRPO API. LlamaFactory and VeRL rounded out the OSS side. The consequence: any team with a verifiable task now has a plausible path to a custom reasoning model on Qwen3, Llama 4, or DeepSeek V4. The buy-vs-tune math flipped for a specific class of workload — high-volume, verifiable, latency-sensitive. This essay is the playbook, the moves that don't work, and the honest cost math.

**Hook lede (zh):** SageMaker 于 2026 年 3 月推出 RFT-as-a-service。TRL 1.0 稳定了 GRPO 的 API。LlamaFactory 与 VeRL 补齐了开源侧。结果：任何有"可核验任务"的团队，现在都有一条通向"基于 Qwen3、Llama 4 或 DeepSeek V4 的定制推理模型"的可行路径。买 vs 调的取舍在一类特定工作负载上——高流量、可核验、对延迟敏感——已经反转。这篇讲打法、行不通的招数，以及诚实的成本账。

**Section outline:** STEP 1 "The tooling that made it plausible" / "让它变得可行的工具". STEP 2 "The playbook" / "打法". STEP 3 "Moves that don't work" / "行不通的招数". STEP 4 "Cost math vs closed-model API" / "与闭源 API 的成本账". STEP 5 "When to still use the API" / "何时仍然用 API".

**Content beats:** STEP 1: SageMaker RFT, TRL 1.0, LlamaFactory, VeRL — what each gives. STEP 2: task selection, verifier design, base selection, training schedule. STEP 3: no verifier = no RLVR; small dataset = mode collapse; wrong base = wasted training. STEP 4: dollars per task at scale. STEP 5: latency-flexible or one-off tasks stay on API.

**Required `<pre>` blocks:** One `<pre class="standalone">` showing a SageMaker RFT job spec (~15 lines YAML). One `<pre class="trace">` showing a cost comparison (~12 lines).

**Cross-links:** `/deep-dives/training-agentic-models/rlvr-and-grpo-for-agents` (STEP 2 — Task 14 committed), `/deep-dives/training-agentic-models/rl-for-tool-use` (STEP 2), `/concepts/open-vs-closed-models` (STEP 4).

**Sources:** https://aws.amazon.com/about-aws/whats-new/2026/03/amazon-sagemaker-ai-serverless-additional-models/ + https://www.bentoml.com/blog/the-complete-guide-to-deepseek-models-from-v3-to-r1-and-beyond.

**8 steps:** Same. Commit: `"Deep-Dive: T8 rl-fine-tuning-open-weights"`.

---

## Task 16 — Essay T9: `process-reward-models`

**Files:** groups/training-agentic-models.ts + `process-reward-models.html` en/zh.

**Spec:** M (~1400 words), should, `T9`.

**Entry line:**

```ts
{ page: 'process-reward-models', slug: 'process-reward-models', title: L('Process Reward Models','过程奖励模型'), summary: L('Step-level PRM vs outcome-only RLVR — dense credit assignment for long-horizon SWE agents, with SWE-TRACE, AgentPRM, SPARK as the current stack.','逐步过程奖励模型（PRM）与仅结果 RLVR——对长时程 SWE 智能体做稠密信用分配，SWE-TRACE、AgentPRM、SPARK 是当前一线技术栈。') },
```

**`<h2>` claim (en):** Outcome rewards under-credit long-horizon agents; process rewards over-label; the honest 2026 approach is targeted PRMs on the steps that matter, not everything.

**`<h2>` claim (zh):** 结果奖励对长时程智能体信用不足；过程奖励标注过多；2026 年诚实的做法是把 PRM 精准放在"要紧的那些步骤"，而不是每一步。

**Hook lede (en):** Outcome rewards are cheap and sparse; process rewards are dense and expensive. For long-horizon SWE agents that run tens of steps to produce a diff, sparse outcome rewards under-credit the good intermediate moves. Process reward models (PRMs) label steps individually. The catch: labeling every step is prohibitively expensive. 2026 practice is targeted PRMs — SWE-TRACE, AgentPRM, SPARK identify which steps are decision points and only label those. This essay is the state of PRMs and the labeling economy.

**Hook lede (zh):** 结果奖励便宜且稀疏；过程奖励稠密且昂贵。对跑上几十步才产生一份 diff 的长时程 SWE 智能体，稀疏的结果奖励会低估其中"好的中间动作"。过程奖励模型（PRM）逐步打标。矛盾在于：给每一步都打标成本高得离谱。2026 年的实操是"精准 PRM"——SWE-TRACE、AgentPRM、SPARK 识别"决策点"，只标那些。这篇讲 PRM 现状与标注经济。

**Section outline:** STEP 1 "Why outcome rewards under-credit long horizons" / "为何结果奖励在长时程下信用不足". STEP 2 "PRMs: labeling every step" / "PRM：给每一步打标". STEP 3 "The labeling economy" / "标注经济". STEP 4 "Targeted PRMs: SWE-TRACE, AgentPRM, SPARK" / "精准 PRM：SWE-TRACE、AgentPRM、SPARK". STEP 5 "When outcome-only is still right" / "何时仅用结果仍是对的".

**Content beats:** STEP 1: credit-assignment intuition on 30-step trajectories. STEP 2: PRM training as a classification task. STEP 3: label cost per step vs training data volume. STEP 4: the three 2026 approaches and their trade-offs. STEP 5: short trajectories, cheap outcomes.

**Required `<pre>` blocks:** One `<pre class="trace">` showing an outcome vs process reward comparison on a trace (~15 lines). One `<pre class="standalone">` showing a PRM inference call (~10 lines).

**Cross-links:** `/deep-dives/training-agentic-models/process-vs-outcome-rewards` (STEP 1), `/deep-dives/reasoning-and-test-time-compute/verifier-guided-search` (STEP 2), `/deep-dives/training-agentic-models/reward-design-and-hacking` (STEP 5).

**Sources:** https://arxiv.org/pdf/2510.08049 (PRM survey).

**8 steps:** Same. Commit: `"Deep-Dive: T9 process-reward-models"`.

---

## Task 17 — Essay T10: `dspy-3-gepa-for-agent-optimization`

**Files:** groups/training-agentic-models.ts + `dspy-3-gepa-for-agent-optimization.html` en/zh.

**Spec:** M (~1400 words), stretch, `T10`, ⚠ benchmark-dep.

**Entry line:**

```ts
{ page: 'dspy-3-gepa-for-agent-optimization', slug: 'dspy-3-gepa-for-agent-optimization', title: L('DSPy 3 + GEPA for Agent Optimization','DSPy 3 + GEPA 做智能体优化'), summary: L('GEPA (ICLR 2026 oral) outperforms MIPROv2 by 13% and RL/GRPO by 20% at 35x fewer rollouts — when to use each optimizer.','GEPA（ICLR 2026 oral）比 MIPROv2 高 13%、比 RL/GRPO 高 20%，且 rollouts 少 35 倍——各优化器何时用。') },
```

**`<h2>` claim (en):** GEPA is a prompt-and-program optimizer, not a weight optimizer — and on tasks where the bottleneck is program shape, it beats RL by 20% at 35× fewer rollouts.

**`<h2>` claim (zh):** GEPA 是"提示词+程序"的优化器，不是权重优化器——在"程序形状是瓶颈"的任务上，它比 RL 高 20%，rollouts 少 35 倍。

**Hook lede (en):** GEPA (ICLR 2026 oral, vendor numbers not yet independently reproduced) claims to outperform MIPROv2 by 13 points and full RL / GRPO by 20 at 35× fewer rollouts. The mechanism is search over program shapes and prompt fragments, not weight updates. On tasks where the bottleneck is "which module should call which," GEPA is the right lever; on tasks where the bottleneck is capability, it isn't. This essay is DSPy 3 + GEPA's actual mechanism and the decision rule for when to reach for it.

**Hook lede (zh):** GEPA（ICLR 2026 oral，厂商数字尚未被独立复现）宣称：比 MIPROv2 高 13 分、比完整 RL/GRPO 高 20 分，rollouts 少 35 倍。机制是在程序形状与提示片段上做搜索，而不是更新权重。任务瓶颈在"哪个模块调用哪个"时，GEPA 是对的杠杆；瓶颈在"能力"时则不是。本文写 DSPy 3 + GEPA 的真实机制，以及"何时该抬手够它"的决策规则。

**Section outline:** STEP 1 "Prompt-and-program optimization" / "提示词与程序的优化". STEP 2 "GEPA vs MIPROv2 vs RL" / "GEPA vs MIPROv2 vs RL". STEP 3 "When shape-optimization wins" / "形状优化何时取胜". STEP 4 "When it can't help" / "何时它帮不上". STEP 5 "How to run DSPy 3 + GEPA" / "如何跑 DSPy 3 + GEPA".

**Content beats:** STEP 1: DSPy programs = compositions of modules; GEPA searches the composition. STEP 2: comparison table with caveats. STEP 3: multi-module pipelines with clear intermediate signals. STEP 4: single-model capability limits. STEP 5: minimal DSPy 3 program + GEPA call.

**Required `<pre>` blocks:** One DSPy 3 program sample (~15 lines Python). One trace of GEPA search steps (~12 lines).

**Cross-links:** `/deep-dives/training-agentic-models/rlvr-and-grpo-for-agents` (STEP 2 — Task 14 committed), `/concepts/agent-frameworks` (STEP 1).

**Sources:** https://futureagi.com/blog/dspy-optimizers-explained/.

**8 steps:** Same. Commit: `"Deep-Dive: T10 dspy-3-gepa-for-agent-optimization"`.

---

## Task 18 — Essay G7: `sub-agent-patterns-comparison`

**Files:** groups/multi-agent-systems.ts + `sub-agent-patterns-comparison.html` en/zh.

**Spec:** M (~1400 words), should, `G7`.

**Entry line:**

```ts
{ page: 'sub-agent-patterns-comparison', slug: 'sub-agent-patterns-comparison', title: L('Sub-Agent Patterns Compared','子智能体模式对比'), summary: L('LangGraph supervisor / hierarchical / collaborative vs OpenAI Agents SDK handoffs-vs-agents-as-tools vs deepagents — when each shape works.','LangGraph 的 supervisor/层级/协作，与 OpenAI Agents SDK 的 handoff vs 智能体即工具，与 deepagents——各形态各自何时奏效。') },
```

**`<h2>` claim (en):** The sub-agent-vs-handoff-vs-agent-as-tool distinctions from three frameworks map onto one underlying question — who owns the trajectory — and answering it decides which shape you want.

**`<h2>` claim (zh):** 三个框架里 sub-agent、handoff、agent-as-tool 的差异，都映射到同一个底层问题——谁拥有轨迹——回答它就决定了你要哪种形态。

**Hook lede (en):** LangGraph has supervisor, hierarchical, and collaborative graphs. OpenAI Agents SDK ships "handoffs" and "agents-as-tools." deepagents has subagents. Each vendor's vocabulary hides the same underlying distinction: who owns the trajectory once control transfers. Handoffs give it away completely; agents-as-tools keep it; supervisor delegates and reclaims. This essay maps the vocabularies, the trade-offs, and the concrete failure modes each shape hides.

**Hook lede (zh):** LangGraph 有 supervisor、层级、协作三种图。OpenAI Agents SDK 提供 "handoff" 与 "agent-as-tool"。deepagents 有 subagent。各家词汇掩盖的是同一个底层差异：控制权交出去后，谁拥有轨迹。Handoff 完全交出去；agent-as-tool 保留；supervisor 委派后回收。本文对齐词汇、列出取舍，并给出每种形态各自藏着的具体失败模式。

**Section outline:** STEP 1 "The three vocabularies" / "三套词汇". STEP 2 "Who owns the trajectory" / "谁拥有轨迹". STEP 3 "Handoff failure modes" / "handoff 的失败模式". STEP 4 "Agent-as-tool failure modes" / "agent-as-tool 的失败模式". STEP 5 "Supervisor delegation" / "supervisor 委派". STEP 6 "Choosing the shape" / "选择形态".

**Content beats:** STEP 1: side-by-side vocabulary table. STEP 2: trajectory ownership as the underlying axis. STEP 3: handoff loses context, ambiguous return. STEP 4: agent-as-tool blows context budget. STEP 5: supervisor bottleneck. STEP 6: decision rule.

**Required `<pre>` blocks:** One vocabulary-mapping table (`<pre class="trace">`, ~15 lines). One code sample showing all three in the same task (~18 lines).

**Cross-links:** `/deep-dives/multi-agent-systems/supervisor-worker-pattern` (STEP 5), `/deep-dives/multi-agent-systems/multi-agent-topologies` (STEP 2), `/deep-dives/multi-agent-systems/single-vs-multi-agent` (STEP 6).

**Sources:** https://openai.github.io/openai-agents-python/multi_agent/ + https://www.langchain.com/blog/on-agent-frameworks-and-agent-observability.

**8 steps:** Same. Commit: `"Deep-Dive: G7 sub-agent-patterns-comparison"`.

---

## Task 19 — New group scaffold + Essay E1: `judge-calibration-and-meta-evaluation`

**Files:**
- Create: `src/content/deep-dives/groups/evaluating-agents.ts` — new group, order 100, one entry (E1).
- Create: `deep-dives/en/judge-calibration-and-meta-evaluation.html`.
- Create: `deep-dives/zh/judge-calibration-and-meta-evaluation.html`.

**Group file content:**

```ts
import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'evaluating-agents',
  order: 100,
  name: L('Evaluating Agents', '评估智能体'),
  groupSummary: L(
    "The 2026 discipline of evaluating agents: benchmark saturation, judge calibration, drift detection, and the eval methodologies that survived contact with production.",
    '评估智能体的 2026 学科：基准饱和、评判器校准、漂移检测，以及经受住生产接触的评测方法学。',
  ),
  entries: [
    { page: 'judge-calibration-and-meta-evaluation', slug: 'judge-calibration-and-meta-evaluation', title: L('Judge Calibration & Meta-Evaluation','评判器校准与元评测'), summary: L('Prometheus 2, JudgeBench, RubricEval; meta-evaluation collapse; the 85-90% human-agreement floor; monthly recalibration cadence.','Prometheus 2、JudgeBench、RubricEval；元评测坍缩；85–90% 的人机一致底线；月度重校准节奏。') },
  ],
};
export default group;
```

**Essay E1 spec:** L (~2300 words), must, `E1`.

**`<h2>` claim (en):** LLM-as-judge without a calibration protocol is a metric that lies; the 2026 production discipline is 85-90% agreement with a human gold set, monthly recalibration, and named alarms for meta-evaluation collapse.

**`<h2>` claim (zh):** 没有校准协议的 LLM 评判器就是一个说谎的指标；2026 年的生产纪律是与人类金标 85–90% 一致、月度重校准，并对元评测坍缩报警。

**Hook lede (en):** LLM-as-judge scaled evals but broke calibration. "Meta-evaluation collapse" is the named failure — the judge model's own scoring distribution drifts, and the eval score becomes decorative. The production discipline that survived contact with reality: build a human-labeled gold set, calibrate the judge to 85-90% agreement against it, recalibrate monthly, alarm when agreement drops. Prometheus 2, JudgeBench, and RubricEval are the tools that make this cheap enough to do. This essay is the protocol, not the theory.

**Hook lede (zh):** LLM-as-judge 让评测规模化，却把校准搞坏了。"元评测坍缩"是这个失败的名字——评判器自己的打分分布漂了，评测分数于是变成装饰品。经受住现实接触的生产纪律是：先做一份人类标注的金标集，把评判器校准到与之 85–90% 一致，每月重校准，一致率下滑时报警。Prometheus 2、JudgeBench、RubricEval 是让这件事便宜到能做的工具。这篇讲协议，不讲理论。

**Section outline:** STEP 1 "The meta-evaluation collapse pattern" / "元评测坍缩模式". STEP 2 "The 85-90% agreement floor" / "85–90% 一致底线". STEP 3 "Building the gold set" / "建立金标集". STEP 4 "Monthly recalibration cadence" / "月度重校准节奏". STEP 5 "Alarms and rollback" / "报警与回滚". STEP 6 "Tools: Prometheus 2, JudgeBench, RubricEval" / "工具：Prometheus 2、JudgeBench、RubricEval".

**Content beats:** STEP 1: what the failure looks like in a rolling 7-day window. STEP 2: why 85-90% is the floor, not 95%. STEP 3: sizing (100-300 items), sampling, label variance. STEP 4: what triggers a recalibration, what a recalibration touches. STEP 5: alarm thresholds, rollback protocol. STEP 6: tool comparison.

**Required `<pre>` blocks:** One `<pre class="trace">` showing an agreement-tracking dashboard config (~15 lines). One `<pre class="standalone">` showing a calibration test harness (~15 lines).

**Cross-links:** `/concepts/evals-101` (STEP 1), `/deep-dives/retrieval-and-rag/evaluating-rag` (STEP 3), `/deep-dives/memory-and-context/evaluating-memory` (STEP 3), `/operations/evaluation-and-observability/llm-as-judge-for-agents` (STEP 1).

**Sources:** research §4 + https://openreview.net/forum?id=IF0L7HSs3K + https://deepeval.com/blog/llm-as-a-judge.

**8 steps:**
1. Write `groups/evaluating-agents.ts` with the group + E1 entry above.
2. `npm test` — expect FAIL (missing `judge-calibration-and-meta-evaluation` HTML fragments).
3. Write en fragment.
4. Write zh fragment.
5. `npm test` — expect PASS.
6. `npm run verify` — expect PASS.
7. `npm run build` — expect PASS.
8. Commit: `"Deep-Dive: evaluating-agents scaffold + E1 judge-calibration-and-meta-evaluation"`.

---

## Task 20 — Essay E2: `benchmark-landscape-2026`

**Files:** groups/evaluating-agents.ts (append entry) + `benchmark-landscape-2026.html` en/zh.

**Spec:** M (~1400 words), should, `E2`, ⚠ benchmark-dep.

**Entry line:**

```ts
{ page: 'benchmark-landscape-2026', slug: 'benchmark-landscape-2026', title: L('Benchmark Landscape (2026)','2026 年基准全景'), summary: L('SWE-bench Verified saturation (five models within 0.7 pts); SWE-bench Pro; contamination as legal deterrent; why Verified is now an audit signal, not a ranking.','SWE-bench Verified 已饱和（前五仅相差 0.7 分）；SWE-bench Pro；把污染当法律威慑；为何 Verified 如今是审计信号，而非排名。') },
```

**`<h2>` claim (en):** SWE-bench Verified saturated — five models within 0.7 points — and the field moved to SWE-bench Pro, HAL, Gaia2, and tau2-bench; Verified is now an audit signal, not a ranking.

**`<h2>` claim (zh):** SWE-bench Verified 已饱和——前五仅相差 0.7 分——领域转向了 SWE-bench Pro、HAL、Gaia2 与 tau2-bench；Verified 如今是审计信号，不是排名。

**Hook lede (en):** SWE-bench Verified has five models within 0.7 points at the top and three Anthropic entries breaking away in the 93-95% band. The scoreboard stopped discriminating. The field moved to SWE-bench Pro (top ~59%), Gaia2 (best ~42% pass@1), tau2-bench with Telecom, and Princeton's HAL (cost-per-solve plus a 5-dim reliability dashboard). Reading agent benchmark headlines in 2026 requires knowing which of these each headline uses and what saturation looks like. This essay is that map.

**Hook lede (zh):** SWE-bench Verified 榜首五个模型仅相差 0.7 分，三家 Anthropic 条目在 93–95% 区间独走。榜单不再区分。领域转向 SWE-bench Pro（顶端约 59%）、Gaia2（最佳 pass@1 约 42%）、带 Telecom 的 tau2-bench，以及 Princeton 的 HAL（按"每解决一题的成本"加 5 维可靠性面板）。2026 年读智能体基准头条，必须知道每条头条用的是哪一份基准、饱和长什么样。这篇就是那张地图。

**Section outline:** STEP 1 "SWE-bench Verified saturation" / "SWE-bench Verified 的饱和". STEP 2 "SWE-bench Pro" / "SWE-bench Pro". STEP 3 "Gaia2 and asynchronous agent eval" / "Gaia2 与异步智能体评测". STEP 4 "tau2-bench" / "tau2-bench". STEP 5 "HAL and cost-per-solve" / "HAL 与每解一题的成本". STEP 6 "Contamination as legal deterrent" / "把污染当法律威慑".

**Content beats:** each STEP: what the benchmark measures, headline numbers, cite. STEP 6: modern benchmarks use license-based contamination deterrents.

**Required `<pre>` blocks:** One `<pre class="trace">` showing a leaderboard snapshot table (~20 lines). One `<pre class="standalone">` showing a HAL cost-report format (~10 lines).

**Cross-links:** `/concepts/reading-benchmarks` (STEP 1), `/deep-dives/retrieval-and-rag/evaluating-rag` (STEP 1), `/deep-dives/evaluating-agents/judge-calibration-and-meta-evaluation` (STEP 6 — Task 19 committed).

**Sources:** https://leaderboard.steel.dev/leaderboards/swe-bench-verified/ + https://labs.scale.com/leaderboard/swe_bench_pro_public + https://hal.cs.princeton.edu/ + https://arxiv.org/abs/2510.11977 + https://iclr.cc/virtual/2026/poster/10011091 + https://github.com/sierra-research/tau2-bench.

**8 steps:** Same. Commit: `"Deep-Dive: E2 benchmark-landscape-2026"`.

---

## Task 21 — Essay E3: `hal-and-async-agent-eval`

**Files:** groups/evaluating-agents.ts + `hal-and-async-agent-eval.html` en/zh.

**Spec:** M (~1400 words), stretch, `E3`, ⚠ benchmark-dep.

**Entry line:**

```ts
{ page: 'hal-and-async-agent-eval', slug: 'hal-and-async-agent-eval', title: L('HAL & Asynchronous Agent Eval','HAL 与异步智能体评测'), summary: L("Princeton HAL (cost-per-solve + 5-dim reliability dashboard); Gaia2 (async environments, write-action verifiers, temporal constraints); why static benchmarks miss real deployment.",'Princeton HAL（每解一题的成本 + 5 维可靠性面板）；Gaia2（异步环境、写动作核验器、时间约束）；为何静态基准漏掉真实部署。') },
```

**`<h2>` claim (en):** Static benchmarks miss what breaks agents in production — HAL measures cost-per-solve and reliability, Gaia2 forces asynchronous environments — and the numbers are lower than SWE-bench for reasons that matter.

**`<h2>` claim (zh):** 静态基准漏掉了"生产里让智能体崩掉的东西"——HAL 度量每解一题的成本与可靠性，Gaia2 强制异步环境——它们的数字比 SWE-bench 低，且低得有道理。

**Hook lede (en):** Static benchmarks reward the shape of a solvable puzzle; real deployment adds cost, reliability, and asynchrony. HAL (Princeton) reports cost-per-solve and a five-dimension reliability dashboard — consistency, predictability, robustness, safety, self-awareness. Gaia2 forces write-action verifiers, temporal constraints, and asynchronous environments where the world changes between the agent's steps. The numbers are lower than SWE-bench; the reasons are honest. This essay is what each measures and why to plan against them.

**Hook lede (zh):** 静态基准奖励"可解谜题的形状"；真实部署会加入成本、可靠性与异步。HAL（Princeton）报告"每解一题的成本"和一个五维可靠性面板——一致性、可预测性、鲁棒性、安全性、自我认知。Gaia2 强制加入写动作核验器、时间约束，以及"智能体两步之间世界会变"的异步环境。数字比 SWE-bench 低；理由是诚实的。这篇讲各自度量什么、为何要照它们规划。

**Section outline:** STEP 1 "Static-benchmark blindness" / "静态基准盲区". STEP 2 "HAL: cost-per-solve" / "HAL：每解一题的成本". STEP 3 "HAL: 5-dim reliability" / "HAL：5 维可靠性". STEP 4 "Gaia2: async environments" / "Gaia2：异步环境". STEP 5 "How to plan against them" / "如何据此规划".

**Content beats:** STEP 1: what static misses (cost, reliability, world-changes). STEP 2: HAL cost metric formula. STEP 3: dashboard details. STEP 4: async challenge design. STEP 5: budget number, reliability thresholds.

**Required `<pre>` blocks:** One HAL dashboard snippet (`<pre class="trace">`, ~15 lines). One Gaia2 async task example (`<pre class="standalone">`, ~12 lines).

**Cross-links:** `/deep-dives/evaluating-agents/benchmark-landscape-2026` (STEP 1 — Task 20 committed), `/deep-dives/evaluating-agents/judge-calibration-and-meta-evaluation` (STEP 3).

**Sources:** https://hal.cs.princeton.edu/ + https://iclr.cc/virtual/2026/poster/10011091.

**8 steps:** Same. Commit: `"Deep-Dive: E3 hal-and-async-agent-eval"`.

---

## Task 22 — Essay N7: `adaptive-thinking-and-effort-budgets`

**Files:** groups/reasoning-and-test-time-compute.ts + `adaptive-thinking-and-effort-budgets.html` en/zh.

**Spec:** L (~2300 words), must, `N7`, ⚠ spec-dep.

**Entry line:**

```ts
{ page: 'adaptive-thinking-and-effort-budgets', slug: 'adaptive-thinking-and-effort-budgets', title: L('Adaptive Thinking & Effort Budgets','自适应思考与努力度预算'), summary: L("`budget_tokens` is deprecated — Claude's `effort`, Gemini's `thinking_level`, OpenAI's `reasoning_effort`, and when the model overrides your budget.",'`budget_tokens` 已废弃——Claude 的 `effort`、Gemini 的 `thinking_level`、OpenAI 的 `reasoning_effort`，以及模型何时会覆盖你的预算。') },
```

**`<h2>` claim (en):** Vendors moved from token-budget dials to adaptive `effort` levels in 2026 — Anthropic deprecated `budget_tokens` — and the three vendor idioms are close enough to compare but different enough to trip you up.

**`<h2>` claim (zh):** 2026 年厂商从"令牌预算旋钮"转到自适应 `effort` 档位——Anthropic 已弃用 `budget_tokens`——三家的写法足够接近可对比，但足够不同能坑到你。

**Hook lede (en):** Every "budget your thinking tokens" example from 2024-2025 is stale. Anthropic deprecated `budget_tokens` on Opus 4.6 / Sonnet 4.6 and removed it on 4.7+; the replacement is `thinking.type: adaptive` with `effort: low|medium|high`. Gemini uses `thinking_level`. OpenAI uses `reasoning_effort`. Same idea, three vocabularies, one gotcha — the model can override your budget when its own gradient says it needs more. This essay is the API surface, the override behavior, and the cost math per vendor.

**Hook lede (zh):** 2024–2025 年间"给思考预算令牌"的每一份示例都过期了。Anthropic 在 Opus 4.6 / Sonnet 4.6 上把 `budget_tokens` 标为弃用，在 4.7+ 直接删除；替代品是 `thinking.type: adaptive` 配 `effort: low|medium|high`。Gemini 用 `thinking_level`。OpenAI 用 `reasoning_effort`。思路相同，三套词汇，一个陷阱——当模型自己的梯度告诉它"需要更多"时，会覆盖你的预算。这篇讲 API 表面、覆盖行为，以及逐厂商的成本账。

**Section outline:** STEP 1 "Why token budgets got replaced" / "令牌预算为何被替换". STEP 2 "The Anthropic `effort` API" / "Anthropic 的 `effort` API". STEP 3 "Gemini `thinking_level`" / "Gemini 的 `thinking_level`". STEP 4 "OpenAI `reasoning_effort`" / "OpenAI 的 `reasoning_effort`". STEP 5 "When the model overrides your budget" / "模型何时覆盖你的预算". STEP 6 "Cross-vendor comparison table" / "跨厂商对照表". STEP 7 "Cost implications" / "成本影响".

**Content beats:** STEP 1: token budgets couldn't represent "spend more on hard, less on easy." STEP 2: full API call sample. STEP 3: same for Gemini. STEP 4: same for OpenAI. STEP 5: rare but real; log it. STEP 6: table. STEP 7: thinking tokens billed at output rate; adaptive can 3-5× the bill on hard questions.

**Required `<pre>` blocks:** Three request samples, one per vendor (~10 lines each `<pre class="standalone">`). One cost-comparison trace (`<pre class="trace">`, ~10 lines).

**Cross-links:** `/deep-dives/reasoning-and-test-time-compute/when-reasoning-helps` (STEP 1), `/deep-dives/reasoning-and-test-time-compute/inference-time-scaling` (STEP 5), `/concepts/reasoning-models` (STEP 1).

**Sources:** https://platform.claude.com/docs/en/build-with-claude/extended-thinking + https://ai.google.dev/gemini-api/docs/thinking + https://platform.openai.com/docs/guides/reasoning.

**8 steps:** Same. Commit: `"Deep-Dive: N7 adaptive-thinking-and-effort-budgets"`.

---

## Task 23 — Essay K7: `tool-calling-vendor-matrix-2026`

**Files:** groups/tool-capability-design.ts + `tool-calling-vendor-matrix-2026.html` en/zh.

**Spec:** L (~2300 words), must, `K7`, ⚠ spec-dep.

**Entry line:**

```ts
{ page: 'tool-calling-vendor-matrix-2026', slug: 'tool-calling-vendor-matrix-2026', title: L('Tool Calling Vendor Matrix (2026)','工具调用厂商对照矩阵（2026）'), summary: L('OpenAI (Chat Completions vs Responses API, parallel_tool_calls, custom tools with Lark/regex grammar) vs Anthropic (Programmatic Tool Calling, Tool Search Tool, Tool Use Examples) vs Gemini (OpenAPI subset, tool_choice any, multimodal function responses).','OpenAI（Chat Completions 与 Responses API、parallel_tool_calls、带 Lark/regex 的自定义工具）vs Anthropic（编程式工具调用、Tool Search Tool、Tool Use Examples）vs Gemini（OpenAPI 子集、tool_choice: any、多模态函数响应）。') },
```

**`<h2>` claim (en):** "Portable tool defs" was fiction; the 2026 vendor matrix has enough shared surface to look uniform and enough divergence to break every naive port.

**`<h2>` claim (zh):** "可移植工具定义"是童话；2026 年的厂商矩阵有足够共同表面看起来一致，也有足够差异让每一次朴素移植都翻车。

**Hook lede (en):** OpenAI Chat Completions vs Responses API. Anthropic's Programmatic Tool Calling and Tool Search Tool. Gemini's OpenAPI subset. Same underlying idea — model proposes a tool call, host executes, model reads the result — packaged three different ways. This essay is the matrix, the divergences that matter (JSON Schema subsets, streaming, parallel calls, custom grammars), and the small set of tool-def shapes that survive a port unchanged.

**Hook lede (zh):** OpenAI 的 Chat Completions 与 Responses API。Anthropic 的 Programmatic Tool Calling 与 Tool Search Tool。Gemini 的 OpenAPI 子集。底层思路相同——模型提出一次工具调用、宿主执行、模型读到结果——三种打包法。这篇讲这份矩阵、真正要紧的分歧（JSON Schema 子集、流式、并行、自定义语法），以及"移植也不会坏"的那一小组工具定义形状。

**Section outline:** STEP 1 "The shared surface" / "共同表面". STEP 2 "OpenAI: Chat Completions vs Responses" / "OpenAI：Chat Completions vs Responses". STEP 3 "Anthropic: PTC and Tool Search" / "Anthropic：PTC 与 Tool Search". STEP 4 "Gemini: OpenAPI and tool_choice" / "Gemini：OpenAPI 与 tool_choice". STEP 5 "Divergence that matters" / "要紧的分歧". STEP 6 "The portable subset" / "可移植子集".

**Content beats:** STEP 1: model proposes / host executes / model reads. STEP 2-4: per-vendor idioms with code. STEP 5: parallel calls, streaming, structured output, JSON Schema subset. STEP 6: the small tool-def surface that survives.

**Required `<pre>` blocks:** Three matched tool-def samples showing the same tool across vendors (~15 lines each, `<pre class="standalone">`).

**Cross-links:** `/deep-dives/protocols-and-interop/tool-calling-standards` (STEP 1), `/concepts/tool-calling-explained` (STEP 1), `/deep-dives/protocols-and-interop/structured-tool-io` (STEP 5).

**Sources:** https://developers.openai.com/api/docs/guides/function-calling + https://platform.claude.com/docs/en/build-with-claude/structured-outputs + https://www.anthropic.com/engineering/advanced-tool-use + https://ai.google.dev/gemini-api/docs/function-calling.

**8 steps:** Same. Commit: `"Deep-Dive: K7 tool-calling-vendor-matrix-2026"`.

---

## Task 24 — Essay K8: `advanced-tool-orchestration-patterns`

**Files:** groups/tool-capability-design.ts + `advanced-tool-orchestration-patterns.html` en/zh.

**Spec:** L (~2300 words), must, `K8`, ⚠ spec-dep.

**Entry line:**

```ts
{ page: 'advanced-tool-orchestration-patterns', slug: 'advanced-tool-orchestration-patterns', title: L('Advanced Tool Orchestration','进阶工具编排'), summary: L('Anthropic Tool Search Tool (85% token reduction); Programmatic Tool Calling (Claude writes Python in a sandbox that calls tools, only final results enter context); Tool Use Examples.','Anthropic 的 Tool Search Tool（减少 85% 令牌）；Programmatic Tool Calling（Claude 在沙箱中写 Python 调工具，只有最终结果进入上下文）；Tool Use Examples。') },
```

**`<h2>` claim (en):** Programmatic Tool Calling — model writes code, code calls tools in a sandbox, only the final result enters context — is not a Claude feature, it's a preview of "code as orchestration" across vendors.

**`<h2>` claim (zh):** Programmatic Tool Calling——模型写代码、代码在沙箱里调工具、只有最终结果进上下文——不是 Claude 的专有特性，而是"代码即编排"跨厂商的预演。

**Hook lede (en):** Anthropic's Tool Search Tool cuts 85% of the token cost of exposing many tools to a model. Their Programmatic Tool Calling shipped in November 2025 — the model writes a small Python program that runs in a sandbox, calls tools there, and only sends the final output back into context. Tool Use Examples add few-shot semantics to the tool interface. These aren't Claude-specific ideas; they're the next primitive across vendors. This essay is what each does, when to reach for it, and where the pattern is heading.

**Hook lede (zh):** Anthropic 的 Tool Search Tool 把"向模型暴露多工具"的令牌开销砍掉 85%。Programmatic Tool Calling 于 2025 年 11 月上线——模型写一小段 Python，在沙箱中运行、在那里调工具，只把最终输出送回上下文。Tool Use Examples 给工具接口加了 few-shot 语义。这些不是 Claude 独有的思路；而是跨厂商的下一层原语。这篇讲每一样做什么、何时抬手够它，以及模式正走向何处。

**Section outline:** STEP 1 "Tool Search Tool" / "Tool Search Tool". STEP 2 "Programmatic Tool Calling" / "编程式工具调用". STEP 3 "Tool Use Examples" / "工具使用示例". STEP 4 "Where the pattern generalizes" / "模式向何处泛化".

**Content beats:** STEP 1: many-tool context bloat problem; TST's semantic search over tool names. STEP 2: sandbox execution reduces context growth on multi-tool chains. STEP 3: few-shot at the tool level. STEP 4: "code as orchestration" is where all three vendors are heading.

**Required `<pre>` blocks:** One Programmatic Tool Calling example (~20 lines Python `<pre class="standalone">`). One Tool Search Tool config (~10 lines).

**Cross-links:** `/deep-dives/protocols-and-interop/tool-calling-standards` (STEP 4), `/deep-dives/tool-capability-design/tool-granularity` (STEP 1), `/deep-dives/architectures-and-patterns/pattern-landscape` (STEP 4).

**Sources:** https://www.anthropic.com/engineering/advanced-tool-use + https://platform.claude.com/docs/en/build-with-claude/structured-outputs.

**8 steps:** Same. Commit: `"Deep-Dive: K8 advanced-tool-orchestration-patterns"`.

---

## Task 25 — Essay K9: `structured-outputs-vs-tool-calls`

**Files:** groups/tool-capability-design.ts + `structured-outputs-vs-tool-calls.html` en/zh.

**Spec:** M (~1400 words), should, `K9`, ⚠ spec-dep.

**Entry line:**

```ts
{ page: 'structured-outputs-vs-tool-calls', slug: 'structured-outputs-vs-tool-calls', title: L('Structured Outputs vs Tool Calls','结构化输出 vs 工具调用'), summary: L("Two ways to constrain the model — same constrained decoding underneath, different ergonomics. Anthropic's native structured outputs GA in 2026; when to use each.",'两种约束模型的方式——底层是同一份受限解码，人体工程学不同。Anthropic 的原生结构化输出于 2026 年 GA；各自何时用。') },
```

**`<h2>` claim (en):** Structured outputs and tool calls are the same constrained-decoding trick with different consent surfaces — knowing which is which decides which one you want.

**`<h2>` claim (zh):** 结构化输出与工具调用是同一份受限解码的两种同意面——搞清哪个是哪个，就能选对你要的那个。

**Hook lede (en):** Under the hood, "output must match schema" and "call this tool" are the same trick: constrained decoding narrows the token distribution to match a grammar. The difference is above the hood — one is asking the model to produce a value, the other is asking it to propose an action. Anthropic finally shipped native structured outputs GA in early 2026 with `output_config.format`, closing the odd gap where they were the vendor without it. This essay is when to use each and why porting between them is easy for reads and hard for writes.

**Hook lede (zh):** 底层看，"输出必须符合 schema" 与 "调这个工具" 是同一种技法：受限解码把令牌分布收缩到符合某种语法。差别在上层——一种是让模型产出一个值，另一种是让它提出一次动作。Anthropic 终于在 2026 年初把原生结构化输出 GA（`output_config.format`），补上了这个奇怪的空缺。这篇讲各自何时用、为什么读用的移植简单、写用的移植麻烦。

**Section outline:** STEP 1 "Same trick underneath" / "底层是同一种技法". STEP 2 "Consent surface: value vs action" / "同意面：值 vs 动作". STEP 3 "The Anthropic 2026 GA change" / "Anthropic 2026 GA 的变化". STEP 4 "When to port" / "何时移植".

**Content beats:** STEP 1: constrained decoding shared. STEP 2: reads = structured; writes = tool. STEP 3: `output_config.format`; strict-mode caps (20 tools, 24 optional params). STEP 4: reads port easily; writes need action semantics on both sides.

**Required `<pre>` blocks:** One same-task-two-ways comparison (~20 lines `<pre class="standalone">`).

**Cross-links:** `/concepts/structured-outputs` (STEP 1), `/concepts/tool-calling-explained` (STEP 2), `/deep-dives/protocols-and-interop/structured-tool-io` (STEP 3).

**Sources:** https://platform.claude.com/docs/en/build-with-claude/structured-outputs.

**8 steps:** Same. Commit: `"Deep-Dive: K9 structured-outputs-vs-tool-calls"`.

---

## Task 26 — Essay K10: `json-schema-subsets-per-vendor`

**Files:** groups/tool-capability-design.ts + `json-schema-subsets-per-vendor.html` en/zh.

**Spec:** M (~1400 words), should, `K10`, ⚠ spec-dep.

**Entry line:**

```ts
{ page: 'json-schema-subsets-per-vendor', slug: 'json-schema-subsets-per-vendor', title: L('JSON Schema Subsets per Vendor','各厂商的 JSON Schema 子集'), summary: L("What's actually enforceable per vendor — no minLength/maxLength/minimum/maximum on Anthropic; OpenAPI subset on Gemini; strict mode requires additionalProperties:false + all required on OpenAI.",'各厂商实际能强制到什么——Anthropic 不支持 minLength/maxLength/minimum/maximum；Gemini 只吃 OpenAPI 子集；OpenAI 的 strict 模式要求 additionalProperties:false 且全为 required。') },
```

**`<h2>` claim (en):** JSON Schema is not one thing — Anthropic, OpenAI, and Gemini enforce different subsets, and the moment you port a schema you meet the mismatch.

**`<h2>` claim (zh):** JSON Schema 不是同一件东西——Anthropic、OpenAI、Gemini 强制的是不同子集，一移植 schema，就会撞上这个不匹配。

**Hook lede (en):** Anthropic ignores `minLength`, `maxLength`, `minimum`, `maximum` at validation time. Gemini enforces the OpenAPI 3.0 subset only. OpenAI's strict mode requires `additionalProperties: false` and marks all fields required. Each is documented, none of them is JSON Schema draft-2020-12. This essay is the table you need next to your editor when you're porting a schema — what each vendor enforces, what silently drops, and the schema shapes that survive intact.

**Hook lede (zh):** Anthropic 在校验时会忽略 `minLength`、`maxLength`、`minimum`、`maximum`。Gemini 只强制 OpenAPI 3.0 子集。OpenAI 的 strict 模式要求 `additionalProperties: false` 且把所有字段标为 required。每家都有文档，都不是 JSON Schema draft-2020-12。这篇是你移植 schema 时放在编辑器旁边的那张表——各厂商强制什么、会静默丢什么，以及"完好可移植"的 schema 形状。

**Section outline:** STEP 1 "The three subsets" / "三个子集". STEP 2 "Anthropic subset" / "Anthropic 子集". STEP 3 "OpenAI strict mode" / "OpenAI 的 strict 模式". STEP 4 "Gemini OpenAPI 3.0 subset" / "Gemini 的 OpenAPI 3.0 子集". STEP 5 "The portable subset" / "可移植子集".

**Content beats:** each STEP: enforceable list, silently-dropped list, gotchas. STEP 5: the intersection that survives across all three.

**Required `<pre>` blocks:** One three-column subset table (`<pre class="trace">`, ~30 lines). One portable-schema example (`<pre class="standalone">`, ~15 lines).

**Cross-links:** `/deep-dives/tool-capability-design/tool-schemas-and-contracts` (STEP 1), `/deep-dives/protocols-and-interop/structured-tool-io` (STEP 5), `/deep-dives/tool-capability-design/tool-calling-vendor-matrix-2026` (STEP 1 — Task 23 committed).

**Sources:** vendor docs enumerated in K7 spec.

**8 steps:** Same. Commit: `"Deep-Dive: K10 json-schema-subsets-per-vendor"`.

---

## Task 27 — Essay K11: `streaming-tool-calls-in-practice`

**Files:** groups/tool-capability-design.ts + `streaming-tool-calls-in-practice.html` en/zh.

**Spec:** M (~1400 words), stretch, `K11`, ⚠ spec-dep.

**Entry line:**

```ts
{ page: 'streaming-tool-calls-in-practice', slug: 'streaming-tool-calls-in-practice', title: L('Streaming Tool Calls in Practice','流式工具调用实操'), summary: L('Per-vendor delta accumulation, the OpenAI GPT-4.1-nano duplicate-call bug, Gemini aggregatable arguments, Anthropic streaming with parallel calls.','逐厂商的增量拼接、OpenAI GPT-4.1-nano 的重复调用 bug、Gemini 可聚合的 arguments、Anthropic 带并行调用的流式。') },
```

**`<h2>` claim (en):** Streaming tool calls look uniform in docs and misbehave differently per vendor — the accumulation semantics, duplicate-call bugs, and parallel-tool interleaving are where correctness lives.

**`<h2>` claim (zh):** 流式工具调用在文档里看起来一致，各厂商却各有各的坏习——增量拼接语义、重复调用 bug、并行工具的交错，正是"是否正确"住在的地方。

**Hook lede (en):** Every vendor documents "you'll receive tool-call deltas as you stream." What they don't document uniformly is: OpenAI GPT-4.1-nano sometimes emits duplicate tool-call blocks; Gemini's `arguments` field is aggregatable across chunks in a way OpenAI's isn't; Anthropic interleaves parallel tool calls in a specific order you have to detect. This essay is the accumulation code that actually works, per vendor, with the bug notes.

**Hook lede (zh):** 每家厂商都写了"流式时你会收到工具调用的增量"。没被一致地写下来的是：OpenAI GPT-4.1-nano 有时会发出重复的 tool-call 块；Gemini 的 `arguments` 字段可跨块聚合，OpenAI 不行；Anthropic 会以特定顺序交错并行工具调用，你得自己识别。这篇给"真能跑对"的逐厂商拼接代码，附上 bug 备注。

**Section outline:** STEP 1 "Common delta shape" / "共同的增量形状". STEP 2 "OpenAI accumulation and the duplicate-call bug" / "OpenAI 拼接与重复调用 bug". STEP 3 "Gemini aggregatable arguments" / "Gemini 可聚合的 arguments". STEP 4 "Anthropic parallel-call interleaving" / "Anthropic 并行调用的交错". STEP 5 "A portable accumulator" / "一份可移植的拼接器".

**Content beats:** each STEP with concrete accumulation code per vendor. STEP 5: adapter shape.

**Required `<pre>` blocks:** One accumulator function per vendor (~10 lines each). One trace showing duplicate-call bug (~10 lines).

**Cross-links:** `/deep-dives/tool-capability-design/tool-calling-vendor-matrix-2026` (STEP 1 — Task 23 committed), `/deep-dives/architectures-and-patterns/tool-error-recovery` (STEP 2).

**Sources:** vendor SDK issue trackers.

**8 steps:** Same. Commit: `"Deep-Dive: K11 streaming-tool-calls-in-practice"`.

---

## Task 28 — Xref back-pass

**Files (estimated ~10-15 existing pages, en + zh each):**

For each new essay drafted in Tasks 1-27, identify the natural link points in existing pages and add xrefs. Rules:

- First natural prose mention only.
- Never inside `<pre>`, headings, or `<code>`.
- `.xref` class, locale-correct href per the URL rules.
- Balance en vs zh counts per file.

**Suggested back-pass targets (executor should verify natural mention in each and skip if none):**

- `mcp-registry-and-distribution` (new MCP essay from PR 1) → link into `agent-cards-and-discovery` (new P9). Bidirectional link since both are discovery essays.
- Existing `pattern-landscape` → `durable-execution-langgraph-plus-temporal` (D9), `browser-agent-failure-modes` (D11), `claude-managed-agents-architecture` (D12), `advanced-tool-orchestration-patterns` (K8).
- Existing `context-budgeting` → `context-caching-economics` (D10), `long-context-effective-vs-advertised` (M10).
- Existing `memory-types` → `memory-write-path-architectures` (M8).
- Existing `evaluating-memory` → `memory-poisoning-defenses` (M9).
- Existing `rl-for-tool-use` → `rlvr-and-grpo-for-agents` (T7), `rl-fine-tuning-open-weights` (T8).
- Existing `process-vs-outcome-rewards` → `process-reward-models` (T9).
- Existing `single-vs-multi-agent` → `sub-agent-patterns-comparison` (G7).
- Existing `a2a-communication` → `a2a-v1-deep-dive` (P8), `agent-cards-and-discovery` (P9).
- Existing `capability-discovery` → `agent-cards-and-discovery` (P9).
- Existing `interop-problem` → `a2a-v1-deep-dive` (P8), `acp-and-what-happened` (P10).
- Existing `tool-calling-standards` → `tool-calling-vendor-matrix-2026` (K7).
- Existing `tool-schemas-and-contracts` → `json-schema-subsets-per-vendor` (K10).
- Existing `structured-tool-io` → `structured-outputs-vs-tool-calls` (K9).
- Existing `when-reasoning-helps` → `adaptive-thinking-and-effort-budgets` (N7).
- Existing operations `llm-as-judge-for-agents` → `judge-calibration-and-meta-evaluation` (E1).
- Existing operations `reading-agent-benchmarks` → `benchmark-landscape-2026` (E2).

- [ ] **Step 1: Walk the list above; for each existing page, read en and zh, find first natural mention, add xref markup in both locales at matching prose positions. Skip when no natural mention.**

- [ ] **Step 2: Balance check.**

```bash
for f in <all modified existing files>; do
  en_count=$(grep -c 'class="xref"' "$f")
  zh_count=$(grep -c 'class="xref"' "${f/\/en\//\/zh\/}")
  echo "$f: en=$en_count zh=$zh_count"
done
```

Expected: en == zh for every modified file.

- [ ] **Step 3: Verify all new xref targets exist in current manifests.**

```bash
for slug in durable-execution-langgraph-plus-temporal context-caching-economics browser-agent-failure-modes claude-managed-agents-architecture a2a-v1-deep-dive agent-cards-and-discovery acp-and-what-happened ap2-and-agent-commerce agents-json-and-openapi-for-agents memory-write-path-architectures memory-poisoning-defenses long-context-effective-vs-advertised learned-retrievers-and-memrl rlvr-and-grpo-for-agents rl-fine-tuning-open-weights process-reward-models dspy-3-gepa-for-agent-optimization sub-agent-patterns-comparison judge-calibration-and-meta-evaluation benchmark-landscape-2026 hal-and-async-agent-eval adaptive-thinking-and-effort-budgets tool-calling-vendor-matrix-2026 advanced-tool-orchestration-patterns structured-outputs-vs-tool-calls json-schema-subsets-per-vendor streaming-tool-calls-in-practice; do
  if [ -z "$(grep -rE "slug: '$slug'" src/content/deep-dives/groups/)" ]; then echo "MISSING: $slug"; fi
done
```

Expected: no output.

- [ ] **Step 4: Run all three gates.**

```bash
npm run build && npm run verify && npm test
```

Expected: all pass. `npm run verify` catches broken internal links.

- [ ] **Step 5: Commit.**

```bash
git add <all modified files>
git commit -m "PR 2 xref back-pass: link existing pages into new Deep-Dive essays"
```

---

## Task 29 — Changelog entry

**Files:**
- Create: `src/content/changelog/entries/<MERGE-DATE>-pr2-deep-dive-additions.ts`

Use today's date at draft time; rename filename and update `date:` field just before merge if the merge day differs (`changelog.test.mjs` enforces filename ↔ date match).

- [ ] **Step 1: Create the changelog file.**

```ts
import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '<YYYY-MM-DD>',  // == merge date; also the filename prefix
  title: L(
    'Deep-Dive additions across seven groups + new Evaluating Agents group (27 essays)',
    '七个分组下的深入解析新增 + 新增"评估智能体"分组（27 篇）',
  ),
  items: [
    L(
      'Added 27 new Deep-Dive essays across Architectures & Patterns (4), Protocols & Interop (5), Memory & Context (4), Training (4), Multi-Agent (1), Reasoning (1), Tool & Capability Design (5), and a new Evaluating Agents group (3).',
      '在架构与模式（4 篇）、协议与互操作（5 篇）、记忆与上下文（4 篇）、训练（4 篇）、多智能体（1 篇）、推理（1 篇）、工具与能力设计（5 篇），以及新增的"评估智能体"分组（3 篇）之下，共新增 27 篇深入解析。',
    ),
    L(
      'New Evaluating Agents group (order 100) collects the 2026 discipline of evaluating agents: judge calibration and meta-evaluation collapse, the post-Verified benchmark landscape (SWE-bench Pro / HAL / Gaia2 / tau2-bench), and asynchronous agent eval.',
      '新增"评估智能体"分组（order 100）汇集 2026 年的评估学科：评判器校准与元评测坍缩、Verified 之后的基准全景（SWE-bench Pro / HAL / Gaia2 / tau2-bench），以及异步智能体评测。',
    ),
    L(
      'Cross-linked new essays back into ~15 existing pages so readers arriving on established topics find the 2026 material.',
      '把新篇章反向链回约 15 个既有页面，让读者从旧主题也能找到 2026 年的新内容。',
    ),
  ],
};
export default entry;
```

- [ ] **Step 2: Verify filename matches `date:`.**

```bash
ls src/content/changelog/entries/*pr2-deep-dive-additions.ts
grep "^  date:" src/content/changelog/entries/*pr2-deep-dive-additions.ts
```

- [ ] **Step 3: Run all three gates.**
- [ ] **Step 4: Commit.**

```bash
git add src/content/changelog/entries/<file>.ts
git commit -m "Changelog: entry for PR 2 Deep-Dive additions"
```

---

## Task 30 — Final verification + PR opening

- [ ] **Step 1: Full verification.**

```bash
npm run build 2>&1 | tail -10
npm run verify 2>&1 | tail -5
npm test 2>&1 | tail -5
```

Expected: all pass.

- [ ] **Step 2: Grep new content for TODOs.**

```bash
grep -rn "TODO\|TBD" src/content/deep-dives/en/ src/content/deep-dives/zh/ src/content/deep-dives/groups/evaluating-agents.ts | grep -vE "(architecture|memory|protocols|training|multi-agent|reasoning|tool-|retrieval)" 
```

Expected: empty for the 27 new slugs.

- [ ] **Step 3: Hook-lede audit.** Read the first `<p class="goal">` of each of the 27 new en fragments. Confirm: no banned openers, first sentence carries stakes, no bullets/tables/fences.

- [ ] **Step 4: `<pre>` byte-identical audit across all 27 essays.**

```bash
for slug in durable-execution-langgraph-plus-temporal context-caching-economics browser-agent-failure-modes claude-managed-agents-architecture a2a-v1-deep-dive agent-cards-and-discovery acp-and-what-happened ap2-and-agent-commerce agents-json-and-openapi-for-agents memory-write-path-architectures memory-poisoning-defenses long-context-effective-vs-advertised learned-retrievers-and-memrl rlvr-and-grpo-for-agents rl-fine-tuning-open-weights process-reward-models dspy-3-gepa-for-agent-optimization sub-agent-patterns-comparison judge-calibration-and-meta-evaluation benchmark-landscape-2026 hal-and-async-agent-eval adaptive-thinking-and-effort-budgets tool-calling-vendor-matrix-2026 advanced-tool-orchestration-patterns structured-outputs-vs-tool-calls json-schema-subsets-per-vendor streaming-tool-calls-in-practice; do
  en_hash=$(python3 -c "import re; content = open('src/content/deep-dives/en/${slug}.html').read(); print('\n'.join(re.findall(r'<pre[^>]*>.*?</pre>', content, re.DOTALL)))" | sha256sum | cut -c1-16)
  zh_hash=$(python3 -c "import re; content = open('src/content/deep-dives/zh/${slug}.html').read(); print('\n'.join(re.findall(r'<pre[^>]*>.*?</pre>', content, re.DOTALL)))" | sha256sum | cut -c1-16)
  if [ "$en_hash" = "$zh_hash" ]; then echo "$slug: OK"; else echo "$slug: MISMATCH"; fi
done
```

Expected: every essay reports OK.

- [ ] **Step 5: Xref count balance check across all 27 essays.**

```bash
for slug in <same list>; do
  en=$(grep -c 'class="xref"' "src/content/deep-dives/en/${slug}.html")
  zh=$(grep -c 'class="xref"' "src/content/deep-dives/zh/${slug}.html")
  if [ "$en" != "$zh" ]; then echo "$slug: MISMATCH en=$en zh=$zh"; fi
done
```

Expected: silent (all balanced).

- [ ] **Step 6: Verify changelog date matches today.** If merging on a different day, rename file + update `date:` field.

- [ ] **Step 7: Push and open PR.**

```bash
git push -u origin plan/pr2-deep-dive-additions
gh pr create --title "Deep-Dive additions across 7 groups + new Evaluating Agents group (27 essays)" --body "$(cat <<'EOF'
## Summary
- 27 new Deep-Dive essays: 4 in Architectures & Patterns, 5 in Protocols & Interop, 4 in Memory & Context, 4 in Training, 1 in Multi-Agent, 1 in Reasoning, 5 in Tool & Capability Design, and 3 in a new Evaluating Agents group (order 100).
- New group scaffold: `groups/evaluating-agents.ts`.
- Xref back-pass links new essays back from ~15 existing pages.
- Bilingual (en/zh) throughout; `<pre>` blocks byte-identical (SHA-hash verified); hook-lede rule honored.
- Changelog entry included.

## Contents (by group)
### architectures-and-patterns (D9-D12, 4)
- durable-execution-langgraph-plus-temporal (must)
- context-caching-economics (should)
- browser-agent-failure-modes (should)
- claude-managed-agents-architecture (stretch)

### protocols-and-interop (P8-P12, 5)
- a2a-v1-deep-dive (must)
- agent-cards-and-discovery (should)
- acp-and-what-happened (stretch)
- ap2-and-agent-commerce (stretch)
- agents-json-and-openapi-for-agents (stretch)

### memory-and-context (M8-M11, 4)
- memory-write-path-architectures (must)
- memory-poisoning-defenses (should)
- long-context-effective-vs-advertised (should)
- learned-retrievers-and-memrl (stretch)

### training-agentic-models (T7-T10, 4)
- rlvr-and-grpo-for-agents (must)
- rl-fine-tuning-open-weights (should)
- process-reward-models (should)
- dspy-3-gepa-for-agent-optimization (stretch)

### multi-agent-systems (G7, 1)
- sub-agent-patterns-comparison (should)

### evaluating-agents (E1-E3, 3) — NEW GROUP
- judge-calibration-and-meta-evaluation (must)
- benchmark-landscape-2026 (should)
- hal-and-async-agent-eval (stretch)

### reasoning-and-test-time-compute (N7, 1)
- adaptive-thinking-and-effort-budgets (must)

### tool-capability-design (K7-K11, 5)
- tool-calling-vendor-matrix-2026 (must)
- advanced-tool-orchestration-patterns (must)
- structured-outputs-vs-tool-calls (should)
- json-schema-subsets-per-vendor (should)
- streaming-tool-calls-in-practice (stretch)

## Design & planning trail
- Design: `docs/superpowers/specs/2026-07-06-new-tech-pages-design.md`
- Slate (approved): `docs/superpowers/specs/2026-07-06-new-tech-pages-slate.md`
- Research: `docs/superpowers/specs/2026-07-06-new-tech-pages-research.md`
- PR 2 plan: `docs/superpowers/plans/2026-07-09-pr2-deep-dive-additions.md`

## Test plan
- [ ] `npm run build` passes with no new warnings
- [ ] `npm run verify` passes (internal-link check)
- [ ] `npm test` passes (`deep-dives-manifest.test.mjs` + `changelog.test.mjs`)
- [ ] Every essay opens with a hook lede
- [ ] Every `<pre>` block byte-identical between en and zh
- [ ] Every xref href resolves to an existing slug
- [ ] Changelog `date:` matches filename and merge day

## Follow-ups (out of scope for this PR)
- **PR 3 — Track 3:** 5 Field Guide chapters (4 Frontier Part additions + `e5 evals-as-ci-gate`).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 8: Save the PR URL and report back.**

---

## Notes for the executor

- All work in `.worktrees/pr2-deep-dive-additions/`. Never edit main.
- Serial dispatch is simplest. Parallelism-across-groups is an optimization; each subagent modifies its own group file so parallel dispatch is safe. If parallelizing, serialize within a group but parallelize across groups (up to ~4 concurrent to keep review manageable).
- After each essay task, the next task's cross-links can reference it. Track committed slugs; never forward-reference.
- Slate at `docs/superpowers/specs/2026-07-06-new-tech-pages-slate.md` is authoritative. If any step here conflicts with the slate, follow the slate and flag the plan.
- Research file `docs/superpowers/specs/2026-07-06-new-tech-pages-research.md` §§3-5 are the source of record for all factual claims.
- If a research URL is dead or a claim doesn't verify during drafting, DROP the specific claim; do not paper over.
- ⚠ spec-dep and ⚠ benchmark-dep essays cite specific spec versions or numbers — keep language attributive and dated ("As of July 2026") in both locales.
