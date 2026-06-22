import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-22',
  slug: 'claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1',
  title: L(
    'Claude Mythos 5 vs GPT-5.6 vs Gemini 3.2 vs Qwen 3.7 vs DeepSeek V4.1: The June 2026 Frontier Refresh',
    'Claude Mythos 5、GPT-5.6、Gemini 3.2、Qwen 3.7 与 DeepSeek V4.1：2026 年 6 月的前沿模型大刷新',
  ),
  summary: L(
    'Five frontier-tier models shipped inside a two-week window in June 2026. The differences are no longer about who tops MMLU — each lab is now betting on a different axis: agentic computer use, reasoning cost, multimodal latency, or pure price floor. Pick the axis before you pick the model.',
    '2026 年 6 月，五款前沿级模型在两周窗口内集中发布。差距早已不是谁登顶 MMLU——每家实验室如今押注的是不同的轴：智能体计算机操作、推理成本、多模态延迟，或纯粹的价格底线。先选好轴，再选模型。',
  ),
  tags: ['model-comparison', 'frontier-models', 'closed-source', 'open-source'],
};

export default post;
