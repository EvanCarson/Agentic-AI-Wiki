import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-27',
  title: L(
    'Hover and focus effects now behave consistently across the whole site',
    '全站的悬停与聚焦效果现在表现一致',
  ),
  items: [
    L(
      'Every hover and focus effect on the site now uses the same two speeds and the same easing curve. Previously there were 28 separately written effects at two slightly different speeds, some eased and some not, so the same gesture felt subtly different depending on which control you were pointing at. Nothing moves faster or slower than before — they simply agree with each other now.',
      '站内所有悬停与聚焦效果现在统一使用相同的两档速度与同一条缓动曲线。此前站内有 28 处各自独立编写的效果，速度分为两档且略有差异，有的带缓动、有的没有，导致同样的操作在不同控件上手感微妙地不一致。整体快慢与此前相同——只是它们之间不再各行其是。',
    ),
    L(
      'Two controls — the sub-navigation links and the code-sample tabs — were set to animate every property they have, rather than the two or three that actually change. That is invisible today but means any future change to their size or spacing would have silently turned into a sliding animation. They now name what they animate.',
      '有两个控件——子导航链接与代码示例选项卡——此前被设置为对其所有属性做动画，而不是仅针对真正会变化的那两三个属性。这在当下并不可见，但意味着日后任何对其尺寸或间距的调整都会悄然变成一段滑动动画。现在它们已明确指定要过渡的属性。',
    ),
    L(
      'Corner rounding is now drawn from a fixed set of values. There were eight different corner radii in use across the site, in a design otherwise built entirely from straight one-pixel rules.',
      '圆角半径现在取自一组固定数值。此前站内共使用了八种不同的圆角半径，而这套设计的其余部分完全由一像素直线构成。',
    ),
    L(
      'A check now runs on every build to keep these from drifting apart again — the same kind of guard already protecting the site\'s type sizes, spacing and font weights.',
      '每次构建现在都会运行一项检查，防止这些数值再次各自漂移——这与已在保护站点字号、间距与字重的检查属于同一类。',
    ),
  ],
};
export default entry;
