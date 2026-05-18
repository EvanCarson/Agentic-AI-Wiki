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
