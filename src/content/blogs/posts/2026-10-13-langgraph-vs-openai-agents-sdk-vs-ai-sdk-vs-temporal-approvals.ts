import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-13',
  slug: 'langgraph-vs-openai-agents-sdk-vs-ai-sdk-vs-temporal-approvals',
  title: L(
    'LangGraph vs OpenAI Agents SDK vs AI SDK vs Temporal: where the pause lives',
    'LangGraph、OpenAI Agents SDK、AI SDK 与 Temporal：那次暂停住在哪里',
  ),
  searchTitle: {
    en: 'Human-approval mechanics compared: LangGraph, Agents SDK, AI SDK, Temporal',
  },
  summary: L(
    'All four pause an agent before a tool call and wait for a human, and they differ on one axis that decides everything downstream: where the pending approval is stored and what re-executes on resume. LangGraph re-runs the whole node from its first line; Temporal continues at the next statement; the two SDKs sit in between and hand you the persistence problem.',
    '四者都能在工具调用之前暂停智能体、等一个人，而它们在一个决定其后一切的轴上分道扬镳：待批的那次审批存在哪里，以及恢复时什么会被重新执行。LangGraph 会从第一行起重跑整个节点；Temporal 从下一条语句继续；两个 SDK 落在中间，并把持久化这个问题交还给你。',
  ),
  tags: ['agent-comparison', 'agent-frameworks', 'durable-execution', 'safety'],
};

export default post;
