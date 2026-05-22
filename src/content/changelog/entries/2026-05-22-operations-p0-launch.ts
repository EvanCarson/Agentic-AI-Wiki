import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-22',
  title: L(
    'Added P0 Operations: feature flags, kill switches, online vs offline evals, per-customer economics, EU AI Act, NIST AI RMF, agent identity, scoped credentials',
    '新增 P0 运维条目：特性开关、急停开关、在线 vs 离线评测、按客户经济、欧盟 AI 法案、NIST AI RMF、智能体身份、范围受限凭证',
  ),
  items: [
    L(
      'Eight new Operation entries close the launch-coherence gaps the IA expansion flagged for Operations.',
      '八篇新增运维条目，填补了 IA 扩展规划中针对运维板块标出的"上线连贯性"缺口。',
    ),
    L(
      'AgentOps: feature-flags-for-agents, kill-switches. Eval & Obs: online-vs-offline-evals. Economics: per-customer-economics.',
      'AgentOps：feature-flags-for-agents、kill-switches。评估与可观测性：online-vs-offline-evals。经济性：per-customer-economics。',
    ),
    L(
      'Governance: eu-ai-act-for-agents, nist-ai-rmf-for-agents. Safety: agent-identity, scoped-credentials-for-agents.',
      '治理：eu-ai-act-for-agents、nist-ai-rmf-for-agents。安全：agent-identity、scoped-credentials-for-agents。',
    ),
  ],
};
export default entry;
