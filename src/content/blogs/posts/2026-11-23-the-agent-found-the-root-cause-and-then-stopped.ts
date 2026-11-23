import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-23',
  slug: 'the-agent-found-the-root-cause-and-then-stopped',
  title: L(
    'The agent found the root cause and then stopped',
    '智能体找到了根因，然后就停下了',
  ),
  summary: L(
    'Databricks put Genie ZeroOps into public beta on 19 November 2026 with no authority to change anything: it watches jobs, pipelines and tables, works out the root cause, and proposes a fix on a branch for a human to approve. The restraint is now standard and is not the interesting part. The interesting part is that the root-cause step runs on Unity Catalog lineage — which means the capability on sale is the dependency graph you already built, and an ops agent without one can only guess.',
    'Databricks 在 2026 年 11 月 19 日把 Genie ZeroOps 推进公开测试，而它没有任何改动权限：它盯着作业、流水线与表，推断出根因，然后在一个分支上提出修复方案，等人来批。这种克制如今已是标配，并不是重点。重点在于，根因那一步跑在 Unity Catalog 的血缘之上——这意味着真正被出售的能力，是你早就建好的依赖图；而一个没有依赖图的运维智能体，只能猜。',
  ),
  tags: ['agentic-ai', 'observability', 'developer-tools', 'ecosystem'],
};

export default post;
