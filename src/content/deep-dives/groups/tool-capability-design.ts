import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'tool-capability-design',
  order: 130,
  name: L('Tool & Capability Design', '工具与能力设计'),
  groupSummary: L('Designing tools an agent can actually use — granularity, schemas, error messages, recovery, antipatterns.', '设计智能体真正能用的工具——粒度、Schema、错误消息、恢复与反模式。'),
  entries: [
  { page: 'tool-design-principles', slug: 'tool-design-principles', title: L('Designing Tools Agents Can Use','设计智能体能用好的工具'), summary: L('Tools are the agent\'s entire API: design for a model that reads only the description and is confidently wrong, not for an engineer who read the source.','工具就是智能体的全部 API：为一个只读描述、且会自信犯错的模型而设计，而非为一个读过源码的工程师。') },
  { page: 'tool-granularity', slug: 'tool-granularity', title: L('Tool Granularity & Composition','工具粒度与组合'), summary: L('Coarse tools hide decisions and concentrate blast radius, fine tools multiply round-trips and bloat the list — and tool explosion is now a measured ~24-point selection-accuracy loss.','粗工具隐藏决策、集中爆炸半径，细工具放大来回、撑大列表——而工具爆炸如今是约 24 个百分点的选择准确率实测损失。') },
  { page: 'tool-schemas-and-contracts', slug: 'tool-schemas-and-contracts', title: L('Schemas, Contracts & Defaults','模式、契约与默认值'), summary: L('The schema is the instruction set: make illegal states unrepresentable, make safety-relevant fields required, and let the path of least specification be the path of least harm.','模式就是指令集：让非法状态无法表示、让安全相关字段必填，并让最少说明的路径成为最少伤害的路径。') },
  { page: 'tool-error-messages', slug: 'tool-error-messages', title: L('Error Messages as Prompts','把错误消息当作提示'), summary: L('A tool error is a just-in-time prompt: name the cause, echo the bad value, prescribe the corrected call, and say retryable-or-terminal — or breed a runaway retry loop.','工具错误是一段即时提示词：点出原因、回显坏值、开出修正后的调用、说清可重试还是终态——否则就养出一个失控重试循环。') },
  { page: 'tool-discovery-and-docs', slug: 'tool-discovery-and-docs', title: L('Tool Docs & Discoverability','工具文档与可发现性'), summary: L('Selection is text-only retrieval over names and descriptions: namespace by service, say when-and-when-not, show one example — and remember discoverability is inversely related to inventory.','选择是对名称与描述的纯文本检索：按服务做命名空间、说清何时用与何时不用、给一个范例——并记住可发现性与库存量成反比。') },
  { page: 'tool-design-antipatterns', slug: 'tool-design-antipatterns', title: L('Tool-Design Anti-Patterns','工具设计反模式'), summary: L('The four that sink most agents — kitchen-sink tool, stringly-typed args, silent failure, leaky abstraction — each spotted in a minute, each with a trace signature and a mechanical fix.','拖垮多数智能体的四个——厨房水槽工具、字符串化参数、静默失败、泄漏的抽象——每个一分钟可认出，每个都有追踪指纹和机械修法。') },
  { page: 'tool-calling-vendor-matrix-2026', slug: 'tool-calling-vendor-matrix-2026', title: L('Tool Calling Vendor Matrix (2026)','工具调用厂商对照矩阵（2026）'), summary: L('OpenAI (Chat Completions vs Responses API, parallel_tool_calls, custom tools with Lark/regex grammar) vs Anthropic (Programmatic Tool Calling, Tool Search Tool, Tool Use Examples) vs Gemini (OpenAPI subset, tool_choice any, multimodal function responses).','OpenAI（Chat Completions 与 Responses API、parallel_tool_calls、带 Lark/regex 的自定义工具）vs Anthropic（编程式工具调用、Tool Search Tool、Tool Use Examples）vs Gemini（OpenAPI 子集、tool_choice: any、多模态函数响应）。') },
  { page: 'advanced-tool-orchestration-patterns', slug: 'advanced-tool-orchestration-patterns', title: L('Advanced Tool Orchestration','进阶工具编排'), summary: L('Anthropic Tool Search Tool (85% token reduction); Programmatic Tool Calling (Claude writes Python in a sandbox that calls tools, only final results enter context); Tool Use Examples.','Anthropic 的 Tool Search Tool（减少 85% 令牌）；Programmatic Tool Calling（Claude 在沙箱中写 Python 调工具，只有最终结果进入上下文）；Tool Use Examples。') },
  ],
};
export default group;
