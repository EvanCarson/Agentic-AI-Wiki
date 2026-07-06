# Slate: New Tech Pages (2026-07 batch)

**Status:** proposed — awaiting Checkpoint 1 approval
**Design spec:** `2026-07-06-new-tech-pages-design.md`
**Research:** `2026-07-06-new-tech-pages-research.md`
**Date:** 2026-07-06

**Cut-line policy:** If time forces a cut, drop `stretch` first, then `should`; never cut `must` without re-approval.

**Design amendment flagged for user decision:** A second new Deep-Dive group `evaluating-agents` is proposed alongside the planned `mcp` group. The eval-focused essays from the "Agent engineering practice" scope area don't fit any of the 8 existing groups cleanly. If rejected at Checkpoint 1, the eval essays are dropped from this batch (or re-routed to Operations in a separate design).

**Totals:** 32 must+should pages (16 must + 16 should) + 10 stretch = 42 total. Comfortably ≥ 20 target from the design spec.

---

## Landscape summary

**Frontier capabilities.** By mid-2026, 1M-token contexts are table stakes across Anthropic (Sonnet 5 / Opus 4.7-4.8), Google (Gemini 3.1-3.5 Pro at 2M), and OpenAI (GPT-5.4/5.5), but RULER/NoLiMa show effective usable context is 50-65% of the advertised ceiling. Reasoning moved from a boolean flag to a *budget-controlled adaptive* dial — Anthropic's `budget_tokens` is deprecated in favor of `effort`, matched by Gemini's `thinking_level` and OpenAI's `reasoning_effort`. Computer use progressed from research preview to production-grade on narrow flows (OSWorld 15% → 72.5%) but remains not-unqualified-GA. Agent post-training has standardized on a GRPO/DAPO + RLVR pipeline, and the open-weight gap now sits at ~4 months on Epoch ECI — capability-shaped (coding closed, reasoning still 3-8pp behind).

**Agent engineering practice.** Three shifts. Single-number leaderboards saturated: SWE-bench Verified has five models within 0.7 pts in the 80% band; the field migrated to SWE-bench Pro, HAL (cost-per-solve + reliability dashboard), Gaia2 (async environments), and tau2-bench. Durable execution became table stakes — Claude Managed Agents (2026-04-08) with append-only session logs, Temporal repositioning at agent-orchestration, and the LangGraph+Temporal hybrid emerging as the "reasoning graph + durable runtime" pattern. LLM-as-judge hit a crisis: "meta-evaluation collapse" is a named failure mode, and production discipline now means judge calibration (85-90% agreement floor with human gold set), monthly recalibration, and eval-score drift detection on 5-20% of live traffic.

**Protocols & standards.** The "protocol war" collapsed into a two-layer consensus: MCP for agent-to-tool, A2A for agent-to-agent. A2A hit v1.0 on 2026-04-09 with 150+ member orgs and five official SDKs; ACP was folded into A2A and is effectively gone; a Q3 2026 MCP/A2A joint interop spec is on the public roadmap. MCP itself is at spec version 2025-11-25 with Streamable HTTP replacing the deprecated HTTP+SSE transport, a full OAuth 2.1 profile (PKCE + RFC 8707 + PRM), and new server-authored features (URL-mode elicitation, sampling with tools). On tool calling all three big vendors converged on parallel calls + strict JSON-Schema-constrained decoding but with meaningfully different subsets — "portable" tool defs are still fiction. Anthropic shipped native Structured Outputs GA in late 2025/early 2026, and Programmatic Tool Calling (Nov 2025) foreshadows a "code-as-orchestration" pattern across vendors.

---

## Track 1 — MCP Deep-Dive group (new: `groups/mcp.ts`)

**Group blurb (en):** Building, testing, securing, and operating Model Context Protocol servers — the practical layer above `mcp-architecture`'s conceptual introduction.
**Group blurb (zh):** 构建、测试、保护与运维模型上下文协议服务器——`mcp-architecture` 概念介绍之上的实践层。
**Track budget:** 10 entries, ~15k words en + ~15k words zh.

### Entries

