import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-27',
  title: L(
    'Reading-path callout extended to Playbooks and Operations',
    '阅读路径提示扩展至「实战手册」与「运维」',
  ),
  items: [
    L(
      'Playbooks and Operations indexes now show the same one-line "New here? Start with Concepts →" redirect that already appears on Deep-Dives, with section-appropriate phrasing — so newcomers landing on applied or production content get pointed at the foundations first.',
      '「实战手册」与「运维」首页现在沿用与「深度剖析」一致的一行「新手入门？先看概念 →」重定向，并按板块各自措辞——让初次进入应用或生产板块的读者先被引向基础内容。',
    ),
    L(
      'Component now accepts mode: \'concepts\' | \'deepDives\' | \'playbooks\' | \'operations\'. The three one-liner modes share rendering and only differ in copy (sourced from each section\'s readingPath block in src/i18n/ui.ts).',
      '组件 mode 取值扩展为 \'concepts\' | \'deepDives\' | \'playbooks\' | \'operations\'。三种单行模式共用渲染，差异只在文案（取自 src/i18n/ui.ts 中各板块的 readingPath）。',
    ),
  ],
};
export default entry;
