import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-12',
  slug: 'the-project-file-was-open-not-uploaded',
  title: L(
    'The project file was open, not uploaded',
    '那份工程文件是打开着的，不是被上传的',
  ),
  summary: L(
    'At MAX on 10 November 2026 Adobe previewed local MCP integrations that let an outside agent act inside Photoshop, Illustrator, Premiere and After Effects, editing native project files on the user\'s own machine and keeping the layers, vectors, bins and sequences editable. Availability is private beta in early 2027, so there is nothing to install — but the shape is the news: when the MCP server is a running GUI application, the agent\'s subject is the document that happens to be open, not a path you can allowlist, and the upload step that was quietly carrying your DLP, your audit trail and your undo disappears. Decide now what the unit of permission is, because it is no longer a file.',
    '2026 年 11 月 10 日，Adobe 在 MAX 上预览了本地 MCP 集成：让外部智能体在 Photoshop、Illustrator、Premiere 与 After Effects 内部动作，直接编辑用户自己机器上的原生工程文件，并保留图层、矢量、素材箱与序列的可编辑性。可用时间是 2027 年初的私有测试版，所以目前没有任何东西可装——但真正的新闻是这个形态：当 MCP 服务器是一个运行中的 GUI 应用时，智能体的作用对象就是恰好打开着的那份文档，而不是一条你能列入白名单的路径；而那个一直默默替你承担着 DLP、审计轨迹与撤销的「上传」步骤，消失了。现在就定下「权限的单位」是什么，因为它不再是一个文件了。',
  ),
  tags: ['ecosystem', 'mcp', 'safety', 'agent-ux', 'agentic-ai'],
};

export default post;
