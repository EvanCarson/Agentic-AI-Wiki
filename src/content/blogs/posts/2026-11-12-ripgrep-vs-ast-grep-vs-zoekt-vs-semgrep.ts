import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-12',
  slug: 'ripgrep-vs-ast-grep-vs-zoekt-vs-semgrep',
  title: L(
    'ripgrep vs ast-grep vs Zoekt vs Semgrep: the search tool you hand an agent',
    'ripgrep vs ast-grep vs Zoekt vs Semgrep：你交给智能体的那把搜索工具',
  ),
  summary: L(
    'Now that the frontier coding agents have dropped the embedding index and search the tree directly, the search binary behind the agent\'s Grep tool is a product decision rather than a detail. These four answer four different questions exactly — a string, a shape of code, a ranked hit across thousands of repositories, and whether untrusted input reaches a sink — and the capability ordering runs opposite to the licensing one: Semgrep is the most powerful and the only one whose rules are restricted to internal business use, while ripgrep, ast-grep and Zoekt are permissive. Choose on what the agent can verify and what you are allowed to ship.',
    '既然前沿编码智能体已经丢掉了嵌入索引、改为直接搜索代码树，那么智能体那个 Grep 工具背后用的是哪个搜索二进制程序，就成了一项产品决定，而不是一个细节。这四者各自精确回答四个不同的问题——一个字符串、一种代码形状、数千个仓库里按相关度排序的命中，以及不可信输入是否到达了某个危险汇点——而能力的排序与许可证的排序正好相反：Semgrep 最强，也是唯一一个规则被限定为「仅供内部商业使用」的；而 ripgrep、ast-grep 与 Zoekt 都是宽松许可。选择的依据应是智能体能验证什么，以及你被允许发布什么。',
  ),
  tags: ['agent-comparison', 'coding-agents', 'developer-tools', 'open-source', 'agentic-ai'],
};

export default post;
