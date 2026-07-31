import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'evaluating-agents',
  order: 100,
  name: L('Evaluating Agents', '评估智能体'),
  groupSummary: L(
    "The 2026 discipline of evaluating agents: benchmark saturation, judge calibration, drift detection, and the eval methodologies that survived contact with production.",
    '评估智能体的 2026 学科：基准饱和、评判器校准、漂移检测，以及经受住生产接触的评测方法学。',
  ),
  entries: [
    { page: 'judge-calibration-and-meta-evaluation', slug: 'judge-calibration-and-meta-evaluation', title: L('Judge Calibration & Meta-Evaluation','评判器校准与元评测'), summary: L('Prometheus 2, JudgeBench, RubricEval; meta-evaluation collapse; the 85-90% human-agreement floor; monthly recalibration cadence.','Prometheus 2、JudgeBench、RubricEval；元评测坍缩；85–90% 的人机一致底线；月度重校准节奏。') },
    { page: 'benchmark-landscape-2026', slug: 'benchmark-landscape-2026', title: L('Benchmark Landscape (2026)','2026 年基准全景'), summary: L('SWE-bench Verified saturation (five models within 0.7 pts); SWE-bench Pro; contamination as legal deterrent; why Verified is now an audit signal, not a ranking.','SWE-bench Verified 已饱和（前五仅相差 0.7 分）；SWE-bench Pro；把污染当法律威慑；为何 Verified 如今是审计信号，而非排名。') },
    { page: 'hal-and-async-agent-eval', slug: 'hal-and-async-agent-eval', title: L('HAL & Asynchronous Agent Eval','HAL 与异步智能体评测'), summary: L("Princeton HAL (cost-per-solve + 5-dim reliability dashboard); Gaia2 (async environments, write-action verifiers, temporal constraints); why static benchmarks miss real deployment.",'Princeton HAL（每解一题的成本 + 5 维可靠性面板）；Gaia2（异步环境、写动作核验器、时间约束）；为何静态基准漏掉真实部署。') },
    { page: 'trajectory-and-process-evaluation', slug: 'trajectory-and-process-evaluation', title: L('Trajectory & Process Evaluation','轨迹与过程评测'), summary: L('Scoring how the agent worked, not just the final answer: outcome vs trajectory eval; AgentEvals match modes (strict/unordered/subset/superset); reference-based vs reference-free LLM-judge; the process-reward-model crossover; and why exact-match on the path fails correct agents.','为智能体如何工作打分，而不只看最终答案：结果 vs 轨迹评测；AgentEvals 匹配模式（strict/unordered/subset/superset）；基于参考 vs 无参考的 LLM 评判；过程奖励模型的迁移；以及为何对路径做精确匹配会误伤正确的智能体。') },
    { page: 'eval-driven-development-and-ci', slug: 'eval-driven-development-and-ci', title: L('Eval-Driven Development & Regression Evals in CI','评测驱动开发与 CI 中的回归评测'), summary: L('Evals as CI gates, not one-offs: the golden set as a living asset; pass^k and paired significance tests for non-determinism; online vs offline, canary + drift detection; cost/latency as gate-able budgets; promptfoo, DeepEval, Inspect.','把评测作为 CI 门禁而非一次性检查：黄金集作为活资产；用 pass^k 与配对显著性检验应对非确定性；线上 vs 线下、金丝雀与漂移检测；把成本/延迟作为可设门槛的预算；promptfoo、DeepEval、Inspect。') },
    { page: 'eval-variance-and-statistical-power', slug: 'eval-variance-and-statistical-power', title: L('Eval Variance & Statistical Power','评测方差与统计功效'), summary: L('A single-run agent score is a sample, not a measurement: pass@k vs pass^k, why between-task variance means more tasks beats more runs, paired McNemar designs that halve the detectable effect on the same budget, and the decision rule that stops teams ratcheting on noise.','单次运行的智能体分数是一次抽样，不是一次测量：pass@k 与 pass^k 的分别、为何任务间方差意味着加任务胜过加运行次数、在同样预算下把可检测效应砍半的 McNemar 配对设计，以及那条阻止团队在噪声上棘轮式推进的决策规则。') },
  ],
};
export default group;
