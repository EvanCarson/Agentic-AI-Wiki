import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-14',
  slug: 'the-server-was-archived-the-install-still-worked',
  title: L(
    'The server was archived, the install still worked',
    '那个服务端早已归档，安装却照样跑通了',
  ),
  summary: L(
    'Glow Labs published research on 2 November 2026 — it calls the pattern MCPhantom — finding that coding agents install MCP servers whose names they recalled from training data rather than looked up, and that most of those packages are the original MCP reference servers, several archived since 2025 with four high-severity findings and no patch path. The transferable point is not the vulnerabilities. It is that a lockfile pins versions of dependencies you declared, and this dependency was never declared: a name came out of the model, npx resolved it, and a process now holds your filesystem and your tokens. Every control you already own sits on the wrong side of that step.',
    '2026 年 11 月 2 日，Glow Labs 发布了一项研究——它把这个现象称作 MCPhantom——发现编码智能体会去安装那些名字是它从训练数据里回忆出来、而非查到的 MCP 服务端；而这些包大多是最初那批 MCP 参考服务端，其中若干自 2025 年起已归档，带着四项高危发现且没有修补路径。可迁移的要点不是那些漏洞，而是：锁文件锁住的是你声明过的依赖的版本，而这个依赖从未被声明——一个名字从模型里出来，npx 把它解析掉，于是现在有一个进程握着你的文件系统和你的令牌。你已经拥有的每一道控制，都站在那一步的错误一侧。',
  ),
  tags: ['mcp', 'safety', 'coding-agents', 'developer-tools', 'ecosystem'],
};

export default post;
