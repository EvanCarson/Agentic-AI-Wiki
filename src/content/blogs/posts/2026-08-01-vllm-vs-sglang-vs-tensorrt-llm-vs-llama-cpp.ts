import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-01',
  slug: 'vllm-vs-sglang-vs-tensorrt-llm-vs-llama-cpp',
  title: L(
    'vLLM vs SGLang vs TensorRT-LLM vs llama.cpp: Throughput Is the Wrong Benchmark for Agents',
    'vLLM、SGLang、TensorRT-LLM 与 llama.cpp：吞吐量是评判智能体服务的错误基准',
  ),
  summary: L(
    'Every comparison of these four opens with tokens per second on a fixed batch — the one number that transfers worst to agent traffic, where the same prompt comes back twenty times with a few hundred tokens appended. What separates them is what the KV cache is keyed on, whether constrained decoding survives a full batch, and how much of your quarter the build step eats.',
    '这四者的每一份对比，开头都是固定 batch 下的每秒 token 数——而这恰恰是最难迁移到智能体流量上的那个数字：在那里，同一段提示词会带着几百个新 token 回来二十次。真正把它们区分开的，是 KV 缓存以什么为键、受约束解码在满 batch 下还能不能撑住，以及那道构建步骤要吃掉你一个季度里的多少。',
  ),
  tags: ['agent-comparison', 'open-source', 'infrastructure', 'self-hosted', 'cost'],
};

export default post;
