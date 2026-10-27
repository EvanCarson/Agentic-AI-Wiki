import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-17',
  title: L(
    'New deep dive: skills vs subagents vs MCP vs hooks — which one should I use?',
    '新深入解析：技能、子智能体、MCP 还是钩子——该用哪个？',
  ),
  items: [
    L(
      'Tool & Capability Design gains K14, a question page that answers in its first sentence: a hook for what must happen every time, MCP to reach a system, a skill for know-how, a subagent for noisy work, an instruction file for what every turn needs — and a plugin only packages them.',
      '“工具与能力设计”新增 K14，一篇在第一句话就给出答案的问答页：必须每次发生的用钩子，要触达系统用 MCP，传授做法用技能，嘈杂的活交给子智能体，每轮都需要的写进指令文件——插件只负责打包。',
    ),
    L(
      'Includes a six-question decision procedure and a comparison grid, and argues that the deciding axis is who pulls the trigger rather than context cost: Claude Code now defers MCP schemas by default, and only a hook runs without the model choosing to run it.',
      '页面包含一套六问决策流程和一张对照表，并论证决定性的轴是谁来扣扳机，而不是上下文成本：Claude Code 如今默认推迟载入 MCP schema，而只有钩子的运行不取决于模型的选择。',
    ),
    L(
      'Checks the same names across Claude Code, Codex and Cursor: Codex spawns subagents only when asked while the other two delegate on their own, and Codex documents its hooks as a guardrail rather than a complete enforcement boundary.',
      '在 Claude Code、Codex 和 Cursor 之间逐一核对同名机制：Codex 只在被要求时才派生子智能体，另外两者会自行委派；Codex 也写明其钩子是一道护栏，而不是完整的强制边界。',
    ),
  ],
  lines: ['dd'],
};

export default entry;
