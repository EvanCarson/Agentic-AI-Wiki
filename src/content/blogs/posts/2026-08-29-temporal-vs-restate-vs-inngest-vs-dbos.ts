import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-29',
  slug: 'temporal-vs-restate-vs-inngest-vs-dbos',
  title: L(
    'Temporal vs Restate vs Inngest vs DBOS: where the agent’s transcript lives',
    'Temporal、Restate、Inngest 与 DBOS：智能体的对话记录住在哪里',
  ),
  summary: L(
    'All four resume a crashed run from its last completed step, so that is not the decision. An agent’s durable record is a transcript that grows with every turn, not a handful of small step results — and the engines differ on where that growth is stored, what ceiling it hits, and whether your model call is allowed to sit in replayed code. Temporal terminates a workflow at 51,201 events or 50 MB of history; Inngest caps a step output at 4 MB and run state at 32 MB; Restate and DBOS push the growth into storage you operate. Decide on that, then on billing shape, and the feature tables stop mattering.',
    '四者都能让崩掉的运行从最后一个已完成步骤继续，所以那不是决策点。智能体的持久化记录是一份每一轮都在长大的对话记录，而不是几个小小的步骤结果——而这几个引擎的分歧在于：这份增长存在哪里、会撞上什么上限，以及你的模型调用允不允许待在会被重放的代码里。Temporal 会在第 51,201 个事件或 50 MB 历史处终止工作流；Inngest 把单步输出限制在 4 MB、单次运行状态限制在 32 MB；Restate 与 DBOS 则把这份增长推给你自己运维的存储。先按这个来定，再看计费形状，功能对照表就不重要了。',
  ),
  tags: ['agent-comparison', 'durable-execution', 'infrastructure', 'orchestration'],
};

export default post;
