import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-11',
  slug: 'langcache-vs-gptcache-vs-portkey-vs-cloudflare-ai-gateway',
  title: L(
    'Redis LangCache vs GPTCache vs Portkey vs Cloudflare AI Gateway',
    'Redis LangCache vs GPTCache vs Portkey vs Cloudflare AI Gateway',
  ),
  summary: L(
    'Every answer-reuse layer sells a hit rate, and a hit rate is a threshold setting — the number nobody publishes is the hit rate at a tolerated wrong-answer rate, which is the only form of it you can act on. Portkey documents the honest spec of this whole category by accident: its semantic cache applies only to requests under 8,191 tokens with four or fewer messages, which describes the first turn of a chat and excludes every agent loop. As of November 2026 the managed option is in public preview, the popular open-source one has no tagged release since 2024, and the edge option does exact match only.',
    '每一层「答案复用」卖的都是命中率，而命中率其实是一个阈值设定——真正没人公布的数字是「在可容忍的错答率下的命中率」，而那才是你唯一能据以行动的形式。Portkey 无意间给整个品类写下了诚实的规格说明：它的语义缓存只作用于 token 数低于 8,191、消息不超过四条的请求——这描述的是一段对话的第一轮，并排除了所有智能体循环。截至 2026 年 11 月，托管方案仍在公开预览，最流行的开源方案自 2024 年起没有发过正式版本，而边缘方案只做精确匹配。',
  ),
  tags: ['agent-comparison', 'cost', 'infrastructure', 'ecosystem', 'open-source'],
};

export default post;
