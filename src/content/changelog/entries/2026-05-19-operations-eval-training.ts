import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-19',
  title: L('Operations, evaluation & training coverage', '扩充运维、评估与训练内容'),
  items: [
    L('New Deep-Dive group "Evaluation & Observability" — 6 essays: why agent eval is hard, outcome vs trajectory eval, LLM-as-judge for agents, reading agent benchmarks critically, tracing & observability, and eval-driven development.',
      '新增「深度剖析」分组「评估与可观测性」——6 篇文章：为什么评估智能体很难、结果 vs 轨迹评估、用 LLM 作为智能体评判者、批判地阅读智能体基准、追踪与可观测性，以及评估驱动开发。'),
    L('New Deep-Dive group "AgentOps: Deploy & Operate" — 6 essays: durable state & resumability, concurrency & scaling, idempotency & side-effect safety, loop-level cost control, rollout/versioning/pinning, and incident response & runaway containment.',
      '新增「深度剖析」分组「智能体运维：部署与运营」——6 篇文章：持久状态与可恢复性、并发与扩缩容、幂等与副作用安全、循环层面的成本控制、灰度发布/版本化/固定，以及事故响应与失控遏制。'),
    L('New Deep-Dive group "Training Agentic Models" — 6 essays: prompt vs fine-tune vs RL, RLHF & RLAIF, RL for tool use, reward design & reward hacking, SFT/rejection sampling/distillation, and process vs outcome reward models.',
      '新增「深度剖析」分组「训练智能体模型」——6 篇文章：提示 vs 微调 vs 强化学习、RLHF 与 RLAIF、面向工具使用的强化学习、奖励设计与奖励黑客、SFT/拒绝采样/蒸馏，以及过程奖励 vs 结果奖励模型。'),
  ],
};
export default entry;
