import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-18',
  title: L('Security hardening & AdSense', '安全加固与 AdSense 接入'),
  items: [
    L('Added security response headers: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy.',
      '新增安全响应头：X-Content-Type-Options、X-Frame-Options、Referrer-Policy 与 Permissions-Policy。'),
    L('Integrated Google AdSense site-wide and added ads.txt seller authorization.',
      '全站接入 Google AdSense，并添加 ads.txt 卖家授权文件。'),
    L('Hardened structured-data (JSON-LD) output against script-tag breakout.',
      '加固结构化数据（JSON-LD）输出，防止 script 标签逃逸。'),
  ],
};
export default entry;
