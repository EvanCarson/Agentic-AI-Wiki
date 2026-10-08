import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-08',
  slug: 'vllm-vs-sglang-vs-tensorrt-llm-vs-dynamo',
  title: L(
    'vLLM vs SGLang vs TensorRT-LLM vs Dynamo: the second replica is where your cache went',
    'vLLM、SGLang、TensorRT-LLM 与 Dynamo 对比：你的缓存是在第二个副本上丢掉的',
  ),
  summary: L(
    'Published head-to-heads on these engines range from a 29% edge to a 6.4x one, because none of them state the parameter that decides an agent workload: how much of each request is a prefix you already paid for. Three of these four are engines and one is a router — and the moment you add a second replica, your cache hit rate stops being an engine property at all.',
    '对这些引擎已发表的对比，结论从领先 29% 一路到 6.4 倍，因为没有一份说清了那个真正决定智能体负载的参数：每个请求里有多大一部分是你已经付过钱的前缀。这四者里三个是引擎、一个是路由器——而当你加上第二个副本的那一刻，你的缓存命中率就压根不再是引擎的性质了。',
  ),
  tags: ['agent-comparison', 'infrastructure', 'open-source', 'self-hosted'],
};

export default post;
