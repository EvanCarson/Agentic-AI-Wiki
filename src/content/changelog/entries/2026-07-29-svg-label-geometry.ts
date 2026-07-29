import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-29',
  title: L(
    'Fixed a broken blog chart, and added a permanent guard against SVG label collisions',
    '修复了一张博客图表的显示错误，并新增了一道防止 SVG 标签重叠的常设检测',
  ),
  items: [
    L(
      'Fixed: on the Exa vs Tavily vs Brave Search vs Firecrawl post, the context-cost bar chart\'s `.body-text { text-anchor: middle; }` rule silently beat every individual label\'s `text-anchor="start"/"end"` attribute — a CSS rule always wins that contest — recentring labels authored to sit flush against their bars. "Brave (snippet)" and "~200 tokens" overlapped by 46px, rendering as unreadable mashed-together text; "Tavily (basic)" and "~500 tokens" overlapped by 15px; and "~8,000 tokens" was pushed 8px past the viewBox, clipping its final letter. Split the shared class into `.row-label` (text-anchor: end) and `.value-label` (text-anchor: start) so the CSS matches each label\'s role instead of overriding it, and widened the viewBox from 900 to 980 so the widest value label — the one beside the 8,000-token bar, which reaches all the way to x=850 — can sit outside its bar exactly like the other three instead of needing different treatment. Same file, so the fix covers the Chinese post too.',
      '修复：在《Exa、Tavily、Brave Search 与 Firecrawl》一文的上下文开销柱状图里，`.body-text { text-anchor: middle; }` 这条规则悄悄压过了每个标签自己的 `text-anchor="start"/"end"` 属性——CSS 规则总是赢过表现属性——把本该贴紧柱子首尾对齐的标签统统拉回了居中。"Brave (snippet)" 与 "~200 tokens" 重叠 46px，两行字挤成一团难以辨认；"Tavily (basic)" 与 "~500 tokens" 重叠 15px；"~8,000 tokens" 被推出画布 8px，最后一个字母被裁掉。现在把共用的类拆成 `.row-label`（右对齐）与 `.value-label`（左对齐），让 CSS 与每个标签的角色对应而不是覆盖它，并把 viewBox 从 900 拓宽到 980，好让最宽的那个数值标签——挨着一路画到 x=850 的八千令牌那根柱子——能像其余三行一样安安稳稳地待在柱子外侧，而不必单独将就。中英文两个版本共用同一个文件，这一次修复两边都覆盖到了。',
    ),
    L(
      'Fixed a smaller instance of the same bug family on the pgvector vs Pinecone vs Weaviate vs Qdrant architecture diagram, where the "tenant_id, created_at…" and "tags, source, lang" captions in two adjacent boxes overlapped by 5px; trimmed both to 11px so they clear each other.',
      '同一类问题在《pgvector、Pinecone、Weaviate 与 Qdrant》架构图上还有一处更小的实例：相邻两个方框里的 "tenant_id, created_at…" 与 "tags, source, lang" 说明文字重叠了 5px；把两处字号都收到 11px，重叠随之消失。',
    ),
    L(
      'Added a permanent check: `npm run test:design` now renders every blog post\'s inlined SVGs in a real browser and fails if any two `<text>` elements in the same diagram collide on the same line, or if any label escapes its viewBox. Collisions require both horizontal overlap and vertical overlap past 60% of the shorter label\'s height — a naive "any vertical overlap" version threw 46 false positives across the site, flagging ordinary stacked two-line labels whose tall glyph boxes graze by a few percent while rendering perfectly readable. The escape check accounts for each label\'s own transform (several diagrams rotate axis captions 90°), so a vertical caption is not mistaken for one running off the edge. Verified the new assertion actually fails: reverting the chart fix reproduced the exact 46px and 15px collisions by name before the fix was restored.',
      '新增了一道常设检测：`npm run test:design` 现在会在真实浏览器里渲染每篇博客文章内联的 SVG，只要同一张图里有任意两个 `<text>` 元素在同一行发生重叠，或者有标签跑出了自己的 viewBox，就判为不通过。判定重叠要求水平方向有交叠、且垂直方向的交叠超过较矮那个标签高度的 60%——早先一版"只要垂直方向有任何交叠就算"的写法在全站误报了 46 处，把普通的两行堆叠标签也当成了问题，其实它们只是字形包围盒因为带上下延伸笔画而蹭到了几个百分点，实际显示完全清晰可读。越界检测也把每个标签自身的变换考虑在内（有几张图会把坐标轴说明文字旋转 90°），避免把一条竖排文字误判成跑出边界。也验证过这道检测真的会失败：把图表的修复先还原回去，检测精确报出了那 46px 与 15px 的两处重叠，确认无误后再恢复修复。',
    ),
    L(
      'Documented the guard in the daily content batch routine (`docs/routines/daily-content-batch.prompt.md`): `npm run test:design` must pass before any content PR carrying a blog SVG merges.',
      '在每日内容批处理流程文档（`docs/routines/daily-content-batch.prompt.md`）里记下了这道检测：任何携带博客 SVG 的内容 PR，合并前都必须通过 `npm run test:design`。',
    ),
  ],
};

export default entry;
