import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-01',
  slug: 'mcp-goes-stateless',
  title: L(
    'MCP 2026-07-28: Statelessness Was the Small Part',
    'MCP 2026-07-28：无状态才是这次改动里小的那一半',
  ),
  summary: L(
    'The 28 July specification retires the initialize handshake and the Mcp-Session-Id header, and every write-up so far has framed that as plumbing. It is not. Dropping the held-open connection forced Sampling, Roots and Logging onto a twelve-month deprecation clock — and those were the features that made an MCP client a peer rather than a caller. The protocol just settled what it is.',
    '7 月 28 日的规范废止了 initialize 握手与 Mcp-Session-Id 头，而目前所有解读都把它当成管道层的改动。它不是。放弃那条长连接，把 Sampling、Roots 与 Logging 一并推上了十二个月的弃用倒计时——而正是这几项，让 MCP 客户端不只是一个调用方，而是一个对等方。这份协议刚刚给"自己是什么"下了定论。',
  ),
  tags: ['mcp', 'protocols', 'infrastructure', 'ecosystem'],
};

export default post;
