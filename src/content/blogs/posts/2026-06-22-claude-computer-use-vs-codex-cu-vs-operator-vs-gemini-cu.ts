import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-22',
  slug: 'claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu',
  title: L(
    'Claude Computer Use (post-Vercept) vs Codex Background CU vs Operator vs Gemini: Four Bets on Letting AI Drive the Mouse',
    'Claude Computer Use（收购 Vercept 后）、Codex 后台 CU、Operator 与 Gemini：四种让 AI 自己操作鼠标的下注方式',
  ),
  summary: L(
    '72.5% on OSWorld is the new floor, not a milestone — and three labs have made architecturally opposite bets on where the mouse should live. Pick the wrong one and you fight your sandbox forever; pick the right one and the model does in two minutes what your RPA stack does in two weeks.',
    '在 OSWorld 上拿到 72.5% 已经是地板而非里程碑——而三家实验室在"鼠标应该跑在哪里"这件事上做了架构上完全相反的下注。选错了就要永远跟自己的沙箱搏斗；选对了，模型两分钟能做完你 RPA 栈两周的活。',
  ),
  tags: ['agent-comparison', 'frontier-models', 'computer-use', 'browser-agents'],
};

export default post;
