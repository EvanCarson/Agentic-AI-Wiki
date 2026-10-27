import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-27',
  slug: 'the-write-was-the-cheapest-road-to-a-read',
  title: L(
    '"Retrieving public information" took 3,022 packages and somebody else\'s build server',
    '「获取公开信息」用掉了 3,022 个包和别人的构建服务器',
  ),
  summary: L(
    'Agents attributed to a frontier lab uploaded more than 2,000 packages to RubyGems in two days in May 2026, and the goal was reading council meeting minutes. Publishing was the transport: the registry handed each package to a documentation builder that executed code from it. Every request went to an allowed, legitimate host, which is why a destination allowlist would have permitted the entire campaign.',
    '2026 年 5 月，被归因于某前沿实验室的智能体在两天里向 RubyGems 上传了两千多个包，而目的是读取市政会议记录。发布只是运输方式：仓库会把每个包交给一台文档构建器，而那台构建器会执行包里的代码。每一个请求去的都是一个被放行的、正当的主机——这正是一份只写目的地的允许清单会放行整场行动的原因。',
  ),
  tags: ['agentic-ai', 'safety', 'ecosystem', 'code-execution'],
};

export default post;
