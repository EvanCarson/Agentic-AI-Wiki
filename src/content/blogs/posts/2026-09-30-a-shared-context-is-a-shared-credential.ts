import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-30',
  slug: 'a-shared-context-is-a-shared-credential',
  title: L(
    'A shared context is a shared credential',
    '共享上下文就是一份共享凭据',
  ),
  searchTitle: {
    en: 'What OpenAI DevDay 2026 shipped, read as a permission model',
  },
  summary: L(
    'At DevDay on 29 September 2026 OpenAI paired always-on Dots agents — each with its own cloud computer, browser and thousands of connectors — with ChatGPT Space, where employees, ChatGPT, Codex and those agents work from one shared context. The permission model people will reason about is per-connector OAuth scope. The boundary that decides what happens is who may write into the context, and nobody is enforcing that one.',
    '在 2026 年 9 月 29 日的 DevDay 上，OpenAI 把常驻的 Dots 智能体——每个都配了自己的云端电脑、浏览器和数千个连接器——与 ChatGPT Space 配成一对，让员工、ChatGPT、Codex 和这些智能体从同一份共享上下文出发工作。人们会用来推理的权限模型是按连接器的 OAuth 授权范围。而真正决定结局的边界是「谁可以往这份上下文里写」，偏偏没人在强制这一条。',
  ),
  tags: ['agentic-ai', 'safety', 'ecosystem', 'prompt-injection', 'agent-ux'],
};

export default post;
