import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-20',
  title: L(
    'Two AI Blog posts, a lethal-trifecta concept, a scored-permissions runbook, and reasoning models rebuilt',
    '两篇博客、一个致命三要素概念、一份打分权限手册，以及重建的推理模型页',
  ),
  items: [
    L(
      'AI Blog: "The grant became a score, and the score is not in your logs" — Microsoft\'s 19 October controls withdraw an agent\'s write access as a continuously computed risk score climbs. Per-task authority needs no caveat; the score does, because a grant is readable before the act and a score only exists while it moves. Log the score, the band and the policy version on every decision, ask which way the scorer fails, and note that $99 per user per month prices containment per human while risk scales per agent.',
      'AI 博客：《授权变成了一个分数，而这个分数不在你的日志里》——微软 10 月 19 日的控制会随着一个持续计算的风险分数攀升而收回智能体的写权限。按任务发权限无需任何附加说明；分数则需要，因为授权在动作之前就可读，而分数只在它变动时存在。请在每一个决定上记下分数、档位与策略版本，问清打分器往哪个方向失效，并注意每用户每月 99 美元是把围堵按人计价，而风险是按智能体增长的。',
    ),
    L(
      'AI Blog: "The scan that found it was pointed at the attacker, not the targets" — a campaign that attempted 1,200+ sites and breached 100+ was found by scanning the internet for exposed Cairn deployments, not by any victim. Fewer than 100 Chinese characters of instruction produced 1,100+ attack projects across 14 unauthenticated dashboards: an attacker who automates acquires a control plane, and a control plane is an internet-facing asset holding a written record of intent. Your own agent console is the same asset.',
      'AI 博客：《找到它的那次扫描，扫的是攻击者，不是目标》——一场尝试了 1,200 多个站点、攻破 100 多个的行动，是靠在互联网上扫描暴露的 Cairn 部署发现的，而不是靠任何受害方。不足 100 个汉字的指令生产出了分散在 14 个无需认证控制台里的 1,100 多个攻击项目：一个走向自动化的攻击者会获得一个控制平面，而控制平面是一项面向互联网的资产，里面存着一份写下来的意图记录。你自己的智能体控制台就是同一项资产。',
    ),
    L(
      'New Concept, The Lethal Trifecta (A46): private data, untrusted content and an outbound channel are each ordinary and jointly catastrophic. Because it is a conjunction you break a leg rather than stop the injection — and egress is the cheapest leg while the injection classifier is the one that cannot be made to hold. The trifecta is a property of a context, not an agent: a subagent that returns text, compaction, or a tool added in June recombines legs you split in March.',
      '新概念「致命三要素」（A46）：私有数据、不受信内容与一条外发通道，单看都很平常，合在一起却是灾难。正因为它是一个合取，你要打断一条腿、而不是去阻止注入——而外发是最便宜的那条腿，注入分类器则是无论如何都立不住的那一个。三要素是一个上下文的属性、不是一个智能体的属性：一个会返回文本的子智能体、上下文压缩，或者六月才加上的一个工具，都会把你三月拆开的腿重新合起来。',
    ),
    L(
      'New Operations page, Risk-Scored Permissions (S30): the deployable artifact is your own three-band table — named by what the agent loses, boundaries versioned, with hysteresis so an agent near a threshold does not flap mid-task — plus score, band and policy version on every decision, allowed ones included. Test the scorer\'s absence before its accuracy (stale, missing, lagging, flapping), and price the demotion: an agent that loses write at step 13 of 17 has made twelve changes it cannot finish.',
      '新运维页「按风险打分的权限」（S30）：真正可部署的产物是你自己的三档表——按「智能体失去什么」命名、边界带版本、带回差，好让靠近阈值的智能体不会在任务中途来回跳——再加上每一个决定（包括被放行的）都带着分数、档位与策略版本。在测打分器准不准之前先测它缺席时会怎样（陈旧、缺失、滞后、来回跳），并给降级定价：一个在十七步里第十三步失去写权限的智能体，已经做了十二次改动，却收不了尾。',
    ),
    L(
      'Rebuilt Concept, Reasoning vs non-reasoning models (E5), 720 → ~1,320 words: it now argues that "reasoning model" is a budget you spend rather than a model you pick. Thinking is billed at the output rate, shares the max_tokens cap with the answer (the empty-response bug), and cannot be predicted per request. Anthropic rejects budget_tokens on 4.7+ in favour of adaptive effort, OpenAI uses reasoning_effort, Google a thinking level — and higher is not monotone. Worked arithmetic: gating effort to 2 of 20 steps cuts the reasoning line item by 90%.',
      '重建概念「推理 vs 非推理模型」（E5），720 → 约 1,320 词：现在它主张「推理模型」是一笔你花出去的预算，而不是一个你挑选的模型。思考按输出价计费、与答案共用 max_tokens 上限（那个空响应 bug），而且无法按请求预测。Anthropic 在 4.7 及之后直接拒绝 budget_tokens、转向自适应 effort，OpenAI 用 reasoning_effort，Google 用思考档位——而更高并非单调更好。算过的例子：把 effort 只放给二十步里的两步，能把推理那一项成本砍掉 90%。',
    ),
  ],
};

export default entry;
