import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-07',
  slug: 'swe-bench-verified-vs-swe-bench-pro-vs-terminal-bench-2-1-vs-swe-rebench',
  title: L(
    'SWE-bench Verified vs SWE-bench Pro vs Terminal-Bench 2.1 vs SWE-rebench',
    'SWE-bench Verified、SWE-bench Pro、Terminal-Bench 2.1 与 SWE-rebench 之辨',
  ),
  summary: L(
    "Each of these four defends against a different kind of decay — broken tasks, leaked answers, or an item set that has aged into tutorials — and none defends against all three. The most useful number across all four is not a leaderboard score: it is that Terminal-Bench's maintainers audited their own 89 tasks six months after release and had to repair 26 to 28 of them.",
    '这四者各自防的是不同一种腐坏——任务坏掉、答案泄漏、题目集老成了教程——而没有一个能防住全部三种。横跨四者最有用的那个数字并不是排行榜分数：而是 Terminal-Bench 的维护者在发布半年后审了自己那 89 个任务，不得不修掉其中 26 到 28 个。',
  ),
  tags: ['agent-comparison', 'evals', 'coding-agents', 'open-source'],
};

export default post;
