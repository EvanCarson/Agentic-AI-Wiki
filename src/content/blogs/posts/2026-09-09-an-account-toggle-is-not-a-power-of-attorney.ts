import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-09',
  slug: 'an-account-toggle-is-not-a-power-of-attorney',
  title: L(
    'An account toggle is not a power of attorney',
    '一个账号开关不是一份授权委托书',
  ),
  searchTitle: {
    en: 'Docusign opens its MCP server: attribution is the deployer’s problem',
  },
  summary: L(
    'On 4 September Docusign said its MCP server opens to every agent on 30 September — Claude, ChatGPT, Gemini, Copilot, Slack, any MCP client — governed by account-level admin controls. The law has allowed an automated agent to bind its principal since 1999, on one condition: the act must be attributable to that person. A per-account toggle attributes a class of acts, which is what carried deterministic scripts and is exactly what a model that negotiates strains. Closing that gap is the deployer’s job, and nothing in MCP does it for you.',
    '9 月 4 日，Docusign 宣布其 MCP 服务器将于 9 月 30 日向每一个智能体开放——Claude、ChatGPT、Gemini、Copilot、Slack，任何 MCP 客户端——由账号级管理控制来治理。自 1999 年起，法律就允许一个自动化代理去约束它的委托人，条件只有一个：该行为必须可归属于那个人。一个按账号的开关归属的是一"类"行为，这正是当年撑住确定性脚本的东西，也正是一个会谈判的模型会把它绷断的地方。补上这道缝是部署方的活，MCP 里没有任何东西替你做。',
  ),
  tags: ['governance', 'mcp', 'protocols', 'ecosystem', 'safety', 'agentic-ai'],
};

export default post;
