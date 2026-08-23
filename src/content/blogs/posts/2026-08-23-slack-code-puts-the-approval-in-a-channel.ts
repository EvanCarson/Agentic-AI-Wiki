import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-23',
  slug: 'slack-code-puts-the-approval-in-a-channel',
  title: L(
    'Slack Code puts the approval in a channel — name one approver anyway',
    'Slack Code 把审批搬进了频道——但你仍然要指定一个人来批',
  ),
  summary: L(
    'Slack shipped the review surface, not the agent: five partner coding agents you buy separately, working inside a channel with a plan tab, a diff tab and a live preview, and a human approval before anything ships. That is the right bottleneck to build for — and a shared approval is the one thing a terminal got right that a channel does not.',
    'Slack 交付的是复核界面，而不是智能体：五家合作方的编码智能体要单独购买，它们在一个带计划页、diff 页与实时预览的频道里干活，任何东西上线前都要经人批准。押在这个瓶颈上是对的——而"共享的审批"恰恰是终端做对、频道做砸的那一件事。',
  ),
  tags: ['coding-agents', 'developer-tools', 'ecosystem', 'agentic-ai'],
};

export default post;
