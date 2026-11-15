// src/utils/cart.js
import { SIZES, ADD_ONS } from '../data/menuItems.js';
import { getCurrentItems } from '../services/menuService.js';import { checkQuantity, checkCustomization, getDeliveryFee } from '../rules/businessRules.js';
import { applyPromo } from '../rules/promoCodes.js';
// Same item + same size + same add-ons = same cart line
export function makeLineKey(itemId, sizeId, addOnIds) {
  return `${itemId}|${sizeId ?? 'none'}|${[...addOnIds].sort().join(',')}`;
}

// Price of ONE unit: base + size extra + add-ons
export function getUnitPrice(item, sizeId, addOnIds = []) {
  const size = SIZES.find((s) => s.id === sizeId);
  const addOnTotal = ADD_ONS
    .filter((a) => addOnIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  return item.price + (size ? size.extra : 0) + addOnTotal;
}

// Total quantity of one menu item across ALL its cart lines
export function quantityOfItem(lines, itemId) {
  return lines
    .filter((l) => l.itemId === itemId)
    .reduce((sum, l) => sum + l.quantity, 0);
}

// Turns saved lines (IDs only) into display lines + totals. All derived, never stored.
export function buildSummary(lines, items = getCurrentItems(), promoCode = '', isMember = false) {
  const detailed = lines
    .map((line) => {
      const item = items.find((i) => i.id === line.itemId);
      if (!item) return null;
      const unitPrice = getUnitPrice(item, line.sizeId, line.addOnIds);
      return {
        ...line,
        item,
        sizeLabel: SIZES.find((s) => s.id === line.sizeId)?.label ?? null,
        addOnLabels: ADD_ONS.filter((a) => line.addOnIds.includes(a.id)).map((a) => a.label),
        unitPrice,
        lineTotal: unitPrice * line.quantity,
      };
    })
    .filter(Boolean);

  const subtotal = detailed.reduce((sum, l) => sum + l.lineTotal, 0);
  const itemCount = detailed.reduce((sum, l) => sum + l.quantity, 0);
  // Free-delivery threshold is judged on the subtotal BEFORE any promo discount.
  const delivery = getDeliveryFee(subtotal);

  // The promo is re-checked every time, so if the cart shrinks below
  // the minimum, the discount disappears automatically with an explanation.
  const promo = promoCode ? applyPromo(promoCode, subtotal, isMember) : null;
  const discount = promo?.valid ? promo.discount : 0;
  const deliveryFee = promo?.valid && promo.freeDelivery ? 0 : delivery.fee;

  return {
    lines: detailed,
    itemCount,
    subtotal,
    delivery,
    promo,
    discount,
    deliveryFee,
    total: subtotal - discount + deliveryFee,
  };
}

// Checks saved/old lines against the CURRENT menu and rules.
// Returns the lines that are still valid plus plain-English notices for anything changed.
export function reconcileCart(saved, items = getCurrentItems()) {
  const lines = [];
  const notices = [];
  const usedByItem = {};

  for (const raw of saved) {
    if (!raw || typeof raw.itemId !== 'string') continue;

    const item = items.find((i) => i.id === raw.itemId);
    if (!item) {
      notices.push('An item in your saved cart is no longer on our menu and was removed.');
      continue;
    }

    const sizeId = raw.sizeId ?? null;
    const addOnIds = Array.isArray(raw.addOnIds) ? raw.addOnIds : [];
    let quantity = Number(raw.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) continue;

    if (!item.available || item.stock <= 0) {
      notices.push(`${item.name} is now unavailable and was removed from your cart.`);
      continue;
    }
    if (!checkCustomization(item, sizeId, addOnIds).valid) {
      notices.push(`${item.name} had options that are no longer valid, so it was removed. Please add it again.`);
      continue;
    }

    const { max } = checkQuantity(item, 1);
    const used = usedByItem[item.id] ?? 0;
    const room = max - used;
    if (room <= 0) {
      notices.push(`${item.name} exceeded the order limit and was removed.`);
      continue;
    }
    if (quantity > room) {
      notices.push(`${item.name} was reduced to ${room} because of the order limit.`);
      quantity = room;
    }

    usedByItem[item.id] = used + quantity;
    lines.push({
      key: makeLineKey(item.id, sizeId, addOnIds),
      itemId: item.id,
      sizeId,
      addOnIds: [...addOnIds].sort(),
      quantity,
    });
  }
  return { lines, notices };
}