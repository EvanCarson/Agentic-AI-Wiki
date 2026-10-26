import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-26',
  slug: 'entra-agent-id-vs-okta-agent-sso-vs-gemini-agent-vs-1password-for-agents',
  title: L(
    'Entra Agent ID vs Okta Agent SSO vs Gemini Enterprise vs 1Password for Agents',
    'Entra Agent ID 对比 Okta Agent SSO 对比 Gemini Enterprise 对比 1Password for Agents',
  ),
  summary: L(
    "Four products now give an agent a name, and a name is not a leash. The question that separates them is what the agent is still holding after you revoke: Okta mints a short-lived ID-JAG per connection and refuses the next one, Entra gives every agent a directory object but gates agent Conditional Access behind Agent 365 at $15 per user per month, Gemini Enterprise hands the agent a Workspace mailbox in private preview and leaves subagent revocation unstated, and 1Password never lets the agent see the secret at all — while selling that only to consumers.",
    '现在有四款产品可以给智能体一个名字，而名字不是牵绳。真正区分它们的问题是：在你吊销之后，智能体手上还握着什么。Okta 按连接签发短命的 ID-JAG，并直接拒掉下一枚；Entra 给每个智能体一个目录对象，却把面向智能体的条件访问圈在每用户每月 15 美元的 Agent 365 后面；Gemini Enterprise 在私有预览里给智能体发了一个 Workspace 邮箱，而子智能体如何吊销未作说明；1Password 则根本不让智能体看见那个秘密——但它只把这件事卖给消费者。',
  ),
  tags: ['agent-comparison', 'agentic-ai', 'governance', 'infrastructure', 'safety'],
};

export default post;
