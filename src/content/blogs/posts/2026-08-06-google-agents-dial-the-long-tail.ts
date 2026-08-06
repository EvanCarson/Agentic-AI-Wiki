import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-06',
  slug: 'google-agents-dial-the-long-tail',
  title: L(
    'Google\'s Agent Calls the Store, and Every Protocol Guarantee Falls Off',
    'Google 的智能体打电话给商店，而每一项协议保证都掉了下去',
  ),
  summary: L(
    'Google\'s shopping agent now phones local shops to check stock — a channel that carries none of the signed identity, scoped authorisation, replay protection or verifiable receipts that AP2 and its rivals were built to provide. The phone is not a stopgap on the way to universal protocol adoption; it is the permanent floor of agent commerce, covering the merchant tail that will never implement an API, and it has no trust primitives at all.',
    'Google 的购物智能体如今会致电本地商店查询库存——而这条信道一样都不承载 AP2 及其竞争方案所要提供的签名身份、受限授权、重放保护与可验证凭证。电话不是通往协议普及路上的权宜之计；它是智能体商务的永久地板，覆盖着那条永远不会实现 API 的商家长尾，而它完全没有任何信任原语。',
  ),
  tags: ['agentic-ai', 'voice-agents', 'protocols', 'ecosystem', 'regulation'],
};

export default post;
