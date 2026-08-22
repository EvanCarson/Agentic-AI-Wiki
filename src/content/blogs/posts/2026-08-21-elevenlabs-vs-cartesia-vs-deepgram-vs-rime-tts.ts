import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-21',
  slug: 'elevenlabs-vs-cartesia-vs-deepgram-vs-rime-tts',
  title: L(
    'ElevenLabs vs Cartesia vs Deepgram vs Rime: buy the tail, not the average',
    'ElevenLabs vs Cartesia vs Deepgram vs Rime：买的是长尾，不是平均值',
  ),
  summary: L(
    'These four advertise time-to-first-audio between 40 and 200 ms, and an independent harness measures their cloud medians at 188 to 313 ms — but the number that breaks a phone call is the spread, not the median, and one vendor\'s jitter is nearly four times another\'s. Price moves about 2.5× across the field and predicts neither. The tail is bought with deployment.',
    '这四家宣称的首字节音频时延在 40 到 200 毫秒之间，而独立测试台量到的云端中位数是 188 到 313 毫秒——但真正毁掉一通电话的是离散度而不是中位数，其中一家的抖动接近另一家的四倍。价格在这片市场里相差约 2.5 倍，而它两个都预测不了。长尾是用部署方式买来的。',
  ),
  tags: ['agent-comparison', 'voice-agents', 'realtime', 'infrastructure', 'cost'],
};

export default post;
