import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-19',
  slug: 'bootstrapfewshot-vs-miprov2-vs-gepa-vs-textgrad',
  title: L(
    'BootstrapFewShot vs MIPROv2 vs GEPA vs TextGrad: your metric picks the optimizer',
    'BootstrapFewShot vs MIPROv2 vs GEPA vs TextGrad：挑优化器的其实是你的指标',
  ),
  summary: L(
    'GEPA\'s reported margins — up to 20% over GRPO, 13% over MIPROv2 — were all measured where an automatic checker was free and a failed run could be described in words. Two of these four optimizers run on a bare scalar; two need a sentence. What your eval function returns decides which half of the field you can use, so change the metric before you change the optimizer.',
    'GEPA 报出的优势幅度——较 GRPO 最多 20%、较 MIPROv2 13%——全都测在自动检查器免费、且失败运行可以被用词句描述的场景上。这四个优化器里，两个靠一个裸标量就能跑，两个需要一句话。你的评测函数返回什么，决定了你能用上这个领域的哪一半；所以先改指标，再改优化器。',
  ),
  tags: ['agent-comparison', 'evals', 'developer-tools', 'open-source', 'orchestration'],
};

export default post;
