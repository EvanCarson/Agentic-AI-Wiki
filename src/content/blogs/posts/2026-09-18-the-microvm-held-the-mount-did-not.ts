import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-18',
  slug: 'the-microvm-held-the-mount-did-not',
  title: L(
    'The microVM held; the mount did not — two escapes in Docker Sandboxes',
    '微 VM 守住了，挂载没有——Docker Sandboxes 的两次逃逸',
  ),
  searchTitle: { en: 'Docker Sandboxes CVE-2026-77179 escape explained' },
  summary: L(
    'Docker\'s 15 September advisory describes two ways out of a Docker Sandboxes microVM, and neither touched the hardware boundary. Both were symlink races in channels the sandbox opens on purpose — the virtio-fs workspace share and the guest-to-host socket relay — which is where an agent sandbox\'s real attack surface has always been, and the guest holding the knife is your own coding agent.',
    'Docker 9 月 15 日的公告描述了两条逃出 Docker Sandboxes 微 VM 的路径，而它们都没有碰到硬件边界。两者都是沙箱有意开出的通道里的符号链接竞态——virtio-fs 工作区共享，与客户机到宿主机的套接字转发——那里一直就是智能体沙箱真正的攻击面；而握着刀的那个「客户机」，是你自己的编码智能体。',
  ),
  tags: ['sandboxing', 'coding-agents', 'safety', 'developer-tools'],
};

export default post;
