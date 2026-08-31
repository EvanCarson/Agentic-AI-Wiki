import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-31',
  slug: 'trust-outran-the-agent-incident-rate',
  title: L(
    '85.5% trust the agent. 41.1% debug it every day.',
    '85.5% 的人信任智能体，41.1% 的人每天都在给它擦屁股',
  ),
  summary: L(
    'Temporal surveyed 554 engineers in April and May 2026 and found daily agent use at 80.8%, up from 47.3% a year earlier, with 91.1% reporting improved productivity and 85.5% trusting agent output at least somewhat — alongside 41.1% hitting agent-related issues daily or more and 9.0% continuously. Both sets of numbers are probably accurate, and together they describe a failure rate nobody would accept from a database. The report reads the gap as a state-tracking problem, which is a durable-execution vendor’s reading of a durable-execution question. The more useful reading is that the error handler is a person, and no dashboard has a line for them.',
    'Temporal 在 2026 年 4 至 5 月调查了 554 名工程师：每日使用智能体的比例为 80.8%，一年前是 47.3%；91.1% 表示生产力有所提升，85.5% 至少在某种程度上信任智能体的产出——与此同时，41.1% 每天或更频繁地遇到智能体相关的问题，9.0% 是「持续遇到」。两组数字大概都是准确的，而它们合起来描述的是一个没人会容忍数据库出现的故障率。报告把这道缺口读作状态追踪问题——那是一家持久化执行厂商对一个持久化执行问题的读法。更有用的读法是：这里的错误处理器是个人，而没有任何看板为他留出一行。',
  ),
  tags: ['agentic-ai', 'observability', 'evals', 'ecosystem', 'developer-tools'],
};

export default post;
