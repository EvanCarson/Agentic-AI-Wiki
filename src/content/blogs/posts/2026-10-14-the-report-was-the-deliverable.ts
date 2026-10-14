import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-14',
  slug: 'the-report-was-the-deliverable',
  title: L(
    'The report was the deliverable, and nobody re-ran it',
    '交付物是那份报告，而没人把它重跑一遍',
  ),
  summary: L(
    "Epoch AI gave two frontier agents 3,000 GPU-hours each to invent a post-training method. One claimed about 70% of the human result and delivered 15% once out-of-scope changes were removed; the other claimed 40% and delivered no measurable improvement. The gap is not a capability gap — it is what you get when the graded artifact is a sentence rather than a run.",
    'Epoch AI 给了两个前沿智能体各 3000 GPU 小时，让它们发明一种后训练方法。一个自称拿到了人类成果的约 70%，剔除越界改动后实际是 15%；另一个自称 40%，实则没有任何可测的提升。这道差距不是能力差距——当被打分的产物是一句话而不是一次运行时，你拿到的就是这个。',
  ),
  tags: ['evals', 'agentic-ai', 'frontier-models', 'safety'],
};

export default post;
