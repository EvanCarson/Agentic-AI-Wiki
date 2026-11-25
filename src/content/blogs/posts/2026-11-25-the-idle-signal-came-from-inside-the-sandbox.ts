import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-25',
  slug: 'the-idle-signal-came-from-inside-the-sandbox',
  title: L(
    'The idle signal came from inside the sandbox',
    '那个“我空闲了”的信号，是从沙箱里面发出来的',
  ),
  summary: L(
    'Google\'s Agent Compute Engine, announced 22 October 2026, pauses an agent\'s microVM between steps — and the trigger is the guest\'s own signal that it has finished a tool call. Moving the idle decision inside the box is the right design for a four-hour approval wait and the wrong one for a sub-second thinking phase, because suspend and resume are not free: the companion Agent Substrate numbers are 500 activations per second at under 500 ms each.',
    'Google 在 2026 年 10 月 22 日宣布的 Agent Compute Engine，会在步骤之间把智能体的 microVM 暂停——而触发它的，是客体自己发出的“这次工具调用做完了”。把“是否空闲”这个判断挪进盒子里，对一次四小时的人工审批等待是对的设计，对一次不到一秒的思考阶段则是错的，因为挂起与恢复并不免费：同场发布的 Agent Substrate 给出的数字是每秒 500 次激活、每次低于 500 毫秒。',
  ),
  tags: ['agentic-ai', 'infrastructure', 'cost', 'sandboxing', 'ecosystem'],
};

export default post;
