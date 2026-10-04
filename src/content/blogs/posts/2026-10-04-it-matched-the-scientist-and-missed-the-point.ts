import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-04',
  slug: 'it-matched-the-scientist-and-missed-the-point',
  title: L(
    'It matched the scientist and missed the point',
    '它追平了科学家，却没抓住要点',
  ),
  summary: L(
    'Two benchmarks posted to arXiv in the opening days of October 2026 turn the two things every other agent eval holds constant into variables — how much guidance the harness supplied, and whether the score rewards a prediction or an explanation. Both move the number by tens of points, and one of them reports an agent at 47.4% predictive accuracy against a human scientist’s 48.8% while scoring 29.4% against 69.7% on the insight the task was built around.',
    '2026 年 10 月初发布到 arXiv 的两个基准，把其他所有智能体评测都当成常量的两件事变成了变量——外壳给了多少指引，以及分数奖励的是一个预测还是一个解释。两者都能把数字挪动几十个点；其中一个报出：智能体的预测准确率 47.4%，人类科学家 48.8%，而在该任务真正围绕的那条洞见上，是 29.4% 对 69.7%。',
  ),
  tags: ['evals', 'agentic-ai', 'frontier-models', 'applications'],
};

export default post;
