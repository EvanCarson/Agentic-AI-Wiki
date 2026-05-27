import type { Locale } from './index';

export interface UIStrings {
  brand: string;
  tagline: string;
  nav: { fieldGuide: string; concepts: string; deepDives: string; playbooks: string; operations: string; blog: string; changelog: string; about: string };
  switcher: { en: string; zh: string; aria: string };
  search: {
    open: string;        // accessible label / tooltip for the trigger button
    label: string;       // visible short label next to the icon
    placeholder: string;
    clear: string;
    loadMore: string;
    searchLabel: string;
    filtersLabel: string;
    zeroResults: string; // uses [SEARCH_TERM]
    manyResults: string; // uses [COUNT] [SEARCH_TERM]
    oneResult: string;   // uses [COUNT] [SEARCH_TERM]
    altSearch: string;   // uses [SEARCH_TERM] [DIFFERENT_TERM]
    searchSuggestion: string; // uses [SEARCH_TERM]
    searching: string;   // uses [SEARCH_TERM]
    close: string;
  };
  sidebarAria: string;
  breadcrumbRoot: string;
  prev: string;
  next: string;
  tocHeading: string;
  toc: { heading: string };
  chapterWord: { one: string; many: string };
  home: { kicker: string; h1Html: string; lede: string;
          featuredKicker: string; featuredTitle: string;
          parts: string; chapters: string; startReading: string;
          latest: string };
  fg: { metaTitle: string; metaDesc: string };
  concepts: { metaTitle: string; metaDesc: string; h1: string; tagline: string; emptyHtml: string };
  deepDives: { metaTitle: string; metaDesc: string; h1: string; tagline: string; emptyHtml: string };
  playbooks: { metaTitle: string; metaDesc: string; h1: string; tagline: string; emptyHtml: string };
  operations: { metaTitle: string; metaDesc: string; h1: string; tagline: string; emptyHtml: string };
  blog: {
    metaTitle: string;
    metaDesc: string;
    h1: string;
    tagline: string;
    postedOn: string;
    byline: string;
    readingTime: string;
    taggedWith: string;
    latestPosts: string;
    allPosts: string;
    allTags: string;
    backToBlog: string;
    defaultAuthor: string;
    tagMetaTitle: string;   // template with [TAG]
    tagMetaDesc: string;    // template with [TAG]
    onThisPage: string;
  };
  about: { kicker: string; h1: string; metaDesc: string;
           missionH: string; missionHtml: string;
           coveredH: string; coveredHtml: string;
           maintainerH: string; maintainerHtml: string;
           contactH: string; contactHtml: string };
  changelog: { kicker: string; metaTitle: string; metaDesc: string; h1: string; intro: string };
  og: { tagline: string };
  theme: { ariaLight: string; ariaDark: string; ariaAuto: string };
  seriesTitle: string;
}

