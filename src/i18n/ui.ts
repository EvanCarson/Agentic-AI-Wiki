import type { Locale } from './index';

export interface UIStrings {
  brand: string;
  tagline: string;
  nav: { fieldGuide: string; concepts: string; deepDives: string; posts: string; about: string };
  switcher: { en: string; zh: string; aria: string };
  sidebarAria: string;
  breadcrumbRoot: string;
  prev: string;
  next: string;
  tocHeading: string;
  chapterWord: { one: string; many: string };
  home: { kicker: string; h1Html: string; lede: string;
          featuredKicker: string; featuredTitle: string;
          parts: string; chapters: string; startReading: string;
          latest: string };
  fg: { metaTitle: string; metaDesc: string };
  concepts: { metaTitle: string; metaDesc: string; h1: string; tagline: string; emptyHtml: string };
  deepDives: { metaTitle: string; metaDesc: string; h1: string; tagline: string; emptyHtml: string };
  about: { kicker: string; h1: string; bodyHtml: string };
  posts: { metaTitle: string; metaDesc: string; h1: string; emptyHtml: string };
  seriesTitle: string;
}

export const ui: Record<Locale, UIStrings> = {
  en: {
    brand: 'Agentic AI Wiki',
    tagline: 'Agentic AI Wiki — knowledge, written to last.',
    nav: { fieldGuide: 'Field Guide', concepts: 'Concepts', deepDives: 'Deep-Dives', posts: 'Posts', about: 'About' },
    switcher: { en: 'EN', zh: '中文', aria: 'Language' },
    sidebarAria: 'Field Guide chapters',
    breadcrumbRoot: 'Field Guide',
    prev: '← prev',
    next: 'next →',
    tocHeading: 'The whole path',
    chapterWord: { one: 'chapter', many: 'chapters' },
    home: {
      kicker: 'A Living Knowledge Base',
      h1Html: 'Building <em>agentic</em> AI, from first principles to the frontier.',
      lede: 'Notes and guides on building software that plans, calls tools, verifies its own work, and ships to real users.',
      featuredKicker: 'Flagship Series',
      featuredTitle: 'The Agentic AI Field Guide',
      parts: 'parts', chapters: 'chapters', startReading: 'Start reading →',
      latest: 'Latest',
    },
    fg: { metaTitle: 'The Agentic AI Field Guide',
          metaDesc: "A working engineer's guide to building agentic systems, end to end." },
    concepts: {
      metaTitle: 'Concepts — Agentic AI Wiki',
      metaDesc: 'AI and agentic AI explained: a plain-language encyclopedia from foundations to the agent loop.',
      h1: 'Concepts',
      tagline: 'AI & agentic AI explained — plain-language entries for newcomers and intermediates.',
      emptyHtml: 'Concept entries are coming soon — in the meantime, dive into the <a href="%FG%" style="color:var(--accent);">Field Guide</a>.',
    },
    deepDives: {
      metaTitle: 'Deep-Dives — Agentic AI Wiki',
      metaDesc: 'Advanced practitioner essays on agent architectures, protocols, memory, and agentic security.',
      h1: 'Deep-Dives',
      tagline: 'Advanced practitioner essays — architectures, protocols, memory, and agentic security.',
      emptyHtml: 'Deep-dive essays are coming soon — in the meantime, dive into the <a href="%FG%" style="color:var(--accent);">Field Guide</a>.',
    },
    about: { kicker: 'About', h1: 'Agentic AI Wiki',
      bodyHtml: 'A living knowledge base on building agentic AI. The flagship <a href="%FG%" style="color:var(--accent);">Agentic AI Field Guide</a> walks from first principles to the frontier; standalone posts go deeper as the field moves.' },
    posts: { metaTitle: 'Posts — Agentic AI Wiki', metaDesc: 'Standalone notes and essays on agentic AI.',
      h1: 'Posts',
      emptyHtml: 'No standalone posts yet — start with the <a href="%FG%" style="color:var(--accent);">Field Guide</a>.' },
    seriesTitle: 'The Agentic AI Field Guide',
  },
  zh: {
    brand: 'Agentic AI 维基',
    tagline: 'Agentic AI 维基 — 沉淀长期有效的知识。',
    nav: { fieldGuide: '实战指南', concepts: '概念', deepDives: '深度剖析', posts: '文章', about: '关于' },
    switcher: { en: 'EN', zh: '中文', aria: '语言' },
    sidebarAria: '实战指南章节',
    breadcrumbRoot: '实战指南',
    prev: '← 上一章',
    next: '下一章 →',
    tocHeading: '完整路径',
    chapterWord: { one: '章', many: '章' },
    home: {
      kicker: '持续更新的知识库',
      h1Html: '构建<em>智能体</em> AI：从第一性原理到前沿。',
      lede: '关于构建会规划、调用工具、自我校验并真正交付给用户的软件的笔记与指南。',
      featuredKicker: '旗舰系列',
      featuredTitle: 'Agentic AI 实战指南',
      parts: '部分', chapters: '章', startReading: '开始阅读 →',
      latest: '最新',
    },
    fg: { metaTitle: 'Agentic AI 实战指南',
          metaDesc: '一线工程师的智能体系统构建全程指南。' },
    concepts: {
      metaTitle: '概念 — Agentic AI 维基',
      metaDesc: 'AI 与 Agentic AI 通俗解读：从基础到智能体主循环的白话百科。',
      h1: '概念',
      tagline: 'AI 与 Agentic AI 通俗解读 — 面向新手与进阶者的白话词条。',
      emptyHtml: '概念词条即将上线 — 在此之前，先深入阅读 <a href="%FG%" style="color:var(--accent);">实战指南</a>。',
    },
    deepDives: {
      metaTitle: '深度剖析 — Agentic AI 维基',
      metaDesc: '面向进阶实践者的深度文章：智能体架构、协议、记忆与智能体安全。',
      h1: '深度剖析',
      tagline: '面向进阶实践者的深度文章 — 架构、协议、记忆与智能体安全。',
      emptyHtml: '深度剖析文章即将上线 — 在此之前，先深入阅读 <a href="%FG%" style="color:var(--accent);">实战指南</a>。',
    },
    about: { kicker: '关于', h1: 'Agentic AI 维基',
      bodyHtml: '一个持续更新、关于构建 Agentic AI 的知识库。旗舰系列 <a href="%FG%" style="color:var(--accent);">Agentic AI 实战指南</a> 带你从第一性原理走到前沿；随着领域演进，独立文章会进一步深入。' },
    posts: { metaTitle: '文章 — Agentic AI 维基', metaDesc: '关于 Agentic AI 的独立笔记与文章。',
      h1: '文章',
      emptyHtml: '暂无独立文章 — 先从 <a href="%FG%" style="color:var(--accent);">实战指南</a> 开始。' },
    seriesTitle: 'Agentic AI 实战指南',
  },
};
