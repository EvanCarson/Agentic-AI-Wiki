import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-20',
  slug: 'the-grant-became-a-score',
  title: L(
    'The grant became a score, and the score is not in your logs',
    '授权变成了一个分数，而这个分数不在你的日志里',
  ),
  summary: L(
    "Microsoft's 19 October agent controls withdraw an agent's write access as a continuously computed risk score climbs. The containment beats a standing grant; the evidence does not survive the swap, because a grant is readable before the act and a score is only visible after it moves.",
    '微软 10 月 19 日发布的智能体控制，会随着持续计算出的风险分数上升而收回智能体的写权限。论围堵，它胜过长期常驻授权；但证据没能一起熬过这次替换——授权在动作发生前就可读，而分数只有在它变动之后才看得见。',
  ),
  tags: ['governance', 'safety', 'agentic-ai', 'ecosystem'],
};

export default post;
