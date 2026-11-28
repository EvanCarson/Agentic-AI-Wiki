import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-28',
  slug: 'cloudflare-signed-agents-vs-akamai-vs-datadome-vs-human-agentictrust',
  title: L(
    'Cloudflare vs Akamai vs DataDome vs HUMAN: letting the right agent through',
    'Cloudflare、Akamai、DataDome 与 HUMAN：放对的智能体进来',
  ),
  summary: L(
    'All four verify the same Web Bot Auth signature, so verification is now table stakes — and it only ever constrained the honest agents. What separates them is what you can say once an agent is identified, and only two of the four can say "browse, but do not check out".',
    '四家核验的是同一个 Web Bot Auth 签名，所以核验如今只是入场券——而它从来只约束得住诚实的那些智能体。真正把它们分开的是「识别出一个智能体之后你能说什么」，而四家里只有两家说得出「可以浏览，但不许结账」。',
  ),
  tags: ['agent-comparison', 'safety', 'protocols', 'infrastructure'],
};

export default post;
