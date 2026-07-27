import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-26',
  title: L(
    'Long-form reading: code blocks now show when there is more to the right, and phone headings regain a hierarchy',
    '长文阅读优化：代码块会提示右侧还有内容，手机端标题层级也重新拉开',
  ),
  items: [
    L(
      'Code blocks and ASCII diagrams that run wider than the page now fade at the edge, so a line cut off mid-word reads as "there is more this way" rather than as a typo. On one Field Guide chapter, 23 of 25 code blocks were being cut off on a phone — the widest by 355 pixels — and macOS and iOS draw no scrollbar until you are already scrolling, so there was nothing at all to indicate it. Comparison tables in blog posts got the same treatment, with a stronger fade that is actually visible.',
      '超出页面宽度的代码块与 ASCII 图示现在会在边缘渐隐，这样被截断的代码行看上去是「右边还有内容」，而不是打字错误。在某一章《实战指南》中，手机端有 25 个代码块中的 23 个被截断，最宽的一个超出 355 像素；而 macOS 与 iOS 在你真正开始滚动之前不会显示滚动条，此前完全没有任何提示。博客文章中的对比表格也做了同样处理，渐隐效果更明显、真正可见。',
    ),
    L(
      'On phones, a chapter title and the section headings inside it were being rendered at exactly the same size, weight and typeface — so a reader arriving from search had no way to tell where they were. Section headings now step down one size on narrow screens; desktop is unchanged.',
      '在手机上，章节标题与章内小节标题此前的字号、字重、字体完全一致——从搜索结果直接进入的读者无从判断自己身处何处。现在窄屏下小节标题降一档字号，桌面端保持不变。',
    ),
    L(
      'The small uppercase labels that break up long sections were the smallest text on the site, with more space below them than above — so they floated between paragraphs instead of introducing one. They are now slightly larger, with clear space above and tight space below. On a chapter with 27 of them, they were the only structure inside sections thousands of pixels long.',
      '用于切分长小节的小号大写标签此前是全站最小的文字，且下方留白多于上方——看上去像漂浮在段落之间，而不是引出下面的内容。现在字号略微加大，上方留白拉开、下方收紧。在某一章中这类标签多达 27 个，而它们是数千像素长的小节内部唯一的结构标识。',
    ),
    L(
      'Chapter opening paragraphs are no longer greyed out. The opener is meant to be the hook — the sentence a skimmer takes away — but it was set in muted grey at body size and in italic, three signals all saying "skip me" at once.',
      '章节开篇段落不再使用灰色弱化。开篇本应是全章的「钩子」——快速浏览的读者唯一会带走的那句话——但此前它被设为灰色、与正文同字号、且为斜体，三重信号同时在说「跳过我」。',
    ),
    L(
      'Callout text was set smaller and in italic than the paragraphs it interrupts. The NOTE and TRAP badges and the coloured left rule already say what a callout is; it now reads at normal body size, upright.',
      '提示框内的文字此前比它所打断的正文更小、且为斜体。既然 NOTE 与 TRAP 标签和左侧色条已经说明了提示框的性质，框内文字现已恢复为正文字号、字形端正。',
    ),
    L(
      'Image captions in blog posts were running the full width of the figure — up to 124 characters per line, roughly double the article body. They now read at prose width, still centred under the image. Sections of a chapter also get more space between them.',
      '博客文章中的图注此前会占满整张配图的宽度——每行多达 124 个字符，约为正文的两倍。现在图注按正文行宽排版，仍居中显示于图片下方。章节小节之间的间距也相应加大。',
    ),
    L(
      'The design guard now checks that any container which scrolls sideways actually shows a scroll cue, at both phone and desktop widths.',
      '设计检查新增一项：核查任何可横向滚动的容器确实显示了滚动提示，手机与桌面宽度均需通过。',
    ),
  ],
};
export default entry;
