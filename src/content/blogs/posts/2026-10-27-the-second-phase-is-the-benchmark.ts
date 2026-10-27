import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-27',
  slug: 'the-second-phase-is-the-benchmark',
  title: L(
    'The second phase is the benchmark, and nobody has reported it yet',
    '第二阶段才是那个基准，而还没有人报告过它',
  ),
  summary: L(
    "Cisco's VLoc Bench specifies two phases: find the vulnerable files in a pre-fix repository, then correctly say nothing is wrong in the patched one. Only the first is on the leaderboard — the best of 27 models and 4 static-analysis tools reaches 0.229 File F1, and on 38.4% of 500 tasks no model finds a single correct file. A benchmark that scores only finding is maximised by an agent that flags everything, which is why the unreported phase is the one that decides whether any of this ships.",
    'Cisco 的 VLoc Bench 规定了两个阶段：在修复前的仓库里找出有漏洞的文件，然后在已打补丁的仓库里正确地说「没问题」。只有第一个上了排行榜——27 个语言模型与 4 个静态分析工具中最好的那个拿到 0.229 的 File F1，而在 500 个任务里有 38.4% 连一个正确文件都没有任何模型找得到。一个只给「找到」打分的基准，会被一个什么都标红的智能体拿满分——这正是那个尚未被报告的阶段，才是决定这一切能不能上线的那一个的原因。',
  ),
  tags: ['evals', 'coding-agents', 'safety', 'open-source'],
};

export default post;
