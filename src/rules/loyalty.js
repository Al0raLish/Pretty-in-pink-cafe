// src/rules/loyalty.js
// 1 "Pink Point" for every full Rs. 100 paid. Earn-only (no redemption).
export const RUPEES_PER_POINT = 100;

export function pointsForTotal(total) {
  if (!Number.isFinite(total) || total <= 0) return 0;
  return Math.floor(total / RUPEES_PER_POINT);
}