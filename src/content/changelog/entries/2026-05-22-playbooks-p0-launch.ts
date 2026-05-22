import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-22',
  title: L(
    'Added P0 Playbooks: finance, healthcare, legal, browser, IDE, outbound voice, progressive-disclosure UX',
    '新增 P0 实战手册：金融、医疗、法律、浏览器、IDE、外呼语音、渐进式披露 UX',
  ),
  items: [
    L(
      'Seven new Playbook entries close the launch-coherence gaps the IA expansion flagged for Playbooks.',
      '七篇新增实战手册条目，填补了 IA 扩展规划中针对实战手册板块标出的"上线连贯性"缺口。',
    ),
    L(
      'Domain playbooks: finance-agents, healthcare-agents, legal-agents.',
      '领域实战手册：finance-agents、healthcare-agents、legal-agents。',
    ),
    L(
      'Coding & UX: browser-agents, ide-agents, outbound-voice-agents, progressive-disclosure-ux.',
      '编码与交互：browser-agents、ide-agents、outbound-voice-agents、progressive-disclosure-ux。',
    ),
  ],
};
export default entry;
