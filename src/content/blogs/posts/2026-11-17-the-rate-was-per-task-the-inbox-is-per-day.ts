import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-17',
  slug: 'the-rate-was-per-task-the-inbox-is-per-day',
  title: L(
    'The rate was per task, the inbox is per day',
    '那个比率是按任务算的，而收件箱是按天来的',
  ),
  summary: L(
    "OpenAI put computer-use agents into hospital software on 16 November 2026 and reported reviewers rating 99% of 325 EHR-inbox tasks clinically safe. Give that rate a denominator — about 3,220 messages per clinician-year — and it describes 32 to 90 unsafe dispositions a year, from an evidence base the size of one clinician-month. The value claim has the same missing denominator: a cohort study of 983,154 portal replies found an AI drafter 29.5% faster on the messages it touched and 8.6% slower on the queue as a whole, because a draft creates review work on messages nobody needed to read.",
    '2026 年 11 月 16 日，OpenAI 把计算机操作型智能体放进了医院软件，并报告评审者把 325 项电子病历收件箱任务中的 99% 评为临床安全。给这个比率配上一个分母——每位临床医生每年约 3,220 条消息——它描述的就是一年 32 到 90 次不安全的处置，而支撑它的证据体量只有一位医生一个月的量。价值主张缺的是同一个分母：一项覆盖 983,154 条门户回复的队列研究发现，AI 起草工具在它碰过的消息上快 29.5%，而在整条队列上慢 8.6%——因为一份草稿会在本来没人需要去读的消息上造出审阅工作。',
  ),
  tags: ['agentic-ai', 'computer-use', 'evals', 'safety', 'applications'],
};

export default post;
