import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-04',
  slug: 'the-block-log-is-an-injection-channel',
  title: L(
    'The WAF blocked the payload, then wrote it where your agent reads',
    'WAF 拦下了载荷，然后把它写进了你的智能体会读的地方',
  ),
  searchTitle: { en: 'GhostJacking: the block log is an injection channel' },
  summary: L(
    'GhostJacking, presented at DEF CON on 9 August 2026, reported a 90% success rate against a coding agent on a vendor\'s own recommended configuration — because recording hostile input verbatim is what a firewall is for, and the triage agent reads that record holding the operator\'s credentials. No exploit, no alert, every action authorised. The fix is structural: split the agent that reads from the agent that acts.',
    '2026 年 8 月 9 日在 DEF CON 上发布的 GhostJacking，在厂商自家推荐的配置下对一台编码智能体报出了 90% 的成功率——因为逐字记录敌对输入本来就是防火墙的职责，而读这份记录的分诊智能体，手里握着操作者的凭据。没有漏洞利用、没有告警，每一个动作都是获授权的。解法是结构性的：把「读的智能体」和「动手的智能体」拆开。',
  ),
  tags: ['safety', 'agentic-ai', 'coding-agents', 'observability', 'guardrails'],
};

export default post;
