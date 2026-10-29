import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-29',
  slug: 'the-leaderboard-ranks-the-pair-not-the-model',
  title: L(
    'The leaderboard ranks the pair, not the model',
    '排行榜排的是那一对，不是模型',
  ),
  summary: L(
    'A Stanford and UIUC team decomposed the variance in 22 agent benchmarks from the Holistic Agent Leaderboard and the Harbor Index, and the result splits along the claim you make. Ranking a fixed model-and-scaffold system is reliable: generalizability coefficients of 0.935 to 0.994. Ranking the underlying model from the same rollouts runs 0.148 to 0.841. And the standard remedy has a ceiling — where scaffold coverage dominates the uncertainty, even unlimited extra tasks of the same kind buy at most 0.097 more reliability. The number to ask a leaderboard for is how many scaffolds it ran, not how many tasks.',
    '一个斯坦福与 UIUC 的团队，把来自 Holistic Agent Leaderboard 与 Harbor Index 的 22 个智能体基准的方差做了分解，结果按「你在主张什么」劈成两半。给一个固定的「模型＋脚手架」系统排序是可靠的：泛化系数 0.935 到 0.994。从同一批 rollout 里给底下那个模型排序，则是 0.148 到 0.841。而惯常的补救办法有天花板——当脚手架覆盖面主导着不确定性时，哪怕无限多同类任务，也最多只换来 0.097 的可靠度。该向一个排行榜追问的数字，是它跑了几种脚手架，而不是几道题。',
  ),
  tags: ['evals', 'model-comparison', 'agentic-ai', 'open-source'],
};

export default post;
