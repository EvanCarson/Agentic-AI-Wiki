import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-19',
  slug: 'the-front-door-closed-the-mcp-server-did-not',
  title: L(
    'The front door closed; the MCP server did not',
    '前门关了，MCP 服务端没关',
  ),
  summary: L(
    'Amazon, Yelp, Delta, JPMorgan and Schwab all shut third-party AI agents out within four weeks, and every one of them left a different door open. Schwab published both halves of the rule on its 14 October earnings call: agents arriving with a client\'s password are blocked, while outside models may read balances and research through Schwab\'s own MCP servers and may not move money. What is being refused is not automation and not AI — it is credential delegation, which no bot-identity standard can fix, because an agent holding the user\'s password is indistinguishable from the user by design.',
    'Amazon、Yelp、达美航空、摩根大通与嘉信理财在四周内先后把第三方 AI 智能体关在门外，而每一家都留了另一扇门。嘉信在 10 月 14 日的财报电话会上把规则的两半都说了出来：带着客户密码登录的智能体一律拦下，而外部模型可以通过嘉信自家的 MCP 服务端读取余额与研究报告，但不能动钱。被拒绝的既不是自动化也不是 AI，而是凭据代持——这一点任何机器人身份标准都解决不了，因为一个握着用户密码的智能体，在设计上就与用户无法区分。',
  ),
  tags: ['agentic-ai', 'ecosystem', 'governance', 'mcp', 'browser-agents'],
};

export default post;
