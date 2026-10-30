import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-30',
  slug: 'poppy-vs-ucp-vs-acp-vs-ap2',
  title: L(
    'Poppy vs UCP vs ACP vs AP2: three of them answer how an agent pays',
    'Poppy、UCP、ACP、AP2：其中三个回答的是智能体怎么付钱',
  ),
  summary: L(
    "Four agent standards are now on a commerce team's desk, and reading them as competitors is the mistake. ACP, UCP and AP2 all answer the same question — who may be charged, and up to how much — because each assumes the agent is a buyer. Poppy, which Sierra and Meta announced on 6 October 2026, assumes the agent is the user's delegate, has no payment story at all, and is therefore the only one of the four that collides with your login rather than your checkout.",
    '一个商务团队的桌上如今摆着四份智能体标准，而把它们读成互相竞争就是那处错误。ACP、UCP 与 AP2 回答的是同一个问题——谁可以被扣款、最多扣多少——因为它们每一个都假定智能体是买方。而由 Sierra 与 Meta 在 2026 年 10 月 6 日公布的 Poppy，假定智能体是用户的受托人，完全没有支付那一块，因此也是四者中唯一一个撞上你的登录、而不是撞上你的结账的。',
  ),
  tags: ['protocols', 'agentic-ai', 'ecosystem', 'agent-comparison'],
};

export default post;
