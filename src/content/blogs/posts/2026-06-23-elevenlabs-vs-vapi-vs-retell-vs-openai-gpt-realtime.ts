import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-23',
  slug: 'elevenlabs-vs-vapi-vs-retell-vs-openai-gpt-realtime',
  title: L(
    'ElevenLabs vs Vapi vs Retell vs OpenAI gpt-realtime: Four Bets on How Your Agent Should Talk Back',
    'ElevenLabs、Vapi、Retell 与 OpenAI gpt-realtime：让智能体开口说话的四种下注方式',
  ),
  summary: L(
    'Voice is now the interface most agents will spend the most time in — and four platforms have made architecturally opposite bets on how to wire speech, language, and tool-use into one round-trip. The right pick depends less on TTS voice quality than on whether you control the audio path, the model, or just the prompt.',
    '语音正变成大多数智能体停留时间最久的界面——而四家平台在如何把语音、语言与工具调用合并到一次往返里做了架构上完全相反的下注。选哪一家，关键并非 TTS 音质，而是你掌握的是音频通路、模型本身，还是只能改一下 prompt。',
  ),
  tags: ['agent-comparison', 'voice-agents', 'realtime', 'developer-tools'],
};

export default post;
