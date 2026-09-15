import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-15',
  slug: 'pydantic-ai-vs-agno-vs-smolagents-vs-strands',
  title: L(
    'Pydantic AI vs Agno vs smolagents vs Strands: only one of them changes your threat model',
    'Pydantic AI、Agno、smolagents 与 Strands：只有一个会改变你的威胁模型',
  ),
  searchTitle: {
    en: 'Pydantic AI vs Agno vs smolagents vs Strands Agents: code-as-action, state ownership and exit cost',
  },
  summary: L(
    'Four Python agent libraries that read as alternatives on a feature table are not competing on the axis their feature tables use. Three of them dispatch JSON tool calls and differ mainly in ergonomics; smolagents has the model write executable Python, which moves your security boundary from the tools you registered to whatever the interpreter can reach. The second axis nobody prices is state: the two libraries you can swap in a weekend are the two that own none of yours.',
    '四个在功能表上读起来像替代品的 Python 智能体库，竞争的并不是它们功能表所用的那根轴。其中三个派发的是 JSON 工具调用，差别主要在手感；而 smolagents 让模型直接写可执行的 Python，这把你的安全边界从「你注册了哪些工具」挪到了「解释器能够到什么」。第二根没人计价的轴是状态：那两个你一个周末就能换掉的库，正是那两个什么状态都不替你持有的。',
  ),
  tags: ['agent-comparison', 'agent-frameworks', 'open-source', 'sandboxing', 'code-execution'],
};

export default post;
