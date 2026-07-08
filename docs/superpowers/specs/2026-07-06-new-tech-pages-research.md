# Research Notes — New Tech Pages (2026-07)

> Working notes for the slate at `2026-07-06-new-tech-pages-slate.md`.
> Not shipped to the site; kept in the repo so slate decisions are traceable.

## 1. Coverage inventory

Snapshot as of 2026-07-06. Slug counts and themes; not exhaustive slug listings (those live in the manifests).

### Concepts (33 entries, 4 groups)

- **AI Foundations (8):** `what-is-ai`, `neural-networks-intuition`, `what-is-an-llm`, `training-vs-inference`, `tokens-and-tokenization`, `embeddings`, `transformers-overview`, `temperature-and-sampling`. Beginner mental models. No coverage of reasoning-model mechanics at intro level.
- **Agentic AI (8):** `what-is-an-agent`, `the-agent-loop`, `autonomy-levels`, `agents-vs-chatbots-workflows`, `tools-actions-environments`, `planning-and-termination`, `when-to-use-an-agent`, `agentic-risks-intro`, `prompt-injection-101`. Solid intro to agent shape and risks.
- **Building Blocks (10):** `prompting-basics`, `system-vs-user-prompts`, `few-shot-prompting`, `context-windows`, `tool-calling-explained`, `what-is-rag`, `chunking-and-vector-search`, `structured-outputs`, `guardrails-101`, `evals-101`.
- **AI Ecosystem (9):** `model-families`, `open-vs-closed-models`, `modalities`, `cost-quality-latency`, `reasoning-models`, `agent-frameworks`, `inference-providers`, `reading-benchmarks`, `choosing-a-model`. `reasoning-models` and `model-families` are the two most likely to be stale on mid-2026 material.

### Deep-Dives (53 entries, 8 groups)

- **`architectures-and-patterns` (8, order 10):** ReAct, plan-and-execute, reflection, search strategies, routing, tool error recovery, single-vs-multi-agent. Pattern-focused, mostly 2024-2025 material.
- **`protocols-and-interop` (7, order 20):** interop-problem, tool-calling-standards, `mcp-architecture` (single MCP essay — the gap-of-note), a2a-communication, structured-tool-io, capability-discovery, building-interoperable-agents. This is where the current MCP coverage lives.
- **`memory-and-context` (7, order 30):** context budgeting, short/long-term, memory types, retrieval-augmented memory, context compaction, memory stores, evaluating memory.
- **`retrieval-and-rag` (8, order 40):** advanced RAG, graph RAG, hybrid+reranking, document parsing, query understanding, agentic retrieval, evaluating RAG, choosing-a-vector-database.
- **`training-agentic-models` (6, order 80):** prompt/fine-tune/RL decision, RLHF/RLAIF, RL for tool use, reward design/hacking, SFT/rejection/distillation, process-vs-outcome rewards.
- **`multi-agent-systems` (6, order 90):** when-and-why, topologies, supervisor/worker, debate/ensembles, shared memory/blackboard, failure modes.
- **`reasoning-and-test-time-compute` (6, order 120):** chain-of-thought, self-consistency, tree/graph of thought, verifier-guided search, inference-time scaling, when reasoning helps. Test-time compute focus; may be stale on 2026 reasoning-model architectures.
- **`tool-capability-design` (6, order 130):** design principles, granularity, schemas/contracts, error messages as prompts, docs/discoverability, anti-patterns.

**Key observation:** existing `mcp-architecture` covers the participant model + JSON-RPC transport at a conceptual level. Nothing on building servers, testing them, patterns, anti-patterns, security, or deployment. Whole-group gap.

### Field Guide (6 Parts, 21 chapters)

- **Part 0 — Foundations (f, 4):** LLM Mental Model, Prompts, Tool Use, Async Python.
- **Part I — Build (b, 4):** The Loop, Retrieval, Real Loop, First Eval Suite.
- **Part II — Ship (s, 4):** Observability, Cost & Latency, Safety, Deployment.
- **Part III — Evaluate (e, 4):** Eval-Driven Dev, Three Layers, LLM-as-Judge, Benchmarks & CI.
- **Part IV — Specialize (x, 4):** Code Agents, Computer Use, Research, Multi-Agent.
- **Part V — Frontier (r, 1):** What to Read only. **Very sparse — obvious room for 2-3 additions on 2026 frontier material (reasoning models, long-context, MCP-native building).**

### Playbooks (31 pages)

Vertical-focused (finance, healthcare, legal, coding, IDE, browser, voice, sales, research, data analysis, DevOps, customer support, computer use) + design axes (approval UX, progressive autonomy, disclosure, interrupt/handoff, sandboxing, realtime, latency budget, failure design, trust). Substantial coverage of vertical playbooks.

### Operations (41 pages)

Evals-in-production, cost/economics, governance/regulatory (EU AI Act, NIST), identity/credentials, safety/red-teaming, incident response, feature flags, kill switches, RAG security, prompt injection, benchmarks, tracing/observability, human-in-the-loop, policy enforcement. Notable: strong 2026 operations coverage; `why-agent-eval-is-hard`, `eval-driven-agent-development`, `outcome-vs-trajectory-eval`, `reading-agent-benchmarks` already ship.

### AI Blog (12 posts, 2026-05 through 2026-06)

Tool comparisons: coding agents, orchestration frameworks, code execution sandboxes, evals/observability, vector DBs. Plus open-weights model comparison (Llama 4 / DeepSeek V3 / Qwen3 / Mistral Large 3), trading stack, AFK coding. Recent, brand-fresh.

### Coverage gaps of interest

1. **MCP building/testing** — no coverage beyond `mcp-architecture` conceptual essay. Full-group opportunity.
2. **Frontier reasoning models (2026 API surface)** — `reasoning-models` concept + `inference-time-scaling` deep-dive exist but may not reflect 2026 vendor implementations (Claude extended thinking, o-series specifics, Gemini thinking). Concepts likely need updates; deep-dives may need new essays on cross-vendor reasoning UX / cost / caching.
3. **Long-context (1M+ era)** — `context-windows` concept + `context-budgeting`/`context-compaction` deep-dives exist. May not reflect current Gemini 2M+ / Claude 1M practices, KV cache economics, context caching pricing, long-context evals (RULER, Needle-in-Haystack limits).
4. **Computer use / browser use** — `x2` Field Guide chapter + `computer-use-and-gui-agents` and `browser-agents` playbooks. May not reflect 2026 Claude computer use maturity, tool trajectories, GUI eval frameworks.
5. **Open-weights frontier** — `open-vs-closed-models` concept + one recent blog. No deep-dive on 2026 open-weights capability gap, RL fine-tuning open models, licensing shifts.
6. **A2A / ACP / newer protocols** — `a2a-communication` exists as concept-level. No deep coverage of A2A implementation, message model, or ACP.
7. **Agent evals (2026 benchmarks)** — `reading-agent-benchmarks`, `why-agent-eval-is-hard`, `eval-driven-agent-development` all in operations. No unified deep-dive on the 2026 benchmark landscape (GAIA-2, SWE-bench Verified, TAU-bench, τ-bench, agent-bench, WebArena/VisualWebArena movement).
8. **Frontier Part sparse** — only `what-to-read` (r1). Room for 2-3 frontier-focused chapters.


