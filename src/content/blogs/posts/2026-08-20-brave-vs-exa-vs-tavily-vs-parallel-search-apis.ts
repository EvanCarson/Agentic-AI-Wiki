import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-20',
  slug: 'brave-vs-exa-vs-tavily-vs-parallel-search-apis',
  title: L(
    'Brave vs Exa vs Tavily vs Parallel: the price unit tells you who reads the page',
    'Brave vs Exa vs Tavily vs Parallel：计价单位说明了谁去读那个页面',
  ),
  summary: L(
    'These four price a search between $1 and $16 per thousand, and the spread is not margin — it is how far down the retrieval pipeline each one reads. Price a whole research turn instead of a call and the ordering inverts: the cheapest rate card produces a turn costing three times the dearest one.',
    '这四家把一次搜索定在每千次 1 到 16 美元之间，而这道价差不是毛利——它是各自在检索流水线上读到多深。改用"一整个研究回合"而不是"一次调用"来计价，排序就会翻转：价目表最便宜的那个，跑出来的回合成本是最贵那个的三倍。',
  ),
  tags: ['agent-comparison', 'rag', 'cost', 'infrastructure', 'developer-tools'],
};

export default post;
