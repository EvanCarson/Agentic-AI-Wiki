import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-13',
  title: L(
    'Five thin original pages rebuilt around verified evidence',
    '五个单薄的初版页面围绕核实过的证据重写',
  ),
  items: [
    L(
      'Concepts — Reading benchmarks critically: a field guide to eight agent benchmarks (SWE-bench Verified and Pro, Terminal-Bench, τ-bench, GAIA, HLE, METR time horizons, LMArena), how SWE-bench Verified and then SWE-bench Pro were found to be riddled with broken tasks in 2026, worked confidence-interval math showing which score gaps are just noise, and pass@k versus pass^k reliability.',
      '概念——批判地阅读基准：八个智能体基准速查（SWE-bench Verified 与 Pro、Terminal-Bench、τ-bench、GAIA、HLE、METR 时间跨度、LMArena），SWE-bench Verified 与 SWE-bench Pro 在 2026 年先后被发现存在大量坏题的经过，说明哪些分差只是噪声的置信区间算例，以及 pass@k 与 pass^k 的可靠性对比。',
    ),
    L(
      'Operations — Pricing & Packaging Agent Products: rebuilt around who carries cost variance, with a worked seat-economics example, dated real cases (Cursor, GitHub Copilot, Salesforce Agentforce, Intercom Fin, Anthropic’s weekly limits) and how the definition of an “outcome” sets the price.',
      '运营——智能体产品的定价与打包：以「成本波动由谁来扛」为主线重写，加入席位经济性算例、标注日期的真实案例（Cursor、GitHub Copilot、Salesforce Agentforce、Intercom Fin、Anthropic 每周限额），并说明「结果」的定义如何决定价格。',
    ),
    L(
      'Deep-Dives · Multi-Agent Systems — Multi-Agent Topologies: each wiring is now judged by where it splits context and who checks the results, using controlled 2025–2026 evidence (Google’s five-architecture study, Anthropic’s research system, the MAST failure taxonomy, Cognition, an equal-token-budget study), ending in a six-question decision rule.',
      '深入解析 · 多智能体系统——多智能体拓扑：以 2025–2026 年的对照证据（Google 五种架构研究、Anthropic 研究系统、MAST 失败分类、Cognition、一项等 token 预算研究）重写，每种接线都按「在哪里拆分上下文、由谁校验结果」来评判，并以六问决策规则收尾。',
    ),
    L(
      'Deep-Dives · Tool & Capability Design — Error Messages as Prompts: a tool error’s reader is the model’s next step, so the page now covers the MCP split between protocol errors the model never sees and tool execution errors it can recover from (SEP-1303), before/after rewrites for five failure classes, a five-part error template, and a rule for routing each error to the model, the harness or a human.',
      '深入解析 · 工具与能力设计——把错误消息当作提示：工具错误的读者是模型的下一步，所以页面新增了 MCP 中「模型看不到的协议错误」与「模型能据以恢复的工具执行错误」的划分（SEP-1303）、五类失败的改写前后对照、一个五段式错误模板，以及把每个错误分派给模型、框架或人的规则。',
    ),
    L(
      'Playbooks · Coding & Computer-Use Agents — Evaluating Coding Agents: now a hands-on playbook — since SWE-bench’s tests have been shown both to accept wrong patches and to reject correct ones, build your own eval from merged PRs with hidden tests, a reviewer-mergeability rubric, pass^k reliability and cost per mergeable diff, gated in CI.',
      '实战手册 · 编码与计算机操作智能体——评估编码智能体：改写为实战手册——鉴于 SWE-bench 的测试已被证实既会放过错误补丁、也会拒掉正确补丁，应从已合并的 PR 构建自有评测：隐藏测试、评审可合并性细则、pass^k 可靠性与每份可合并 diff 的成本，并在 CI 中设门禁。',
    ),
  ],
};

export default entry;
