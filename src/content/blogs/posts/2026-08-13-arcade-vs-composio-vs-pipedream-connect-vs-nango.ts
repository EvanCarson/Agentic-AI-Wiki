import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-13',
  slug: 'arcade-vs-composio-vs-pipedream-connect-vs-nango',
  title: L(
    'Arcade vs Composio vs Pipedream Connect vs Nango: Who Holds the User’s Token',
    'Arcade、Composio、Pipedream Connect 与 Nango：用户的令牌握在谁手里',
  ),
  summary: L(
    'Four platforms that stand between your agent and a user’s Gmail or Salesforce. The catalog sizes they advertise are counted in four different units and are the part you will outgrow; the token vault none of them market is the part you would hate to build. The decision you cannot retrofit is whose name is on the consent screen.',
    '四个横在你的智能体与用户 Gmail 或 Salesforce 之间的平台。它们打出的目录规模用了四种不同的计数单位，而且恰恰是你迟早会用不下的那部分；没人拿来营销的令牌保险库，才是你最不愿意自己造的那部分。真正无法事后补救的决定，是同意授权页面上写着谁的名字。',
  ),
  tags: ['agent-comparison', 'infrastructure', 'developer-tools', 'mcp'],
};

export default post;
