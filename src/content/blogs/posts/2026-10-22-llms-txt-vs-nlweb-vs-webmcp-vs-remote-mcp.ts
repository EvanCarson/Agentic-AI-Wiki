import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-22',
  slug: 'llms-txt-vs-nlweb-vs-webmcp-vs-remote-mcp',
  title: L(
    'llms.txt vs NLWeb vs WebMCP vs a remote MCP server',
    'llms.txt vs NLWeb vs WebMCP vs 远程 MCP 服务器',
  ),
  summary: L(
    'Four ways to make a website usable by agents, and three of them ask you to publish a surface whose consumer is still hypothetical. A server-log analysis of about 137,000 domains found 97% of llms.txt files were never fetched; WebMCP is a W3C community-group draft behind a Chrome flag; NLWeb has infrastructure backers and flat adoption. Pick by who provably reads it, and by whether the agent needs to read, ask or act — because only one of the four gives you a caller you can identify and revoke.',
    '让网站能被智能体使用的四条路，其中三条要你发布一个消费方仍属假设的接口面。一份覆盖约 13.7 万个域名的服务器日志分析发现，97% 的 llms.txt 文件从未被抓取过；WebMCP 是一份藏在 Chrome 实验标志后面的 W3C 社区组草案；NLWeb 有基础设施背书却采用停滞。请按「什么东西确实会读它」来选，并按智能体是要读、要问还是要动手来选——因为四者之中只有一个能给你一个可识别、可吊销的调用方。',
  ),
  tags: ['agent-comparison', 'protocols', 'mcp', 'ecosystem', 'developer-tools'],
};

export default post;
