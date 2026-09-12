import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-12',
  slug: 'garak-vs-promptfoo-vs-giskard-vs-deepteam',
  title: L(
    'garak vs Promptfoo vs Giskard vs DeepTeam: none of them reach the tool result',
    'garak、Promptfoo、Giskard 与 DeepTeam：没有一个够得到工具结果',
  ),
  searchTitle: {
    en: 'Open-source LLM red-team tools compared by reach, not probe count',
  },
  summary: L(
    'Every open-source red-team scanner attacks through the channel a user types into. Your agent is attacked through the channel a tool returns on — a retrieved document, an API response, a page it was told to read — and by default not one of these four puts a string there. Pick on reach rather than probe count, then check who still maintains the attack corpus: Microsoft archived PyRIT in March 2026 and OpenAI now owns Promptfoo.',
    '每一款开源红队扫描器攻击的，都是用户打字进去的那条通道。而你的智能体被攻击的，是工具返回数据的那条通道——一份检索到的文档、一次 API 响应、一个它被吩咐去读的页面——而这四款默认没有一款会往那里放一个字符串。按"够得到哪里"来选，而不是按探针数量；然后看清攻击语料还有谁在维护：微软已于 2026 年 3 月封存 PyRIT，而 Promptfoo 如今归 OpenAI 所有。',
  ),
  tags: ['agent-comparison', 'safety', 'open-source', 'prompt-injection', 'evals'],
};

export default post;
