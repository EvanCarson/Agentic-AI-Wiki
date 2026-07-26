import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-26',
  title: L(
    'Design: a cooler, lighter visual system — the mobile header gives back a fifth of the screen',
    '设计升级：更清爽的冷色调视觉系统——移动端头部为正文让出近五分之一的屏幕',
  ),
  items: [
    L(
      "The mobile header shrinks from 155–173px, wrapped across 3–4 rows, to a single 56px row that scrolls sideways — roughly a fifth of a phone screen handed back to actual content on every page. A related tablet-only bug is also fixed: between 641–1063px wide (iPad included), the whole page used to scroll sideways along with the header; now only the header's own nav strip does.",
      '移动端页面头部从 155–173 像素、拆成 3–4 行换行显示，收窄为单行 56 像素、可横向滑动——相当于把近五分之一的手机屏幕还给了每一页的正文内容。同时修复了一个只在平板宽度出现的连带问题：641–1063 像素（含 iPad）区间内，此前整个页面会跟着头部一起横向滚动，现在只有头部导航条本身可以滑动。',
    ),
    L(
      'Headings now set in Space Grotesk instead of Fraunces; body copy stays Inter, code stays JetBrains Mono. Space Grotesk has no italic cut, so Inter\'s real italic weight is now loaded too — italic display text, like the numerals that open each chapter, is drawn from true italic glyphs instead of a browser-faked slant.',
      '标题字体由 Fraunces 换成 Space Grotesk；正文仍用 Inter，代码仍用 JetBrains Mono。由于 Space Grotesk 没有斜体字重，我们同时加载了 Inter 真正的斜体——展示型斜体文字（例如每章开头的编号）现在使用真实斜体字形，而不是由浏览器机械倾斜伪造出来的斜体。',
    ),
    L(
      'A new, cooler near-white color palette sits on a consolidated design-token layer: a 10-step type scale replaces 24 one-off font sizes, and a 10-step spacing scale replaces 29 one-off values. Three dedicated accent colors — for headings, small text, and dark panels — replace a single accent that was being reused everywhere it didn\'t quite fit; every text-on-background pairing site-wide has been checked against WCAG AA contrast.',
      '全新的冷色调、近白色配色方案建立在统一的设计 token 之上：10 档字号体系替换了此前 24 个零散字号，10 档间距体系替换了此前 29 个零散数值。标题、小号文字、深色面板分别配有专属强调色，取代了此前那个被到处挪用、却总差点意思的单一强调色；站内所有文字与背景的配色组合都已通过 WCAG AA 对比度校验。',
    ),
    L(
      "The four annotation blocks — callouts, warning callouts, \"observe\" notes, and deliverable boxes — were re-cut so each is recognizable at a glance while skimming, not just by a color that's easy to miss out of the corner of your eye.",
      '提示框、警告框、「观察」批注、交付物框这四种批注模块经过重新设计，浏览时一眼就能分辨彼此，不再只靠余光容易忽略的颜色区分。',
    ),
    L(
      'Code syntax highlighting was retuned for the new palette. All seven highlight colors — keywords, strings, comments, function names, output, errors, and warnings — are now driven by design tokens and individually contrast-checked, catching one color that had quietly fallen below the accessibility floor.',
      '代码高亮配色针对新配色系统重新调校。全部七种高亮颜色——关键字、字符串、注释、函数名、输出、错误、警告——现在统一由设计 token 驱动并逐一校验对比度，揪出了其中一种此前已悄然跌破无障碍标准的颜色。',
    ),
    L(
      'Chinese pages now carry a system CJK font fallback on every font token, so headings and body text no longer switch typeface mid-line where English and Chinese characters mix.',
      '中文页面的每一个字体 token 现在都带有系统中文字体兜底，标题与正文在中英文混排时不再于同一行内突然切换字体。',
    ),
    L(
      'Added a permanent guard, `npm run test:design`, that opens the built site in a real browser and checks contrast, paragraph reading width, header height, tap-target size, horizontal overflow, and syntax-highlight colors — 12 checks, all green — so this system has a test suite standing between it and a quiet regression.',
      '新增了一道常驻检查 `npm run test:design`：在真实浏览器中打开构建后的站点，核查对比度、段落行长、头部高度、可点击区域大小、横向溢出与代码高亮配色——12 项检查全部通过——为这套设计系统建立起一道防止悄然退化的测试屏障。',
    ),
  ],
};
export default entry;
