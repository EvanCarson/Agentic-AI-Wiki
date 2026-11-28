import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-28',
  slug: 'the-publisher-pays-for-the-query',
  title: L(
    'The publisher pays for the query now',
    '现在是出版方在为查询付费',
  ),
  summary: L(
    'Cloudflare’s Search for Agents, shipped 25 November 2026, puts a retrieval API on your own domain behind one toggle — and bills you, not the agent, for every question asked. No assistant has said it will look for the endpoint, and the meter starts 1 December.',
    'Cloudflare 在 2026 年 11 月 25 日发布的 Search for Agents，用一个开关就在你自己的域名上架起一个检索 API——而每一个被问出的问题，账单寄给你、不是寄给智能体。至今没有任何助手说过它会去找这个端点，而计量从 12 月 1 日开始。',
  ),
  tags: ['agentic-ai', 'infrastructure', 'rag', 'ecosystem'],
};

export default post;
