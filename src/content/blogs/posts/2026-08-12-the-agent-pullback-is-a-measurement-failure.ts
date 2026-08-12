import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-12',
  slug: 'the-agent-pullback-is-a-measurement-failure',
  title: L(
    'Half of Enterprises Scaled Back Their Agents. Seven Percent Can Compute the Ratio.',
    '一半的企业收缩了自己的智能体。只有 7% 算得出那个比值。',
  ),
  summary: L(
    'KPMG found 49% of leaders scaled back an agent deployment over cost and 7% report established ROI — so nine in ten of the organisations that cut did it without a denominator. Cost is metered by a vendor that needs to bill you; value stays at zero until someone builds it. The measurement you cannot add later is the pre-agent baseline.',
    'KPMG 发现 49% 的负责人因成本收缩过智能体部署，而只有 7% 有站得住的 ROI 数字——也就是说，做出削减的组织里有九成没有分母。成本由一个需要向你收钱的厂商来计量；价值在有人把它造出来之前一直是零。事后补不上的那项测量，是智能体进场之前的基线。',
  ),
  tags: ['cost', 'ecosystem', 'agentic-ai', 'observability', 'evals'],
};

export default post;
