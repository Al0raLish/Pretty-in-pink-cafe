import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SIZES, ADD_ONS } from '../data/menuItems.js';
import { checkQuantity } from '../rules/businessRules.js';
import { getUnitPrice } from '../utils/cart.js';
import { formatPrice } from '../utils/format.js';
import { useCart } from '../context/useCart.js';

export default function AddToCartPanel({ item }) {
  const { addToCart, quantityOfItem } = useCart();

  // Only the sizes and add-ons this item allows are ever shown (compatibility rule)
  const sizes = SIZES.filter((s) => item.sizes.includes(s.id));
  const addOns = ADD_ONS.filter((a) => item.addOns.includes(a.id));

  const [sizeId, setSizeId] = useState(sizes[0]?.id ?? null);
  const [addOnIds, setAddOnIds] = useState([]);
  const [quantityText, setQuantityText] = useState('1'); // string, so the box can be empty while typing
  const [feedback, setFeedback] = useState(null);

  const quantity = Number(quantityText);
  const { max } = checkQuantity(item, 1);
  const quantityCheck = checkQuantity(item, quantity);
  const inCart = quantityOfItem(item.id);
  const unitPrice = getUnitPrice(item, sizeId, addOnIds);

  function toggleAddOn(id) {
    setAddOnIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFeedback(addToCart(item, { sizeId, addOnIds, quantity }));
  }

  return (
    <form className="add-panel" onSubmit={handleSubmit}>
      {sizes.length > 0 && (
        <fieldset className="choice-group">
          <legend>Choose a size</legend>
          {sizes.map((s) => (
            <label key={s.id} className="choice">
              <input
                type="radio" name="size" value={s.id}
                checked={sizeId === s.id} onChange={() => setSizeId(s.id)}
              />
              <span>{s.label}</span>
              <span className="choice-price">{s.extra > 0 ? `+ ${formatPrice(s.extra)}` : 'Included'}</span>
            </label>
          ))}
        </fieldset>
      )}

      <fieldset className="choice-group">
        <legend>Add-ons</legend>
        {addOns.length === 0 ? (
          <p>No add-ons are offered with this item.</p>
        ) : (
          <>
            {addOns.map((a) => (
              <label key={a.id} className="choice">
                <input
                  type="checkbox" checked={addOnIds.includes(a.id)}
                  onChange={() => toggleAddOn(a.id)}
                />
                <span>{a.label}</span>
                <span className="choice-price">+ {formatPrice(a.price)}</span>
              </label>
            ))}
            <p className="hint">Only add-ons that suit this item are shown.</p>
          </>
        )}
      </fieldset>

      <div className="field">
        <label htmlFor="quantity">Quantity</label>
        <div className="qty-row">
          <div className="stepper">
            <button type="button" className="btn btn-secondary btn-small" aria-label="Decrease quantity"
              onClick={() => setQuantityText(String(Math.max(1, Math.floor(quantity) - 1)))}>−</button>
            <input id="quantity" type="number" inputMode="numeric" min="1" max={max}
              value={quantityText} onChange={(e) => setQuantityText(e.target.value)}
              aria-describedby="quantity-limit" aria-invalid={quantityCheck.valid ? 'false' : 'true'} />
            <button type="button" className="btn btn-secondary btn-small" aria-label="Increase quantity"
              onClick={() => setQuantityText(String(Math.floor(quantity) + 1))}>+</button>
          </div>
          <span id="quantity-limit" className="hint">
            Limit: {max} per order{item.stock <= 10 && ' (limited stock)'}
          </span>
        </div>
        {!quantityCheck.valid && (
          <p className="error-text"><span aria-hidden="true">⚠ </span>{quantityCheck.message}</p>
        )}
        {inCart > 0 && <p className="hint">You already have {inCart} in your cart.</p>}
      </div>

      <p className="price">
        This selection: {quantityCheck.valid ? formatPrice(unitPrice * quantity) : '—'}
        <small> ({formatPrice(unitPrice)} each)</small>
      </p>

      <button type="submit" className="btn btn-primary" disabled={!quantityCheck.valid}>
        Add to cart
      </button>

      {/* Always in the page so screen readers announce changes */}
      <div aria-live="polite">
        {feedback && (
          <p className={`notice ${feedback.valid ? 'notice-ok' : 'notice-error'}`}>
            {feedback.message}{' '}
            {feedback.valid && <Link to="/cart">View cart</Link>}
          </p>
        )}
      </div>
    </form>
  );
}