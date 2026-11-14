import { useEffect, useState } from 'react';
import { CartContext } from './CartContext.js';
import { menuItems } from '../data/menuItems.js';
import { checkQuantity, checkCustomization } from '../rules/businessRules.js';
import { applyPromo } from '../rules/promoCodes.js';
import { pointsForTotal } from '../rules/loyalty.js';
import {
  buildSummary, makeLineKey, quantityOfItem, reconcileCart,
} from '../utils/cart.js';

const CART_KEY = 'pip-cafe-cart-v1';
const ORDER_KEY = 'pip-cafe-last-order-v1';
const PROMO_KEY = 'pip-cafe-promo-v1';
const POINTS_KEY = 'pip-cafe-points-v1';

// Runs once on first load. Reads localStorage safely, then re-checks it against current data.
function loadSavedCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return { lines: [], notices: [] };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return { lines: [], notices: [] };
    return reconcileCart(parsed);
  } catch {
    return { lines: [], notices: [] };
  }
}

function loadLastOrder() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ORDER_KEY));
    return parsed && typeof parsed.orderNumber === 'string' ? parsed : null;
  } catch {
    return null;
  }
}

function loadPoints() {
  try {
    const n = Number(localStorage.getItem(POINTS_KEY));
    return Number.isInteger(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
}

function loadPromo() {
  try {
    return localStorage.getItem(PROMO_KEY) ?? '';
  } catch {
    return '';
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage full or blocked: the app still works, it just won't be saved
  }
}

export default function CartProvider({ children }) {
  const [initial] = useState(loadSavedCart);
  const [lines, setLines] = useState(initial.lines);
  const [notices, setNotices] = useState(initial.notices);
  const [lastOrder, setLastOrder] = useState(loadLastOrder);
  const [promoCode, setPromoCode] = useState(loadPromo);
  const [loyaltyPoints, setLoyaltyPoints] = useState(loadPoints);

  // Effects: keep localStorage in sync whenever these values change
  useEffect(() => { save(CART_KEY, JSON.stringify(lines)); }, [lines]);
  useEffect(() => { if (lastOrder) save(ORDER_KEY, JSON.stringify(lastOrder)); }, [lastOrder]);
  useEffect(() => { save(PROMO_KEY, promoCode); }, [promoCode]);
  useEffect(() => { save(POINTS_KEY, String(loyaltyPoints)); }, [loyaltyPoints]);

  function addToCart(item, { sizeId, addOnIds, quantity }) {
    const custom = checkCustomization(item, sizeId, addOnIds);
    if (!custom.valid) return custom;

    const single = checkQuantity(item, quantity);
    if (!single.valid) return single;

    const inCart = quantityOfItem(lines, item.id);
    const combined = checkQuantity(item, inCart + quantity);
    if (!combined.valid) {
      return {
        valid: false,
        message: `You already have ${inCart} in your cart. The limit is ${combined.max} of ${item.name} per order.`,
      };
    }

    const key = makeLineKey(item.id, sizeId, addOnIds);
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, quantity: l.quantity + quantity } : l));
      }
      return [
        ...prev,
        { key, itemId: item.id, sizeId: sizeId ?? null, addOnIds: [...addOnIds].sort(), quantity },
      ];
    });
    return { valid: true, message: `${quantity} × ${item.name} added to your cart.` };
  }

  function updateQuantity(key, quantity) {
    const line = lines.find((l) => l.key === key);
    const item = line && menuItems.find((m) => m.id === line.itemId);
    if (!line || !item) return { valid: false, message: 'That item is no longer in your cart.' };
    if (!Number.isInteger(quantity) || quantity < 1) {
      return { valid: false, message: 'Quantity must be at least 1. Use Remove to delete the item.' };
    }
    const others = quantityOfItem(lines, line.itemId) - line.quantity;
    const result = checkQuantity(item, others + quantity);
    if (!result.valid) return result;

    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, quantity } : l)));
    return { valid: true, message: '' };
  }

  function removeLine(key) {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }

  function clearCart() {
    setLines([]);
    setPromoCode('');
  }

  function replaceCart(newLines, newNotices) {
    setLines(newLines);
    setNotices(newNotices);
  }

  function dismissNotices() {
    setNotices([]);
  }

  // Checks the code against the CURRENT subtotal; only saves it if valid.
  function applyPromoCode(code) {
    const { subtotal } = buildSummary(lines);
    const result = applyPromo(code, subtotal);
    if (result.valid) setPromoCode(result.code);
    return result;
  }

  function removePromoCode() {
    setPromoCode('');
  }

  // Builds a simulated order. Contains NO personal details.
  function placeOrder(paymentId) {
    const s = buildSummary(lines, menuItems, promoCode);
    const pointsEarned = pointsForTotal(s.total);
    const order = {
      orderNumber: `PIP-${Math.floor(100000 + Math.random() * 900000)}`,
      placedAt: new Date().toISOString(),
      paymentMethod: paymentId,
      items: s.lines.map((l) => ({
        name: l.item.name,
        sizeLabel: l.sizeLabel,
        addOnLabels: l.addOnLabels,
        quantity: l.quantity,
        lineTotal: l.lineTotal,
      })),
      subtotal: s.subtotal,
      promoCode: s.promo?.valid ? s.promo.code : null,
      discount: s.discount,
      deliveryFee: s.deliveryFee,
      total: s.total,
      pointsEarned,
    };
    setLastOrder(order);
    setLoyaltyPoints((prev) => prev + pointsEarned); // functional update
    setLines([]);
    setNotices([]);
    setPromoCode('');
    return order;
  }

  const value = {
    lines,
    notices,
    lastOrder,
    promoCode,
    loyaltyPoints,
    summary: buildSummary(lines, menuItems, promoCode), // derived value
    quantityOfItem: (itemId) => quantityOfItem(lines, itemId),
    addToCart,
    updateQuantity,
    removeLine,
    clearCart,
    replaceCart,
    dismissNotices,
    applyPromoCode,
    removePromoCode,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}