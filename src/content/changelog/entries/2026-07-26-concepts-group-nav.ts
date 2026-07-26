import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-26',
  title: L(
    'Concepts index: jump straight to a group',
    '概念索引：直接跳转到某个分组',
  ),
  items: [
    L(
      'The Concepts index lists all 50 entries on one page, which is deliberate — it reads as an encyclopedia, and the "new here?" reading path above it assumes you can see the whole thing. But at roughly nine phone-screens there was no way to reach a group without scrolling past everything before it. A navigator now sits above the list with the four groups and their entry counts, so any group is one tap away.',
      '概念索引把全部 50 条列在同一页上，这是有意为之——它读起来像一部百科，而上方的"新手入门"阅读路径也假定你能看到全貌。但在手机上足有约九屏，想到达某个分组，只能先滚过它前面的所有内容。现在列表上方新增了一个导航条，列出四个分组及各自条目数，任何一个分组都只需轻点一次即可抵达。',
    ),
    L(
      'Deliberately not sticky. The site header is already pinned to the top, and the recent redesign just reclaimed about a fifth of the phone screen — spending it again on a second permanent bar would undo that. The navigator’s job is orientation when you arrive, which it does from the top of the page.',
      '刻意没有做成吸顶。站点页头本就固定在顶部，而最近的改版刚刚为手机屏幕腾出约五分之一的空间——再拿它去挂第二条常驻横条，等于把成果又还回去。这个导航条的职责是"抵达时的定位"，在页面顶部即可完成。',
    ),
    L(
      'Jump targets clear the sticky header rather than landing underneath it, and on Chinese pages the anchors are de-duplicated — several group names reduce to the same slug, which would otherwise have left one group unreachable.',
      '跳转目标会避开固定页头，而不是落到它下面；中文页面的锚点还做了去重——有几个分组名会缩略成相同的 slug，否则其中一个分组将永远无法抵达。',
    ),
  ],
};
export default entry;
