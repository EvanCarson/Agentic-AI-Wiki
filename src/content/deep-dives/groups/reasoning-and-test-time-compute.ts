import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'reasoning-and-test-time-compute',
  order: 120,
  name: L('Reasoning & Test-Time Compute', '推理与测试时计算'),
  groupSummary: L('Chain of thought, self-consistency, tree/graph of thought, and the inference-time-scaling laws that govern them.', '思维链、自我一致性、思维树/图，以及支配它们的推理期扩展规律。'),
  entries: [
    { page: 'chain-of-thought', slug: 'chain-of-thought', title: L('Chain-of-Thought, Properly','正确理解思维链'), summary: L('What CoT actually buys (serial compute, not introspection), faithfulness vs post-hoc rationalization, when it hurts, and structured vs free traces.','CoT 究竟买到了什么（串行计算，而非内省）、忠实性与事后合理化、它何时有害，以及结构化轨迹与自由轨迹之别。') },
    { page: 'self-consistency-and-sampling', slug: 'self-consistency-and-sampling', title: L('Self-Consistency & Sampling','自一致性与采样'), summary: L('Why sampling + majority vote works, the exact bias-amplification failure, the saturating returns curve, and how to spend the k budget.','采样加多数投票为何有效、偏差被放大的精确失效条件、收益饱和曲线，以及如何花好 k 这笔预算。') },
    { page: 'tree-and-graph-of-thought', slug: 'tree-and-graph-of-thought', title: L('Tree & Graph of Thought','思维树与思维图'), summary: L('Deliberate search over partial solutions, the multiplicative cost, and the load-bearing dependency on a partial-state scorer.','在部分解之上的刻意搜索、乘性成本，以及对部分状态打分器这一承重依赖。') },
    { page: 'verifier-guided-search', slug: 'verifier-guided-search', title: L('Verifier-Guided Search','核验器引导的搜索'), summary: L('Outcome vs process reward models steering best-of-N and beam search, reward hacking at inference time, and why the verifier is the product.','结果型与过程型奖励模型如何引导 best-of-N 与束搜索、推理时的奖励作弊，以及为何核验器才是产品。') },
    { page: 'inference-time-scaling', slug: 'inference-time-scaling', title: L('Inference-Time Scaling','推理时扩展'), summary: L('Test-time compute as a second scaling axis, the difficulty-adaptive compute-optimal frontier, and where more thinking stops paying.','测试时计算作为第二条扩展轴、按难度自适应的计算最优前沿，以及更多思考何处停止见效。') },
    { page: 'when-reasoning-helps', slug: 'when-reasoning-helps', title: L('When Reasoning Helps (and When It Burns Money)','推理何时有用（何时烧钱）'), summary: L('The synthesis decision rule — task class × verifiability × budget — an escalation ladder, the named money-burning patterns, and a do/don\'t list.','综合决策规则——任务类别 × 可核验性 × 预算——升级阶梯、点名的烧钱模式，以及一份该做/不该做清单。') },
    { page: 'adaptive-thinking-and-effort-budgets', slug: 'adaptive-thinking-and-effort-budgets', title: L('Adaptive Thinking & Effort Budgets','自适应思考与努力度预算'), summary: L("`budget_tokens` is deprecated — Claude's `effort`, Gemini's `thinking_level`, OpenAI's `reasoning_effort`, and when the model overrides your budget.",'`budget_tokens` 已废弃——Claude 的 `effort`、Gemini 的 `thinking_level`、OpenAI 的 `reasoning_effort`，以及模型何时会覆盖你的预算。') },
    { page: 'carrying-reasoning-across-tool-calls', slug: 'carrying-reasoning-across-tool-calls', title: L('Carrying Reasoning Across Tool Calls','把推理一路带过工具调用'), summary: L('Reasoning became a signed, opaque input you must hand back unchanged — so injecting a reminder, adding a tool mid-run or trimming history now invalidates it, silently or with a 400. Echo, never rebuild.','推理变成了一个带签名、不透明、且必须原样交还的输入——于是塞进一句提醒、运行途中加个工具、或裁剪历史，如今都会让它失效：要么悄无声息，要么一个 400。回送，绝不重建。') },
  ],
};
export default group;
