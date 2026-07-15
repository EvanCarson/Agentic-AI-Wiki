import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-15',
  title: L(
    'Enhance: wove the new 2026 concept pages into the existing beginner ladder',
    '优化：把 2026 年新增的概念页面编入既有的入门阶梯',
  ),
  items: [
    L(
      'Added contextual inbound links from seven established Concept pages (context windows, RAG, tool calling, tools/actions/environments, prompting basics, training vs inference, autonomy levels) into the five new pages shipped this week — MCP, agent memory, computer use, context engineering, and fine-tuning vs RAG vs prompting.',
      '从七个既有概念页面（上下文窗口、RAG、工具调用、工具/动作/环境、提示词基础、训练与推理、自主性等级）向本周新增的五个页面——MCP、智能体记忆、计算机操作、上下文工程，以及微调 vs RAG vs 提示词——加入了贴合语境的入站链接。',
    ),
    L(
      'These links close the discoverability gap: a reader on an established fundamental now reaches the newer material in context, instead of the new pages only linking outward.',
      '这些链接弥合了可发现性的缺口：读者在既有基础页面上即可顺着语境抵达更新的内容，而不再是新页面只单向向外链接。',
    ),
  ],
};
export default entry;
