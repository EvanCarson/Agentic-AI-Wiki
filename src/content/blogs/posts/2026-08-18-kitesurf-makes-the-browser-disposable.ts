import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-18',
  slug: 'kitesurf-makes-the-browser-disposable',
  title: L(
    'Cloudflare’s Kitesurf makes a browser cheap enough to throw away',
    'Cloudflare 的 Kitesurf 让浏览器便宜到可以用完就扔',
  ),
  searchTitle: { en: 'Cloudflare Kitesurf: A Disposable Browser for Agents' },
  summary: L(
    'The quoted number is 3–7× less CPU and memory than Chromium. The consequence worth planning around is that a fresh browser per task stops being a cost you amortise by reusing sessions — and session reuse is where browser-agent state leaks live. What you trade for it is a compatibility tail that fails silently.',
    '被引用的数字是 CPU 与内存比 Chromium 少 3–7 倍。但真正值得据以规划的推论是：每个任务一个全新浏览器，不再是一笔要靠复用会话摊销掉的成本——而会话复用正是浏览器智能体状态泄漏的所在。你为此付出的代价，是一条会静默失败的兼容性长尾。',
  ),
  tags: ['browser-agents', 'infrastructure', 'sandboxing'],
};

export default post;
