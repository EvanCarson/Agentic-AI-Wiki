import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-15',
  title: L(
    'Concepts: three more entry-level pages — multi-agent systems, evaluating agents, voice & realtime agents',
    '概念：再添三个入门页面——多智能体系统、评估智能体、语音与实时智能体',
  ),
  items: [
    L(
      'Added Multi-Agent Systems (when one strong agent beats a crowd, and the topology ladder from supervisor-worker to swarm), Evaluating Agents (trajectory vs outcome eval, LLM-as-judge, and why your custom eval set beats a leaderboard), and Voice & Realtime Agents (the cascade vs speech-to-speech choice, and why latency is the whole design problem).',
      '新增《多智能体系统》（何时单个强智能体胜过一群，以及从主管-工作者到蜂群的拓扑阶梯）、《评估智能体》（轨迹 vs 结果评测、LLM 评判，以及为何你的自定义评测集胜过排行榜）与《语音与实时智能体》（级联 vs 语音到语音的抉择，以及为何延迟是整个设计难题）。',
    ),
    L(
      'Each is the entry-level on-ramp to an existing advanced surface — the Multi-Agent Systems and Evaluating Agents deep-dive groups and the Voice & Realtime Agents playbook — grounded in the 2026 record (A2A vs MCP, τ-bench/HAL, the OpenAI Realtime API).',
      '每一篇都是通往既有进阶内容的入门引桥——多智能体系统与评估智能体深入解析分组，以及语音与实时智能体实战手册——立足于 2026 年的实证（A2A 与 MCP、τ-bench/HAL、OpenAI Realtime API）。',
    ),
    L(
      'Fully bilingual (en/zh); brings the Concepts encyclopedia to 44 entries.',
      '完全双语（中/英）；概念百科现已达 44 个条目。',
    ),
  ],
};
export default entry;
