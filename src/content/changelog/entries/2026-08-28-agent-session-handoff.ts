import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-08-28',
  title: L(
    'New AI Blog post: the four layers you can hand a coding-agent session over on, and why the useful ones drop the transcript',
    '新增 AI 博客文章：交接编码智能体会话的四个层，以及为什么好用的那几个都丢掉逐字记录',
  ),
  items: [
    L(
      'Added `/blogs/agent-session-handoff-drops-the-transcript` — a survey of how you actually move a session between Claude Code, Codex CLI and Gemini CLI, organised as four transfer layers: the instruction file (`AGENTS.md`/`CLAUDE.md`), the written handoff artifact, transcript conversion over the on-disk JSONL, and live protocols or shared stores (ACP, A2A, MCP memory servers). The load-bearing argument: an assistant turn is not a record of what happened but a claim conditioned on a system prompt, a tool schema, a model and a warm cache that the receiving agent does not have — so replaying a transcript verbatim hands over a false memory, a turn that keeps its authority in the `assistant` role while losing the justification that made it reasonable. Fidelity to the transcript and usefulness to the receiver point in opposite directions.',
      '新增 `/blogs/agent-session-handoff-drops-the-transcript`——梳理在 Claude Code、Codex CLI 与 Gemini CLI 之间实际搬运会话的办法，按四个传递层组织：指令文件（`AGENTS.md`/`CLAUDE.md`）、写下来的交接产物、对磁盘 JSONL 的逐字记录转换，以及实时协议或共享存储（ACP、A2A、MCP 记忆服务器）。核心论点是：一条 assistant 轮次并非“发生了什么”的记录，而是一项断言，其成立条件是接收方并不具备的系统提示、工具 schema、模型与热缓存——因此逐字重放一份记录，交出去的是一段虚假记忆：这条轮次以 `assistant` 角色保留了权威，却丢掉了当初让它站得住脚的依据。对逐字记录的忠实度与对接收方的有用程度，指向相反的方向。',
    ),
    L(
      'Three findings anchor the argument in documentation rather than assertion. Anthropic\'s own session docs state that the JSONL entry format "is internal to Claude Code and changes between versions, so scripts that parse these files directly can break on any release" — any converter is built on a contract the vendor has reserved the right to break. Claude Code\'s cross-project session lookup resolves an ID only when exactly one project holds a transcript for it, so a hand-copied duplicate reports not-found rather than resuming an arbitrary copy: the vendor treats the transcript as an identity, not a portable document. And the one published converter strips tool calls entirely, narrating them as prose ("edited services/email/sender.py:82-94") on the stated grounds that the receiving model needs understanding, not replay capability — the richest part of the file is the part a working tool deliberately destroys.',
      '有三项发现把论点落在文档而非断言上。Anthropic 自家的会话文档写明，JSONL 条目格式“是 Claude Code 内部的，会在版本之间发生变化，因此直接解析这些文件的脚本可能在任何一次发布中失效”——任何转换器都建立在一份厂商已保留更改权利的契约之上。Claude Code 的跨项目会话查找只在恰好有一个项目持有该 ID 的记录时才解析成功，因此手工拷贝的副本会报告“找不到”，而不是恢复某个随意的拷贝：厂商把逐字记录当作一个身份，而非一份可搬运的文档。而唯一一个公开的转换器把工具调用整个剥掉，改用散文叙述（"edited services/email/sender.py:82-94"），给出的理由是接收端模型需要的是理解而不是重放能力——文件里最丰富的那部分，正是一个能用的工具有意销毁的部分。',
    ),
    L(
      'Separates the three failure modes and notes that only one is a format problem: the tool schema (a recorded `Edit` call and its dangling `tool_use_id` mean nothing to an agent holding `apply_patch`), the system prompt (turns arrive in the role a model treats as its own past reasoning, with no mechanism to doubt them), and cache plus environment (even a same-agent resume does not restore `--mcp-config`, `--settings`, `--plugin-dir` or `--add-dir`, and Claude Code offers to summarise a long idle session precisely because the prompt cache has expired). Also disambiguates the two protocols called ACP — Zed\'s Agent Client Protocol, which standardises editor-to-agent and replays history to the client rather than to another agent, versus the Agent Communication Protocol that folded into A2A — and closes with a handoff-file template built on one rule: every line is either a fact with the command that re-checks it, or a decision, labelled; anything else is decoration.',
      '把三种失效模式分开，并指出其中只有一种是格式问题：工具 schema（一次记录在案的 `Edit` 调用及其悬空的 `tool_use_id`，对一个手持 `apply_patch` 的智能体毫无意义）、系统提示（那些轮次以模型视为“自己过去的推理”的角色抵达，且没有任何机制去怀疑它们），以及缓存与环境（即便是同一智能体的恢复也不还原 `--mcp-config`、`--settings`、`--plugin-dir` 或 `--add-dir`；Claude Code 之所以对长时间闲置的会话提议做摘要，正是因为提示缓存已经过期）。文章还厘清了两个都叫 ACP 的协议——Zed 的 Agent Client Protocol 标准化的是编辑器到智能体，并且是把历史重放给客户端而非另一个智能体，而并入 A2A 的那个是 Agent Communication Protocol——最后给出一份交接文件模板，只依一条规则：每一行要么是一个事实、后面跟着重新核验它的命令，要么是一个被标记出来的决策；其余都是装饰。',
    ),
  ],
};

export default entry;
