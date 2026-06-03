import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-06-03',
  title: L(
    'New AI Blog post: four open-weights frontier flagships, compared on the axes that actually differ',
    'AI 博客新文章：四款开源权重前沿旗舰，按真正不同的那几条轴对比',
  ),
  items: [
    L(
      'Added "Llama 4 vs DeepSeek V3 vs Qwen3 vs Mistral Large 3" — a diagram-driven comparison that argues the durable choice is the axis each lab is betting on (multimodal ecosystem vs inference economics vs language coverage vs permissive-license frontier intelligence), not the benchmark snapshot.',
      '新增《Llama 4、DeepSeek V3、Qwen3 与 Mistral Large 3》——一份图解对比，主张耐用的选择是各家押注的那条轴（多模态生态 vs 推理经济性 vs 语言覆盖 vs 面向监管的宽松许可证前沿智能），而不是某个基准的快照。',
    ),
    L(
      'Snapshot uses each lab\'s current mid-2026 open-weights flagship version (Llama 4 Scout/Maverick, DeepSeek V3.2, Qwen3-235B-A22B, Mistral Large 3); article calls out the version specifics inline.',
      '快照采用各家在 2026 年中期当前的开源权重旗舰版本（Llama 4 Scout/Maverick、DeepSeek V3.2、Qwen3-235B-A22B、Mistral Large 3）；文中逐处标注具体版本。',
    ),
    L(
      'New tags: model-comparison, frontier-models, self-hosted.',
      '新增标签：model-comparison、frontier-models、self-hosted。',
    ),
  ],
};
export default entry;
