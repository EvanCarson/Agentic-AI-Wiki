import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'multi-agent-systems',
  order: 90,
  name: L('Multi-Agent Systems', '多智能体系统'),
  entries: [
    { page: 'multi-agent-when-and-why', slug: 'multi-agent-when-and-why', title: L('When (and When Not) to Go Multi-Agent','何时（与何时不）采用多智能体'), summary: L('Price the coordination tax before you split: the three honest reasons to add an agent, and when one agent with tools wins.','拆分前先给协调税定价：增加一个智能体的三个站得住脚的理由，以及单个带工具的智能体何时取胜。') },
    { page: 'multi-agent-topologies', slug: 'multi-agent-topologies', title: L('Multi-Agent Topologies','多智能体拓扑'), summary: L('Star, pipeline, hierarchy, mesh — their O(·) message cost and failure profiles, and how to pick the sparsest wiring that still works.','星型、流水线、层级、网状——它们的 O(·) 消息成本与失败画像，以及如何选出仍能奏效的最稀疏接线。') },
    { page: 'supervisor-worker-pattern', slug: 'supervisor-worker-pattern', title: L('Supervisor / Worker Orchestration','监督者/工作者编排'), summary: L('The pattern that actually ships: plan, dispatch isolated workers, aggregate — and why the supervisor is the bottleneck.','真正能上线的模式：规划、派发隔离的工作者、聚合——以及为什么监督者是瓶颈。') },
    { page: 'agent-debate-and-ensembles', slug: 'agent-debate-and-ensembles', title: L('Debate, Voting & Ensembles','辩论、投票与集成'), summary: L('Most of the gain is ensembling, not debate; without engineered diversity, debate collapses to the initial majority.','大部分收益来自集成而非辩论；没有设计出的多样性，辩论会坍缩回最初的多数派。') },
    { page: 'shared-memory-and-blackboard', slug: 'shared-memory-and-blackboard', title: L('Shared Memory & the Blackboard','共享记忆与黑板'), summary: L('A blackboard replaces N² messages with one shared store — and inherits write contention, stale reads, and lost updates.','黑板用一份共享存储替换 N² 条消息——并继承写争用、陈旧读和丢失更新。') },
    { page: 'multi-agent-failure-modes', slug: 'multi-agent-failure-modes', title: L('Multi-Agent Failure Modes','多智能体失败模式'), summary: L('Error propagation, groupthink, deadlock/livelock, cost explosion — the system-level bugs single-agent tooling cannot see.','错误传播、群体思维、死锁/活锁、成本爆炸——单智能体工具看不见的系统级 bug。') },
  ],
};
export default group;
