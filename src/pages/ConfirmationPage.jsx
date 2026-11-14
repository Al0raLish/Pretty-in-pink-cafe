import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/useCart.js';
import { PAYMENT_METHODS } from '../data/paymentMethods.js';
import { formatPrice } from '../utils/format.js';

export default function ConfirmationPage() {
    const { lastOrder, loyaltyPoints } = useCart();
    const location = useLocation();
    const firstName = location.state?.firstName;
    const headingRef = useRef(null);

    // Move focus to the heading so screen-reader and keyboard users land on the result
    useEffect(() => {
        headingRef.current?.focus();
    }, []);

    if (!lastOrder) {
        return (
            <div className="empty-state">
                <h1>No recent order</h1>
                <p>Place an order first and your confirmation will appear here.</p>
                <Link to="/menu" className="btn btn-primary">Browse the menu</Link>
            </div>
        );
    }

    const payment = PAYMENT_METHODS.find((p) => p.id === lastOrder.paymentMethod);

    return (
        <section className="confirmation">
            <h1 ref={headingRef} tabIndex={-1}>
                Thank you{firstName ? `, ${firstName}` : ''}! Your simulated order is placed.
            </h1>
            <p className="notice notice-ok">
                <strong>Order {lastOrder.orderNumber}</strong> · {new Date(lastOrder.placedAt).toLocaleString('en-PK')}
            </p>
            <p className="hint">
                This is a demonstration. Nothing was charged and nothing will be delivered.
            </p>

            <h2>Your items</h2>
            <ul className="summary-lines">
                {lastOrder.items.map((it, i) => (
                    <li key={i}>
                        <span>
                            {it.quantity} × {it.name}{it.sizeLabel && ` (${it.sizeLabel})`}
                            {it.addOnLabels.length > 0 && <small> + {it.addOnLabels.join(', ')}</small>}
                        </span>
                        <span>{formatPrice(it.lineTotal)}</span>
                    </li>
                ))}
            </ul>

            <dl className="summary-rows">
                <div><dt>Items</dt><dd>{formatPrice(lastOrder.subtotal)}</dd></div>
                {lastOrder.discount > 0 && (
                    <div><dt>Promo ({lastOrder.promoCode})</dt><dd>− {formatPrice(lastOrder.discount)}</dd></div>
                )}
                <div><dt>Delivery</dt><dd>{lastOrder.deliveryFee === 0 ? 'Free' : formatPrice(lastOrder.deliveryFee)}</dd></div>
                <div className="summary-total"><dt>Total</dt><dd>{formatPrice(lastOrder.total)}</dd></div>
                <div><dt>Payment</dt><dd>{payment?.label}</dd></div>
            </dl>

            {lastOrder.pointsEarned > 0 && (
                <p className="notice notice-ok">
                    You earned {lastOrder.pointsEarned} Pink Points. Your balance is {loyaltyPoints}.
                </p>
            )}

            <div className="button-row button-row-left">
                <Link to="/menu" className="btn btn-primary">Order something else</Link>
                <Link to="/" className="btn btn-secondary">Back to home</Link>
            </div>
        </section>
    );
}