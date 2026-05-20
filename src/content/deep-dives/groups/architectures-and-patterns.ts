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
  ],
};
export default group;
