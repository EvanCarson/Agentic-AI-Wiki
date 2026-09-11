import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-11',
  slug: 'routellm-vs-not-diamond-vs-vllm-semantic-router-vs-openrouter-auto',
  title: L(
    'RouteLLM vs Not Diamond vs vLLM Semantic Router vs OpenRouter Auto',
    'RouteLLM、Not Diamond、vLLM Semantic Router 与 OpenRouter Auto',
  ),
  searchTitle: {
    en: 'LLM model routers in 2026: a classifier in your request path, and the eval it obliges you to run',
  },
  summary: L(
    'OpenRouter’s Auto Router runs Not Diamond underneath, so four products are three routing decisions. The one that matters for agents is not which model — it is how much computation a query deserves, which is what the vLLM Semantic Router classifies. And a router is a classifier whose errors are silent: it returns a valid, slightly worse answer with a 200, so the savings are the only number you will see unless you keep a held-out set. Inside an agent loop, per-step routing fights prompt caching and usually loses.',
    'OpenRouter 的 Auto Router 底下跑的是 Not Diamond，所以四个产品其实是三个路由决定。对智能体真正要紧的不是"选哪个模型"，而是"一条查询值得多少计算"——那正是 vLLM Semantic Router 所分类的东西。而路由器是一个错误无声的分类器：它会带着 200 返回一个有效、只是略差一点的答案，所以除非你留着一份留出集，否则你能看见的只有省下来的钱。在智能体循环内部，逐步路由会与提示词缓存打架，而且通常打输。',
  ),
  tags: ['agent-comparison', 'cost', 'infrastructure', 'open-source'],
};

export default post;