- **mcp-building-servers-in-practice** | mcp | L | must | Idiomatic server construction beyond hello-world; tool/resource/prompt registration in FastMCP and TypeScript SDK; when to expose something as a tool vs a resource vs a prompt.
  Gap: `mcp-architecture` covers the object model conceptually; no essay covers the actual server-building idiom (decorators, Standard Schema, registration lifecycle), which is where practitioners actually start.
  Links: mcp-architecture, tool-calling-explained, structured-tool-io
  ⚠ spec-dep

- **mcp-tool-design** | mcp | M | must | Designing MCP tools for the agent workflow, not to mirror internal REST APIs; description phrasing changes agent tool selection; the "search-then-fetch" two-step pattern; leaving "breadcrumbs" for agent convergence.
  Gap: `tool-design-principles` covers general tool design; no essay covers MCP-specific tool-design decisions (resource vs tool boundary, description-as-instruction, agent-workflow shape).
  Links: tool-design-principles, tool-granularity, mcp-building-servers-in-practice

- **mcp-testing** | mcp | L | must | In-memory client-server binding (FastMCP `Client(server)`, TS in-memory transports); why subprocess-based tests are flaky; contract/schema tests separate from behavior tests; MCP Inspector for exploratory testing; MCP Interviewer for schema linting; the "vibe-testing" anti-pattern.
  Gap: no essay covers MCP testing at all. User explicitly requested this coverage. Testing methodology is where teams either over-invest or ship untested.
  Links: mcp-building-servers-in-practice, tool-schemas-and-contracts, tool-error-messages

- **mcp-streamable-http-deep-dive** | mcp | L | must | Streamable HTTP as the current transport; session management via `MCP-Session-Id`; resumability via `Last-Event-ID`; horizontal scaling with stateful sessions; migration from deprecated HTTP+SSE; why remote servers behave like distributed systems.
  Gap: `mcp-architecture` mentions transports conceptually; no essay covers Streamable HTTP operationally — the deprecation of HTTP+SSE alone leaves current tutorials stale.
  Links: mcp-architecture, mcp-building-servers-in-practice, mcp-ops-in-production
  ⚠ spec-dep

- **mcp-auth-oauth21** | mcp | L | must | The MCP OAuth 2.1 profile: PKCE mandatory, RFC 8707 resource indicators, RFC 9728 Protected Resource Metadata for AS discovery, Client ID Metadata Documents vs Dynamic Client Registration, scope minimization. Assumes reader knows OAuth basics.
  Gap: no essay covers MCP auth; ~39% of surveyed MCP servers ship without auth (Bloomberry 2026), so this is a live production-security gap the wiki should address.
  Links: mcp-architecture, mcp-security-anti-patterns, agentic-threat-model
  ⚠ spec-dep

- **mcp-security-anti-patterns** | mcp | M | must | Concrete attack catalog: confused-deputy in proxy servers, token passthrough (explicitly forbidden by spec), session hijacking (prompt-injection and impersonation variants), SSRF via OAuth discovery URLs, `javascript:` URL injection, local-server startup-command execution.
  Gap: `agentic-threat-model` and `prompt-injection` are general; nothing covers the MCP-specific attack surface documented in the 2025-11-25 security_best_practices spec appendix.
  Links: mcp-auth-oauth21, mcp-tool-poisoning, agentic-threat-model, prompt-injection

- **mcp-sampling-and-elicitation** | mcp | M | should | Two under-covered server-initiated MCP features: sampling with tools (multi-turn nested tool loops issued server→client's LLM, so servers don't need their own API keys), and URL-mode elicitation (out-of-band credential capture without token passthrough). Both require careful HITL design.
  Gap: brand-new features in the 2025-11-25 spec; no existing coverage anywhere. Practitioners will meet these first when trying to build stateful or credentialed MCP servers.
  Links: mcp-architecture, mcp-building-servers-in-practice, human-in-the-loop
  ⚠ spec-dep

- **mcp-tool-poisoning** | mcp | M | should | Indirect prompt injection via tool descriptions/parameter metadata; CVE-2025-54136; MCPTox benchmark findings; why most clients don't statically validate tool descriptions; static-linter and gateway defenses.
  Gap: `prompt-injection` and `rag-security` cover data-side injection; nothing covers tool-description-side injection, which is the MCP-specific attack.
  Links: prompt-injection, mcp-security-anti-patterns, tool-schemas-and-contracts

