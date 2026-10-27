import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-21',
  title: L(
    "New blog post: Patrick Collison's case for agents as a subsidy for quality, tested against the evidence",
    '新博客：Patrick Collison 的“智能体补贴质量”论点，对照证据检验',
  ),
  items: [
    L(
      "Collison's agent researches for ten hours; today's takes the first offer: a point-by-point reading of the Stripe CEO's 9 October thread against Microsoft's Magentic Marketplace results (first offers chosen 60 to 100 percent of the time; welfare down 65.4 percent with 100 results instead of 3), why the agent's funding decides whose side it is on, Stripe's own position, and five predictions each with a signal to watch.",
      '《Collison 设想的智能体会研究十小时，今天的智能体只拿第一份报价》：逐条对照微软 Magentic Marketplace 的结果（第一份报价的被选率为 60% 到 100%；结果从 3 条增至 100 条，福利下降 65.4%）解读这位 Stripe 首席执行官 10 月 9 日的帖子，说明智能体由谁供养决定它站在哪一边，分析 Stripe 自身的位置，并给出五条各附观察信号的预测。',
    ),
  ],
  lines: ['bl'],
};

export default entry;
