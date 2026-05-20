import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-19',
  title: L('Governance & Compliance deep-dive group', '新增「治理与合规」深度剖析分组'),
  items: [
    L('New Deep-Dive group "Governance & Compliance" — 6 essays: audit trails & provenance, policy enforcement & controls, the regulatory landscape, accountability & ownership, data governance for agents, and governance without gridlock.',
      '新增「深度剖析」分组「治理与合规」——6 篇文章：审计轨迹与溯源、策略执行与管控、监管版图、问责与归属、智能体的数据治理，以及不卡死的治理。'),
    L('Distinct from the Safety & Security group: this group covers policy, audit, accountability and regulation — tamper-evident audit trails, policy-as-code enforced outside the model, risk-tiered regulation (EU AI Act shape, NIST AI RMF, ISO/IEC 42001), the named-operator accountability model, and data governance through the agent loop.',
      '与「安全与防护」分组不同：本组讲策略、审计、问责与监管——防篡改可察觉的审计轨迹、在模型之外执行的策略即代码、风险分级监管（欧盟 AI 法案形态、NIST AI RMF、ISO/IEC 42001）、具名操作者问责模型，以及穿过智能体循环的数据治理。'),
    L('Regulatory content is intentionally qualitative and is not legal advice; it maps the shape of obligations so engineers know what to ask qualified counsel.',
      '监管内容刻意保持定性，且不构成法律意见；它勾勒义务的形状，使工程师知道该向有资质的法律顾问问什么。'),
  ],
};
export default entry;
