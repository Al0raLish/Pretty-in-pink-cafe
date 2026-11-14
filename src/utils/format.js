// Turns 1999 into "Rs. 1,999"
export function formatPrice(amount) {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}