import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-06-03',
  title: L(
    'New AI Blog post: four RL-for-trading frameworks, compared',
    'AI 博客新文章：四款面向交易的 RL 框架对比',
  ),
  items: [
    L(
      'Added "FinRL vs TensorTrade vs ABIDES-Gym vs ElegantRL" — a diagram-driven comparison built around the one question the feature lists hide: who owns the simulation contract (action shape, fill model, slippage, reward, episode boundary)?',
      '新增《FinRL、TensorTrade、ABIDES-Gym 与 ElegantRL》——围绕功能清单掩盖的那个问题展开的图解对比：谁来掌控仿真契约（动作形态、成交模型、滑点、奖励、episode 边界）？',
    ),
    L(
      'Substituted ABIDES-Gym (J.P. Morgan AI Research) for the stale "MarketGym" label as the LOB / microstructure peer, documented explicitly in the post.',
      '将 LOB / 微观结构那一档由不再对应活跃项目的 "MarketGym" 名称替换为 ABIDES-Gym（J.P. Morgan AI Research），并在正文中显式说明。',
    ),
    L(
      'New tags: reinforcement-learning, trading.',
      '新增标签：reinforcement-learning、trading。',
    ),
  ],
};
export default entry;
