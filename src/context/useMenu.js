import { useContext } from 'react';
import { MenuContext } from './MenuContext.js';

export function useMenu() {
  const value = useContext(MenuContext);
  if (value === null) throw new Error('useMenu must be used inside <MenuProvider>');
  return value;
}