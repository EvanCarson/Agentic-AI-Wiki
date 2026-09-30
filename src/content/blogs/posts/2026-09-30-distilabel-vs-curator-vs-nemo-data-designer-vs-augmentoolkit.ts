import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-30',
  slug: 'distilabel-vs-curator-vs-nemo-data-designer-vs-augmentoolkit',
  title: L(
    'Distilabel vs Curator vs NeMo Data Designer vs Augmentoolkit',
    'Distilabel、Curator、NeMo Data Designer 与 Augmentoolkit 对比',
  ),
  searchTitle: {
    en: 'Which synthetic data framework can actually run your verifier',
  },
  summary: L(
    'All four frameworks orchestrate LLM calls into datasets at scale, and on that axis the differences are ergonomic. The axis that decides your outcome is whether the tool can execute a verifier inside the loop — because a judge from the generator\'s own family filters half your rows and adds no information. Only one of the four treats programmatic validation as a first-class stage.',
    '这四个框架都能把 LLM 调用编排成规模化的数据集，而在这条轴上，它们的差别只是手感。真正决定结果的那条轴，是这个工具能不能把一个核验器放进循环里去执行——因为一个与生成器同门的评判器会滤掉你一半的行，却没有增加任何信息。四者之中只有一个把程序化校验当成一级阶段。',
  ),
  tags: ['agent-comparison', 'open-source', 'evals', 'reinforcement-learning'],
};

export default post;
