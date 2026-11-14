import { Link, useLocation } from 'react-router-dom';
import FoodImage from './FoodImage.jsx';
import { formatPrice } from '../utils/format.js';
import { useCart } from '../context/useCart.js';

export default function MenuCard({ item }) {
    const location = useLocation();
    const { quantityOfItem } = useCart();
    const inCart = quantityOfItem(item.id);
    const unavailable = !item.available || item.stock <= 0;

    return (
        <article className={`card ${unavailable ? 'card-unavailable' : ''}`}>
            <FoodImage src={item.image} alt={item.name} className="card-image" />
            <div className="card-body">
                <p className="card-category">{item.category}</p>
                <h3 className="card-title">
                    {/* state remembers the filters so "Back to menu" can restore them */}
                    <Link to={`/menu/${item.id}`} state={{ from: location.search }}>{item.name}</Link>
                </h3>
                <p className="card-desc">{item.description || 'Description coming soon.'}</p>                <p className="card-meta">
                    {item.sizes.length > 0 ? `${item.sizes.length} sizes` : 'One size'}
                    {' · '}
                    {item.addOns.length > 0 ? `${item.addOns.length} add-ons` : 'No add-ons'}
                </p>
                {inCart > 0 && <p className="badge badge-cart">In your cart: {inCart}</p>}
                <div className="card-footer">
                    <span className="price">{formatPrice(item.price)}</span>
                    {unavailable
                        ? <span className="badge badge-unavailable">Currently unavailable</span>
                        : <span className="badge badge-ok">Available</span>}
                </div>
            </div>
        </article>
    );
}