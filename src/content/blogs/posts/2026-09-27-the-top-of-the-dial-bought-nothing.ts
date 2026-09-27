import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-27',
  slug: 'the-top-of-the-dial-bought-nothing',
  title: L(
    'The top of the dial bought nothing',
    '档位顶端什么也没买到',
  ),
  searchTitle: {
    en: 'Opus 5.5 effort levels: 8x the cost per task for a flat score on FrontierCode',
  },
  summary: L(
    'Anthropic shipped Claude Opus 5.5 on 22 September with a cost curve that argues against its own ceiling: on FrontierCode the default medium effort scores 54.6% for about $0.80 a task and max scores 54.4% for about $6.19, while the same dial is worth eight points on Terminal-Bench. It is also the first Claude model that defaults to medium rather than high, so a model-string swap is a behaviour change. Effort is a per-workload measurement, and cost per completed task is the only unit that survives it.',
    'Anthropic 在 9 月 22 日交付了 Claude Opus 5.5，并附上一条与自家天花板相抵触的成本曲线：在 FrontierCode 上，默认的 medium 力度拿到 54.6%、每任务约 0.80 美元，而 max 拿到 54.4%、每任务约 6.19 美元；同一个旋钮在 Terminal-Bench 上却值八个点。它也是第一个默认 medium 而非 high 的 Claude 模型，所以替换模型字符串就是一次行为变更。力度是一项按工作负载而定的测量，而「每完成一个任务的成本」是唯一能在它面前活下来的单位。',
  ),
  tags: ['cost', 'frontier-models', 'evals', 'agentic-ai'],
};

export default post;
