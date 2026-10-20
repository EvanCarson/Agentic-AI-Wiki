import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-20',
  slug: 'the-page-was-counted-in-records',
  title: L(
    "GitHub's MCP server paginated from day one and still overflowed the context window",
    'GitHub 的 MCP 服务器一开始就分页，上下文窗口照样被撑爆',
  ),
  summary: L(
    "Pagination bounds how many records come back; the context window is a budget of tokens. GitHub's server kept overflowing at 30 records a page until minimal response types cut project items by 93%, Datadog moved to token-budget pages for the same reason, and because MCP paginates the tool catalog but not the tool call, every host handles the overflow differently.",
    '分页限制的是返回多少条记录，上下文窗口却是一笔 token 预算。GitHub 的服务器每页 30 条照样溢出，直到精简响应类型把项目条目砍掉 93%；Datadog 出于同样原因改成按 token 预算分页。而 MCP 只给工具目录分页、不给工具调用分页，于是每个宿主处理溢出的方式都不一样。',
  ),
  tags: ['mcp', 'developer-tools', 'infrastructure', 'cost', 'agentic-ai'],
};

export default post;
