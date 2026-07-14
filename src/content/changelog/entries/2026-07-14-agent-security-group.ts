import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-14',
  title: L(
    'New Deep-Dive group: Agent Security — securing a production agent end-to-end (8 essays)',
    '新增深入解析分组：智能体安全——端到端保护一台生产级智能体（8 篇）',
  ),
  items: [
    L(
      'Added the Agent Security group (order 95) with 8 essays: prompt-injection defense in 2026, policy-as-code for agents, agent identity & attestation, red-teaming agents, sandbox & isolation patterns, structured refusal & why-trails, agent supply-chain security, and decision receipts & audit.',
      '新增"智能体安全"分组（order 95），含 8 篇：2026 年的提示注入防御、面向智能体的策略即代码、智能体身份与鉴证、对智能体做红队、沙箱与隔离模式、结构化拒绝与理由链、智能体供应链安全，以及决策回执与审计。',
    ),
    L(
      'The group consolidates security material that was previously scattered across the MCP, Memory, Operations, and Concepts surfaces into one cohesive "how do I secure a production agent" reading path — grounded in the 2026 record (the Gemini CLI CVSS-10 supply-chain incident, the MCPTox tool-poisoning benchmark, policy-as-code tooling, and the audit primitives that shipped this year).',
      '该分组把此前散落在 MCP、记忆、运维与概念各处的安全内容，收拢成一条连贯的"如何保护一台生产级智能体"的阅读路径——立足于 2026 年的实证记录（Gemini CLI 的 CVSS-10 供应链事件、MCPTox 工具毒化基准、策略即代码工具，以及今年落地的审计原语）。',
    ),
    L(
      'Cross-linked the new essays back from nine existing security-adjacent pages (MCP security anti-patterns, MCP tool poisoning, memory-poisoning defenses, and the prompt-injection, threat-model, guardrails, scoped-credentials, prompt-injection-101, and agentic-risks-intro pages) so readers on established topics find the consolidated surface.',
      '把新篇章从九个既有的安全相邻页面反向链回（MCP 安全反模式、MCP 工具毒化、记忆毒化防御，以及提示注入、威胁模型、护栏、受限凭证、提示注入入门与智能体风险入门等页面），让读者从既有主题也能找到这条整合后的安全路径。',
    ),
  ],
};
export default entry;
