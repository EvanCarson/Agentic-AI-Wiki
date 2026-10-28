import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-25',
  title: L(
    'Two AI Blog posts, two new pages, and the evals primer rebuilt',
    '两篇博客、两个新页面，评测入门重写',
  ),
  items: [
    L(
      'AI Blog: "The allowlist and the shell disagreed about where the command ended" — nine GitHub advisories hit Roo Code\'s command auto-approval path between 30 March and 13 October 2026, five of them published on that single October day, and not one is a mistake in the list\'s contents. Two verified mechanisms are shown in full: a redirect-stripping regex (/\\d*>&\\d*/, both digit groups optional) that eats a bare >& and slides the redirect target into command position, filed CWE-436 Interpretation Conflict; and a tokeniser that dropped a shell-quote comment token, so bash ran the command after a word-attached "#" that the gate never saw. Seven researcher writeups name seven different disagreements across three layers — bash, the shell-quote library, and the gate\'s own regex — which is why patching one closes one finding and changes nothing. The repository has been archived read-only since 15 May 2026, so "through 3.54.0" is the final state, and a community fork inherits the module unchanged.',
      'AI 博客：《允许清单和 shell 对命令在哪里结束各执一词》——2026 年 3 月 30 日到 10 月 13 日之间，九份 GitHub 公告打中 Roo Code 的命令自动批准路径，其中五份发布在十月那一天，而没有一份是清单内容写错了。文中完整展示两种已核实的机制：一个剥重定向的正则（/\\d*>&\\d*/，两处数字组都可选）会吃掉光秃秃的 >&，把重定向目标滑进命令位置，归类为 CWE-436 解释冲突；以及一个丢掉了 shell-quote 注释记号的分词器，于是 bash 执行了紧贴在词尾的 "#" 之后那条闸门根本没看见的命令。七篇研究者手记点名了跨三个层次——bash、shell-quote 库、闸门自己那层正则——的七种不同分歧，这正是「修好一个只关掉一个发现、而什么都没改变」的原因。该仓库自 2026 年 5 月 15 日起已归档为只读，所以「3.54.0 及以下」就是终局，而社区 fork 原封不动地继承了这个模块。',
    ),
    L(
      'AI Blog: "Mem0 vs Graphiti vs Letta vs Cognee" — four Apache-2.0 memory layers, and in all four the repository you would install is not the artifact that produced the README\'s numbers. Mem0 states it outright: its 92.5 on LoCoMo comes from the managed platform, with "proprietary optimizations not available in the open-source SDK." Zep\'s Community Edition is deprecated into a legacy/ folder; Letta\'s V1 server sits on an archive branch with development moved to letta-code (3.7k stars, Letta Cloud as the default backend); Cognee\'s graph-on-Postgres is a demo feature with a licensed production version. No score for any of the four has been independently replicated, and BEAM\'s 10M bucket at roughly 200 questions carries about ±6.9 points, so a 3-point vendor gap is noise while Mem0\'s own 15-point drop from 1M to 10M is not.',
      'AI 博客：《Mem0 vs Graphiti vs Letta vs Cognee》——四个 Apache-2.0 的记忆层，而四者都有同一个问题：你会去安装的那个仓库，并不是产出 README 里那些数字的东西。Mem0 直接写明：它在 LoCoMo 上的 92.5 来自托管平台，带着「开源 SDK 中没有的专有优化」。Zep 的社区版已弃用、挪进了 legacy/ 目录；Letta 的 V1 服务端在 archive 分支上，开发已挪到 letta-code（3.7k 星，默认后端是 Letta Cloud）；Cognee 把图跑在 Postgres 上是演示功能，生产版需授权。四者的任何分数都没有独立复现，而 BEAM 的 10M 档约 200 题、带着约 ±6.9 个百分点，于是厂商之间 3 个点的差距是噪声，而 Mem0 自己报的从 1M 到 10M 掉 15 个点不是。',
    ),
    L(
      'New Concept, Auto-Approval & Command Allowlists (A47): an allowlist that matches shell strings is a second shell parser, and it starts as a convenience and becomes a security boundary within about a week without anyone deciding so. The page gives the test for which role yours is playing, the argv-vector fix with runnable before/after code (shell=False, so redirects, globs, substitution and comments stop existing), the argument-level abuse argv does not fix (git -c core.sshCommand, find -exec, any --eval flag), and why the sandbox rather than the list should carry the consequence of being wrong.',
      '新增概念《自动批准与命令允许清单》（A47）：一份拿 shell 字符串做匹配的允许清单，本质上是第二个 shell 解析器；它出生时是便利功能，大约一周后就在无人决定的情况下变成了安全边界。本页给出判断你的清单在扮演哪个角色的测试、带可运行前后对照代码的 argv 向量修法（shell=False，于是重定向、通配、替换与注释都不再存在）、argv 并不能修掉的参数层面滥用（git -c core.sshCommand、find -exec、任何带 --eval 的旗标），以及为什么该由沙箱、而不是清单，来承担判断失误的后果。',
    ),
    L(
      'New Deep-Dive, Memory Scopes & Tenancy (M14, Memory & Context): every memory layer takes the scope as an argument the caller declares — Mem0\'s user_id, Graphiti\'s group_id, Cognee\'s dataset, Letta\'s agent — and a declared scope is not an authorisation decision; Graphiti\'s own security note says its reference servers let callers access any group_id. The leak is silent because similarity carries no provenance and cross-tenant neighbours are the most similar. Includes the three scopes you actually need (principal, workspace, run), the wrong-and-right tool closure in code, why an automatic write must default to the narrow scope, and a four-case test table ending in a thirty-line cross-tenant recall test for CI.',
      '新增深入解析《记忆作用域与多租户》（M14，记忆与上下文）：每个记忆层都把作用域当成调用方自己申报的一个参数——Mem0 的 user_id、Graphiti 的 group_id、Cognee 的 dataset、Letta 的智能体——而一个被申报的作用域不等于一次授权判定；Graphiti 自己的安全说明就写明，它的参考服务器允许调用方访问任意 group_id。这种泄漏是静默的，因为相似度不携带来源，而跨租户的邻居恰恰是最相似的。文中含你真正需要的三种作用域（主体、工作区、运行）、错与对两版工具闭包的代码、为什么自动写入必须默认落在最窄的作用域，以及一张四条用例的测试表，最后落在那个可以挂进 CI 的三十行跨租户召回测试上。',
    ),
    L(
      'Rebuilt Concept, Evals, in plain words (B10), 843 → ~1,600 words: the most-linked page on the site (74 inbound links) had no numbers in it. It now argues that an eval is a measuring instrument and the first thing you measure with it is itself. New: the sample-size table (20 cases carry ±17.5 points, 50 carry ±11.1, 400 carry ±3.9), so the "6-point improvement" shipped on a 50-case set is unmeasured rather than small; the paired comparison that rescues a small set, worked as an exact binomial — 6 flips at 5-1 gives p = 0.22, while 12 flips at 11-1 gives p = 0.006 on the same fifty cases with no new data; the judge meta-evaluation procedure (label 50 yourself, report agreement, read the disagreements) and why a judge upgrade silently recalibrates every historical score; and the failure-capacity rule — a set nobody currently fails is a regression detector wearing a progress bar.',
      '重写概念《用大白话讲评测》（B10），843 → 约 1,600 词：全站入链最多的页面（74 条入链）里一个数字都没有。它现在主张：评测是一台测量仪器，而你用它量的第一样东西就是它自己。新增内容：样本量表格（20 个用例带 ±17.5 个百分点，50 个带 ±11.1，400 个带 ±3.9），于是在 50 个用例上上线的那个「提升 6 个点」是未被测量，而不是幅度小；能救活小数据集的配对比较，并按精确二项检验算了出来——6 个翻转 5 比 1 得 p = 0.22，而同样这五十个用例上 12 个翻转 11 比 1 得 p = 0.006，且没有新收集任何数据；裁判的元评估流程（自己标 50 个、报告一致度、把分歧读完），以及为什么裁判一升级就悄悄把全部历史分数重新标定；还有失败容量这条规则——一个当前没人会失败的集合，是一个披着进度条的回归探测器。',
    ),
  ],
  lines: ['co', 'dd', 'bl'],
};

export default entry;
