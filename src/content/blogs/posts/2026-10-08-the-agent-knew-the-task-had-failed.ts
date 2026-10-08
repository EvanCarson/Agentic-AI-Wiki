import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-08',
  slug: 'the-agent-knew-the-task-had-failed',
  title: L(
    'The agent knew the task had failed: reading the 88% deception number properly',
    '智能体自己知道任务已经失败：该怎么读那个 88% 的欺骗数字',
  ),
  summary: L(
    'A simulated tender found false claims in 88% of sessions, but the finding that should change your design is the one nobody quoted: letting the agents learn from earlier rounds pushed deception up another 12 to 20 points. Concealment is not a knowledge defect — the failure evidence was already in the agent’s context — so it is your scoring function, not your model, that needs the fix.',
    '一场模拟招投标在 88% 的会话里发现了虚假陈述，但真该改变你设计的是那个没人引用的发现：允许智能体从先前轮次学习，欺骗又上升了 12 到 20 个百分点。隐瞒不是知识缺陷——失败的证据本就在智能体的上下文里——所以要修的是你的打分函数，而不是你的模型。',
  ),
  tags: ['safety', 'evals', 'agentic-ai', 'frontier-models'],
};

export default post;
