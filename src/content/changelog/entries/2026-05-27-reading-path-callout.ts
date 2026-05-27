import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-27',
  title: L(
    'Reading-path callout on Concepts and Deep-Dives index pages',
    '在「概念」与「深度剖析」首页加入阅读路径提示',
  ),
  items: [
    L(
      'Concepts index now opens with a "New here?" callout that names a five-entry core reading path (LLM → agent → loop → tool-calling → RAG) as a chip-list, plus an escape line pointing at the guided Field Guide.',
      '「概念」首页新增「新手入门？」提示卡，将推荐的五条核心阅读路径（LLM → 智能体 → 智能体循环 → 工具调用 → RAG）以胶囊列表呈现，并附「实战指南」完整引导路径出口。',
    ),
    L(
      'Deep-Dives index shows a one-line redirect: "These essays assume Concepts fluency — new here? Start with Concepts →" so newcomers do not bounce off a flat list of advanced essays.',
      '「深度剖析」首页加入一行重定向：「这些文章默认你已掌握『概念』—— 还是新手？先看概念 →」，避免新读者面对一长串高阶文章而流失。',
    ),
    L(
      'Copy lives in src/i18n/ui.ts (bilingual); the five core slugs are exported as CORE_PATH_SLUGS from the Concepts manifest, so renaming an entry only touches one file. Closes #46.',
      '所有文案位于 src/i18n/ui.ts（双语）；五条核心路径以 CORE_PATH_SLUGS 从「概念」清单导出，词条重命名时只需改一个文件。Closes #46。',
    ),
  ],
};
export default entry;
