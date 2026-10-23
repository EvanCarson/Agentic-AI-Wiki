import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-23',
  slug: 'ten-projects-and-no-trust-boundary',
  title: L(
    'Ten projects, and not one of them is a trust boundary',
    '十个项目，而没有一个是信任边界',
  ),
  summary: L(
    'The Agentic AI Foundation took four more projects on 22 October 2026 — Agent Skills, Open Responses, OpenEnv and OpenSandbox — and now holds a vendor-neutral spec for every layer of the agent stack. None of the ten says who may publish an artefact or what it may do once loaded. Agent Skills arrives with about a million skills already published and security guidance still on the roadmap.',
    'Agentic AI Foundation 在 2026 年 10 月 22 日又接收了四个项目——Agent Skills、Open Responses、OpenEnv 与 OpenSandbox——如今它为智能体技术栈的每一层都握着一份厂商中立的规范。而这十个项目里，没有一个说明了谁可以发布制品、或者制品被加载之后可以做什么。Agent Skills 带着大约一百万个已发布的技能到场，而安全指引仍停留在路线图上。',
  ),
  tags: ['ecosystem', 'governance', 'open-source', 'agentic-ai', 'safety'],
};

export default post;
