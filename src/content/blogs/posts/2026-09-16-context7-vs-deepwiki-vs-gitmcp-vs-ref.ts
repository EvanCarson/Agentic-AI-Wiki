import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-16',
  slug: 'context7-vs-deepwiki-vs-gitmcp-vs-ref',
  title: L(
    'Context7 vs DeepWiki vs GitMCP vs Ref: your agent’s documentation is somebody else’s index',
    'Context7、DeepWiki、GitMCP 与 Ref：你的智能体读的文档，是别人家的索引',
  ),
  summary: L(
    'Four MCP servers exist to stop a coding agent writing code against an API it half-remembers, and all four work. The axis that decides whether they help is what kind of text comes back: upstream files, snippets extracted from upstream, or prose a model wrote about the code. And none of them closes the failure they are sold against — your agent still does not know which version you run, because none of them reads your lockfile and one of them makes the version a sentence in the prompt.',
    '有四个 MCP 服务端，存在的意义都是不让编码智能体照着它一知半解的 API 写代码，而且四个都管用。真正决定它们帮不帮得上忙的那根轴是：回来的是哪一种文本——上游文件、从上游抽出来的片段，还是模型写的关于这份代码的散文。而它们谁都没有堵上自己被拿来对治的那处失效：你的智能体依然不知道你跑的是哪个版本，因为没有一个会去读你的 lockfile，其中还有一个把版本变成了提示词里的一句话。',
  ),
  tags: ['agent-comparison', 'coding-agents', 'developer-tools', 'mcp', 'open-source'],
};

export default post;
