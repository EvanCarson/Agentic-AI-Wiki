import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-13',
  slug: 'the-re-grade-was-a-verdict-not-a-record',
  title: L(
    'The re-grade was a verdict, not a record',
    '那次重新定级给的是裁决，不是记录',
  ),
  summary: L(
    'An agent changed the grade of 75.1% of 9,967 HIGH cloud findings — 58.5% down, 16.6% up. The downgrades are the number that will be quoted and the upgrades are the number that matters, because the same research group\'s benchmark puts verdicts at 94% and the answer behind them at 78%. A re-grade you cannot reconstruct orders your queue; it does not close anything.',
    '一个智能体改掉了 9,967 条 HIGH 级云端发现中 75.1% 的定级——58.5% 降级，16.6% 升级。被引用的会是降级那个数字，而要紧的是升级那个，因为同一研究团队的基准把裁决放在 94%、把裁决背后的答案放在 78%。一次你无法复原的重新定级，能给你的队列排序；它关不掉任何东西。',
  ),
  tags: ['safety', 'agentic-ai', 'evals'],
};

export default post;
