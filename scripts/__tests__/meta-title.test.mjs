import { test } from 'node:test';
import assert from 'node:assert/strict';
import { metaTitleFor, displayWidth } from '../../src/lib/meta-title.ts';

test('displayWidth counts CJK as two columns', () => {
  assert.equal(displayWidth('abc'), 3);
  assert.equal(displayWidth('智能体'), 6);
  assert.equal(displayWidth('MCP 智能体'), 4 + 6);
  // Fullwidth colon is wide; the ASCII one is not.
  assert.equal(displayWidth('：'), 2);
  assert.equal(displayWidth(':'), 1);
});

test('a headline inside the width budget is used unchanged', () => {
  const t = 'Stripe bought the meter, not the router';
  assert.equal(metaTitleFor(t, undefined), t);
});

test('an over-long headline is cut back to its pre-colon head', () => {
  assert.equal(
    metaTitleFor(
      'LangSmith vs Braintrust vs Helicone vs Arize Phoenix: Four Loops the Eval/Observability Stack Was Built to Close',
      undefined,
    ),
    'LangSmith vs Braintrust vs Helicone vs Arize Phoenix',
  );
});

test('the fullwidth colon works the same way for Chinese headlines', () => {
  assert.equal(
    metaTitleFor('LangGraph、CrewAI 与 OpenAI Agents SDK：编排层的四种架构与它们各自的取舍', undefined),
    'LangGraph、CrewAI 与 OpenAI Agents SDK',
  );
});

test('the width floor is measured in columns, not characters', () => {
  // "月下载量 9700 万的 MCP" is 13 characters but only 22 columns, under the
  // floor — so it is rejected and the post needs an explicit searchTitle.
  // A character-based floor would have wrongly accepted it.
  const t = '月下载量 9700 万的 MCP：模型上下文协议是如何赢的——以及到了这种规模还有什么没解决';
  assert.equal(metaTitleFor(t, undefined), t);
  assert.equal(metaTitleFor(t, 'MCP 月下载量 9700 万：协议如何取胜'), 'MCP 月下载量 9700 万：协议如何取胜');
});

test('a head too short to stand alone is rejected, keeping the full headline', () => {
  // "MCP 2026-07-28" is a fragment, not a title — promoting it would be worse
  // than the truncation it avoids.
  const t = 'MCP 2026-07-28: Statelessness Was the Small Part and the State Just Moved Somewhere Else Entirely';
  assert.equal(metaTitleFor(t, undefined), t);
});

test('a headline with no colon at all is returned as-is', () => {
  const t = 'Half of Enterprises Scaled Back Their Agents. Seven Percent Can Compute the Ratio.';
  assert.equal(metaTitleFor(t, undefined), t);
});

test('an explicit searchTitle wins over both the headline and the derivation', () => {
  assert.equal(
    metaTitleFor(
      'Claude Code vs Codex CLI vs Cursor Agent vs Aider: Four Architectures of the Coding-Agent Loop',
      'Hand-written override',
    ),
    'Hand-written override',
  );
});

test('the derivation never returns something longer than the headline', () => {
  const cases = [
    'A: B',
    'Getting Started with OpenHuman: From Install to Your First Useful Answer',
    '短标题',
    'x402 vs AP2 vs ACP vs MPP: The Only Difference That Changes Your Risk',
  ];
  for (const t of cases) {
    assert.ok(displayWidth(metaTitleFor(t, undefined)) <= displayWidth(t), t);
  }
});
