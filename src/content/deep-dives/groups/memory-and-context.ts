import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'memory-and-context',
  order: 30,
  name: L('Memory & Context', '记忆与上下文'),
  groupSummary: L('Context windows, memory stores, compaction, retrieval-augmented memory — keeping the right things on the prompt.', '上下文窗口、记忆存储、压缩、检索增强记忆——把对的东西留在提示上。'),
  entries: [
    { page: 'context-budgeting', slug: 'context-budgeting', title: L('Engineering the Context Window','设计上下文窗口'), summary: L('Treat the finite window as a budgeted resource: per-category token budgets, position-aware ordering, and utilization metrics.','把有限窗口当作有预算的资源：分类令牌预算、位置感知排序与利用率度量。') },
    { page: 'short-vs-long-term-memory', slug: 'short-vs-long-term-memory', title: L('Short-Term vs Long-Term Memory','短期与长期记忆'), summary: L('The in-prompt working set vs the external store: what earns a slot, when to write, when to recall, and the promotion/demotion cycle.','提示内工作集与外部存储：什么配占位、何时写、何时回忆，以及提升／降级循环。') },
    { page: 'memory-types', slug: 'memory-types', title: L('Memory Types: Episodic, Semantic, Procedural','记忆类型：情景、语义、程序性'), summary: L('Three durable memory kinds plus the scratchpad, each written and retrieved differently; reflection promotes episodes to semantics.','三种持久记忆加草稿区，各自写入与检索方式不同；反思把情景提升为语义。') },
    { page: 'retrieval-augmented-memory', slug: 'retrieval-augmented-memory', title: L('Retrieval-Augmented Memory','检索增强记忆'), summary: L('Recall as retrieval: state-derived cues, relevance+recency+salience scoring, threshold-before-truncate, and provenance-tagged rendering.','回忆即检索：状态派生线索，相关性＋时近性＋显著性评分，先阈值再截断，以及带来源标注的渲染。') },
    { page: 'context-compaction', slug: 'context-compaction', title: L('Context Compaction & Hierarchical Memory','上下文压缩与分层记忆'), summary: L('The compaction ladder, task-structured summarization, MemGPT-style tiering, pressure-triggered hysteresis, and verifying lossy compaction.','压缩阶梯、任务结构化摘要、MemGPT 式分级、压力触发迟滞，以及验证有损压缩。') },
    { page: 'memory-stores', slug: 'memory-stores', title: L('Memory Stores: Vector, KV, Graph & Eviction','记忆存储：向量、键值、图与驱逐'), summary: L('Match backend to memory kind, a unified interface, why unbounded stores rot retrieval, and decay/eviction policies.','把后端匹配到记忆类型、统一接口、无界存储为何腐蚀检索，以及衰减／驱逐策略。') },
    { page: 'evaluating-memory', slug: 'evaluating-memory', title: L('Evaluating Memory Quality','评估记忆质量'), summary: L('Memory-specific metrics (recall@k, staleness, constraint survival, write precision) and the pitfalls they catch: poisoning, staleness, drift, compaction amnesia.','记忆特有指标（recall@k、过期率、约束存活、写入精度）及其捕获的陷阱：毒化、过期、漂移、压缩失忆。') },
    { page: 'memory-write-path-architectures', slug: 'memory-write-path-architectures', title: L('Memory Write-Path Architectures','记忆的写入路径架构'), summary: L('RAG-only is dead for stateful agents — the write path (what earns a slot, when to write, when to update) is the 2026 focus, and the four memory kinds (episodic, semantic, procedural, relational) each want a different policy.','对有状态智能体来说 RAG-only 已死——写入路径（谁配占位、何时写、何时更新）才是 2026 年的焦点，而四类记忆（情景、语义、程序、关系）各要各的策略。') },
    { page: 'memory-poisoning-defenses', slug: 'memory-poisoning-defenses', title: L('Memory Poisoning Defenses','记忆毒化防御'), summary: L('AgentPoison at 80% ASR with <0.1% poison; MemoryGraft, SpAIware, Morris-II — lifecycle defenses at ingestion, storage, retrieval, and monitoring.','AgentPoison 在毒化率 <0.1% 时达 80% ASR；MemoryGraft、SpAIware、Morris-II——在摄取、存储、检索、监控四段做生命周期防御。') },
    { page: 'long-context-effective-vs-advertised', slug: 'long-context-effective-vs-advertised', title: L('Long Context: Effective vs Advertised','长上下文：有效 vs 广告'), summary: L('Why RULER, NoLiMa, MRCR v2 diverge from advertised token ceilings by 30-60 points past 200K — and how to budget accordingly.','为何 RULER、NoLiMa、MRCR v2 在 200K 以外与广告标称值有 30–60 分的差距——以及据此如何预算。') },
    { page: 'learned-retrievers-and-memrl', slug: 'learned-retrievers-and-memrl', title: L('Learned Retrievers & MemRL','学习型检索器与 MemRL'), summary: L('MemRL treats store / retrieve / update / summarize / discard as tools optimized via RL — rank by learned utility rather than semantic similarity alone.','MemRL 把存/取/更新/摘要/丢弃当作用 RL 优化的工具——按学习到的效用排序，而不仅按语义相似度。') },
  ],
};
export default group;
