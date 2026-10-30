import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-30',
  slug: 'the-tasks-were-public-so-were-the-defects',
  title: L(
    'The tasks were public, so were the defects',
    '任务是公开的，缺陷也是',
  ),
  summary: L(
    "Epoch AI's benchmark review programme had looked at fifteen widely cited benchmarks by mid-September 2026 and rated nine of them Flawed — SWE-bench Verified and Terminal-Bench 4.0.0 among them, the latter with publicly noted scoring defects in 30 of its 66 tasks. Nothing was leaked to produce those findings. Every one of those benchmarks had already published its tasks, verifiers and solutions, which is precisely why the defects were findable: the information needed to discount the scores everyone was quoting had been sitting in the open the whole time, and nobody had read it.",
    'Epoch AI 的基准复核项目在 2026 年 9 月中旬已看过十五个被广泛引用的基准，并把其中九个评为「有缺陷」——SWE-bench Verified 与 Terminal-Bench 4.0.0 都在其中，后者 66 个任务里有 30 个存在已被公开指出的评分缺陷。得出这些结论没有泄露任何东西。那些基准每一个都早已公开了自己的任务、验证器与解法，而这恰恰是缺陷之所以能被找到的原因：要给所有人都在引用的那些分数打折所需的信息，一直就摊在明面上，只是没人去读。',
  ),
  tags: ['evals', 'coding-agents', 'agentic-ai'],
};

export default post;
