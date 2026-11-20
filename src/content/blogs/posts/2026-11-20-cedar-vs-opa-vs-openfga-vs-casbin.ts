import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-20',
  slug: 'cedar-vs-opa-vs-openfga-vs-casbin',
  title: L(
    'Cedar vs OPA vs OpenFGA vs Casbin: Pick on Who Supplies the Grant',
    'Cedar vs OPA vs OpenFGA vs Casbin：按「谁来提供授权凭据」来选',
  ),
  summary: L(
    'An agent request is never "user U may do A" — it is "agent G, acting for U, under a grant issued earlier, may do A" — and the only axis that separates these four is whether the engine can read that grant without the agent handing it over. OpenFGA 1.22.1 stores it as a tuple and disables caching by default, so every check reads the database; Cedar 4.15.0 is stateless by design and takes entities from the caller; OPA 1.22.4 makes your revocation lag equal your bundle polling interval; Casbin 3.11.0 moves that lag per-replica, where nobody measures it. None of them fixes the agent case, because the fix is upstream: grant issuance as a separate, audited, expiring write.',
    '智能体发出的请求从来不是「用户 U 可以执行 A」，而是「智能体 G 代表 U、依据此前签发的一份授权，可以执行 A」——而真正区分这四者的唯一维度，是引擎能否在不依赖智能体递交的情况下读到那份授权。OpenFGA 1.22.1 把它存成一条关系元组，且默认关闭缓存，因此每次检查都直读数据库；Cedar 4.15.0 刻意保持无状态，实体由调用方提供；OPA 1.22.4 让你的吊销延迟等于 bundle 轮询间隔；Casbin 3.11.0 把这段延迟挪到每个进程副本里，而那里根本没人在量。它们都没有解决智能体这个问题，因为真正的解法在上游：把授权签发做成一次独立、可审计、带有效期的写入。',
  ),
  tags: ['agent-comparison', 'open-source', 'safety', 'governance', 'infrastructure'],
};

export default post;
