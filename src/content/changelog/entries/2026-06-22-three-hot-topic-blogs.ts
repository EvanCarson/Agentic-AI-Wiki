import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-06-22',
  title: L(
    'Three new AI Blog posts: computer use, MCP at scale, and the June 2026 frontier refresh',
    'AI 博客新增三篇文章：计算机操作、规模化的 MCP，以及 2026 年 6 月的前沿模型刷新',
  ),
  items: [
    L(
      'Added "Claude Computer Use (post-Vercept) vs Codex Background CU vs Operator vs Gemini" — a four-way architectural comparison of how each lab lets AI drive the mouse, with OSWorld scores and a deployment-vs-safety matrix.',
      '新增《Claude Computer Use（收购 Vercept 后）、Codex 后台 CU、Operator 与 Gemini》——四家实验室让 AI 操作鼠标的架构对比，附 OSWorld 评分与"部署方式 vs 安全模型"矩阵。',
    ),
    L(
      'Added "MCP at 97 Million Downloads" — an essay on how the Model Context Protocol crossed into mainstream agent infrastructure, with the Pinterest production case and the 2026 roadmap.',
      '新增《月下载量 9700 万的 MCP》——一篇关于模型上下文协议如何走入主流智能体基础设施的随笔，包含 Pinterest 的生产案例与 2026 路线图。',
    ),
    L(
      'Added "Claude Mythos 5 vs GPT-5.6 vs Gemini 3.2 vs Qwen 3.7 vs DeepSeek V4.1" — a refresh comparing five frontier-tier models that all shipped inside a two-week window in June 2026.',
      '新增《Claude Mythos 5、GPT-5.6、Gemini 3.2、Qwen 3.7 与 DeepSeek V4.1》——对 2026 年 6 月两周窗口内集中发布的五款前沿级模型的刷新对比。',
    ),
    L(
      'New tags: computer-use, browser-agents, mcp, protocols, ecosystem, closed-source.',
      '新增标签：computer-use、browser-agents、mcp、protocols、ecosystem、closed-source。',
    ),
  ],
};

export default entry;
