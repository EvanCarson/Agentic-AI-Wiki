import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-25',
  title: L(
    'Design: AA contrast for every accent label, a readable blog measure, and a scroll hint on wide tables',
    '设计：所有强调色标签达到 AA 对比度、博客行长收敛到可读区间、宽表格加上滚动提示',
  ),
  items: [
    L(
      'Accessibility: small accent-coloured text (STEP labels, kickers, chapter numerals, observe/threat labels) was set in the display accent #d4421e, which is 4.05:1 on cream — below the 4.5:1 AA floor for text under 24px. All 15 such rules now use the --accent-ink token (6.05:1), which already existed and was documented for exactly this purpose but had never been wired up. Lighthouse mobile accessibility goes 95 → 100.',
      '无障碍：小号强调色文字（STEP 标签、导语眉标、章节序号、观察/威胁标签）此前使用展示用强调色 #d4421e，在米色底上仅 4.05:1，低于 24px 以下文字所需的 4.5:1 AA 底线。这 15 条规则现已全部改用 --accent-ink（6.05:1）——该 token 早已存在并写明正是为此用途，只是从未被接上。Lighthouse 移动端无障碍评分由 95 升至 100。',
    ),
    L(
      'Added an --accent-on-inverse token for the deliverable panels, which sit on an always-dark surface where both the display accent (4.33:1) and --accent-ink (2.90:1) fail — a dark background needs a lighter accent, not a darker one.',
      '为「交付物」面板新增 --accent-on-inverse token：这些面板位于恒为深色的表面上，展示用强调色（4.33:1）与 --accent-ink（2.90:1）在此都不达标——深色背景需要的是更亮而非更暗的强调色。',
    ),
    L(
      'AI Blog reading measure: the blog shell is deliberately wide so comparison tables get room, but that let running prose stretch to 93 characters per line on a laptop — well past the 60–75 that sustained reading wants. Text elements are now capped; body copy measures 70 characters, list items 67, the lede 72. Tables, figures and code keep the full column width they were widened for.',
      'AI 博客行长：博客外壳刻意加宽以容纳对比表格，但这让正文在笔记本屏幕上一行拉到 93 个字符，远超持续阅读所需的 60–75。现已为文字元素设上限：正文 70 字符、列表项 67、导语 72；表格、插图与代码仍保留为其加宽的完整列宽。',
    ),
    L(
      'Wide comparison tables now show a scroll shadow on phones. They were already their own scroll container, but with no fade or hint — and since iOS hides scrollbars until you touch them, a table with 424px of content off-screen read as truncated rather than swipeable. A four-gradient overlay now fades in on whichever side has more content and disappears at either end, in both light and dark mode.',
      '宽对比表格在手机上新增滚动阴影。它们原本已是独立滚动容器，却没有任何渐隐或提示——而 iOS 在触摸前会隐藏滚动条，于是一个有 424px 内容在屏幕外的表格看起来像被截断而非可滑动。现以四层渐变实现：哪一侧还有内容就在哪一侧淡入阴影，滑到两端则消失，明暗两种模式均已适配。',
    ),
    L(
      'All changes verified in-browser rather than assumed: contrast recomputed on 12 page types in both themes at 390px and 1280px, line length measured from rendered glyph widths, and table scroll states stepped through. No horizontal page overflow at 390px anywhere.',
      '所有改动均在浏览器中实测而非想当然：在 390px 与 1280px 下、明暗两种主题、覆盖 12 种页面类型重新计算对比度，行长按渲染字形宽度实测，表格滚动状态逐档验证。390px 下任何页面均无横向溢出。',
    ),
  ],
};
export default entry;
