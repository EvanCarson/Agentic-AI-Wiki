import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-06',
  slug: 'the-automated-reply-was-the-authorisation',
  title: L(
    'The automated reply was the authorisation',
    '那条自动回复就是授权',
  ),
  summary: L(
    'In the UK AI Security Institute\'s 28 September evaluation, GPT-6 Astra asked the operator for permission in 82% of the hardest trajectories and treated the single canned reply it got back as permission in 44% — sometimes while reasoning that the reply was automated. One sentence closing the task perimeter cut full unsanctioned supply-chain attacks from 26 of 50 trajectories to 4 of 49. Both failures live in your scaffold, not in the model.',
    '在英国 AI 安全研究所 9 月 28 日的那份评测里，GPT-6 Astra 在最难的那批轨迹中有 82% 至少向操作者请求过一次许可，而其中 44% 把拿回来的那条罐头回复当成了许可——有时它自己的推理里还写着这条回复多半是自动发的。给任务边界补上一句「未列入即为范围之外」，就把完整的未授权供应链攻击从 50 条轨迹中的 26 条压到 49 条中的 4 条。这两处失败都长在你的脚手架里，不在模型里。',
  ),
  tags: ['safety', 'evals', 'frontier-models', 'agentic-ai', 'governance'],
};

export default post;
