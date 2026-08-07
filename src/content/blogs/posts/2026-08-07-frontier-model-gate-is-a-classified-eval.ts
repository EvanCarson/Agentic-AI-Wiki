import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-07',
  slug: 'frontier-model-gate-is-a-classified-eval',
  title: L(
    'The US Frontier Model Gate Is an Eval Nobody Can Read',
    '美国的前沿模型闸门，是一场没人读得到的评测',
  ),
  summary: L(
    'Executive Order 14409 created a pre-release review for frontier models, and on 4 August the White House told the labs the framework behind it stays unpublished. Strip away the politics and it is a benchmark with no methodology, no threshold, no reported score and no appeal — which removes every check that makes a benchmark number mean anything.',
    '第 14409 号行政命令为前沿模型设立了发布前审查，而 8 月 4 日白宫当着各实验室的面确认：背后那套框架不会公开。撇开政治，它就是一套没有方法学、没有阈值、不报分数、也无从申诉的基准——而这恰好抽掉了让一个基准数字有意义的每一道检验。',
  ),
  tags: ['regulation', 'governance', 'evals', 'frontier-models'],
};

export default post;
