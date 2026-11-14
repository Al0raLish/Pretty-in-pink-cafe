import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">Pretty in Pink <span>Café</span></Link>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/menu">Menu</NavLink></li>
            <li><NavLink to="/cart">Cart</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}