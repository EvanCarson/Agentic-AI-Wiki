import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-11',
  title: L(
    'Two AI Blog posts — on the week OWASP stopped shipping advice and started shipping a hook contract, and on the model routers whose errors never raise an error — plus three pages on goal drift, clinical-trial matching, and the fixed costs that make a pilot look unaffordable',
    '两篇 AI 博客——OWASP 不再交付建议、开始交付一份 hook 契约的这一周；以及那些出错时从不报错的模型路由器——外加三个页面：目标漂移、临床试验匹配，以及让试点看起来贵得离谱的那些固定成本',
  ),
  items: [
    L(
      'AI Blog — “OWASP shipped an interface, not a list”: the 2026 Top 10 for LLM Applications put Excessive Agency third, up from sixth, on a methodology that for the first time weighted roughly 6,639 real incidents at 25% against the expert vote — and the ranking is the least useful part of the release. The Agent Control Standard is the change: an Instrument layer of runtime hooks with an allow/deny/modify verdict behind any policy engine, a Trace layer extending OpenTelemetry and OCSF, and an Inspect layer emitting a dynamic agent BOM. The post argues that a hook which fires and lets the action through is telemetry, that the tool-result hook matters more than the tool-call hook because injection arrives inbound, and that the number nobody reports is a denominator — the share of an agent’s externally visible effects that pass a hooked call site at all.',
      'AI 博客《OWASP 交付的是一个接口，不是一份清单》：2026 版 LLM 应用十大风险把"过度代理权"从第六提到第三，所依据的方法论首次把约 6,639 起真实事故以 25% 的权重与专家投票放在一起加权——而名次恰恰是这次发布里最没用的部分。真正的变化是 Agent Control Standard：一层由运行时 hook 构成的 Instrument，背后可接任意策略引擎、返回 allow/deny/modify 裁决；一层在 OpenTelemetry 与 OCSF 之上扩展的 Trace；以及一层产出动态智能体 BOM 的 Inspect。文章论证：一个触发了却放行动作的 hook 只是遥测；工具"结果"上的 hook 比工具"调用"上的更要紧，因为注入是入向抵达的；而没人在报的那个数字是一个分母——智能体对外可见的效果里，究竟有多大比例真的经过了一个挂了 hook 的调用点。',
    ),
    L(
      'AI Blog — “RouteLLM vs Not Diamond vs vLLM Semantic Router vs OpenRouter Auto”: four products, three routing decisions, because OpenRouter’s Auto Router runs Not Diamond as its engine — so a team adopting both for redundancy has adopted one. The post separates the three questions actually being asked (is this hard, which model suits this, how much computation does this deserve), notes that the vLLM Semantic Router is the only one on the third axis and reports accuracy rising 10.2% while tokens fall 48.5% on MMLU-Pro with Qwen3 30B, and argues that a router is a classifier whose failures return a valid answer with a 200 — so its savings are the only number you will ever see unless you keep a held-out set and log the chosen model. Inside an agent loop, per-step routing makes the accumulated transcript a cache miss and usually costs more than it saves.',
      'AI 博客《RouteLLM、Not Diamond、vLLM Semantic Router 与 OpenRouter Auto》：四个产品，三个路由决定——因为 OpenRouter 的 Auto Router 用 Not Diamond 作引擎，所以一个"两家都上以分散风险"的团队其实只上了一家。文章把真正在问的三个问题分开（这难吗、哪个模型适合这条、这值得多少计算），指出只有 vLLM Semantic Router 站在第三根轴上，并给出它在 MMLU-Pro 上以 Qwen3 30B 取得的"准确率升 10.2%、令牌降 48.5%"，进而论证：路由器是一个失败时会带着 200 返回有效答案的分类器——所以除非你留着一份留出集、并记录所选模型，否则你能看见的只有它省下的钱。在智能体循环内部，逐步路由会让累积的对话记录变成缓存未命中，通常花的比省的多。',
    ),
    L(
      'Concepts — Goal Drift: a long run rarely abandons your goal, it substitutes an easier one and pursues that competently, which is why drift survives outcome evaluation — the final artefact is a good answer to the question the agent ended up asking. Two of its three causes are yours: compaction paraphrases the objective away, then volume and recency outvote what is left; the third is a cheap proxy left as the only observable signal. Fixes, cheapest first: pin the objective outside the transcript and re-inject it verbatim, write acceptance criteria before the run, keep the verifier independent of the actor, and shorten the horizon instead of strengthening the prompt.',
      '概念 — 目标漂移：一次长运行很少会放弃你的目标，它会换上一个更容易的并称职地去追——这正是漂移能从结果评估里活下来的原因：最终产物是对智能体最后在问的那个问题的一个好答案。三种成因里有两种是你造成的：压缩把目标转述掉，之后体量与近因又把剩下的压过去；第三种是把一个廉价代理指标留成了唯一可观测信号。对策按由便宜到贵排列：把目标钉在对话记录之外并逐字重新注入、运行前写下验收标准、让核验者独立于行动者，以及缩短任务时长而不是加强提示词。',
    ),
    L(
      'Playbooks — Clinical-Trial Matching Agents: the expensive error is invisible — an eligible patient who was never surfaced — so a system tuned on precision looks excellent and does the opposite of its job. The product is criteria parsing, not matching: decompose free-text eligibility into atomic predicates that each carry a time window, emit a per-criterion table with evidence spans and an explicit unknown state rather than a verdict, and rank by how few unknowns remain. Evaluate recall against an adjudicated gold set, never accuracy; treat screen-failure rate as a lagging signal and never as the optimisation target; and gate patient contact behind a named human.',
      '实战手册 — 临床试验匹配智能体：代价最高的那种错是看不见的——一位符合条件却从未被推出来的患者——所以一套按精确率调优的系统看上去很漂亮，做的却是与本职相反的事。产品是标准解析，不是匹配：把自由文本的入组标准拆成各自带时间窗的原子谓词，输出一张带证据片段与显式"未知"状态的逐条标准表而非一个结论，并按剩余未知项的多少排序。用经裁定的金标准集测召回率，绝不用准确率；把筛选失败率当成滞后信号，绝不当成优化目标；并把联系患者这一步交给一个具名的人把关。',
    ),
    L(
      'Operations — Fixed Costs & the Pilot Tax: agents are sold as pure variable cost, so a pilot divides a total that is mostly standing bill by a tiny task count and reports a number that says nothing about the agent. Six lines do not move with traffic — the index, the eval suite, trace retention, the capacity floor, the minimum review roster and the engineering rota — and the same unchanged system spans two orders of magnitude in cost per task between 300 and 50,000 runs a month. The fixed layer is a staircase whose steps are triggered by audits, regions and provider deprecations rather than by volume, build-versus-buy is a question about which kind of cost you want, and the figure to present is the breakeven volume rather than the cost per task.',
      '运维 — 固定成本与试点税：智能体是被当作纯可变成本卖出去的，于是试点把一笔大头是常备账单的总额除以一个很小的任务数，报出一个完全说明不了这个智能体的数字。有六条线不随流量变动——索引、评估套件、追踪留存、容量下限、复核的最小排班，以及工程值班——而同一套一字未改的系统，在每月 300 次与 50,000 次之间，每任务成本横跨两个数量级。固定层是一段楼梯，它的台阶由审计、地域和厂商下线触发，而不是由用量触发；自建还是外购，问的是你想要哪一类成本；而该拿去汇报的数字是盈亏平衡量，不是每任务成本。',
    ),
  ],
};

export default entry;
