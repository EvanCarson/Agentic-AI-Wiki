import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-01',
  title: L(
    'Page titles are now written for a result list, and headlines are left alone',
    '页面标题现在是为搜索结果列表写的，而文章标题本身保持原样',
  ),
  items: [
    L(
      'The `<title>` tag is no longer the same string as the headline on the page. The blog\'s house style is a searchable subject, a colon, and a clause carrying the argument — *LangSmith vs Braintrust vs Helicone vs Arize Phoenix: Four Loops the Eval/Observability Stack Was Built to Close*. That reads well on the page and badly in a result list, where roughly 60 characters are shown and the clause pushes the product names out of view. Titles are now derived: a headline that already fits is used unchanged, and one that does not is cut back to its pre-colon subject. **The `<h1>` is untouched** — a reader sees exactly what was written; only the browser tab and the result list see the shorter form. Across 1,134 pages the share of over-long titles fell from most of the blog to ten, and the ten that remain are product lists where the whole string is the thing people search for.',
      '`<title>` 标签不再与页面上的标题是同一个字符串。本博客的行文风格是「可被搜索的主语 + 冒号 + 承载论点的从句」——例如《LangSmith vs Braintrust vs Helicone vs Arize Phoenix：评测与可观测性栈被设计去闭合的四种回路》。这样的标题在页面上读起来很好，在搜索结果列表里却很糟：那里大约只显示 60 个字符宽度，从句会把产品名挤出视野。现在标题改为推导得出：本就在预算之内的标题原样使用，超出的则回退到冒号之前的主语部分。**`<h1>` 完全不动**——读者看到的仍是原文；只有浏览器标签页与搜索结果列表看到较短的那一版。在全部 1,134 个页面上，超长标题的占比从「博客的大多数」降到了十个，而剩下这十个都是产品清单，整串字符本身就是人们要搜的东西。',
    ),
    L(
      'Twenty-two posts carry a hand-written `searchTitle` because the derivation could not help them: headline-only posts with no searchable subject (*Stripe bought the meter, not the router*), and posts whose pre-colon head is a fragment rather than a title (*65% Once, 25% Twenty Times*). The field is per-locale, so a post overrides only the language that needs it — Chinese headlines are usually already inside the width budget, since the measurement is display columns and a Chinese character occupies two.',
      '有 22 篇文章带上了手写的 `searchTitle`，因为推导规则帮不了它们：一类是没有可搜索主语、纯靠标题立意的文章（《Stripe 买下的是计价器，不是路由器》），另一类是冒号之前那半截只是个片段而非标题的文章（《一次 65%，二十次 25%》）。这个字段按语言分别设置，因此一篇文章只需覆盖真正需要的那个语种——中文标题通常本就在宽度预算之内，因为这里量的是显示列宽，而一个汉字占两列。',
    ),
    L(
      'The trailing section name is gone from entry pages — Concepts, Deep-Dives, Playbooks and Operations entries no longer end in *— Concepts* or *— AI Blog*. Those entries are already named descriptively, so the suffix matched no query anyone types and spent width that a result list was going to cut. Group index pages keep theirs, where the base title is short and the section name genuinely disambiguates.',
      '词条页末尾的板块名已经去掉——概念、深度剖析、实战手册与运维的词条不再以「— 概念」或「— AI 博客」结尾。这些词条本身命名就有描述性，后缀匹配不上任何人会输入的查询，只是白白占掉搜索结果列表本来就要截断的宽度。分组索引页保留后缀：那里的主标题很短，板块名确实起到区分作用。',
    ),
  ],
};

export default entry;
