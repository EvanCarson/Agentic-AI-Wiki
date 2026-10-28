import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-28',
  slug: 'the-same-model-two-different-computer-tools',
  title: L(
    'The same model takes two different computer tools',
    '同一个模型，吃的是两套不同的「电脑操作」工具',
  ),
  summary: L(
    "Ask which computer-use tool Claude Opus 5.5 supports and the documentation has two answers: on the Claude API it accepts only `computer_toolset_20260801` and errors on anything earlier; on Amazon Bedrock it accepts the earlier `computer_20251124`. The two differ in shape and in screenshot ceiling — 4,784 visual tokens at 2,576px versus about 1.15 megapixels — so one model string runs two agents with different grounding accuracy and different per-step cost, and no model on the Claude API accepts both.",
    '问 Claude Opus 5.5 支持哪套「电脑操作」工具，文档给的是两个答案：在 Claude API 上它只接受 `computer_toolset_20260801`，更早的版本一律报错；而在 Amazon Bedrock 上它接受更早的 `computer_20251124`。两者在形状与截图上限上都不同——2,576 像素长边下的 4,784 个视觉 token，对约 115 万像素——于是同一个模型字符串跑出的是两个智能体：定位精度不同，每步成本也不同；而在 Claude API 上，没有任何一个模型同时接受这两套。',
  ),
  tags: ['computer-use', 'agentic-ai', 'developer-tools', 'evals'],
};

export default post;
