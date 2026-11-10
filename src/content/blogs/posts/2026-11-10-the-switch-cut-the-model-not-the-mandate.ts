import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-10',
  slug: 'the-switch-cut-the-model-not-the-mandate',
  title: L(
    'The switch cut the model, not the mandate',
    '开关切掉的是模型，不是授权',
  ),
  summary: L(
    'CrowdStrike shipped an AI Kill Switch in Falcon Guardian on 3 November 2026, and its enforcement point tells you exactly what it can stop: it directs connected AI gateways to block the models behind an agent\'s decisions. That revokes inference. It does not revoke the agent\'s credentials, and it does not undo the writes already committed — Gartner called it an emergency brake, not a rewind button. An agent holds three separable grants, a kill switch covers one of them, and the other two are yours to build and time.',
    'CrowdStrike 于 2026 年 11 月 3 日在 Falcon Guardian 里交付了 AI Kill Switch，而它的执行点恰好说明了它能停住什么：它指挥已接入的 AI 网关，拦掉支撑某个智能体决策的那些模型。这撤销的是推理。它不撤销智能体的凭据，也不撤回已经落定的写入——Gartner 把它称为一个急刹，而不是一个倒带按钮。一个智能体握着三项可分开的授权，一个 kill switch 盖住其中一项，另外两项得由你自己建、自己测时延。',
  ),
  tags: ['safety', 'governance', 'agentic-ai', 'infrastructure'],
};

export default post;
