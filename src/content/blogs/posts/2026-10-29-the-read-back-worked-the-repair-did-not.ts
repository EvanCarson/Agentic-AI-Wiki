import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-29',
  slug: 'the-read-back-worked-the-repair-did-not',
  title: L(
    'The read-back worked, the repair did not',
    '复述那一步成了，修复那一步没成',
  ),
  summary: L(
    'On τ-Entity, the 200-task spoken-entity benchmark Sierra published in late October 2026, a matched text agent gets every task right and four voice configurations land between 0.14 and 0.41. The interesting number is not the gap, it is where the gap lives: agents detect most of their wrong values and then repair only 24–37% of the ones they detected. Over 347 captures that started wrong, read-back alone recovers 26%, spelling alone 24%, both together 35% — a scaffold worth 14 to 31 points that costs 21 to 28 seconds of call time, and still leaves two thirds of wrong values wrong.',
    '在 Sierra 于 2026 年 10 月下旬发布的 200 题口述实体基准 τ-Entity 上，一个条件对齐的文本智能体每道题都做对，而四种语音配置落在 0.14 到 0.41 之间。真正有意思的不是这个差距，而是差距住在哪里：智能体检测出了自己大部分的错值，然后只修好了其中的 24%–37%。在 347 次一开始就捕错的取值里，只做复述挽回 26%、只做拼读挽回 24%、两者齐上 35%——这套脚手架值 14 到 31 个百分点，代价是每通电话 21 到 28 秒，而且仍然让三分之二的错值保持错着。',
  ),
  tags: ['evals', 'voice-agents', 'agentic-ai', 'agent-ux'],
};

export default post;
