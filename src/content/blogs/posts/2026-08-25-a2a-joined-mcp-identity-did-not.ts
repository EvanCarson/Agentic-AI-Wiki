import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-25',
  slug: 'a2a-joined-mcp-identity-did-not',
  title: L(
    'A2A Moved In With MCP. The Identity Layer Stayed Outside.',
    'A2A 搬进了 MCP 的屋檐下，身份层却留在门外',
  ),
  summary: L(
    'On 20 August Google moved A2A into the Agentic AI Foundation, so both protocols in the standard agent stack now share a board, a roadmap and a trademark holder. What they still do not share is a delegation primitive — and the identity work that would supply one is being stewarded at a different foundation entirely.',
    '8 月 20 日，谷歌把 A2A 迁入 Agentic AI Foundation，于是标准智能体栈里的两个协议如今共用一个理事会、一份路线图和一个商标持有者。它们仍然不共用的，是一套委托原语——而本该提供这套原语的身份工作，眼下由另一家基金会托管。',
  ),
  tags: ['protocols', 'mcp', 'ecosystem', 'safety', 'governance', 'agentic-ai'],
};

export default post;
