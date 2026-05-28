import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-05-28',
  slug: 'claude-code-vs-codex-cli-vs-cursor-agent-vs-aider',
  title: L(
    'Claude Code vs Codex CLI vs Cursor Agent vs Aider: Four Architectures of the Coding-Agent Loop',
    'Claude Code、Codex CLI、Cursor Agent 与 Aider：编码智能体循环的四种架构',
  ),
  summary: L(
    'Four coding agents take the same prompt and the same repo down four completely different paths. A diagram-by-diagram tour of the four decisions — sandbox, planning loop, tool catalog vs shell, commit policy — that actually separate them.',
    '四款编码智能体，面对同一句提示、同一个仓库，走出了四条完全不同的路径。逐图解析真正区分它们的四个决策：沙箱、规划循环、工具清单与 shell、提交策略。',
  ),
  tags: ['agent-comparison', 'architecture', 'coding-agents', 'developer-tools'],
};

export default post;
