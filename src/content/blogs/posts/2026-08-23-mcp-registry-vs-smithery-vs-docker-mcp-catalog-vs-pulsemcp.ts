import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-23',
  slug: 'mcp-registry-vs-smithery-vs-docker-mcp-catalog-vs-pulsemcp',
  title: L(
    'MCP Registry vs Smithery vs Docker MCP Catalog vs PulseMCP: four indexes, one missing signal',
    'MCP Registry vs Smithery vs Docker MCP Catalog vs PulseMCP：四个索引，缺的是同一个信号',
  ),
  summary: L(
    'You can look an MCP server up in four places and get four different kinds of answer: who owns the name, who will host it, who built the image, and what exists at all. Only one of them makes a claim about the artefact you are about to run — and none of them has read the tool descriptions, which is where an MCP server actually attacks you.',
    '同一个 MCP 服务器可以在四个地方查到，而你得到的是四种不同性质的答案：名字归谁、谁替你托管、镜像由谁构建，以及世上究竟有些什么。其中只有一个对你即将运行的那件产物给出了承诺——而四个都没有读过工具描述，那才是 MCP 服务器真正攻击你的地方。',
  ),
  tags: ['agent-comparison', 'mcp', 'ecosystem', 'open-source'],
};

export default post;
