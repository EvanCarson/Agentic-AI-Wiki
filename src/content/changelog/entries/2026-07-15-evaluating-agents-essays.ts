import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-15',
  title: L(
    'Deep-Dive: two new Evaluating Agents essays — trajectory/process eval and eval-driven CI',
    '深入解析：两篇新的"评估智能体"文章——轨迹/过程评测与评测驱动的 CI',
  ),
  items: [
    L(
      'Added "Trajectory & Process Evaluation" — scoring how an agent worked, not just the final answer: outcome vs trajectory eval, the step-level metric taxonomy, AgentEvals match modes (strict/unordered/subset/superset), reference-based vs LLM-judge, tau-bench state grading, the process-reward-model crossover, and why exact-match on the path fails correct agents.',
      '新增《轨迹与过程评测》——为智能体"如何工作"打分，而不只看最终答案：结果 vs 轨迹评测、步级指标分类法、AgentEvals 匹配模式（strict/unordered/subset/superset）、基于参考 vs LLM 评判、tau-bench 状态评分、过程奖励模型的迁移，以及为何对路径做精确匹配会误伤正确的智能体。',
    ),
    L(
      'Added "Eval-Driven Development & Regression Evals in CI" — evals as continuous gates: the golden set as a living asset, pass@k vs pass^k and paired significance testing for non-determinism, wiring evals into CI (promptfoo, DeepEval), online vs offline with canary and drift detection, and cost/latency as gate-able budgets.',
      '新增《评测驱动开发与 CI 中的回归评测》——把评测作为持续门禁：黄金集作为活资产、用 pass@k 与 pass^k 及配对显著性检验应对非确定性、把评测接入 CI（promptfoo、DeepEval）、线上 vs 线下配合金丝雀与漂移检测，以及把成本/延迟作为可设门槛的预算。',
    ),
    L(
      'The Evaluating Agents deep-dive group grows from 3 to 5 essays; fully bilingual (en/zh) with byte-identical code blocks.',
      '"评估智能体"深入解析分组从 3 篇增至 5 篇；完全双语（中/英），代码块逐字节一致。',
    ),
  ],
};
export default entry;
