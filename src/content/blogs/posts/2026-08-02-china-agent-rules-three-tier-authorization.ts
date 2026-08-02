import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-02',
  slug: 'china-agent-rules-three-tier-authorization',
  title: L(
    'China Wrote Down the Agent Design Doc Everyone Skipped',
    '中国把所有人都跳过的那份智能体设计文档写了下来',
  ),
  summary: L(
    'The Implementation Opinions on Intelligent Agents, in force since 15 July 2026, make one demand that no prompt can satisfy: sort every decision your agent can make into human-only, user-approved, or autonomous, write it down before you deploy, and never exceed what the user granted. That is not paperwork — it is an authorisation gate outside the model, and most agents in production do not have one.',
    '自 2026 年 7 月 15 日起施行的《智能体规范应用与创新发展实施意见》提出了一项任何提示词都满足不了的要求：把你的智能体能做的每一个决定分入"仅限人类""需用户授权""可自主"三档，在部署之前写下来，并且永不越过用户授予的范围。这不是文书工作——这是一道位于模型之外的授权关卡，而生产中的大多数智能体并没有它。',
  ),
  tags: ['governance', 'regulation', 'safety', 'agentic-ai'],
};

export default post;
