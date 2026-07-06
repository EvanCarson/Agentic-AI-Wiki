import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'mcp',
  order: 25,
  name: L('MCP', 'MCP'),
  groupSummary: L(
    "Building, testing, securing, and operating Model Context Protocol servers — the practical layer above mcp-architecture's conceptual introduction.",
    '构建、测试、保护与运维模型上下文协议服务器——mcp-architecture 概念介绍之上的实践层。',
  ),
  entries: [
    { page: 'mcp-building-servers-in-practice', slug: 'mcp-building-servers-in-practice', title: L('Building MCP Servers in Practice','实操构建 MCP 服务器'), summary: L('Idiomatic server construction beyond hello-world — FastMCP decorators, TypeScript Standard Schema, when to expose a capability as a tool vs a resource vs a prompt, and what to actually put in the median five-tool server.','超越 hello-world 的地道服务器构建——FastMCP 装饰器、TypeScript Standard Schema、何时把能力做成 tool 与 resource 与 prompt 之分，以及一台中位数五工具的服务器里到底该放什么。') },
    { page: 'mcp-tool-design', slug: 'mcp-tool-design', title: L('Designing MCP Tools','设计 MCP 工具'), summary: L('MCP tools are prompts as much as APIs — description phrasing changes selection, granularity changes token cost, and the search-then-fetch pattern beats "give the model the whole document" every time.','MCP 工具与其说是 API 不如说是提示词——描述措辞决定选择、粒度决定 token 成本，而 search-then-fetch 模式每一次都胜过"把整份文档丢给模型"。') },
    { page: 'mcp-testing', slug: 'mcp-testing', title: L('Testing MCP Servers','测试 MCP 服务器'), summary: L('In-memory client/server binding beats subprocess plumbing; contract tests beat vibe-testing through an agent loop; the MCP Inspector is a debugger, not a test.','进程内客户端/服务器绑定胜过子进程管道；契约测试胜过在 agent 循环里"感觉测试"；MCP Inspector 是调试器，不是测试。') },
  ],
};
export default group;
