import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-27',
  title: L(
    'Fixed three defects the design checks were not looking at',
    '修复了三处设计检查此前未覆盖到的缺陷',
  ),
  items: [
    L(
      'The active tab label on code samples that show both an Anthropic and an OpenAI version was too low-contrast to meet the accessibility standard — it sat at 4.2 against a required 4.5, on 20 pages. The label is now a slightly lighter shade of the same colour; the underline beneath it keeps the exact brand colour, which as a line rather than text has a lower requirement.',
      '同时提供 Anthropic 与 OpenAI 两个版本的代码示例中，当前选中的标签文字对比度未达无障碍标准——实测 4.2，标准要求 4.5，涉及 20 个页面。现在标签文字改用同色系中略浅的一档；其下方的下划线仍保留品牌原色，因为作为线条而非文字，它适用的标准更低。',
    ),
    L(
      'The small "API" caption on those same tab strips was well below the standard at 2.8, and now uses the code palette\'s own caption colour.',
      '同一标签条上的小号「API」说明文字对比度仅为 2.8，远低于标准，现已改用代码配色方案中自带的说明文字颜色。',
    ),
    L(
      'On phones, a code block placed inside a Q&A answer pushed the page 4 pixels wider than the screen, causing the whole page to slide sideways. Both the answer box and the code block inside it were widening themselves to reach the screen edge, so the inner one overshot.',
      '在手机上，嵌在问答回答内部的代码块会使页面比屏幕宽出 4 像素，导致整页可以横向滑动。原因是回答框与其内部的代码块都在各自向外扩展以贴齐屏幕边缘，结果内层多扩展了一次。',
    ),
    L(
      'All three had been live for some time and all three were invisible to the automated design checks, which audited a hand-picked list of pages that happened not to include any page carrying these components. The check now derives its page list from the built site: for each component it finds a page that genuinely contains it, and fails loudly if a component it expects has disappeared. Finding these three was the first thing it did.',
      '这三处缺陷都已上线一段时间，且都未被自动化设计检查发现——此前检查只覆盖一份人工挑选的页面清单，而这份清单恰好不包含任何含有上述组件的页面。现在检查会从构建产物中自动推导页面清单：针对每个组件，找到一个真正包含它的页面；若某个预期组件已不存在，则直接报错。这三处问题正是它上线后发现的第一批。',
    ),
  ],
};
export default entry;
