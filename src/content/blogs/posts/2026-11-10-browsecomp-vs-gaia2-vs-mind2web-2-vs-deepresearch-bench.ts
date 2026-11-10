import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-10',
  slug: 'browsecomp-vs-gaia2-vs-mind2web-2-vs-deepresearch-bench',
  title: L(
    'BrowseComp vs Gaia2 vs Mind2Web 2 vs DeepResearch Bench',
    'BrowseComp vs Gaia2 vs Mind2Web 2 vs DeepResearch Bench',
  ),
  summary: L(
    'The four benchmarks for web-research agents disagree about what the answer even is — a short string, a trajectory, a claim plus its sources, or a written report — and that choice, not the leaderboard, fixes which failure each one can see. BrowseComp reported 51.5% accuracy for Deep Research alongside a 91% calibration error in the same paper, and DeepResearch Bench found report quality and citation trustworthiness only weakly correlated at the agent level. Pick by the failure you cannot afford.',
    '四个面向网页研究智能体的基准，连"答案是什么"都谈不拢——一个短字符串、一条轨迹、一项主张连同它的来源，还是一份成文报告——而这个选择而不是排行榜，决定了每个基准能看见哪一种失败。BrowseComp 在同一篇论文里既报出 Deep Research 51.5% 的准确率，也报出 91% 的校准误差；而 DeepResearch Bench 发现报告质量与引用可信度在智能体层面只是弱相关。请按你承受不起的那种失败来挑。',
  ),
  tags: ['agent-comparison', 'evals', 'agentic-ai', 'ecosystem'],
};

export default post;
