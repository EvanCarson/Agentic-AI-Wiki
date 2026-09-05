import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-05',
  slug: 'ten-hours-and-no-zero-days',
  title: L(
    'Ten hours, fifty techniques, no zero-days — the clock was the vulnerability',
    '十小时、五十种技术、零个零日——真正的漏洞是那口钟',
  ),
  searchTitle: { en: 'Unit 42: a ten-hour agent-run intrusion with no zero-day' },
  summary: L(
    'Unit 42 published an intrusion that ran cloud, identity, CI/CD and SaaS in under ten hours using more than fifty documented ATT&CK techniques and no zero-day, then had a documentation agent write the victim an 80-page audit. Nothing in the tradecraft was new; the response clock is what broke. Containment that waits for a human decision chain is now the control that fails.',
    'Unit 42 公布了一起入侵：在不到十小时内穿透云、身份、CI/CD 与 SaaS，用了五十多种有据可查的 ATT&CK 技术，零个零日，最后还让一个文档智能体给受害方写了一份 80 页的安全审计。手法里没有一样是新的；坏掉的是响应的那口钟。如今会失效的那项控制，是需要等一条人工决策链的遏制。',
  ),
  tags: ['safety', 'agentic-ai', 'observability', 'governance'],
};

export default post;
