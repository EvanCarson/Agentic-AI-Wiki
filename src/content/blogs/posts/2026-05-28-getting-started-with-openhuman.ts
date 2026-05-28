import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-05-28',
  slug: 'getting-started-with-openhuman',
  title: L(
    'Getting Started with OpenHuman: From Install to Your First Useful Answer',
    'OpenHuman 上手指南：从安装到第一个有用的回答',
  ),
  summary: L(
    'Most agents start cold and you spend days briefing them. OpenHuman loads a compressed model of your work life in one sync pass — here is how to install it, connect your stack, and get a useful answer in about fifteen minutes.',
    '大多数智能体从零开始，你得花上几天向它交代背景。OpenHuman 在一次同步中就载入了对你工作生活的压缩模型——本文带你安装、接入你的工具栈，并在约十五分钟内得到一个有用的回答。',
  ),
  tags: ['open-source', 'getting-started', 'personal-assistant', 'memory'],
};

export default post;
