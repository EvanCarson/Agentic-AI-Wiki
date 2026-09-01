import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-08-31',
  title: L(
    'The site can be subscribed to now — bilingual RSS, a Follow column, real sitemap dates, an end to the .vercel.app duplicate, and a plain statement of how these pages get written',
    '现在可以订阅本站了——中英双语 RSS、页脚「订阅与关注」栏、站点地图上真实的更新日期、终结 .vercel.app 那份副本，以及一段关于这些页面如何写成的直白说明',
  ),
  items: [
    L(
      'New RSS feeds at `/rss.xml` (English) and `/zh/rss.xml` (中文), each carrying every AI Blog post with its title, summary, publication date and tags. Both are advertised in the `<head>` of every page, with the language you are reading listed first, so a feed reader subscribes to the right one without being asked. This site published two posts a day into a build that had no feed at all: there was no way to follow it short of revisiting by hand, which is the same as no way. Item links carry the trailing slash the canonical tag and sitemap use, so a post has one identity rather than two.',
      '新增 RSS 订阅源：`/rss.xml`（英文）与 `/zh/rss.xml`（中文），每一条都收录了 AI 博客的全部文章，带标题、摘要、发布日期与标签。两个订阅源都写进了每一页的 `<head>`，并把你正在阅读的语言排在前面，这样阅读器不必询问就能订到对的那个。此前本站每天发两篇文章，构建产物里却根本没有订阅源：除了手动回访之外没有任何关注方式，而那等于没有方式。条目链接采用与规范链接、站点地图一致的尾斜杠形式，让一篇文章只有一个身份，而不是两个。',
    ),
    L(
      '`agentic-ai-wiki.vercel.app` no longer invites indexing. Vercel serves the production deployment on that hostname as well as on menuagentic.com, and it was returning `200` with `Allow: /` for the entire site — a complete crawlable duplicate, and the copy that actually surfaced in a search for this project. The canonical tag has always pointed home, but canonical is a hint a search engine may decline. Any `*.vercel.app` host now sends `X-Robots-Tag: noindex, nofollow`. Deliberately a header rather than a `Disallow` in robots.txt: a blocked crawler never fetches the page, so it never reads the noindex, and the duplicate stays in the index forever.',
      '`agentic-ai-wiki.vercel.app` 不再邀请索引。Vercel 会同时用这个主机名和 menuagentic.com 提供生产部署，而它此前对整站返回 `200` 且 `Allow: /`——一份完整、可抓取的副本，而且在搜索本项目时真正浮出水面的正是这一份。规范链接标签一直指向主域，但规范链接只是一个搜索引擎可以不采纳的提示。现在任何 `*.vercel.app` 主机都会发送 `X-Robots-Tag: noindex, nofollow`。这里刻意用响应头而不是 robots.txt 里的 `Disallow`：被拦住的爬虫根本不会去取那个页面，也就永远读不到 noindex，那份副本会一直留在索引里。',
    ),
    L(
      'The sitemap now carries `<lastmod>` on all 184 blog URLs, taken from the `YYYY-MM-DD` prefix on each post file — the same date the post displays. Nothing else gets one. A search engine that catches a site stamping a fresh build timestamp on pages that did not change discounts the signal site-wide, so a partial set of true dates is worth more than a complete set of invented ones. On a site that ships daily, this is the difference between a crawler guessing at what is new and being told.',
      '站点地图现在为全部 184 个博客 URL 带上了 `<lastmod>`，取自每个文章文件名上的 `YYYY-MM-DD` 前缀——与文章页面上显示的日期同源。其余页面一律不加。搜索引擎一旦发现某个站点在未改动的页面上盖新的构建时间戳，就会在全站范围内给这个信号打折，所以一组部分为真的日期，比一组完整但编造的日期更有价值。对一个每天更新的站点来说，这是「让爬虫去猜什么是新的」与「直接告诉它」之间的差别。',
    ),
    L(
      'The footer gained a **Follow** column — RSS, GitHub, LinkedIn. The RSS link follows your locale. Until now the footer linked only back into the site: a reader who finished a page and wanted more of this had nowhere to go, and the GitHub repository and the maintainer\'s LinkedIn appeared on the About page and nowhere else. The grid runs four columns on desktop and collapses to two on narrow screens, as before.',
      '页脚新增 **订阅与关注** 一栏——RSS、GitHub、LinkedIn。其中 RSS 链接会跟随你当前的语言。在此之前，页脚只链回站内：一位读完一页、还想再看看的读者无处可去，而 GitHub 仓库与维护者的 LinkedIn 只出现在「关于」页上，别无他处。栅格在桌面端为四列，窄屏下仍与此前一样收成两列。',
    ),
    L(
      'The About page now says how these pages are written. A scheduled AI agent drafts part of this site — it finds the gaps by reading the manifests and changelog, researches against primary sources, writes both languages, runs the verification gates and opens a pull request that merges on its own — and the standard, the review and the corrections stay with the maintainer. The repository README has said so publicly since the routine shipped; the site itself did not, which is the wrong way round for pages that carry advertising. The new section sits directly under "Who maintains it", where a reader asking who wrote this has already stopped.',
      '「关于」页现在写明了这些页面是怎么写出来的。本站有一部分内容由一个定时运行的 AI 智能体起草——它通过读取内容清单与更新日志找出缺口，对照一手资料做研究，写出中英两个版本，跑完校验关卡，然后开出一个会自行合并的 pull request——而标准、复核与纠错的责任仍在维护者身上。自这项定时任务上线以来，仓库的 README 一直公开写着这件事，站点本身却没有；对于承载广告的页面来说，这个次序是反的。新增的这一节紧接在「维护者」之下，因为想知道「这是谁写的」的读者，脚步正好停在那里。',
    ),
  ],
};

export default entry;
