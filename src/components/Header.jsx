import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/useCart.js';
import Logo from './Logo.jsx';

export default function Header() {
  const { summary } = useCart();
  const count = summary.itemCount;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <Logo />
          <span className="brand-text">Pretty in Pink <span className="brand-accent">Café</span></span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/menu">Menu</NavLink></li>
            <li>
              <NavLink to="/cart">
                Cart
                {count > 0 && <span className="cart-count" aria-hidden="true">{count}</span>}
                {count > 0 && <span className="visually-hidden"> ({count} items)</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}