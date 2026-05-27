import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-27',
  title: L(
    'Search modal: dark-mode legibility + visual polish + scroll fix',
    '搜索面板：深色模式可读性、视觉打磨与滚动修复',
  ),
  items: [
    L(
      'Fixed invisible search input text in dark mode — the override pinned background but not color, so the typed query rendered in the user-agent default near-black on the dark background (#69).',
      '修复深色模式下搜索框输入文字不可见的问题——原样式只覆盖了背景色而未设置文字颜色，导致输入以浏览器默认的近黑色显示在深色背景上 (#69)。',
    ),
    L(
      'Replaced the user-agent button/fieldset chrome around the Clear button and Section filter with the site\'s own monospace small-caps language, and resized the Clear button from a full-height boxy rectangle to a small pill centered inside the input.',
      '将「Clear」按钮和「Section」筛选区原本的浏览器默认样式替换为站点统一的等宽小写字母排版语言；「Clear」按钮从原本占满输入框高度的方块缩为输入框内居中的小药丸。',
    ),
    L(
      'Swapped the input\'s default blue focus outline for an accent-colored ring, and routed the "Section" label through JetBrains Mono uppercase to match other section labels on the site.',
      '将输入框默认的蓝色聚焦轮廓替换为强调色描边；「Section」标签改用 JetBrains Mono 大写排版，与站点其它分区标签风格一致。',
    ),
    L(
      'Fixed: the modal could not be scrolled after "Load more results" — body scroll is locked while the modal is open, but the modal itself had no overflow. Added overflow-y: auto on the modal so the growing results list scrolls, and pinned the ✕ close button to the viewport so it stays reachable.',
      '修复：点击「加载更多结果」后无法滚动——打开搜索面板时正文滚动被锁定，但面板本身没有设置滚动溢出。现在为面板加上 overflow-y: auto，结果增多时可正常滚动；同时将关闭按钮 ✕ 固定在视口右上角，滚动后仍可点击。',
    ),
  ],
};
export default entry;