- **mcp-ops-in-production** | mcp | M | stretch | Per-tool kill switches (feature flags), source-side redaction in audit logs (log argument *shapes*, not values), tenant isolation via verified token claims (not request bodies), agentic rate-limit sizing.
  Gap: `feature-flags-for-agents`, `kill-switches`, `audit-trails`, `scoped-credentials-for-agents` cover general ops; MCP-specific operational patterns aren't collected anywhere.
  Links: feature-flags-for-agents, kill-switches, scoped-credentials-for-agents, mcp-auth-oauth21

- **mcp-registry-and-distribution** | mcp | S | stretch | Publishing to the MCP Registry; package types (npm/PyPI/OCI); versioning conventions; `.well-known` capability discovery on the 2026 MCP roadmap.
  Gap: no existing distribution/registry essay. This is a small piece but a practical one for teams shipping servers.
  Links: mcp-building-servers-in-practice, capability-discovery
  ⚠ spec-dep

---

## Track 2 — Deep-Dive additions in existing groups (plus one proposed new group)

**Track budget:** 27 entries across 8 groups (7 existing + 1 proposed new). ~40k words en + ~40k zh at full slate.

### `architectures-and-patterns` (existing group)

- **durable-execution-langgraph-plus-temporal** | architectures-and-patterns | L | must | Checkpointer-between-nodes vs Temporal-within-node distinction; replay semantics; why LangGraph loops don't survive at 10k items; the "reasoning graph + durable runtime" pattern.
  Gap: no essay covers durable execution or the Temporal pairing. The recent LangGraph/CrewAI blog post covers framework choice, not runtime semantics.
  Links: pattern-landscape, plan-and-execute, agent-frameworks

- **context-caching-economics** | architectures-and-patterns | M | should | Cross-vendor cache pricing (Anthropic 1.25x write/0.1x read; Gemini uniform 90% off; OpenAI automatic 75-90%); TTL tradeoffs; caching + batch stacking to ~95% off list.
  Gap: `cost-quality-latency` covers general economics; `context-budgeting` covers window sizing; nothing covers caching-specific economics, which is now a major cost lever.
  Links: cost-quality-latency, context-budgeting, inference-providers
  ⚠ benchmark-dep

- **browser-agent-failure-modes** | architectures-and-patterns | M | should | The six failure modes not caught by WebArena: DOM drift, screenshot ambiguity, login state, modal interruptions, rate-limit cliffs, irreversibility. Complements `computer-use-in-production` Field Guide chapter.
  Gap: `browser-agents` (playbooks) covers the vertical; no deep-dive on the harness-level failure taxonomy.
  Links: pattern-landscape, tool-error-recovery, computer-use-in-production

- **claude-managed-agents-architecture** | architectures-and-patterns | M | stretch | Durable session as append-only event log; stateless harness; wake(sessionId) recovery; contrast with LangGraph checkpointer scope.
  Gap: no essay covers the specific Anthropic Managed Agents design (2026-04-08); relevant to the durable-execution pattern.
  Links: durable-execution-langgraph-plus-temporal, agent-frameworks
  ⚠ benchmark-dep

### `memory-and-context` (existing group)

- **memory-write-path-architectures** | memory-and-context | L | must | Why RAG-only is dead for stateful agents; write/retrieval/update policies; episodic vs semantic vs procedural vs relational memory taxonomy; who decides what earns a slot.
  Gap: `short-vs-long-term-memory` and `memory-types` cover read-side taxonomy; the *write-path* — the policies that gate what enters memory — is the newer 2026 focus and isn't covered.
  Links: short-vs-long-term-memory, memory-types, retrieval-augmented-memory

- **memory-poisoning-defenses** | memory-and-context | M | should | AgentPoison (80% ASR at <0.1% poison), MemoryGraft, SpAIware, Morris-II worm; lifecycle defenses at ingestion/storage/retrieval/monitoring.
  Gap: `evaluating-memory` names poisoning as a pitfall but doesn't cover defenses; `prompt-injection` covers input-side, not memory-side.
  Links: evaluating-memory, memory-stores, prompt-injection, agentic-threat-model

