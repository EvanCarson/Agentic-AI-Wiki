import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-07-28',
  slug: 'kimi-k3-open-weights-reality-check',
  title: L(
    'Kimi K3 Is Open Weights. That Is Not the Same as Cheap, Local, or Unrestricted',
    'Kimi K3 开放权重，但这不等于便宜、本地或不受限',
  ),
  searchTitle: { en: 'Kimi K3 Open Weights: Cost, Local Hosting and Limits' },
  summary: L(
    'Moonshot released 2.8 trillion parameters as a free download on 27 July — and priced its own API above the model it replaced, while no single GPU on the market can hold the weights. Open weights buy agent builders exactly one thing that closed APIs cannot, and it is not cost.',
    'Moonshot 在 7 月 27 日把 2.8 万亿参数做成了免费下载——同时把自家 API 定价定得高于它所取代的上一代模型，而市面上没有任何一块 GPU 装得下这份权重。开放权重为智能体开发者换来的恰恰只有一样闭源 API 给不了的东西，而那样东西不是成本。',
  ),
  tags: ['frontier-models', 'open-source', 'self-hosted', 'model-comparison', 'cost', 'infrastructure'],
};

export default post;
