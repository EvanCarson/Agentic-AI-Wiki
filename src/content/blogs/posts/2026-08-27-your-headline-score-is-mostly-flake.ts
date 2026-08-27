import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-27',
  slug: 'your-headline-score-is-mostly-flake',
  title: L(
    '65% Once, 25% Twenty Times: Your Headline Score Is Mostly Flake',
    '65% 跑一次，25% 跑二十次：你的头条分数大半是抖动',
  ),
  summary: L(
    'Microsoft\'s new Thinkingbox benchmark reports 65.36% pass@1 and 25.25% pass^20 for its strongest model. If failures were independent, twenty-in-a-row would be 0.02% — so the agent is dependable on a quarter of the work and a coin flip on most of the rest, and the coin-flip band is what passes review and ships.',
    '微软新发布的 Thinkingbox 基准里，最强模型的 pass@1 是 65.36%，pass^20 是 25.25%。若失败彼此独立，连中二十次应当只有 0.02%——所以这个智能体在四分之一的工作上可靠，在其余大部分上是一枚硬币；而恰恰是抛硬币的那一段，会通过评审并被发布出去。',
  ),
  tags: ['evals', 'agentic-ai', 'open-source', 'observability'],
};

export default post;
