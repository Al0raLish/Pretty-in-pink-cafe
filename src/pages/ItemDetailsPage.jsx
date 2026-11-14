import { Link, useParams, useLocation } from 'react-router-dom';
import { menuItems, SIZES, ADD_ONS } from '../data/menuItems.js';
import { formatPrice } from '../utils/format.js';
import FoodImage from '../components/FoodImage.jsx';

export default function ItemDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const backTo = `/menu${location.state?.from ?? ''}`; // restores the filters

  const item = menuItems.find((m) => m.id === id);

  // Invalid ID: explain and offer a next step
  if (!item) {
    return (
      <div className="empty-state">
        <h1>We couldn’t find that item</h1>
        <p>The link may be old or mistyped. “{id}” is not on our menu.</p>
        <Link to="/menu" className="btn btn-primary">Back to the menu</Link>
      </div>
    );
  }

  const unavailable = !item.available || item.stock <= 0;
  const sizes = SIZES.filter((s) => item.sizes.includes(s.id));
  const addOns = ADD_ONS.filter((a) => item.addOns.includes(a.id));

  return (
    <>
      <p><Link to={backTo}>← Back to menu</Link></p>
      <div className="details">
        <FoodImage key={item.id} src={item.image} alt={item.name} className="details-image" />

        <div>
          <p className="card-category">{item.category}</p>
          <h1>{item.name}</h1>
          <p className="price price-large">{formatPrice(item.price)}</p>
          <p>{item.description}</p>

          {unavailable ? (
            <p className="notice notice-error" role="status">
              <strong>Currently unavailable.</strong> This item cannot be ordered right now.
            </p>
          ) : (
            <p className="notice notice-ok" role="status">
              <strong>Available.</strong>{' '}
              {item.stock <= 5 ? `Only ${item.stock} left today.` : 'Ready to order.'}
            </p>
          )}

          <h2>Sizes</h2>
          {sizes.length === 0 ? <p>This item comes in one size.</p> : (
            <ul className="option-list">
              {sizes.map((s) => (
                <li key={s.id}><span>{s.label}</span><span>{formatPrice(item.price + s.extra)}</span></li>
              ))}
            </ul>
          )}

          <h2>Add-ons</h2>
          {addOns.length === 0 ? <p>No add-ons are available for this item.</p> : (
            <ul className="option-list">
              {addOns.map((a) => (
                <li key={a.id}><span>{a.label}</span><span>+ {formatPrice(a.price)}</span></li>
              ))}
            </ul>
          )}

          {/* Phase 3 replaces this with real size, add-on and quantity controls */}
          <button type="button" className="btn btn-primary" disabled>
            {unavailable ? 'Unavailable' : 'Add to cart (coming in Phase 3)'}
          </button>
        </div>
      </div>
    </>
  );
}