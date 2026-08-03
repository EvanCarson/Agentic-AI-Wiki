import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-08-03',
  title: L(
    'Two AI Blog posts on embedding-model lock-in and the Atlas shutdown, plus five pages on multi-tenancy, quality regressions, voice evaluation, shopping agents and content moderation',
    '两篇 AI 博客——嵌入模型的锁定效应与 Atlas 关停——外加五个页面：多租户、质量回归、语音评估、购物智能体与内容审核',
  ),
  items: [
    L(
      'New blog post — *OpenAI vs Cohere vs Voyage vs Qwen3: The Model You Cannot Cheaply Un-Choose*. Vectors from two models sit in different spaces, so switching an embedding model re-embeds the corpus, rebuilds the index and invalidates every retrieval baseline — there is no gradual migration and no A/B test cheaper than the migration. The argument is that this makes the deciding numbers bytes per vector and lifecycle control rather than leaderboard rank: at default settings the same twenty-million-chunk corpus is 328 GB under Qwen3-Embedding-8B and 41 GB under voyage-3.5 at int8, and an API embedding model is the one deprecation you cannot ride out with a version pin. Three themeable SVGs including a bytes-per-vector chart and a re-embed architecture diagram.',
      '新博客文章——《OpenAI、Cohere、Voyage 与 Qwen3：那个换不起的模型》。两个模型产出的向量身处不同空间，因此更换嵌入模型意味着重嵌语料、重建索引，并让所有检索基线作废——既没有渐进迁移，也没有哪个 A/B 试验比迁移本身更便宜。文章主张：这让定案的数字变成每条向量占多少字节与生命周期由谁掌控，而不是排行榜名次——按默认设置，同一份两千万块的语料在 Qwen3-Embedding-8B 下是 328 GB，在取 int8 的 voyage-3.5 下是 41 GB；而 API 上的嵌入模型，是唯一一种你无法靠版本锁定熬过去的弃用。配三张可随主题变色的 SVG，含一张每向量字节数图与一张重嵌架构图。',
    ),
    L(
      'New blog post — *Atlas Shuts Down on 9 August. Agentic Browsing Just Split Into Three.* OpenAI retires the browser it launched on 21 October 2025, and the capability moves into a Chrome extension, the desktop app\'s in-app browser and a server-side cloud browser. The argument is that this is not a retreat but a separation along the only axis that ever mattered — whose authenticated session the agent borrows — and that the migration path names the asset, since bookmarks go to Chrome while cookies and passwords are kept. Reads the three surfaces as three security architectures with different injection blast radii, and notes that nine months of work never reached Windows, iOS or Android. Three SVGs including a surface comparison matrix.',
      '新博客文章——《Atlas 将于 8 月 9 日关停：智能体浏览就此一分为三》。OpenAI 关掉了它在 2025 年 10 月 21 日发布的浏览器，而这项能力迁进了一个 Chrome 扩展、桌面应用的应用内浏览器与一个服务端云浏览器。文章主张这不是撤退，而是沿着唯一真正要紧的那根轴分开——智能体借用的是谁的已登录会话；而迁移路径本身点了名：书签交给 Chrome，Cookie 与密码却被留下。文中把这三个形态读作三套安全架构，各有不同的注入爆炸半径，并指出九个月的工作始终没能覆盖 Windows、iOS 或 Android。配三张 SVG，含一张形态对照矩阵。',
    ),
    L(
      'New Operation (AgentOps) — *Multi-Tenancy for Agents*. Your row-level policy does not reach the five stores an agent adds, and the provider\'s own isolation is drawn around your account rather than around your tenants. Separates what a prefix cache can and cannot leak — it cannot hand over content, since a hit needs a byte-identical prefix, but a hit is observable in latency and usage — from the semantic cache, which decides a hit by similarity and can therefore return tenant A\'s answer to tenant B. Also covers why a metadata filter is not a namespace in an approximate index, why memory summarisation must never be batched across tenants, and the two-tenant canary suite that turns all of this from a policy into a test.',
      '新增运维页（智能体运维）——《智能体的多租户》。你的行级策略够不着智能体新添的那五个存储，而厂商自己的隔离画在你的账号周围，不是画在你的租户周围。文中把前缀缓存能与不能泄漏什么分辨清楚——它交不出内容，因为命中要求前缀逐字节相同，但命中会通过延迟与用量被观察到——并把它与语义缓存区分开：后者靠相似度判定命中，因而会把租户 A 的答案返回给租户 B。文章还讲了在近似索引里元数据过滤为何不等于命名空间、记忆总结为何绝不能跨租户批处理，以及那套把这一切从一项策略变成一个测试的双租户金丝雀套件。',
    ),
    L(
      'New Operation (Evaluation & Observability) — *Detecting Quality Regressions*. Production has no labels, and a judged metric needs roughly 1,400 scored runs to see a drop from 90% to 85% — a fortnight at a realistic sampling rate. The argument is that the detector should be the geometry of the trajectory rather than the text of the answer: step-cap rate, per-tool error rate, retry rate and termination-reason mix move within an hour, cost nothing, and need no ground truth, while the judge is reserved for confirmation and stratified by the anomaly rather than sampled uniformly. Also covers invariants that can gate a merge, and the scheduled canary suite that catches the provider update nobody told you about.',
      '新增运维页（评估与可观测性）——《质量回归检测》。生产环境没有标签，而一个靠评判的指标要看清从 90% 掉到 85% 需要约 1,400 次打分运行——按现实的抽样率就是两周。文章主张探测器应当是轨迹的几何形状而非答案的文本：撞步数上限的比例、按工具的报错率、重试率与终止原因构成会在一小时内偏移、不花钱、也不需要基准真值；而评判者留作确认，并按异常分层抽样而不是均匀抽样。文中还讲了能拦住合并的那些不变量，以及那套能抓住"没人通知你的厂商更新"的定时金丝雀套件。',
    ),
    L(
      'New Playbook (Voice & Realtime Agents) — *Evaluating Voice Agents*. A transcript is a lossy render that discards exactly what breaks voice agents: dead air, the ignored barge-in, the postcode heard as a different postcode. So the evaluation unit is an audio file — golden sets built from recorded calls rather than scripts, entity error rate on the fields that decide the outcome rather than word error rate, and timing scored as a first-class metric with cut-off rate, hang time and dead-air incidents counted rather than averaged. Ends on the harness problem: four vendors in the stack can each change without telling you.',
      '新增实战手册（语音与实时智能体）——《评估语音智能体》。文字记录是一次有损渲染，它恰好丢掉了那些会毁掉语音智能体的东西：空气死寂、被无视的打断、被听成另一个的邮编。因此评估单位是一个音频文件——黄金集用录下来的通话而不是脚本来搭，用决定结果的那些字段上的实体错误率而不是词错误率，并把时序当作一等公民指标来打分：抢话率、悬空时间与空气死寂次数按次数计而不是取平均。文末落在框架问题上：栈里有四家供应商，每一家都可能不通知你就变。',
    ),
    L(
      'New Playbook (Domain Playbooks) — *Shopping & Checkout Agents*. OpenAI launched Instant Checkout on 29 September 2025 and pulled it back on 4 March 2026 with fewer than fifteen Shopify merchants live — not because payments were unsolved, but because product data was. The playbook takes that as its premise: discovery in the agent, transaction on the merchant\'s own checkout, every purchasable claim carrying a source and timestamp, a re-fetch and diff immediately before the irreversible step, and delegated authority proved through a signed record rather than a card number. Also covers the merchant side, where the problem is telling an authorised agent from a scraper, and why conversion is the metric that most rewards an agent behaving badly.',
      '新增实战手册（领域实战手册）——《购物与结账智能体》。OpenAI 于 2025 年 9 月 29 日推出 Instant Checkout，又在 2026 年 3 月 4 日把它收回，彼时上线的 Shopify 商家不足十五家——不是因为支付没解决，而是因为商品数据没解决。手册以此为前提：发现在智能体里、交易在商家自己的结账流程上，每一条与购买相关的断言都带来源与时间戳，在不可逆步骤之前立刻重新拉取并做差异比对，并用一份签名记录而不是一个卡号来证明被委派的权限。文中还讲了商家一侧——那里的问题是把授权智能体与爬虫区分开——以及为何转化率是最奖励智能体行为不端的那个指标。',
    ),
    L(
      'New Playbook (Domain Playbooks) — *Content Moderation Agents*. The published guidelines are a summary of a decade of unwritten precedent, so a policy-in-the-prompt agent is confident and correct on the easy cases that never needed a model, and confidently wrong on exactly the ones humans escalate. Argues for retrieval over decided cases with mandatory citation of the precedent followed, works the base-rate arithmetic that turns 95% recall and 99.5% specificity into 27.6% precision and a queue that is 72% clean, and treats overturned appeals as the only free labels and the only window onto false positives. Closes on the legal shape of the output: a statement of reasons derived from the decision, and a complaint path not decided solely by automated means.',
      '新增实战手册（领域实战手册）——《内容审核智能体》。公开准则只是十年间未成文判例的一份摘要，因此一个把政策塞进提示词的智能体，在本来就用不着模型的简单案子上既自信又正确，却恰恰在人类要上报的那些案子上自信地答错。文章主张改为在已决案例上做检索，并强制引用所遵循的先例；把基础发生率的算术做了一遍——95% 召回率与 99.5% 特异度会变成 27.6% 的精确率和一条 72% 都没问题的队列；并把被推翻的申诉当作唯一免费的标签与望向误判的唯一窗口。文末落在输出的法律形状上：一份由决定推导而来的理由告知，以及一条不得仅依靠自动化手段作出决定的投诉路径。',
    ),
  ],
};

export default entry;
