import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-28',
  slug: 'open-traces-buy-a-scaffold-not-a-skill',
  title: L(
    '207,489 open traces buy you a scaffold, not a skill',
    '207,489 条开放轨迹买到的是脚手架，不是能力',
  ),
  summary: L(
    "Open agent-trajectory corpora are the best fine-tuning data the community has ever had, and almost nobody is reading what is actually in them: a trajectory records a model, a harness and a tool vocabulary acting together, so what transfers is largely the harness's habits. Fine-tune on OpenHands traces and you get a model that is better inside OpenHands — which is not the same claim as a better agent, and your eval will not tell the two apart.",
    '开放的智能体轨迹语料是社区有史以来最好的微调数据，而几乎没有人在读它们里面到底装了什么：一条轨迹记录的是模型、执行框架与工具词汇表三者共同行动的结果，因此真正迁移过去的，很大程度上是那个框架的习惯。拿 OpenHands 的轨迹去微调，你得到的是一个在 OpenHands 里更强的模型——这和「更强的智能体」不是同一个论断，而你的评测分不出这两者。',
  ),
  tags: ['open-source', 'coding-agents', 'evals', 'agentic-ai'],
};

export default post;
