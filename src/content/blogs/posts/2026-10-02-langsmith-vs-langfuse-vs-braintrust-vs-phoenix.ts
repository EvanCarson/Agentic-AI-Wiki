import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-02',
  slug: 'langsmith-vs-langfuse-vs-braintrust-vs-phoenix',
  title: L(
    'LangSmith vs Langfuse vs Braintrust vs Phoenix',
    'LangSmith、Langfuse、Braintrust 与 Phoenix 对比',
  ),
  summary: L(
    'All four ingest OpenTelemetry, so "OTel support" decides nothing — the vocabulary that would make a trace portable is still entirely at Development stability. Pick on who owns the write path and the bulk read path, because production traces are the one asset you cannot re-create, and the licence badge is orthogonal to whether you can get them back.',
    '四者都能接收 OpenTelemetry，所以「支持 OTel」什么都没定下来——真正能让一条轨迹可迁移的那套词汇表，至今整体仍停在 Development 稳定级。请按「谁拥有写入路径与批量读出路径」来选，因为生产轨迹是你唯一无法重新造出来的资产，而许可证徽章跟你能不能把它们取回来是两回事。',
  ),
  tags: ['agent-comparison', 'observability', 'open-source', 'evals', 'infrastructure'],
};

export default post;
