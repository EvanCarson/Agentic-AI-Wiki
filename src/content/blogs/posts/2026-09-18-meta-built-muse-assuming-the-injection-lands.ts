import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-18',
  slug: 'meta-built-muse-assuming-the-injection-lands',
  title: L(
    'Meta built Muse assuming the injection lands — and priced the rest at $130,000',
    'Meta 是假定「注入会得手」来造 Muse 的——剩下的部分标价 13 万美元',
  ),
  searchTitle: { en: 'Meta Muse security architecture explained' },
  summary: L(
    'The per-user VM is the headline and the least interesting layer. Everything load-bearing in Muse sits downstream of a successful prompt injection — brokered credentials the model never sees, a gatekeeper process the agent cannot argue with, kernel-level taint on anything that read your data — and the bounty schedule says so out loud. The residual risk is not exfiltration; it is the harmful action that travels over an approved channel to an approved destination.',
    '每用户一台虚拟机是标题，也是最不有趣的一层。Muse 里真正吃力的东西全都坐落在「提示注入已经得手」之后——模型永远看不到的中介凭据、智能体没法与之讲道理的把关进程、对读过你数据的一切打在内核层的污染标记——而那份赏金表把这一点直接说了出来。剩下的风险不是外泄，而是那个走在获准通道上、飞向获准目的地的有害动作。',
  ),
  tags: ['prompt-injection', 'safety', 'agentic-ai', 'ecosystem'],
};

export default post;
