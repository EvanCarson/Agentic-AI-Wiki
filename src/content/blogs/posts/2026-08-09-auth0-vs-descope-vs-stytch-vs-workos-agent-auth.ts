import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-09',
  slug: 'auth0-vs-descope-vs-stytch-vs-workos-agent-auth',
  title: L(
    'Auth0 vs Descope vs Stytch vs WorkOS: Agent Auth Is Two Products',
    'Auth0 vs Descope vs Stytch vs WorkOS：智能体认证其实是两款产品',
  ),
  summary: L(
    'Every identity vendor now sells “auth for AI agents”, and the phrase covers two opposite problems: letting an agent into your app, and letting your agent out to someone else’s API. Pick on direction first — and notice that a token vault holding a user’s full grant has relocated the credential rather than shrunk it.',
    '如今每家身份厂商都在卖"面向 AI 智能体的认证"，而这个说法罩着两个方向相反的问题：让别人的智能体进得来，和让你的智能体出得去。先按方向来选——并且要留意：一个存着用户完整授权的令牌保险库，只是把凭据挪了个地方，并没有把它变小。',
  ),
  tags: ['agent-comparison', 'mcp', 'protocols', 'developer-tools', 'infrastructure'],
};

export default post;
