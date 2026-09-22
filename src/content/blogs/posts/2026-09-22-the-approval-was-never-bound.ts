import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-22',
  slug: 'the-approval-was-never-bound',
  title: L(
    'The approval was never bound to the action',
    '那次批准从未与动作绑定',
  ),
  searchTitle: {
    en: 'The approval was never bound',
  },
  summary: L(
    'A human approves a $40 refund and the runtime executes something else — no injection, no sandbox escape, just an approval stored as a boolean against an identifier while the arguments stayed writable. Loopjacking reproduced it across seven Agno releases; one SDK in the sample rejected it, and the difference is three lines of design.',
    '人批准了一笔 40 美元的退款，运行时却执行了别的东西——没有注入、没有沙箱逃逸，只是批准被存成了挂在标识符上的一个布尔值，而参数仍然可写。Loopjacking 在 Agno 的七个版本上复现了它；样本里有一个 SDK 拒绝了它，而差别只是三行设计。',
  ),
  tags: ['safety', 'agent-frameworks', 'agent-ux', 'orchestration'],
};

export default post;
