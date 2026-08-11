import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-11',
  slug: 'agent-plugins-ship-without-a-trust-model',
  title: L(
    'Agent Plugins 1.0 Standardises the Bundle and Leaves Trust to Whoever Installs It',
    'Agent Plugins 1.0 标准化了那个捆绑包，却把信任留给了装它的那个人',
  ),
  summary: L(
    'Five rival vendors agreed on a directory layout on 6 August, and explicitly declined to agree on install, distribution, permissions, sandboxing or provenance. The format makes one bundle of instructions plus credentialed tool access portable across six clients — which is exactly why the compensating controls are now yours.',
    '8 月 6 日，五家互为对手的厂商就一个目录结构达成了一致，并明确拒绝就安装、分发、权限、沙箱与来源验证达成一致。这个格式让"指令加带凭据的工具访问"这一个捆绑包可以在六个客户端之间通行——而这恰恰意味着补偿性控制如今归你。',
  ),
  tags: ['protocols', 'mcp', 'ecosystem', 'developer-tools', 'agentic-ai', 'open-source'],
};

export default post;
