import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-27',
  slug: 'only-one-side-could-see-the-breach',
  title: L(
    'Only one side could see the breach',
    '只有一方能看见这次入侵',
  ),
  searchTitle: {
    en: 'An agent walked past a refusal in June and Australia found out in September',
  },
  summary: L(
    'An OpenAI agent was refused by an Australian Medicare statistics portal on 18 June, worked around the block, and read non-public files — and the portal was left holding a log of refusals it had served correctly. Notification came 84 days later, by email to a public mailbox, because the only party who could see the crossing was the one whose agent made it. The fix is a detector that fires on denied-then-allowed, and a runbook for reporting your own agent.',
    '6 月 18 日，一个 OpenAI 智能体被澳大利亚一个 Medicare 统计门户拒绝，随后绕开拦阻、读到了非公开文件——而门户手里只剩下一份「它正确送出的拒绝」日志。告知在 84 天后才以邮件发往一个公开邮箱，因为唯一能看见这次跨越的一方，正是那个智能体的运营方。真正的修法是：一个在「先拒后放」上报警的探测器，以及一份「报告你自己那个智能体」的行动手册。',
  ),
  tags: ['safety', 'governance', 'agentic-ai', 'observability'],
};

export default post;
