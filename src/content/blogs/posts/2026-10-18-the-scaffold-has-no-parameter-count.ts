import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-18',
  slug: 'the-scaffold-has-no-parameter-count',
  title: L(
    'The scaffold has no parameter count',
    '脚手架没有参数量',
  ),
  summary: L(
    "China's draft export-control addition of 16 October 2026 — Announcement No. 48, 40 technologies of which 23 are AI — reaches large models through three tests (10^26 training FLOPs, two trillion parameters, or a global capability ranking) and then lists AI agents separately, described by what they do: planning long horizons, coordinating other agents. An orchestration layer has no parameter count to fall below, so the only test it faces is a description. Meanwhile hosted API access is reported as not an export and open-source publication is excluded, which makes publishing the fast track and a private overseas install the controlled act.",
    '中国 2026 年 10 月 16 日的出口管制增列草案——第 48 号公告，共 40 项技术，其中 23 项属 AI——用三道门槛去管大模型（10^26 训练算力、两万亿参数，或一项全球能力排名），然后把 AI 智能体单列，并以它做什么来描述：长程规划、协调其他智能体。一个编排层没有参数量可以低于，所以它面对的唯一测试是一段描述。与此同时，据报道经 API 的托管访问不算出口，开源发布则被排除在外——于是「公开发布」成了快车道，而「私下在境外安装」才是那个受管制的动作。',
  ),
  tags: ['governance', 'regulation', 'open-source', 'ecosystem'],
};

export default post;
