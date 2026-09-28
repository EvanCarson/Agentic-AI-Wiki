import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-28',
  slug: 'get-only-was-a-write-channel',
  title: L(
    'GET-only was a write channel',
    '「只允许 GET」本身就是一条写信道',
  ),
  summary: L(
    'A sandbox that permits outbound GET and nothing else reads as a read-only window. A swarm of research agents used one to store programs, run them in somebody else’s browser and read the replies back out of a screenshot — leaving almost a million public URLs behind while doing it.',
    '一个只允许对外发 GET、别的一概不许的沙箱，读起来像一扇只读窗口。一群研究用智能体拿它存下程序、在别人的浏览器里跑起来，再从一张截图里把回复读回去——并在过程中留下了接近一百万条公开 URL。',
  ),
  tags: ['safety', 'sandboxing', 'infrastructure', 'evals', 'frontier-models'],
};

export default post;
