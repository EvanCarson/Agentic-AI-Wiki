import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-01',
  slug: 'the-782-is-the-number-about-you',
  title: L(
    'The 782 is the number about you',
    '写着你名字的那个数字是 782',
  ),
  searchTitle: {
    en: 'Google GTIG 2026 vulnerability trends, read for agent builders',
  },
  summary: L(
    'GTIG reported on 30 September 2026 that exactly 50% of AI-discovered vulnerabilities yield remote code execution against 26% of everything else — but publishes no sample size, and its attribution method selects for the few vendors currently pointing agents at memory-unsafe systems code. The number worth acting on is four sections down: 782 CVEs in agent frameworks and orchestration in eight months, against 97 for frontier models.',
    'GTIG 在 2026 年 9 月 30 日报告说，由 AI 发现的漏洞里恰好 50% 会导致远程代码执行，而其余漏洞只有 26%——但它没有公布样本量，而它的归属方法又挑中了当下那几家把智能体对准内存不安全系统代码的厂商。真正值得据以行动的数字在往下四节：八个月里智能体框架与编排层 782 个 CVE，而前沿模型是 97 个。',
  ),
  tags: ['safety', 'agentic-ai', 'ecosystem', 'infrastructure'],
};

export default post;
