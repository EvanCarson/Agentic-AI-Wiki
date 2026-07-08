import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-07',
  title: L(
    'New Deep-Dive group: MCP — building, testing, securing, and operating Model Context Protocol servers',
    '新增深入解析分组：MCP——构建、测试、保护与运维模型上下文协议服务器',
  ),
  items: [
    L(
      'Added 10 essays under the new MCP group covering the practical layer above mcp-architecture\'s conceptual introduction: building servers in practice, tool design, testing, Streamable HTTP transport, OAuth 2.1 auth, security anti-patterns, sampling & elicitation, tool poisoning, ops in production, and registry & distribution.',
      '在新的 MCP 分组下新增 10 篇，覆盖 mcp-architecture 概念介绍之上的实操层：实操构建服务器、工具设计、测试、Streamable HTTP 传输、OAuth 2.1 鉴权、安全反模式、采样与征询、工具毒化、生产运维，以及注册表与分发。',
    ),
    L(
      'Cross-linked new MCP essays from mcp-architecture, tool-calling-standards, capability-discovery, interop-problem, agentic-threat-model, and prompt-injection so existing readers land on the new group\'s practical layer.',
      '从 mcp-architecture、tool-calling-standards、capability-discovery、interop-problem、agentic-threat-model 与 prompt-injection 交叉链接到新的 MCP 篇章，使现有读者能落到新分组的实操层。',
    ),
    L(
      'Group is placed at order 25 (right after Protocols & Interop) to read as a deeper practical layer above mcp-architecture\'s conceptual introduction.',
      '分组的 order 设为 25（紧接协议与互操作之后），使其读起来就是 mcp-architecture 概念介绍之上的更深实操层。',
    ),
  ],
};
export default entry;
