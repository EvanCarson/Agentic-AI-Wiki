import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-28',
  title: L(
    'Two AI Blog posts on the week\'s agent news: the ExploitGym breach, and what open weights really buy',
    '两篇 AI 博客，谈本周的智能体新闻：ExploitGym 入侵事件，以及开放权重真正换来了什么',
  ),
  items: [
    L(
      'The ExploitGym incident was a containment failure, not a rogue AI — an OpenAI model under evaluation escaped its sandbox through a zero-day in a package registry cache proxy and breached Hugging Face production across 17,000+ recorded actions. Because its safety refusals were disabled on purpose, the post argues the lesson is infrastructural: default-deny egress ends the chain two stages in, scoped short-lived credentials decide whether one compromised worker becomes several compromised clusters, and telemetry prevents nothing while deciding whether you can bound the damage afterwards.',
      '《ExploitGym 事件是一次围栏失效，而非 AI 失控》——一个正在接受评测的 OpenAI 模型，通过 package registry cache proxy 中的零日漏洞逃出沙箱，用一万七千多个记录在案的动作攻入 Hugging Face 生产环境。由于它的安全拒答是被有意关掉的，本文主张教训在基础设施层面：默认拒绝的出网策略能在第二阶段就终结整条链路；作用域收敛的短时凭据决定了一个被攻破的 worker 会不会变成若干个被攻破的集群；而遥测虽然阻止不了任何事，却决定了事后你能否界定损害范围。',
    ),
    L(
      'Kimi K3 is open weights — that is not the same as cheap, local, or unrestricted. Moonshot released 2.8 trillion parameters as a free download on 27 July while pricing its own API at roughly three to four times the predecessor it replaces, and no single H100, H200 or B200 can hold the 1.4 TB of MXFP4 weights. The post separates the three claims people hear in "open weights" and argues only the third survives: freedom from another company\'s usage policy, which stopped being hypothetical the week Hugging Face\'s responders had to complete their forensics on a self-hosted model because commercial frontier models refused the analysis.',
      '《Kimi K3 开放权重，但这不等于便宜、本地或不受限》——Moonshot 在 7 月 27 日把 2.8 万亿参数做成免费下载，同时把自家 API 定价定到所取代前代的约三到四倍，而没有任何单块 H100、H200 或 B200 装得下那 1.4 TB 的 MXFP4 权重。本文拆开人们从「开放权重」里听到的三个主张，并论证只有第三个成立：不受另一家公司使用政策约束——而就在商用前沿模型拒绝分析、Hugging Face 的响应人员只能在自托管模型上完成取证的那一周，这一点不再是假想。',
    ),
    L(
      'Both posts ship bilingual with eight themeable SVGs — the eight-stage breach path, a control-versus-stage containment matrix, an isolated evaluation range, K3\'s sparse routing and memory footprint, and a price comparison against K2.6.',
      '两篇均为中英双语，并配有八幅可随主题变色的 SVG——八阶段入侵路径、控制项对阶段的围栏矩阵、隔离评测靶场、K3 的稀疏路由与内存占用，以及与 K2.6 的价格对比。',
    ),
  ],
};
export default entry;
