import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-31',
  slug: 'e2b-vs-daytona-vs-modal-vs-northflank-sandboxes',
  title: L(
    'E2B vs Daytona vs Modal vs Northflank: the sandbox is idle most of the time',
    'E2B、Daytona、Modal 与 Northflank：沙箱大部分时间都在闲着',
  ),
  summary: L(
    'The cold-start number in every pitch deck — 27 ms, sub-90 ms, ~150 ms — describes creating one sandbox at a time. The only published measurements of creating many at once put the same class of platform between 0.67 s and 5.06 s, and two of these four have no published burst figure at all. Meanwhile the sandbox spends most of its life waiting on a model rather than running code, so the axis that actually sets your bill is what the meter does while nothing executes. Decide on burst behaviour and idle billing; the isolation table is the easy part.',
    '每份推介材料里的冷启动数字——27 毫秒、低于 90 毫秒、约 150 毫秒——描述的都是「一次创建一个沙箱」。而关于「一次创建很多个」，唯一公开过的测量把同一类平台放在了 0.67 秒到 5.06 秒之间；这四家里有两家压根没有公开过突发场景下的数字。与此同时，沙箱一生中的大部分时间是在等模型，而不是在跑代码——所以真正决定你账单的那条轴，是「什么都没执行时计价器在做什么」。请按突发行为与闲置计费来决策；隔离对照表反倒是容易的那部分。',
  ),
  tags: ['agent-comparison', 'sandboxing', 'infrastructure', 'code-execution', 'cost'],
};

export default post;
