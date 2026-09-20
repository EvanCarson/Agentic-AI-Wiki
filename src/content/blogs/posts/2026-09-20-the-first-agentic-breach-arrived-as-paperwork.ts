import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-20',
  slug: 'the-first-agentic-breach-arrived-as-paperwork',
  title: L(
    'The first agentic breach arrived as paperwork — and the form has no field for it',
    '第一起智能体入侵是以一份文书抵达的——而那张表单没有能写下它的字段',
  ),
  searchTitle: { en: 'AEPD first AI agent data breach notification explained' },
  summary: L(
    'Every public sign that agents are being used to attack people has come from the attacker\'s side of the wire. Spain\'s AEPD broke that pattern with a breach notification filed by the victim — compelled, defender-side, adversary-independent evidence, which is the only kind that could ever produce a base rate. The agency\'s own caveat is the story: one notification is not a trend, and the register it landed in has no field that would make a thousand of them one either.',
    '至今每一条「智能体正被用来攻击他人」的公开证据，都来自线缆的攻击方那一侧。西班牙 AEPD 打破了这个格局：这次是受害方依法提交的一份泄露通报——被强制的、防守方的、不依赖对手配合的证据，而这也是唯一有可能产出基线率的那一类。真正的故事是该机构自己的那句告诫：一份通报构不成趋势；而它落进的那个登记册里，没有任何字段能让一千份通报构成趋势。',
  ),
  tags: ['agentic-ai', 'safety', 'governance', 'regulation'],
};

export default post;
