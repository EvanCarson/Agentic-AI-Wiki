import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-26',
  slug: 'agents-md-vs-claude-md-vs-cursor-rules-vs-agent-skills',
  title: L(
    'AGENTS.md vs CLAUDE.md vs Cursor rules vs Agent Skills',
    'AGENTS.md、CLAUDE.md、Cursor rules 与 Agent Skills 对比',
  ),
  summary: L(
    'Everyone argues about which file name wins, and the file name decides almost nothing. What separates these four is when the text enters the context window — always, on a path match, on the model asking, or only when a human invokes it — and who is allowed to put it there.',
    '所有人都在争哪个文件名会赢，而文件名几乎什么也决定不了。真正把这四者分开的，是那段文字在什么时候进入上下文窗口——始终、路径匹配时、模型主动要的时候，还是只有人显式调用时——以及谁被允许把它放进去。',
  ),
  tags: ['agent-comparison', 'coding-agents', 'developer-tools'],
};

export default post;
