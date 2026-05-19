// Ordered structure for the Deep-Dives advanced essays.
// `page` is the fragment file basename; `slug` is the public URL segment.
// Bilingual data (title/summary/group) lives here, NOT in the HTML fragments.
//
// Content agents (C5–C8) ONLY add HTML fragment pairs under
// src/content/deep-dives/{en,zh}/<page>.html — they NEVER edit this file.
// Phase 3 (I1) registers entries here. Keep ENTRIES empty until then.
import type { Locale, Localized } from '../../i18n/index';

export interface Entry {
  /** Fragment file basename, e.g. `agent-architectures` → src/content/deep-dives/{en,zh}/agent-architectures.html */
  page: string;
  /** Public URL segment, lowercase-kebab. Usually equal to `page`. */
  slug: string;
  /** Localized entry title. */
  title: Localized;
  /** Localized one-line summary shown on the index. */
  summary: Localized;
  /** Optional localized group/section label for grouping on the index. */
  group?: Localized;
}

const L = (en: string, zh: string): Localized => ({ en, zh });
// `L` is intentionally exported so manifest entries (added in Phase 3) can use it.
export { L };

// Phase 3 (I1) registered content-agent entries below, in agent order
// (C5, C6, C7, C8), preserving each agent's internal order. Groups are kept
// as each agent provided them — the index buckets by these strings.
export const entries: Entry[] = [
  // --- C5 — Agent Architectures & Design Patterns (8) ---
  { page: 'pattern-landscape', slug: 'pattern-landscape', title: L('The Agent Design-Pattern Landscape','智能体设计模式全景'), summary: L('Why architecture is a reliability lever, and the five axes that compare every pattern.','为什么架构是可靠性杠杆，以及比较每种模式的五个坐标轴。'), group: L('Architectures & Patterns','架构与模式') },
  { page: 'react-pattern', slug: 'react-pattern', title: L('ReAct — Interleaving Reasoning and Acting','ReAct——交错进行推理与行动'), summary: L('The workhorse tool loop: control flow, why interleaving wins, and the failure modes at scale.','主力工具循环：控制流、交错为何取胜，以及规模化时的失败模式。'), group: L('Architectures & Patterns','架构与模式') },
  { page: 'plan-and-execute', slug: 'plan-and-execute', title: L('Plan-and-Execute — Decompose, Then Run','Plan-and-Execute——先分解，再运行'), summary: L('Planner/executor split, replanning strategies, and when the up-front plan becomes a liability.','规划器/执行器拆分、重规划策略，以及预先计划何时成为负担。'), group: L('Architectures & Patterns','架构与模式') },
  { page: 'reflection-pattern', slug: 'reflection-pattern', title: L('Reflection — Verify, Critique, Revise','反思——验证、批评、修订'), summary: L('Self-refine vs Reflexion, why the external signal is everything, and when self-critique hurts.','self-refine 与 Reflexion，为何外部信号是关键，以及自我批评何时有害。'), group: L('Architectures & Patterns','架构与模式') },
  { page: 'agent-search-strategies', slug: 'agent-search-strategies', title: L('Search Strategies — Branching Over Trajectories','搜索策略——在轨迹上分支'), summary: L('Best-of-N, self-consistency, tree/graph-of-thought: the cost regime and the scorer dependency.','Best-of-N、自一致性、思维树/图：成本区间与对打分器的依赖。'), group: L('Architectures & Patterns','架构与模式') },
  { page: 'router-pattern', slug: 'router-pattern', title: L('Routing & Dispatch — Selection, Fan-out, Parallelism','路由与分派——选择、扇出、并行'), summary: L('Classifier vs tool-call routing, parallel fan-out, and the failure modes of the routing layer.','分类器与工具调用路由、并行扇出，以及路由层的失败模式。'), group: L('Architectures & Patterns','架构与模式') },
  { page: 'tool-error-recovery', slug: 'tool-error-recovery', title: L('Tool-Use Loops & Error Recovery','工具使用循环与错误恢复'), summary: L('The failure taxonomy, layered recovery, error-messages-as-prompts, and side-effect durability.','失败分类法、分层恢复、错误消息即提示词，以及副作用持久性。'), group: L('Architectures & Patterns','架构与模式') },
  { page: 'single-vs-multi-agent', slug: 'single-vs-multi-agent', title: L('Single-Agent vs. Multi-Agent Orchestration','单智能体 vs. 多智能体编排'), summary: L('Real reasons to split, supervisor/worker vs hand-off, the coordination tax, and a decision framework.','拆分的真实理由、监督者/工作者与交接、协调税，以及一个决策框架。'), group: L('Architectures & Patterns','架构与模式') },

  // --- C6 — Agent Protocols & Interop (7) ---
  { page: 'interop-problem', slug: 'interop-problem', title: L('Why Interop Matters: The M×N Problem','互操作为何重要：M×N 问题'), summary: L('How connecting M agents to N systems by hand explodes, and why a protocol layer is the structural fix.','手工把 M 个智能体连接到 N 个系统为何会爆炸，以及为什么协议层是结构性解法。'), group: L('Protocols & Interop','协议与互操作') },
  { page: 'tool-calling-standards', slug: 'tool-calling-standards', title: L('Tool Calling Standards: JSON Schema','工具调用标准：JSON Schema'), summary: L('The universal declare/select/execute/return contract, the portable JSON Schema core, and where providers differ.','通用的声明/选择/执行/返回契约、可移植的 JSON Schema 核心，以及厂商差异所在。'), group: L('Protocols & Interop','协议与互操作') },
  { page: 'mcp-architecture', slug: 'mcp-architecture', title: L('MCP: Hosts, Clients, Servers','MCP：宿主、客户端、服务器'), summary: L('The Model Context Protocol participant model, resources/tools/prompts, JSON-RPC lifecycle, and transports.','模型上下文协议的参与者模型、资源/工具/提示、JSON-RPC 生命周期与传输方式。'), group: L('Protocols & Interop','协议与互操作') },
  { page: 'a2a-communication', slug: 'a2a-communication', title: L('Agent-to-Agent Communication','智能体间通信'), summary: L('Delegating to opaque peer agents: Agent Cards, tasks, messages, artifacts, and long-running work.','向不透明的对端智能体委派：智能体卡片、任务、消息、产物与长时间运行的工作。'), group: L('Protocols & Interop','协议与互操作') },
  { page: 'structured-tool-io', slug: 'structured-tool-io', title: L('Structured Tool I/O & Validation','结构化工具 I/O 与校验'), summary: L('Input and output as two trust boundaries: structural-then-semantic validation, and why typed output is still untrusted.','输入与输出作为两道信任边界：先结构后语义的校验，以及为何类型化输出仍不可信。'), group: L('Protocols & Interop','协议与互操作') },
  { page: 'capability-discovery', slug: 'capability-discovery', title: L('Capability Discovery & Negotiation','能力发现与协商'), summary: L('Runtime discovery, feature-test version negotiation, and why discovery describes ability not permission.','运行时发现、特性探测式版本协商，以及为何发现描述的是能力而非许可。'), group: L('Protocols & Interop','协议与互操作') },
  { page: 'building-interoperable-agents', slug: 'building-interoperable-agents', title: L('Building an Interoperable Agent','构建可互操作的智能体'), summary: L('Comparing tool calling, MCP, and A2A; a decision rule and one normalised registry architecture.','比较工具调用、MCP 与 A2A；一条决策规则与一个归一化注册表架构。'), group: L('Protocols & Interop','协议与互操作') },

  // --- C7 — Memory & Context Engineering (7) ---
  { page: 'context-budgeting', slug: 'context-budgeting', title: L('Engineering the Context Window','设计上下文窗口'), summary: L('Treat the finite window as a budgeted resource: per-category token budgets, position-aware ordering, and utilization metrics.','把有限窗口当作有预算的资源：分类令牌预算、位置感知排序与利用率度量。'), group: L('Memory & Context','记忆与上下文') },
  { page: 'short-vs-long-term-memory', slug: 'short-vs-long-term-memory', title: L('Short-Term vs Long-Term Memory','短期与长期记忆'), summary: L('The in-prompt working set vs the external store: what earns a slot, when to write, when to recall, and the promotion/demotion cycle.','提示内工作集与外部存储：什么配占位、何时写、何时回忆，以及提升／降级循环。'), group: L('Memory & Context','记忆与上下文') },
  { page: 'memory-types', slug: 'memory-types', title: L('Memory Types: Episodic, Semantic, Procedural','记忆类型：情景、语义、程序性'), summary: L('Three durable memory kinds plus the scratchpad, each written and retrieved differently; reflection promotes episodes to semantics.','三种持久记忆加草稿区，各自写入与检索方式不同；反思把情景提升为语义。'), group: L('Memory & Context','记忆与上下文') },
  { page: 'retrieval-augmented-memory', slug: 'retrieval-augmented-memory', title: L('Retrieval-Augmented Memory','检索增强记忆'), summary: L('Recall as retrieval: state-derived cues, relevance+recency+salience scoring, threshold-before-truncate, and provenance-tagged rendering.','回忆即检索：状态派生线索，相关性＋时近性＋显著性评分，先阈值再截断，以及带来源标注的渲染。'), group: L('Memory & Context','记忆与上下文') },
  { page: 'context-compaction', slug: 'context-compaction', title: L('Context Compaction & Hierarchical Memory','上下文压缩与分层记忆'), summary: L('The compaction ladder, task-structured summarization, MemGPT-style tiering, pressure-triggered hysteresis, and verifying lossy compaction.','压缩阶梯、任务结构化摘要、MemGPT 式分级、压力触发迟滞，以及验证有损压缩。'), group: L('Memory & Context','记忆与上下文') },
  { page: 'memory-stores', slug: 'memory-stores', title: L('Memory Stores: Vector, KV, Graph & Eviction','记忆存储：向量、键值、图与驱逐'), summary: L('Match backend to memory kind, a unified interface, why unbounded stores rot retrieval, and decay/eviction policies.','把后端匹配到记忆类型、统一接口、无界存储为何腐蚀检索，以及衰减／驱逐策略。'), group: L('Memory & Context','记忆与上下文') },
  { page: 'evaluating-memory', slug: 'evaluating-memory', title: L('Evaluating Memory Quality','评估记忆质量'), summary: L('Memory-specific metrics (recall@k, staleness, constraint survival, write precision) and the pitfalls they catch: poisoning, staleness, drift, compaction amnesia.','记忆特有指标（recall@k、过期率、约束存活、写入精度）及其捕获的陷阱：毒化、过期、漂移、压缩失忆。'), group: L('Memory & Context','记忆与上下文') },

  // --- Retrieval & RAG (2) ---
  { page: 'advanced-rag-architectures', slug: 'advanced-rag-architectures', title: L('Advanced RAG Architectures','进阶 RAG 架构'), summary: L('The naive→modular→agentic RAG spectrum and the levers that matter — CRAG, Self-RAG, query transformation, fusion, reranking — all attacking the same garbage-in/confident-wrong-out failure.','朴素→模块化→智能体式 RAG 谱系与关键杠杆——CRAG、Self-RAG、查询变换、融合、重排序——全都在攻击同一个“垃圾进、自信错出”的失败。'), group: L('Retrieval & RAG','检索与 RAG') },
  { page: 'graph-rag', slug: 'graph-rag', title: L('GraphRAG & Multi-Hop Retrieval','GraphRAG 与多跳检索'), summary: L('Why flat top-k RAG cannot answer thematic or relational multi-hop queries, how Microsoft GraphRAG and iterative retrieve-reason loops solve it, and the cost/staleness heuristic for when not to.','为什么扁平 top-k RAG 回答不了主题型或关系型多跳查询，微软 GraphRAG 与迭代检索-推理循环如何解决，以及何时不该用的成本/陈旧化启发式。'), group: L('Retrieval & RAG','检索与 RAG') },

  // --- C8 — Safety, Alignment & Agentic Security (8) ---
  { page: 'agentic-threat-model', slug: 'agentic-threat-model', title: L('The Agentic Threat Model','智能体威胁模型'), summary: L('Why autonomy and tool use widen the attack surface, and the four channels attacker-influenced text reaches an agent.','为何自主性与工具使用扩大攻击面，以及攻击者可影响的文本进入智能体的四个通道。'), group: L('Safety & Security','安全与防护') },
  { page: 'prompt-injection', slug: 'prompt-injection', title: L('Prompt Injection: Direct & Indirect','提示词注入：直接与间接'), summary: L('How prompt injection works, why no clean fix exists, and the layered defense pattern for defenders.','提示词注入的机理、为何无干净修复，以及面向防御者的分层防御模式。'), group: L('Safety & Security','安全与防护') },
  { page: 'data-exfiltration-risks', slug: 'data-exfiltration-risks', title: L('Data Exfiltration & Tool Misuse','数据外泄与工具滥用'), summary: L('The confused-deputy pattern in agents: exfiltration sources, hidden sinks, and how to cut the chain.','智能体中的混淆代理模式：外泄的源、隐蔽的汇，以及如何切断攻击链。'), group: L('Safety & Security','安全与防护') },
  { page: 'guardrails', slug: 'guardrails', title: L('Guardrails: Filtering, Sandboxing & Scoping','护栏：过滤、沙箱与作用域'), summary: L('Probabilistic vs deterministic guardrails and how to layer input, output, sandbox and capability controls.','概率性与确定性护栏，以及如何分层输入、输出、沙箱与能力控制。'), group: L('Safety & Security','安全与防护') },
  { page: 'human-in-the-loop', slug: 'human-in-the-loop', title: L('Human-in-the-Loop & Least Privilege','人在回路与最小权限'), summary: L('Bounded autonomy by design: least privilege as default and consequence-based approval gates.','以设计实现有界自主：以最小权限为默认，并按后果设置审批关卡。'), group: L('Safety & Security','安全与防护') },
  { page: 'safety-red-teaming', slug: 'safety-red-teaming', title: L('Red-Teaming & Safety Evaluation','红队与安全评估'), summary: L('Adversarial testing of agents as a repeatable, outcome-graded pipeline gate, not a one-off session.','把对智能体的对抗性测试做成可重复、按结果评分的流水线关卡，而非一次性演练。'), group: L('Safety & Security','安全与防护') },
  { page: 'alignment-basics', slug: 'alignment-basics', title: L('Alignment Basics: Intent & Oversight','对齐基础：意图与监督'), summary: L('Instruction-following vs intent, reward hacking, and scalable oversight as the practical builder lever.','遵循指令与意图、奖励黑客，以及作为可行杠杆的可扩展监督。'), group: L('Safety & Security','安全与防护') },
  { page: 'deployment-safety-checklist', slug: 'deployment-safety-checklist', title: L('The Pre-Ship Safety Review','上线前安全评审'), summary: L('A practical, fail-closed-first deployment checklist including MCP/third-party supply-chain trust.','一份实用、失败趋关闭优先的部署清单，含 MCP/第三方供应链信任。'), group: L('Safety & Security','安全与防护') },
  { page: 'rag-security', slug: 'rag-security', title: L('RAG Pipeline Security','RAG 管道安全'), summary: L('Why retrieved context is untrusted input that skipped the guard — corpus poisoning, indirect injection, embedding leakage, and the trust-boundary design that contains them.','为何检索上下文是绕过守卫的不可信输入——语料库投毒、间接注入、嵌入泄露，以及遏制它们的信任边界设计。'), group: L('Safety & Security','安全与防护') },

  // --- Evaluation & Observability (6) ---
  { page: 'why-agent-eval-is-hard', slug: 'why-agent-eval-is-hard', title: L('Why Evaluating Agents Is Hard','为什么评估智能体很难'), summary: L('Non-determinism, compounding multi-step error, no single gold answer, path-dependence, eval cost, and dataset rot — the six reasons one clean number is a lie.','非确定性、多步复合误差、没有唯一标准答案、路径依赖、评估成本与数据集腐烂——单个干净数字是谎言的六个原因。'), group: L('Evaluation & Observability','评估与可观测性') },
  { page: 'outcome-vs-trajectory-eval', slug: 'outcome-vs-trajectory-eval', title: L('Outcome vs Trajectory Evaluation','结果评估 vs 轨迹评估'), summary: L('End-state predicates vs grading the decision sequence: when each is right, partial credit, and tool-call assertions as the highest-leverage safety check.','终态谓词与给决策序列打分：各自何时为正解、部分给分，以及作为最高杠杆安全检查的工具调用断言。'), group: L('Evaluation & Observability','评估与可观测性') },
  { page: 'llm-as-judge-for-agents', slug: 'llm-as-judge-for-agents', title: L('LLM-as-Judge for Agents','用 LLM 作为智能体评判者'), summary: L('Rubric design, pairwise vs pointwise, the biases that invert verdicts, calibrating against human labels, and the cases where you must not use a judge.','评分量表设计、成对 vs 单点、能颠倒裁决的偏差、针对人类标注校准，以及那些绝不该用评判者的情形。'), group: L('Evaluation & Observability','评估与可观测性') },
  { page: 'reading-agent-benchmarks', slug: 'reading-agent-benchmarks', title: L('Reading Agent Benchmarks Critically','批判地阅读智能体基准'), summary: L('What SWE-bench, GAIA, τ-bench and WebArena actually measure, why contamination and harness sensitivity make rank a weak signal, and the small custom set that really decides.','SWE-bench、GAIA、τ-bench、WebArena 实际测量什么，污染与框架敏感性为何让名次成为弱信号，以及真正做决定的小型自定义集。'), group: L('Evaluation & Observability','评估与可观测性') },
  { page: 'tracing-and-observability', slug: 'tracing-and-observability', title: L('Tracing & Observability for Agents','智能体的追踪与可观测性'), summary: L('The trace is the data structure, not a log: what to record per step, spans and OpenTelemetry GenAI conventions, and trajectory replay as the bridge to eval.','轨迹是数据结构而非日志：每步记录什么、span 与 OpenTelemetry GenAI 约定，以及作为通往评估之桥的轨迹回放。'), group: L('Evaluation & Observability','评估与可观测性') },
  { page: 'eval-driven-agent-development', slug: 'eval-driven-agent-development', title: L('Eval-Driven Agent Development','评估驱动的智能体开发'), summary: L('The eval is the only spec an agent has: tiered CI gates, golden trajectories, offline vs online, the production-to-eval flywheel, and the no-regression ratchet.','评估是智能体唯一的规格：分层 CI 关卡、黄金轨迹、离线 vs 在线、生产到评估的飞轮，以及无回归棘轮。'), group: L('Evaluation & Observability','评估与可观测性') },

  // --- AgentOps: Deploy & Operate (6) ---
  { page: 'durable-state-and-resumability', slug: 'durable-state-and-resumability', title: L('Durable State & Resumability','持久状态与可恢复性'), summary: L('Make the agent loop a durable computation — event-sourced history, journal-before-effect, and resume that replays rather than re-derives, so a crash or redeploy never restarts a half-done task.','把智能体循环做成一次持久计算——事件溯源式历史、先写日志再产生副作用、以重放而非重新推导来恢复，使崩溃或重新部署绝不重启一个做了一半的任务。'), group: L('AgentOps: Deploy & Operate','智能体运维：部署与运营') },
  { page: 'concurrency-and-scaling', slug: 'concurrency-and-scaling', title: L('Concurrency, Queues & Scaling','并发、队列与扩缩容'), summary: L('Agents are batch jobs, not requests: a queue with leased workers, per-tenant concurrency caps, journal-as-state for horizontal scale, and bounded fan-out are what survive production load.','智能体是批处理作业而非请求：带租约 worker 的队列、按租户并发上限、以日志为状态实现横向扩缩、以及有界扇出，才是能扛住生产负载的形态。'), group: L('AgentOps: Deploy & Operate','智能体运维：部署与运营') },
  { page: 'idempotency-and-retries', slug: 'idempotency-and-retries', title: L('Idempotency, Retries & Side-Effect Safety','幂等、重试与副作用安全'), summary: L('Four stacked retry sources mean every write tool will fire twice unless you construct exactly-once with intent-derived idempotency keys, failure classification, and a durable side-effect ledger.','四个叠加的重试源意味着每个写工具都会触发两次——除非你用源自意图的幂等键、失败分类与持久副作用账本构造出恰好一次。'), group: L('AgentOps: Deploy & Operate','智能体运维：部署与运营') },
  { page: 'cost-control-in-the-loop', slug: 'cost-control-in-the-loop', title: L('Cost Control at the Loop Level','在循环层面控制成本'), summary: L('Agent cost is unbounded by default; treat the per-task token/step/dollar ceiling as a fail-closed circuit breaker, then tune model cascades, prompt and tool caching, and early-exit against a quality metric.','智能体成本默认无界；把按任务的 token/步数/美元上限当作 fail-closed 熔断器，再对着质量指标调模型级联、提示与工具缓存、以及提前退出。'), group: L('AgentOps: Deploy & Operate','智能体运维：部署与运营') },
  { page: 'rollout-and-versioning', slug: 'rollout-and-versioning', title: L('Rollout, Versioning & Pinning','灰度发布、版本化与固定'), summary: L('Behavior is the (model, prompt, tools) triple; pin it to dated snapshots, stamp it on every run, and promote new versions only through shadow/canary plus an eval gate with instant config-flip rollback.','行为是（模型、提示、工具）三元组；固定到带日期的快照、在每次运行上打戳，并只经影子/灰度加评估闸门提升新版本，配以即时配置切换回滚。'), group: L('AgentOps: Deploy & Operate','智能体运维：部署与运营') },
  { page: 'incident-response-for-agents', slug: 'incident-response-for-agents', title: L('Incident Response & Runaway Containment','事故响应与失控遏制'), summary: L('A runaway agent fails open and keeps acting; detect from rate and progress, contain with in-loop fail-closed kill switches the resume path respects, rely on pre-installed blast-radius bounds, and turn every incident into a regression test.','失控的智能体 fail-open 且持续行动；从速率与进展检测、用恢复路径也遵守的循环内 fail-closed 熔断遏制、依赖预装的爆炸半径界限，并把每桩事故变成回归测试。'), group: L('AgentOps: Deploy & Operate','智能体运维：部署与运营') },

  // --- Training Agentic Models (6) ---
  { page: 'prompt-finetune-or-rl', slug: 'prompt-finetune-or-rl', title: L('Prompt, Fine-Tune, or RL?','提示、微调，还是强化学习？'), summary: L('The decision tree for changing agent behavior: prompting asks, SFT imitates, RL optimizes — pick the cheapest lever that closes the gap.','改变智能体行为的决策树：提示发问、SFT 模仿、RL 优化——选能闭合差距的最便宜的杠杆。'), group: L('Training Agentic Models','训练智能体模型') },
  { page: 'rlhf-and-rlaif', slug: 'rlhf-and-rlaif', title: L('RLHF & RLAIF','RLHF 与 RLAIF'), summary: L('Walking the RLHF pipeline stage by stage — SFT, reward model, PPO/GRPO/DPO — and what swapping human labels for an AI judge actually fixes.','逐阶段走完 RLHF 管线——SFT、奖励模型、PPO/GRPO/DPO——以及把人类标注换成 AI 评判者实际修了什么。'), group: L('Training Agentic Models','训练智能体模型') },
  { page: 'rl-for-tool-use', slug: 'rl-for-tool-use', title: L('RL for Tool Use & Multi-Step Tasks','面向工具使用与多步任务的强化学习'), summary: L('Why RL over tool trajectories is hard: sparse terminal reward, credit assignment across steps, and why a trustworthy verifier is the whole game.','为何工具轨迹上的 RL 很难：稀疏终端奖励、跨步信用分配，以及为何可信核验器是全部博弈。'), group: L('Training Agentic Models','训练智能体模型') },
  { page: 'reward-design-and-hacking', slug: 'reward-design-and-hacking', title: L('Reward Design & Reward Hacking','奖励设计与奖励黑客'), summary: L('The reward is always a proxy: concrete agent reward-hacking patterns, the KL leash to the base policy, and the discipline of auditing the top, not the mean.','奖励永远是代理：具体的智能体奖励黑客模式、到底座策略的 KL 牵绳，以及审计顶端而非平均的纪律。'), group: L('Training Agentic Models','训练智能体模型') },
  { page: 'sft-rejection-sampling-distillation', slug: 'sft-rejection-sampling-distillation', title: L('SFT, Rejection Sampling & Distillation','SFT、拒绝采样与蒸馏'), summary: L('The supervised techniques that solve most agentic training problems before RL: rejection sampling, expert iteration, and distilling a strong agent into a cheap one.','在 RL 之前解决多数智能体训练问题的有监督技术：拒绝采样、专家迭代，以及把强智能体蒸馏进便宜模型。'), group: L('Training Agentic Models','训练智能体模型') },
  { page: 'process-vs-outcome-rewards', slug: 'process-vs-outcome-rewards', title: L('Process vs Outcome Reward Models','过程奖励 vs 结果奖励模型'), summary: L('Pay for the answer or pay for the steps: when dense process reward beats sparse outcome reward, and the labeling-cost trade that decides it.','为答案付费还是为步骤付费：何时稠密过程奖励胜过稀疏结果奖励，以及决定它的标注成本取舍。'), group: L('Training Agentic Models','训练智能体模型') },
];

/** Flat, ordered list of all entries (mirrors field-guide CHAPTERS). */
export const ENTRIES = entries;

export type FlatEntry = (typeof ENTRIES)[number];

export function entryBySlug(slug: string): Entry | undefined {
  return ENTRIES.find(e => e.slug === slug);
}

/** Localized entry title. */
export function entryTitle(e: { title: Localized }, locale: Locale): string {
  return e.title[locale];
}

/**
 * Entries grouped by their optional `group` label, preserving manifest order.
 * Entries without a `group` are collected under a single null-keyed bucket
 * (rendered ungrouped by the index view).
 */
export function groupedEntries(locale: Locale): { group: string | null; items: Entry[] }[] {
  const out: { group: string | null; items: Entry[] }[] = [];
  for (const e of ENTRIES) {
    const key = e.group ? e.group[locale] : null;
    let bucket = out.find(b => b.group === key);
    if (!bucket) { bucket = { group: key, items: [] }; out.push(bucket); }
    bucket.items.push(e);
  }
  return out;
}
