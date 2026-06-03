import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-03',
  slug: 'llama-4-vs-deepseek-v3-vs-qwen3-vs-mistral-large-3',
  title: L(
    'Llama 4 vs DeepSeek V3 vs Qwen3 vs Mistral Large 3: Four Open-Weights Flagships, Four Different Bets',
    'Llama 4、DeepSeek V3、Qwen3 与 Mistral Large 3：四款开源权重旗舰，四种不同的下注方式',
  ),
  summary: L(
    'Every few months, four labs ship a similar-sounding open-weights flagship — MoE, long context, reasoning mode, multimodal. The benchmarks keep getting passed back and forth. The thing that actually decides which one you run in production is the axis each lab is betting on next: multimodal ecosystem, inference economics, agentic reasoning, or permissive-license frontier intelligence.',
    '每隔几个月，四家实验室就会发布一款听上去差不多的开源权重旗舰——MoE、长上下文、推理模式、多模态，基准成绩也在彼此之间反复易手。可真正决定你在生产环境中跑哪一款的，是各家下一步押注的那条轴：多模态生态、推理经济性、智能体推理，还是宽松许可下的前沿能力。',
  ),
  tags: ['model-comparison', 'open-source', 'frontier-models', 'self-hosted'],
};

export default post;
