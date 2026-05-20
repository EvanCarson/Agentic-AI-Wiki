import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'governance-compliance',
  order: 160,
  name: L('Governance & Compliance', '治理与合规'),
  groupSummary: L('Accountability, audit, policy enforcement and the regulatory landscape — making agent decisions defensible.', '问责、审计、策略执行与监管版图——让智能体的决策可被解释与辩护。'),
  entries: [
  { page: 'audit-trails', slug: 'audit-trails', title: L('Audit Trails & Provenance','审计轨迹与溯源'), summary: L('What to capture to reconstruct any decision, hash-chained tamper-evidence, retention vs erasure, and the four-strand provenance of model, prompt, tools and data.','为重建任何决策该捕获什么、哈希链式防篡改可察觉、保留期与擦除权，以及模型／提示词／工具／数据的四线溯源。') },
  { page: 'policy-enforcement', slug: 'policy-enforcement', title: L('Policy Enforcement & Controls','策略执行与管控'), summary: L('Policy-as-code outside the model, enforcing pre/in/post loop, allowlist-by-default, and separation of duties so a compromised agent cannot close the loop alone.','模型之外的策略即代码、在循环前／内／后执行、默认白名单，以及职责分离使被攻陷的智能体无法独自闭环。') },
  { page: 'regulatory-landscape', slug: 'regulatory-landscape', title: L('The Regulatory Landscape','监管版图'), summary: L('A qualitative map (not legal advice): risk-tiered regulation, documentation and human-oversight duties, the provider/deployer split, and how NIST AI RMF and ISO/IEC 42001 operationalize it.','一张定性地图（不是法律意见）：风险分级监管、文档与人工监督义务、提供方／部署方之分，以及 NIST AI RMF 与 ISO/IEC 42001 如何把它操作化。') },
  { page: 'accountability-and-roles', slug: 'accountability-and-roles', title: L('Accountability & Ownership','问责与归属'), summary: L('Accountability never transfers to the agent: the named operator role, RACI on the autonomous action, sign-off that means something, and an accountability ladder set in advance.','问责绝不转移到智能体：具名操作者角色、对自主行动做 RACI、有分量的签字，以及事先设定的问责阶梯。') },
  { page: 'data-governance', slug: 'data-governance', title: L('Data Governance for Agents','智能体的数据治理'), summary: L('An agent is a data-flow machine: lineage through the loop, purpose/consent enforced at point of use, boundary minimization for PII, governed training data, and invisible cross-border flow.','智能体是一台数据流机器：穿过循环的血缘、在使用点执行目的／同意、对 PII 做边界最小化、受治理的训练数据，以及无形的跨境流动。') },
  { page: 'governance-in-practice', slug: 'governance-in-practice', title: L('Governance Without Gridlock','不卡死的治理'), summary: L('Make governance an enabler: risk-proportionate tiers, the safe default as the easy path, automated evidence with humans on judgment, and counting gridlock as a real cost.','把治理做成使能者：风险相称的分级、安全默认即省事路径、证据自动化而把人留给判断，以及把卡死当作真实成本来算。') },
  ],
};
export default group;
