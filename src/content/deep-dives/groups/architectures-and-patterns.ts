import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'architectures-and-patterns',
  order: 10,
  name: L('Architectures & Patterns', '架构与模式'),
  groupSummary: L('Reusable agent architectures — ReAct, plan-and-execute, supervisor-worker, router, reflection — and when each fits.', '可复用的智能体架构——ReAct、Plan-and-Execute、Supervisor-Worker、Router、Reflection——以及何时该用哪一种。'),
  entries: [
    { page: 'pattern-landscape', slug: 'pattern-landscape', title: L('The Agent Design-Pattern Landscape','智能体设计模式全景'), summary: L('Why architecture is a reliability lever, and the five axes that compare every pattern.','为什么架构是可靠性杠杆，以及比较每种模式的五个坐标轴。') },
    { page: 'react-pattern', slug: 'react-pattern', title: L('ReAct — Interleaving Reasoning and Acting','ReAct——交错进行推理与行动'), summary: L('The workhorse tool loop: control flow, why interleaving wins, and the failure modes at scale.','主力工具循环：控制流、交错为何取胜，以及规模化时的失败模式。') },
    { page: 'plan-and-execute', slug: 'plan-and-execute', title: L('Plan-and-Execute — Decompose, Then Run','Plan-and-Execute——先分解，再运行'), summary: L('Planner/executor split, replanning strategies, and when the up-front plan becomes a liability.','规划器/执行器拆分、重规划策略，以及预先计划何时成为负担。') },
    { page: 'reflection-pattern', slug: 'reflection-pattern', title: L('Reflection — Verify, Critique, Revise','反思——验证、批评、修订'), summary: L('Self-refine vs Reflexion, why the external signal is everything, and when self-critique hurts.','self-refine 与 Reflexion，为何外部信号是关键，以及自我批评何时有害。') },
    { page: 'agent-search-strategies', slug: 'agent-search-strategies', title: L('Search Strategies — Branching Over Trajectories','搜索策略——在轨迹上分支'), summary: L('Best-of-N, self-consistency, tree/graph-of-thought: the cost regime and the scorer dependency.','Best-of-N、自一致性、思维树/图：成本区间与对打分器的依赖。') },
    { page: 'router-pattern', slug: 'router-pattern', title: L('Routing & Dispatch — Selection, Fan-out, Parallelism','路由与分派——选择、扇出、并行'), summary: L('Classifier vs tool-call routing, parallel fan-out, and the failure modes of the routing layer.','分类器与工具调用路由、并行扇出，以及路由层的失败模式。') },
    { page: 'tool-error-recovery', slug: 'tool-error-recovery', title: L('Tool-Use Loops & Error Recovery','工具使用循环与错误恢复'), summary: L('The failure taxonomy, layered recovery, error-messages-as-prompts, and side-effect durability.','失败分类法、分层恢复、错误消息即提示词，以及副作用持久性。') },
    { page: 'single-vs-multi-agent', slug: 'single-vs-multi-agent', title: L('Single-Agent vs. Multi-Agent Orchestration','单智能体 vs. 多智能体编排'), summary: L('Real reasons to split, supervisor/worker vs hand-off, the coordination tax, and a decision framework.','拆分的真实理由、监督者/工作者与交接、协调税，以及一个决策框架。') },
    { page: 'durable-execution-langgraph-plus-temporal', slug: 'durable-execution-langgraph-plus-temporal', title: L('Durable Execution: LangGraph + Temporal','持久执行：LangGraph + Temporal'), summary: L("Checkpointer-between-nodes vs Temporal-within-node — replay semantics, why LangGraph loops don't survive at 10k items, and the 'reasoning graph + durable runtime' pattern.",'节点间 checkpointer 与节点内 Temporal——回放语义、LangGraph 循环为何在 1 万条时撑不住，以及"推理图 + 持久运行时"这一模式。') },
    { page: 'context-caching-economics', slug: 'context-caching-economics', title: L('Context Caching Economics','上下文缓存经济学'), summary: L('Cross-vendor cache pricing (Anthropic 1.25x write / 0.1x read; Gemini 90% off; OpenAI automatic 75-90%), TTL trade-offs, and how caching plus batch stacks to ~95% off list.','跨厂商缓存计价（Anthropic 写 1.25×/读 0.1×；Gemini 减 90%；OpenAI 自动 75%-90%）、TTL 取舍，以及缓存与批处理叠加至约减 95% 的做法。') },
    { page: 'browser-agent-failure-modes', slug: 'browser-agent-failure-modes', title: L('Browser Agent Failure Modes','浏览器智能体的失败模式'), summary: L('The six failure modes WebArena does not catch — DOM drift, screenshot ambiguity, login state, modal interruptions, rate-limit cliffs, irreversibility.','WebArena 抓不到的六种失败模式——DOM 漂移、截图歧义、登录状态、模态弹窗打断、限流断崖、不可逆操作。') },
    { page: 'claude-managed-agents-architecture', slug: 'claude-managed-agents-architecture', title: L('Claude Managed Agents: Architecture','Claude Managed Agents 架构'), summary: L('Durable session as append-only event log, stateless harness, wake(sessionId) recovery — and what the pattern gives up.','把持久会话建模为只追加事件日志、无状态外壳、wake(sessionId) 恢复——以及这一模式放弃了什么。') },
  ],
};
export default group;