- **long-context-effective-vs-advertised** | memory-and-context | M | should | Why RULER/NoLiMa/MRCR v2 diverge from advertised token ceilings by 30-60 pts past 200K; how to budget accordingly; the 1M/2M reality vs marketing.
  Gap: `context-windows` (concept) covers the mechanism; `context-budgeting` covers allocation; nothing covers the "effective ≠ advertised" story that's the 2026 headline.
  Links: context-budgeting, context-compaction, context-windows
  ⚠ benchmark-dep

- **learned-retrievers-and-memrl** | memory-and-context | M | stretch | MemRL treats store/retrieve/update/summarize/discard as tools optimized via RL; rank-by-learned-utility vs semantic similarity alone.
  Gap: `retrieval-augmented-memory` covers the read side; MemRL is a distinct RL-trained approach not covered anywhere.
  Links: retrieval-augmented-memory, memory-stores, rl-for-tool-use

### `reasoning-and-test-time-compute` (existing group)

- **adaptive-thinking-and-effort-budgets** | reasoning-and-test-time-compute | L | must | Migration from explicit `budget_tokens` to `effort` (Claude) / `thinking_level` (Gemini) / `reasoning_effort` (OpenAI); when the model overrides your budget; cross-vendor portability.
  Gap: `when-reasoning-helps` and `inference-time-scaling` predate the deprecation of `budget_tokens`; the new adaptive API surface is the 2026 story.
  Links: when-reasoning-helps, inference-time-scaling, reasoning-models
  ⚠ spec-dep

### `training-agentic-models` (existing group)

- **rlvr-and-grpo-for-agents** | training-agentic-models | L | must | Three-stage recipe SFT → DPO/SimPO → GRPO/DAPO with verifiable rewards; entropy collapse; KL drift; multi-turn algorithms (ARPO, StepPO, Turn-PPO); why RLVR is the dominant 2026 recipe.
  Gap: `rl-for-tool-use` covers RL over tool trajectories conceptually; the specific GRPO/DAPO/RLVR pipeline that shipped in 2025-2026 is uncovered.
  Links: rl-for-tool-use, rlhf-and-rlaif, reward-design-and-hacking

- **rl-fine-tuning-open-weights** | training-agentic-models | M | should | SageMaker RFT + TRL v1.0 + LlamaFactory + VeRL enable GRPO on Qwen3/Llama 4/DeepSeek V4 with in-house verifiable rewards; the "custom reasoning model" playbook.
  Gap: `open-vs-closed-models` covers the choice; no essay covers the practical RL-fine-tuning-your-own frontier that 2026 tooling enabled. Goes beyond the shipped open-weights blog post.
  Links: rlvr-and-grpo-for-agents, rl-for-tool-use, open-vs-closed-models

- **process-reward-models** | training-agentic-models | M | should | Step-level PRM vs outcome-only RLVR; dense credit assignment for long-horizon SWE agents; SWE-TRACE, AgentPRM, SPARK. Extends existing `process-vs-outcome-rewards`.
  Gap: `process-vs-outcome-rewards` covers the conceptual trade-off; the 2026 PRM-implementation state (specific models, credit-assignment techniques) is newer material.
  Links: process-vs-outcome-rewards, verifier-guided-search, reward-design-and-hacking

- **dspy-3-gepa-for-agent-optimization** | training-agentic-models | M | stretch | GEPA (ICLR 2026 oral) outperforming MIPROv2 by 13% and RL/GRPO by 20% with 35x fewer rollouts; when to use each optimizer.
  Gap: no essay covers DSPy or GEPA. Fits training-agentic-models as an "optimization" essay adjacent to RL.
  Links: rlvr-and-grpo-for-agents, agent-frameworks
  ⚠ benchmark-dep

### `multi-agent-systems` (existing group)

- **sub-agent-patterns-comparison** | multi-agent-systems | M | should | LangGraph supervisor/hierarchical/collaborative vs OpenAI Agents SDK handoffs-vs-agents-as-tools vs deepagents subagents; when each shape works.
  Gap: `supervisor-worker-pattern`, `multi-agent-topologies` are pattern-focused; the 2026 framework-specific sub-agent taxonomies aren't compared anywhere.
  Links: supervisor-worker-pattern, multi-agent-topologies, single-vs-multi-agent

