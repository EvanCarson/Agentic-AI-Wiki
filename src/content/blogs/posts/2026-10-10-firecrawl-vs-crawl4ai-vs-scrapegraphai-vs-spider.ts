import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-10',
  slug: 'firecrawl-vs-crawl4ai-vs-scrapegraphai-vs-spider',
  title: L(
    'Firecrawl vs Crawl4AI vs ScrapeGraphAI vs Spider: read the defaults, not the README',
    'Firecrawl、Crawl4AI、ScrapeGraphAI 与 Spider 对比：读默认值，别读 README',
  ),
  summary: L(
    'Three of the four ignore robots.txt out of the box and three send a spoofed browser User-Agent; none has a per-origin concurrency cap, which the fifteen-year-old incumbent they are replacing has had all along. Two of the four also have a licence label that does not match the file. Pick on those, because every published benchmark here is vendor-run and they contradict each other.',
    '这四个里有三个开箱就忽略 robots.txt，也有三个发出伪装的浏览器 User-Agent；没有一个有按来源的并发上限，而它们正在取代的那个十五年的老前辈一直都有。四者中还有两个的许可证标签与文件不符。请按这些来挑——因为这里发表出来的每一份基准都是厂商自跑的，而且它们彼此矛盾。',
  ),
  tags: ['agent-comparison', 'open-source', 'infrastructure', 'developer-tools'],
};

export default post;
