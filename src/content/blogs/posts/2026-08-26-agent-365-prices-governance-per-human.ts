import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-26',
  slug: 'agent-365-prices-governance-per-human',
  title: L(
    'Microsoft Priced Agent Governance Per Human. Your Fleet Has No Meter.',
    '微软把智能体治理按人头定价，于是你的机群没有一块计价表',
  ),
  searchTitle: { en: 'Microsoft Agent 365 Prices Agent Governance Per Human' },
  summary: L(
    'Agent 365 costs $15 per user per month and nothing per agent, so the one layer of your stack that exists to control fleet growth is also the only layer whose bill ignores it. Two more things do not line up: the licensing unit assumes every agent has a human sponsor, and the inventory can see far more machines than the block button can reach.',
    'Agent 365 每用户每月 15 美元，按智能体收费为零——于是你栈里唯一为控制机群规模而生的那一层，也是唯一对机群规模视而不见的那张账单。另有两处对不齐：计费单元假设每个智能体都有一位人类担保人，而清单能看见的机器，远多于"阻止"按钮够得着的。',
  ),
  tags: ['ecosystem', 'governance', 'cost', 'agentic-ai', 'safety'],
};

export default post;