### `protocols-and-interop` (existing group)

- **a2a-v1-deep-dive** | protocols-and-interop | L | must | A2A v1.0 message model; task lifecycle (nine states incl. `INPUT_REQUIRED`, `AUTH_REQUIRED`, `REJECTED`); Message vs Artifact split; streaming per transport (SSE for JSON-RPC, native gRPC, HTTP streaming); `A2A-Version` header versioning; migration from pre-1.0 (nine states, not four).
  Gap: `a2a-communication` predates v1.0; it's stale on nine task states, Message vs Artifact, versioning, and Linux Foundation governance.
  Links: a2a-communication, interop-problem, capability-discovery
  ⚠ spec-dep

- **agent-cards-and-discovery** | protocols-and-interop | M | should | `/.well-known/agent.json`; capability declaration; extended cards; signing; caching. Contrast with MCP registry-based discovery.
  Gap: `capability-discovery` covers the concept; the A2A v1.0 Agent Card format and `/.well-known/` convention are newer specifics.
  Links: capability-discovery, a2a-v1-deep-dive, mcp-registry-and-distribution

- **acp-and-what-happened** | protocols-and-interop | S | stretch | Short post-mortem: ACP existed, was REST-native, contributed to Linux Foundation in July 2025 and folded into A2A. Useful because searches still surface stale "ACP vs A2A" content.
  Gap: no essay explains the ACP disappearance; readers arriving from older content will be confused.
  Links: interop-problem, a2a-v1-deep-dive

- **ap2-and-agent-commerce** | protocols-and-interop | M | stretch | AP2 mandate model (Intent/Cart/Payment as W3C VCs); why it sits above A2A/MCP not inside them; stablecoin rails. Skeptical framing.
  Gap: no essay covers agent-commerce protocols. AP2 is a genuine 2026 emergence worth tracking.
  Links: a2a-v1-deep-dive, agent-cards-and-discovery
  ⚠ spec-dep

- **agents-json-and-openapi-for-agents** | protocols-and-interop | M | stretch | agents.json v0.1 spec on top of OpenAPI; AGENTS.md conventions; why "just point the agent at your OpenAPI" doesn't fully work.
  Gap: no essay covers OpenAPI-for-agents. Complements MCP tool design essay by showing the alternative.
  Links: mcp-tool-design, tool-discovery-and-docs, structured-tool-io

### `tool-capability-design` (existing group)

- **tool-calling-vendor-matrix-2026** | tool-capability-design | L | must | Side-by-side of OpenAI (Chat Completions vs Responses API, `parallel_tool_calls`, custom tools w/ Lark/regex grammar), Anthropic (Programmatic Tool Calling, Tool Search Tool, Tool Use Examples), Gemini (OpenAPI subset, `tool_choice: any`, multimodal function responses). Skeptical framing: schemas differ enough that "portable" tool defs are still fiction.
  Gap: `tool-calling-standards` covers the universal contract at a high level and predates all three vendors' 2026 additions. This is the 2026 vendor-matrix update.
  Links: tool-calling-standards, tool-calling-explained, structured-tool-io

- **advanced-tool-orchestration-patterns** | tool-capability-design | L | must | Anthropic Tool Search Tool (85% token reduction); Programmatic Tool Calling (Claude writes Python in a sandbox that calls tools, only final outputs enter context); Tool Use Examples. New primitives that changed the design space in late 2025.
  Gap: no essay covers these primitives. Programmatic Tool Calling foreshadows "code-as-orchestration" across vendors, worth naming early.
  Links: tool-calling-standards, tool-granularity, pattern-landscape

- **structured-outputs-vs-tool-calls** | tool-capability-design | M | should | When to use each; why they're mechanically similar (both constrained decoding under the hood); Anthropic's late arrival to native structured outputs (GA in 2026 with `output_config.format`); the 20-strict-tools / 24-optional-params cap.
  Gap: `structured-outputs` (concept) covers the mechanism; `tool-calling-explained` covers tool calls; the *choice between them* isn't addressed anywhere.
  Links: structured-outputs, tool-calling-explained, structured-tool-io

