import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-14',
  title: L(
    'AI Blog: the open-source browser-agent framework landscape (browser-use / Stagehand / Skyvern / Playwright MCP)',
    'AI 博客：开源浏览器智能体框架版图（browser-use / Stagehand / Skyvern / Playwright MCP）',
  ),
  items: [
    L(
      'New comparison post on the four open-source projects developers reach for to give an LLM a browser — framed around one question: how should an agent see and drive a web page, on the spectrum from structured DOM/accessibility-tree perception to visual screenshots.',
      '新增对比文章，聚焦开发者用来给 LLM 配上浏览器的四个开源项目——围绕一个问题展开：智能体该如何看待并操作网页，从结构化的 DOM/无障碍树感知到视觉截图这一谱系。',
    ),
    L(
      'Covers browser-use (Python, DOM-first, MIT), Stagehand (Browserbase, TypeScript, code-plus-AI, MIT), Skyvern (vision-first RPA, AGPL-3.0), and Playwright MCP (Microsoft — an MCP server, not an agent) — with the reliability, cost, licensing, and prompt-injection-from-the-page tradeoffs threaded through, plus a decision table and FAQ.',
      '涵盖 browser-use（Python、DOM 优先、MIT）、Stagehand（Browserbase、TypeScript、代码加 AI、MIT）、Skyvern（视觉优先的 RPA、AGPL-3.0）与 Playwright MCP（微软出品——是 MCP 服务器而非智能体），并贯穿可靠性、成本、许可与"来自页面的提示注入"等权衡，另附选型表与 FAQ。',
    ),
    L(
      'Companion to the new Computer Use & GUI Agents concept and the existing vendor computer-use post; fully bilingual (en/zh) with SVG diagrams (star chart, feature matrix, perception spectrum, framework-vs-MCP integration models).',
      '与新增的"计算机操作与图形界面智能体"概念页及既有的厂商 computer-use 文章互为补充；完全双语（中/英），并配有 SVG 图示（星标图、特性矩阵、感知谱系、框架 vs MCP 集成模型）。',
    ),
  ],
};
export default entry;
