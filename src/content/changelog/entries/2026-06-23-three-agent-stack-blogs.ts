import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-06-23',
  title: L(
    'Three new AI Blog posts: voice agents, agent memory, and durable execution',
    'AI 博客新增三篇文章：语音智能体、智能体记忆与持久化执行',
  ),
  items: [
    L(
      'Added "ElevenLabs vs Vapi vs Retell vs OpenAI gpt-realtime" — a four-way comparison of voice-agent platforms organized around who owns the audio path.',
      '新增《ElevenLabs、Vapi、Retell 与 OpenAI gpt-realtime》——围绕"谁掌握音频通路"展开的四款语音智能体平台对比。',
    ),
    L(
      'Added "Mem0 vs Letta vs Zep vs Cognee" — a four-way comparison of agent-memory infrastructure built around the thesis that storage isn\'t the moat, ranking is.',
      '新增《Mem0、Letta、Zep 与 Cognee》——围绕"存储不是壁垒，排序才是"这一论点展开的四款智能体记忆基础设施对比。',
    ),
    L(
      'Added "Temporal vs Inngest vs Restate vs Cloudflare Workflows" — a four-way comparison of durable-execution engines, the runtime layer that keeps long-running agents alive.',
      '新增《Temporal、Inngest、Restate 与 Cloudflare Workflows》——长时间运行的智能体得以存活的运行时层：四款持久化执行引擎对比。',
    ),
    L(
      'New tags: voice-agents, realtime, durable-execution.',
      '新增标签：voice-agents、realtime、durable-execution。',
    ),
  ],
};

export default entry;
