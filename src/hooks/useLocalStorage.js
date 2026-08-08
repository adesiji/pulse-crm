import { useState, useEffect } from 'react';

/**
 * useLocalStorage — a WORKED EXAMPLE of a custom hook.
 *
 * A custom hook is just a regular function that starts with "use" and
 * calls other hooks inside it. It exists to extract STATEFUL LOGIC you
 * want to reuse — this is different from a regular utility function
 * (see utils/) because it has to live inside React's render cycle.
 *
 * Study this one, then build useDebounce / usePagination / useFetch
 * yourself using the same shape: state in, effect to sync a side
 * effect, return whatever the caller needs.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      // localStorage can throw in private-browsing modes — fail soft.
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors (quota exceeded, disabled storage, etc.)
    }
  }, [key, value]);

  return [value, setValue];
}
