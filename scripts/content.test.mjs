import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateLesson, buildContent } from './content.mjs';
const lesson = JSON.parse(
  readFileSync('content/lessons/sincerity.json', 'utf8'),
);
const run = (value, slugs = new Set(), orders = new Set()) =>
  validateLesson(
    value,
    slugs,
    orders,
    { '98:5': 'source', '98:1': 'prefixed' },
    { sincerity: {} },
  );
test('checked-in religious corpus and references pass the complete integrity pipeline', () =>
  buildContent());
test('invalid Quran references cannot reach a lesson', () =>
  assert.throws(() => run({ ...lesson, ayah: '115:1' }), /Unknown ayah/));
test('unknown hadith references fail rather than rendering invented fallback text', () =>
  assert.throws(() => run({ ...lesson, hadith: 'missing' }), /Unknown hadith/));
test('duplicate lesson URLs and ordering are rejected', () => {
  assert.throws(() => run(lesson, new Set([lesson.slug])), /Duplicate slug/);
  assert.throws(
    () => run(lesson, new Set(), new Set([lesson.order])),
    /duplicate order/,
  );
});
test('opening verses cannot silently include an attached basmala', () =>
  assert.throws(() => run({ ...lesson, ayah: '98:1' }), /basmala/));
test('handwritten Uthmani characters in editorial prose are rejected', () =>
  assert.throws(
    () => run({ ...lesson, meaning: '\u0671 test' }),
    /Do not type/,
  ));
test('empty suggested actions fail content review checks', () =>
  assert.throws(
    () => run({ ...lesson, actions: ['', 'two', 'three'] }),
    /nonempty/,
  ));
test('lessons require concrete examples of behavior to avoid', () => {
  assert.throws(() => run({ ...lesson, avoid: [] }), /behaviors to avoid/);
});
test('supplementary evidence must resolve to a real verse', () => {
  assert.throws(
    () => run({ ...lesson, boundaryAyah: '115:9' }),
    /Unknown boundary/,
  );
});
