import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-22',
  title: L(
    'Introducing AI Blog — and an open-source agent shootout',
    '上线 AI 博客 —— 开源智能体三方对比',
  ),
  items: [
    L(
      'New top-level "AI Blog" section with a chronological feed, tag pages, and a bilingual mirror.',
      '新增顶级板块 "AI 博客"：按时间倒序排列，支持标签页与中英双语镜像。',
    ),
    L(
      'First post: OpenClaw vs OpenHuman vs Hermes Agent — three architecture deep-dives plus five cross-cutting comparisons, eight diagrams in total.',
      '首篇：OpenClaw vs OpenHuman vs Hermes Agent —— 三段架构详解、五个横向对比，配八张示意图。',
    ),
    L(
      'New project-wide rule in CLAUDE.md: every doc opens with a hook lede (no "TL;DR" labels).',
      'CLAUDE.md 新增全站规则：每篇文档以钩子引言开篇（禁用 "TL;DR" 类标签）。',
    ),
    L(
      'Pagefind, sitemap, OG cards, and verify scripts all extended to cover the new section.',
      'Pagefind、站点地图、OG 卡片与校验脚本同步覆盖新板块。',
    ),
  ],
};

export default entry;
