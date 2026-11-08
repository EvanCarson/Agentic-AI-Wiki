import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-08',
  slug: 'stable-took-away-the-off-switch',
  title: L(
    'Stable took away the off switch',
    '升为 stable，把开关拿走了',
  ),
  summary: L(
    'Google ADK v2.14.0 graduated 26 modules to stable, and in the same notes: stable toolset features are now always enabled and disable flags no longer block them. Graduation switched sixteen features on and retired the flag that expressed your policy. Four more changes move behaviour without touching a signature — compaction fires earlier, two extra events per response, metric buckets moved, and 2.13 cannot read 2.14 sessions after a rollback. The version number guards the API and almost nothing that decides behaviour.',
    'Google ADK v2.14.0 把 26 个模块升为 stable，而同一份说明里写着：stable 的 toolset 功能现在一律启用，禁用开关不再拦得住它们。这次升级把十六项功能打开了，并让那个曾表达你政策的开关退役。另有四处改动在不碰任何函数签名的情况下移动了行为——压缩触发得更早、每次响应多两个事件、指标分桶移动，以及回滚后 2.13 读不了 2.14 写的会话。版本号守的是 API，几乎守不到任何决定行为的东西。',
  ),
  tags: ['agent-frameworks', 'developer-tools', 'infrastructure', 'safety', 'ecosystem'],
};

export default post;
