import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-11-01',
  title: L(
    'Two AI Blog posts, two new pages, and the turn-taking playbook rebuilt',
    '两篇博客、两个新页面，轮次与打断手册重写',
  ),
  items: [
    L(
      'AI Blog: "The session ID was a command-line flag" — CVE-2026-96620 scores CVSS v4.0 9.2 because of which flag got injected, not because a string reached a shell. The Python claude-agent-sdk before 0.2.121 forwarded its resume option into the Claude CLI unvalidated, so a session ID beginning with a hyphen became argv, and the reachable flag was --mcp-config: it does not run one command and finish, it mounts a stdio MCP server that stays in the session\'s tool list. Nothing was bypassed — the gate approves listed tools, and the injection wrote the list. Three CWEs on one record (20, 88, 78) because the bug is a sequence. The record also carries two dates thirty-four days apart, published 12 September and reviewed 16 October 2026, and which one your scanner keys off decides when you heard.',
      'AI 博客：《那个会话 ID，其实是一个命令行参数》——CVE-2026-96620 拿到 CVSS v4.0 9.2 分，原因在于被注入的是哪一个参数，而不在于「一个字符串跑进了 shell」。0.2.121 之前的 Python 版 claude-agent-sdk 把 resume 选项未经校验地转交给 Claude CLI，于是一个以连字符开头的会话 ID 变成了 argv，而能被摸到的那个参数是 --mcp-config：它不是执行一条命令然后收场，而是挂上一台留在会话工具清单里的 stdio MCP 服务器。什么都没被绕过——闸门批准的是清单上的工具，而这次注入写的正是那份清单。一条记录挂三个 CWE（20、88、78），因为这个 bug 是一条序列。该记录还带着相隔三十四天的两个日期：2026 年 9 月 12 日发布、10 月 16 日复核，而你的扫描器对准哪一个，决定了你何时听说它。',
    ),
    L(
      'AI Blog: "Marker vs MarkItDown vs MinerU vs Docling" — four open-source document-to-Markdown converters, and the only published head-to-head among them sits in Marker\'s own README, where Marker balanced takes 76.0% on olmocr-bench against MinerU 72.7% and Docling 50.3% — topped at 85.8% by Chandra 2, the paid hosted product of the company that publishes the chart. MarkItDown has 193.3k stars, 4.7x Marker\'s, publishes no accuracy number and warns in its README that it may not suit high-fidelity conversion. Pick on per-element provenance instead: Marker gives a polygon and block_type per block, MinerU gives doc/tier/page/block locators, Docling does not state it, MarkItDown gives a page comment on one path. And Marker\'s weights are not Apache-2.0 — they are free only under $5M in funding or revenue.',
      'AI 博客：《Marker、MarkItDown、MinerU、Docling》——四个开源的「文档转 Markdown」工具，而它们之间唯一公开的正面对比就躺在 Marker 自己的 README 里：在 olmocr-bench 上 Marker balanced 得 76.0%，MinerU 为 72.7%、Docling 为 50.3%——而榜首 85.8% 是 Chandra 2，即公布这张表的那家公司的付费托管产品。MarkItDown 有 19.33 万星、是 Marker 的 4.7 倍，却不公布任何准确率数字，并在 README 里提醒自己可能不适合高保真转换。请改用「逐元素溯源」来选：Marker 每块给出 polygon 与 block_type，MinerU 给出 doc/tier/page/block 定位符，Docling 没有说明，MarkItDown 只在一条路径上给页码注释。另外 Marker 的权重并非 Apache-2.0——只有在融资或营收低于 500 万美元时才免费。',
    ),
    L(
      'New Deep-Dive, Harness Configuration as an Injection Target (S15, Agent Security): a harness takes input on two channels and you review one. The conversation is untrusted by assumption and wrapped in a permission gate; configuration — argv, config files, environment, skill directories — is trusted by assumption and is what decides which tools exist at all, so anything carrying request data onto it is a privilege escalation that arrives upstream of the gate. Covers the three paths request data takes there, why a mounted tool is categorically worse than an executed command, and why the newest path is a product feature: Cloudflare\'s Agents SDK 0.32.0 (29 October 2026) loads skills from a workspace the agent itself can write, re-lists every source before each turn, and still loads a SKILL.md that breaks a spec rule with only a logged warning. Two fixes: keep untrusted values off argv, and put requirements in a file the constrained party cannot write.',
      '新增深入解析《外壳配置作为注入目标》（S15，智能体安全）：一副外壳从两条通道接收输入，而你只审查一条。对话按假设不可信、并被权限闸门包着；而配置——argv、配置文件、环境变量、技能目录——按假设可信，偏偏它决定了究竟有哪些工具存在，所以任何把请求数据送上这条通道的东西，都是一次抵达时机在闸门上游的权限提升。文中讲清请求数据登上该通道的三条路径、为何「被挂上的工具」在类别上比「被执行的命令」更糟，以及为何最新的那条路径如今是一项产品功能：Cloudflare 的 Agents SDK 0.32.0（2026 年 10 月 29 日）从一个智能体自己就能写入的 workspace 加载技能、在每一轮之前把所有来源重新列一遍，而一份违反规范规则的 SKILL.md 仍会被加载、只记一条警告。两个修法：把不受信的值挡在 argv 之外，并把硬性要求放进一个被约束方写不了的文件里。',
    ),
    L(
      'New Playbook, Defaults, Settings & Who Can Change Them (H27, Agent UX): your defaults are your policy — at a 5% change rate, 95% of your install base runs the value someone picked in a planning meeting, so moving a default is worth roughly nineteen times the effort spent making the setting easier to find. Separates preference from requirement from capability grant, with Codex CLI\'s allow_managed_hooks_only as the worked example: it works only in requirements.toml and is a no-op in config.toml, which is not a quirk but the whole mechanism. Also: why "turn that off" said in conversation has three meanings and most products implement the weakest, relabelling settings with the worst unpredicted consequence instead of the mechanism, giving every grant an explicit scope and lifetime, and the four numbers nobody measures about a settings screen.',
      '新增实战手册《默认值、设置，以及谁改得动它们》（H27，智能体体验）：你的默认值就是你的策略——在 5% 的变更率下，你 95% 的安装基数跑的是某人在一场排期会上挑的那个值，所以挪动一个默认值，价值大约是「把这项设置做得更好找」所花精力的十九倍。文中把偏好、硬性要求与能力授予区分开，并以 Codex CLI 的 allow_managed_hooks_only 作为走完的例子：它只在 requirements.toml 里起作用、放进 config.toml 则是空操作——这不是古怪之处，而是整个机制。另外还讲：在对话里说出的「把那个关掉」为何有三种含义、而多数产品实现的是最弱的那一种；如何用「最坏的、未被预料到的后果」而不是机制来重写设置标签；为何每一次授予都要有显式的作用域与寿命；以及关于一块设置界面、没人去测的那四个数字。',
    ),
    L(
      'Rebuilt Playbook, Turn-Taking & Barge-In (V3), 757 → ~1,980 words: the most-linked thin page on the site (18 inbound pages) had no product, number or date in it. It now argues that the turn manager is the only component in a voice stack holding mutable state, and a barge-in invalidates it mid-write — at 2.5 words a second, a 400 ms stop plus 200 ms of in-flight audio leaves 1.5 words uncertain and 1.5 s of TTS look-ahead leaves 3.75 words that were never heard, while the LLM may be seven sentences further ahead still. Store what the model generated and the agent spends the rest of the call referencing sentences nobody heard, so bias the estimator toward "not heard" (the two errors cost differently), set an explicit truncated flag so the model knows it was cut, and cancel the stream before a discarded tool call runs. Full duplex deletes the boundary and makes the bookkeeping harder, not easier.',
      '重写实战手册《轮次与打断》（V3），757 → 约 1,980 词：全站被链接最多的薄页面（18 个入链页面）里没有任何产品、数字或日期。它现在主张：轮次管理器是语音栈里唯一持有可变状态的组件，而一次打断会在它写到一半时把状态作废——按每秒 2.5 词算，400 ms 的停止加上 200 ms 在途音频留下 1.5 个词的不确定，而 1.5 秒的 TTS 前瞻留下 3.75 个从未被听到的词，而 LLM 可能还要再超前七句话。存下「模型生成了什么」，智能体就会用这通电话余下的时间去引用没人听到过的句子；所以请把估计量朝「没听到」加偏（两种错误的代价不同）、设一个显式的 truncated 标记让模型知道自己被切断了，并在被丢弃的工具调用跑起来之前取消那条流。全双工删掉的是那条边界，而它让这份账更难记、不是更容易。',
    ),
  ],
  lines: ['bl', 'dd', 'pb'],
};

export default entry;
