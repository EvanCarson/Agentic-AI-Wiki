import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-05',
  slug: 'cohere-vs-voyage-vs-jina-vs-qwen3-rerankers',
  title: L(
    'Cohere vs Voyage vs Jina vs Qwen3: The Retrieval Model You Can Actually Un-Choose',
    'Cohere、Voyage、Jina 与 Qwen3：检索栈里唯一一个你真能反悔的模型',
  ),
  summary: L(
    'A reranker touches no index and holds no state, so swapping one is an afternoon — which finally makes chasing the leaderboard rational, except the leaderboard measures the axis where these four differ least. What differs by more than an order of magnitude is the billing unit and the licence, and both bite hardest at agent scale.',
    '重排序模型不碰索引、不持状态，换一个只要一个下午——这终于让"追排行榜"变得理性了，只可惜排行榜量的恰恰是这四家差异最小的那条轴。真正差出一个数量级以上的是计费单位和许可证，而这两样在智能体规模下咬得最狠。',
  ),
  tags: ['agent-comparison', 'rag', 'infrastructure', 'cost', 'open-source'],
};

export default post;
