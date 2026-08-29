import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-28',
  slug: 'agent-session-handoff-drops-the-transcript',
  title: L(
    'Sharing a coding-agent session: every handoff that works throws the transcript away',
    '共享编码智能体会话：每一种真正好用的交接，都把逐字记录扔了',
  ),
  summary: L(
    'Claude Code, Codex and Gemini CLI all persist sessions as append-only JSONL, so moving one to another agent looks like a file-conversion problem. It is not. An assistant turn is a claim conditioned on a system prompt, a tool schema, a model and a warm cache that the receiving agent does not have — replay it verbatim and you hand over a false memory. The one converter in the wild strips tool calls into prose on purpose, Anthropic documents its own transcript format as internal and unstable, and Claude Code refuses to resume a hand-copied transcript at all. Four transfer layers, and the useful ones all trade fidelity for something the receiver can re-verify against the repo.',
    'Claude Code、Codex 与 Gemini CLI 都把会话持久化为只追加的 JSONL，于是"把一个会话搬到另一个智能体"看上去像个文件格式转换问题。并不是。一条 assistant 轮次是一项断言，它以接收方并不具备的系统提示、工具 schema、模型和热缓存为条件——逐字重放，你交出去的是一段虚假记忆。现实中唯一那个转换器是有意把工具调用压成散文的，Anthropic 自己把逐字记录格式标注为内部且不稳定，而 Claude Code 干脆拒绝恢复一份手工拷贝过来的记录。四个传递层，真正有用的那几个都在拿保真度换一样东西：接收方能对着仓库重新验证的依据。',
  ),
  tags: ['coding-agents', 'protocols', 'developer-tools', 'ecosystem'],
};

export default post;
