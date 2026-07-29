import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-29',
  title: L(
    'Two AI Blog posts on search APIs and AI gateways, plus four new pages',
    '两篇 AI 博客——搜索 API 与 AI 网关——外加四个新页面',
  ),
  items: [
    L(
      'Blog — Exa vs Tavily vs Brave Search vs Firecrawl. List prices across agent search APIs cluster at $5–8 per thousand queries, so the sticker is the least interesting number; what differs by roughly 40× is how many tokens each returns per result, and in an agent loop that re-sends its transcript every step, that is the actual bill. Includes architecture diagrams for all four, a context-cost chart, and a capability matrix.',
      '博客《Exa、Tavily、Brave Search 与 Firecrawl》——面向智能体的搜索 API，标价都挤在每千次查询 5–8 美元，所以标价是最没意思的那个数字；真正相差约 40 倍的，是每条结果返回多少令牌，而在一个每步都重发对话记录的智能体循环里，那才是真账单。附四者的架构图、上下文开销图表与能力矩阵。',
    ),
    L(
      'Blog — LiteLLM vs Portkey vs Cloudflare AI Gateway vs Kong AI Gateway. Every gateway leads with automatic cross-provider failover, which is the weakest reason to buy one: the fallback is a silent deploy onto a model with different tool-calling semantics and refusal behavior, firing for the first time during an incident. Argues you should choose on who operates the hop, and notes that published latency-overhead figures for the same products disagree by an order of magnitude.',
      '博客《LiteLLM、Portkey、Cloudflare AI Gateway 与 Kong AI Gateway》——每个网关都主打自动跨厂商故障转移，而那恰恰是买它的最弱理由：备选是一次静默部署，落到一个工具调用语义与拒答行为都不同的模型上，且在事故中才第一次执行。文章主张按"谁来运维这一跳"来选，并指出关于同一批产品的公开延迟开销数字彼此相差一个数量级。',
    ),
    L(
      'Concepts — Reproducibility & Nondeterminism. Temperature 0 is a sampling rule, not a guarantee: inference servers batch your request with other people\'s, and many kernels change their reduction strategy with batch size, so identical greedy requests return different text. The consequence for agents is that a failing run cannot be debugged by re-running it, so reproducibility has to be built out of records rather than re-execution.',
      '概念《可复现性与非确定性》——temperature 0 是一条采样规则而非一份保证：推理服务器会把你的请求和别人的打成一批，而许多算子会随批大小改变归约策略，于是相同的贪心请求会返回不同文本。对智能体的后果是，一次出错的运行没法靠重跑来调试，所以可复现性必须建在记录之上，而不是重新执行之上。',
    ),
    L(
      'Playbooks — Code Review Agents. A review bot lives or dies on precision, not recall, because a false positive costs a little bit of every future finding. Covers diff-anchored context expansion, the three inputs a human reviewer has that a diff does not, an adversarial gate that drops any finding without a concrete failure scenario, a hard comment budget ranked worst-first, and acted-upon rate as the one production metric.',
      '实战手册《代码评审智能体》——评审机器人的生死取决于精确率而非召回率，因为一条误报会给往后每一条发现都打个折。文中讲了以 diff 为锚的上下文扩展、人类评审者有而 diff 没有的三样输入、把说不出具体失败场景的发现一律丢弃的对抗性闸门、按最坏优先排序的硬性评论预算，以及作为唯一生产指标的采纳率。',
    ),
    L(
      'Playbooks — Hiring & Recruiting Agents. The one agent domain where regulators specified the architecture first: NYC Local Law 144 and EU AI Act Annex III both demand a countable, attributable per-candidate decision, which is exactly what a free-text "strong fit, 8/10" design cannot produce at audit time. Argues for keeping the model on the widening side of the funnel, and covers why résumé blinding does not remove the inference.',
      '实战手册《招聘智能体》——监管者先一步指定了架构的唯一智能体领域：纽约市第 144 号地方法与欧盟《AI 法案》附件三都要求一个可数、可归因的按候选人决策，而这恰恰是自由文本式"匹配度强，8/10"的设计在审计时拿不出来的东西。文章主张把模型留在漏斗拓宽的一侧，并讲了为什么简历去标识并不能消除推断。',
    ),
    L(
      'Operations — Rate Limits & Provider Capacity. A 429 is a capacity contract, not a transient error, and the standard back-off-and-retry loop turns a 20% shortfall into a total outage. Covers why agents blow the tokens-per-minute bucket long before the requests-per-minute one, a shared admission-control token bucket sized below your real quota, deliberate load shedding by request class, and treating cross-provider failover as a behavior change your evals must cover.',
      '运维《速率限制与厂商容量》——429 是一份容量合同而非瞬时故障，而那套标准的退避重试循环会把 20% 的缺口变成彻底宕机。文中讲了智能体为何早在撞上每分钟请求数之前就先撞爆每分钟令牌数、一个容量低于真实配额的共享准入控制令牌桶、按请求类别有意识地卸载负载，以及把跨厂商故障转移当作评估必须覆盖的行为变更。',
    ),
  ],
};

export default entry;
