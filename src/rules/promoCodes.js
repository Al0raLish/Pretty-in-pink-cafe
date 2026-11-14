// src/rules/promoCodes.js
// Fictional promo codes. Pure functions, no React, so Node can test them.

export const PROMO_CODES = {
  PINK10: { description: '10% off (up to Rs. 300)', minSubtotal: 1000, type: 'percent', value: 10, maxDiscount: 300 },
  FREESHIP: { description: 'Free delivery', minSubtotal: 800, type: 'delivery' },
};

const rs = (n) => `Rs. ${n.toLocaleString('en-PK')}`;

// Always returns the same shape, so the interface can rely on it.
export function applyPromo(code, subtotal) {
  const clean = String(code ?? '').trim().toUpperCase();
  const none = { valid: false, code: clean, discount: 0, freeDelivery: false };

  if (clean === '') return { ...none, message: 'Enter a promo code.' };
  // Object.hasOwn avoids accidental matches like "constructor"
  if (!Object.hasOwn(PROMO_CODES, clean)) {
    return { ...none, message: 'That promo code is not recognised.' };
  }

  const promo = PROMO_CODES[clean];
  if (subtotal < promo.minSubtotal) {
    return {
      ...none,
      message: `${clean} needs items worth ${rs(promo.minSubtotal)} or more. Add ${rs(promo.minSubtotal - subtotal)} more.`,
    };
  }

  if (promo.type === 'percent') {
    const discount = Math.min(Math.floor((subtotal * promo.value) / 100), promo.maxDiscount);
    return { valid: true, code: clean, discount, freeDelivery: false, message: `${clean} applied: ${rs(discount)} off.` };
  }
  return { valid: true, code: clean, discount: 0, freeDelivery: true, message: `${clean} applied: free delivery.` };
}