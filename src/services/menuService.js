// src/services/menuService.js
// Simulated "server". All data is local, but it is loaded through a Promise
// so the app has real loading, failure and retry states.
import { menuItems } from '../data/menuItems.js';

const DEMO_KEY = 'pip-cafe-demo-v1';
export const LOAD_DELAY_MS = 700;

// Demo settings live in localStorage so a refresh keeps them.
// try/catch also makes this safe when localStorage doesn't exist (Node tests).
export function readDemoSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(DEMO_KEY));
    return {
      failLoad: parsed?.failLoad === true,
      emptyMenu: parsed?.emptyMenu === true,
      soldOutIds: Array.isArray(parsed?.soldOutIds)
        ? parsed.soldOutIds.filter((id) => typeof id === 'string')
        : [],
    };
  } catch {
    return { failLoad: false, emptyMenu: false, soldOutIds: [] };
  }
}

export function writeDemoSettings(settings) {
  try {
    localStorage.setItem(DEMO_KEY, JSON.stringify(settings));
  } catch {
    // Storage blocked: demo settings just won't persist
  }
}

// The menu as it is RIGHT NOW: original data, minus anything the demo marked sold out.
// The cart uses this too, so menu and cart can never disagree.
export function getCurrentItems() {
  const { soldOutIds } = readDemoSettings();
  return menuItems.map((item) =>
    soldOutIds.includes(item.id) ? { ...item, available: false, stock: 0 } : item
  );
}

// Returns a Promise, like a real network request would.
export function loadMenu() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const settings = readDemoSettings();
      if (settings.failLoad) {
        reject(new Error('The menu could not be loaded. (Simulated failure.)'));
      } else {
        resolve(settings.emptyMenu ? [] : getCurrentItems());
      }
    }, LOAD_DELAY_MS);
  });
}