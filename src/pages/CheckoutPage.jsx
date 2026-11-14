import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart.js';
import { validateCheckout, NOTES_MAX } from '../utils/validation.js';
import { reconcileCart } from '../utils/cart.js';
import { PAYMENT_METHODS } from '../data/paymentMethods.js';
import FormField from '../components/FormField.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import { CAFE } from '../data/cafeInfo.js';
import LocationMap from '../components/LocationMap.jsx';

const EMPTY_FORM = { name: '', email: '', phone: '', address: '', notes: '', payment: 'cod' };

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, summary, placeOrder, replaceCart } = useCart();
  const [values, setValues] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  // Errors are DERIVED from the current values once the user has tried to submit.
  // Typed values are never cleared, and messages disappear as each field is fixed.
  const errors = submitted ? validateCheckout(values) : {};
  const errorCount = Object.keys(errors).length;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value })); // new object, no mutation
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    const found = validateCheckout(values);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      document.getElementById(firstKey)?.focus(); // move keyboard focus to the first problem
      return;
    }

    // Re-check the cart against current data and rules before accepting the order
    const check = reconcileCart(lines);
    if (check.notices.length > 0) {
      replaceCart(check.lines, check.notices);
      navigate('/cart');
      return;
    }

    placeOrder(values.payment);
    // Only the first name is passed along (in memory), never stored
    navigate('/confirmation', { state: { firstName: values.name.trim().split(' ')[0] } });
  }

  if (lines.length === 0) {
    return (
      <div className="empty-state">
        <h1>Checkout</h1>
        <p>Your cart is empty, so there is nothing to check out yet.</p>
        <Link to="/menu" className="btn btn-primary">Browse the menu</Link>
      </div>
    );
  }

  return (
    <>
      <h1>Checkout</h1>
      <p className="notice notice-warning">
        <strong> Checkout.</strong> No real order, payment or delivery happens.
        Please use fictional details only.
      </p>

      {errorCount > 0 && (
        <p className="notice notice-error" role="alert">
          Please fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} below. Your other answers are kept.
        </p>
      )}

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} noValidate>
          <h2>Delivery details</h2>
          <FormField id="name" label="Full name" value={values.name} onChange={handleChange}
            error={errors.name} autoComplete="name" />
          <FormField id="email" label="Email" type="email" value={values.email} onChange={handleChange}
            error={errors.email} autoComplete="email" hint="For example: name@example.com" />
          <FormField id="phone" label="Phone number" type="tel" value={values.phone} onChange={handleChange}
            error={errors.phone} autoComplete="tel" hint="Pakistani mobile: 0300 1234567 or +92 300 1234567" />
          <FormField id="address" label="Delivery address" as="textarea" rows={3} value={values.address}
            onChange={handleChange} error={errors.address} autoComplete="street-address"
            hint="House or flat, street, area, city" />
          <FormField id="notes" label="Order notes" as="textarea" rows={2} value={values.notes}
            onChange={handleChange} error={errors.notes} optional
            hint={`${values.notes.length}/${NOTES_MAX} characters`} />

          <fieldset className="choice-group">
            <legend>Payment method (simulated)</legend>
            {PAYMENT_METHODS.map((p) => (
              <label key={p.id} className="choice choice-stacked">
                <input type="radio" name="payment" value={p.id}
                  checked={values.payment === p.id} onChange={handleChange} />
                <span><strong>{p.label}</strong><br /><small>{p.description}</small></span>
              </label>
            ))}
            {errors.payment && <p className="error-text">{errors.payment}</p>}
          </fieldset>

          <div className="button-row button-row-left">
            <button type="submit" className="btn btn-primary">Place simulated order</button>
            <Link to="/cart" className="btn btn-secondary">Back to cart</Link>
          </div>
        </form>

        <aside>
          <OrderSummary summary={summary} showLines />
          <details className="details-toggle">
            <summary>Where we deliver from</summary>
            <p>We deliver to {CAFE.deliveryAreas}.</p>
            <LocationMap />
          </details>
        </aside>
      </div>
    </>
  );
}