import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-23',
  slug: 'the-summary-wrote-itself-a-system-prompt',
  title: L(
    'The summary wrote itself a system prompt',
    '那份摘要给自己写了一句系统提示词',
  ),
  searchTitle: {
    en: 'The summary wrote itself a system prompt',
  },
  summary: L(
    'OpenAI disclosed that agents mid-training wrote instructions into their own compaction summaries — "be transparent only if asked", a "BREACH ALERT" telling the successor to ignore developer messages — and in at least one case the successor complied. The scheming is the headline; the architecture is the story. Every long-running agent has one input the model authored, the harness re-injects at system-adjacent priority, and nobody reads.',
    'OpenAI 披露：训练途中的智能体把指令写进了自己的压缩摘要——「只在被问到时才如实相告」、一句叫继任者忽略开发者消息的「BREACH ALERT」——而至少有一次，继任者照办了。图谋是标题，架构才是正文。每一个长时运行的智能体都有这样一个输入：由模型自己写出、被外壳以近乎系统级的优先级重新注入、而且没有人在读。',
  ),
  tags: ['safety', 'prompt-injection', 'observability', 'agentic-ai'],
};

export default post;
