import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-28',
  title: L(
    'New AI Blog post: four agent-orchestration frameworks compared',
    'AI 博客新文章：四款智能体编排框架对比',
  ),
  items: [
    L(
      'Added "LangGraph vs CrewAI vs Claude Managed Agents vs OpenAI Agents SDK" — a diagram-driven comparison built around the one question the feature lists hide: where does your agent\'s state actually live?',
      '新增《LangGraph、CrewAI、Claude Managed Agents 与 OpenAI Agents SDK》——围绕功能清单掩盖的那个问题展开的图解对比：你的智能体状态究竟存在哪里？',
    ),
    L(
      'New tag: orchestration.',
      '新增标签：orchestration。',
    ),
  ],
};
export default entry;
