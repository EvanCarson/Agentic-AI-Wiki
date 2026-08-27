import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-27',
  slug: 'the-ai-agent-act-wants-an-authority-record',
  title: L(
    'The AI AGENT Act Asks for a Record Your Stack Does Not Keep',
    '《AI AGENT 法案》要的那份记录，你的栈根本不存',
  ),
  summary: L(
    'S. 5051 would require an agent acting for a person to keep real-time records, stay inside its granted authority, and never sub-delegate without explicit permission. Traces record behaviour; all three duties are about permission — which is why the bill hands NIST the job of finding a delegation protocol that does not exist.',
    'S. 5051 将要求代表个人行事的智能体保留实时记录、只在被授予的权限内行动、未经明确许可不得转委派。链路追踪记的是行为，而这三项义务讲的都是权限——这也正是法案把「去找一套委派协议」的差事交给 NIST 的原因：那套协议并不存在。',
  ),
  tags: ['regulation', 'governance', 'agentic-ai', 'protocols', 'ecosystem'],
};

export default post;
