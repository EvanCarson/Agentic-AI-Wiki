import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-25',
  slug: 'safari-mcp-vs-chrome-devtools-mcp-vs-playwright-mcp-vs-extension-agents',
  title: L(
    'Safari MCP vs Chrome DevTools MCP vs Playwright MCP vs extension agents',
    'Safari MCP、Chrome DevTools MCP、Playwright MCP 与扩展式智能体对比',
  ),
  searchTitle: {
    en: 'Which browser session does the agent get?',
  },
  summary: L(
    'Tool counts decide nothing here. The axis that determines both whether a browser agent can do the job and how bad a hostile page gets is which session it holds — an isolated automation context, a dedicated profile quietly accumulating logins, or your own signed-in browser. Both browser vendors that shipped an MCP server this year deliberately kept your own session out of it, which is why neither does the agentic-shopping demo everyone expected.',
    '在这件事上，工具数量什么也决定不了。真正决定「浏览器智能体能不能干活」以及「遇上恶意页面会有多糟」的那根轴，是它握着哪个会话——一个隔离的自动化上下文、一个在悄悄累积登录态的专用配置档，还是你自己那个已登录的浏览器。今年交付了 MCP 服务器的两家浏览器厂商都有意把你自己的会话排除在外，这正是它们都做不了大家以为会有的「智能体帮你下单」演示的原因。',
  ),
  tags: ['agent-comparison', 'browser-agents', 'mcp', 'developer-tools', 'computer-use'],
};

export default post;
