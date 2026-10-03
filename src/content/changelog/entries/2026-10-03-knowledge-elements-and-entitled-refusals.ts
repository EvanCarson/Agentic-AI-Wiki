import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-03',
  title: L(
    'Two AI Blog posts — one on the week in which the FTC, its chair and a bipartisan bill all relocated agent liability to whoever gave the instruction, leaving the labs’ own safety disclosures as the dated proof of what they knew, one on Gemini 4 Argon shipping its cyber guardrails as an entitlement so that two callers of one model string get different policies — plus three pages on the approval window you can measure with a wall clock, the prompt supply chain a saved instruction installs, and the quality regression that shows up as a cost win',
    '两篇 AI 博客——一篇讲这一周里 FTC、它的主席与一项两党法案如何齐齐把智能体责任挪到「下指令的那一方」头上，而把实验室自家的安全披露留成了「他们知道什么」的带日期证明；一篇讲 Gemini 4 Argon 把网络安全护栏做成了一项授权，于是同一个模型字符串的两个调用者会拿到不同的策略——外加三个页面：那个能用挂钟量出来的批准窗口、一条被保存下来的指令所安装的提示词供应链，以及那个会表现为降本胜利的质量回退',
  ),
  items: [
    L(
      'AI Blog — “The safety disclosure is the knowledge element”: the AI Agent Accountability Act announced on 1 October would reach a developer that knew or had reason to know of its agent’s hacking capability — and OpenAI published exactly that on 1 September, naming its new model the first to meet the Critical cybersecurity threshold of its own Preparedness Framework. Reads the FTC’s 30 September probe of OpenAI, Anthropic and METR against Ferguson’s refusal to treat agents as actors, shows that the same documents construct the operator’s constructive knowledge too, and scores the five evidentiary artefacts a recklessness defence needs against what a thirty-day sampled trace store can actually produce. Notes that the bill still has no number, no referral and no text.',
      'AI 博客《那份安全披露，就是「明知」要件》：10 月 1 日宣布的《AI 智能体问责法案》将伸向「明知或理应知道其智能体具备入侵能力」的开发方——而 OpenAI 在 9 月 1 日恰好把这件事公开写下，称其新模型是首个达到自家《准备框架》「关键级」网络安全门槛的模型。文中把 FTC 9 月 30 日对 OpenAI、Anthropic 与 METR 的调查，放到 Ferguson 拒绝把智能体当作行为人的立场旁边来读，说明同一批文件也替运营方构建了推定「明知」，并给「为恣意指控辩护」所需的五件证据性材料对着「一个三十天、抽样的链路存储究竟拿得出什么」打了分。文中也记下：该法案仍然没有编号、没有归口、没有文本。',
    ),
    L(
      'AI Blog — “Same weights, different refusals”: Google released Gemini 4 Argon on 30 September to Fairwind-vetted defenders with the cyber guardrails switched off, enforced by org verification, phishing-resistant MFA, team-scoped access and per-employee usage records — the first version of capability gating that could actually hold, since an entitlement cannot be rephrased the way a refusal can. The cost is that a model identifier no longer names a behaviour, so eval results, questionnaire answers and benchmark comparisons are keyed to a string that now means two policies, and Google publishes no diff. Also does the arithmetic on the 1M output cap: one cap-filling response costs $10 at the introductory rate and $20 after it.',
      'AI 博客《同样的权重，不同的拒答》：谷歌在 9 月 30 日把 Gemini 4 Argon 交给 Fairwind 审核通过的防御方，并关掉了网络安全护栏；约束靠组织资质核验、抗钓鱼 MFA、按团队限定的访问与按员工的使用记录——这是能力门控第一次做成了可能真正守得住的样子，因为一份授权没法像一次拒答那样被话术改绕。代价是：一个模型标识符不再指称一种行为，于是评测结果、问卷答复与基准对比，都锚在一个如今意味着两套策略的字符串上，而谷歌没有公布任何差异说明。文中也算了 100 万输出上限那道账：一次把上限填满的回复，入门价下是 10 美元，入门期之后是 20 美元。',
    ),
    L(
      'New Deep-Dive (Agent Security) — Time-of-Check to Time-of-Use: the classic race condition with the window stretched from microseconds to minutes, dominated by the eleven minutes a human spent on the approval card — so the configuration everyone calls safest has the widest staleness exposure, and a second reviewer looking at the same snapshot agrees perfectly and is also wrong. Separates the four things that drift (resource, policy, authority, goal), gives the bound-write pattern with version, policy-bundle, on-behalf-of and intent-digest preconditions and four distinguishable outcomes, and reduces “is this my problem?” to window × mutation rate × volume.',
      '新深入解析（智能体安全）《检查时刻到使用时刻》：那个经典竞态条件，窗口从微秒被拉到分钟，而主导它的是人类在批准卡片上花掉的那十一分钟——于是人人口中最安全的那种配置，恰恰拥有最宽的过期暴露面；而第二位复核者看着同一张快照，会完美地与第一位达成一致，并且同样是错的。文中把会漂移的四样东西（资源、策略、权限、目标）分开，给出带版本、策略包、代为行事与意图摘要前置条件、且有四种可区分结果的「绑定式写入」模式，并把「这到底是不是我的问题」化简为「窗口 × 变更速率 × 量」。',
    ),
    L(
      'New Playbook (Agent UX & Human Interaction) — User-Authored Skills: the feature looks like a text box and ships like a package manager, and Google proved the demand by replacing Gems with Skills across Gemini in October 2026. Argues invocation should stay explicit because users name skills for their own recall rather than for a retriever, that stacking makes precedence a shipped behaviour whether or not you designed it, that a skill must render at the invoking user’s authority or a textarea becomes a privilege-escalation path, and that the Gems retirement schedule — November 2026 to June 2027, staggered by re-testing cost — is the migration template to copy.',
      '新实战手册（智能体 UX 与人机交互）《用户自撰技能》：这个功能看着像一个文本框、上线起来像一个包管理器；而谷歌 2026 年 10 月在整个 Gemini 上用 Skills 取代 Gems，本身就证明了需求。文中论证：调用应当保持显式，因为用户是为自己的记忆、而不是为检索器来给技能命名；叠加让「优先级」成为一项已上线的行为，无论你是否设计过它；一个技能必须以调用者的权限来渲染，否则一个文本域就变成了一条权限提升路径；而 Gems 的退役排期——2026 年 11 月到 2027 年 6 月，按重新测试的代价错开——正是值得照抄的迁移模板。',
    ),
    L(
      'New Operation (Evaluation & Observability) — Refusal Monitoring in Production: a refusal returns 200, runs faster, costs fewer output tokens and raises no error, so a material quality regression presents as cost down, latency down, errors flat and evals green — a combination indistinguishable from an optimisation win. Sorts four terminal non-completions by owner so that “refusals are up 3%” becomes attributable, moves measurement to the step level because an agent’s refusal is a vanished plan step inside a run that reported success, pairs a cheap classifier with a 200–400 prompt frozen canary set, and holds false-refusal share next to the rate because the two correlate.',
      '新运维页（评估与可观测性）《生产环境中的拒答监控》：一次拒答返回 200、跑得更快、花更少输出令牌、也不触发任何错误，于是一次实质的质量回退表现为「成本下降、延迟下降、错误持平、评测全绿」——这个组合与一场优化胜利无从区分。文中按责任人把四种终止未完成情形分好类，好让「拒答涨了 3%」变得可归因；把测量挪到步骤层面，因为智能体的拒答是一个从「报告成功」的运行里消失掉的计划步骤；把一个便宜的分类器与一套 200 到 400 条提示的冻结金丝雀集配成一对；并在率的旁边一起握住误拒占比，因为这两者是相关的。',
    ),
  ],
};

export default entry;
