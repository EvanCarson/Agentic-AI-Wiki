import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-06',
  slug: 'gpt-researcher-vs-local-deep-research-vs-storm-vs-deerflow',
  title: L(
    'GPT Researcher vs Local Deep Research vs STORM vs DeerFlow',
    'GPT Researcher、Local Deep Research、STORM 与 DeerFlow 对比',
  ),
  summary: L(
    'Of the five best-known open-source deep-research agents, one archived itself in August 2026, one rewrote itself into a general agent harness, and one has not taken a commit since September 2025. The research loop became a default feature of every harness, so the only axis left worth choosing on is where your corpus lives and who gets to see the query.',
    '五个最知名的开源深度研究智能体里，一个在 2026 年 8 月把自己归档了，一个把自己重写成了通用智能体外壳，还有一个自 2025 年 9 月起没再收过一次提交。研究循环已经变成每个外壳的默认功能，于是唯一还值得拿来做选择的那根轴是：你的语料放在哪里，以及谁有资格看见你的查询。',
  ),
  tags: ['agent-comparison', 'open-source', 'rag', 'self-hosted', 'agent-frameworks'],
};

export default post;
