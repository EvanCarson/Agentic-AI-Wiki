import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-01',
  slug: 'the-session-id-was-a-command-line-flag',
  title: L(
    'The session ID was a command-line flag',
    '那个会话 ID，其实是一个命令行参数',
  ),
  summary: L(
    'CVE-2026-96620 scores 9.2 because of which flag got injected, not because a string reached a shell. The Python Claude Agent SDK forwarded its resume option into the Claude CLI unvalidated, so a session ID beginning with a hyphen became argv — and the reachable flag was --mcp-config, which does not run one command but mounts a tool the model can keep calling. Argument injection into an agent harness is a permission edit that lands upstream of the permission system.',
    'CVE-2026-96620 拿到 9.2 分，原因在于被注入的是哪一个参数，而不在于「一个字符串跑进了 shell」。Python 版 Claude Agent SDK 把 resume 选项未经校验地转交给 Claude CLI，于是一个以连字符开头的会话 ID 变成了 argv——而能被摸到的那个参数是 --mcp-config，它不是执行一条命令，而是挂上一件模型可以反复调用的工具。对智能体外壳做参数注入，是一次落在权限系统上游的权限改写。',
  ),
  tags: ['safety', 'developer-tools', 'mcp', 'agentic-ai'],
};

export default post;
