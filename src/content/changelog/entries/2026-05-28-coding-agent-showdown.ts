import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-28',
  title: L(
    'New AI Blog post: four coding agents compared',
    'AI 博客新文章：四款编码智能体对比',
  ),
  items: [
    L(
      'Added "Claude Code vs Codex CLI vs Cursor Agent vs Aider" — a diagram-driven comparison of the four decisions that actually separate coding agents: sandbox & filesystem trust, planning loop shape, tool catalog vs the shell, and commit policy.',
      '新增《Claude Code、Codex CLI、Cursor Agent 与 Aider》——以图解方式比较真正区分编码智能体的四个决策：沙箱与文件系统信任边界、规划循环形态、工具目录与 shell，以及提交策略。',
    ),
    L(
      'New tags: coding-agents, developer-tools.',
      '新增标签：coding-agents、developer-tools。',
    ),
  ],
};
export default entry;
