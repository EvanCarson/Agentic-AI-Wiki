import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-31',
  slug: 'pydantic-ai-vs-openai-agents-vs-langchain-vs-claude-agent-sdk',
  title: L(
    'Pydantic AI vs OpenAI Agents SDK vs LangChain vs Claude Agent SDK',
    'Pydantic AI vs OpenAI Agents SDK vs LangChain vs Claude Agent SDK',
  ),
  summary: L(
    'All four hand you a typed object, and all four disagree about what happens when the model\'s answer does not fit it. Pydantic AI feeds the validation error back and retries on a budget; the OpenAI Agents SDK raises by default; and in LangChain\'s create_agent the retry handler applies to ToolStrategy, while a bare Pydantic model auto-selects the provider path that does not retry — so the most ergonomic declaration is the one that gives up. Which default you inherited decides whether your bad-output tail lands in an exception handler, on your token bill, or in front of a user.',
    '四者都递给你一个带类型的对象，而四者对「模型的答案装不进这个类型时会怎样」的看法都不一样。Pydantic AI 把校验错误喂回去、在预算内重试；OpenAI Agents SDK 默认抛异常；而在 LangChain 的 create_agent 里，重试处理器作用于 ToolStrategy，可一个裸的 Pydantic 模型会自动选中那条不重试的 provider 路径——于是最顺手的那种声明方式，恰恰是会放弃的那一种。你继承到的是哪个默认值，决定了你那条坏输出的长尾落在异常处理器里、落在你的 token 账单上，还是落在用户面前。',
  ),
  tags: ['agent-comparison', 'agent-frameworks', 'structured-outputs', 'developer-tools', 'agentic-ai'],
};

export default post;
