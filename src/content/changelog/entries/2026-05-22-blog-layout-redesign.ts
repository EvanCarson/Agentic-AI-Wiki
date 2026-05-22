import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-22',
  title: L(
    'AI Blog layout redesign — chapter-shell, left-rail TOC, no inline styles',
    'AI 博客版面重构 —— 章节外壳、左侧导航栏、清除内联样式',
  ),
  items: [
    L(
      'Blog post pages now use the site-standard chapter-shell layout with a sticky left-rail in-page TOC (BlogPostTOC), matching the structure of Concepts, Deep-Dives, Playbooks, and Operations.',
      '博客文章页面现已采用站点标准章节外壳布局，带有固定左侧页内目录（BlogPostTOC），与概念、深度剖析、实战手册、运维等板块结构一致。',
    ),
    L(
      'All inline styles removed from BlogLayout, BlogCard, BlogsView, and BlogTagView — replaced with scoped component styles and site.css token-based classes.',
      '已从 BlogLayout、BlogCard、BlogsView 和 BlogTagView 中移除所有内联样式，改用组件作用域样式与 site.css Token 类。',
    ),
    L(
      'New shared .blog-tag pill class in site.css automatically supports light/dark themes via CSS custom properties.',
      '在 site.css 中新增共享的 .blog-tag 标签胶囊类，通过 CSS 自定义属性自动支持明暗主题。',
    ),
    L(
      'Blog post header now shows a kicker, h1 title, subtitle summary, monospace meta line (date/author/reading time), and tag pills — clearly distinguished from the article hook lede.',
      '博客文章头部现在展示 kicker、h1 标题、副标题摘要、等宽元信息行（日期/作者/阅读时间）和标签胶囊，与正文钩子引言视觉层级清晰区分。',
    ),
  ],
};

export default entry;
