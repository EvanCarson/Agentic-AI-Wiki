import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-27',
  title: L(
    'Fix: search input text invisible in dark mode',
    '修复：深色模式下搜索框输入文字不可见',
  ),
  items: [
    L(
      'The site-search input was overriding background but not color, so the typed query rendered in the user-agent default (near-black) on a dark background and was unreadable.',
      '站内搜索框只覆盖了背景色而未覆盖文字颜色，导致用户输入在深色背景上以浏览器默认的近黑色渲染，几乎无法看清。',
    ),
    L(
      'Pinned input color to --ink so the query stays legible in both light and dark themes (#69).',
      '将输入框文字颜色显式设置为 --ink，使搜索词在浅色与深色主题下都能清晰可见 (#69)。',
    ),
  ],
};
export default entry;
