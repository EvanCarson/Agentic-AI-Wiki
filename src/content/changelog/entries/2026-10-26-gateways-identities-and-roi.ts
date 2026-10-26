import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-26',
  title: L(
    'Two AI Blog posts, two new pages, and the agent-ROI page rebuilt',
    '两篇博客、两个新页面，智能体投资回报页重写',
  ),
  items: [
    L(
      'AI Blog: "The store opened, the wallet stayed shut" — Walmart\'s Agent Gateway, announced 21 October 2026, is an MCP server that lets an approved agent search inventory and buy at Walmart and Sam\'s Club, and never hands it card details or the ability to add or change a payment method. Read the grant as verbs and it is two, not three: search and buy, never hold. The returns path confirms it — Walmart\'s ordinary returns process applies even when an agent does not act as intended, which is a cost allocation you can only make if the transaction stayed on your own rails. Amazon drew the opposite line with the same technology (Muse cut off in September 2026, Perplexity sued over Comet in November 2025), which is how you know the decision was commercial. Three things are still unsettled: attribution of intent, what an agent may do with the prices it sees, and rate limits written for browsers.',
      'AI 博客：《店门开了，钱包没开》——沃尔玛在 2026 年 10 月 21 日公布的 Agent Gateway 是一台 MCP 服务器，允许获批的智能体在沃尔玛与山姆会员店搜索库存并下单，却从不把卡片信息、或新增与更改支付方式的能力交给它。把这份授权读成动词，它只有两个而不是三个：搜索、购买，绝不持有。退货这条路印证了同一点——即便智能体行为不符预期，适用的仍是沃尔玛的普通退货流程；而这种成本归属，只有在交易始终留在自己轨道里时才做得出来。亚马逊用同样的技术画出了相反的线（2026 年 9 月切断 Muse，2025 年 11 月因 Comet 起诉 Perplexity）——由此可知这个决定是商业性的。还有三件事没定下来：意图的归属、智能体可以拿它看到的价格做什么，以及为浏览器写的那些限流。',
    ),
    L(
      'AI Blog: "Entra Agent ID vs Okta Agent SSO vs Gemini Enterprise vs 1Password for Agents" — four products give an agent a name, and a name is not a leash. The separating question is what the agent still holds after you revoke. Okta (GA 24 August 2026, no extra cost on core SSO plans) mints an ID-JAG per audience — RFC 8693 token exchange plus the RFC 7523 JWT bearer grant, token_type N_A — so policy is re-evaluated at every mint. Entra gives every agent a directory object free (GA April 2026) but routes agent Conditional Access through Agent 365 at USD 15 per user per month. Gemini Enterprise hands a persistent agent a Workspace account and per-agent audit trail, in private preview, and leaves subagent revocation unstated. 1Password for Agents issues no principal at all and never lets the agent read the secret — and is sold to consumers, not enterprises. Three products answer "who called"; one answers "what can leak"; nobody sells both.',
      'AI 博客：《Entra Agent ID 对比 Okta Agent SSO 对比 Gemini Enterprise 对比 1Password for Agents》——四款产品给智能体一个名字，而名字不是牵绳。真正区分它们的问题是：吊销之后智能体手上还握着什么。Okta（2026 年 8 月 24 日正式可用，核心 SSO 方案内不额外收费）按受众签发 ID-JAG——RFC 8693 令牌交换加 RFC 7523 的 JWT bearer 许可，token_type 为 N_A——于是策略在每次签发时都被重新评估。Entra 免费给每个智能体一个目录对象（2026 年 4 月正式可用），却把面向智能体的条件访问导向每用户每月 15 美元的 Agent 365。Gemini Enterprise 在私有预览里给长期智能体一个 Workspace 账号与逐智能体的审计轨迹，而子智能体如何吊销未作说明。1Password for Agents 压根不签发主体，也从不让智能体读到那个秘密——而它卖给的是消费者，不是企业。三款回答「是谁打来的」，一款回答「什么会泄漏」；没有人把两者一起卖。',
    ),
    L(
      'New Deep-Dive, Enterprise-Managed Authorization (MCP, C15): the first MCP auth mode where revoking an agent actually stops it — the enterprise IdP mints a per-server ID-JAG and refuses the next exchange once policy says no. The whole benefit is the lifetime of the access token you mint after that exchange, so a server that issues an eight-hour token has rebuilt the standing grant with extra ceremony: mint minutes, issue no refresh token, validate against the IdP\'s JWKS, and key tenancy on sub rather than the mutable email claim. The page is explicit that EMA authorises the connection and never the tool call, and that the dependency moves — with no stored grant to fall back on, an IdP outage is fail-closed by construction.',
      '新增深入解析《企业托管授权》（MCP，C15）：MCP 里第一种「吊销了就真的停下来」的鉴权模式——企业 IdP 按服务器签发 ID-JAG，策略一旦说不就拒掉下一次交换。全部收益落在交换之后你签出的那枚访问令牌活多久，所以签出八小时令牌的服务器，等于用一套额外仪式重建了那份常驻授权：按分钟签、不签刷新令牌、对着 IdP 的 JWKS 验签、用 sub 而不是可变的 email claim 来做租户关联。本页明确指出 EMA 授权的是连接、从不是那一次工具调用；并且依赖关系会搬家——没有存好的授权可以兜底，IdP 故障在结构上就是失败即拦截。',
    ),
    L(
      'New Operations page, Platform Terms for Agent Access (Governance & Compliance, C27): a platform can end your agent\'s business with a terms update and no code change on either side, so follow the payment instrument to find the real enforcement boundary. Three deliverables: a one-page dependency table whose grant column separates approved from merely-working-today, an authorisation-shaped failure metric that stops instead of retrying (generic retry logic turns a block into a retry storm against a platform that just told you to stop), and a degradation path that hands the user back a real cart rather than faking progress. Being easy to approve is engineering work you can do unilaterally: identify the agent, keep the consent record, honour the published rate.',
      '新增运维页《平台对智能体访问的条款》（治理与合规，C27）：一个平台只需更新一次条款、双方都不改代码，就能终结你智能体的业务；所以顺着支付工具去找真正的强制边界。三件要交付的东西：一页依赖表，其 grant 列把「已获认可」与「今天只是还能跑」分开；一个「触发即停而非重试」的鉴权形状失败指标（笼统的重试逻辑会把一次封禁变成对刚刚叫你停下的平台的重试风暴）；以及一条把真实购物车还给用户、而不是假装有进展的降级路径。「容易被批准」是你可以单方面做掉的工程活：标明智能体身份、保留同意记录、遵守公布的速率。',
    ),
    L(
      'Rebuilt Operations page, Measuring Agent ROI (B4), 788 → ~1,440 words: it now argues that what is scarce is measurement, not value. McKinsey\'s 25 August 2026 survey (1,719 respondents, 97 nations, fielded 4 May – 8 June) found 37% of organisations reporting positive EBIT impact — the same 37% as a year earlier, while agent scaling at firms above $1bn revenue went from 27% to 40%. The MIT NANDA 95% is a measurement statistic read as a failure statistic, and its own authors note it partly reflects missing data. One worked quarter scores +6.0% or −26.9% on a single number: the deflection rate of the existing help article, which stops being observable the day the agent goes live. Adds the holdout recommendation, the pre-registered metric, and the three things to get countersigned before launch.',
      '重写运维页《衡量智能体投资回报》（B4），788 → 约 1,440 词：它现在论证的是——稀缺的是度量，不是价值。麦肯锡 2026 年 8 月 25 日的调查（1,719 名受访者、97 个国家、调研期 5 月 4 日至 6 月 8 日）发现 37% 的组织报告了正面的 EBIT 影响——与一年前的 37% 分毫不差，而同期收入十亿美元以上的企业中铺开智能体的比例从 27% 升到 40%。MIT NANDA 的 95% 是一个被当成失败统计来读的度量统计，而其作者本人也指出它部分反映的是数据缺失。文中那个季度的算例，算出来是 +6.0% 还是 −26.9%，只差一个数：那篇既有帮助文档的拦截率——而它在智能体上线那天就不再可被观测。新增了留存组建议、预先登记的指标，以及上线前需要连署的那三件事。',
    ),
  ],
};

export default entry;
