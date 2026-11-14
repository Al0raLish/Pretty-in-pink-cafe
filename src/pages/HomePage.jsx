import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/menuItems.js';
import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE } from '../rules/businessRules.js';
import { formatPrice } from '../utils/format.js';
import { useMenu } from '../context/useMenu.js';
import MenuCard from '../components/MenuCard.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';

const FEATURED_IDS = ['rose-petal-latte', 'pink-velvet-cupcake', 'chicken-pesto-panini'];

export default function HomePage() {
  const { status, items, error, reload } = useMenu();
  const featured = items.filter((item) => FEATURED_IDS.includes(item.id));

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Coffee · Desserts · Bakery · Light Meals</p>
        <h1>Soft flavours, beautifully served.</h1>
        <p className="hero-text">
          Order your favourite café treats for delivery. Free delivery on orders of{' '}
          {formatPrice(FREE_DELIVERY_THRESHOLD)} or more; otherwise a flat {formatPrice(DELIVERY_FEE)}.
        </p>
        <Link to="/menu" className="btn btn-primary">Browse the menu</Link>
      </section>

      <section aria-labelledby="categories-heading">
        <h2 id="categories-heading">Shop by category</h2>
        <ul className="chip-list">
          {CATEGORIES.map((c) => (
            <li key={c}><Link className="chip" to={`/menu?category=${encodeURIComponent(c)}`}>{c}</Link></li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="featured-heading">
        <h2 id="featured-heading">Café favourites</h2>
        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState message={error} onRetry={reload} />}
        {status === 'ready' && featured.length === 0 && (
          <p>Our favourites are being prepared. Please check back soon.</p>
        )}
        {status === 'ready' && featured.length > 0 && (
          <div className="grid">
            {featured.map((item) => <MenuCard key={item.id} item={item} />)}
          </div>
        )}
      </section>
    </>
  );
}