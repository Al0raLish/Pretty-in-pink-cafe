import { useEffect, useState } from 'react';
import { MenuContext } from './MenuContext.js';
import { loadMenu } from '../services/menuService.js';

export default function MenuProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', items: [], error: '' });
  const [attempt, setAttempt] = useState(0); // changing this re-runs the effect (retry)

  useEffect(() => {
    let cancelled = false; // cleanup flag: ignore answers that arrive after we left

    loadMenu()
      .then((items) => {
        if (!cancelled) setState({ status: 'ready', items, error: '' });
      })
      .catch((err) => {
        if (!cancelled) setState({ status: 'error', items: [], error: err.message });
      });

    return () => { cancelled = true; };
  }, [attempt]); // dependency: run again whenever attempt changes

  function reload() {
    setState({ status: 'loading', items: [], error: '' });
    setAttempt((n) => n + 1); // functional update
  }

  return <MenuContext.Provider value={{ ...state, reload }}>{children}</MenuContext.Provider>;
}