import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-15',
  title: L(
    'Concept: Human-in-the-Loop — where to place a human checkpoint, and how it quietly fails',
    '概念：人在回路——把人的检查点放在哪里，以及它如何悄悄失效',
  ),
  items: [
    L(
      'Added the Human-in-the-Loop concept: the in-the-loop / on-the-loop / out-of-the-loop spectrum, the "gate on consequence and reversibility, not on every step" heuristic, the patterns (approval gates, confirmation UX, escalation/handoff, reversibility-over-approval), and the failure modes of oversight itself — rubber-stamping, automation bias, and throughput cost.',
      '新增《人在回路》概念：in-the-loop / on-the-loop / out-of-the-loop 谱系，"按后果与可逆性设闸、而非对每一步设闸"的启发式，各种模式（批准闸、确认 UX、升级/交接、以可逆性替代批准），以及监督本身的故障模式——橡皮图章、自动化偏见与吞吐成本。',
    ),
    L(
      'It is the beginner on-ramp connecting autonomy levels and guardrails to the agent-UX playbooks (approval & confirmation, progressive autonomy) and the agent-security decision-receipts deep-dive. Fully bilingual (en/zh).',
      '它是把自主性等级与护栏连接到智能体 UX 实战手册（批准与确认、渐进式自主）以及智能体安全"决策回执"深入解析的入门引桥。完全双语（中/英）。',
    ),
  ],
};
export default entry;
