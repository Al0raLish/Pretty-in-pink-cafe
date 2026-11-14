import test from 'node:test';
import assert from 'node:assert/strict';
import { applyPromo } from '../src/rules/promoCodes.js';
import { pointsForTotal } from '../src/rules/loyalty.js';

test('PINK10 gives 10% off to a member on a normal order', () => {
  const r = applyPromo('pink10', 2000, true); // lowercase is accepted
  assert.equal(r.valid, true);
  assert.equal(r.discount, 200);
});

test('PINK10 works exactly at the Rs. 1000 minimum', () => {
  assert.equal(applyPromo('PINK10', 1000, true).discount, 100);
});

test('PINK10 is rejected just below the minimum', () => {
  const r = applyPromo('PINK10', 999, true);
  assert.equal(r.valid, false);
  assert.equal(r.discount, 0);
});

test('PINK10 discount is capped at Rs. 300', () => {
  assert.equal(applyPromo('PINK10', 5000, true).discount, 300);
});

test('PINK10 is refused to non-members, even above the minimum', () => {
  const r = applyPromo('PINK10', 5000, false);
  assert.equal(r.valid, false);
  assert.equal(r.needsMembership, true);
});

test('FREESHIP works for non-members', () => {
  assert.equal(applyPromo('FREESHIP', 900, false).freeDelivery, true);
});

test('unknown and empty codes are rejected', () => {
  assert.equal(applyPromo('BANANA', 3000, true).valid, false);
  assert.equal(applyPromo('constructor', 3000, true).valid, false);
  assert.equal(applyPromo('', 3000, true).valid, false);
});

test('loyalty: 1 point per full Rs. 100', () => {
  assert.equal(pointsForTotal(1999), 19);
  assert.equal(pointsForTotal(99), 0);
  assert.equal(pointsForTotal(0), 0);
});