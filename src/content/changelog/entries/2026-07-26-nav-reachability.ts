import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-26',
  title: L(
    'The navigation menu is reachable again on phones, tablets and laptops',
    '手机、平板与笔记本上的导航菜单重新变得可用',
  ),
  items: [
    L(
      'The site menu now opens as a full-width panel below the header on any screen narrower than 1180px, with every destination on its own row. Since the header was rebuilt earlier today it had been a sideways-scrolling strip: on a phone, 40 pixels of it were on screen out of 747 — enough to show the four letters "FIEL" — and on a 1024px laptop the last two entries sat off the edge entirely. Keyboard users had it worst: tabbing to a link scrolled it only partly into view, so no link was ever fully readable while focused.',
      '在宽度小于 1180 像素的屏幕上，站点菜单现在会以整幅面板的形式在页面头部下方展开，每个入口独占一行。自今日早些时候页面头部重构以来，导航一直是一条可横向滑动的窄条：在手机上，747 像素的内容仅有 40 像素可见——刚好显示出「FIEL」四个字母；在 1024 像素的笔记本上，最后两个入口完全落在屏幕之外。键盘用户的处境最糟：用 Tab 键切换到某个链接时，它只能被部分滚入视野，聚焦状态下没有任何一个链接是完整可读的。',
    ),
    L(
      'The header stays a single 56-pixel row — the height reclaimed earlier today is not given back. The menu costs nothing when closed, and closes on Escape, on a click outside it, or when the window widens past the point where the full menu fits again.',
      '页面头部仍保持 56 像素单行高度——今日早些时候为正文腾出的屏幕空间不会被重新占用。菜单收起时不占任何高度，并可通过 Esc 键、点击菜单外区域，或将窗口拉宽至完整菜单可容纳时自动关闭。',
    ),
    L(
      'The footer becomes real navigation: all eight sections, the changelog, the about page and the privacy policy, in three columns, plus the language switch. It was previously a single line of text with no links at all — a dead end for anyone who reached the bottom of a long page. The privacy policy existed in both languages and had nothing linking to it.',
      '页脚现在承担起真正的导航职能：八个内容板块、更新日志、关于页面与隐私政策分三栏排列，并附带语言切换。此前页脚只是一行没有任何链接的文字——对于读到长页面底部的人来说是一条死路。而隐私政策页面中英文版本一直存在，却没有任何入口指向它。',
    ),
    L(
      'The wordmark now shows a proper focus outline. It is the first thing the Tab key reaches on every page and was the only control still using the browser default, which is close to invisible in dark mode. The menu, search, theme and language controls also now fade on hover like every other control on the site, instead of snapping.',
      '站点标识现在具有清晰的聚焦轮廓。它是每个页面中 Tab 键首先到达的元素，却是唯一仍在使用浏览器默认样式的控件，而该样式在深色模式下几乎不可见。菜单、搜索、主题与语言控件的悬停效果现在也带有渐变过渡，与站内其他控件保持一致，不再生硬跳变。',
    ),
    L(
      'The search dialog\'s close button no longer sits on top of the language switcher — it is now pinned to the dialog itself rather than to the corner of the window.',
      '搜索对话框的关闭按钮不再压在语言切换控件上——它现在固定于对话框自身，而不是窗口角落。',
    ),
    L(
      'Animations across the site now respect the "reduce motion" setting. Previously only one button did.',
      '站内动效现已全面遵循系统的「减弱动态效果」设置。此前仅有一个按钮做到了这一点。',
    ),
    L(
      'The design guard gained the check whose absence allowed this: every menu entry must be fully on screen, or a menu button must exist that puts it there — verified at five widths in both languages. A narrow-phone (375px) overflow check was added alongside it.',
      '设计检查新增了此前缺失、并因而放任该问题上线的那一项：每个菜单入口都必须完整显示在屏幕内，或必须存在一个能将其展开的菜单按钮——该检查覆盖五种宽度、两种语言。同时新增了窄屏手机（375 像素）的横向溢出检查。',
    ),
  ],
};
export default entry;
