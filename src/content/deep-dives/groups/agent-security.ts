import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'agent-security',
  order: 95,
  name: L('Agent Security', '智能体安全'),
  groupSummary: L(
    'Securing a production agent end-to-end — injection defense, policy-as-code, identity and attestation, red-teaming, isolation, and the audit primitives that shipped in 2026.',
    '端到端保护一台生产级智能体——注入防御、策略即代码、身份与鉴证、红队、隔离，以及 2026 年落地的审计原语。',
  ),
  entries: [
    { page: 'prompt-injection-defense-2026', slug: 'prompt-injection-defense-2026', title: L('Prompt-Injection Defense in 2026','2026 年的提示注入防御'), summary: L("Prompt injection is an unsolved frontier problem, not a bug you patch — the instruction hierarchy, defense-in-depth layers, and why the Gemini CLI CVSS-10 incident proves single-model defenses fail.",'提示注入是尚未解决的前沿问题，不是能打补丁的 bug——指令层级、纵深防御分层，以及 Gemini CLI CVSS-10 事件为何证明单模型防御会失败。') },
  ],
};
export default group;