## 2. MCP landscape

### Current spec state

The current stable MCP specification is **2025-11-25** ([modelcontextprotocol.io](https://modelcontextprotocol.io/specification)). It formalizes a two-transport model — **stdio** and **Streamable HTTP** — and explicitly deprecates the older **HTTP+SSE** transport from 2024-11-05 (backwards-compat shims documented). Streamable HTTP replaces the "dual endpoint" HTTP+SSE with a single `POST/GET` MCP endpoint that can optionally upgrade to SSE for streaming and supports resumability via `Last-Event-ID`, sessions via `MCP-Session-Id` header, and version pinning via `MCP-Protocol-Version` header. **Authorization** is now a full OAuth 2.1 profile with mandatory PKCE, RFC 8707 resource indicators, RFC 9728 Protected Resource Metadata for AS discovery, and support for Client ID Metadata Documents (a new registration mechanism preferred over Dynamic Client Registration). Server-authored features have expanded meaningfully: **elicitation** (both form-mode and the new **URL-mode** for out-of-band OAuth/credential capture without exposing secrets to the client), **sampling with tools** (multi-turn nested tool loops issued from server to client's LLM), **tasks** (experimental long-running work primitive), and **MCP Apps** extension for in-client interactive UI. The 2026 roadmap ([blog.modelcontextprotocol.io](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/)) prioritizes horizontal-scaling of Streamable HTTP, a `.well-known` capability discovery format, task retry/expiry semantics, and enterprise concerns (SSO, audit trails).

The existing `mcp-architecture` essay covers host/client/server + JSON-RPC lifecycle + transport intro; it almost certainly does NOT cover: elicitation, sampling-with-tools, OAuth 2.1 profile details, session/resumability semantics, or the URL-mode credential flow.

### Sub-topics worth an essay

- **mcp-building-servers-in-practice** — Idiomatic server construction beyond hello-world. Tool/resource/prompt registration in FastMCP (Python decorators) and `McpServer` (TS Standard Schema); when to expose something as a tool vs a resource; why "median server has 5 tools" (Bloomberry) is a signal.
- **mcp-tool-design** — Design tools for the agent workflow, not to mirror internal REST APIs; description phrasing materially changes which tool an agent picks; "search-then-fetch" two-step pattern from the Microsoft Learn server; leaving "breadcrumbs" so agents converge on sensible completion.
- **mcp-testing** — In-memory client-server binding (FastMCP `Client(server)`, TS in-memory transports); why subprocess-based tests are flaky; contract/schema tests separate from behavior tests; MCP Inspector for exploratory testing; MCP Interviewer for schema linting. Anti-pattern: "vibe-testing" through an agent loop.
- **mcp-transport-choice** — When to pick stdio vs Streamable HTTP; why stdio is a distribution/isolation choice, not a security control; migration path from deprecated HTTP+SSE; DNS-rebinding and Origin-header requirements for local HTTP servers.
- **mcp-streamable-http-deep-dive** — Session management via `MCP-Session-Id`, resumability via `Last-Event-ID`, how to scale horizontally when sessions are stateful, why "remote servers behave like distributed systems".
- **mcp-auth-oauth21** — OAuth 2.1 profile: PKCE mandatory, RFC 8707 resource parameter, Protected Resource Metadata discovery, Client ID Metadata Documents vs DCR, scope minimization; why 38.7% of surveyed servers ship with **no** authentication.
- **mcp-security-anti-patterns** — Concrete attack catalog: confused-deputy in proxy servers, token passthrough (explicitly forbidden), session hijacking (both prompt-injection variant and impersonation variant), SSRF via OAuth discovery URLs, `javascript:` URL injection, local-server startup-command execution.
- **mcp-tool-poisoning** — Indirect prompt injection via tool descriptions/parameter metadata; CVE-2025-54136; MCPTox benchmark findings; why most clients don't statically validate tool descriptions.
- **mcp-ops-in-production** — Per-tool kill switches (feature flags), source-side redaction in audit logs (log argument *shapes*, not values), tenant isolation via verified token claims (not request bodies), agentic rate-limit sizing.
- **mcp-sampling-and-elicitation** — Two under-covered server-initiated features. Sampling with tools enables agentic loops without the server owning API keys; URL-mode elicitation is the correct mechanism for capturing third-party credentials without token passthrough. Both require careful HITL design.
- **mcp-registry-and-distribution** — Publishing to the MCP Registry, package types (npm/PyPI/OCI), versioning conventions, `.well-known` capability discovery on the 2026 roadmap.
- **mcp-remote-vs-local** — Trade-off analysis: install/config friction vs auth complexity, credential storage location, telemetry visibility, blast radius on compromise; why "the eight-MCP production stack" pattern emerges.

### Open questions the site should address

1. When should a capability be a tool vs a resource vs a prompt? Practitioners routinely mis-classify; Bloomberry data shows most servers over-index on tools and under-use resources.
2. How do I actually test an MCP server that talks to a real LLM? The gap between in-memory unit tests and agent-loop integration tests is where teams either over-invest or ship untested.
3. Do I need OAuth 2.1 for my internal server? Spec makes auth optional; the practical answer for anything touching mutation or PII is yes, but the ceremony is nontrivial.
4. What breaks when I move a stdio server to Streamable HTTP? Session management, CORS, DNS rebinding, credential storage, load-balancer stickiness all change simultaneously.
5. How do I stop tool-description prompt injection from a downstream data source contaminating my server's manifest? Most clients accept descriptions verbatim.
6. How do I keep versioning sane when clients cache tool schemas and the spec expects capability negotiation on every session? Microsoft's 2-5% breakage on parameter rename is the canonical war story.

### Source URLs

- https://modelcontextprotocol.io/specification — official spec index (spec version 2025-11-25)
- https://modelcontextprotocol.io/specification/2025-11-25/basic/transports
- https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization
- https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices
- https://modelcontextprotocol.io/specification/2025-11-25/client/sampling
- https://modelcontextprotocol.io/specification/2025-11-25/client/elicitation
- https://modelcontextprotocol.io/docs/tools/inspector
- https://modelcontextprotocol.io/docs/develop/connect-remote-servers
- https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/
- https://github.com/modelcontextprotocol/typescript-sdk
- https://github.com/modelcontextprotocol/python-sdk
- https://bloomberry.com/blog/we-analyzed-1400-mcp-servers-heres-what-we-learned/ — 1,412-server survey (Feb 2026)
- https://devblogs.microsoft.com/engineering-at-microsoft/how-we-built-the-microsoft-learn-mcp-server/
- https://jlowin.dev/blog/stop-vibe-testing-mcp-servers — FastMCP author on testing anti-patterns
- https://www.digitalapplied.com/blog/mcp-server-security-best-practices-2026-engineering-guide
- https://www.truefoundry.com/blog/blog-mcp-tool-poisoning-gateway-defense — CVE-2025-54136 write-up
- https://arxiv.org/pdf/2508.14925 — MCPTox tool-poisoning benchmark paper

### Notes for slate authoring

- **SDK naming.** TS SDK is `@modelcontextprotocol/sdk` on npm (v2 beta, v1 still supported 6+ months). Python has both reference SDK (`mcp`) and **FastMCP** (`fastmcp`). Bloomberry survey found FastMCP has largest SDK share among surveyed servers — worth calling out because much web tutorial content still shows the older low-level Python API.
- **Testing helper to name-drop.** FastMCP's in-memory `Client(server)` pattern is the canonical answer; TS SDK equivalent is passing an in-memory transport pair to `McpServer` and `Client`. `MCP Interviewer` (Microsoft) lints tool schemas.
- **Terminology drift.** "HTTP+SSE" is deprecated, "Streamable HTTP" is current. Some 2024 blog posts still call the current transport "SSE"; expect reader confusion. Bloomberry says 93% of surveyed servers already migrated.
- **Overlap warnings.** New `mcp-streamable-http-deep-dive` essay should stay operational (sessions, resumability, scaling) and NOT re-explain what SSE is. New `mcp-auth-oauth21` essay should assume the reader knows OAuth basics and focus on the MCP-specific profile choices (resource indicator, PRM, CIMD).
- **Hype to flag.** "Top 10 MCP servers" lists are marketing. Credible signals: Bloomberry survey (n=1,412) and war stories from Microsoft Learn and FastMCP. Also flag: "MCP will replace REST" is not a claim the wiki should validate — 50% of MCP-shipping companies have no public API at all per Bloomberry, which is a different phenomenon.
- **Context7 unavailable** during research — SDK details came from GitHub READMEs via WebFetch. A follow-up Context7 pass would firm up SDK API specifics.
- **Reference doc missed.** NSA/CISA CSI_MCP_SECURITY.pdf (June 2026) exists but fetch 403'd; useful authoritative citation for security essay if a human can retrieve it.

## 3. Frontier capabilities landscape

### Landscape summary

In mid-2026, "frontier" is a moving target defined more by *deployment surface* than raw benchmark score. Anthropic ships Sonnet 5 / Opus 4.7 / Opus 4.8 with a 1M-token context and adaptive-thinking APIs; Google has Gemini 3.1 Pro / 3.5 Pro at a 2M context with Deep Think reasoning mode; OpenAI ships GPT-5.4/5.5 (1M context) alongside o3 / o4-mini reasoning models with an `effort` parameter. Five shifts since existing pages were written: (1) 1M+ contexts are table stakes, but RULER / NoLiMa show effective usable context is ~50-65% of the advertised ceiling; (2) reasoning has moved from a boolean flag to a *budget-controlled adaptive* dial (Anthropic actively deprecating `budget_tokens` in favor of `effort`); (3) computer-use went from research preview to production-grade for narrow flows but still isn't unqualified GA; (4) agent post-training now standardizes on a GRPO/DAPO + RLVR pipeline; (5) the open-weight gap sits at ~4 months on Epoch ECI and is capability-shaped (coding closed, reasoning still 3-8pp behind).

### Sub-topics worth an essay

- **long-context-effective-vs-advertised** — Concept — Why RULER / NoLiMa / MRCR v2 diverge from advertised token ceilings by 30-60 points past 200K, and how to budget accordingly.
- **context-caching-economics** — Deep-Dive (architectures-and-patterns) — Cross-vendor cache pricing (Anthropic 1.25x write / 0.1x read; Gemini uniform 90% off; OpenAI automatic 75-90% off), TTL tradeoffs, and how caching plus batch stacks to ~95% off list.
- **adaptive-thinking-and-effort-budgets** — Deep-Dive (reasoning-and-test-time-compute) — The migration from explicit `budget_tokens` to `effort` (Claude) / `thinking_level` (Gemini) / `reasoning_effort` (OpenAI); when the model overrides your budget.
- **reasoning-mode-cross-vendor-api-surface** — Concept — Comparing the three API idioms and their portability implications for a multi-vendor stack (`thinking.type=adaptive` + `effort` vs `thinking_level` vs `reasoning.effort`).
- **when-to-turn-thinking-off** — Field Guide chapter (Frontier Part) — Cost math for thinking tokens billed at output rate; empirically-driven decisions on latency-sensitive paths.
- **computer-use-in-production** — Field Guide chapter (successor to x2 computer-use, or Frontier Part) — OSWorld 15% (late 2024) → 72.5% (early 2026); WebArena leader Claude Mythos Preview 68.7%; production success >90% on narrow flows; harness design > provider choice.
- **browser-agent-failure-modes** — Deep-Dive (architectures-and-patterns) — The six failure modes not caught by WebArena: DOM drift, screenshot ambiguity, login state, modal interruptions, rate-limit cliffs, irreversibility.
- **gui-agent-benchmarks-2026** — Concept — What each of WebArena / BrowseComp / WebVoyager / WorkArena++ / WebChoreArena / OSWorld actually measures and which one to cite when.
- **rlvr-and-grpo-for-agents** — Deep-Dive (training-agentic-models) — Three-stage recipe SFT → DPO/SimPO → GRPO/DAPO w/ verifiable rewards; entropy collapse, KL drift, and multi-turn algorithms (ARPO, StepPO, Turn-PPO).
- **process-reward-models** — Deep-Dive (training-agentic-models — extends `process-vs-outcome-rewards`) — Step-level PRM vs outcome-only RLVR: dense credit assignment for long-horizon SWE agents (SWE-TRACE, AgentPRM, SPARK).
- **rl-fine-tuning-open-weights** — Deep-Dive (training-agentic-models) — SageMaker RFT + TRL v1.0 + LlamaFactory + VeRL let teams do GRPO on Qwen3 / Llama 4 / DeepSeek V4 with in-house verifiable rewards; the "custom reasoning model" playbook. Goes beyond the shipped open-weights blog.
- **open-vs-closed-capability-delta-mid-2026** — Concept — The Epoch ECI ~4 month gap is a lagging composite; per-capability the deltas are: coding ~0, general ~0, reasoning 3-8pp, agent/tool use larger. Private-benchmark gap is 8-10 months.

### Existing wiki slugs that are stale on this material

- **reasoning-models** (concept) — Written before adaptive thinking / `effort` normalization; misses budget-controlled reasoning API surface. Needs update, not replacement.
- **inference-time-scaling** (deep-dive) — Fine conceptually, but doesn't reflect that vendors now auto-route effort. Should link to a new adaptive-thinking page.
- **chain-of-thought** (deep-dive) — CoT is now a training-time artifact of RLVR/GRPO more than a prompting technique; consider adding a "CoT as a training target" section.
- **verifier-guided-search** (deep-dive) — Concept has evolved into full RLVR / PRM stacks; likely needs a follow-up "process reward models" essay pointing back.
- **context-windows** (concept) — Stale: needs the RULER/NoLiMa "effective vs advertised" story and 1M-2M numbers.
- **open-vs-closed-models** (concept) — Stale on the 2026 gap-measurement (Epoch ECI 4 months) and on the capability-shaped nature of the gap.
- **model-families** (concept) — Needs update on Sonnet 5 / Opus 4.7-4.8, Gemini 3.x, GPT-5.4/5.5, DeepSeek V4.
- **x2 computer-use** (Field Guide) — Needs a successor chapter on production experience (OSWorld 72.5%, WebArena 68.7%, six failure modes, harness > provider).

### Source URLs

- https://platform.claude.com/docs/en/build-with-claude/extended-thinking
- https://platform.claude.com/docs/en/build-with-claude/context-windows
- https://ai.google.dev/gemini-api/docs/thinking
- https://ai.google.dev/gemini-api/docs/long-context
- https://epoch.ai/data-insights/open-closed-eci-gap
- https://awesomeagents.ai/leaderboards/web-agent-benchmarks-leaderboard/
- https://ofox.ai/blog/long-context-llm-benchmarks-200k-tokens-2026/
- https://hub.stabilarity.com/long-context-retrieval-benchmarks-needle-in-haystack-and-beyond/
- https://leanlm.ai/blog/prompt-caching
- https://ofox.ai/blog/prompt-caching-cost-math-anthropic-vs-openai-2026/
- https://www.digitalapplied.com/blog/computer-use-agents-2026-claude-openai-gemini-matrix
- https://futureagi.com/blog/evaluating-browser-use-agents-2026/
- https://deck.co/blog/claude-computer-use-developer-guide
- https://zylos.ai/research/2026-04-10-rl-posttraining-tool-using-agents-grpo-async-rl
- https://www.turingpost.com/p/reasoning-rl-in-2026
- https://arxiv.org/pdf/2510.08049 (PRM survey)
- https://aws.amazon.com/about-aws/whats-new/2026/03/amazon-sagemaker-ai-serverless-additional-models/
- https://www.bentoml.com/blog/the-complete-guide-to-deepseek-models-from-v3-to-r1-and-beyond
- https://www.digitalapplied.com/blog/open-weight-vs-closed-source-ai-models-q2-2026

### Notes for slate authoring

- **Deprecation to flag:** Anthropic's `budget_tokens` is deprecated on Opus 4.6 / Sonnet 4.6, gone on 4.7+. Migration is to `thinking.type=adaptive` + `effort: low|medium|high`. Any existing wiki example using `budget_tokens` is stale.
- **DeepSeek R2 is still vaporware.** Leaks are contradictory (32B dense MIT vs 1.2T MoE). Wiki should not commit to R2 architecture claims; DeepSeek V4 is the actual 2026 shipping family.
- **Computer use is not fully GA anywhere.** Even in mid-2026 "Cowork screen fallback" ships as research preview. Any essay should avoid marketing framing.
- **Pricing hype to flag:** "90% off cached" is real across all three vendors but the write-cost and TTL fine print materially change effective savings. Anthropic's 1.25x write + 5-min TTL vs Gemini's uniform 90% + longer TTL are different economic regimes.
- **Open-weights essay angle (beyond the shipped blog):** The most interesting angle is *RL-fine-tunability* — closed models can't be GRPO'd against your custom verifier, so the practical frontier for teams that need domain-specific reasoning may actually be open. SageMaker's RFT-as-a-service for Qwen3/DeepSeek changes the buy-vs-tune calculus.
- **Benchmark caveat:** WebVoyager is saturating (98%+); citing it as a differentiator would be misleading. WebArena, BrowseComp, and WorkArena++ (where humans still lead LLMs 93.9% vs ~2%) are the honest headline numbers.
- Some sources are lower-authority (aggregator sites); Gemini 3.5 Pro's exact >200K price tier is [unverified] via primary source.

## 4. Agent engineering practice landscape

### Landscape summary

Mid-2026 has crystalized around three shifts. **First, single-number leaderboards have visibly saturated:** SWE-bench Verified has five models within 0.7 pts of each other in the 80% band, with three Anthropic entries breaking away to 93.9-95.5%, so the field has migrated to SWE-bench Pro (top ~59% GPT-5.4-xHigh), Gaia2 (best pass@1 ~42% GPT-5 high), tau2-bench with Telecom+voice, and the Princeton Holistic Agent Leaderboard (HAL) which tracks cost-per-solve + a 5-dim reliability dashboard. **Second, "durable execution" has become table stakes** — Anthropic shipped Claude Managed Agents on 2026-04-08 with server-side append-only session logs; Temporal raised $300M at $5B pitched at agent orchestration; LangGraph + Temporal is the emergent hybrid pattern. **Third, LLM-as-judge has hit its own crisis** — "meta-evaluation collapse" is a named failure mode; production discipline is now judge calibration (85-90% agreement with human gold set), monthly recalibration, and eval-score drift detection on 5-20% of live traffic.

### Sub-topics worth an essay

- **swe-bench-saturation-and-post-verified-benchmarks** — Deep-Dive (new group `benchmarks-2026` or under `architectures-and-patterns`) — why Verified stopped discriminating, what SWE-bench Pro / HAL / Gaia2 / tau2-bench Telecom measure, contamination legal-deterrent strategy.
- **hal-holistic-agent-leaderboard** — Deep-Dive — cost-per-solve, reliability dashboard (consistency/predictability/robustness/safety/self-awareness), 9-benchmark harness.
- **gaia2-and-async-agent-eval** — Deep-Dive — write-action verifiers, temporal constraints, asynchronous environments; why static benchmarks miss real deployment.
- **judge-calibration-and-meta-evaluation** — Deep-Dive (`evaluating-` prefix) or Operations — Prometheus 2, JudgeBench, RubricEval, meta-evaluation collapse; the 85-90% agreement floor; monthly recalibration cadence.
- **eval-score-drift-detection** — Operations — prompt drift vs model drift vs eval-score drift, rolling windows (1h + 24h), CUSUM/Bayesian change-point, eval-gated rollback playbook.
- **evals-as-ci-gate-2026** — Field Guide chapter (Evaluate Part successor) or Operations — tiered code-graders in pre-commit + LLM-judges in preview/prod, PR-blocking rubric regressions, golden dataset flywheel from production traces.
- **memory-write-path-architectures** — Deep-Dive (`memory-and-context`) — why RAG-only is dead for stateful agents; write/retrieval/update policies; episodic vs semantic vs procedural vs relational memory taxonomy.
- **memory-poisoning-defenses** — Deep-Dive (`memory-and-context`) — AgentPoison (80% ASR at <0.1% poison), MemoryGraft, SpAIware, Morris-II worm; lifecycle defenses at ingestion/storage/retrieval/monitoring.
- **learned-retrievers-and-memrl** — Deep-Dive (`memory-and-context`) — MemRL treats store/retrieve/update/summarize/discard as tools optimized via RL; rank-by-learned-utility rather than semantic similarity alone.
- **prompt-injection-layered-defense-2026** — Operations or new group — 5- to 12-layer stacks; OpenAI's April 2026 defense guide; Pillar Security CVSS-10 Gemini CLI supply-chain incident (May 2026); Copilot CVE-2025-53773; why single-model defenses fail.
- **policy-as-code-for-agents** — Operations — OPA/Rego/Cedar applied to agent tool calls, signed decision receipts, pre-action gating, structured refusal reasons vs prose refusals.
- **durable-execution-langgraph-plus-temporal** — Deep-Dive (`architectures-and-patterns`) or Field Guide — checkpointer-between-nodes vs Temporal-within-node distinction, replay semantics, why LangGraph loops don't survive at 10k items.
- **claude-managed-agents-architecture** — Deep-Dive — durable session as append-only event log, stateless harness, wake(sessionId) recovery.
- **sub-agent-patterns-comparison** — Deep-Dive (`multi-agent-systems`) — LangGraph supervisor/hierarchical/collaborative vs OpenAI Agents SDK handoffs-vs-agents-as-tools vs deepagents subagents.
- **dspy-3-gepa-for-agent-optimization** — Deep-Dive (`training-agentic-models` or `architectures-and-patterns`) — GEPA (ICLR 2026 oral) outperforming MIPROv2 by 13% and RL/GRPO by 20% with 35x fewer rollouts.

### Existing wiki slugs that are stale on this material

- **reading-agent-benchmarks** (operations) — 2026 saturation reality + SWE-bench Pro / HAL / Gaia2 / tau2-bench Telecom are the new headlines; needs contamination discussion.
- **llm-as-judge-for-agents** (operations) — needs meta-evaluation collapse, judge-calibration cadence, JudgeBench/RubricEval, 85-90% human-agreement floor.
- **eval-driven-agent-development** (operations) — needs eval-score drift, tiered CI, production-trace flywheel.
- **guardrails** and **policy-enforcement** (operations) — policy-as-code (OPA/Rego/Cedar) and signed decision receipts are new; structured refusal with why-trails; layered injection stacks.
- **agent-frameworks** (concept) — needs Claude Managed Agents (April 2026), OpenAI Agents SDK April 2026 overhaul, DSPy 3.0 with GEPA, Temporal repositioning.
- **evaluating-memory** (deep-dive) — write-path architecture, MemRL, poisoning threat model missing.
- **tracing-and-observability** (operations) — event-log tracing (Claude Managed session logs) changes what "trace" means.

### Source URLs

- https://leaderboard.steel.dev/leaderboards/swe-bench-verified/
- https://labs.scale.com/leaderboard/swe_bench_pro_public
- https://hal.cs.princeton.edu/
- https://arxiv.org/abs/2510.11977
- https://iclr.cc/virtual/2026/poster/10011091
- https://github.com/sierra-research/tau2-bench
- https://www.langchain.com/blog/agent-evaluation-readiness-checklist
- https://futureagi.com/blog/what-is-llm-drift-2026/
- https://deepeval.com/blog/llm-as-a-judge
- https://openreview.net/forum?id=IF0L7HSs3K
- https://beyondscale.tech/blog/ai-agent-memory-poisoning-defense-guide
- https://www.getmaxim.ai/articles/prompt-injection-defense-for-production-ai-agents-a-complete-2026-guide/
- https://www.kyndryl.com/us/en/insights/articles/2026/03/policy-as-code-agentic-ai
- https://cordum.io/blog/temporal-vs-langgraph
- https://openai.github.io/openai-agents-python/multi_agent/
- https://www.anthropic.com/engineering/managed-agents
- https://futureagi.com/blog/dspy-optimizers-explained/
- https://www.langchain.com/blog/on-agent-frameworks-and-agent-observability

### Notes for slate authoring

- Recent LangSmith/Braintrust/Helicone/Phoenix blogs cover *tool selection* — new eval essays should focus on *methodology* (judge calibration, drift math, meta-evaluation collapse, production-trace flywheel). Don't re-litigate tool choice.
- Recent LangGraph/CrewAI/Claude Managed/OpenAI Agents SDK blogs cover *framework overviews* — new orchestration essays should focus on *durable execution semantics* and the LangGraph-plus-Temporal hybrid pattern ("reasoning graph + durable runtime").
- Recent pgvector/Pinecone/Weaviate/Qdrant blogs cover *vector stores* — new memory essays should focus on *write-path governance* and *poisoning threat model*.
- Pattern names crystalized in 2026: **eval-score drift**, **meta-evaluation collapse**, **write-path memory**, **agents-as-tools vs handoffs**, **durable session**, **decision receipt**, **why-trail** (structured refusal), **write-action verifier** (Gaia2).
- Benchmark saturation is a headline story — SWE-bench Verified is now "an audit signal, not a ranking" — worth its own skeptical essay. Anthropic-sweep pattern may reflect benchmark familiarity rather than pure capability [unverified interpretation].
- Hype flag: vendor "12-layer prompt injection framework" content is marketing more than engineering. OpenAI's April 2026 guide is a better citation than any single vendor's framework.
- [unverified] numbers to double-check: Claude Managed Agents "60% p50 / 90% p95 TTFT drop" and Temporal "380% YoY revenue growth" come from vendor blog claims.

## 5. Protocols & standards landscape (excl. MCP)

### Landscape summary

Between mid-2025 and mid-2026, the "protocol war" collapsed into a two-layer consensus: **MCP for agent-to-tool, A2A for agent-to-agent**. A2A hit v1.0 on April 9, 2026, one year after Google announced it, with 150+ member orgs, five official SDKs (Python, JS, Java, Go, .NET), 22k+ GitHub stars, and Azure/Bedrock/Google Cloud integrations. **ACP (IBM/AGNTCY) is effectively gone**: contributed to the Linux Foundation in July 2025 and folded into A2A. A Q3 2026 MCP/A2A joint interop spec is publicly on the roadmap. On tool calling, all three big vendors converged on parallel calls + strict JSON-Schema-constrained decoding, but with meaningfully different subsets and ergonomics; Anthropic finally shipped native **Structured Outputs GA** in late 2025/early 2026. New adjacent standards worth watching: **AP2** (Agent Payments Protocol, W3C-VC-based mandates), **Signed Agent Cards** (ECDSA P-256, unmerged proposal), **agents.json** (OpenAPI extension), and **AGENTS.md** (adopted by 20k+ repos).

### Sub-topics worth an essay

- **a2a-v1-deep-dive** — Deep-Dive (`protocols-and-interop`) — A2A v1.0 message model, task lifecycle (nine states incl. `INPUT_REQUIRED`, `AUTH_REQUIRED`, `REJECTED`), Message vs Artifact split, streaming per transport, `A2A-Version` header versioning.
- **agent-cards-and-discovery** — Deep-Dive (`protocols-and-interop`) — `/.well-known/agent.json`, capability declaration, extended cards, signing, caching. Contrast with MCP registry-based discovery.
- **signed-agent-cards-and-identity** — Deep-Dive (`protocols-and-interop`) — ECDSA P-256 attestation proposal (A2A #1672, still open), why unsigned cards are a trust hole, comparison with Visa Trusted Agent Protocol and W3C VCs.
- **acp-and-what-happened** — Deep-Dive (`protocols-and-interop`) — Short post-mortem: ACP existed, was REST-native, merged into A2A in Aug 2025.
- **tool-calling-vendor-matrix-2026** — Deep-Dive (`tool-capability-design`) — Side-by-side of OpenAI (Chat Completions vs Responses API, `parallel_tool_calls`, custom tools w/ Lark/regex grammar), Anthropic (Programmatic Tool Calling, Tool Search Tool, Tool Use Examples), Gemini (OpenAPI subset, `tool_choice: any`, multimodal function responses). Skeptical framing: schemas differ enough that "portable" tool defs are still fiction.
- **structured-outputs-vs-tool-calls** — Deep-Dive (`tool-capability-design`) — When to use each, why they're mechanically similar (both constrained decoding under the hood), Anthropic's late arrival to native structured outputs (GA in 2026 with `output_config.format`), the 20-strict-tools / 24-optional-params cap.
- **json-schema-subsets-per-vendor** — Deep-Dive (`tool-capability-design`) — What's actually enforceable: no `minLength`/`maxLength`/`minimum`/`maximum` on Anthropic; OpenAPI subset only on Gemini; strict mode requires `additionalProperties:false` + all fields required on OpenAI.
- **advanced-tool-orchestration-patterns** — Deep-Dive (`tool-capability-design`) — Anthropic's Tool Search Tool (85% token reduction), Programmatic Tool Calling (Python sandbox executes tools, only final results enter context), Tool Use Examples. New primitives that changed the design space in late 2025.
- **ap2-and-agent-commerce** — Deep-Dive (`protocols-and-interop`) — AP2 mandate model (Intent/Cart/Payment as W3C VCs), why it sits above A2A/MCP not inside them, stablecoin rails. Skeptical angle: still early, few real merchant flows.
- **the-two-layer-consensus** — Field Guide chapter (Frontier Part) — MCP-below, A2A-above architecture, when it breaks down (single-vendor stacks, edge/local scenarios that used to be ACP's pitch), and where the Q3 2026 joint spec is supposed to help.
- **agents-json-and-openapi-for-agents** — Deep-Dive (`protocols-and-interop`) — agents.json v0.1 spec on top of OpenAPI, AGENTS.md conventions, why "just point the agent at your OpenAPI" doesn't fully work.
- **streaming-tool-calls-in-practice** — Deep-Dive (`tool-capability-design`) — Vendor-by-vendor: how to accumulate deltas, gotchas (OpenAI GPT-4.1-nano duplicate tool calls, Gemini aggregatable `arguments`, Anthropic streaming with parallel calls).

### Existing wiki slugs that are stale on this material

- **a2a-communication** (deep-dive) — Written before v1.0. Missing: nine task states (not four), Message vs Artifact distinction, `A2A-Version` header, breaking changes (removal of `kind` discriminator, extended card relocation), Linux Foundation governance, 150-org adoption.
- **tool-calling-standards** (deep-dive) — Likely predates Anthropic's native structured outputs GA, Programmatic Tool Calling, Tool Search Tool, and OpenAI's Responses API.
- **structured-tool-io** (deep-dive) — Needs 2026 vendor JSON Schema subset matrix; Anthropic no longer needs schema-in-tool-call workarounds.
- **capability-discovery** (deep-dive) — Needs Agent Card v1.0 detail plus `/.well-known/agent.json` convention. Should reference the unmerged Signed Agent Cards proposal.
- **interop-problem** (deep-dive) — Should reference the ACP→A2A merger as evidence that the "10 competing protocols" framing collapsed faster than expected.
- **structured-outputs** (concept) — Needs the constrained-decoding-under-the-hood framing and vendor comparison; XGrammar becoming the default OSS backend (vLLM/SGLang/TensorRT-LLM) is worth a line.

### Overlap with MCP research (to avoid double-coverage)

- **Two-layer consensus (MCP + A2A)** — Owned by protocols surface. Cross-link from MCP. Fundamentally an interop story, not an MCP-internals story.
- **MCP/A2A Q3 2026 joint spec** — Owned by protocols. It's a bridge, not an MCP feature.
- **Remote MCP servers from inside Gemini/Bedrock** — Owned by MCP essay. It's about MCP client evolution.
- **Discovery (`/.well-known/agent.json` vs MCP registry)** — Owned by protocols; compare/contrast is the whole point.
- **Agent identity/signing** — Owned by protocols; MCP essay can reference. Signed Agent Cards, AP2 mandates, and Visa/Mastercard schemes live at the agent layer, not tool layer.
- **OAuth 2.1 / resource indicators** — Both MCP and A2A converged here; MCP essay owns the auth deep-dive since MCP drove the pattern, protocols essay links.

### Source URLs

- https://a2a-protocol.org/latest/specification/
- https://github.com/a2aproject/A2A/blob/main/docs/specification.md
- https://github.com/a2aproject/A2A/issues/1672
- https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year
- https://agentcommunicationprotocol.dev/introduction/welcome
- https://zuplo.com/blog/agent-protocol-stack-mcp-a2a-acp-2026
- https://zylos.ai/research/2026-03-26-agent-interoperability-protocols-mcp-a2a-acp-convergence/
- https://developers.openai.com/api/docs/guides/function-calling
- https://platform.claude.com/docs/en/build-with-claude/structured-outputs
- https://www.anthropic.com/engineering/advanced-tool-use
- https://ai.google.dev/gemini-api/docs/function-calling
- https://ap2-protocol.org/
- https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol
- https://github.com/wild-card-ai/agents-json

### Notes for slate authoring

- **Adoption numbers are marketing-fresh.** LF's "150+ orgs" and "22k stars" are press-release framing. Attribute to LF; wiki's skeptical voice should note "supporting org" != "shipping A2A in production."
- **ACP burial.** Every "ACP vs A2A" article older than ~Aug 2025 is stale. Wiki should treat ACP as a footnote, not a category.
- **[unverified] Q3 2026 joint MCP/A2A spec** — found in one aggregator source, not official LF/A2A/MCP repos. Directional, not confirmed.
- **[unverified] specific Claude preview model names** (Fable 5, Mythos 5, Opus 4.8) from `platform.claude.com` may reflect preview listing, not GA lineup; wiki should generalize to "Claude 4.5+ family" unless confirmed.
- **Vendor asymmetry to flag.** Gemini uses "OpenAPI subset," OpenAI uses "JSON Schema strict mode with `additionalProperties:false`," Anthropic uses its own subset that omits numeric/length constraints. "JSON Schema support" is not one thing.
- **Programmatic Tool Calling** (Anthropic, Nov 2025) is genuinely different from parallel tool calls — Claude writes Python that calls tools in a sandbox and only final outputs return to context.
- **AP2** is real (60+ partners at launch) but skeptical framing warranted: it's a policy/mandate protocol, not a payment rail; "stablecoin rail" pitch may be overselling.
- **Signed Agent Cards proposal is unmerged.** Wiki should say "proposed" not "specified." Trust is currently a gap in A2A, not a feature.

## 6. Gap synthesis

Cross-referenced §§2-5 landscape sub-topics against §1 inventory. All 51 raw candidates classified below; then filtered and assigned to a target surface per the design spec's three-track structure.

### Classification (candidate | status | target surface)

**From §2 MCP landscape (all 12 candidates are "missing" — no existing coverage beyond `mcp-architecture`):**

| Candidate | Status | Target |
|---|---|---|
| mcp-building-servers-in-practice | missing | Track 1 (new mcp group) |
| mcp-tool-design | missing | Track 1 |
| mcp-testing | missing | Track 1 |
| mcp-transport-choice | missing (partial overlap w/ mcp-architecture) | Track 1 — DROP, subsumed by streamable-http + building |
| mcp-streamable-http-deep-dive | missing | Track 1 |
| mcp-auth-oauth21 | missing | Track 1 |
| mcp-security-anti-patterns | missing | Track 1 |
| mcp-tool-poisoning | missing | Track 1 |
| mcp-ops-in-production | missing | Track 1 |
| mcp-sampling-and-elicitation | missing | Track 1 |
| mcp-registry-and-distribution | missing | Track 1 |
| mcp-remote-vs-local | missing | Track 1 — DROP, covered by transport + ops |

**From §3 Frontier capabilities:**

| Candidate | Status | Target |
|---|---|---|
| long-context-effective-vs-advertised | stale (context-windows) | Track 2 (memory-and-context) — reframed as deep-dive |
| context-caching-economics | missing | Track 2 (architectures-and-patterns) |
| adaptive-thinking-and-effort-budgets | missing | Track 2 (reasoning-and-test-time-compute) |
| reasoning-mode-cross-vendor-api-surface | missing (concept-shaped) | SKIP — concepts out of scope |
| when-to-turn-thinking-off | missing | Track 3 (Field Guide, Frontier Part) |
| computer-use-in-production | stale (x2 chapter) | Track 3 (Field Guide, Frontier Part) |
| browser-agent-failure-modes | missing | Track 2 (architectures-and-patterns) |
| gui-agent-benchmarks-2026 | missing (concept-shaped) | Track 2 (new group `evaluating-agents`) |
| rlvr-and-grpo-for-agents | missing | Track 2 (training-agentic-models) |
| process-reward-models | stale (process-vs-outcome-rewards) | Track 2 (training-agentic-models) |
| rl-fine-tuning-open-weights | missing | Track 2 (training-agentic-models) |
| open-vs-closed-capability-delta-mid-2026 | stale (open-vs-closed-models) | SKIP — concept-shaped |

**From §4 Agent engineering:**

| Candidate | Status | Target |
|---|---|---|
| swe-bench-saturation-and-post-verified-benchmarks | missing | Track 2 (new group `evaluating-agents`) |
| hal-holistic-agent-leaderboard | missing | Track 2 (new group `evaluating-agents`) |
| gaia2-and-async-agent-eval | missing | Track 2 (new group `evaluating-agents`) — merge with above |
| judge-calibration-and-meta-evaluation | missing | Track 2 (new group `evaluating-agents`) |
| eval-score-drift-detection | missing (Operations-shaped) | SKIP — Operations out of scope |
| evals-as-ci-gate-2026 | missing | Track 3 (Field Guide, Evaluate Part) |
| memory-write-path-architectures | missing | Track 2 (memory-and-context) |
| memory-poisoning-defenses | missing | Track 2 (memory-and-context) |
| learned-retrievers-and-memrl | missing | Track 2 (memory-and-context) |
| prompt-injection-layered-defense-2026 | missing (Operations-shaped) | SKIP — Operations out of scope |
| policy-as-code-for-agents | missing (Operations-shaped) | SKIP — Operations out of scope |
| durable-execution-langgraph-plus-temporal | missing | Track 2 (architectures-and-patterns) |
| claude-managed-agents-architecture | missing | Track 2 (architectures-and-patterns) |
| sub-agent-patterns-comparison | missing | Track 2 (multi-agent-systems) |
| dspy-3-gepa-for-agent-optimization | missing | Track 2 (training-agentic-models) |

**From §5 Protocols & standards:**

| Candidate | Status | Target |
|---|---|---|
| a2a-v1-deep-dive | stale (a2a-communication) | Track 2 (protocols-and-interop) |
| agent-cards-and-discovery | stale (capability-discovery) | Track 2 (protocols-and-interop) |
| signed-agent-cards-and-identity | missing | Track 2 (protocols-and-interop) |
| acp-and-what-happened | missing (post-mortem) | Track 2 (protocols-and-interop) |
| tool-calling-vendor-matrix-2026 | stale (tool-calling-standards) | Track 2 (tool-capability-design) |
| structured-outputs-vs-tool-calls | missing | Track 2 (tool-capability-design) |
| json-schema-subsets-per-vendor | missing | Track 2 (tool-capability-design) |
| advanced-tool-orchestration-patterns | missing | Track 2 (tool-capability-design) |
| ap2-and-agent-commerce | missing | Track 2 (protocols-and-interop) |
| the-two-layer-consensus | missing | Track 3 (Field Guide, Frontier Part) |
| agents-json-and-openapi-for-agents | missing | Track 2 (protocols-and-interop) |
| streaming-tool-calls-in-practice | missing | Track 2 (tool-capability-design) |

### Design amendment flag

**A second new Deep-Dive group is proposed: `evaluating-agents`.** The original design spec plans one new group (MCP). The evals candidates from §4 (judge-calibration, benchmark landscape, HAL/Gaia2) don't fit any existing Deep-Dive group cleanly — architectures-and-patterns is patterns; memory-and-context is memory; the closest fit is training-agentic-models but that's about training, not evaluating. Adding a small new group (~3 essays) is the cleanest home. Flagged in the slate for user decision at Checkpoint 1.

### Filtered candidate list per track

**Track 1 — MCP Deep-Dive group (target 6-10 entries):**

- must (6): mcp-building-servers-in-practice, mcp-tool-design, mcp-testing, mcp-security-anti-patterns, mcp-streamable-http-deep-dive, mcp-auth-oauth21
- should (2): mcp-sampling-and-elicitation, mcp-tool-poisoning
- stretch (2): mcp-ops-in-production, mcp-registry-and-distribution

Total: 10 (10 within 6-10 range).

**Track 2 — Deep-Dive additions (target 8-12+ entries, distributed):**

`architectures-and-patterns`:
- must (1): durable-execution-langgraph-plus-temporal
- should (2): context-caching-economics, browser-agent-failure-modes
- stretch (1): claude-managed-agents-architecture

`memory-and-context`:
- must (1): memory-write-path-architectures
- should (2): memory-poisoning-defenses, long-context-effective-vs-advertised
- stretch (1): learned-retrievers-and-memrl

`reasoning-and-test-time-compute`:
- must (1): adaptive-thinking-and-effort-budgets

`training-agentic-models`:
- must (1): rlvr-and-grpo-for-agents
- should (2): rl-fine-tuning-open-weights, process-reward-models
- stretch (1): dspy-3-gepa-for-agent-optimization

`multi-agent-systems`:
- should (1): sub-agent-patterns-comparison

`protocols-and-interop`:
- must (1): a2a-v1-deep-dive
- should (1): agent-cards-and-discovery
- stretch (3): acp-and-what-happened, ap2-and-agent-commerce, agents-json-and-openapi-for-agents

`tool-capability-design`:
- must (2): tool-calling-vendor-matrix-2026, advanced-tool-orchestration-patterns
- should (2): structured-outputs-vs-tool-calls, json-schema-subsets-per-vendor
- stretch (1): streaming-tool-calls-in-practice

`evaluating-agents` (NEW group — design amendment):
- must (1): judge-calibration-and-meta-evaluation
- should (1): benchmark-landscape-2026 (composite: swe-bench-saturation + post-Verified benchmarks)
- stretch (1): hal-and-async-agent-eval (composite: HAL + Gaia2)

**Track 2 totals:**
- must: 8
- should: 11
- stretch: 8
- Track 2 grand total: 27 (must+should = 19)

**Track 3 — Field Guide chapters (target 2-4 chapters):**

Frontier Part (currently only r1 What to Read — sparse):
- must (1): computer-use-in-production (r2)
- must (1): mcp-native-agent-building (r3) — ties MCP essays into a Field Guide narrative
- should (1): the-two-layer-consensus (r4)
- should (1): choosing-thinking-effort (r5)

Evaluate Part:
- should (1): evals-as-ci-gate (e5)

**Track 3 totals:**
- must: 2
- should: 3
- Track 3 grand total: 5

### Grand totals (all three tracks)

- must: 6 + 8 + 2 = **16**
- should: 2 + 11 + 3 = **16**
- stretch: 2 + 8 + 0 = **10**
- **must + should combined: 32 pages (comfortably ≥ 20 target)**
- **Total including stretch: 42 pages**

### Field Guide dependency notes

Field Guide chapters depend on Track 2 entries being merged first:
- **r3 mcp-native-agent-building** depends on Track 1 (MCP group) merged.
- **r4 the-two-layer-consensus** depends on `protocols-and-interop` a2a-v1-deep-dive and Track 1 MCP essays.
- **r5 choosing-thinking-effort** depends on `reasoning-and-test-time-compute` adaptive-thinking essay.
- **e5 evals-as-ci-gate** depends on new group `evaluating-agents` judge-calibration essay.
- **r2 computer-use-in-production** — no hard dependency (self-contained; may link to browser-agent-failure-modes as Related).
