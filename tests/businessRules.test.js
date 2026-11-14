// tests/businessRules.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { getDeliveryFee, DELIVERY_FEE } from '../src/rules/businessRules.js';

test('valid input: subtotal below threshold pays delivery fee', () => {
  const result = getDeliveryFee(1500);
  assert.equal(result.fee, DELIVERY_FEE);
  assert.equal(result.isFree, false);
  assert.equal(result.amountToFreeDelivery, 500);
});

test('exactly at the limit: Rs. 2000 gets free delivery', () => {
  const result = getDeliveryFee(2000);
  assert.equal(result.fee, 0);
  assert.equal(result.isFree, true);
});

test('breaking the rule: Rs. 1999 does not get free delivery', () => {
  const result = getDeliveryFee(1999);
  assert.equal(result.isFree, false);
  assert.equal(result.fee, 250);
  assert.equal(result.amountToFreeDelivery, 1);
});

test('empty order has no delivery fee', () => {
  assert.equal(getDeliveryFee(0).fee, 0);
});