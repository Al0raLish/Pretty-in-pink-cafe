import { Link } from 'react-router-dom';
import { CAFE } from '../data/cafeInfo.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <section aria-labelledby="footer-about">
            <h2 id="footer-about">About us</h2>
            <p>{CAFE.about}</p>
            <p><Link to="/about">Read more about us</Link></p>
          </section>

          <section aria-labelledby="footer-visit">
            <h2 id="footer-visit">Visit us</h2>
            <address>
              {CAFE.address.map((line) => <span key={line}>{line}<br /></span>)}
            </address>
            <ul>
              {CAFE.hours.map((h) => <li key={h.days}>{h.days}: {h.time}</li>)}
            </ul>
          </section>

          <section aria-labelledby="footer-contact">
            <h2 id="footer-contact">Contact</h2>
            <ul>
              <li><a href={`tel:${CAFE.phoneLink}`}>{CAFE.phone}</a></li>
              <li><a href={`mailto:${CAFE.email}`}>{CAFE.email}</a></li>
            </ul>
          </section>

          <nav aria-label="Footer navigation">
            <h2>Explore</h2>
            <ul>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/join">Pink Club</Link></li>
              <li><Link to="/about">About and location</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </nav>
        </div>
        <p className="footer-bottom">
          © 2026 {CAFE.name}. We deliver to {CAFE.deliveryAreas}.
        </p>
      </div>
    </footer>
  );
}