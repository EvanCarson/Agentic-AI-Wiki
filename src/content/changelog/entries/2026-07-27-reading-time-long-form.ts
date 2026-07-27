import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-27',
  title: L(
    'Field Guide chapters and essays now tell you how long they are',
    '实战指南章节与深度文章现在会标明篇幅',
  ),
  items: [
    L(
      'Every Field Guide chapter and every Deep-Dive, Playbook and Operations essay now shows an estimated reading time under the breadcrumb. One chapter runs to roughly 7,000 words with nothing on the page to warn you — while the blog, the shortest of the four sections, has shown a reading time all along.',
      '每一章《实战指南》，以及「深度剖析」「实战手册」「运维」中的每篇文章，现在都会在面包屑导航下方显示预计阅读时长。此前有的章节篇幅接近 7000 词，页面上却毫无提示——而四个板块中篇幅最短的博客，反倒一直标注着阅读时长。',
    ),
    L(
      'Code blocks are excluded from the estimate. Readers skim code rather than reading it word by word, and counting it would have overstated the length of every engineering-heavy page. Chinese pages are measured by character count, which is the correct unit.',
      '估算时不计入代码块。读者对代码是快速扫读而非逐字阅读，若计入会高估每个代码密集页面的篇幅。中文页面按字数计量，这才是正确的计量单位。',
    ),
    L(
      'Concepts entries deliberately do not show one — that section is a glossary of short entries, where a reading time on every one of them would be noise rather than information.',
      '「概念」板块的条目有意不显示阅读时长——该板块是由短条目构成的术语表，逐条标注反而是干扰而非信息。',
    ),
  ],
};
export default entry;
