import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-15',
  slug: 'fifteen-hours-is-the-wrong-clock',
  title: L(
    'Fifteen hours is the wrong clock for an agent insider',
    '十五小时是给智能体内部人用错了的那只钟',
  ),
  summary: L(
    'Trellix surveyed 600 CISOs: 95% had an insider incident involving an AI or autonomous system in the past year, 78% have widened the definition of insider risk to include agents, and detection plus response takes about fifteen hours. An injected agent finishes inside the first of them — so extending the category without moving the control from detection to pre-authorisation buys a reporting function, not a defence.',
    'Trellix 调查了 600 位 CISO：95% 在过去一年里遇到过牵涉 AI 或自主系统的内部事件，78% 已把智能体纳入内部风险的定义，而检测加响应要花大约十五小时。一个被注入的智能体在第一个小时之内就收工了——所以只扩展定义、不把控制从「检测」挪到「事前授权」，买到的是一项报告职能，不是一道防御。',
  ),
  tags: ['governance', 'safety', 'agentic-ai', 'observability'],
};

export default post;
