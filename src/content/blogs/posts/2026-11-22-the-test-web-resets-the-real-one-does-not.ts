import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-22',
  slug: 'the-test-web-resets-the-real-one-does-not',
  title: L(
    'The test web resets, the real one does not',
    '测试用的网页会重置，真实的那个不会',
  ),
  summary: L(
    'On 19 November 2026 Chrome\'s AI Security team described Mirror Dimension: thousands of agent-generated websites served under real URLs by a local proxy, with headless Chrome sealed in a gVisor sandbox and prompt-injection payloads switched on by HTTP header so the agent cannot tell it is being tested. Google published a throughput number — over a thousand attack test candidates per engineer per day — and no pass rate, and that is the honest pairing. The identical clean start that makes this a usable regression harness is exactly what stops an injection result transferring to production, where the page that attacks you is the page that just changed. Plus the part nobody is discussing: the sites and the payloads are written by agents, so the generator is now inside the system being measured.',
    '2026 年 11 月 19 日，Chrome 的 AI 安全团队介绍了 Mirror Dimension：数千个由智能体生成的网站，经本地代理以真实 URL 提供，无头 Chrome 封在一个 gVisor 沙箱里，而提示词注入载荷由 HTTP 头开关控制，于是智能体无从察觉自己正在被测试。Google 公布了一个吞吐数字——每位工程师每天一千多个攻击测试候选——却没有公布通过率，而这个搭配是诚实的。那个让它成为一套可用回归套件的「完全相同的干净起点」，恰恰也是让一个注入结果无法迁移到生产的原因：在生产里，攻击你的那个页面正是刚刚变过的那个。另有一件没人在讨论的事：这些网站和这些载荷都是智能体写的，于是生成器如今就在被测量的系统里面。',
  ),
  tags: ['evals', 'browser-agents', 'safety', 'prompt-injection', 'infrastructure'],
};

export default post;
