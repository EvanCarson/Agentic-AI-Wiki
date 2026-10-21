import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-21',
  title: L(
    'Two AI Blog posts, a credits runbook, a voicemail playbook, and progressive autonomy rebuilt',
    '两篇博客、一份额度手册、一份语音信箱手册，渐进式自主重写',
  ),
  items: [
    L(
      'AI Blog: "The unattended ceiling went up 288x and the model did not change" — Notion took the longest single unattended agent task from five minutes to more than 24 hours on 19 October 2026, and every mechanism it names is runtime engineering: a dedicated service with a queue-backed worker loop that survives restarts, condensed conversations, large tool results set aside. A ceiling is not a success rate, the three mechanisms send three different bills (idempotency, fidelity, a reviewer model\'s false-negative rate), and the vendor\'s own two statements of the new figure differ — "up to" versus "more than" 24 hours.',
      'AI 博客：《无人监督的上限涨了 288 倍，而模型没换》——Notion 在 2026 年 10 月 19 日把智能体处理单个任务的最长无人监督时长从 5 分钟提到 24 小时以上，而它点名的每个机制都是运行时工程：专属服务上能扛住重启的队列驱动工作循环、被压缩的会话、被搁置的大体积工具返回结果。上限不是成功率；三个机制寄来三张不同的账单（幂等性、保真度、审核模型的假阴性率）；而厂商自己对新数字的两处表述并不一致——"最长"24 小时与"24 小时以上"。',
    ),
    L(
      'AI Blog: "The model moved onto the laptop; the trust boundary did not" — Perplexity Computer now runs its model, planning and file processing entirely on an Apple-silicon Mac (20 October 2026, Pro/Max/Enterprise, 36 GB unified memory recommended, local tasks not charged). That answers data residency and leaves all three exfiltration conditions in place: Mail and Messages are still read on permission, your files are still on the disk, and an approved cloud route is still in the same app. Four of six operational controls — request log, kill switch, egress control, central audit — move to where no security team reads them.',
      'AI 博客：《模型搬进了笔记本，信任边界没有跟着搬》——Perplexity Computer 现在可以把模型、规划与文件处理全部跑在 Apple 芯片的 Mac 上（2026 年 10 月 20 日，面向 Pro/Max/Enterprise，建议 36 GB 统一内存，本地任务不计费）。这回答了数据驻留，却把外泄所需的三个条件全部留在原处：邮件与信息仍在获许后被读取、你的文件仍在磁盘上、一条已授权的云端路径仍在同一个应用里。六项运维控制里有四项——请求日志、紧急停止、出口管控、集中审计——搬到了安全团队读不到的地方。',
    ),
    L(
      'New Operations page, Agents Priced in Credits (B22): a credit with no peg to a currency is not a price, it is an exchange rate the vendor can reset without touching the rate card. Notion gives Business and Enterprise seats 1,500 routed plus 500 user-choice credits a month, with no rollover, no pooling and no published conversion, while its own router decides the burn — so the supplier sets price and quantity both. GitHub went the other way on 1 June 2026 and pegged one AI Credit to one cent. Measure credits per completed task, size each seat against its own peak, and ask in writing what can change the number.',
      '新运维页「按额度计费的智能体产品」（B22）：没有与货币挂钩的额度不是价格，而是供应商可以随时重设、却不必碰价目表的汇率。Notion 给 Business 与 Enterprise 席位每月 1,500 个路由额度加 500 个自选额度，不结转、不共享池、不公布换算率，而决定消耗量的是它自己的路由器——于是单价与数量都由供货方说了算。GitHub 在 2026 年 6 月 1 日走了反方向，把 1 个 AI Credit 钉在 1 美分上。请测「每完成一次任务消耗多少额度」、按每个席位自己的峰值配额，并以书面形式问清什么会改变这个数字。',
    ),
    L(
      'New Playbooks page, Voicemail & Answering-Machine Detection (V22): gating the agent\'s first word on a detection verdict is an abandoned call by construction — Twilio\'s FAQ puts default AMD at about four seconds after answer, and the US rule gives you two seconds after the called party\'s completed greeting, capped at 3% of live-answered calls per 30-day campaign. With live contact in the single digits per dial, you pay that silence on the only calls worth having. Speak on answer with detection as a concurrent event stream, write a four-second opener that survives as a truncated voicemail, and treat the drop as a second permission: the FCC ruled in November 2022 that ringless voicemail to a wireless number is a call needing consent.',
      '新实战手册页「语音信箱与应答机检测」（V22）：把智能体的第一句话卡在检测结果之后，在构造上就是一次被放弃的呼叫——Twilio 的 FAQ 把默认 AMD 写成接通后约四秒，而美国规则只给你被叫方说完问候语后的两秒，上限为每 30 天活动期内已被真人接起呼叫的 3%。在每次拨号接通真人只有个位数百分比的情况下，这段静默恰恰花在唯一值得的那些呼叫上。请接通即开口、把检测作为并发事件流，写一段被截断也能当语音信箱用的四秒开头，并把留言当作第二项许可：FCC 在 2022 年 11 月裁定，投给无线号码的无铃声语音信箱属于需要同意的呼叫。',
    ),
    L(
      'Rebuilt Playbooks page, Progressive Autonomy (H5), 695 → ~2,230 words: it now argues that the ladder you design is per scope while every shipping harness\'s dial is per session — Claude Code has six session-global permission modes as of October 2026 and Codex CLI crosses three sandbox modes with a separate approval policy, and none of them can say Observer for labelling tickets and Operator for refunds at once. So the rung lives in the credential scope and the per-call allow/deny policy, and the mode selector only decides who gets asked. Adds the classifier rung now shipping (Notion\'s reviewer model, Claude Code\'s auto, risk-scaled controls) and the warning that comes with it, the one-way property real harnesses already enforce, and a worked expected-value calculation for whether to climb at all.',
      '重写实战手册页「渐进式自主」（H5），695 → 约 2,230 词：现在它论证的是——你设计的梯级按作用域，而每个已发货 harness 的旋钮都按会话。截至 2026 年 10 月，Claude Code 有六种会话级全局权限模式，Codex CLI 把三种沙箱模式与一条独立审批策略交叉组合，而它们没有一个能同时说出「打标签时可观察者、退款时只操作员」。所以梯级住在凭据作用域与按次调用的允许/拒绝策略里，模式选择器只决定「该问谁」。新增了已经发货的分类器梯级（Notion 的审核模型、Claude Code 的 auto、按风险缩放的控制）及随之而来的警告、真实 harness 已经在强制的单向性质，以及一份「到底要不要往上爬」的期望值算例。',
    ),
  ],
};

export default entry;
