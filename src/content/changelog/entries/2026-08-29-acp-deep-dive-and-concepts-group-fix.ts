import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-08-29',
  title: L(
    'New Deep-Dive on the Agent Client Protocol, and a fix that merges a stray Concepts group',
    '新增 Agent Client Protocol 深入解析，并修复一个游离的概念分组',
  ),
  items: [
    L(
      'Added `/deep-dives/protocols-and-interop/agent-client-protocol` (P13) — Zed\'s ACP, the protocol that lets Claude Code, Codex CLI and Gemini CLI all run inside one editor window. The load-bearing argument: ACP inverts who owns the filesystem. An ACP agent may not touch the disk directly; it calls `fs/read_text_file` and `fs/write_text_file` and the client performs the operation. The stated motivation is mundane — a developer\'s unsaved buffer differs from disk, and an agent that reads the file edits a stale copy and destroys the unsaved work on write — but the second stated reason carries the architecture: routing through the client lets the client track every modification. Undo/redo, change previews, per-file diffs and selective application then become implementable once, in the editor, and work identically for every ACP agent, including ones reached through an adapter. The essay is explicit that this buys a uniform client-side policy surface and *not* containment: the agent is still a subprocess with ambient OS authority, so ACP\'s filesystem methods are a cooperative contract, not a sandbox.',
      '新增 `/deep-dives/protocols-and-interop/agent-client-protocol`（P13）——Zed 的 ACP，也就是让 Claude Code、Codex CLI 与 Gemini CLI 能跑在同一个编辑器窗口里的那份协议。核心论点是：ACP 把“谁拥有文件系统”反了过来。ACP 智能体不得直接碰磁盘，它调用 `fs/read_text_file` 与 `fs/write_text_file`，由客户端执行该操作。官方动机很朴素——开发者未保存的缓冲区与磁盘并不一致，直接读文件的智能体编辑的是一份过期副本，写回时便毁掉了未保存的工作——但真正撑起架构的是第二条理由：经由客户端中转，客户端才得以追踪每一次修改。于是撤销/重做、变更预览、逐文件 diff 与选择性应用都只需在编辑器里实现一次，随后对每一个 ACP 智能体都同样奏效，包括那些只能经由适配器触达的。文章明确指出这买到的是统一的客户端策略面，而*不是*隔离：智能体仍是一个握有操作系统环境权限的子进程，所以 ACP 的文件系统方法是一份协作契约，不是沙箱。',
    ),
    L(
      'The essay also disambiguates the two protocols that share the acronym ACP — Zed\'s **Agent Client Protocol** (client-to-agent, created August 2025, JetBrains joined, registry co-launched January 2026, 40+ agents listed) versus the **Agent Communication Protocol** that went to the Linux Foundation in July 2025 and folded into A2A, already covered at P10. It walks the `initialize` handshake (integer MAJOR-only version negotiation, and the rule that any capability omitted MUST be treated as unsupported), the prompt turn (`session/prompt` → streamed `session/update` notifications carrying message chunks, tool calls, plans and mode changes → a stop reason), and closes on the three seams: ACP is client-to-agent, MCP is agent-to-tools, A2A is agent-to-agent. Note that `session/load` replays history from the *agent to the client* so the editor can repaint a thread it does not store — which is why running two agents in one window gives two sessions, not one shared one.',
      '文章还厘清了共用 ACP 这个缩写的两份协议——Zed 的 **Agent Client Protocol**（客户端到智能体，2025 年 8 月创建，JetBrains 随后加入，2026 年 1 月共同推出注册表，已列出 40 多个智能体），与 2025 年 7 月被交给 Linux 基金会、随后并入 A2A 的 **Agent Communication Protocol**（后者已在 P10 有记述）。文中走了一遍 `initialize` 握手（只有 MAJOR 的整数版本协商，以及“任何被省略的能力都必须视为不支持”这条规则）、提示轮次（`session/prompt` → 流式的 `session/update` 通知，承载消息分片、工具调用、计划与模式变更 → 一个停止原因），并以三道接缝收尾：ACP 是客户端到智能体，MCP 是智能体到工具，A2A 是智能体到智能体。请留意 `session/load` 是把历史从*智能体重放给客户端*，好让编辑器重画一条它并不存储的线程——这也正是在同一个窗口里跑两个智能体只会得到两个会话、而非一个共享会话的原因。',
    ),
    L(
      'Fixed a Concepts index defect: three entries — Uncertainty & Calibration, Chain-of-Thought Faithfulness, and Refusals & Capability Gating — carried the group label "Core Building Blocks" while the other 21 carried "Building Blocks", so the index rendered two separate headings and stranded those three in a stub section of their own. Their own fragments were already numbered B21–B23, continuing the Building Blocks series, which confirms the label was the drift. All 24 now sit in one group; the encyclopedia\'s four groups are Agentic AI (22), AI Ecosystem (21), AI Foundations (19) and Building Blocks (24), totalling 86 entries.',
      '修复了概念索引的一处缺陷：其中三条——不确定性与校准、思维链忠实性、拒绝与能力门禁——带的分组标签是“核心构件”，而另外 21 条带的是“基础构件”，于是索引渲染出两个各自独立的标题，把那三条困在了一个只有它们的残段里。这三份内容片段本身的编号已经是 B21–B23，正接续着基础构件系列，可见走偏的是标签。现在 24 条同处一组；百科的四个分组为智能体 AI（22）、AI 生态（21）、AI 基础（19）与基础构件（24），共计 86 条。',
    ),
  ],
};

export default entry;
