import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-31',
  slug: 'the-ide-kept-the-tools-and-rented-the-agent',
  title: L(
    'The IDE kept the tools and rented the agent',
    'IDE 留下了工具，把智能体租了进来',
  ),
  summary: L(
    'Google shipped its own coding agent and then, at the Android Dev Summit on 28–29 October 2026, opened the same window in Android Studio to more than forty competing ones over the Agent Client Protocol — Anthropic\'s Claude Agent and OpenAI\'s Codex among them. Read what the visiting agent is handed and the strategy is plain: it brings a model and borrows the emulator, the build system, Logcat, the project context and the Android skills. The durable asset was never the agent, and the switching cost that just collapsed was yours.',
    'Google 先是发布了自己的编程智能体，然后在 2026 年 10 月 28–29 日的 Android Dev Summit 上，通过 Agent Client Protocol 把 Android Studio 里同一个窗口开放给了四十多个竞争对手——其中包括 Anthropic 的 Claude Agent 与 OpenAI 的 Codex。看一看那个来访的智能体被递到手里的是什么，策略就很清楚了：它带来一个模型，然后借走模拟器、构建系统、Logcat、项目上下文与 Android skills。那个耐久的资产从来就不是智能体，而刚刚坍塌掉的那份切换成本是你的。',
  ),
  tags: ['ecosystem', 'developer-tools', 'coding-agents', 'protocols', 'agentic-ai'],
};

export default post;
