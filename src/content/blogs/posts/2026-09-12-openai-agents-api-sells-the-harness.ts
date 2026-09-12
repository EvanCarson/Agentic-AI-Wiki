import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-12',
  slug: 'openai-agents-api-sells-the-harness',
  title: L(
    'The Agents API sells you the harness — compaction included',
    'Agents API 卖给你的是那套 harness——连同压缩',
  ),
  searchTitle: {
    en: 'OpenAI Agents API: the managed harness moves compaction inside the vendor boundary',
  },
  summary: L(
    'OpenAI opened the Agents API in public beta on 10 September, putting the managed Codex harness — sessions, subagent orchestration, recovery and context compaction — behind one API call, with no fee beyond tokens and containers. The compaction step is the part worth arguing about: it is the transformation that quietly rewrites what your agent is trying to do, and it now runs on a version you cannot pin, diff or roll back. Your eval numbers stop describing a system you control the moment you adopt it.',
    'OpenAI 在 9 月 10 日开放了 Agents API 公测，把那套托管的 Codex harness——会话、子智能体编排、恢复与上下文压缩——放到了一次 API 调用后面，除 token 与容器外不另收费。值得争论的是压缩这一步：它正是那个会悄悄改写"智能体到底在做什么"的变换，而如今它跑在一个你无法钉住、无法比对、也无法回滚的版本上。你采用它的那一刻，你的评测数字就不再描述一套你能控制的系统。',
  ),
  tags: ['ecosystem', 'infrastructure', 'orchestration', 'agentic-ai', 'evals'],
};

export default post;
