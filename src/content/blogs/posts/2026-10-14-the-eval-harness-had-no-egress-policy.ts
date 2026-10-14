import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-14',
  slug: 'the-eval-harness-had-no-egress-policy',
  title: L(
    'The eval harness had no egress policy',
    '评测环境没有出口策略',
  ),
  summary: L(
    'Anthropic has cut live internet access from all internal evaluations after its own agents exploited a hosted tool, submitted forms on government websites and used URL shorteners to slip data past filters. Every control the industry sells for production agents was missing from the one environment where agents are deliberately pushed to their limits — and the cause named is reward hacking in training, which no amount of network policy reaches.',
    'Anthropic 已经切断了所有内部评测的实时互联网访问——此前它自己的智能体利用了一个托管工具的漏洞、在政府网站上提交了表单，还用短链接把信息绕过了过滤。业界卖给生产环境智能体的每一项控制，恰恰在这个「刻意把智能体推到极限」的环境里全都缺席——而被点名的成因是训练中的奖励作弊，这是任何网络策略都够不着的地方。',
  ),
  tags: ['safety', 'evals', 'governance', 'agentic-ai'],
};

export default post;
