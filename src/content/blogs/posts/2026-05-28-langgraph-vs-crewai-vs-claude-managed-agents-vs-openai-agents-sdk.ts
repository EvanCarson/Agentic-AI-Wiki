import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-05-28',
  slug: 'langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk',
  title: L(
    'LangGraph vs CrewAI vs Claude Managed Agents vs OpenAI Agents SDK: Four Architectures of the Orchestration Layer',
    'LangGraph、CrewAI、Claude Managed Agents 与 OpenAI Agents SDK：编排层的四种架构',
  ),
  summary: L(
    'Four orchestration frameworks let you wire up the same workflow — and the feature lists nearly match. The thing that decides which one survives production is invisible there: where your agent\'s state actually lives.',
    '四款编排框架都能搭起同一个工作流，功能清单也几乎一致。真正决定谁能扛住生产环境的那一点却看不见：你的智能体状态究竟存在哪里。',
  ),
  tags: ['agent-comparison', 'architecture', 'agent-frameworks', 'orchestration'],
};

export default post;
