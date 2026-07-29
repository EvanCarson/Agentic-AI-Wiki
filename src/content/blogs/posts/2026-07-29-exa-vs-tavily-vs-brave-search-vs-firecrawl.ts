import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-07-29',
  slug: 'exa-vs-tavily-vs-brave-search-vs-firecrawl',
  title: L(
    'Exa vs Tavily vs Brave Search vs Firecrawl: Four Bets on How an Agent Should Search the Web',
    'Exa、Tavily、Brave Search 与 Firecrawl：智能体该如何搜索网页的四种下注',
  ),
  summary: L(
    'List prices for agent search APIs cluster tightly around $5–8 per thousand queries, which makes the sticker the least interesting number in the comparison. What actually differs by an order of magnitude is how many tokens each one dumps into your context per result — and in an agent loop that re-sends its transcript every step, that is the bill.',
    '面向智能体的搜索 API，标价紧紧挤在每千次查询 5–8 美元这个区间，这让标价成了整场比较里最没意思的那个数字。真正相差一个数量级的，是每条结果往你的上下文里灌多少令牌——而在一个每步都重发全部对话记录的智能体循环里，那才是账单。',
  ),
  tags: ['agent-comparison', 'rag', 'developer-tools', 'infrastructure', 'cost'],
};

export default post;
