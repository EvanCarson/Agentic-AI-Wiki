import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-28',
  title: L(
    'Five new Concepts: tool design, semantic caching, model routing, data residency, post-training',
    '五则新概念：工具设计、语义缓存、模型路由、数据驻留、后训练',
  ),
  items: [
    L(
      'Designing tools for agents — when an agent misuses a tool the bug is usually yours, not the model\'s. Covers why exposing a REST API one-to-one is the most common production failure, why overlapping tools are worse than missing ones, why error messages are prompts rather than log lines, and the four numbers to measure when iterating on a tool.',
      '《为智能体设计工具》——智能体用错工具时，问题通常出在你身上而不是模型身上。文中讲了为什么把 REST API 一比一暴露出去是最常见的生产事故、为什么工具重叠比工具缺失更糟、为什么报错信息是提示词而非日志行，以及迭代工具时该度量的四个数字。',
    ),
    L(
      'Semantic caching — the one cache in your stack that can return a confidently wrong answer, because it decides a hit by similarity score. Separates the four things called "caching", explains why negation and entity swaps defeat the threshold, lists what must go into the cache key beyond the question, and argues for measuring hit precision in shadow mode instead of hit rate.',
      '《语义缓存》——你技术栈里唯一可能自信地返回错误答案的缓存，因为它靠相似度得分来判定命中。文中区分了被称作「缓存」的四样东西、解释了否定与实体替换为何能击穿阈值、列出了除问题之外还必须写进缓存键的东西，并主张用影子模式度量命中精确率而非命中率。',
    ),
    L(
      'Model routing & cascades — routing only pays when judging difficulty is cheaper and more reliable than answering. Distinguishes static routing, dynamic routing and cascades; works the break-even arithmetic; and explains why published 85%-savings figures come from chat benchmarks and rarely transfer to agent work.',
      '《模型路由与级联》——只有当判断难度比直接作答更便宜、也更可靠时，路由才划算。文中区分了静态路由、动态路由与级联，算了盈亏平衡的账，并说明了为什么那些「省 85%」的公开数字出自对话类基准、很少能迁移到智能体任务上。',
    ),
    L(
      'Data residency & sovereignty — residency is geography, sovereignty is jurisdiction, and a provider\'s region toggle answers only one of four questions. Covers the retention dial (no-training, bounded retention, zero data retention are three separate commitments), the extra edges an agent leaks along, and the four-rung ladder of postures with what each one costs.',
      '《数据驻留与数据主权》——驻留是地理，主权是司法管辖，而提供方的区域开关只回答了四个问题中的一个。文中讲了留存这个旋钮（不训练、有限留存、零数据留存是三条彼此独立的承诺）、智能体额外泄漏的那些边，以及四级姿态阶梯与每一级的代价。',
    ),
    L(
      'Post-training: base model to assistant — refusals, sycophancy, formatting habits and the assistant persona itself are installed after pre-training. Covers the modular stack (SFT, preference optimisation, RL with verifiable rewards), what it explains about the model in front of you, and why pinning versions plus a small behavioural eval is the only real defense.',
      '《后训练：从基座模型到助手》——拒绝、谄媚、排版习惯乃至助手人格本身，都是在预训练之后装上去的。文中讲了这条模块化流水线（SFT、偏好优化、可验证奖励强化学习）、它能解释你眼前模型的哪些事，以及为什么「钉住版本 + 一组小的行为评测」是唯一真正的防线。',
    ),
    L(
      'The Concepts encyclopedia is now 63 entries.',
      '「概念」百科现已收录 63 则条目。',
    ),
  ],
};
export default entry;
