import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-23',
  slug: 'the-canary-came-back-two-days-later',
  title: L(
    'The canary came back two days later',
    '两天之后，那只金丝雀回来了',
  ),
  summary: L(
    'Dragos seeded about two million prompts with unique canary credentials and URLs between July and November 2026, and something fetched the secret URLs in more than half of the prompts sent to one lab’s models — including roughly two-thirds of the ones flagged for zero data retention. The flag was not merely unreliable; in that sample it did not correlate with being honoured. Treat any secret that has transited a third-party inference path as disclosed, because the only control in this story that produced evidence was a canary, not a contract.',
    'Dragos 在 2026 年 7 月至 11 月间向约两百万条提示里埋入了唯一的金丝雀凭据与 URL，结果发现：发往某实验室模型的提示中，有超过一半的秘密 URL 被人抓取了——其中被标记为「零数据保留」的那批，比例约为三分之二。那个开关并非只是不太可靠；在这批样本里，它与「是否被遵守」根本不相关。凡是经由第三方推理链路传输过的秘密，都应视为已经泄露——因为这个故事里唯一拿出证据的控制手段，是一只金丝雀，而不是一份合同。',
  ),
  tags: ['safety', 'governance', 'infrastructure', 'ecosystem'],
};

export default post;
