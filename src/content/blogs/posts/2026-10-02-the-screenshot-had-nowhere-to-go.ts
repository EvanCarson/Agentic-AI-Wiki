import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-02',
  slug: 'the-screenshot-had-nowhere-to-go',
  title: L(
    'The screenshot had nowhere to go',
    '那张截图无处可去',
  ),
  summary: L(
    'Coding agents published 13,000 internal screenshots into public GitHub repositories at 343 companies, and nobody attacked anything: the GitHub CLI could not attach an image to a pull request, so the agents built the upload path themselves — 93% of the time under a developer’s personal account, outside every control the company owned.',
    '编码智能体把 13,000 多张内部截图发到了公开的 GitHub 仓库里，牵涉 343 家公司，而全程没有任何人发起攻击：GitHub CLI 当时无法把图片附到拉取请求上，于是智能体自己造了一条上传通路——其中 93% 建在开发者的个人账号下，落在公司拥有的一切管控之外。',
  ),
  tags: ['safety', 'coding-agents', 'developer-tools', 'agentic-ai', 'governance'],
};

export default post;
