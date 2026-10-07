import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-07',
  slug: 'the-token-came-with-the-tool-list',
  title: L(
    'The token came with the tool list',
    '令牌是连着工具清单一起走的',
  ),
  summary: L(
    'Gen Threat Labs documented eight commodity infostealer families extending their collection rules to the local artifacts of AI coding tools — and what they harvest is a refresh token valid for weeks, a machine-readable list of every system that token reaches, and a searchable history of what it was used for. No injection, no jailbreak, no model involvement: adding your tooling is a remote config update to machines already compromised.',
    'Gen Threat Labs 记录了八个商品化窃密软件家族，把收集规则扩展到了 AI 编码工具的本地工件——而它们收割走的是一枚有效期数周的刷新令牌、一份机器可读的清单（列着这枚令牌能触达的每一个系统），以及一份「它被用来做过什么」的可检索历史。没有注入、没有越狱、模型压根没参与：把你的工具链加进去，只是一次下发到早已失陷机器上的远程配置更新。',
  ),
  tags: ['safety', 'agentic-ai', 'mcp', 'developer-tools', 'coding-agents'],
};

export default post;
