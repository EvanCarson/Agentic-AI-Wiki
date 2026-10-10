import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-10',
  slug: 'the-fix-shipped-without-a-version-number',
  title: L(
    'The fix shipped without a version number',
    '那次修复发布时没有版本号',
  ),
  summary: L(
    'The transport-level hardening took 51 days; the over-broad IAM grant that set the actual blast radius took 278. A permission cannot be patched, only revoked — so your exposure on a managed agent runtime changed twice, in both directions, with no CVE, no changelog and nothing to subscribe to.',
    '传输层的加固用了 51 天；而真正决定爆炸半径的那项过宽 IAM 授权用了 278 天。一项权限打不了补丁，只能撤回——所以你在托管智能体运行时上的暴露变了两次、往两个方向变，而既没有 CVE、也没有变更日志，更没有任何你订阅得到的东西。',
  ),
  tags: ['safety', 'infrastructure', 'agentic-ai', 'sandboxing'],
};

export default post;
