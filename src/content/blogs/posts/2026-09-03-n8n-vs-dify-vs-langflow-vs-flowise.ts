import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-03',
  slug: 'n8n-vs-dify-vs-langflow-vs-flowise',
  title: L(
    'n8n vs Dify vs Langflow vs Flowise: the licence names the moat',
    'n8n、Dify、Langflow 与 Flowise：许可证会把护城河指给你看',
  ),
  searchTitle: {
    en: 'n8n vs Dify vs Langflow vs Flowise Compared',
  },
  summary: L(
    'Flowise archived itself on 13 August 2026 and its maintainers named the reason: coding agents now handle the complexity that a rigid low-code workflow hits a wall on. The three still standing are not surviving on the canvas either — each is defending something underneath it, and each licence says exactly what. n8n forbids offering it to others, Dify forbids multi-tenant operation, Langflow forbids nothing and is owned by IBM. Read the clause before the feature list.',
    'Flowise 在 2026 年 8 月 13 日把自己归档了，维护者点名了原因：如今编码智能体接手了那些复杂度，而僵硬的低代码工作流正是在那里撞墙的。还站着的三家也不是靠画布活下来的——每一家守的都是画布底下的某样东西，而每一份许可证都把那是什么写得清清楚楚。n8n 禁止你把它提供给别人，Dify 禁止多租户运营，Langflow 什么都不禁而它归 IBM 所有。先读条款，再读功能表。',
  ),
  tags: ['agent-comparison', 'open-source', 'agent-frameworks', 'orchestration', 'self-hosted', 'ecosystem'],
};

export default post;
