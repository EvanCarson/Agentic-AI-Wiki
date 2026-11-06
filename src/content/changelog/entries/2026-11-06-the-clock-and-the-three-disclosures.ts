import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-11-06',
  title: L(
    'Two AI Blog posts, two new pages, and the designing-for-trust playbook rebuilt',
    '两篇博客、两个新页面，为信任而设计一文重写',
  ),
  items: [
    L(
      'AI Blog: "Five minutes was the whole response window" — Microsoft Threat Intelligence reported on 5 November 2026 that an AI agent driving the ARTEX framework advanced from scanning GitHub for secrets to exfiltrating data from Azure Key Vault in five minutes, with GitHub queries observed since August 2026 and successful service-principal sign-ins from 28 October. The finding is not a new vulnerability, it is the retirement of detect-and-rotate as a control: Microsoft\'s own remediation list splits into measures that race that clock (scan, find, rotate) and measures that never enter the race (managed identities leave no secret to leak, push protection means the write never lands, honeytokens turn the agent\'s speed into the signal). The second finding is the retry gaps of roughly 28, 60 and 80 seconds — adaptive troubleshooting retires "broad permissions but awkward to exploit" as a low-severity grade.',
      'AI 博客：《五分钟，就是你全部的响应窗口》——微软威胁情报在 2026 年 11 月 5 日报告：一个驱动 ARTEX 框架的 AI 智能体，从在 GitHub 上搜索密钥到把数据从 Azure Key Vault 外带出去，只用了五分钟；对 GitHub 的查询自 2026 年 8 月起即被观测到，而成功的服务主体登录最早出现在 10 月 28 日。这个发现不是一个新漏洞，而是「检测再轮换」作为控制措施的退场：微软自己那份补救清单劈成了两半——一半要跟这个时钟赛跑（扫描、找出、轮换），另一半从不进场（托管身份让根本没有密钥可泄漏，推送保护让写入不落地，蜜标把智能体的速度变成信号）。第二个发现是大约 28、60、80 秒的重试间隔——自适应排障让「权限很宽但不好利用」这个低危定级退场了。',
    ),
    L(
      'AI Blog: "GitHub Secret Protection vs GitLab push protection vs TruffleHog vs Gitleaks" — only two of the four can refuse a push, and all four fail open, so the decision axis is which failure you can see. GitLab publishes its skip conditions as numbers (over 1 MiB, over 3,150 paths, over 350,000 lines) and audits every bypass, which makes the weakest-sounding tool the easiest to monitor; GitHub charges $19 per active committer per month and puts validity checks and generic patterns behind that line while push protection stays free on public repos; TruffleHog alone answers whether a found secret is still live, in three states including an honest "unknown"; and Gitleaks\' README now says it is feature complete and will ship security patches only, which is a statement about next year\'s coverage at 222 frozen rules.',
      'AI 博客：《GitHub Secret Protection、GitLab 推送保护、TruffleHog 与 Gitleaks 之辨》——四者之中只有两个能拒绝一次推送，而四者都会失败放行，所以决策轴是「哪种失败你看得见」。GitLab 把跳过条件写成了数字（超过 1 MiB、超过 3,150 个路径、超过 350,000 行），并审计每一次绕过，这让听起来最弱的那个工具反而最好监控；GitHub 按每位活跃提交者每月 19 美元收费，并把有效性检查与通用模式放在这条线之后，而推送保护在公开仓库上保持免费；只有 TruffleHog 会回答「找到的密钥是否仍然有效」，并给出包含一个诚实的 unknown 在内的三种状态；而 Gitleaks 的 README 现在写着它功能已完备、未来只发安全补丁——这是一句关于明年覆盖面的陈述，而规则停在了 222 条。',
    ),
    L(
      'New Playbook: Appointment Scheduling Over Voice (Voice & Realtime Agents, V26). A voice agent double-books before it mishears anything. Speaking three options is 9.6 seconds at 150 words per minute, and the window from reading availability to an accepted write is 12 to 18 seconds; at 40 offers an hour that puts one in six on another live offer, undiluted because every agent offers the earliest slot first. Hold one slot before you speak it — three held per call removes 6.7 slots from circulation at 400 offers an hour against 2.2 for one — confirm with If-Match so a moved calendar returns 412 instead of a second booking, and write the recovery sentence before you need it. Instrument hold-expiry, precondition-failure and spoken-versus-booked mismatch separately: only the third catches silent substitution.',
      '新增实战手册：《语音里的预约排期》（语音与实时智能体，V26）。一个语音智能体还没听错任何东西，就已经把同一个时段重复预约出去了。按每分钟 150 词，说完三个选项要 9.6 秒，而从读取可约时段到写入被接受的窗口是 12 到 18 秒；在每小时 40 次报价之下，这让六分之一撞上另一笔在途报价，而且不会被稀释——因为每个智能体都先报最早的那个时段。请在开口之前先锁住一个时段（每通电话锁三个，在每小时 400 次报价下会从市面上抽走 6.7 个时段，只锁一个则是 2.2 个），用 If-Match 做确认，让被改动过的日历返回 412 而不是多出一笔预约，并在用到之前就写好那句救场词。请把锁定过期率、前置条件失败率、以及「说出口的时间」与「订下的时间」不一致率分开埋点：只有第三个能抓到静默替换。',
    ),
    L(
      'New Operation: Measuring Calibration in Production (Evaluation & Observability, E28). Expected Calibration Error is the wrong number to track, because it takes an absolute value per bin: on one 1,000-item sample it reads 0.092 at ten bins and 0.114 at twenty — a 24% swing from a free parameter — because the top bin merges 280 under-confident items with 200 over-confident ones. Brier\'s reliability term squares per forecast value so nothing cancels, and it localises 70% of the miscalibration in the 20% of items the system called certain. Label from a deliberate 2–5% full-review arm rather than from reviewer disagreements your own badge suppresses; recalibrate the display with isotonic or Platt rather than the model; keep a third state for "not checked"; and alarm on the absence of labels, because a frozen calibration number looks exactly like a good one.',
      '新增运维：《在生产环境里测量校准度》（评估与可观测性，E28）。期望校准误差是错的跟踪指标，因为它对每个分箱取绝对值：在一份 1,000 条的样本上，十个分箱读出 0.092、二十个分箱读出 0.114——一个自由参数带来 24% 的摆动——因为最高那个箱把 280 条「过度保守」与 200 条「过度自信」合并了。Brier 分解出的 reliability 项对每个预测值取平方，所以不会相互抵消，并把 70% 的校准误差定位到系统自称「确定」的那 20% 条目上。请用一条刻意保留的 2–5% 全量复核分支来取标签，而不是用被你自己的徽章压制掉的复核分歧；用保序回归或 Platt 缩放去校准展示层、而不是模型；为「未校验」保留第三种状态；并为「标签消失」设告警，因为一个被冻住的校准数字，看起来与一个好数字一模一样。',
    ),
    L(
      'Rebuilt Playbook: Designing for Trust (Agent UX & Human Interaction, H1), 712 → ~1,600 words. It now argues that trust is calibrated by exactly three disclosures — what you checked, what you did not, and what the check skips — and that the third has no established UI pattern, so an undisclosed coverage boundary is worse than no check because users stop sampling. The arithmetic is new: 70% of the miscalibration in a worked sample sits in the 20% of items called certain, the one band every sensible-looking UI stops confirming, where review costs 3.8 reads per defect against 100 in the band below. The worked examples are new too, and none of them are chat products: TruffleHog\'s verified/unverified/unknown, GitHub\'s logged push-protection bypass, and GitLab\'s published 1 MiB and 3,150-path skip thresholds.',
      '重写实战手册：《为信任而设计》（智能体 UX 与人机交互，H1），712 → 约 1,600 词。它现在主张：信任恰好由三项披露来校准——你校验了什么、你没校验什么、以及校验会跳过什么——而第三项并无成熟的 UI 范式，所以一条未被披露的覆盖边界比根本没有校验更糟，因为用户会停止抽查。那道算术是新的：在一份已算过的样本里，70% 的校准误差坐在被称为「确定」的那 20% 条目上，也就是每个看起来很合理的界面都会停止确认的那一档——而复核它每找出一个缺陷只要读 3.8 次，下一档却要 100 次。那些实作范例也是新的，而且没有一个是对话产品：TruffleHog 的 verified/unverified/unknown、GitHub 被记录在案的推送保护绕过，以及 GitLab 公开的 1 MiB 与 3,150 个路径的跳过阈值。',
    ),
  ],
  lines: ['pb', 'op', 'bl'],
};

export default entry;
