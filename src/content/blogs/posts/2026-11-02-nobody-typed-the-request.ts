import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-02',
  slug: 'nobody-typed-the-request',
  title: L(
    'Nobody typed the request',
    '没有人敲下这条请求',
  ),
  summary: L(
    'DeepSeek published a proactive coding agent on 31 October 2026, and the interesting file is not the code — it is the authorization design next to it, which says plainly that messages and comments are inputs to a decision and cannot change permissions, and that the execution layer is defaults, not a security boundary. When nobody types the request, "who asked?" stops being a given and becomes the only control left.',
    'DeepSeek 在 2026 年 10 月 31 日公开了一个主动式编码智能体，而其中值得细读的文件不是代码，是放在它旁边的授权设计文档：文档直言消息与评论只是决策的输入，无法改变权限；也直言执行层只是默认值，不是安全边界。当没有人敲下这条请求时，「是谁要求的」不再是给定前提，而变成了唯一剩下的控制点。',
  ),
  tags: ['safety', 'agentic-ai', 'coding-agents', 'open-source'],
};

export default post;
