import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart.js';
import { PROMO_CODES } from '../rules/promoCodes.js';

export default function PromoCodeBox() {
  const { promoCode, applyPromoCode, removePromoCode, summary, isMember } = useCart();
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const result = applyPromoCode(text);
    setFeedback(result);
    if (result.valid) setText('');
  }

  // A saved code may stop being valid (cart shrinks, or membership ends)
  const stale = promoCode && summary.promo && !summary.promo.valid;

  // Non-members are only shown the public codes
  const visibleCodes = Object.entries(PROMO_CODES)
    .filter(([, p]) => isMember || !p.membersOnly)
    .map(([code]) => code);

  return (
    <section className="promo" aria-labelledby="promo-heading">
      <h2 id="promo-heading" className="promo-heading">Promo code</h2>

      {promoCode ? (
        <div>
          <p>
            <strong>{promoCode}</strong>: {stale ? 'not currently applied.' : 'applied.'}
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
            Try {visibleCodes.join(' or ')}.
            {!isMember && <> <Link to="/join">Join the Pink Club</Link> for a member-only code.</>}
          </p>
        </form>
      )}

      <div aria-live="polite">
        {feedback && !promoCode && (
          <p className={feedback.valid ? 'notice notice-ok' : 'error-text'}>
            {feedback.message}{' '}
            {feedback.needsMembership && <Link to="/join">Join now</Link>}
          </p>
        )}
      </div>
    </section>
  );
}