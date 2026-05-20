import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-20',
  title: L(
    'Copy buttons on every code block',
    '每个代码块新增「复制」按钮',
  ),
  items: [
    L(
      'Every standalone code block now has a clipboard copy button with bilingual aria-label.',
      '所有独立代码块现在都带有剪贴板复制按钮，aria-label 双语支持。',
    ),
    L(
      'Authors can opt into a top-left language badge by adding data-lang="python" (or similar) to the <pre> tag.',
      '作者可通过在 <pre> 标签上添加 data-lang="python"（或类似值）启用左上角语言徽章。',
    ),
    L(
      'Respects prefers-reduced-motion; copy/badge are excluded from search.',
      '尊重 prefers-reduced-motion 设置；复制按钮与徽章已排除于搜索索引之外。',
    ),
  ],
};
export default entry;
