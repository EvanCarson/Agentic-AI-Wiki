import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-10',
  slug: 'langfuse-vs-langsmith-vs-phoenix-vs-braintrust',
  title: L(
    'Langfuse vs LangSmith vs Phoenix vs Braintrust: The Meter Is the Product',
    'Langfuse vs LangSmith vs Phoenix vs Braintrust：计量方式才是产品',
  ),
  summary: L(
    'The feature grids converged, so the decision is licence and billing meter — and every meter prices the trace archive that becomes your golden set, regression baseline and fine-tuning corpus. Instrument against OpenTelemetry, dual-write the stream somewhere you own, and the platform becomes a swappable backend.',
    '功能表已经收敛，所以真正的决定在许可证与计费的计量单位——而每一种计量方式定价的，都是那份日后会变成你的黄金集、回归基线与微调语料的轨迹存档。按 OpenTelemetry 做仪表化、把这份流双写到一处你自己拥有的地方，平台就成了一个可替换的后端。',
  ),
  tags: ['agent-comparison', 'observability', 'evals', 'open-source', 'developer-tools', 'infrastructure'],
};

export default post;
