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
  ],
};
export default group;
