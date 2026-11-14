import { useState } from 'react';
import { menuItems } from '../data/menuItems.js';
import { useMenu } from '../context/useMenu.js';
import { useCart } from '../context/useCart.js';
import { readDemoSettings, writeDemoSettings } from '../services/menuService.js';

const NO_DEMO = { failLoad: false, emptyMenu: false, soldOutIds: [] };

export default function DemoControls() {
  const { reload } = useMenu();
  const { recheckCart } = useCart();
  const [settings, setSettings] = useState(readDemoSettings);
  const [pickId, setPickId] = useState(menuItems[0].id);
  const [message, setMessage] = useState('');

  // Save the new settings, reload the menu, and re-check the cart against them
  function apply(next, text) {
    setSettings(next);
    writeDemoSettings(next);
    reload();
    const notices = recheckCart();
    setMessage(
      notices.length > 0
        ? `${text} ${notices.length} cart change(s) were made. Open the cart to read them.`
        : text
    );
  }

  function markSoldOut() {
    const ids = [...new Set([...settings.soldOutIds, pickId])];
    apply({ ...settings, soldOutIds: ids }, 'Item marked as sold out.');
  }

  const soldOutNames = menuItems.filter((m) => settings.soldOutIds.includes(m.id)).map((m) => m.name);

  return (
    <section className="demo-controls" aria-label="Demonstration controls">
      <div className="container">
        <details>
          <summary>Demonstration controls (for assessment)</summary>
          <p className="hint">
            These controls only exist to demonstrate error handling and changed availability.
          </p>

          <label className="check-label">
            <input type="checkbox" checked={settings.failLoad}
              onChange={(e) => apply({ ...settings, failLoad: e.target.checked },
                e.target.checked ? 'Menu loading will now fail.' : 'Menu loading restored.')} />
            Simulate menu loading failure
          </label>

          <label className="check-label">
            <input type="checkbox" checked={settings.emptyMenu}
              onChange={(e) => apply({ ...settings, emptyMenu: e.target.checked },
                e.target.checked ? 'Menu is now empty.' : 'Menu restored.')} />
            Simulate an empty menu
          </label>

          <div className="field">
            <label htmlFor="demo-item">Change availability: mark an item as sold out</label>
            <div className="promo-row">
              <select id="demo-item" value={pickId} onChange={(e) => setPickId(e.target.value)}>
                {menuItems.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              <button type="button" className="btn btn-secondary" onClick={markSoldOut}>Mark sold out</button>
            </div>
          </div>

          <p className="hint">
            Marked sold out by demo: {soldOutNames.length > 0 ? soldOutNames.join(', ') : 'none'}.
          </p>
          <button type="button" className="btn btn-secondary"
            onClick={() => apply(NO_DEMO, 'All demo settings reset.')}>
            Reset demo settings
          </button>

          <p role="status" className="hint">{message}</p>
        </details>
      </div>
    </section>
  );
}