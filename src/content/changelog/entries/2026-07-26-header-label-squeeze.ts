import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-26',
  title: L(
    'Fixed: header labels were being squashed onto two lines on phones',
    '修复：手机上页头标签被挤成两行',
  ),
  items: [
    L(
      'When the header nav was changed to scroll rather than wrap, the links kept the browser default that lets a flex item shrink — so instead of holding their natural width and letting the bar scroll, they compressed and broke their own labels onto two lines. The wordmark did the same. Both now hold their width, and the nav scrolls as intended.',
      '页头导航改为横向滚动而非换行后，链接仍保留了"允许弹性项被压缩"的浏览器默认行为——于是它们没有保持自身宽度、让导航条滚动，而是被压扁、把自己的标签折成了两行。站点名同样如此。现在两者都会保持宽度，导航条也按预期滚动。',
    ),
    L(
      'The existing checks could not catch this: the header stayed 56px tall and its links stayed on a single row, because the wrapping happened inside each item rather than to the bar itself. A new check now compares every header label against the width its text actually needs, and it was confirmed to fail against the broken layout before being confirmed to pass against the fix.',
      '既有检查抓不到这个问题：页头依旧是 56px 高，链接也依旧排在一行内，因为折行发生在每个条目"内部"，而非整条导航条上。现已新增一项检查，把每个页头标签与其文字实际所需的宽度作比较；该检查先被确认能在坏版面上失败，然后才被确认能在修复后通过。',
    ),
  ],
};
export default entry;
