import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-22',
  title: L(
    'Site enhancements: OG cards, dark mode, in-page TOC, search filters',
    '站点优化：OG 卡片、深色模式、本页目录、搜索筛选',
  ),
  items: [
    L(
      'Every page now ships an og:image and twitter:image. Each top-level section (Field Guide, Concepts, Deep-Dives, Playbooks, Operations, Changelog) has its own bilingual 1200×630 card.',
      '每个页面现在都会输出 og:image 与 twitter:image。每个顶级版块（实战指南、概念、深度剖析、实战手册、运维、更新日志）都有自己的双语 1200×630 卡片。',
    ),
    L(
      'Twitter card upgraded from `summary` to `summary_large_image`.',
      'Twitter 卡片从 `summary` 升级为 `summary_large_image`。',
    ),
    L(
      'Canonical site URL switched from agentic-ai-wiki.vercel.app to menuagentic.com — also fixes og:url, sitemap, and hreflang.',
      '站点规范网址已从 agentic-ai-wiki.vercel.app 切换为 menuagentic.com — 同时修复了 og:url、sitemap 与 hreflang。',
    ),
    L(
      'New `npm run og:build` regenerates all 14 PNGs from a single template via Satori + resvg-js. Adding a new section is a one-line change in src/content/og.ts.',
      '新增 `npm run og:build`，通过 Satori + resvg-js 从单一模板重新生成全部 14 张 PNG。新增版块只需在 src/content/og.ts 中加一行。',
    ),
    L(
      'Dark mode: a three-state toggle (light / dark / auto) in the header. Defaults to your OS preference; click cycles through. True-black palette (#000 background) on OLED-friendly displays.',
      '深色模式：标题栏新增三态切换（浅色 / 深色 / 跟随系统）。默认跟随系统偏好，点击循环切换。纯黑配色（#000 背景），对 OLED 屏更友好。',
    ),
    L(
      'Theme choice persists in localStorage and survives EN ↔ 中文 switches. No flash of wrong theme on reload (inline pre-paint guard).',
      '主题选择存于 localStorage，并在中英文切换间保持不变。重新加载时不会出现错误主题闪烁（采用首屏前置内联守卫）。',
    ),
    L(
      'Search results can be filtered by section (Field Guide / Concepts / Deep-Dives / Playbooks / Operations / Changelog) via Pagefind filters added to detail pages.',
      '搜索结果现可按板块（实战指南 / 概念 / 深度剖析 / 实战手册 / 运维 / 更新日志）筛选 —— 详情页已加入 Pagefind 过滤标记。',
    ),
    L(
      'In-page "On this page" TOC on long-form entries — Field Guide chapters, Concepts, Deep-Dives, Playbooks, and Operations. Scroll-spies the active heading; hides automatically when fewer than 3 headings exist.',
      '长篇正文页面新增「本页目录」侧栏 —— 涵盖实战指南章节、概念、深度剖析、实战手册与运维。滚动时高亮当前小节；标题数少于 3 个时自动隐藏。',
    ),
  ],
};
export default entry;
