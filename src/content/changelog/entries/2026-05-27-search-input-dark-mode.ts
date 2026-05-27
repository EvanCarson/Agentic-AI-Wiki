import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-27',
  title: L(
    'Search modal: dark-mode legibility + visual polish',
    '搜索面板：深色模式可读性修复与视觉打磨',
  ),
  items: [
    L(
      'Fixed invisible search input text in dark mode — the override pinned background but not color, so the typed query rendered in the user-agent default near-black on the dark background (#69).',
      '修复深色模式下搜索框输入文字不可见的问题——原样式只覆盖了背景色而未设置文字颜色，导致输入以浏览器默认的近黑色显示在深色背景上 (#69)。',
    ),
    L(
      'Replaced the user-agent button/fieldset chrome around the Clear button and Section filter with the site\'s own monospace small-caps language, dropping the heavy 2px groove fieldset border and 2px outset button border.',
      '将「Clear」按钮和「Section」筛选区原本的浏览器默认样式（2px groove 边框、2px outset 按钮边框）替换为站点统一的等宽小写字母排版语言。',
    ),
    L(
      'Swapped the input\'s default blue focus outline for an accent-colored ring, and routed the "Section" label through JetBrains Mono uppercase to match other section labels on the site.',
      '将输入框默认的蓝色聚焦轮廓替换为强调色描边；「Section」标签改用 JetBrains Mono 大写排版，与站点其它分区标签风格一致。',
    ),
  ],
};
export default entry;
