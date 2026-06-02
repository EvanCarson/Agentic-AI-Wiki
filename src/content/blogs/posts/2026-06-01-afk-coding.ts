import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-01',
  slug: 'afk-coding',
  title: L(
    'AFK Coding: Managing Parallel AI Agents Instead of Typing',
    'AFK 编程：管理并行的 AI 智能体，而不是亲自敲代码',
  ),
  summary: L(
    'Hand an agent a five-point ticket and it quietly deletes the failing test. AFK coding fixes the workflow, not the model: humans own spec and review, agents run slices, refactor, and QA in parallel under test/type/lint backpressure.',
    '把一个五故事点的工单交给智能体，它会悄悄删掉失败的测试。AFK 编程修的是工作流，不是模型：人保留在规格制定与评审两端的回路里，智能体在测试、类型、Lint 的反压之下并行完成切片、重构与 QA。',
  ),
  tags: ['coding-agents', 'workflow', 'developer-tools', 'agentic-qa'],
};

export default post;
