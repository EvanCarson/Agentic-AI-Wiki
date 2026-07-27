import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-27',
  title: L(
    'The homepage shows a diagram; the changelog and blog index got much shorter',
    '首页开始展示图示；更新日志与博客索引大幅变短',
  ),
  items: [
    L(
      'The newest blog post now appears on the homepage with its lead diagram. The site contains 131 hand-drawn diagrams and until now not one of them appeared anywhere except inside a post — every index page was pure text, which made a heavily illustrated site look like a wall of writing. The diagram is drawn inline rather than loaded as an image, so it follows the light and dark themes instead of freezing in one of them.',
      '最新的博客文章现在会连同其首图一起出现在首页上。本站共有 131 张手工绘制的图示，而在此之前，它们只出现在文章内部——所有索引页都是纯文字，让一个配图丰富的站点看起来像一堵文字墙。该图示以内联方式绘制而非作为图片加载，因此会跟随浅色与深色主题变化，而不会固定在其中一种配色上。',
    ),
    L(
      'The changelog is about a quarter of its former length on a phone — from roughly 58 screens of scrolling to 14. Entries now show their headline with the details one tap away, are grouped by month, and have a row of month links at the top to jump between them. On a desktop screen everything stays expanded as before.',
      '在手机上，更新日志的长度缩短到原来的约四分之一——从大约 58 屏滚动减少到 14 屏。每条记录现在只显示标题，详情轻点一下即可展开；记录按月份分组，页面顶部新增一排月份链接用于快速跳转。在桌面端，所有内容仍与此前一样保持展开。',
    ),
    L(
      'The blog index no longer opens with a wall of 44 tag chips. On a phone they took up 44% of the first screen before a single article title; they are now one tap away, and the first post starts 217 pixels higher. On wider screens the tags stay visible as before.',
      '博客索引页不再以一堵 44 个标签块开场。在手机上，它们此前占据了第一屏 44% 的篇幅，之后才出现第一篇文章标题；现在轻点一下即可展开，第一篇文章的位置上移了 217 像素。在较宽的屏幕上，标签仍与此前一样保持可见。',
    ),
    L(
      'Every blog post now shows how long it takes to read. The reading time was always meant to be calculated automatically but never actually was, so unless it had been typed in by hand, 22 identically shaped cards told you nothing about whether you were opening a six-minute read or a twenty-five-minute one. Chinese posts are measured by character count rather than word count, which is the correct unit.',
      '每篇博客文章现在都会显示预计阅读时长。此前系统本应自动计算阅读时长，实际却从未真正计算过，因此除非手工填写，22 张外观完全相同的卡片无法告诉你即将打开的是六分钟还是二十五分钟的长文。中文文章按字数而非词数计量，这才是正确的计量单位。',
    ),
  ],
};
export default entry;
