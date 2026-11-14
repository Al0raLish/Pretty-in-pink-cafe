import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart.js';
import { validateJoin } from '../utils/validation.js';
import FormField from '../components/FormField.jsx';

export default function JoinPage() {
  const { isMember, joinClub, leaveClub } = useCart();
  const [values, setValues] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  // Errors are derived from the current values, so typed text is never cleared
  const errors = submitted ? validateJoin(values) : {};

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const found = validateJoin(values);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      document.getElementById(firstKey)?.focus();
      return;
    }
    joinClub(); // only a yes/no flag is saved
    setValues({ name: '', email: '' }); // the typed details are discarded
  }

  if (isMember) {
    return (
      <section className="confirmation">
        <h1>Welcome to the Pink Club</h1>
        <p className="notice notice-ok">
          <strong>You are a member.</strong> Your member promo code is <strong>PINK10</strong>
          {' '}(10% off orders of Rs. 1,000 or more, up to Rs. 300).
        </p>
        <p>You also earn 1 Pink Point for every Rs. 100 you spend.</p>
        <div className="button-row button-row-left">
          <Link to="/menu" className="btn btn-primary">Start ordering</Link>
          <button type="button" className="btn btn-secondary" onClick={leaveClub}>Leave the club</button>
        </div>
      </section>
    );
  }

  return (
    <section className="confirmation">
      <h1>Join the Pink Club</h1>
      <p>Free to join. Members get the PINK10 promo code and earn Pink Points on every order.</p>
      <p className="hint">
        Demo sign-up: no account or password is created, and your details are not saved.
        Please use fictional details.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <FormField id="name" label="Your name" value={values.name} onChange={handleChange}
          error={errors.name} autoComplete="name" />
        <FormField id="email" label="Email" type="email" value={values.email} onChange={handleChange}
          error={errors.email} autoComplete="email" hint="For example: name@example.com" />
        <button type="submit" className="btn btn-primary">Join for free</button>
      </form>
    </section>
  );
}