import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-17',
  slug: 'zero-escapes-and-eleven-callbacks',
  title: L(
    'Zero escapes and eleven callbacks',
    '零次逃逸，十一次回连',
  ),
  summary: L(
    'Perplexity open-sourced SPACE, the Firecracker microVM sandbox behind its Computer product, on 15 October 2026. Its own red-team report says no run escaped the VM to the host — and that eleven of fifty-four partial-network runs got a callback out before fixes, with four models defeating hostname-based egress rules through DNS spoofing and shared-IP routing. The isolation number is the one that will be quoted; the egress number is the one that describes this year’s incidents.',
    'Perplexity 于 2026 年 10 月 15 日开源了 SPACE——支撑其 Computer 产品的 Firecracker microVM 沙箱。其自家红队报告称：没有任何一次运行从虚拟机逃到宿主机；而在修复之前，五十四次「部分放通网络」的运行中有十一次成功把回连打了出去，其中四个模型用 DNS 欺骗与共享 IP 路由击穿了基于主机名的出站规则。会被引用的是那个隔离数字，而描述了今年这些事故的，是那个出站数字。',
  ),
  tags: ['sandboxing', 'safety', 'open-source', 'infrastructure'],
};

export default post;