- **json-schema-subsets-per-vendor** | tool-capability-design | M | should | What's actually enforceable: no `minLength`/`maxLength`/`minimum`/`maximum` on Anthropic; OpenAPI subset only on Gemini; strict mode requires `additionalProperties:false` + all fields required on OpenAI.
  Gap: `tool-schemas-and-contracts` covers schema design; the *vendor-by-vendor enforceable subset* isn't documented anywhere. Practitioners hit this the moment they try to port a schema.
  Links: tool-schemas-and-contracts, structured-tool-io, tool-calling-vendor-matrix-2026

- **streaming-tool-calls-in-practice** | tool-capability-design | M | stretch | Vendor-by-vendor: how to accumulate deltas; gotchas (OpenAI GPT-4.1-nano duplicate tool calls, Gemini aggregatable `arguments`, Anthropic streaming with parallel calls).
  Gap: no essay covers streaming tool calls. Small but practical.
  Links: tool-calling-vendor-matrix-2026, tool-error-recovery

### `evaluating-agents` (NEW group — design amendment)

Group blurb (en): The 2026 discipline of evaluating agents: benchmark saturation, judge calibration, drift detection, and the eval methodologies that survived contact with production.
Group blurb (zh): 评估智能体的 2026 学科：基准饱和、评判器校准、漂移检测，以及在生产接触中存活下来的评测方法学。

- **judge-calibration-and-meta-evaluation** | evaluating-agents | L | must | Prometheus 2, JudgeBench, RubricEval; meta-evaluation collapse as a named failure mode; the 85-90% human-agreement floor; monthly recalibration cadence.
  Gap: `evals-101` and `llm-as-judge-for-agents` cover the technique; the *calibration methodology* is the newer discipline and isn't covered.
  Links: evals-101, evaluating-rag, evaluating-memory

- **benchmark-landscape-2026** | evaluating-agents | M | should | SWE-bench Verified saturation (5 models within 0.7 pts); SWE-bench Pro; contamination legal-deterrent strategy; the migration from single-score leaderboards; why Verified is now "an audit signal, not a ranking".
  Gap: `reading-benchmarks` (concept) and `reading-agent-benchmarks` (operations) predate the 2026 saturation and the Pro/HAL/Gaia2 successors. Consolidates the "where benchmarks live now" story.
  Links: reading-benchmarks, evaluating-rag, judge-calibration-and-meta-evaluation
  ⚠ benchmark-dep

- **hal-and-async-agent-eval** | evaluating-agents | M | stretch | Princeton HAL (cost-per-solve + 5-dim reliability dashboard); Gaia2 (async environments, write-action verifiers, temporal constraints); why static benchmarks miss real deployment.
  Gap: no essay covers HAL or Gaia2. A composite essay on "the async/reliability turn" in benchmarks.
  Links: benchmark-landscape-2026, judge-calibration-and-meta-evaluation
  ⚠ benchmark-dep

---

## Track 3 — Field Guide chapters

**Track budget:** 5 chapters, ~8k words en + ~8k zh.

The Field Guide's Frontier Part (Part V) currently has only `r1 what-to-read` — very sparse. This batch adds 4 chapters there and 1 to Evaluate Part.

- **r2 computer-use-in-production** | Field Guide, Part V — Frontier | M | must | OSWorld 15% (late 2024) → 72.5% (early 2026); WebArena leader 68.7%; production success >90% on narrow flows; harness design > provider choice; the six failure modes.
  Gap: `x2 computer-use` covers introduction; a Frontier-Part successor is needed to reflect 2026 production reality.
  Links: x2 computer-use, browser-agent-failure-modes, browser-agents (playbook)

- **r3 mcp-native-agent-building** | Field Guide, Part V — Frontier | L | must | End-to-end chapter: build an agent that uses MCP servers for tools; wire an MCP client; handle sampling/elicitation; test the loop. Ties Track 1 MCP essays into a Field Guide narrative.
  Gap: no Field Guide chapter walks through building an agent with MCP as the tool layer. Natural capstone for the MCP group.
  Links: mcp-building-servers-in-practice, mcp-testing, mcp-architecture, f3 tool-use
  Depends on Track 1 (mcp group).

