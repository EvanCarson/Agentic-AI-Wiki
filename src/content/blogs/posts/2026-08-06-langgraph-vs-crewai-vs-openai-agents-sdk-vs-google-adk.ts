import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-06',
  slug: 'langgraph-vs-crewai-vs-openai-agents-sdk-vs-google-adk',
  title: L(
    'LangGraph vs CrewAI vs OpenAI Agents SDK vs Google ADK: Pick the State Model',
    'LangGraph vs CrewAI vs OpenAI Agents SDK vs Google ADK：照状态模型来选',
  ),
  summary: L(
    'Framework comparisons argue about graphs versus crews versus handoffs, but the metaphor stops mattering by week three. What you cannot re-pick eighteen months in is where a run lives, what resume means after a crash, and whether a human can pause a half-finished task — so choose on the state model and the rest of the comparison resolves itself.',
    '框架对比总在争论图 vs 团队 vs 交接，但比喻到第三周就不再要紧。十八个月后你无法重选的，是一次运行住在哪里、崩溃后"恢复"意味着什么，以及人能不能把做了一半的任务暂停下来——照状态模型来选，对比的其余部分会自行解决。',
  ),
  tags: ['agent-comparison', 'agent-frameworks', 'orchestration', 'open-source', 'durable-execution'],
};

export default post;
