import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-22',
  slug: 'mcp-went-stateless-the-state-moved',
  title: L(
    'MCP went stateless, and the state just moved',
    'MCP 变成无状态了，而状态只是挪了个地方',
  ),
  summary: L(
    'The 2026-07-28 MCP spec deleted the initialize handshake and the session-id header, so a server can now run behind a plain round-robin load balancer. That operational win is real — but statelessness is a transport property, not a system property. The session did not disappear; its bookkeeping moved onto every request, and the durability that long-running agents actually need came back in through the AWS-contributed Tasks extension as explicit handles. Read the two together before you celebrate a simpler protocol.',
    '2026-07-28 版 MCP 规范删掉了 initialize 握手与 session-id 头，于是一个服务器现在可以跑在一台普通的轮询负载均衡器后面。这个运维上的胜利是真的——但无状态是一种传输层性质，不是系统性质。会话没有消失；它的记账挪到了每一个请求上，而长时间运行的智能体真正需要的那份持久性，又通过 AWS 贡献的 Tasks 扩展、以显式句柄的形式回来了。在你为"更简单的协议"欢呼之前，请把这两件事放在一起读。',
  ),
  tags: ['mcp', 'protocols', 'ecosystem', 'infrastructure'],
};

export default post;
