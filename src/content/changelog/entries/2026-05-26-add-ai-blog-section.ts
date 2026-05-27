import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-26',
  title: L(
    'Introducing AI Blog — and an open-source agent shootout',
    '上线 AI 博客 —— 开源智能体三方对比',
  ),
  items: [
    L(
      'New top-level "AI Blog" section: chronological feed, tag pages, bilingual en/zh mirror, RSS-ready post manifest.',
      '新增顶级板块 "AI 博客"：按时间倒序排列、支持标签页、中英双语镜像，文章清单结构便于后续接入 RSS。',
    ),
    L(
      'First post: OpenClaw vs OpenHuman vs Hermes Agent — three architecture deep-dives, five cross-cutting comparisons, eight architecture diagrams plus a GitHub-stars bar chart and a feature-strength matrix (~5,800 en words / matching zh translation).',
      '首篇：OpenClaw vs OpenHuman vs Hermes Agent —— 三段架构详解、五项横向对比，配八张架构图、GitHub Star 数柱状图和特性强度矩阵（约 5,800 英文词 / 同等中文译文）。',
    ),
    L(
      'BlogLayout uses the site\'s chapter-shell pattern with a sticky left-rail in-page TOC (auto-built from the post\'s h2/h3, scroll-spy highlights the active section). Article column ~760px, body type in Source Serif 4 for comfortable long-form reading.',
      'BlogLayout 采用站点标准章节外壳，左侧固定页内目录（由文章 h2/h3 自动构建，滚动时高亮当前小节）。正文栏约 760px，正文采用 Source Serif 4 以适合长文阅读。',
    ),
    L(
      'New project-wide rule in CLAUDE.md: every doc opens with a hook lede (no "TL;DR" labels). Banned the common throat-clearing opener patterns ("In this post we\'ll…", "AI agents are everywhere…").',
      'CLAUDE.md 新增全站规则：每篇文档以钩子引言开篇（禁用 "TL;DR" 类标签）。同时禁止常见的清嗓套话开头（"在这篇文章中我们……"、"智能体随处可见……"）。',
    ),
    L(
      'BlogPosting + FAQPage JSON-LD emitted on detail pages (FAQ schema auto-built by parsing <section class="faq"> for h3/p pairs). hreflang alternates, sitemap, Pagefind, and OG cards all extended to cover the new section.',
      '详情页输出 BlogPosting 与 FAQPage 的 JSON-LD（FAQ schema 自动解析 <section class="faq"> 中的 h3/p 配对）。hreflang 备用语言、站点地图、Pagefind 搜索与 OG 卡片同步覆盖新板块。',
    ),
    L(
      'New blog manifest test (scripts/__tests__/blogs.test.mjs) enforces filename date prefix equals post.date, slug uniqueness, bilingual fragment existence, and lowercase-kebab-case tag shape.',
      '新增博客清单测试（scripts/__tests__/blogs.test.mjs），强制要求文件名日期前缀等于 post.date、slug 全局唯一、中英文片段同时存在、标签为小写连字符格式。',
    ),
  ],
};

export default entry;
