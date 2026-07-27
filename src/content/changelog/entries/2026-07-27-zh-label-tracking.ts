import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-27',
  title: L(
    'Chinese labels are no longer spaced out character by character',
    '中文标签不再被逐字拉开',
  ),
  items: [
    L(
      'The small uppercase labels used throughout the site — navigation, the wordmark, section kickers, date lines — are letterspaced, which suits Latin capitals. Applied to Chinese it prised every character apart: 1.32 pixels of extra space between each character of a four-character menu item set at 11 pixels, about 12% of the character width. Chinese characters are drawn on a fixed square grid where that spacing is already built into the glyph, so the effect read as broken spacing rather than as deliberate letterspacing. Chinese labels now sit at their natural spacing.',
      '站内使用的小号大写标签——导航、站点标识、板块引题、日期行——都带有字距加宽，这适合拉丁字母大写。但应用到中文上，它会把每个字逐一撑开：11 像素字号下，四字菜单项的字与字之间被额外拉开 1.32 像素，约为字宽的 12%。汉字排布在固定的方形字身框上，该有的间距本就包含在字形之内，因此这一效果看起来像是排版出错，而非有意为之的字距调整。现在中文标签恢复为自然字距。',
    ),
    L(
      'English pages are unchanged, down to the pixel. The fix scales the whole label system by one factor rather than picking new spacing values, so there was no opportunity for English spacing to shift while fixing Chinese.',
      '英文页面完全未变，精确到像素。此项修复是对整套标签体系统一施加一个缩放系数，而不是逐一挑选新的字距数值，因此在修复中文的同时，英文字距不存在被改动的可能。',
    ),
    L(
      'The design check now measures letterspacing on Chinese text relative to its font size, so this cannot come back through a new component at a different size.',
      '设计检查现在会按字号比例核查中文文字的字距，确保该问题不会因新增了使用不同字号的组件而重新出现。',
    ),
  ],
};
export default entry;
