import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-07-29',
  slug: 'litellm-vs-portkey-vs-cloudflare-ai-gateway-vs-kong-ai-gateway',
  title: L(
    'LiteLLM vs Portkey vs Cloudflare AI Gateway vs Kong AI Gateway: Four Bets on What Sits Between Your Agent and the Model',
    'LiteLLM、Portkey、Cloudflare AI Gateway 与 Kong AI Gateway：智能体与模型之间该摆什么的四种下注',
  ),
  summary: L(
    'Every AI gateway sells the same headline feature: automatic failover to a second provider. That feature is not an availability win — it is an untested deploy that fires only during an incident, onto a model your evals never covered. Choose instead on who operates the hop, because that is the decision you cannot reverse cheaply.',
    '每一个 AI 网关主打的都是同一个功能：自动故障转移到第二家厂商。那个功能并不是可用性上的胜利——它是一次只在事故期间才被触发的、未经测试的部署，而且落到一个你的评估从未覆盖过的模型上。真正该拿来做选择的是：谁来运维这一跳，因为那才是你没法便宜地反悔的决定。',
  ),
  tags: ['agent-comparison', 'infrastructure', 'orchestration', 'cost', 'developer-tools', 'open-source'],
};

export default post;
