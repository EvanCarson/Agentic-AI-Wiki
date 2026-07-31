import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-07-31',
  slug: 'promptfoo-vs-deepeval-vs-inspect-ai',
  title: L(
    'promptfoo vs DeepEval vs Inspect AI: Three Harnesses That Disagree About What an Eval Is',
    'promptfoo、DeepEval 与 Inspect AI：三套对"评测是什么"意见相左的框架',
  ),
  summary: L(
    'All three READMEs describe the same job — run cases through a model, score the output, fail the build. But at the level of their core data structure they disagree about what an evaluation is: an attack, an assertion, or an experiment. Pick the wrong noun and the tool will not let you write the test you actually need.',
    '三份 README 描述的是同一件事——把用例喂给模型、给输出打分、卡住构建。但在核心数据结构这一层，它们对"评测究竟是什么"意见相左：是一次攻击、一条断言，还是一场实验。名词选错了，工具就不会让你写出你真正需要的那种测试。',
  ),
  tags: ['agent-comparison', 'evals', 'open-source', 'developer-tools', 'safety'],
};

export default post;
