import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-04',
  slug: 'eu-ai-act-agents-must-name-their-principal',
  title: L(
    'Your Agent Now Has to Say Who Sent It',
    '你的智能体现在必须说出是谁派它来的',
  ),
  summary: L(
    'The EU AI Act deadline everyone prepared for moved to December 2027 — and the one nobody prepared for landed on 2 August 2026. The Commission\'s final Article 50 guidelines read the transparency duty onto agents and ask for two disclosures, not one: that the agent is artificial, and the person on whose behalf it is acting. The second is a field your protocol does not carry and a chokepoint your architecture does not have.',
    '所有人都在准备的那个欧盟《人工智能法案》期限被推到了 2027 年 12 月——而没人准备的那个，在 2026 年 8 月 2 日落地了。欧盟委员会关于第 50 条的最终指南把透明度义务读到了智能体身上，并且要求披露两件事而非一件：智能体是人工的，以及它在为谁行事。第二件是你的协议没有携带的字段，也是你的架构没有的那个收口点。',
  ),
  tags: ['governance', 'regulation', 'agentic-ai', 'multi-agent-systems'],
};

export default post;
