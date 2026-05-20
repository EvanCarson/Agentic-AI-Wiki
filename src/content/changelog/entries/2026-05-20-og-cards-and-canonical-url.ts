import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-20',
  title: L(
    'Social-share OG cards + canonical URL fix',
    '社交分享 OG 卡片 + 规范网址修复',
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
  ],
};
export default entry;
