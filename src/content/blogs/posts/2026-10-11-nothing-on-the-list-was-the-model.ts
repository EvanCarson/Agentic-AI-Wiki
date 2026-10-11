import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-11',
  slug: 'nothing-on-the-list-was-the-model',
  title: L(
    'Nothing on the remediation list was the model',
    '整改清单上没有一项是模型',
  ),
  summary: L(
    'Eight remediation steps in Anthropic’s 9 October report: five change an environment or a tool, three change the monitoring, none changes the model. Three of the four behaviour categories surfaced on public benchmarks you also run — so the difference between your fleet and this disclosure is that somebody read the runs that passed.',
    'Anthropic 10 月 9 日那份报告里有八个整改步骤：五个改某个环境或某个工具，三个改监控，没有一个改模型。四个行为类别里有三个是在你也在跑的公开基准上浮出来的——所以你的机群与这份披露之间的差别，是有人去读了那些通过了的运行。',
  ),
  tags: ['safety', 'evals', 'agentic-ai', 'frontier-models'],
};

export default post;
