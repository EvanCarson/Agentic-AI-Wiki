import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-22',
  title: L(
    'Two AI Blog posts, a proactive-agent playbook, the fan-out tax, and unit economics rebuilt',
    '两篇博客、一份主动型智能体手册、扇出税，单位经济学重写',
  ),
  items: [
    L(
      'AI Blog: "The inbox became the prompt" — Claude Duet opened as a US research preview on 21 October 2026, checking connected apps every few hours and asking approval before it sends, pays, signs or deletes. The approvals are well placed and they sit on the wrong half of the run: a user\'s prompt was doing three jobs at once (trigger, scope, authorisation) and deleting it replaced only the first, so what starts a run is now whatever someone chose to send you — and nobody approves a read, which is the exfiltration path. Also: spend becomes a function of inbound volume, because the background checks draw on the same Pro or Max limits as the user\'s own work.',
      'AI 博客：《收件箱成了那条提示》——Claude Duet 于 2026 年 10 月 21 日在美国以研究预览开放，每隔几个小时检查已连接的应用，并在发送、支付、签署或删除之前征求批准。那些批准放对了位置，却守在这次运行的错误那一半上：用户的一条提示本来一次干三件事（触发、作用域、授权），而删掉它只替换了第一件——于是现在启动一次运行的，是别人选择发给你的任何东西，而没有人会批准一次阅读，而阅读正是外泄路径。另外：开销变成了入站量的函数，因为那些后台检查与用户自己的工作共用同一份 Pro 或 Max 额度。',
    ),
    L(
      'AI Blog: "llms.txt vs NLWeb vs WebMCP vs a remote MCP server" — four ways to make a site usable by agents, and three of them ask you to publish a surface whose consumer is still hypothetical. A server-log analysis of about 137,000 domains published in June 2026 found 97% of llms.txt files were never fetched, and Chrome\'s own Lighthouse audit for the file returns Not Applicable when it is missing; WebMCP is a W3C community-group draft (spec revised 20 October 2026, "not a W3C Standard") behind a Chrome 146 flag; NLWeb has Cloudflare and Azure behind it and flat adoption since Build 2025. Sort by read / ask / act instead, because only the MCP endpoint gives you a caller you can identify and revoke.',
      'AI 博客：《llms.txt vs NLWeb vs WebMCP vs 远程 MCP 服务器》——让站点能被智能体使用的四条路，其中三条要你发布一个消费方仍属假设的接口面。一份 2026 年 6 月发布的、覆盖约 13.7 万域名的服务器日志分析发现 97% 的 llms.txt 文件从未被抓取，而 Chrome 自家 Lighthouse 对该文件的审计在它缺失时返回「不适用」；WebMCP 是一份藏在 Chrome 146 实验标志后面的 W3C 社区组草案（规范于 2026 年 10 月 20 日修订，自称「不是 W3C 标准」）；NLWeb 背后有 Cloudflare 与 Azure，而自 Build 2025 以来采用停滞。请改按「读 / 问 / 动手」来排序，因为只有 MCP 端点能给你一个可识别、可吊销的调用方。',
    ),
    L(
      'New Playbooks page, Proactive & Unprompted Agents (H26): a proactive agent is a specificity problem wearing a judgement problem\'s clothes. At a 2.2% base rate — 180 inbound items a day, four that need you — a 97%-specific trigger yields 5.3 false alarms against 3.6 real ones, and 80% precision needs 99.6% specificity, which no prompt rewrite reaches. So cut the candidate set with deterministic rules agreed with the user, give every trigger class its own tool scope, token budget and deadline, put the cause next to the action in the approval, dedupe on item-plus-reason, and watch precision of interruption, sampled misses, candidate volume and quiet-day spend.',
      '新实战手册页「主动型与无提示智能体」（H26）：主动型智能体是一个披着判断力问题外衣的特异度问题。在 2.2% 的基础率下——每天 180 条入站、其中四条需要你——一个特异度 97% 的触发器产出 5.3 条假警报对 3.6 条真警报，而要达到 80% 精确率需要 99.6% 的特异度，这是任何提示改写都到不了的。所以请用与用户议定的确定性规则把候选集切小，给每个触发类别自己的工具作用域、token 预算与截止时间，在批准里把起因摆在动作旁边，按「条目 + 理由」去重，并盯住打扰的精确率、抽样漏报、候选量与清闲日开销。',
    ),
    L(
      'New Deep-Dive, The Fan-Out Tax (G12): the fourth parallel sub-agent almost always costs more than it is worth, and two numbers predict it. On an 8,000-token prefix, three branches of six steps pay 1.8× the prefix that one 18-step loop paid and six branches 2.9×, because each branch opens with a cache miss at the 1.25× write multiplier instead of reading at 0.1×; branch output is then billed twice, once as generation and again as the merge\'s input, so the supervisor\'s context grows with the fan. Meanwhile wall-clock is capped by the slowest branch, so 1→3 branches buys a factor of two and 3→6 buys almost nothing. Cap the fan by the merge budget you can reason over, not the worker count you can afford.',
      '新深入解析页「扇出税」（G12）：第四条并行子智能体几乎总是得不偿失，而两个数字就能预测到。在一段 8,000 token 的前缀上，三条各六步的分支要付单一 18 步循环所付前缀的 1.8 倍，六条分支是 2.9 倍——因为每条分支都以一次缓存未命中开场、按 1.25 倍的写入倍数计费，而不是按 0.1 倍读取；分支输出随后被计费两次，一次作为生成、再一次作为归并的输入，于是主管的上下文随扇面增长。与此同时挂钟时间的上限是最慢的那条分支，所以 1→3 条分支买到两倍，3→6 条几乎什么都买不到。请按你推理得过来的归并预算给扇面封顶，而不是按你付得起的工人数量。',
    ),
    L(
      'Rebuilt Operations page, Agent Unit Economics (B2), 754 → ~1,810 words: it now argues that cost per successful task is only as trustworthy as the verifier that decides what counted. A judge with an 8% false-positive rate turns a measured 70% success rate into 67.6% and moves the unit by 4% — systematically, in the wrong direction, and more than most token savings ship in a quarter. Hand-labelling 300 attempts leaves a ±5-point interval and a $0.69–$0.80 band around a $0.74 unit, so publish the point estimate, the interval and the verifier together; ±2 points costs about 2,000 labels. Adds the loaded numerator (escalation, eval, escaped errors, the standing bill) and the second denominator a credit-metered product needs.',
      '重写运维页「智能体单位经济学」（B2），754 → 约 1,810 词：现在它论证的是——每成功任务成本的可信度，只等于那个判定「什么算成功」的判定器。一个假阳性率 8% 的裁判会把测出来的 70% 成功率变成 67.6%，把这个单位撬动 4%——系统性地、朝着错误方向，而且比多数人一个季度真正落地的 token 节省都多。人工标注 300 次尝试会留下 ±5 个百分点的区间，让 0.74 美元的单位变成 0.69–0.80 美元的区间，所以请把点估计、区间与判定器一起公布；±2 个百分点大约要 2,000 个标注。文中新增了装满的分子（上报、评测、漏出的错误、常备账单），以及一个按额度计费的产品所需要的第二个分母。',
    ),
  ],
  lines: ['dd', 'pb', 'op', 'bl'],
};

export default entry;
