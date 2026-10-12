import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-12',
  slug: 'langfuse-vs-promptlayer-vs-agenta-vs-launchdarkly-ai-configs',
  title: L(
    'Langfuse vs PromptLayer vs Agenta vs LaunchDarkly AI Configs: the rollback is only as fast as the cache TTL',
    'Langfuse、PromptLayer、Agenta 与 LaunchDarkly AI Configs：回滚只能快到缓存 TTL 那么快',
  ),
  summary: L(
    'All four version prompts immutably and deploy by moving a pointer, which makes them look interchangeable. Three of them have your process fetch the prompt at request time behind a 60-second client cache; one streams a ruleset and evaluates it locally. That single difference sets your real rollback time, decides what happens when the service is unreachable, and is missing from every feature grid.',
    '四款工具都给提示词做不可变版本、都靠挪动一个指针来发布，于是看起来可以互换。其中三款让你的进程在请求时穿过一层 60 秒的客户端缓存去取提示词；另一款把规则集推流下来、在本地求值。仅此一个差别，就决定了你真实的回滚时间、也决定了服务不可达时会发生什么——而每一张功能表上都没有它。',
  ),
  tags: ['agent-comparison', 'developer-tools', 'infrastructure', 'open-source'],
};

export default post;
