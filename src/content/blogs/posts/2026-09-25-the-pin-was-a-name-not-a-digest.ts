import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-25',
  slug: 'the-pin-was-a-name-not-a-digest',
  title: L(
    'The pin was a name, not a digest',
    '那个钉是一个名字，不是一个摘要',
  ),
  searchTitle: {
    en: 'Plugin4Shell and the unverified pin',
  },
  summary: L(
    'Four coding agents pinned plugins to a 40-character commit SHA and none of them checked what they got, because a 40-hex string is also a legal branch name. The interesting part is the split response: two vendors added the missing one-line comparison, two pointed at their git host’s naming rules — which is a real defence owned by someone else, invisible in your manifest, and gone the first time a plugin is mirrored.',
    '四个编程智能体都把插件钉在一个 40 字符的 commit SHA 上，却没有一个去核对自己拿到了什么，因为 40 位十六进制串同时也是一个合法的分支名。真正有意思的是分裂的应对：两家厂商补上了那行缺失的比对，两家指向了自己 git 托管方的命名规则——那是一道真实存在、却由别人拥有的防御，在你的清单里看不见，并且在插件第一次被镜像时就消失了。',
  ),
  tags: ['safety', 'coding-agents', 'developer-tools', 'infrastructure', 'agentic-ai'],
};

export default post;
