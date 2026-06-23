import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-23',
  slug: 'mem0-vs-letta-vs-zep-vs-cognee',
  title: L(
    'Mem0 vs Letta vs Zep vs Cognee: Four Bets on What "Agent Memory" Actually Means',
    'Mem0、Letta、Zep 与 Cognee：关于"智能体记忆"到底是什么的四种下注方式',
  ),
  summary: L(
    'A 128K-token context window degrades past the first thousand tokens and vanishes the moment the session ends. The agent-memory infrastructure market crossed $6 billion in 2026 because "throw it all in the context" stopped being a strategy — and four frameworks now bet differently on what memory should rank, store, and forget.',
    '12.8 万 token 的上下文窗口在前一千个 token 之后就开始衰减，会话一结束更是一干二净。智能体记忆基础设施市场在 2026 年突破 60 亿美元——因为"全部塞进上下文"已经不再是一条可行的策略——而四家框架对"记忆应该排什么、存什么、忘什么"做出了不同的下注。',
  ),
  tags: ['agent-comparison', 'memory', 'infrastructure', 'agent-frameworks'],
};

export default post;
