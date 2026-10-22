import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-22',
  slug: 'the-model-proposes-the-ledger-decides',
  title: L(
    'The model proposes, the ledger decides: how finance is actually adopting agents',
    '模型提议，账本决定：金融业究竟如何采用智能体',
  ),
  summary: L(
    "Every finance deployment we could document draws the same line: the model reads, matches and drafts, and code or a named person decides what moves money. BNY, Allianz, Rillet, BlackLine, Ramp and Goldman; the failures where the line was missing; what US, EU, UK, Singapore and Hong Kong regulators asked for in 2026; the argument over human error rates; and five developments to watch.",
    '我们能查证的每一个金融部署都划了同一条线：模型负责阅读、匹配和起草，而动钱的事由代码或具名的人来决定。本文梳理 BNY、Allianz、Rillet、BlackLine、Ramp 与高盛的做法，缺了这条线时出过的事故，美国、欧盟、英国、新加坡与香港监管机构 2026 年提出的要求，围绕人工错误率的争论，以及接下来值得关注的五个动向。',
  ),
  tags: ['agentic-ai', 'governance', 'regulation', 'guardrails', 'applications'],
};

export default post;
