import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-30',
  slug: 'agentgateway-vs-contextforge-vs-obot-vs-docker-mcp-gateway',
  title: L(
    'agentgateway vs ContextForge vs Obot vs Docker MCP Gateway: whose identity reaches the server',
    'agentgateway、ContextForge、Obot 与 Docker MCP Gateway：到底是谁的身份抵达了服务器',
  ),
  summary: L(
    'The MCP specification settles the negative — as of revision 2026-07-28 a server MUST NOT pass through the token it received from its client — but leaves RFC 8693 token exchange on the roadmap, so four gateways answer the question four different ways. agentgateway and ContextForge exchange the token; Obot attaches the user’s stored upstream token and is mid-migration between the two; Docker MCP Gateway has no user concept at all, which is honest for a workstation and disqualifying for a fleet. Pick on that axis, and notice that Docker’s isolation story is the best of the four on an axis the others do not compete on.',
    'MCP 规范只裁定了否定面——自 2026-07-28 版本起，服务器「绝不可」把它从客户端收到的令牌原样透传——却把 RFC 8693 令牌交换留在了路线图上；于是四个网关给出了四种不同的答案。agentgateway 与 ContextForge 做令牌交换；Obot 附上用户存好的上游令牌，并且正处在两种模型之间的迁移中；Docker MCP Gateway 则压根没有「用户」这个概念——这对一台工作站是诚实的，对一支集群则是出局的。按这条轴来选；同时请注意，在其他三家并不参赛的那条轴上，Docker 的隔离方案是四者中最强的。',
  ),
  tags: ['agent-comparison', 'mcp', 'open-source', 'infrastructure', 'protocols'],
};

export default post;
