import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart.js';
import { formatPrice } from '../utils/format.js';
import OrderSummary from '../components/OrderSummary.jsx';
import PromoCodeBox from '../components/PromoCodeBox.jsx';

export default function CartPage() {
  const { lines, notices, summary, updateQuantity, removeLine, clearCart, dismissNotices } = useCart();
  const [message, setMessage] = useState('');

  function handleQuantity(key, newQuantity) {
    const result = updateQuantity(key, newQuantity);
    setMessage(result.valid ? '' : result.message);
  }

  return (
    <>
      <h1>Your Cart</h1>

      {notices.length > 0 && (
        <div className="notice notice-warning" role="alert">
          <strong>We updated your cart:</strong>
          <ul>{notices.map((n) => <li key={n}>{n}</li>)}</ul>
          <button type="button" className="btn btn-secondary btn-small" onClick={dismissNotices}>
            Dismiss
          </button>
        </div>
      )}

      {lines.length === 0 ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add a coffee, a dessert or a light meal to get started.</p>
          <Link to="/menu" className="btn btn-primary">Browse the menu</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {message && <p className="notice notice-error" role="alert">{message}</p>}
            <ul className="cart-list">
              {summary.lines.map((line) => (
                <li key={line.key} className="cart-line">
                  <div>
                    <h2 className="cart-line-title">
                      <Link to={`/menu/${line.item.id}`}>{line.item.name}</Link>
                    </h2>
                    <p className="hint">
                      {line.sizeLabel ? `Size: ${line.sizeLabel}` : 'One size'}
                      {line.addOnLabels.length > 0 && ` · Add-ons: ${line.addOnLabels.join(', ')}`}
                    </p>
                    <p>{formatPrice(line.unitPrice)} each</p>
                  </div>

                  <div className="cart-line-controls">
                    <div className="stepper" role="group" aria-label={`Quantity of ${line.item.name}`}>
                      <button type="button" className="btn btn-secondary btn-small"
                        aria-label={`Decrease quantity of ${line.item.name}`}
                        disabled={line.quantity <= 1}
                        onClick={() => handleQuantity(line.key, line.quantity - 1)}>−</button>
                      <output aria-live="polite">{line.quantity}</output>
                      <button type="button" className="btn btn-secondary btn-small"
                        aria-label={`Increase quantity of ${line.item.name}`}
                        onClick={() => handleQuantity(line.key, line.quantity + 1)}>+</button>
                    </div>
                    <p className="line-total">{formatPrice(line.lineTotal)}</p>
                    <button type="button" className="link-button" onClick={() => removeLine(line.key)}>
                      Remove<span className="visually-hidden"> {line.item.name}</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside>
            <OrderSummary summary={summary} />
            <PromoCodeBox />
            <div className="button-stack">
              <Link to="/checkout" className="btn btn-primary">Go to checkout</Link>
              <Link to="/menu" className="btn btn-secondary">Continue browsing</Link>
              <button type="button" className="link-button" onClick={clearCart}>Clear cart</button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}