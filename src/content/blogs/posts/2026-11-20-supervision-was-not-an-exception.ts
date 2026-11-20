import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-20',
  slug: 'supervision-was-not-an-exception',
  title: L(
    'United Banned the Supervised Agent Too, and That Is the Whole Lesson',
    'United 连「有人盯着的」智能体也一并禁了，而这正是全部要点',
  ),
  summary: L(
    "United's revised Contract of Carriage, dated 11 November 2026, bans AI agents from buying, changing or servicing a ticket even where the passenger oversees and approves the action — and no outlet covering it could say how the airline intends to detect an agent at all. That combination is the design statement: when the predicate is unobservable, the only control left is a remedy, so enforcement moved to a right to cancel the booking without notice. Fare search stays open because a read has nothing to reverse. Put your prohibition one layer upstream of the first irreversible step, or you have a preference rather than a policy.",
    '联合航空 2026 年 11 月 11 日版《运输合同》禁止 AI 智能体购票、改票或办理机票事务——哪怕旅客亲自监督并确认操作也不例外；而报道此事的媒体没有一家能说清航司究竟打算如何识别智能体。这两件事放在一起就是一份设计声明：当判定条件本身无法观测时，唯一还剩下的手段就是事后救济，于是执行点被挪到了「可不经通知取消该预订」这项权利上。查询票价依然开放，因为「读」没有什么可撤销的。把禁令放在第一个不可逆动作的上一层，否则你有的只是一种倾向，而不是一项政策。',
  ),
  tags: ['agentic-ai', 'ecosystem', 'governance', 'browser-agents'],
};

export default post;
