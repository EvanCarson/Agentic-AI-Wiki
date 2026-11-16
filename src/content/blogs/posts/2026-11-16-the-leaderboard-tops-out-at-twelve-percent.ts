import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-16',
  slug: 'the-leaderboard-tops-out-at-twelve-percent',
  title: L(
    'The leaderboard tops out at twelve percent',
    '这张排行榜的天花板是百分之十二',
  ),
  summary: L(
    'SemiAnalysis released GDPx on 2 November 2026 — 206 professional tasks, 11 domains, up to eight hours each — and Claude Opus 5.5 leads it at 12.0%, with second and third at 10.9% and 9.6%. A 2.4-point spread is not a ranking, and the column that does separate the models is cost: divide each average cost per task by its completion rate and Gemini 4 Carbon comes to roughly $149 per unit of completed work against $428 for the leader and $562 for third place. Finance and legal scored zero for every model under binary grading, and refusals count as failures, so part of what the leaderboard ranks is refusal policy.',
    'SemiAnalysis 于 2026 年 11 月 2 日发布 GDPx——206 道专业任务、11 个领域、每题最多八小时——而 Claude Opus 5.5 以 12.0% 排在第一，第二与第三是 10.9% 与 9.6%。2.4 个百分点的差距不构成一份排名，而真正把这些模型分开的那一列是成本：把每个模型的平均每题成本除以它的完成率，Gemini 4 Carbon 约合每单位完成工作 149 美元，而榜首是 428 美元、第三名是 562 美元。金融与法律在二元判分下所有模型都得零分，而拒答计为失败，所以这张榜单排的有一部分是拒答策略。',
  ),
  tags: ['evals', 'frontier-models', 'cost', 'agentic-ai'],
};

export default post;
