import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-07-14',
  slug: 'browser-use-vs-stagehand-vs-skyvern-vs-playwright-mcp',
  title: L(
    'Browser-Use vs Stagehand vs Skyvern vs Playwright MCP: Four Answers to How an LLM Should Drive a Web Page',
    'Browser-Use、Stagehand、Skyvern 与 Playwright MCP：LLM 该如何操作网页的四种答案',
  ),
  summary: L(
    'When there is no API, an agent has to drive the browser itself — and four open-source projects disagree on how it should see the page. browser-use reads the DOM, Skyvern looks at pixels, Stagehand lets you dial between code and AI, and Playwright MCP is not an agent at all but the standard browser-tool layer any model can call. Picking one is really two decisions: Python or TypeScript, and a framework or an MCP server.',
    '当没有 API 时，智能体只能自己操作浏览器——而四个开源项目对"它该如何看页面"意见相左。browser-use 读取 DOM，Skyvern 看像素，Stagehand 让你在代码与 AI 之间自由调节，而 Playwright MCP 根本不是智能体，而是任何模型都能调用的标准浏览器工具层。选其一其实是两个决定：Python 还是 TypeScript，以及框架还是 MCP 服务器。',
  ),
  tags: ['agent-comparison', 'browser-agents', 'computer-use', 'mcp', 'open-source'],
};

export default post;
