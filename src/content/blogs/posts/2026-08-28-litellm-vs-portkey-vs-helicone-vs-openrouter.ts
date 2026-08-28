import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-28',
  slug: 'litellm-vs-portkey-vs-helicone-vs-openrouter',
  title: L(
    'LiteLLM vs Portkey vs Helicone vs OpenRouter: in the path, or beside it',
    'LiteLLM、Portkey、Helicone 与 OpenRouter：在请求路径上，还是在旁边',
  ),
  summary: L(
    'Two binary questions decide this and no feature list does: is the gateway inside the request path, and who holds the provider credential. Everything a gateway does that changes a request — caching, fallback, rate limiting, key rotation — requires the first, and everything about your blast radius and your bill follows from the second. For agents both answers get multiplied by step count, which is why a choice that is merely fine for a chat app can be structurally wrong for a loop.',
    '决定这件事的是两个二选一的问题，而不是任何功能清单：网关在不在请求路径上，以及谁持有厂商凭证。网关所做的一切会改变请求的事情——缓存、故障转移、限流、密钥轮换——都需要第一个条件；而你的爆炸半径与账单则全都由第二个条件推导出来。对智能体而言，这两个答案都要乘上步数——这正是为什么一个对聊天应用来说还行的选择，对一个循环来说可能在结构上就是错的。',
  ),
  tags: ['agent-comparison', 'infrastructure', 'cost', 'observability'],
};

export default post;
