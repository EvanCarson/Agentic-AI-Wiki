import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-01',
  slug: 'langsmith-vs-braintrust-vs-helicone-vs-arize-phoenix',
  title: L(
    'LangSmith vs Braintrust vs Helicone vs Arize Phoenix: Four Loops the Eval/Observability Stack Was Built to Close',
    'LangSmith、Braintrust、Helicone 与 Arize Phoenix：评测与可观测性栈被设计去闭合的四种回路',
  ),
  summary: L(
    'All four ship traces, datasets, and evaluators — the feature lists nearly match. What separates them is which feedback loop they were built to close: the dev loop, CI, the production gateway, or model-monitoring drift.',
    '四款产品都提供 trace、数据集和评测器，功能清单几乎重合。真正把它们分开的，是各自被设计去闭合的那条反馈回路：开发回路、CI、生产网关，还是模型监控漂移。',
  ),
  tags: ['agent-comparison', 'observability', 'evals', 'infrastructure'],
};

export default post;
