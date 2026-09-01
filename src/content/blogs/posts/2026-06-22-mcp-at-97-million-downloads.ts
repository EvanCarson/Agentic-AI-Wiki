import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-22',
  slug: 'mcp-at-97-million-downloads',
  title: L(
    'MCP at 97 Million Downloads: How the Model Context Protocol Won — and What\'s Still Broken at Scale',
    '月下载量 9700 万的 MCP：模型上下文协议是如何赢的——以及到了这种规模还有什么没解决',
  ),
  searchTitle: { zh: 'MCP 月下载量 9700 万：协议如何取胜，规模下还缺什么' },
  summary: L(
    'Two years from Anthropic\'s launch, MCP isn\'t a debate — it\'s a dependency. Every frontier vendor, every major IDE, and one Pinterest team saving 7,000 engineering hours a month all ship against it. The interesting question is no longer *should you use MCP* — it\'s what fails at this scale and how the 2026 roadmap plans to fix it.',
    '从 Anthropic 推出至今两年，MCP 已经不是要不要用的问题——它是一种依赖。每家前沿厂商、每个主流 IDE，以及一支为公司每月节省 7000 工程师小时的 Pinterest 团队都在它上面构建。真正值得问的不再是"我要不要用 MCP"，而是到了这种规模哪些地方在崩、2026 路线图打算怎么修。',
  ),
  tags: ['mcp', 'protocols', 'infrastructure', 'ecosystem'],
};

export default post;
