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
    { page: 'policy-as-code-for-agents', slug: 'policy-as-code-for-agents', title: L('Policy-as-Code for Agents','面向智能体的策略即代码'), summary: L('OPA/Rego and Cedar gating every tool call at the boundary — where the PDP lives, failure-open vs failure-closed, and the structured PolicyDecision that makes refusals machine-readable.','用 OPA/Rego 与 Cedar 在边界处对每次工具调用做门控——PDP 放在哪里、失败放行还是失败拦截，以及让拒绝可被机器读取的结构化 PolicyDecision。') },
    { page: 'agent-identity-and-attestation', slug: 'agent-identity-and-attestation', title: L('Agent Identity & Attestation','智能体身份与鉴证'), summary: L('Three complementary layers answer "which agent is calling me" — signed Agent Cards, runtime attestation (OATR), and Verifiable Credentials — plus Visa\'s RFC 9421 request signing for commerce.','三个互补的层回答"是哪个智能体在调用我"——签名的 Agent Card、运行时鉴证（OATR）、以及可验证凭证——外加 Visa 用于商务的 RFC 9421 请求签名。') },
    { page: 'red-teaming-agents', slug: 'red-teaming-agents', title: L('Red-Teaming Agents','对智能体做红队'), summary: L('MCPTox showed a 36.5% average attack success rate across 20 models — with inverse scaling, where more capable models are more susceptible — and a three-paradigm methodology you can turn into a repeatable harness.','MCPTox 显示 20 个模型平均攻击成功率 36.5%——且存在逆向扩展，越强的模型越易受攻击——以及一套可变成可重复测试台的三范式方法论。') },
    { page: 'sandbox-and-isolation-patterns', slug: 'sandbox-and-isolation-patterns', title: L('Sandbox & Isolation Patterns','沙箱与隔离模式'), summary: L('Shared-kernel containers are no longer enough for agent-generated code — the 2026 tiers are microVMs (Firecracker, <150ms), gVisor userspace interception, and remote-only execution, chosen by blast radius.','对智能体生成的代码而言，共享内核的容器已经不够了——2026 年的层级是 microVM（Firecracker，<150ms）、gVisor 用户态拦截、以及仅远程执行，按爆炸半径来选。') },
    { page: 'structured-refusal-and-why-trails', slug: 'structured-refusal-and-why-trails', title: L('Structured Refusal & Why-Trails','结构化拒绝与理由链'), summary: L('A prose refusal tells a user "no"; an enumerated refusal reason plus a why-trail tells a forensic investigator exactly which rule fired and why — the accountability primitive that a policy decision already hands you.','散文式拒绝只对用户说"不行"；一个枚举化的拒绝原因加一条理由链，能告诉取证人员到底是哪条规则触发、为何触发——这是策略决策已经交到你手上的问责原语。') },
    { page: 'agent-supply-chain-security', slug: 'agent-supply-chain-security', title: L('Agent Supply-Chain Security','智能体供应链安全'), summary: L('The Gemini CLI CVSS-10 compromise is the canonical warning — a public GitHub issue chained through an auto-approve bypass to token exfiltration — and it generalizes to every MCP server you install without vetting.','Gemini CLI 的 CVSS-10 被攻破事件是标志性警示——一个公开的 GitHub issue 经由自动批准的绕过一路串到令牌外泄——而它可推广到你未经审查就安装的每一台 MCP 服务器。') },
  ],
};
export default group;
