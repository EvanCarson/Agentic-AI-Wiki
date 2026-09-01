import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-01',
  title: L(
    'Wiki entries now show which AI Blog posts discuss them — the link graph ran one way, and now it runs both',
    '词条页现在会列出讨论过它的 AI 博客文章——原本单向的链接关系，现在双向可达',
  ),
  items: [
    L(
      'Concepts, Deep-Dives, Playbooks and Operations entries carry a new **Discussed in the AI Blog** list at the foot of the article, naming the posts that cite that page. The links between the two halves of the site ran almost entirely one way: blog posts referenced the wiki 855 times in English and 940 in Chinese, while the wiki linked back to the blog **six times in total**. The newest and most topical writing on the site was its least reachable part, both for a reader following a thread and for a search engine deciding what matters. 450 pages now carry the module, creating 1,178 links back into 94 posts.',
      '概念、深度剖析、实战手册与运维的词条页，正文末尾新增了一份 **AI 博客中的相关讨论** 列表，列出引用过该页面的文章。此前站点两半之间的链接几乎完全是单向的：博客文章在英文里引用维基 855 次、中文里 940 次，而维基链回博客的次数**总共只有六次**。于是站点上最新、最贴近前沿的那部分内容，反而是最难抵达的——无论对顺着线索往下读的读者，还是对判断什么重要的搜索引擎而言。现在有 450 个页面带上了这个模块，向 94 篇文章建立了 1,178 条回链。',
    ),
    L(
      'The associations are inverted from the links the posts already make, not inferred from tags — Concepts entries do not carry tags, and a similarity heuristic would have invented relationships nobody wrote. Every line in the list was a deliberate editorial choice by whoever drafted the post, it needs no upkeep, and it extends itself each time the daily routine publishes. Both languages fold onto one index, so a Chinese reader sees the same set as an English one; the list shows the six most recent where a page is cited more often, which the most-linked pages are (fifteen posts cite *Scoped Credentials for Agents*).',
      '这些关联是从文章本身已经写下的链接反向推导出来的，而不是靠标签推测——概念词条根本没有标签，而相似度启发式只会凭空造出没人写过的关系。列表里的每一行，都是当初撰写这篇文章的人有意做出的编辑判断；它无需维护，并且每当每日例程发布新内容时就会自动延伸。中英两种语言合并进同一份索引，因此中文读者看到的集合与英文读者一致；被引用次数较多的页面只显示最近的六篇——而那些被引最多的页面确实需要这个上限（有十五篇文章引用了《智能体的最小权限凭据》）。',
    ),
  ],
};

export default entry;
