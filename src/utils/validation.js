// src/utils/validation.js
import { PAYMENT_METHODS } from '../data/paymentMethods.js';

export const NOTES_MAX = 200;

// Returns an object like { email: 'message' }. Empty object = form is valid.
export function validateCheckout(values) {
  const errors = {};

  const name = values.name.trim();
  if (name === '') errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Your name must be at least 2 characters.';
  else if (name.length > 60) errors.name = 'Your name must be 60 characters or fewer.';
  else if (/\d/.test(name)) errors.name = 'Your name should not contain numbers.';

  const email = values.email.trim();
  if (email === '') errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter an email like name@example.com.';
  }

  // Spaces and dashes are allowed while typing; we strip them before checking
  const phone = values.phone.replace(/[\s-]/g, '');
  if (phone === '') errors.phone = 'Please enter your phone number.';
  else if (!/^(\+92|0)3\d{9}$/.test(phone)) {
    errors.phone = 'Enter a Pakistani mobile number such as 0300 1234567 or +92 300 1234567.';
  }

  const address = values.address.trim();
  if (address === '') errors.address = 'Please enter your delivery address.';
  else if (address.length < 10) {
    errors.address = 'Please give a fuller address (at least 10 characters) with area and street.';
  } else if (address.length > 200) errors.address = 'Address must be 200 characters or fewer.';

  if (values.notes.length > NOTES_MAX) {
    errors.notes = `Notes can be at most ${NOTES_MAX} characters (you have ${values.notes.length}).`;
  }

  if (!PAYMENT_METHODS.some((p) => p.id === values.payment)) {
    errors.payment = 'Please choose a payment method.';
  }
  return errors;
}
// Pink Club sign-up. The values are validated, then discarded (never stored).
export function validateJoin(values) {
  const errors = {};

  const name = values.name.trim();
  if (name === '') errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Your name must be at least 2 characters.';
  else if (/\d/.test(name)) errors.name = 'Your name should not contain numbers.';

  const email = values.email.trim();
  if (email === '') errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter an email like name@example.com.';
  }
  return errors;
}