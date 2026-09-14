import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-14',
  slug: 'full-duplex-deletes-the-turn',
  title: L(
    'Full duplex deletes the turn — and the turn was your commit point',
    '全双工删掉了「轮次」——而轮次正是你的提交点',
  ),
  searchTitle: {
    en: 'GPT-Live-1 full-duplex voice: what breaks when end-of-turn stops firing',
  },
  summary: L(
    'GPT-Live-1 landed in the API on 10 September and listens while it speaks, which reads as a naturalness upgrade and is actually a schema change. End-of-turn was the event your voice agent used to decide when to call a tool, when to write a log line, when to run a guardrail and when to stop the meter — and a full-duplex model never fires it. The fix is not a better threshold; it is naming your own commit points and pricing a meter that now runs on wall clock instead of speech.',
    'GPT-Live-1 于 9 月 10 日进入 API，能一边听一边说。这读起来像一次自然度升级，实则是一次结构变更。「轮次结束」曾是你的语音智能体用来决定何时调工具、何时写日志、何时跑护栏、何时停表的那个事件——而一个全双工模型根本不会发出它。补救之道不是调一个更好的阈值，而是自己把提交点命名出来，并为一块如今按墙上时钟而非按说话计费的表重新算账。',
  ),
  tags: ['voice-agents', 'realtime', 'agentic-ai', 'infrastructure', 'cost'],
};

export default post;
