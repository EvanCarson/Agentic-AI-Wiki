import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-14',
  slug: 'the-coordinator-is-the-requester-now',
  title: L(
    'The coordinator is the requester now — and nobody scoped the grant',
    '如今提出需求的是那个协调者——而没人给这份授权划过范围',
  ),
  searchTitle: {
    en: 'Cursor Projects: a coordinator agent with a trigger list is a standing authorization',
  },
  summary: L(
    'Cursor put Projects into beta on 10 September: a coordinator agent that plans, delegates to thousands of subagents, and — the part worth arguing about — watches a Slack channel, a schedule or all your PRs and acts without waiting for a prompt. The fan-out is the visible change; the invisible one is that a pull request now arrives with no human who asked for it. Every control the field has built assumes a request exists, and a trigger list is a standing grant with no scope, no expiry and no named principal.',
    'Cursor 在 9 月 10 日把 Projects 放进公测：一个会做规划、把活派给成千上万个子智能体的协调者，而真正值得争论的那部分是——它会盯着一个 Slack 频道、一份日程表、或者你所有的 PR，不等你提示就动手。扇出是看得见的那处变化；看不见的那处是：一个 PR 如今送达时，背后没有任何一个提出它的人。这个领域建起来的每一道控制都假定「存在一个请求」，而一份触发器清单，是一份没有范围、没有到期、也没有具名主体的长期授权。',
  ),
  tags: ['coding-agents', 'agentic-ai', 'governance', 'ecosystem'],
};

export default post;
