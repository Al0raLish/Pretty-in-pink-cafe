// src/rules/businessRules.js

export const MAX_QUANTITY_PER_ITEM = 10;
export const FREE_DELIVERY_THRESHOLD = 2000; // Rs.
export const DELIVERY_FEE = 250;             // Rs.

/**
 * RULE 1: Availability / capacity.
 * Unavailable or sold-out items cannot be ordered.
 * Quantity must be 1 to min(stock, 10).
 */
export function checkQuantity(item, quantity) {
  if (!item.available || item.stock <= 0) {
    return { valid: false, max: 0, message: `${item.name} is currently unavailable.` };
  }
  const max = Math.min(item.stock, MAX_QUANTITY_PER_ITEM);
  if (!Number.isInteger(quantity) || quantity < 1) {
    return { valid: false, max, message: 'Quantity must be at least 1.' };
  }
  if (quantity > max) {
    return { valid: false, max, message: `You can order at most ${max} of ${item.name}.` };
  }
  return { valid: true, max, message: '' };
}

/**
 * RULE 2: Compatibility.
 * Only the sizes and add-ons listed on the item are allowed.
 * Items with sizes require one to be chosen.
 */
export function checkCustomization(item, sizeId, addOnIds = []) {
  if (item.sizes.length > 0 && !item.sizes.includes(sizeId)) {
    return { valid: false, message: `Please choose a valid size for ${item.name}.` };
  }
  if (item.sizes.length === 0 && sizeId) {
    return { valid: false, message: `${item.name} does not come in sizes.` };
  }
  const invalid = addOnIds.filter((id) => !item.addOns.includes(id));
  if (invalid.length > 0) {
    return { valid: false, message: `Some add-ons are not available for ${item.name}.` };
  }
  return { valid: true, message: '' };
}

/**
 * RULE 3: Delivery fee.
 * Free delivery when the subtotal is Rs. 2,000 or more.
 * Otherwise Rs. 250. An empty order has no fee.
 */
export function getDeliveryFee(subtotal) {
  if (!Number.isFinite(subtotal) || subtotal <= 0) {
    return { fee: 0, isFree: false, amountToFreeDelivery: FREE_DELIVERY_THRESHOLD };
  }
  if (subtotal >= FREE_DELIVERY_THRESHOLD) {
    return { fee: 0, isFree: true, amountToFreeDelivery: 0 };
  }
  return {
    fee: DELIVERY_FEE,
    isFree: false,
    amountToFreeDelivery: FREE_DELIVERY_THRESHOLD - subtotal,
  };
}