import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-26',
  title: L(
    'Inline code now renders consistently everywhere',
    '行内代码现在处处渲染一致',
  ),
  items: [
    L(
      'About a fifth of the inline code across the wiki was written as a bare <code> element rather than the documented <code class="inline">, and only the class was styled — so those ~850 instances fell back to the browser default monospace with no background or padding. Alongside the freshly systematised typography they had become conspicuously inconsistent. The style now attaches to the element itself, which fixes every existing instance at once and removes the chance to get it wrong when writing new pages.',
      '本站约五分之一的行内代码写成了裸 <code> 元素，而非文档约定的 <code class="inline">，且样式只挂在类上——于是这约 850 处只能退回浏览器默认等宽字体，没有底色也没有内边距。在刚刚系统化的排版旁边，它们的不一致显得格外扎眼。现在样式改挂在元素本身上，一次性修好全部既有实例，也让今后撰写新页面时不会再写错。',
    ),
    L(
      'Also added a pre-emptive reset so that a <code> nested inside a <pre> block cannot inherit the inline chrome. No content does that today, but styling the bare element would otherwise have turned it into a trap for future authors.',
      '同时预先加了一条重置规则，确保嵌套在 <pre> 代码块内的 <code> 不会继承行内代码的样式。目前没有任何内容这样写，但既然改为给裸元素挂样式，不预先处理就会给日后的作者埋下陷阱。',
    ),
  ],
};
export default entry;
