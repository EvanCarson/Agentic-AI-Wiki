import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-07',
  slug: 'e2b-vs-daytona-vs-modal-vs-cloudflare-sandboxes',
  title: L(
    'E2B vs Daytona vs Modal vs Cloudflare Sandboxes: Pick on the Billing Shape',
    'E2B vs Daytona vs Modal vs Cloudflare Sandbox：照计费形态来选',
  ),
  summary: L(
    'A sandbox serving a twenty-step agent spends about six sevenths of its life idle, waiting for a model to think. So cold-start milliseconds and per-vCPU-hour rates — the two numbers every comparison leads with — are the two that matter least. What decides your bill is whether idle is billed; what decides your blast radius is the egress default.',
    '一个服务二十步智能体的沙箱，大约七分之六的寿命都在空转，等模型思考完。所以冷启动毫秒数与每 vCPU 小时单价——每份对比都拿来打头阵的两个数字——恰恰是最不要紧的两个。真正决定账单的是空闲时段计不计费，真正决定爆炸半径的是出站网络的默认设置。',
  ),
  tags: ['agent-comparison', 'sandboxing', 'infrastructure', 'code-execution'],
};

export default post;
