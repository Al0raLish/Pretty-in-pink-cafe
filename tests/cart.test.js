import test from 'node:test';
import assert from 'node:assert/strict';
import { menuItems } from '../src/data/menuItems.js';
import { getUnitPrice, reconcileCart, buildSummary } from '../src/utils/cart.js';
import { validateCheckout } from '../src/utils/validation.js';

const latte = menuItems.find((m) => m.id === 'rose-petal-latte');

test('unit price = base + size + add-ons', () => {
  // 520 + 60 (medium) + 80 (oat milk) + 100 (extra shot)
  assert.equal(getUnitPrice(latte, 'medium', ['oat-milk', 'extra-shot']), 760);
});

test('saved cart: unavailable item is removed with a notice', () => {
  const saved = [{ itemId: 'raspberry-rose-macarons', sizeId: null, addOnIds: [], quantity: 1 }];
  const result = reconcileCart(saved);
  assert.equal(result.lines.length, 0);
  assert.equal(result.notices.length, 1);
});

test('saved cart: quantity above the limit is reduced to 10', () => {
  const saved = [{ itemId: 'butter-croissant', sizeId: null, addOnIds: [], quantity: 15 }];
  const result = reconcileCart(saved);
  assert.equal(result.lines[0].quantity, 10);
});

test('checkout validation accepts good input and rejects a bad phone', () => {
  const good = { name: 'Test User', email: 'test@example.com', phone: '0300 1234567',
    address: 'House 1, Street 2, F-7, Islamabad', notes: '', payment: 'cod' };
  assert.deepEqual(validateCheckout(good), {});
  assert.ok(validateCheckout({ ...good, phone: '12345' }).phone);
});

test('summary: PINK10 discounts a member but not a non-member', () => {
  // 3 x Rose Petal Latte (small) = Rs. 1,560, above the Rs. 1,000 minimum
  const lines = [{ key: 'k', itemId: 'rose-petal-latte', sizeId: 'small', addOnIds: [], quantity: 3 }];
  const member = buildSummary(lines, menuItems, 'PINK10', true);
  const guest = buildSummary(lines, menuItems, 'PINK10', false);
  assert.equal(member.discount, 156);
  assert.equal(member.total, member.subtotal - 156 + member.deliveryFee);
  assert.equal(guest.discount, 0);
});