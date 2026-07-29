import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-28',
  title: L(
    'A wider layout: the reading column grows 27%, and the 30-character band at 901px is gone',
    '更宽的版面：正文栏加宽 27%，901px 处那条「一行 30 字符」的窄带也修好了',
  ),
  items: [
    L(
      'The article shell no longer freezes at 1180px. It is now fluid up to 1440px with the navigation and contents rails sitting close to the viewport edge, and centres beyond that. On a 1728px screen the unused margin drops from 274px per side to 144px, and the reading column grows from 536px to 864px.',
      '正文外框不再卡死在 1180px。现在它在 1440px 以内自适应，左侧导航与右侧目录贴近视口边缘，超过 1440px 后整体居中。在 1728px 的屏幕上，两侧闲置的空白从每边 274px 降到 144px，正文栏从 536px 加宽到 864px。',
    ),
    L(
      'Body text on chapters and entries steps from 16px to 18px on wide screens, matching the blog — numbered lists included, which had been left behind at 16px inside 18px prose. Line length is capped everywhere: bulleted lists, numbered lists and deliverable checklists all sit inside the same measure as body text, so the extra width buys more columns and wider rails rather than longer lines.',
      '在宽屏上，章节与条目的正文字号从 16px 提升到 18px，与博客一致——编号列表也包含在内，此前它们仍停留在 16px，夹在 18px 的正文之间。每一处正文的行宽都设了上限：无序列表、编号列表与交付物清单，都与正文行宽保持一致，因此多出来的宽度用于增加栏数、加宽侧栏，而不是把行拉长。',
    ),
    L(
      'Fixed: between 901px and 1180px — a common split-screen and small-laptop width — both side rails appeared at once against a layout that had no room for them, squeezing the article to 30 characters a line. The contents rail now waits until there is room, and between 900px and that point it appears as a collapsible panel above the article instead — on blog posts as well as on chapters. On chapters the panel starts open. On blog posts, where a long piece can run to forty headings, it starts closed and opens on a click, so the article itself is still on the first screen. Phone widths are unchanged: no contents panel there, as before.',
      '修复：在 901px 到 1180px 之间——分屏与小尺寸笔记本常见的宽度——两侧栏会同时出现，而版面根本容纳不下，正文被挤到一行仅 30 个字符。现在目录栏会等到宽度足够才出现；在 900px 到该宽度之间，则以可折叠面板的形式显示在正文上方——博客文章与章节页同样如此。章节页的面板默认展开；博客长文最多可有四十个标题，面板默认折叠，点一下即可展开，正文本身仍留在第一屏。手机宽度维持原样：与此前一致，不显示目录面板。',
    ),
    L(
      'Index pages widen too. Post lists and entry lists gain a second column, changelog entries move their date alongside the text, and the over-long lines on Concepts, the changelog and About are brought back within a comfortable measure.',
      '索引页同样加宽。文章列表与条目列表增加了第二栏，更新日志把日期移到正文一侧，「概念」、更新日志与「关于」页上过长的行也收回到了舒适的行宽之内。',
    ),
    L(
      "The blog layout also carried a dead `:global(.blog-shell)` rule meant to cap its width for wide tables. It never took effect — written inside a `<style is:global>` block, whose scoping pass is exactly what `:global()` needs to be rewritten by, and `is:global` opts the whole block out of that pass, so the literal selector shipped as invalid CSS and every browser silently dropped it. It was never a contender in the cascade, just absent from what the browser saw. Removing it lets the blog inherit the same shell as the rest of the site, and its article column grows from 884px to 1056px.",
      '博客布局里还有一条已失效的 `:global(.blog-shell)` 规则，本想为宽表格限定外框宽度。它其实从未生效——写在 `<style is:global>` 区块里，而 `:global()` 恰恰需要该区块的作用域改写才能生效，`is:global` 却让整个区块跳过了这道改写，于是这条字面选择器作为无效 CSS 被编译输出，浏览器直接将其丢弃。它从未参与过级联竞争，只是浏览器压根看不到它。删除之后，博客继承了与全站相同的外框，正文栏从 884px 加宽到 1056px。',
    ),
    L(
      'A second dead rule in the same layout tried to let wide comparison tables spill 140px past the article column, but assumed 140px of outer gutter that mostly did not exist — so it was pushing the page sideways at common laptop widths instead. It is deleted: the 172px the column gained above is more than the 140px this rule tried to steal, so every table across all 50 posts — the widest measuring 911px of natural content — fits inside the column without it, and none overflows in the wide band any more.',
      '同一布局里还有第二条已失效的规则，本想让宽的对比表格向外突破正文栏 140px，却假设两侧存在 140px 的外边距——而这在常见笔记本宽度下大半并不存在，结果反而把页面顶得横向溢出。这条规则已删除：上面正文栏多出的 172px 已经超过这条规则想窃取的 140px，因此全部 50 篇文章的表格——最宽的一张自然内容宽度也只有 911px——不靠它也能装进正文栏，宽屏区间再没有任何一篇溢出。',
    ),
    L(
      'Phone rendering is unchanged — verified byte-identical at 375px, 390px and 430px in both themes.',
      '手机端渲染完全不变——已在 375px、390px、430px 三种宽度、明暗两种主题下逐像素校验一致。',
    ),
  ],
};
export default entry;
