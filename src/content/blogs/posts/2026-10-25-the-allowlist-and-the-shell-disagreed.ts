import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-25',
  slug: 'the-allowlist-and-the-shell-disagreed',
  title: L(
    'The allowlist and the shell disagreed about where the command ended',
    '允许清单和 shell 对命令在哪里结束各执一词',
  ),
  summary: L(
    'Nine advisories hit one coding agent’s command-approval gate between March and October 2026, five on a single day, and none of them is a bug in the allowlist’s contents. Matching a shell string means maintaining a second shell — and the repository has been archived since May, so "through 3.54.0" is the final state.',
    '2026 年 3 月到 10 月之间，九份安全公告打中同一个编程智能体的命令批准闸门，其中五份发布于同一天，而没有一份是允许清单内容本身的错。对 shell 字符串做匹配，等于自己再维护一个 shell——而那个仓库自 5 月起已归档，所以「3.54.0 及以下」就是终局。',
  ),
  tags: ['safety', 'coding-agents', 'prompt-injection', 'sandboxing', 'agentic-ai'],
};

export default post;
