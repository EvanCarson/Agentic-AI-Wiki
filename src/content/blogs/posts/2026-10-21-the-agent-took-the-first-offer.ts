import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-21',
  slug: 'the-agent-took-the-first-offer',
  title: L(
    "Collison's agent researches for ten hours; today's takes the first offer",
    'Collison 设想的智能体会研究十小时，今天的智能体只拿第一份报价',
  ),
  summary: L(
    "Stripe's CEO argues that personal agents will be a structural subsidy for product quality. In Microsoft's simulated marketplace, agents picked the first offer 60 to 100 percent of the time, and more search results lowered welfare. Bounded rationality moves into the agent, sellers will aim at it, and whether quality wins depends on how widely the agent searches and who pays for it. Here is what to watch next.",
    'Stripe 首席执行官认为，个人智能体会成为对产品质量的结构性补贴。可在微软的模拟市场里，智能体有 60% 到 100% 的时候选了第一份报价，搜索结果变多反而降低了福利。有限理性搬进了智能体，卖家会瞄准它；质量能否胜出，取决于智能体搜得多广、由谁付费。本文也列出了接下来值得观察的信号。',
  ),
  tags: ['agentic-ai', 'ecosystem', 'protocols', 'prompt-injection', 'governance'],
};

export default post;
