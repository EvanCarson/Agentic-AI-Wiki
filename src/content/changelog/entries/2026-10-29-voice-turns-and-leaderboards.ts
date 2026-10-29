import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-29',
  title: L(
    'Two AI Blog posts, two new pages, and the voice latency budget rebuilt',
    '两篇博客、两个新页面，语音延迟预算重写',
  ),
  items: [
    L(
      'AI Blog: "The read-back worked, the repair did not" — on τ-Entity, the 200-task spoken-entity benchmark Sierra published in late October 2026, a matched text agent gets all 200 right and four voice configurations land between 0.14 and 0.41 robust Pass³. The gap lives after the mis-hearing, not in it: agents detect most of their wrong values and repair only 24–37% of the ones they detected. Over 347 captures that started wrong, read-back alone recovers 26%, spelling alone 24%, both 35%. The operational rule is that a repair attempt must never re-run the strategy that just failed.',
      'AI 博客：《复述那一步成了，修复那一步没成》——在 Sierra 于 2026 年 10 月下旬发布的 200 题口述实体基准 τ-Entity 上，条件对齐的文本智能体 200 题全对，而四种语音配置的稳健 Pass³ 落在 0.14 到 0.41 之间。差距住在「听错之后」，而不是「听错本身」：智能体检测出了自己大部分的错值，却只修好了其中的 24%–37%。在 347 次一开始就捕错的取值里，只复述挽回 26%、只拼读挽回 24%、两者齐上 35%。由此而来的运维规则是：一次修复尝试绝不能重跑刚刚失败的那个策略。',
    ),
    L(
      'AI Blog: "The leaderboard ranks the pair, not the model" — a Stanford and UIUC variance decomposition of 22 agent benchmarks from HAL and the Harbor Index (arXiv:2610.00651, 30 September 2026) splits by the claim you make. Ranking a fixed model-and-scaffold system scores 0.935–0.994 on reliability; ranking the underlying model from the same rollouts scores 0.148–0.841. And the usual remedy is capped: where scaffold coverage dominates the uncertainty, even unlimited extra tasks of the same kind buy at most 0.097. Ask a leaderboard how many scaffolds it ran, not how many tasks.',
      'AI 博客：《排行榜排的是那一对，不是模型》——斯坦福与 UIUC 对来自 HAL 与 Harbor Index 的 22 个智能体基准所做的方差分解（arXiv:2610.00651，2026 年 9 月 30 日），按「你在主张什么」劈成两半。给固定的「模型＋脚手架」系统排序，可靠度是 0.935–0.994；从同一批 rollout 给底下那个模型排序，是 0.148–0.841。而惯常的补救办法有天花板：当脚手架覆盖面主导不确定性时，哪怕无限多道同类任务也最多买到 0.097。该向排行榜追问的是它跑了几种脚手架，而不是几道题。',
    ),
    L(
      'New Concept, End-of-Turn Detection (A50): the largest line in a voice agent\'s response latency is the wait for proof the caller has finished, and a fixed silence timer charges that wait to every turn. No threshold works, because mid-turn pauses and turn-final gaps come from two overlapping distributions that shift by speaker — so the 2026 answer folds a completion model into recognition itself, with Deepgram\'s Flux documenting end-of-turn at roughly 260 ms and under 400 ms multilingual. Response latency and false-cutoff rate are one measurement with two faces; publishing either alone is how the trade gets made by accident.',
      '新增概念《轮次结束检测》（A50）：语音智能体响应延迟里最大的那一项，是等一个「来电者说完了」的证据，而固定静音定时器把这段等待记到每一个轮次头上。没有哪条阈值管用，因为轮次内停顿与轮次末间隔来自两个重叠、且随说话人移动的分布——于是 2026 年的答案是把一个「完整性」模型折进识别本身，Deepgram 的 Flux 文档给出约 260 ms 的轮次结束判定、多语种低于 400 ms。响应延迟与误打断率是同一次测量的两张脸；单独公布其中之一，正是这笔交易被不知不觉做掉的方式。',
    ),
    L(
      'New Operations page, The Cost of a Voice Minute (B24): voice is the one agent workload billed by wall-clock, and the same second is metered in parallel by the carrier, the platform, STT and TTS while the token line — the only one anyone optimises — is about 4% of a worked four-minute call. A 700 ms endpointing timer across twenty turns therefore costs more than the entire model bill, and the τ-Entity confirmation scaffold\'s 21–28 extra seconds breaks even if it prevents one failed capture in seventy. Manage cost per resolved call: fifteen points of containment is worth roughly three times halving every rate you pay.',
      '新增运维页《一分钟语音的成本》（B24）：语音是唯一按挂钟计费的智能体工作负载，同一秒会被运营商、平台、STT 与 TTS 并行计量，而令牌那一行——唯一人人都在优化的——在一通四分钟通话的算例里只占约 4%。于是二十个轮次上 700 ms 的端点检测定时器，花得比整块模型账单还多；而 τ-Entity 那套确认脚手架多出的 21–28 秒，只要七十通里挡掉一次采集失败就回本。请管理每已解决通话成本：十五个百分点的自助完成率，约等于把你付的每一项费率砍半的三倍。',
    ),
    L(
      'Rebuilt Playbook, The Latency Budget (V2), 764 → ~1,670 words: it now argues that almost every latency figure in voice AI measures one component on the vendor\'s own path, so summing the published numbers for a cascade reaches about 1,100 ms before a packet crosses the internet — twice the 200 ms gap humans expect, from components all marketed as fast. Two of the seven lines are the ones nobody publishes. The rebuilt page carries the 2026 shift from endpointing timer to completion model, a doubling rule for vendor component figures, and the separation of the perception clock from the cash clock.',
      '重写实战手册《延迟预算》（V2），764 → 约 1,670 词：它现在主张，语音 AI 里几乎每一个延迟数字测的都是厂商自家链路上的某一个组件，所以把一套级联技术栈公布出来的数字加起来，在任何数据包穿过互联网之前就已约 1,100 ms——是人类预期的 200 ms 间隔的两倍，而组件个个都标榜自己快。七行里有两行是没人公布的。重写后的页面写入了 2026 年从「端点检测定时器」到「完整性模型」的转变、一条针对厂商组件数字的加倍法则，以及把感知之钟与现金之钟分开的做法。',
    ),
  ],
  lines: ['co', 'op', 'pb', 'bl'],
};

export default entry;
