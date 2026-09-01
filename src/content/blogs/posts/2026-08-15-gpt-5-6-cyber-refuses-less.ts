import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-15',
  slug: 'gpt-5-6-cyber-refuses-less',
  title: L(
    'GPT-5.6-Cyber Is Gated Because It Refuses Less, Not Because It Knows More',
    'GPT-5.6-Cyber 被设了门槛，是因为它更少拒绝，不是因为它懂得更多',
  ),
  searchTitle: { en: 'GPT-5.6-Cyber: Gated for Refusing Less, Not Knowing More', zh: 'GPT-5.6-Cyber：门槛来自更少拒绝，而非更懂' },
  summary: L(
    'OpenAI\'s offensive-security model loses to plain GPT-5.6 Sol on both evaluations that score the work product, and wins the one that scores whether it answers at all. Daybreak Red gates a refusal policy, not a capability — which makes patch latency, not model access, the number that should have moved on 10 August.',
    'OpenAI 这款攻击性安全模型，在两项给成果打分的评测上都输给普通的 GPT-5.6 Sol，却赢下了唯一一项只看"它答不答"的评测。Daybreak Red 拦住的是一条拒绝策略，不是一项能力——于是 8 月 10 日该动的数字是补丁上线时延，不是模型访问权限。',
  ),
  tags: ['safety', 'frontier-models', 'evals', 'ecosystem', 'governance'],
};

export default post;
