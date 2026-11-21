import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-21',
  slug: 'bfcl-v4-vs-tau2-bench-vs-acebench-vs-toolsandbox',
  title: L(
    'BFCL v4 vs τ²-bench vs ACEBench vs ToolSandbox',
    'BFCL v4 vs τ²-bench vs ACEBench vs ToolSandbox',
  ),
  summary: L(
    'The four benchmarks everyone quotes for tool calling disagree about one thing, and it is not difficulty: who else is allowed to change the world during an episode. BFCL v4 holds it still and, by its own users\' account, measures argument serialisation; ToolSandbox lets the tools carry state; τ²-bench lets the customer operate their own device, which drops gpt-4.1 from 74% on retail to 34% on telecom; ACEBench lets the instruction be wrong. Each one can only see the failures its answer admits — so pick by the production failure you cannot afford, and quote the simulator error rate next to the score.',
    '所有人都在引用的四个工具调用基准，分歧只在一件事上，而那件事不是难度：在一次回合里，还有谁被允许改变这个世界。BFCL v4 把世界按住不动，而按它自己使用者的说法，它量的是参数序列化；ToolSandbox 让工具自己携带状态；τ²-bench 让客户去操作自己的设备，这把 gpt-4.1 从零售域的 74% 拉到电信域的 34%；ACEBench 则允许指令本身是错的。每个基准只能看见它那套"答案"所容许的失败——所以请按你承受不起的那种线上失败来挑，并且在报出分数时把用户模拟器的出错率一并报出来。',
  ),
  tags: ['agent-comparison', 'evals', 'agentic-ai', 'developer-tools'],
};

export default post;
