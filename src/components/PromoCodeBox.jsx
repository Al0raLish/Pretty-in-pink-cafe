import { useState } from 'react';
import { useCart } from '../context/useCart.js';
import { PROMO_CODES } from '../rules/promoCodes.js';

export default function PromoCodeBox() {
  const { promoCode, applyPromoCode, removePromoCode, summary } = useCart();
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState(null);

  function handleSubmit(e) {
    e.preventDefault(); // stop the page reloading
    const result = applyPromoCode(text);
    setFeedback(result);
    if (result.valid) setText('');
  }

  // A saved code may stop being valid if the cart shrinks (the summary re-checks it)
  const stale = promoCode && summary.promo && !summary.promo.valid;

  return (
    <section className="promo" aria-labelledby="promo-heading">
      <h2 id="promo-heading" className="promo-heading">Promo code</h2>

      {promoCode ? (
        <div>
          <p>
            <strong>{promoCode}</strong>:{' '}
            {stale ? 'not currently applied.' : 'applied.'}
          </p>
          {stale && <p className="notice notice-warning">{summary.promo.message}</p>}
          <button type="button" className="link-button" onClick={removePromoCode}>Remove code</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="promo-input" className="visually-hidden">Promo code</label>
          <div className="promo-row">
            <input id="promo-input" type="text" value={text} placeholder="Enter code"
              autoCapitalize="characters" onChange={(e) => setText(e.target.value)} />
            <button type="submit" className="btn btn-secondary">Apply</button>
          </div>
          <p className="hint">
            Try {Object.keys(PROMO_CODES).join(' or ')}. These are fictional demo codes.
          </p>
        </form>
      )}

      <div aria-live="polite">
        {feedback && !promoCode && (
          <p className={feedback.valid ? 'notice notice-ok' : 'error-text'}>{feedback.message}</p>
        )}
      </div>
    </section>
  );
}