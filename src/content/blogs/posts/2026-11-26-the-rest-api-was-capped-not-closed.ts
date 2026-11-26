import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-26',
  slug: 'the-rest-api-was-capped-not-closed',
  title: L(
    'Google did not close the Workspace REST API to agents. It gave it a ceiling',
    'Google 没有对智能体关掉 Workspace REST API，它给它加了一个上限',
  ),
  summary: L(
    'The Workspace MCP servers went GA on 24 November 2026 and the headlines read "REST API access for AI agents ends 1 February 2027". It does not end. Agents that keep calling REST directly are pinned to Standard-tier quotas regardless of the tier they bought — so the enforcement mechanism is billing eligibility, not an access check, and the actual new requirement is that your agent traffic be identifiable as agent traffic.',
    'Workspace MCP 服务器在 2026 年 11 月 24 日正式可用，而各家标题写的是「AI 智能体的 REST API 访问将于 2027 年 2 月 1 日终止」。它不会终止。继续直接调用 REST 的智能体会被钉在 Standard 层的配额上，无论它们买了哪一层——所以执行机制是计费资格，而不是一次访问检查；而真正新增的要求是：你的智能体流量必须可被识别为智能体流量。',
  ),
  tags: ['agentic-ai', 'mcp', 'protocols', 'governance', 'cost'],
};

export default post;
