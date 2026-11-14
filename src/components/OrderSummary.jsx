import { formatPrice } from '../utils/format.js';
import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE } from '../rules/businessRules.js';
import { pointsForTotal } from '../rules/loyalty.js';
import { useCart } from '../context/useCart.js';

export default function OrderSummary({ summary, showLines = false }) {
  const { loyaltyPoints } = useCart();
  const { lines, subtotal, delivery, promo, discount, deliveryFee, total, itemCount } = summary;
  const freeByPromo = Boolean(promo?.valid && promo.freeDelivery);
  const points = pointsForTotal(total);

  return (
    <section className="summary" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Order summary</h2>

      {showLines && (
        <ul className="summary-lines">
          {lines.map((l) => (
            <li key={l.key}>
              <span>
                {l.quantity} × {l.item.name}
                {l.sizeLabel && ` (${l.sizeLabel})`}
                {l.addOnLabels.length > 0 && <small> + {l.addOnLabels.join(', ')}</small>}
              </span>
              <span>{formatPrice(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="summary-rows">
        <div><dt>Items ({itemCount})</dt><dd>{formatPrice(subtotal)}</dd></div>
        {discount > 0 && (
          <div><dt>Promo ({promo.code})</dt><dd>− {formatPrice(discount)}</dd></div>
        )}
        <div>
          <dt>Delivery{freeByPromo ? ` (${promo.code})` : ''}</dt>
          <dd>{deliveryFee === 0 && subtotal > 0 ? 'Free' : formatPrice(deliveryFee)}</dd>
        </div>
        <div className="summary-total"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
      </dl>

      {subtotal > 0 && delivery.isFree && (
        <p className="notice notice-ok">Free delivery applied.</p>
      )}
      {subtotal > 0 && !delivery.isFree && !freeByPromo && (
        <p className="notice notice-warning">
          Add {formatPrice(delivery.amountToFreeDelivery)} more for free delivery.
        </p>
      )}
      {points > 0 && (
        <p className="hint">You will earn {points} Pink Points with this order. Balance: {loyaltyPoints}.</p>
      )}
      <p className="hint">
        Delivery is free on orders of {formatPrice(FREE_DELIVERY_THRESHOLD)} or more,
        otherwise {formatPrice(DELIVERY_FEE)}. This is judged before promo discounts.
      </p>
    </section>
  );
}