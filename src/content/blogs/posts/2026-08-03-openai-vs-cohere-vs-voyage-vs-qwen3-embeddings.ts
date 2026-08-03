import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-03',
  slug: 'openai-vs-cohere-vs-voyage-vs-qwen3-embeddings',
  title: L(
    'OpenAI vs Cohere vs Voyage vs Qwen3: The Model You Cannot Cheaply Un-Choose',
    'OpenAI、Cohere、Voyage 与 Qwen3：那个换不起的模型',
  ),
  summary: L(
    'Swapping your LLM edits a prompt. Swapping your embedding model re-embeds the corpus, rebuilds the index and invalidates every retrieval number you have — vectors from two models are not comparable, so there is no gradual migration. That makes this the one choice in a RAG stack you make under lock-in, and the deciding numbers are bytes per vector and who controls the model lifecycle, not a leaderboard rank.',
    '换掉 LLM，改的是一段提示词。换掉嵌入模型，要重嵌整个语料、重建索引，并让你手上所有检索数字全部作废——两个模型产出的向量彼此不可比，因此不存在渐进迁移。这让它成为 RAG 栈里唯一一个在锁定状态下做出的选择，而真正定案的数字是每条向量占多少字节、以及模型的生命周期由谁掌控，不是排行榜名次。',
  ),
  tags: ['agent-comparison', 'rag', 'vector-databases', 'cost'],
};

export default post;
