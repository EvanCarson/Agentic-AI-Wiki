import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-17',
  slug: 'the-right-axis-the-wrong-unit',
  title: L(
    'The right axis, the wrong unit',
    '轴选对了，单位选错了',
  ),
  summary: L(
    'Reflection put tokens-per-attempt on the same chart as its benchmark score for Beam, a 501B/23B-active open-weight model — about 25,000 tokens for 80.1% on Terminal-Bench 2.1 against roughly 80,000 for a slightly higher score. That axis is the one agent buyers needed. The “3–4× less inference compute” attached to it is an estimate over generated tokens that omits prefill, and on a twenty-step loop a 3× brevity win pays out as 1.7× while a 3× price cut pays the full 3×.',
    'Reflection 把「每次尝试消耗的 token 数」和基准分数画在了同一张图上——其 501B 总参数、23B 激活的开放权重模型 Beam，在 Terminal-Bench 2.1 上以约 25,000 token 拿到 80.1%，而另一个分数略高的模型约需 80,000。这条轴正是做智能体的人需要的。但随之而来的「推理计算量少 3 到 4 倍」是一个只按生成 token 估算、并且不含 prefill 的数字；在一个二十步的循环里，3 倍的简洁只兑现成 1.7 倍，而 3 倍的降价能兑现完整的 3 倍。',
  ),
  tags: ['open-source', 'cost', 'evals', 'frontier-models'],
};

export default post;
