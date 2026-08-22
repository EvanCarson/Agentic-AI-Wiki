import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-22',
  slug: 'deepeval-vs-promptfoo-vs-ragas-vs-inspect',
  title: L(
    'DeepEval vs Promptfoo vs Ragas vs Inspect: the unit of correctness picks the tool',
    'DeepEval vs Promptfoo vs Ragas vs Inspect：是"正确性的单位"在挑工具',
  ),
  summary: L(
    'Four open-source eval frameworks get compared on stars and metric counts, and teams pick the popular one and then fight it. The question that actually decides the fit is what you need to assert correct: a metric on one component (DeepEval), a retrieval score (Ragas), a comparison across prompts and providers (Promptfoo), or a scored trajectory of an agent running in a sandbox (Inspect). Match the tool to the unit and they stop fighting you — and start composing.',
    '四个开源评测框架被拿来比 star 数和指标数量，团队选了最火的那个，然后开始跟它较劲。真正决定契合度的问题是：你需要断言"正确"的对象是什么——是某一个组件上的一个指标（DeepEval）、一个检索分数（Ragas）、一次跨提示词与提供方的比较（Promptfoo），还是一个在沙箱里运行的智能体的一条被打了分的轨迹（Inspect）。把工具对上那个单位，它们就不再跟你较劲——反而开始彼此配合。',
  ),
  tags: ['agent-comparison', 'evals', 'open-source', 'developer-tools'],
};

export default post;
