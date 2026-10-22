import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-22',
  slug: 'the-inbox-became-the-prompt',
  title: L(
    'The inbox became the prompt',
    '收件箱成了那条提示',
  ),
  summary: L(
    "Claude Duet, opened as a US research preview on 21 October 2026, checks your connected apps every few hours and asks approval before it sends, pays, signs or deletes. The approvals are well placed and they sit on the wrong half of the run: deleting the user's prompt also deleted the scope and the authorisation, so what now starts a run is whatever someone chose to send you — and nobody approves a read.",
    'Claude Duet 于 2026 年 10 月 21 日在美国以研究预览开放，它每隔几个小时检查你已连接的应用，并在发送、支付、签署或删除之前征求批准。那些批准放对了位置，却守在这次运行的错误那一半上：删掉用户那条提示的同时，也删掉了作用域与授权——于是现在启动一次运行的，是别人选择发给你的任何东西，而没有人会去批准一次阅读。',
  ),
  tags: ['agentic-ai', 'agent-ux', 'safety', 'prompt-injection', 'ecosystem'],
};

export default post;
