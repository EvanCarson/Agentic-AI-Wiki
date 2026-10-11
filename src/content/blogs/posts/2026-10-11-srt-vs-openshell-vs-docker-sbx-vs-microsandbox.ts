import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-11',
  slug: 'srt-vs-openshell-vs-docker-sbx-vs-microsandbox',
  title: L(
    'Anthropic srt vs NVIDIA OpenShell vs Docker Sandboxes vs microsandbox: pick on where the token lives',
    'Anthropic srt、NVIDIA OpenShell、Docker Sandboxes 与 microsandbox 对比：按「令牌住在哪里」来挑',
  ),
  summary: L(
    'All four now deny egress by default, so that column decides nothing. Three of the four keep your credentials outside the sandbox, by three different mechanisms; the fourth is the one bundled with Claude Code, and it allows filesystem reads everywhere until you write a denyRead list. Both published bypasses were in the hostname matcher, not the kernel.',
    '四者如今都默认拒绝出站，所以那一栏什么也决定不了。四者中有三个把你的凭据留在沙箱之外，而且用的是三种不同的机制；而第四个正是与 Claude Code 捆在一起的那个，它在你写出一份 denyRead 清单之前，在任何地方都允许文件系统读取。而两次已公开的绕过都出在主机名匹配器里，不在内核里。',
  ),
  tags: ['agent-comparison', 'sandboxing', 'open-source', 'developer-tools'],
};

export default post;
