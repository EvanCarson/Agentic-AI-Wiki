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

(populated by Task 3)

## 3. Frontier capabilities landscape

(populated by Task 4)

## 4. Agent engineering practice landscape

(populated by Task 5)

## 5. Protocols & standards landscape

(populated by Task 6)

## 6. Gap synthesis

(populated by Task 7)
