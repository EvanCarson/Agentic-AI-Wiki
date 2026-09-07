import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-07',
  slug: 'one-in-ten-outages-is-not-about-agents',
  title: L(
    'One in ten outages is now AI. That number is not about agents.',
    '现在每十次故障就有一次是 AI，而这个数字说的并不是智能体',
  ),
  summary: L(
    'The AI share of disclosed outages rose from 1.7% to 10.7% in three years, and agents are not in that denominator — it counts incidents published by AI companies against incidents published by anyone, so it climbs as the sector grows. The figure in the same research that is about agents: 188 of 344 verified enterprise AI incidents had no attacker at all, and the nine documented production deletions share one stage, a credential that outlived the phase it was granted for.',
    'AI 在披露故障中的占比三年内从 1.7% 升到 10.7%，而这个分母里没有智能体——它算的是 AI 公司发布的事故比上所有人发布的事故，所以行业一变大它就往上爬。同一批研究里真正关于智能体的那个数字是：344 起经核实的企业级 AI 事故中有 188 起根本没有攻击者，而那九起有据可查的生产删除共用同一个阶段——一份比它的签发理由活得更久的凭据。',
  ),
  tags: ['safety', 'agentic-ai', 'governance', 'observability', 'ecosystem'],
};

export default post;
