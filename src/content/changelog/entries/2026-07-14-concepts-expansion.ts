import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-14',
  title: L(
    'Concepts expansion: 5 new entry-level pages for the topics that define agent work in 2026',
    '概念扩展：5 个入门页面，覆盖 2026 年定义智能体工作的主题',
  ),
  items: [
    L(
      'Added five beginner Concept pages that had deep-dive coverage but no entry-level explainer: What Is the Model Context Protocol (MCP)?, Agent Memory (short-term vs long-term), Computer Use & GUI Agents, Context Engineering, and Fine-Tuning, RAG, or Prompting?.',
      '新增五个入门概念页面，它们此前有深入解析、却没有入门讲解：什么是模型上下文协议（MCP）？、智能体记忆（短期与长期）、计算机操作与图形界面智能体、上下文工程，以及微调、RAG 还是提示词？。',
    ),
    L(
      'The pages connect the beginner ladder to the advanced deep-dive groups — a reader learning "the agent loop" now has entry-level footing for MCP, memory, and context engineering before jumping to the MCP, Memory & Context, and Agent Security deep-dives.',
      '这些页面把入门阶梯与进阶深入解析分组连接起来——学习"智能体循环"的读者，如今在跳到 MCP、记忆与上下文、智能体安全等深入解析之前，先有了 MCP、记忆与上下文工程的入门立足点。',
    ),
    L(
      'Each entry follows the encyclopedia format (goal lede + stepped explanation), is fully bilingual (en/zh), and cross-links to its advanced deep-dive path on the wiki.',
      '每个条目遵循百科格式（目标引言 + 分步讲解），完全双语（中/英），并交叉链接到本站对应的进阶深入解析路径。',
    ),
  ],
};
export default entry;
