import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-01',
  title: L(
    'A machine-readable index of every page for AI assistants, at /llms.txt and /zh/llms.txt',
    '面向 AI 助手的全站页面机读索引：/llms.txt 与 /zh/llms.txt',
  ),
  items: [
    L(
      'The site now publishes `/llms.txt` (English) and `/zh/llms.txt` (Chinese), following the llms.txt convention: a one-paragraph description of the site, then every page — 490 in each language — under a heading per content group, each with its title, canonical URL and one-line summary, and blog posts with their dates. AI assistants already send readers here (gemini.google.com and claude.ai both appear in the referrer list), and a model deciding which page to fetch for a question had only the sitemap to go on, which is bare URLs with no titles or summaries.',
      '本站现在发布 `/llms.txt`（英文）与 `/zh/llms.txt`（中文），遵循 llms.txt 约定：先用一段话说明本站是什么，然后按内容分组列出每一个页面——每种语言各 490 个——每条带标题、规范 URL 与一句话摘要，博客文章还带日期。AI 助手已经在向本站输送读者（gemini.google.com 与 claude.ai 都出现在来源列表中），而一个模型要为某个问题决定抓取哪个页面时，此前只有站点地图可用——那上面只有光秃秃的 URL，没有标题也没有摘要。',
    ),
    L(
      'The files are generated from the section manifests at build time rather than written by hand, so a page published by the daily routine appears in them with no change to the routine, and the page count in the description stays true. A test checks that every URL in the built files resolves to a built page, which guards the group segment in Deep-Dives, Playbooks and Operations URLs. The About page now points at the file.',
      '这两个文件在构建时由各板块的内容清单生成，而不是手写，因此每日例程发布的页面会自动出现在其中，无需改动例程，描述里的页面数也始终是真的。一项测试会检查构建产物里的每个 URL 都能对应到一个已构建的页面，从而守住深度剖析、实战手册与运维 URL 中的分组路径段。"关于"页现在也指向了这个文件。',
    ),
  ],
};

export default entry;
