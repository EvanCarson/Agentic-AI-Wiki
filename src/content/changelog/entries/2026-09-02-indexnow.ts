import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-02',
  title: L(
    'New pages now announce themselves to Bing and Yandex the moment they publish, instead of waiting to be found',
    '新页面现在会在发布的那一刻主动通知 Bing 与 Yandex，而不再等着被抓取发现',
  ),
  items: [
    L(
      'When a change merges, the site now sends the URLs it affected to the IndexNow engines — Bing, Yandex and the others that participate — so a page published today can be crawled today rather than whenever a recrawl happens to come round. This is worth more here than it looks: Bing is already the second-largest source of visitors to this site, ahead of every referrer except Google, and it arrives with no promotion at all from readers in China and Singapore, who are together more than a quarter of the audience. Google does not take part in IndexNow, so nothing here changes how it sees the site.',
      '每当有改动合并，本站现在都会把受影响的 URL 发送给参与 IndexNow 的搜索引擎——Bing、Yandex 及其他参与方——这样今天发布的页面就可能在今天被抓取，而不必等下一次重新抓取碰巧到来。这件事在这里的价值比看上去更高：Bing 已经是本站第二大访问来源，仅次于 Google，而且完全没有做过任何推广，这些访问来自中国与新加坡的读者，两地合计占受众的四分之一以上。Google 不参与 IndexNow，因此这项改动不会影响它看待本站的方式。',
    ),
    L(
      'Only pages whose content actually changed are announced. Which URLs those are is read from the site’s own sitemap rather than guessed from file paths, because a file path does not carry the whole URL: Deep-Dives, Playbooks and Operations pages sit under a group segment, and Field Guide chapters are stored under an internal id rather than their address. Taking the answer from the sitemap means the announcement can never disagree with what was actually published, and both language versions of a page are covered without a second rule.',
      '只有内容确实发生变化的页面才会被通知。具体是哪些 URL，是从本站自己的站点地图中读出来的，而不是从文件路径猜测——因为文件路径并不包含完整的 URL：深度剖析、实战手册与运维页面位于一个分组路径段之下，而实战指南的章节是以内部编号而非其网址来存放的。从站点地图取答案，意味着通知的内容不可能与实际发布的内容不一致，并且一个页面的中英两个版本都会被覆盖，无需再写第二条规则。',
    ),
  ],
};

export default entry;