export const ui: Record<Locale, UIStrings> = {
  en: {
    brand: 'Agentic AI Wiki',
    tagline: 'Agentic AI Wiki — knowledge, written to last.',
    nav: { fieldGuide: 'Field Guide', concepts: 'Concepts', deepDives: 'Deep-Dives', playbooks: 'Playbooks', operations: 'Operations', blog: 'AI Blog', changelog: 'Changelog', about: 'About' },
    switcher: { en: 'EN', zh: '中文', aria: 'Language' },
    search: {
      open: 'Search the wiki',
      label: 'Search',
      placeholder: 'Search the wiki…',
      clear: 'Clear',
      loadMore: 'Load more results',
      searchLabel: 'Search',
      filtersLabel: 'Filters',
      zeroResults: 'No results for [SEARCH_TERM]',
      manyResults: '[COUNT] results for [SEARCH_TERM]',
      oneResult: '[COUNT] result for [SEARCH_TERM]',
      altSearch: 'No results for [SEARCH_TERM]. Showing results for [DIFFERENT_TERM] instead',
      searchSuggestion: 'No results for [SEARCH_TERM]. Try one of the following searches:',
      searching: 'Searching for [SEARCH_TERM]…',
      close: 'Close search',
    },
    sidebarAria: 'Field Guide chapters',
    breadcrumbRoot: 'Field Guide',
    prev: '← prev',
    next: 'next →',
    tocHeading: 'The whole path',
    toc: { heading: 'On this page' },
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
      metaDesc: 'Engineering fundamentals — architectures, memory, RAG, protocols, tools, reasoning, training, multi-agent.',
      h1: 'Deep-Dives',
      tagline: 'Engineering fundamentals — architectures, memory, RAG, protocols, tools, reasoning, training, multi-agent.',
      emptyHtml: 'Deep-dive essays are coming soon — in the meantime, dive into the <a href="%FG%" style="color:var(--accent);">Field Guide</a>.',
    },
    playbooks: {
      metaTitle: 'Playbooks — Agentic AI Wiki',
      metaDesc: 'Applied recipes for building agents in specific domains and roles — coding, voice, customer support, research, and more.',
      h1: 'Playbooks',
      tagline: 'Applied recipes for building agents in specific domains and roles.',
      emptyHtml: 'Playbook essays are coming soon — in the meantime, dive into the <a href="%FG%" style="color:var(--accent);">Field Guide</a>.',
    },
    operations: {
      metaTitle: 'Operations — Agentic AI Wiki',
      metaDesc: 'How to run agents in production — evals, observability, cost, safety, governance.',
      h1: 'Operations',
      tagline: 'How to run agents in production — evals, observability, cost, safety, governance.',
      emptyHtml: 'Operations essays are coming soon — in the meantime, dive into the <a href="%FG%" style="color:var(--accent);">Field Guide</a>.',
    },
    blog: {
      metaTitle: 'AI Blog — Agentic AI Wiki',
      metaDesc:  'Long-form posts on the state of agentic AI — comparisons, architecture deep-dives, field notes.',
      h1: 'AI Blog',
      tagline: 'Long-form posts, comparisons, and field notes from the agentic frontier.',
      postedOn: 'Posted',
      byline: 'By',
      readingTime: 'min read',
      taggedWith: 'Tagged',
      latestPosts: 'Latest posts',
      allPosts: 'All posts',
      allTags: 'All tags',
      backToBlog: '← Back to AI Blog',
      defaultAuthor: 'Agentic AI Wiki',
      tagMetaTitle: 'Posts tagged [TAG] — AI Blog · Agentic AI Wiki',
      tagMetaDesc:  'Every AI Blog post tagged [TAG] — comparisons, deep-dives, and field notes.',
      onThisPage: 'On this page',
    },
    about: { kicker: 'About', h1: 'Agentic AI Wiki',
      metaDesc: 'What the Agentic AI Wiki is, what it covers, and who maintains it.',
      missionH: 'Mission',
      missionHtml: 'The Agentic AI Wiki is a living, open knowledge base for building agentic AI well. It favors durable understanding over hype — clear explanations, working mental models, and practitioner depth that stays useful as the field moves.',
      coveredH: "What's covered",
      coveredHtml: 'The <a href="%FG%" style="color:var(--accent);">Field Guide</a> is a hands-on, end-to-end engineering course for building and shipping agents. <a href="%CONCEPTS%" style="color:var(--accent);">Concepts</a> is a plain-language encyclopedia for newcomers and intermediates. <a href="%DEEP%" style="color:var(--accent);">Deep-Dives</a> are advanced essays on architectures, protocols, memory, and agentic security. Everything is bilingual (English / 中文).',
      maintainerH: 'Who maintains it',
      maintainerHtml: 'Built and maintained by <a href="https://www.linkedin.com/in/cqian06/" rel="noopener" style="color:var(--accent);">Chen Qian</a> as an independent, open project.',
      contactH: 'Contributing & contact',
      contactHtml: 'Corrections, suggestions, and new entries are welcome — open an issue or pull request on <a href="https://github.com/EvanCarson/Agentic-AI-Wiki/issues" rel="noopener" style="color:var(--accent);">GitHub</a>, or reach out via <a href="https://www.linkedin.com/in/cqian06/" rel="noopener" style="color:var(--accent);">LinkedIn</a>.' },
    changelog: { kicker: 'Changelog', metaTitle: 'Changelog — Agentic AI Wiki',
      metaDesc: 'What changed on the Agentic AI Wiki, newest first.',
      h1: 'Changelog',
      intro: 'Notable changes to this site — new sections, content, and improvements.' },
    og: { tagline: 'A living knowledge base on building agentic AI.' },
    theme: {
      ariaLight: 'Theme: Light. Click to cycle.',
      ariaDark:  'Theme: Dark. Click to cycle.',
      ariaAuto:  'Theme: Auto. Click to cycle.',
    },
    seriesTitle: 'The Agentic AI Field Guide',
  },
  zh: {
    brand: 'Agentic AI 维基',
    tagline: 'Agentic AI 维基 — 沉淀长期有效的知识。',
    nav: { fieldGuide: '实战指南', concepts: '概念', deepDives: '深度剖析', playbooks: '实战手册', operations: '运维', blog: 'AI 博客', changelog: '更新日志', about: '关于' },
    switcher: { en: 'EN', zh: '中文', aria: '语言' },
    search: {
      open: '搜索本维基',
      label: '搜索',
      placeholder: '搜索本维基…',
      clear: '清除',
      loadMore: '加载更多结果',
      searchLabel: '搜索',
      filtersLabel: '筛选',
      zeroResults: '没有找到与 [SEARCH_TERM] 相关的结果',
      manyResults: '找到 [COUNT] 条与 [SEARCH_TERM] 相关的结果',
      oneResult: '找到 [COUNT] 条与 [SEARCH_TERM] 相关的结果',
      altSearch: '没有找到与 [SEARCH_TERM] 相关的结果，改为显示 [DIFFERENT_TERM] 的结果',
      searchSuggestion: '没有找到与 [SEARCH_TERM] 相关的结果。可以试试以下搜索：',
      searching: '正在搜索 [SEARCH_TERM]…',
      close: '关闭搜索',
    },
    sidebarAria: '实战指南章节',
    breadcrumbRoot: '实战指南',
    prev: '← 上一章',
    next: '下一章 →',
    tocHeading: '完整路径',
    toc: { heading: '本页目录' },
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
      metaDesc: '工程基础 —— 架构、记忆、RAG、协议、工具、推理、训练、多智能体。',
      h1: '深度剖析',
      tagline: '工程基础 —— 架构、记忆、RAG、协议、工具、推理、训练、多智能体。',
      emptyHtml: '深度剖析文章即将上线 — 在此之前，先深入阅读 <a href="%FG%" style="color:var(--accent);">实战指南</a>。',
    },
    playbooks: {
      metaTitle: '实战手册 — Agentic AI 维基',
      metaDesc: '在具体领域与角色中构建智能体的应用蓝本——编码、语音、客服、研究等。',
      h1: '实战手册',
      tagline: '在具体领域与角色中构建智能体的应用蓝本。',
      emptyHtml: '实战手册文章即将上线 — 在此之前，先深入阅读 <a href="%FG%" style="color:var(--accent);">实战指南</a>。',
    },
    operations: {
      metaTitle: '运维 — Agentic AI 维基',
      metaDesc: '在生产环境中运行智能体——评测、可观测性、成本、安全与治理。',
      h1: '运维',
      tagline: '在生产环境中运行智能体——评测、可观测性、成本、安全与治理。',
      emptyHtml: '运维文章即将上线 — 在此之前，先深入阅读 <a href="%FG%" style="color:var(--accent);">实战指南</a>。',
    },
    blog: {
      metaTitle: 'AI 博客 — 智能体 AI 维基',
      metaDesc:  '关于智能体 AI 的长文：横向对比、架构详解、一线笔记。',
      h1: 'AI 博客',
      tagline: '关于智能体前沿的长文、对比与一线笔记。',
      postedOn: '发表于',
      byline: '作者',
      readingTime: '分钟读完',
      taggedWith: '标签',
      latestPosts: '最新文章',
      allPosts: '全部文章',
      allTags: '全部标签',
      backToBlog: '← 返回 AI 博客',
      defaultAuthor: '智能体 AI 维基',
      tagMetaTitle: '标签：[TAG] — AI 博客 · 智能体 AI 维基',
      tagMetaDesc:  '所有带 [TAG] 标签的 AI 博客文章——对比、详解与一线笔记。',
      onThisPage: '本页目录',
    },
    about: { kicker: '关于', h1: 'Agentic AI 维基',
      metaDesc: '关于 Agentic AI 维基：它是什么、涵盖什么，以及由谁维护。',
      missionH: '使命',
      missionHtml: 'Agentic AI 维基是一个持续更新、开放的知识库，专注于把 Agentic AI 构建好。它重视可沉淀的理解而非炒作 — 清晰的讲解、可用的心智模型，以及在领域演进中依然有效的实践深度。',
      coveredH: '涵盖内容',
      coveredHtml: '<a href="%FG%" style="color:var(--accent);">实战指南</a> 是端到端、动手构建并交付智能体的工程课程。<a href="%CONCEPTS%" style="color:var(--accent);">概念</a> 是面向新手与进阶者的白话百科。<a href="%DEEP%" style="color:var(--accent);">深度剖析</a> 是关于架构、协议、记忆与智能体安全的进阶文章。全部内容均为双语（English / 中文）。',
      maintainerH: '维护者',
      maintainerHtml: '由 <a href="https://www.linkedin.com/in/cqian06/" rel="noopener" style="color:var(--accent);">Chen Qian</a> 独立构建与维护的开放项目。',
      contactH: '贡献与联系',
      contactHtml: '欢迎纠错、建议与新增词条 — 在 <a href="https://github.com/EvanCarson/Agentic-AI-Wiki/issues" rel="noopener" style="color:var(--accent);">GitHub</a> 提交 issue 或 pull request，或通过 <a href="https://www.linkedin.com/in/cqian06/" rel="noopener" style="color:var(--accent);">LinkedIn</a> 联系。' },
    changelog: { kicker: '更新日志', metaTitle: '更新日志 — Agentic AI 维基',
      metaDesc: '本站的变更记录，按时间倒序。',
      h1: '更新日志',
      intro: '本站的重要变更 — 新板块、新内容与改进。' },
    og: { tagline: '持续更新的智能体 AI 知识库。' },
    theme: {
      ariaLight: '主题：浅色。点击切换。',
      ariaDark:  '主题：深色。点击切换。',
      ariaAuto:  '主题：跟随系统。点击切换。',
    },
    seriesTitle: 'Agentic AI 实战指南',
  },
};
