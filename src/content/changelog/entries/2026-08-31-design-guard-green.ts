import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-08-31',
  title: L(
    'Scoped every diagram\'s CSS to itself, fixing labels across ten posts — and the design suite is green for the first time',
    '把每张图表的 CSS 限定在自身作用域内，修好十篇文章里的标签——设计套件首次全绿',
  ),
  items: [
    L(
      'Fixed the root cause behind almost every diagram defect on the site: `BlogLayout`\'s `inlineSvgs()` splices each SVG\'s `<style>` block into one shared document, where an SVG `<style>` is not scoped. Two diagrams in a post that both define `.sub` did not each get their own — and because the cascade resolves per *property*, a later `.sub` that simply omitted `text-anchor` could not undo an earlier `.sub { text-anchor: middle }`. That one leaked declaration re-anchored labels authored left-aligned, shifting each left by half its width. It pushed 35 labels across 10 posts outside their viewBox, where the root `<svg>`\'s default `overflow: hidden` clipped them. Each inlined diagram now carries a generated scope class and its rules are rewritten to match only inside it, so a class name means the same thing in every diagram. Safe as a mechanical transform because all 3,415 rules across all 349 diagrams are single-class selectors with no at-rules or comments, and every diagram already defines every class it uses.',
      '修复了站内几乎所有图表缺陷背后的根因：`BlogLayout` 的 `inlineSvgs()` 会把每个 SVG 的 `<style>` 块拼进同一个文档，而 SVG 的 `<style>` 并没有作用域。一篇文章里两张都定义了 `.sub` 的图，并不会各用各的——而且由于层叠是按*属性*解析的，后面那条只是没写 `text-anchor` 的 `.sub`，无法撤销前面那条 `.sub { text-anchor: middle }`。这一条泄漏的声明重新锚定了本应左对齐的标签，把每个标签左移了自身宽度的一半，导致 10 篇文章中的 35 个标签被推出 viewBox，被根 `<svg>` 默认的 `overflow: hidden` 裁掉。现在每张内联图表都带上一个生成的作用域类，其规则被改写为仅在其内部匹配，于是同一个类名在每张图里含义一致。这个机械变换是安全的：全部 349 张图中的 3,415 条规则都是单类选择器，既无 at-rule 也无注释，且每张图本就定义了自己用到的每一个类。',
    ),
    L(
      'Capped the last uncapped prose on the site. `.home-latest-list li` was missed by the 2026-07-28 measure sweep and ran 111–117 characters at 1280px and wider — the reason the design suite failed 8 of its 10 measure widths on clean `main`. It now joins `.changelog-items li` and the rest at `var(--w-measure)`. The 1px separator narrows with the text, which is the correction rather than a side effect: on `/changelog/` the full-width rules belong to structural elements (the month heading and jump nav, both 1048px) while the prose items sit capped at 626px with no border of their own.',
      '给站内最后一处未设上限的正文加了上限。`.home-latest-list li` 被 2026-07-28 那轮 measure 扫描漏掉，在 1280px 及更宽处每行跑到 111–117 个字符——这正是设计套件在干净的 `main` 上 10 个宽度里失败 8 个的原因。它现在与 `.changelog-items li` 等一起受 `var(--w-measure)` 约束。那条 1px 分隔线随文字一同收窄，这是修正而非副作用：在 `/changelog/` 上，通栏的横线属于结构元素（月份标题与跳转导航，均为 1048px），而正文条目本就限宽 626px 且自身不带边框。',
    ),
    L(
      'Fixed the ten label placements the scoping change left behind, each a real authoring slip rather than a leak: three bar charts whose left gutter was narrower than their longest row label, so the tail ran under the first bar (`open-traces` at 140px, `muse-glimmer` at 135px, `together` and `gemini-3-7-flash` likewise — each plot origin shifted right with its scale unchanged); an annotation sitting on top of a bar in `mem0`; card text overflowing its box into a neighbour in `x402`; a footnote centred on a column rather than the chart in `frontier-model-gate`; a rotated axis label 3px past the left edge in `generative-ui`; `Mcp-Session-Id` in `mcp-goes-stateless`, ~92px wide in an 80px gap, lifted clear of the box band; and `CDP / Playwright` in `browserbase`, ~106px in an 88px gap, split over two centred lines.',
      '修好了作用域改动之后剩下的十处标签摆放问题，每一处都是真实的作者疏忽而非样式泄漏：三张条形图的左侧留白窄于其最长行标签，导致尾部钻到第一根条形下面（`open-traces` 为 140px、`muse-glimmer` 为 135px，`together` 与 `gemini-3-7-flash` 同理——各自把绘图原点右移，比例尺不变）；`mem0` 中一处压在条形上的注解；`x402` 中溢出卡片、侵入相邻方框的卡片文字；`frontier-model-gate` 中对齐到某一列而非整张图的脚注；`generative-ui` 中越过左边界 3px 的旋转坐标轴标签；`mcp-goes-stateless` 中约 92px 宽却挤在 80px 间隙里的 `Mcp-Session-Id`，已抬到方框带之上；以及 `browserbase` 中 88px 间隙里约 106px 宽的 `CDP / Playwright`，改为居中两行。',
    ),
    L(
      'Worth recording for whoever runs the suite next: its four assertions fire in sequence, and `assert.deepEqual` throws on the first non-empty list, so the collision check was hiding the viewBox check, which was in turn hiding the on-box check. One visible failure on `main` was really three stacked failure classes — 1 collision, then 35 escapes, then 10 covered labels. A guard that has been red for a while is not one failure to triage; assume each fix reveals the next layer, and keep going until the count reaches zero.',
      '给下一个跑这套件的人记一笔：它的四条断言是顺序执行的，而 `assert.deepEqual` 会在第一个非空列表上抛出，于是碰撞检查挡住了 viewBox 检查，后者又挡住了压框检查。`main` 上那一个可见的失败，实际上是三层堆叠的失败类别——先是 1 处碰撞，然后 35 处越界，再然后 10 处被方框覆盖的标签。一个已经红了一阵子的守卫，不是一个待分诊的失败；要预设每修好一层就会显出下一层，直到计数归零为止。',
    ),
  ],
};

export default entry;