- **r4 the-two-layer-consensus** | Field Guide, Part V — Frontier | M | should | MCP-below, A2A-above architecture; when the two-layer split breaks down (single-vendor stacks, local/edge); where the Q3 2026 joint spec is supposed to help.
  Gap: no Field Guide chapter addresses the protocol stack story. Newcomers land on individual protocol essays without the big-picture placement.
  Links: mcp-architecture, a2a-v1-deep-dive, interop-problem
  Depends on Track 2 (a2a-v1-deep-dive) and Track 1 (mcp group).

- **r5 choosing-thinking-effort** | Field Guide, Part V — Frontier | M | should | Cost math for thinking tokens billed at output rate; empirically-driven decisions on latency-sensitive paths; when to turn thinking off.
  Gap: `s2 cost-and-latency` covers general cost/latency; adaptive-thinking API is 2026-specific and deserves its own chapter.
  Links: adaptive-thinking-and-effort-budgets, s2 cost-and-latency, reasoning-models
  Depends on Track 2 (adaptive-thinking-and-effort-budgets).

- **e5 evals-as-ci-gate** | Field Guide, Part III — Evaluate | M | should | Tiered code-graders in pre-commit + LLM-judges in preview/prod; PR-blocking rubric regressions; golden dataset flywheel from production traces.
  Gap: `e4 benchmarks-and-ci` covers benchmarks; the specific eval-as-CI-gate pattern (tiering + PR-blocking) is a 2026 discipline that hasn't landed in the Field Guide.
  Links: e4 benchmarks-and-ci, e1 eval-driven-dev, judge-calibration-and-meta-evaluation
  Depends on Track 2 new group (judge-calibration-and-meta-evaluation).

---

## Draft order & batching

Per the design spec, three strictly-serial PRs:

1. **PR 1 — Track 1 (MCP group).** Creates `groups/mcp.ts`, ships 6-10 essays. Must merge before PR 2 (protocols essays link into MCP) and PR 3 (r3 mcp-native-agent-building depends on all MCP essays).
2. **PR 2 — Track 2 (Deep-Dive additions across existing groups + proposed new `evaluating-agents` group).** Appends to `architectures-and-patterns`, `memory-and-context`, `reasoning-and-test-time-compute`, `training-agentic-models`, `multi-agent-systems`, `protocols-and-interop`, `tool-capability-design`. Also creates `groups/evaluating-agents.ts` if design amendment is approved. Must merge before PR 3 (Field Guide chapters link to Deep-Dives).
3. **PR 3 — Track 3 (Field Guide chapters).** Adds 4 chapters to Frontier Part + 1 chapter to Evaluate Part; updates `field-guide/manifest.ts`. Waits on PR 1 & PR 2.

**Field Guide dependency detail:**

- r2 computer-use-in-production → no hard dep (may link to Track 2 `browser-agent-failure-modes` if that ships in the same batch).
- r3 mcp-native-agent-building → depends on Track 1 MCP essays (`mcp-building-servers-in-practice`, `mcp-testing`, `mcp-architecture`).
- r4 the-two-layer-consensus → depends on Track 2 `a2a-v1-deep-dive` and Track 1 MCP essays.
- r5 choosing-thinking-effort → depends on Track 2 `adaptive-thinking-and-effort-budgets`.
- e5 evals-as-ci-gate → depends on Track 2 new-group `judge-calibration-and-meta-evaluation` (only if `evaluating-agents` group is approved).

**If `evaluating-agents` group is REJECTED at Checkpoint 1:**
- Drop: `judge-calibration-and-meta-evaluation`, `benchmark-landscape-2026`, `hal-and-async-agent-eval`.
- Downgrade Track 3 `e5 evals-as-ci-gate` from `should` to dropped OR relocate its link seed and keep as a `should` linking to `e4` and Operations `llm-as-judge-for-agents`.
- Revised must+should total: 32 - 3 (dropped) - 1 (e5 possibly dropped) = 28. Still above the 20 target.

---

## Slug uniqueness

All 42 proposed slugs verified against current `src/content/**/manifest.ts` and `src/content/deep-dives/groups/*.ts` at 2026-07-06 HEAD; no collisions found. Field Guide chapter ids (r2, r3, r4, r5, e5) are unused. Verification performed by grep at slate-draft time.
