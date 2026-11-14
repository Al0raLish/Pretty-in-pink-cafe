import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="empty-state">
      <h1>Page not found</h1>
      <p>That address doesn’t exist on our site. Let’s get you back to something delicious.</p>
      <div className="button-row">
        <Link to="/" className="btn btn-primary">Go to Home</Link>
        <Link to="/menu" className="btn btn-secondary">Browse the menu</Link>
      </div>
    </div>
  );
}