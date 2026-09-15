import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-15',
  slug: 'webmcp-makes-your-page-an-api',
  title: L(
    'WebMCP makes your page an API, and the session is the only auth it has',
    'WebMCP 把你的页面变成了一个 API，而它唯一的鉴权就是那个会话',
  ),
  searchTitle: {
    en: 'WebMCP and document.modelContext: page-declared tools run inside the user\'s authenticated session',
  },
  summary: L(
    'WebMCP lets a page hand an AI agent a list of callable tools, and Chrome is shipping it behind a flag while the W3C community group draft is still moving. The part worth arguing about is not discovery but authority: a registered tool executes as your page\'s own JavaScript, inside the session the logged-in user already established, so your server sees a request it cannot distinguish from a click. You are publishing an API whose only credential belongs to someone who is not the caller.',
    'WebMCP 让一个页面把一份可调用的工具清单递给 AI 智能体；Chrome 正把它放在实验标志后面发布，而 W3C 社区组的草案仍在变动。值得争论的不是发现机制，而是权限：一个注册过的工具是以你页面自己的 JavaScript 身份执行的，就在那位已登录用户既有的会话里——于是你的服务器看到的，是一个它无法与一次点击区分开的请求。你正在发布一个 API，而它唯一的凭证属于一个并非调用方的人。',
  ),
  tags: ['protocols', 'mcp', 'browser-agents', 'safety', 'ecosystem'],
};

export default post;
