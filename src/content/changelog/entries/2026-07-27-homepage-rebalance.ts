import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-27',
  title: L(
    'The homepage now shows the whole site, not just one section of it',
    '首页现在展示的是整个站点，而不再只是其中一个板块',
  ),
  items: [
    L(
      'Playbooks, Operations and the AI Blog now appear on the homepage. Until today three of the site\'s sections had no presence there at all — you could only reach them from the top navigation — so the front page described a smaller site than the one that exists. Every card also carries its own entry count, and the header line states the size and last-updated date of the whole collection.',
      '实战手册、运维与 AI 博客现在会出现在首页上。在此之前，站点的三个板块在首页完全没有入口——只能通过顶部导航进入——因此首页所呈现的站点，比实际存在的要小得多。每张卡片现在还标注了各自的条目数量，页首一行则说明整个知识库的规模与最近更新日期。',
    ),
    L(
      'The 26-chapter table of contents on the homepage collapses to its six parts, each linking into its first chapter, with a link through to the full list. That one component was 1,507 pixels of a 2,334-pixel page — 65% of the front page was a flat list of chapter titles with no descriptions, repeated word for word on the Field Guide page, so the homepage\'s main call to action landed on something that looked like the page you had just left.',
      '首页上 26 章的目录收拢为六个部分，每个部分链接到该部分的第一章，并附有通往完整目录的入口。此前这一个组件就占据了 2334 像素页面中的 1507 像素——首页 65% 的篇幅是一份没有任何说明文字的章节标题清单，且与《实战指南》页面逐字重复，导致首页的主要行动入口点进去后，看到的几乎就是刚刚离开的那一页。',
    ),
    L(
      'Everything on the homepage now lines up. There were five different left-hand edges in the first 800 pixels — the hero text, the cards, the card contents, the table of contents box and its contents each started at a different place. There are now three, nested inside one another as they should be. Spacing between blocks also varies with what it separates, instead of being the same 24 pixels between two neighbouring cards as between a small card and a very large one.',
      '首页上的元素现在对齐了。此前页面前 800 像素内存在五条不同的左边界——标题区文字、卡片、卡片内文、目录框及其内文各自从不同位置开始。现在只剩三条，且呈应有的层层嵌套关系。区块之间的间距也会随所分隔内容的不同而变化，不再是无论相邻两张卡片之间、还是小卡片与超大区块之间都一律 24 像素。',
    ),
    L(
      'The word "agentic" in the homepage headline is no longer set in a different typeface from the words around it. It was italic Inter inside a Space Grotesk heading; at 56 pixels the mismatch was visible, and read less like emphasis than like a font that had failed to load. The blue already carries the emphasis. This also brings the English and Chinese headlines into agreement.',
      '首页大标题中的「智能体」一词不再使用与周围文字不同的字体。此前它是嵌在 Space Grotesk 标题中的 Inter 斜体；在 56 像素字号下这种不一致清晰可见，与其说是强调，不如说更像字体加载失败。蓝色本身已经足以承担强调作用。这一改动也让中英文标题的处理方式保持一致。',
    ),
    L(
      'The About and Changelog pages now open with the same full-width heading band as every other section. They were the only two pages in the site with no heading treatment at all — which made About, the page where a reader decides whether to trust an anonymous wiki, the plainest page in the build.',
      '「关于」与「更新日志」页面现在采用与其他板块一致的通栏标题区。此前它们是全站仅有的两个完全没有标题样式的页面——这使得「关于」页——读者据以判断是否信任一个匿名维基的那一页——成了全站最朴素的页面。',
    ),
  ],
};
export default entry;
