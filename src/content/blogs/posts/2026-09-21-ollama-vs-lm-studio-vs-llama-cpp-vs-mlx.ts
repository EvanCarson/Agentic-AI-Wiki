import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-21',
  slug: 'ollama-vs-lm-studio-vs-llama-cpp-vs-mlx',
  title: L(
    'Ollama vs LM Studio vs llama.cpp vs MLX: the tool call is the whole difference',
    'Ollama、LM Studio、llama.cpp 与 MLX：差别全在那一次工具调用上',
  ),
  summary: L(
    'Four local runtimes, the same weights, four different prompts going in and four different answers to whether a tool call comes back parsed. None of that is throughput, and throughput is the only axis anyone compares.',
    '四个本地运行时、同一份权重，进去的是四份不同的提示词，出来的是「工具调用到底解析没解析出来」的四种答案。这些都与吞吐无关，而吞吐是唯一被拿来比较的那根轴。',
  ),
  tags: ['agent-comparison', 'self-hosted', 'open-source', 'infrastructure', 'structured-outputs'],
};

export default post;
