import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-01',
  title: L(
    'This page now renders its own formatting, and links to the pages it announces',
    '本页现在会正确渲染自己的格式，并链接到它所公布的那些页面',
  ),
  items: [
    L(
      'Changelog bullets have always been written with `code` spans and *emphasis*, but the page rendered them as plain text — so every reader saw the punctuation instead of the formatting: 153 code spans and 189 emphasised phrases showing as literal backticks and asterisks. They now render. Titles were checked and carry no markup, so they are unchanged.',
      '更新日志的条目一直是用 `code` 代码片段与 *强调* 写成的，但页面把它们当作纯文本渲染——于是每位读者看到的都是标点而不是格式：153 处代码片段与 189 处强调短语，全都显示成字面的反引号与星号。现在它们会正确渲染了。条目标题经检查不含任何标记，因此保持不变。',
    ),
    L(
      'More usefully, a code span that names a page on this site is now a link. This page exists to announce new pages and linked to **none** of them — every path was dead text, on what site analytics say is the fourth most-visited page here. That is 38 new links into recently published work, localized so a Chinese reader lands on the Chinese page. Because they are real links now rather than text, the build\'s internal-link check validates them, so a path typo in a future entry fails the build instead of shipping quietly.',
      '更棒的是，凡是指向本站页面的代码片段，现在都成了链接。这个页面的存在意义就是公布新页面，此前却**一个都没有链接**——每一条路径都是死文本，而据站点分析，这里是访问量第四高的页面。这一改动带来了 38 条通往近期新内容的链接，并且做了语言本地化：中文读者会落在中文页面上。由于它们现在是真正的链接而非文本，构建时的内部链接检查会对其做校验——今后条目里写错一个路径会让构建失败，而不是悄无声息地发布出去。',
    ),
    L(
      'The renderer is a deliberately small thing: it supports exactly the two constructs entries actually use, and anything else stays literal. Input is HTML-escaped before any tag is added, so an entry cannot inject markup — worth stating because these bullets are written unattended by the daily routine and are now rendered as HTML.',
      '这个渲染器刻意做得很小：它只支持条目实际用到的那两种写法，其余一律保持字面原样。输入会先做 HTML 转义再添加任何标签，因此一条更新记录无法注入标记——之所以要专门说明，是因为这些条目由每日例程无人值守地写入，而现在它们会被当作 HTML 渲染。',
    ),
  ],
};

export default entry;
