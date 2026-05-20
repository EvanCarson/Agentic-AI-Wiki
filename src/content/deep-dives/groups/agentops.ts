import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'agentops',
  order: 70,
  name: L('AgentOps: Deploy & Operate', '智能体运维：部署与运营'),
  entries: [
    { page: 'durable-state-and-resumability', slug: 'durable-state-and-resumability', title: L('Durable State & Resumability','持久状态与可恢复性'), summary: L('Make the agent loop a durable computation — event-sourced history, journal-before-effect, and resume that replays rather than re-derives, so a crash or redeploy never restarts a half-done task.','把智能体循环做成一次持久计算——事件溯源式历史、先写日志再产生副作用、以重放而非重新推导来恢复，使崩溃或重新部署绝不重启一个做了一半的任务。') },
    { page: 'concurrency-and-scaling', slug: 'concurrency-and-scaling', title: L('Concurrency, Queues & Scaling','并发、队列与扩缩容'), summary: L('Agents are batch jobs, not requests: a queue with leased workers, per-tenant concurrency caps, journal-as-state for horizontal scale, and bounded fan-out are what survive production load.','智能体是批处理作业而非请求：带租约 worker 的队列、按租户并发上限、以日志为状态实现横向扩缩、以及有界扇出，才是能扛住生产负载的形态。') },
    { page: 'idempotency-and-retries', slug: 'idempotency-and-retries', title: L('Idempotency, Retries & Side-Effect Safety','幂等、重试与副作用安全'), summary: L('Four stacked retry sources mean every write tool will fire twice unless you construct exactly-once with intent-derived idempotency keys, failure classification, and a durable side-effect ledger.','四个叠加的重试源意味着每个写工具都会触发两次——除非你用源自意图的幂等键、失败分类与持久副作用账本构造出恰好一次。') },
    { page: 'cost-control-in-the-loop', slug: 'cost-control-in-the-loop', title: L('Cost Control at the Loop Level','在循环层面控制成本'), summary: L('Agent cost is unbounded by default; treat the per-task token/step/dollar ceiling as a fail-closed circuit breaker, then tune model cascades, prompt and tool caching, and early-exit against a quality metric.','智能体成本默认无界；把按任务的 token/步数/美元上限当作 fail-closed 熔断器，再对着质量指标调模型级联、提示与工具缓存、以及提前退出。') },
    { page: 'rollout-and-versioning', slug: 'rollout-and-versioning', title: L('Rollout, Versioning & Pinning','灰度发布、版本化与固定'), summary: L('Behavior is the (model, prompt, tools) triple; pin it to dated snapshots, stamp it on every run, and promote new versions only through shadow/canary plus an eval gate with instant config-flip rollback.','行为是（模型、提示、工具）三元组；固定到带日期的快照、在每次运行上打戳，并只经影子/灰度加评估闸门提升新版本，配以即时配置切换回滚。') },
    { page: 'incident-response-for-agents', slug: 'incident-response-for-agents', title: L('Incident Response & Runaway Containment','事故响应与失控遏制'), summary: L('A runaway agent fails open and keeps acting; detect from rate and progress, contain with in-loop fail-closed kill switches the resume path respects, rely on pre-installed blast-radius bounds, and turn every incident into a regression test.','失控的智能体 fail-open 且持续行动；从速率与进展检测、用恢复路径也遵守的循环内 fail-closed 熔断遏制、依赖预装的爆炸半径界限，并把每桩事故变成回归测试。') },
  ],
};
export default group;
