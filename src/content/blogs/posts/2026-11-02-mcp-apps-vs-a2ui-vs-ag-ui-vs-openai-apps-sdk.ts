import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-02',
  slug: 'mcp-apps-vs-a2ui-vs-ag-ui-vs-openai-apps-sdk',
  title: L(
    'MCP Apps vs A2UI vs AG-UI vs OpenAI Apps SDK',
    'MCP Apps、A2UI、AG-UI 与 OpenAI Apps SDK 之辨',
  ),
  summary: L(
    'Three of these four are not competitors, and picking by feature list gets you the wrong one. They split on a single fact — whether executable code crosses the wire — and that fact, not any feature, decides which surfaces your interface can ever appear on. The genuine either/or is MCP Apps against A2UI: an HTML document in a locked-down iframe, or a declarative component list the client draws with widgets you do not control.',
    '这四者中有三个并不在同一条赛道上，按功能清单挑选只会挑错。真正的分水岭只有一个事实：是否有可执行代码跨越网络边界——决定你的界面最终能出现在哪些载体上的，是这个事实，而不是任何一项功能。唯一真正的二选一是 MCP Apps 与 A2UI：一份跑在重重设限 iframe 里的 HTML 文档，还是一串由客户端用你无法掌控的控件去绘制的声明式组件清单。',
  ),
  tags: ['agent-comparison', 'protocols', 'agent-ux', 'mcp', 'ecosystem'],
};

export default post;
