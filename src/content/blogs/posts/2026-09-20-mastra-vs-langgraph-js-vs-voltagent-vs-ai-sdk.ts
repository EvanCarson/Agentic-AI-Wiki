import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-20',
  slug: 'mastra-vs-langgraph-js-vs-voltagent-vs-ai-sdk',
  title: L(
    'Mastra vs LangGraph.js vs VoltAgent vs the AI SDK — where the run lives when the tab closes',
    'Mastra、LangGraph.js、VoltAgent 与 AI SDK——标签页关掉之后，这趟运行活在哪里',
  ),
  searchTitle: { en: 'Best TypeScript AI agent framework 2026 compared' },
  summary: L(
    'The four leading TypeScript agent frameworks agree almost completely on the tool loop and disagree on one thing that decides your architecture: where the run lives when the HTTP request ends. That single axis picks your database, your deploy story and your exit cost — and the AI SDK\'s own troubleshooting page, where a user pressing Stop is indistinguishable from a closed tab, is the cleanest proof that it is the real axis.',
    '四个领先的 TypeScript 智能体框架在工具循环上几乎完全一致，分歧只落在一件决定你架构的事上：HTTP 请求结束之后，这趟运行活在哪里。这一根轴替你选了数据库、部署方式和退出成本——而 AI SDK 自己的疑难解答页（用户按下「停止」与标签页被关掉无法区分）正是这根轴才是真轴的最干净证明。',
  ),
  tags: ['agent-comparison', 'agent-frameworks', 'developer-tools', 'open-source', 'durable-execution'],
};

export default post;
