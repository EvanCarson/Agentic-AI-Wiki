import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-26',
  title: L(
    'Fixed: 17 style rules asked for font weights the site does not load',
    '修复：17 条样式规则请求了站点并未加载的字重',
  ),
  items: [
    L(
      'The redesign replaced the old display typeface, which was loaded at three lighter weights, with one loaded at three heavier ones — but the weight values in the stylesheets were never revisited, because the conversion covered size, line-height and family only. Seventeen rules ended up requesting a weight that does not exist, including every major heading. Nothing looked broken: browsers quietly substitute the nearest available weight. But the stylesheet and the shipped page disagreed, and removing a weight from the font request would have shifted headings site-wide with no warning. Each rule now states the weight it actually renders at.',
      '本次改版把旧的展示字体（加载了三档较细的字重）换成了新字体（加载三档较粗的字重），但样式表里的字重数值一直没被复核——因为那轮转换只覆盖了字号、行高与字体族。结果有 17 条规则请求了并不存在的字重，其中包括所有主要标题。表面上看不出问题：浏览器会默默替换成最接近的可用字重。但样式表与实际页面已经对不上，而一旦从字体请求中移除某档字重，全站标题就会毫无预警地改变粗细。现在每条规则都写明它实际渲染时使用的字重。',
    ),
    L(
      'Added a check that every declared font weight is actually loaded for its typeface, so this cannot drift again unnoticed. It was confirmed to fail against the old rules before being confirmed to pass against the corrected ones — and while writing it, it caught a bug in itself that would have let one whole typeface go unchecked.',
      '新增一项检查：每个声明的字重都必须确实为其字体加载过，避免此类偏移再次悄悄发生。该检查先被确认能在旧规则上失败，然后才被确认能在修正后的规则上通过；而且在编写过程中，它还查出了自身的一个缺陷——那个缺陷本会让整整一款字体完全不被检查到。',
    ),
  ],
};
export default entry;
