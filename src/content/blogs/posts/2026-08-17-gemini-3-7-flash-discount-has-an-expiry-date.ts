import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-17',
  slug: 'gemini-3-7-flash-discount-has-an-expiry-date',
  title: L(
    'Gemini 3.7 Flash did not cut the price — it put a date on it',
    'Gemini 3.7 Flash 没有降价——它给价格加了一个日期',
  ),
  summary: L(
    'The standard rate is $1.50 / $7.50 per million tokens, exactly what 3.6 Flash already listed at. What shipped on 13 August is a better model at the same list price with a discount that expires on 31 December — a known, dated 2× step in unit cost, landing on whatever trajectories you tuned while it was cheap.',
    '标准价是每百万 token 1.50/7.50 美元，与 3.6 Flash 早已挂出的价格分毫不差。8 月 13 日发布的，是同一挂牌价下的一个更好的模型，外加一份 12 月 31 日到期的折扣——一次日期已知的单位成本翻倍，而它会落在你趁便宜时调出来的那些轨迹上。',
  ),
  tags: ['frontier-models', 'cost', 'agentic-ai'],
};

export default post;
