import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-12',
  slug: 'agentcore-vs-foundry-vs-vertex-agent-engine-vs-cloudflare-agents',
  title: L(
    'AgentCore vs Foundry vs Vertex AI Agent Engine vs Cloudflare Agents: Nobody Is Selling You the Loop',
    'AgentCore vs Foundry vs Vertex AI Agent Engine vs Cloudflare Agents：没人是在把那个循环卖给你',
  ),
  summary: L(
    'Two of the four bill the agent loop at about nine cents per vCPU-hour and their prices are 3.6% apart; the other two do not charge for it at all. What each is actually selling is a place to keep the conversation — and AWS closing Bedrock Agents Classic to new customers on 30 July 2026 is the clearest evidence yet about which half of a managed runtime you can afford to rent.',
    '四家里有两家按每 vCPU 小时约九分钱计费那个智能体循环，两个价格相差 3.6%；另外两家干脆不为它收钱。它们真正在卖的，是一个存放对话的地方——而 AWS 在 2026 年 7 月 30 日把 Bedrock Agents Classic 对新客户关闭，是迄今最清楚的证据：托管运行时的哪一半你租得起。',
  ),
  tags: ['agent-comparison', 'infrastructure', 'cost', 'orchestration', 'ecosystem'],
};

export default post;
