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
    { page: 'mcp-streamable-http-deep-dive', slug: 'mcp-streamable-http-deep-dive', title: L('Streamable HTTP: the current MCP transport','Streamable HTTP：MCP 的当前传输'), summary: L('The single-endpoint replacement for the deprecated HTTP+SSE transport — MCP-Session-Id, Last-Event-ID resumability, and why "remote MCP server" is really "distributed system".','对已弃用 HTTP+SSE 传输的单端点替代方案——MCP-Session-Id、基于 Last-Event-ID 的可恢复性，以及为何"远程 MCP 服务器"其实就是"分布式系统"。') },
    { page: 'mcp-auth-oauth21', slug: 'mcp-auth-oauth21', title: L('MCP Auth: the OAuth 2.1 Profile','MCP 鉴权：OAuth 2.1 配置'), summary: L('PKCE mandatory, RFC 8707 resource indicators, Protected Resource Metadata for AS discovery, Client ID Metadata Documents beating Dynamic Client Registration — the MCP-shaped subset of OAuth, and why 39% of production servers ship with none of it.','强制 PKCE、RFC 8707 资源指示、用于 AS 发现的 Protected Resource Metadata、以及优于动态客户端注册的 Client ID Metadata Documents——OAuth 中面向 MCP 的那一子集，以及为何 39% 的生产服务器一个都不用。') },
    { page: 'mcp-security-anti-patterns', slug: 'mcp-security-anti-patterns', title: L('MCP Security Anti-Patterns','MCP 安全反模式'), summary: L('The six patterns the 2025-11-25 spec forbids by name — confused deputy, token passthrough, session hijacking, SSRF via discovery, javascript-URL injection, startup-command execution — with the trace signature and mechanical fix for each.','2025-11-25 规范逐一点名禁止的六种模式——confused deputy、令牌透传、会话劫持、通过发现的 SSRF、javascript-URL 注入、启动命令执行——每一种都给出轨迹指纹与机械修法。') },
    { page: 'mcp-sampling-and-elicitation', slug: 'mcp-sampling-and-elicitation', title: L('Sampling & Elicitation: Server-Initiated MCP','采样与征询：服务器主导的 MCP'), summary: L('Two under-covered server-initiated features from the 2025-11-25 spec — sampling with tools lets the server borrow the host\'s model without holding an API key, URL-mode elicitation captures third-party credentials without token passthrough.','2025-11-25 规范中两个被低估的"服务器主导"特性——带工具的采样让服务器不必自持 API key 也能借用宿主的模型，URL 模式征询则可在不触发令牌透传的前提下采集第三方凭证。') },
    { page: 'mcp-tool-poisoning', slug: 'mcp-tool-poisoning', title: L('Tool Poisoning: Prompt Injection via Tool Descriptions','工具毒化：经工具描述实施的提示词注入'), summary: L('Tool descriptions are prompts your model reads — when they come from a downstream data source that also takes untrusted input, they become an indirect prompt injection surface (CVE-2025-54136, MCPTox).','工具描述就是模型会读的提示词——当它们来自一个也接受不受信输入的下游数据源时，就变成了间接提示词注入的攻击面（CVE-2025-54136，MCPTox）。') },
    { page: 'mcp-ops-in-production', slug: 'mcp-ops-in-production', title: L('MCP Ops in Production','MCP 生产运维'), summary: L('Per-tool kill switches, argument-shape (not value) audit logs, tenant isolation from verified token claims (not request bodies), and rate-limits sized for agent traffic.','逐工具的 kill switch、按参数形状（而非值）记录的审计日志、从被验证的令牌 claim（而非请求体）取得的租户隔离，以及按 agent 流量规模化的限流。') },
  ],
};
export default group;
