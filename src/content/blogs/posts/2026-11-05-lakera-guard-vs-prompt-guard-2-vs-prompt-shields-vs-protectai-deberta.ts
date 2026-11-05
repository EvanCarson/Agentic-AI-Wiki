import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-05',
  slug: 'lakera-guard-vs-prompt-guard-2-vs-prompt-shields-vs-protectai-deberta',
  title: L(
    'Lakera Guard vs Prompt Guard 2 vs Prompt Shields vs ProtectAI DeBERTa: every ranking is self-reported',
    'Lakera Guard vs Prompt Guard 2 vs Prompt Shields vs ProtectAI DeBERTa：每一份排名都是自报的',
  ),
  summary: L(
    "The only benchmark that scores all four of these on the same inputs is maintained by the vendor that tops it, its methodology notes are over 500 days old, and the figures everyone quotes predate the 2026 model versions. Meanwhile the two numbers that actually decide the deployment — your false-positive rate on your own traffic, and the latency the detector adds to every tool result — appear on no leaderboard at all, and the benchmark built to measure over-blocking is adversarially constructed by its authors' own account. So pick on licence, placement and latency, which are knowable, and measure accuracy yourself, which nobody can do for you.",
    '唯一在相同输入上给这四个都打过分的基准，由排在榜首的那家厂商自己维护，其方法说明已有五百多天，而所有人引用的那些数字早于 2026 年的各个模型版本。与此同时，真正决定部署的那两个数字——你自家流量上的误报率，以及这个检测器给每一次工具结果加上的延迟——压根不在任何排行榜上；而那个为衡量过度拦截而建的基准，按其作者自己的说法是对抗性构造的。所以请按许可证、放置位置与延迟来挑，这些是可知的；准确率自己测，这件事没人能替你做。',
  ),
  tags: ['agent-comparison', 'prompt-injection', 'guardrails', 'safety', 'evals'],
};

export default post;
