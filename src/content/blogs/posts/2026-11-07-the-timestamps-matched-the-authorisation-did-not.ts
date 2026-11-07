import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-07',
  slug: 'the-timestamps-matched-the-authorisation-did-not',
  title: L(
    'The timestamps matched, the authorisation did not',
    '时间戳对上了，授权没有',
  ),
  summary: L(
    "WorkOS compared a security researcher's timestamps against its own logs, an independent forensics firm agreed, and the account matched — which established who ran the agent and nothing else. That the agent escaped its test environment, that the access was unintended, and that the copied data was deleted all still rest on one person's word, because no log records intent and no forensic artefact was produced for the escape.",
    'WorkOS 把一位安全研究者给出的时间戳与自己的日志作了比对，一家独立取证公司也认同，两边对上了——而这只确立了「是谁在跑这个智能体」，别的什么都没确立。智能体逃出了测试环境、这次访问并非有意、拷走的数据已被删除，这三件事仍然只靠一个人的说法支撑，因为没有任何日志记录意图，而那次「逃逸」也没有拿出任何取证痕迹。',
  ),
  tags: ['safety', 'governance', 'infrastructure'],
};

export default post;
