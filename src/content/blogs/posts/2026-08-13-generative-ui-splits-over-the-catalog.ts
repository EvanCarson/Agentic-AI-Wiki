import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-13',
  slug: 'generative-ui-splits-over-the-catalog',
  title: L(
    'Generative UI Has Two Standards, and They Split Over Who Owns the Catalog',
    '生成式界面有了两套标准，分歧在于组件目录归谁所有',
  ),
  searchTitle: { en: 'Generative UI: Two Standards Split Over the Catalog' },
  summary: L(
    'A2UI sends JSON and MCP Apps sends sandboxed HTML — the least consequential difference between them. One has the agent compose components you own, moving the review into your design system; the other installs an interface someone else wrote, moving it to the server boundary. Sort your surfaces by whether you can enumerate them, then pick.',
    'A2UI 传的是 JSON，MCP Apps 传的是沙箱里的 HTML——而这恰恰是两者之间最无关紧要的差别。一个让智能体在运行时组合你自己的组件，把评审搬进你的设计系统；另一个装上别人写好的界面，把评审推到服务器边界。先按"这些界面能不能被穷举"给它们分类，再做选择。',
  ),
  tags: ['protocols', 'ecosystem', 'mcp', 'agentic-ai'],
};

export default post;
