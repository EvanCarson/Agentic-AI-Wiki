import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-13',
  slug: 'aws-emulator-vs-localstack-vs-floci-vs-kumo',
  title: L(
    'AWS Emulator vs LocalStack vs Floci vs Kumo',
    'AWS Emulator、LocalStack、Floci 与 Kumo 对比',
  ),
  summary: L(
    'AWS shipped its own local emulator on 11 November 2026, so pointing a coding agent at a fake AWS is now a four-way choice. Everyone compares service counts, and service count is the wrong number: an agent cannot tell a gap in the emulator from a bug in your code, so a missing API becomes an edit to code that already worked, and the suite goes green anyway. The number to choose on is whether the project publishes what it gets wrong — per-service fidelity scores and a tracked gap list — and exactly one of these four does. Here is where each of the others still wins: ecosystem, no feature gates, and a 17 MB image that cold-starts in about a tenth of a second.',
    '2026 年 11 月 11 日，AWS 发布了自家的本地模拟器，于是「把编码智能体指向一个假的 AWS」现在是一个四选一的决定。所有人都在比服务数量，而服务数量恰恰是错的那个数字：智能体分辨不出「模拟器缺了这个」和「你的代码有 bug」，于是一个缺失的 API 会变成一次对本来就能跑的代码的修改，而测试照样变绿。该据以选择的那个数字，是这个项目是否公开它做错了什么——按服务的保真度分数，以及一份被追踪的缺口清单——而这四个里恰好只有一个这么做。以下是另外三个各自仍然胜出的地方：生态、没有功能闸门，以及一个约 17 MB、冷启动约十分之一秒的镜像。',
  ),
  tags: ['agent-comparison', 'coding-agents', 'developer-tools', 'infrastructure', 'open-source'],
};

export default post;
