import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-08-31',
  title: L(
    'The RSS feeds now declare their own content type and character set',
    'RSS 订阅源现在会声明自己的内容类型与字符集',
  ),
  items: [
    L(
      '`/rss.xml` and `/zh/rss.xml` are served as `application/rss+xml; charset=utf-8`. The feed routes set that header themselves, but in a static build Astro writes the endpoint\'s response body to a file on disk and discards its headers, so production was serving Vercel\'s default mapping for `.xml` — `application/xml`, with no charset. Feed readers accept that; leaving the encoding implicit on a feed that is half Chinese is still the wrong thing to leave to chance. Pinned in `vercel.json`, with a note in the feed builder so the two stay in step.',
      '`/rss.xml` 与 `/zh/rss.xml` 现在以 `application/rss+xml; charset=utf-8` 提供。这两个订阅源路由本身就设置了该响应头，但在静态构建中，Astro 会把端点的响应体写成磁盘上的文件、并丢弃它的响应头，于是生产环境用的是 Vercel 对 `.xml` 的默认映射——`application/xml`，且不带字符集。阅读器能接受这一点；但对于一份有一半是中文的订阅源来说，把编码交给隐式推断仍然不是该冒的险。现已在 `vercel.json` 中固定，并在订阅源构建代码里留了注释，让两处保持同步。',
    ),
  ],
};

export default entry;
