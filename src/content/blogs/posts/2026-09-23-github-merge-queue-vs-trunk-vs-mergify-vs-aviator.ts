import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-23',
  slug: 'github-merge-queue-vs-trunk-vs-mergify-vs-aviator',
  title: L(
    'GitHub Merge Queue vs Trunk vs Mergify vs Aviator',
    'GitHub Merge Queue、Trunk、Mergify 与 Aviator 对比',
  ),
  searchTitle: {
    en: 'Merge queues under agent load',
  },
  summary: L(
    'Your coding agents doubled the pull requests and the integration path is now the constraint — but batching, the feature every queue product sells, gets worse as agent share rises, because agents raise the per-PR failure rate that batching multiplies. Only two capabilities change the arithmetic: bisecting a failed batch, and deriving independent lanes from what a change actually touches. Shortlist on those; everything else is configuration.',
    '你的编码智能体把 PR 数量翻了一倍，集成路径成了新的约束——但打包（每家队列产品都在卖的那个功能）会随智能体占比上升而变糟，因为智能体抬高的正是被打包所放大的那个单 PR 失败率。真正改变这笔算术的只有两项能力：对失败的一组做二分定位，以及从一次变更实际触及的东西推导出彼此独立的道。按这两点来筛，其余都是配置。',
  ),
  tags: ['agent-comparison', 'coding-agents', 'developer-tools', 'infrastructure'],
};

export default post;
