import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-10',
  slug: 'deepseek-harness-scores-include-the-scaffold',
  title: L(
    'DeepSeek Is Building a Harness, and the Benchmark Score Already Includes the Scaffold',
    'DeepSeek 在造自己的 Harness：那个基准分数里早已包含了脚手架',
  ),
  searchTitle: { en: 'DeepSeek Agent Harness: Benchmarks Include the Scaffold' },
  summary: L(
    'DeepSeek reported a DeepSWE result produced by a harness it had not released, and 712 open-source projects signed up for the beta in three days. Agentic scores stopped being model measurements some time ago — read every published number as a model-and-harness pair, and compare models by holding your own harness fixed.',
    'DeepSeek 用一套尚未发布的 harness 报出了 DeepSWE 成绩，而封闭测试三天里收到 712 个开源项目报名。智能体分数早就不再是对模型的测量——把每个公开数字都读成"模型 × harness"这一对，并通过钉死自己的 harness 来比较模型。',
  ),
  tags: ['agentic-ai', 'evals', 'open-source', 'coding-agents', 'frontier-models', 'ecosystem'],
};

export default post;
