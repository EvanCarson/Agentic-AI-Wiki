import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-19',
  title: L('Multi-agent, coding, UX & reasoning coverage', '扩充多智能体、编码、体验与推理内容'),
  items: [
    L('New Deep-Dive group "Multi-Agent Systems" — 6 essays: when to go multi-agent, topologies, supervisor/worker orchestration, debate/voting/ensembles, shared memory & the blackboard, and multi-agent failure modes.',
      '新增「深度剖析」分组「多智能体系统」——6 篇文章：何时采用多智能体、拓扑结构、监督者/工作者编排、辩论/投票/集成、共享记忆与黑板，以及多智能体失败模式。'),
    L('New Deep-Dive group "Coding & Computer-Use Agents" — 6 essays: coding agent architecture, repo navigation & code context, patch generation & test-driven loops, computer-use & GUI agents, sandboxing & safe execution, and evaluating coding agents.',
      '新增「深度剖析」分组「编码与计算机操作智能体」——6 篇文章：编码智能体架构、仓库导航与代码上下文、补丁生成与测试驱动循环、计算机操作与 GUI 智能体、沙箱与安全执行，以及评估编码智能体。'),
    L('New Deep-Dive group "Agent UX & Human Interaction" — 6 essays: designing for trust & calibration, approval & confirmation UX, transparency & explainability, interruption/steering/handoff, progressive autonomy, and designing for failure & recovery.',
      '新增「深度剖析」分组「智能体体验与人机交互」——6 篇文章：为信任与校准而设计、审批与确认体验、透明度与可解释性、中断/引导/交接、渐进式自主，以及为失败与恢复而设计。'),
    L('New Deep-Dive group "Reasoning & Test-Time Compute" — 6 essays: chain-of-thought, self-consistency & sampling, tree & graph of thought, verifier-guided search, inference-time scaling, and when reasoning helps vs burns money.',
      '新增「深度剖析」分组「推理与测试时计算」——6 篇文章：思维链、自一致性与采样、思维树与思维图、核验器引导的搜索、推理时扩展，以及推理何时有用、何时烧钱。'),
  ],
};
export default entry;
