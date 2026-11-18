import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-18',
  slug: 'argilla-vs-label-studio-vs-langfuse-vs-opik',
  title: L(
    'Argilla vs Label Studio vs Langfuse vs Opik: all four give you a queue, none checks the reviewers',
    'Argilla、Label Studio、Langfuse 与 Opik 对比：四个都给你一条队列，没有一个去查审阅者',
  ),
  searchTitle: {
    en: 'Human review of agent traces: Argilla vs Label Studio vs Langfuse vs Opik',
  },
  summary: L(
    'Human labels are the instrument every LLM judge is calibrated against, and as of November 2026 not one of these four computes annotator-versus-annotator agreement on a free tier — it is legacy in Argilla, Enterprise-only in Label Studio, and absent in Langfuse and Opik. Pick on the unit of review, then budget for agreement separately.',
    '人工标注是每一个 LLM 评判者用来校准的那把尺子，而截至 2026 年 11 月，这四者没有一个在免费层上计算「标注者对标注者」的一致性——在 Argilla 里它属于遗留版本，在 Label Studio 里只给企业版，在 Langfuse 与 Opik 里则干脆没有。请按「审阅单位」来选，再单独为一致性列预算。',
  ),
  tags: ['agent-comparison', 'evals', 'observability', 'open-source'],
};

export default post;
