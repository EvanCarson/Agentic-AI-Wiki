import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-07',
  slug: 'otel-genai-vs-openinference-vs-openllmetry-vs-openlit',
  title: L(
    'OTel GenAI vs OpenInference vs OpenLLMetry vs OpenLIT: the neutral option is the one still moving',
    'OTel GenAI、OpenInference、OpenLLMetry 与 OpenLIT 对比：中立的那个选项，恰恰是还在动的那个',
  ),
  summary: L(
    'Of the four ways to shape an agent trace, the only one that calls itself the standard is the only one you cannot pin: on 12 June 2026 OpenTelemetry deprecated all sixty gen_ai attributes and moved them to a repository that still has no tagged release and a TODO where its schema URL should be. Eight renames and two deletions landed in that one version — including both token-usage attributes. Pick by the vocabulary your backend dispatches on, translate at the collector, and never point a cost chart at a Development-stability attribute name.',
    '给智能体链路记录定形状的四种方式里，唯一自称是标准的那个，恰恰是你唯一无法固定版本的那个：2026 年 6 月 12 日，OpenTelemetry 把全部六十个 gen_ai 属性标为弃用并挪进了一个仓库，而那个仓库至今没有打标签的发布，schema URL 的位置还写着 TODO。仅这一个版本就带来八处改名与两处删除——其中包括两个 token 用量属性。请按「你的后端据以分派的那套词表」来选，在采集器处做翻译，并且永远不要让成本图表指向一个稳定性仍为 Development 的属性名字。',
  ),
  tags: ['agent-comparison', 'observability', 'open-source', 'developer-tools', 'protocols'],
};

export default post;
