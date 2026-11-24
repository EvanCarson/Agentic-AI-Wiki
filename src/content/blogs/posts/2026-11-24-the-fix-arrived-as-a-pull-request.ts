import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-24',
  slug: 'the-fix-arrived-as-a-pull-request',
  title: L(
    'The fix arrived as a pull request, the investigation did not',
    '修复是以一个 pull request 的形式来的，调查过程没有',
  ),
  summary: L(
    'Databricks opened Genie ZeroOps to public beta on 19 November 2026: an agent that watches pipelines, finds the root cause and hands you a branch to open a PR from. Routing agent approval through the pull request is the right call — but the diff contains the fix and not the reading that produced it, and the guarantee rests on a branch-protection setting the vendor does not control.',
    '2026 年 11 月 19 日，Databricks 把 Genie ZeroOps 开放到公开测试：一个盯着流水线、定位根因、再递给你一个分支去开 PR 的智能体。把智能体的审批走 pull request 这条路是对的——但 diff 里装的是修复，不是产出它的那一堆读取；而那条保证，悬在一个厂商管不着的分支保护设置上。',
  ),
  tags: ['agentic-ai', 'governance', 'coding-agents', 'infrastructure', 'safety'],
};

export default post;
