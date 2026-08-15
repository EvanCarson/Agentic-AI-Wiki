import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-15',
  slug: 'deepgram-vs-assemblyai-vs-elevenlabs-vs-speechmatics-stt',
  title: L(
    'Deepgram vs AssemblyAI vs ElevenLabs vs Speechmatics: You Are Buying a Turn Detector',
    'Deepgram、AssemblyAI、ElevenLabs 与 Speechmatics：你买的是一个话轮检测器',
  ),
  summary: L(
    'Word error rate is close to settled between the four, and a couple of points of it lands on words your intent classifier ignores. The slice that decides whether a voice agent feels human is end-of-turn detection — several times larger than the transcription latency beneath it, and the one thing the four providers genuinely disagree about.',
    '四家之间的词错误率已接近尘埃落定，而那一两个点大多落在意图分类器根本不看的虚词上。真正决定一台语音智能体像不像人的，是话轮结束检测——它比底下的转写延迟大出好几倍，也是这四家真正存在分歧的那一件事。',
  ),
  tags: ['agent-comparison', 'voice-agents', 'realtime', 'infrastructure'],
};

export default post;
