import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-24',
  slug: 'the-agent-got-a-sponsor-not-a-manager',
  title: L(
    'The agent got a sponsor, not a manager',
    '智能体拿到的是一个 sponsor，不是一个经理',
  ),
  summary: L(
    'Ignite 2026 gave agents mailboxes, calendars and a place in the org chart, and the aggregators reported an accountable manager. The field Entra Agent ID actually refuses to create an agent without is the sponsor — and a sponsor can stop an agent but cannot reconfigure it. That split is the design worth copying.',
    'Ignite 2026 给智能体发了邮箱、日历和组织架构上的位置，而媒体转述成「每个都有一位负责的经理」。Entra Agent ID 真正不肯缺省的那个字段是 sponsor——而 sponsor 能叫停一个智能体，却改不动它。这道切分才是值得照搬的设计。',
  ),
  tags: ['agentic-ai', 'governance', 'ecosystem', 'infrastructure', 'safety'],
};

export default post;
