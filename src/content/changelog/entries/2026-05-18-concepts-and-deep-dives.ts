import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
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
};
export default entry;
