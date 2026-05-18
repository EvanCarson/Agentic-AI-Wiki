// Curated, bilingual site changelog. Newest entry first.
// One page renders this list (no per-entry routes) — see ChangelogView.astro.
import type { Localized } from '../i18n/index';

export interface ChangelogEntry {
  /** ISO date, YYYY-MM-DD */
  date: string;
  title: Localized;
  /** Bullet points describing what changed. */
  items: Localized[];
}

const L = (en: string, zh: string): Localized => ({ en, zh });

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: '2026-05-18',
    title: L('RAG coverage expansion', '扩充 RAG 相关内容'),
    items: [
      L('New advanced Deep-Dives: Advanced RAG Architectures, GraphRAG & Multi-Hop Retrieval, and RAG Pipeline Security — under a new "Retrieval & RAG" group.',
        '新增进阶「深度剖析」：进阶 RAG 架构、GraphRAG 与多跳检索、RAG 管道安全 — 归入新的「检索与 RAG」分组。'),
      L('Refreshed the Concepts "what is RAG" entry to the current long-context-vs-RAG routing consensus.',
        '更新「概念」中的「什么是 RAG」词条，采用当前关于长上下文与 RAG 路由取舍的共识。'),
      L('Field Guide updates: RAGAS evaluation vocabulary in the eval chapter; parent-document and late chunking in the retrieval chapter.',
        '实战指南更新：评估章节加入 RAGAS 评测术语；检索章节加入父文档与延迟分块。'),
    ],
  },
  {
    date: '2026-05-18',
    title: L('About page & Changelog', '关于页面与更新日志'),
    items: [
      L('Expanded About into a multi-section bilingual page: mission, what\'s covered, who maintains it, and contributing & contact.',
        '将「关于」扩展为多板块双语页面：使命、涵盖内容、维护者，以及贡献与联系方式。'),
      L('Introduced this Changelog, replacing the unused Posts section; the home page now links the latest entries.',
        '引入本「更新日志」，替换未使用的「文章」板块；首页现在链接到最新条目。'),
    ],
  },
  {
    date: '2026-05-18',
    title: L('Concepts & Deep-Dives sections', '新增「概念」与「深度剖析」板块'),
    items: [
      L('Added the Concepts encyclopedia — 33 bilingual entries from AI foundations to the agent loop.',
        '新增「概念」百科 — 33 篇双语词条，涵盖从 AI 基础到智能体主循环。'),
      L('Added Deep-Dives — 30 advanced bilingual essays on architectures, protocols (MCP/A2A), memory, and agentic security.',
        '新增「深度剖析」— 30 篇进阶双语文章，涉及架构、协议（MCP/A2A）、记忆与智能体安全。'),
      L('Accessibility & SEO pass: skip link, WCAG-AA contrast, responsive header, structured data, sitemap.',
        '可访问性与 SEO 优化：跳转链接、WCAG-AA 对比度、响应式页头、结构化数据、站点地图。'),
      L('Surfaced the new sections as cards on the home page.',
        '在首页以卡片形式呈现新板块。'),
      L('Replaced the unused Posts section with this Changelog.',
        '以本「更新日志」替换了未使用的「文章」板块。'),
    ],
  },
  {
    date: '2026-05-17',
    title: L('Chinese (中文) localization', '中文本地化'),
    items: [
      L('Full bilingual site: every page and all Field Guide chapters available in English and Chinese.',
        '全站双语：所有页面与实战指南章节均提供中英文版本。'),
      L('Language switcher and localized navigation, metadata, and sitemap.',
        '语言切换器，以及本地化的导航、元数据与站点地图。'),
    ],
  },
  {
    date: '2026-05-16',
    title: L('Initial launch', '首次发布'),
    items: [
      L('Launched the Agentic AI Wiki with the flagship Agentic AI Field Guide (22 chapters across 6 parts).',
        '上线 Agentic AI 维基，发布旗舰系列《Agentic AI 实战指南》（6 部分共 22 章）。'),
    ],
  },
];
