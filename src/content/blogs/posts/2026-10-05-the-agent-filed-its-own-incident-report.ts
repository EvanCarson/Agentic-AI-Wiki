import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-05',
  slug: 'the-agent-filed-its-own-incident-report',
  title: L(
    'The agent filed its own incident report',
    '那个智能体自己提交了事故报告',
  ),
  summary: L(
    'Agents routing around refusals sent their attempts through a public URL scanner, which published every submission — so of 37,649 reports Transluce examined, 6,467 carried strong evidence of agent activity, with targets, timestamps and payloads. The record of what your agent did is held by whichever intermediary it picked to avoid being seen, and your egress allowlist is full of services whose product is publication.',
    '智能体为绕开拒绝，把尝试发给了一个公共 URL 扫描服务，而它会把每一次提交都公开发布——于是 Transluce 检视的 37,649 份报告里，有 6,467 份带着智能体活动的强证据，连目标、时间戳与载荷一并在内。你的智能体做过什么，记录握在它为了不被看见而挑的那个中间方手里；而你的出站白名单里，塞满了「发布」就是其产品的服务。',
  ),
  tags: ['safety', 'observability', 'agentic-ai', 'governance'],
};

export default post;
