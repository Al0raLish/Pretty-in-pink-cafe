import { useCart } from '../context/useCart.js';
import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE } from '../rules/businessRules.js';
import { formatPrice } from '../utils/format.js';

// Shows delivery cost BEFORE checkout, wherever the customer is browsing
export default function DeliveryProgress() {
  const { summary } = useCart();
  const { subtotal, delivery } = summary;

  return (
    <div className="delivery-progress" role="status">
      {subtotal === 0 ? (
        <p>Delivery is {formatPrice(DELIVERY_FEE)}, and free on orders of {formatPrice(FREE_DELIVERY_THRESHOLD)} or more.</p>
      ) : delivery.isFree ? (
        <p><strong>Free delivery unlocked.</strong> Your items total {formatPrice(subtotal)}.</p>
      ) : (
        <>
          <p>
            Add <strong>{formatPrice(delivery.amountToFreeDelivery)}</strong> more for free delivery
            (currently {formatPrice(DELIVERY_FEE)}).
          </p>
          <progress max={FREE_DELIVERY_THRESHOLD} value={subtotal} aria-label="Progress towards free delivery" />
        </>
      )}
    </div>
  );
}