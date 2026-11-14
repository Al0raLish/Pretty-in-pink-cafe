import { useContext } from 'react';
import { CartContext } from './CartContext.js';

export function useCart() {
  const value = useContext(CartContext);
  if (value === null) throw new Error('useCart must be used inside <CartProvider>');
  return value;
}