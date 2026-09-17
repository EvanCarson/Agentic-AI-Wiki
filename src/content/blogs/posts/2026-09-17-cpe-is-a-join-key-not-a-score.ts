import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-17',
  slug: 'cpe-is-a-join-key-not-a-score',
  title: L(
    'CPE is a join key, not a score — NIST is putting an agent inside the NVD',
    'CPE 是一个连接键，不是一个评分——NIST 正在把一个智能体放进 NVD',
  ),
  summary: L(
    'NIST presented its AI agent enrichment workflow for the National Vulnerability Database on 17 September, and the open question is not whether the model is accurate. Enrichment produces three fields that fail in three incompatible ways: a wrong CVSS score gets argued about, a wrong CWE degrades analytics, and a wrong CPE returns no rows at all. One of those failures is silent, and the record format has no field in which a machine can say it was not sure.',
    'NIST 在 9 月 17 日介绍了它为国家漏洞数据库（NVD）搭建的 AI 智能体富化工作流，而悬而未决的问题并不是「模型准不准」。富化产出三个字段，而它们以三种互不相容的方式失效：CVSS 评分错了会被拿出来争论，CWE 错了会让分析慢慢变质，而 CPE 错了则是一行都查不出来。这三种失效里有一种是无声的，而那份记录的格式里，压根没有一个字段能让机器说出「我当时并不确定」。',
  ),
  tags: ['safety', 'governance', 'ecosystem', 'agentic-ai'],
};

export default post;
