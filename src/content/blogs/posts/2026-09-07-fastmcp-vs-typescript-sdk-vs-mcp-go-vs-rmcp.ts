import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-07',
  slug: 'fastmcp-vs-typescript-sdk-vs-mcp-go-vs-rmcp',
  title: L(
    'FastMCP vs the TypeScript SDK vs mcp-go vs rmcp: who negotiates the revision for you',
    'FastMCP、TypeScript SDK、mcp-go 与 rmcp：谁替你去谈协议版本',
  ),
  summary: L(
    'These four are benchmarked on throughput, which is a 1.9 ms spread inside a 50–500 ms upstream call — and ranked on it while the axis with a date attached goes unmeasured. Three of the four implement the 2026-07-28 stateless revision and the most-used Go library does not, but the sharper question is which of them absorbs your dual-revision window instead of turning it into your topology.',
    '这四个总是被拿吞吐来跑分，而那是一次 50 到 500 毫秒的上游调用里 1.9 毫秒的跨度——大家照着它排名次，却把那根带日期的轴放着不量。四者中有三个实现了 2026-07-28 的无状态版本，而最常用的那个 Go 库没有；但更锋利的问题是：它们当中谁替你吸收掉双版本窗口，而不是把它变成你的拓扑。',
  ),
  tags: ['agent-comparison', 'mcp', 'protocols', 'open-source', 'developer-tools'],
};

export default post;
