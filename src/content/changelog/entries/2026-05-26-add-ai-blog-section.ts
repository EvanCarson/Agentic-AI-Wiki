import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-26',
  title: L(
    'Introducing AI Blog — and an open-source agent shootout',
    '上线 AI 博客 —— 开源智能体三方对比',
  ),
  items: [
    L(
      'New top-level "AI Blog" section — long-form posts, comparisons, and field notes, with chronological feed, tag pages, and a bilingual en/zh mirror.',
      '新增顶级板块 "AI 博客"——长文、横向对比与一线笔记，按时间倒序排列、支持标签页、中英双语镜像。',
    ),
    L(
      'First post: OpenClaw vs OpenHuman vs Hermes Agent — three architecture deep-dives, five cross-cutting comparisons, ten diagrams. Same post in English and Chinese.',
      '首篇：OpenClaw vs OpenHuman vs Hermes Agent —— 三段架构详解、五项横向对比、十张示意图，中英双语同步发布。',
    ),
  ],
};

export default entry;
