import { Link, useParams, useLocation } from 'react-router-dom';
import { useMenu } from '../context/useMenu.js';
import { formatPrice } from '../utils/format.js';
import FoodImage from '../components/FoodImage.jsx';
import AddToCartPanel from '../components/AddToCartPanel.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';

export default function ItemDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const { status, items, error, reload } = useMenu();
  const backTo = `/menu${location.state?.from ?? ''}`; // restores the filters

  if (status === 'loading') return <LoadingState message="Loading item details…" />;
  if (status === 'error') return <ErrorState message={error} onRetry={reload} />;

  const item = items.find((m) => m.id === id);

  if (!item) {
    return (
      <div className="empty-state">
        <h1>We couldn’t find that item</h1>
        <p>
          {items.length === 0
            ? 'The menu is being prepared. Please check back soon.'
            : `The link may be old or mistyped. “${id}” is not on our menu.`}
        </p>
        <Link to="/menu" className="btn btn-primary">Back to the menu</Link>
      </div>
    );
  }

  const unavailable = !item.available || item.stock <= 0;

  return (
    <>
      <p><Link to={backTo}>← Back to menu</Link></p>
      <div className="details">
        <FoodImage key={item.id} src={item.image} alt={item.name} className="details-image" />

        <div>
          <p className="card-category">{item.category}</p>
          <h1>{item.name}</h1>
          <p className="price price-large">From {formatPrice(item.price)}</p>
          <p>{item.description || 'Description coming soon.'}</p>

          {unavailable ? (
            <>
              <p className="notice notice-error" role="status">
                <strong>Currently unavailable.</strong> This item cannot be ordered right now.
              </p>
              <Link to="/menu" className="btn btn-secondary">See other items</Link>
            </>
          ) : (
            <>
              <p className="notice notice-ok" role="status">
                <strong>Available.</strong>{' '}
                {item.stock <= 5 ? `Only ${item.stock} left today.` : 'Ready to order.'}
              </p>
              <AddToCartPanel key={item.id} item={item} />
            </>
          )}
        </div>
      </div>
    </>
  );
}