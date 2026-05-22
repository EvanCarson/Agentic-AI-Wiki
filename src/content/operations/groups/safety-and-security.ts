import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'safety-and-security',
  order: 50,
  name: L('Safety & Security', '安全与防护'),
  groupSummary: L('Prompt injection, sandboxing, exfiltration, red-teaming, deployment safety — the threat model an agent\'s environment creates.', '提示注入、沙箱、数据外泄、红队、部署安全——智能体环境制造的威胁模型。'),
  entries: [
    { page: 'agentic-threat-model', slug: 'agentic-threat-model', title: L('The Agentic Threat Model','智能体威胁模型'), summary: L('Why autonomy and tool use widen the attack surface, and the four channels attacker-influenced text reaches an agent.','为何自主性与工具使用扩大攻击面，以及攻击者可影响的文本进入智能体的四个通道。') },
    { page: 'prompt-injection', slug: 'prompt-injection', title: L('Prompt Injection: Direct & Indirect','提示词注入：直接与间接'), summary: L('How prompt injection works, why no clean fix exists, and the layered defense pattern for defenders.','提示词注入的机理、为何无干净修复，以及面向防御者的分层防御模式。') },
    { page: 'data-exfiltration-risks', slug: 'data-exfiltration-risks', title: L('Data Exfiltration & Tool Misuse','数据外泄与工具滥用'), summary: L('The confused-deputy pattern in agents: exfiltration sources, hidden sinks, and how to cut the chain.','智能体中的混淆代理模式：外泄的源、隐蔽的汇，以及如何切断攻击链。') },
    { page: 'guardrails', slug: 'guardrails', title: L('Guardrails: Filtering, Sandboxing & Scoping','护栏：过滤、沙箱与作用域'), summary: L('Probabilistic vs deterministic guardrails and how to layer input, output, sandbox and capability controls.','概率性与确定性护栏，以及如何分层输入、输出、沙箱与能力控制。') },
    { page: 'agent-identity', slug: 'agent-identity', title: L('Agent identity','智能体的身份'), summary: L('Who is acting when an agent calls a tool? Service accounts, on-behalf-of patterns, and the audit consequences of getting the answer wrong.','智能体调用工具时，到底是"谁"在动作？服务账号、on-behalf-of 模式，以及把这个答案搞错时的审计后果。') },
    { page: 'human-in-the-loop', slug: 'human-in-the-loop', title: L('Human-in-the-Loop & Least Privilege','人在回路与最小权限'), summary: L('Bounded autonomy by design: least privilege as default and consequence-based approval gates.','以设计实现有界自主：以最小权限为默认，并按后果设置审批关卡。') },
    { page: 'safety-red-teaming', slug: 'safety-red-teaming', title: L('Red-Teaming & Safety Evaluation','红队与安全评估'), summary: L('Adversarial testing of agents as a repeatable, outcome-graded pipeline gate, not a one-off session.','把对智能体的对抗性测试做成可重复、按结果评分的流水线关卡，而非一次性演练。') },
    { page: 'alignment-basics', slug: 'alignment-basics', title: L('Alignment Basics: Intent & Oversight','对齐基础：意图与监督'), summary: L('Instruction-following vs intent, reward hacking, and scalable oversight as the practical builder lever.','遵循指令与意图、奖励黑客，以及作为可行杠杆的可扩展监督。') },
    { page: 'deployment-safety-checklist', slug: 'deployment-safety-checklist', title: L('The Pre-Ship Safety Review','上线前安全评审'), summary: L('A practical, fail-closed-first deployment checklist including MCP/third-party supply-chain trust.','一份实用、失败趋关闭优先的部署清单，含 MCP/第三方供应链信任。') },
    { page: 'rag-security', slug: 'rag-security', title: L('RAG Pipeline Security','RAG 管道安全'), summary: L('Why retrieved context is untrusted input that skipped the guard — corpus poisoning, indirect injection, embedding leakage, and the trust-boundary design that contains them.','为何检索上下文是绕过守卫的不可信输入——语料库投毒、间接注入、嵌入泄露，以及遏制它们的信任边界设计。') },
  ],
};
export default group;
