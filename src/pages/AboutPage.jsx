import { Link } from 'react-router-dom';
import { CAFE } from '../data/cafeInfo.js';
import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE } from '../rules/businessRules.js';
import { formatPrice } from '../utils/format.js';
import LocationMap from '../components/LocationMap.jsx';

export default function AboutPage() {
  return (
    <>
      <h1>About {CAFE.name}</h1>

      <section aria-labelledby="about-story">
        <h2 id="about-story">Our story</h2>
        <p>{CAFE.about}</p>
      </section>

      <section aria-labelledby="about-visit">
        <h2 id="about-visit">Visit us</h2>
        <address className="plain-address">
          {CAFE.address.map((line) => <span key={line}>{line}<br /></span>)}
        </address>
        <ul>{CAFE.hours.map((h) => <li key={h.days}>{h.days}: {h.time}</li>)}</ul>
        <LocationMap />
      </section>

      <section aria-labelledby="about-contact">
        <h2 id="about-contact">Contact</h2>
        <p>
          Phone: <a href={`tel:${CAFE.phoneLink}`}>{CAFE.phone}</a><br />
          Email: <a href={`mailto:${CAFE.email}`}>{CAFE.email}</a>
        </p>
      </section>

      <section aria-labelledby="about-delivery">
        <h2 id="about-delivery">Delivery</h2>
        <p>
          We deliver to {CAFE.deliveryAreas}. Delivery is {formatPrice(DELIVERY_FEE)}, and free on
          orders of {formatPrice(FREE_DELIVERY_THRESHOLD)} or more.
        </p>
        <Link to="/menu" className="btn btn-primary">Browse the menu</Link>
      </section>
    </>
  );
}