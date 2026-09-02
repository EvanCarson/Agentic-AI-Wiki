import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-02',
  slug: 'a-skipped-purchase-is-not-a-deployment',
  title: L(
    'A skipped purchase is not a deployment',
    '省下的一次采购，不等于一次上线',
  ),
  summary: L(
    "McKinsey's 2026 survey found 32% of organisations declined at least one software purchase because agentic coding tools could build it internally. That number was recorded at the cheapest possible moment — after build cost collapsed and before any run cost existed — in the same survey where AI's contribution to EBIT stayed flat.",
    '麦肯锡 2026 年的调查发现，32% 的组织至少放弃了一次软件采购，因为智能体编码工具可以在内部把它做出来。而这个数字是在最便宜的那个时刻记录下来的——建造成本刚刚坍塌、运行成本还一分未生——就在同一份调查里，AI 对 EBIT 的贡献纹丝未动。',
  ),
  tags: ['cost', 'ecosystem', 'coding-agents', 'agentic-ai'],
};

export default post;
