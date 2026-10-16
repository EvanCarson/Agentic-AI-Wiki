import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-16',
  slug: 'the-directory-entry-was-the-announcement',
  title: L(
    'The directory entry was the announcement, not the email address',
    '真正的发布内容是那条目录条目，不是那个邮箱地址',
  ),
  summary: L(
    'Google\'s enterprise agent, announced 8 October, is reported to give each agent its own Workspace account — an address on an agents. subdomain, a calendar, Drive storage, a directory entry, and actions logged against a cryptographically attested agent identity. The attestation fixes the shared robot-user problem and buys attribution, not authorisation; the directory entry makes the agent a principal that every group-based share silently includes, and the mailbox makes it the first agent identity a stranger can write to without a credential.',
    'Google 于 10 月 8 日发布的企业智能体，据报道会给每个智能体发放独立的 Workspace 账号——一个位于 agents. 子域下的地址、一份日历、Drive 存储空间、一条目录条目，以及记在带密码学认证的智能体身份名下的操作日志。这份认证解决了共享机器人账号的老问题，买到的是归属，不是授权；而那条目录条目让智能体成为一个主体，被每一次按组共享悄悄纳入，那个邮箱则让它成为史上第一个陌生人无需凭据就能写入的智能体身份。',
  ),
  tags: ['safety', 'governance', 'agentic-ai', 'ecosystem'],
};

export default post;
