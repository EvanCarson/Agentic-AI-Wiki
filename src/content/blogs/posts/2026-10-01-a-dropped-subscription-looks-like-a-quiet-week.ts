import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-01',
  slug: 'a-dropped-subscription-looks-like-a-quiet-week',
  title: L(
    'A dropped subscription looks exactly like a quiet week',
    '一个掉了的订阅，和一个清静的一周长得一模一样',
  ),
  searchTitle: {
    en: 'MCP Events after DevDay 2026, read as a failure-visibility problem',
  },
  summary: L(
    'OpenAI shipped plugin automations on all plans on 29 September 2026 against MCP Events — a draft with no SEP number, in a repository whose README calls its contents exploratory. The draft gets the webhook hardening right and makes the two envelopes that report absence optional, so a revoked permission, a lost buffer and a genuinely quiet upstream all reach your agent as the same empty stream.',
    'OpenAI 在 2026 年 9 月 29 日把插件自动化向全部订阅档位上线，对接的是 MCP Events——一份没有 SEP 编号的草案，住在一个 README 称其内容属探索性质的仓库里。这份草案把 webhook 的加固做对了，却把那两个报告「缺席」的信封做成了可选，于是被撤销的权限、丢掉的缓冲、以及确实清静的上游，抵达你的智能体时都是同一条空流。',
  ),
  tags: ['agentic-ai', 'mcp', 'protocols', 'ecosystem', 'infrastructure'],
};

export default post;
