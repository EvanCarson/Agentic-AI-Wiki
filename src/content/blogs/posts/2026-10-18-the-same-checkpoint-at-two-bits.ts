import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-18',
  slug: 'the-same-checkpoint-at-two-bits',
  title: L(
    'The same checkpoint at two bits',
    '同一个检查点，压到两比特',
  ),
  summary: L(
    "NVIDIA's Nemotron 3.5 Bolt 74B-A9B-24GB, released 15 October 2026, is not a small model — it is the 120B Super VL checkpoint compressed to native 2-bit weights to fit a 24 GB budget. That turns local agent model selection into a bits-per-weight question instead of a parameter-count one, and the evidence that would settle it is the one nobody publishes: per-step tool-call reliability, not per-task benchmark scores. Two points of per-step reliability is a 27-point gap over twenty steps.",
    'NVIDIA 于 2026 年 10 月 15 日发布的 Nemotron 3.5 Bolt 74B-A9B-24GB 并不是一个小模型——它就是 120B 的 Super VL 检查点，被原生 2 bit 压缩以塞进 24 GB 预算。这把本地智能体的模型选型，从「参数量」问题变成了「每个权重几比特」问题，而能定下这件事的证据恰恰是没人公布的那一种：逐步的工具调用可靠性，而不是按任务算的基准分。每步可靠性差两个百分点，在二十步上就是 27 个百分点的差距。',
  ),
  tags: ['open-source', 'self-hosted', 'evals', 'infrastructure'],
};

export default post;
