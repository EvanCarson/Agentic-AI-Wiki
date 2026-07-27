import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-26',
  title: L(
    'Fixed: in dark mode, the "what you walk away with" box had no visible edges',
    '修复：深色模式下，「本章收获」板块看不见边界',
  ),
  items: [
    L(
      'In dark mode the deliverable box that closes each Field Guide chapter, and the "start here" reading-path box on the Concepts and Deep-Dives index pages, were being painted very slightly darker than the page behind them — a difference of about 5%, which on most screens is no difference at all. Both boxes are told apart from ordinary callouts by their background alone, so with the background gone they read as loose text rather than as a bounded block. Both now sit slightly raised above the page and carry a visible edge.',
      '深色模式下，每章末尾的「本章收获」板块，以及「概念」与「深入解析」索引页上的「从这里开始」阅读路径板块，其背景色比页面底色仅深约 5%——在大多数屏幕上等于毫无差别。这两个板块本就只靠背景色与普通提示框区分，背景一旦「消失」，看上去就成了一段散落的文字，而不是一个有边界的模块。现在两者都略高于页面底色，并带有清晰可见的边框。',
    ),
    L(
      'The same fix reaches the previous/next chapter buttons, the threat-table header row, and the keyboard skip link, which all draw on that shared surface.',
      '同一处修复也覆盖了上一章／下一章按钮、威胁对照表的表头行，以及键盘跳转链接——它们都取自同一套表面色。',
    ),
    L(
      'Card outlines in light mode were faint enough to read as ghost outlines against the page; they are now a touch stronger, closer to how they already looked in dark mode.',
      '浅色模式下的卡片描边此前过淡，几乎与页面融为一体；现在略微加深，与深色模式下的观感更接近。',
    ),
    L(
      'The design guard grew a non-text contrast check. Every check it ran before this one looked at text, which is why this defect passed unnoticed — the text on those boxes was always fine; it was the box that was missing. The new check holds any block whose identity depends on its surface to the WCAG 3:1 non-text standard, in both themes, and ships with a fixture proving it can actually fail.',
      '设计检查新增了一项「非文字对比度」校验。此前所有校验针对的都是文字，这也正是该缺陷得以蒙混过关的原因——那些板块上的文字一直没问题，出问题的是板块本身。新校验会对「靠表面色确立自身身份」的模块执行 WCAG 3:1 非文字对比度标准（浅色与深色模式均需通过），并附带一个用于证明该校验确实会失败的测试样例。',
    ),
  ],
};
export default entry;
