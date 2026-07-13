import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'protocols-and-interop',
  order: 20,
  name: L('Protocols & Interop', '协议与互操作'),
  groupSummary: L('The protocol layer of the agent stack — MCP, A2A, tool-calling standards, capability discovery — and how systems plug together.', '智能体栈的协议层——MCP、A2A、工具调用标准、能力发现——以及系统如何互联。'),
  entries: [
    { page: 'interop-problem', slug: 'interop-problem', title: L('Why Interop Matters: The M×N Problem','互操作为何重要：M×N 问题'), summary: L('How connecting M agents to N systems by hand explodes, and why a protocol layer is the structural fix.','手工把 M 个智能体连接到 N 个系统为何会爆炸，以及为什么协议层是结构性解法。') },
    { page: 'tool-calling-standards', slug: 'tool-calling-standards', title: L('Tool Calling Standards: JSON Schema','工具调用标准：JSON Schema'), summary: L('The universal declare/select/execute/return contract, the portable JSON Schema core, and where providers differ.','通用的声明/选择/执行/返回契约、可移植的 JSON Schema 核心，以及厂商差异所在。') },
    { page: 'mcp-architecture', slug: 'mcp-architecture', title: L('MCP: Hosts, Clients, Servers','MCP：宿主、客户端、服务器'), summary: L('The Model Context Protocol participant model, resources/tools/prompts, JSON-RPC lifecycle, and transports.','模型上下文协议的参与者模型、资源/工具/提示、JSON-RPC 生命周期与传输方式。') },
    { page: 'a2a-communication', slug: 'a2a-communication', title: L('Agent-to-Agent Communication','智能体间通信'), summary: L('Delegating to opaque peer agents: Agent Cards, tasks, messages, artifacts, and long-running work.','向不透明的对端智能体委派：智能体卡片、任务、消息、产物与长时间运行的工作。') },
    { page: 'structured-tool-io', slug: 'structured-tool-io', title: L('Structured Tool I/O & Validation','结构化工具 I/O 与校验'), summary: L('Input and output as two trust boundaries: structural-then-semantic validation, and why typed output is still untrusted.','输入与输出作为两道信任边界：先结构后语义的校验，以及为何类型化输出仍不可信。') },
    { page: 'capability-discovery', slug: 'capability-discovery', title: L('Capability Discovery & Negotiation','能力发现与协商'), summary: L('Runtime discovery, feature-test version negotiation, and why discovery describes ability not permission.','运行时发现、特性探测式版本协商，以及为何发现描述的是能力而非许可。') },
    { page: 'building-interoperable-agents', slug: 'building-interoperable-agents', title: L('Building an Interoperable Agent','构建可互操作的智能体'), summary: L('Comparing tool calling, MCP, and A2A; a decision rule and one normalised registry architecture.','比较工具调用、MCP 与 A2A；一条决策规则与一个归一化注册表架构。') },
    { page: 'a2a-v1-deep-dive', slug: 'a2a-v1-deep-dive', title: L('A2A v1.0: Task Lifecycle, Messages, Artifacts','A2A v1.0：任务生命周期、消息、产物'), summary: L("A2A hit v1.0 in April 2026 — nine task states (not four), Message vs Artifact split, A2A-Version header, breaking changes from pre-1.0, and 150+ org adoption.",'A2A 于 2026 年 4 月发布 v1.0——九种任务状态（不是四种）、Message 与 Artifact 之分、A2A-Version 头、pre-1.0 破坏性变更，以及 150+ 组织采纳。') },
  ],
};
export default group;
