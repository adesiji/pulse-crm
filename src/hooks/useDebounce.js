/**
 * useDebounce — returns a value that only updates `delay` ms after the
 * last change to `value`. Typing fast in the search box therefore
 * triggers the expensive filter/fetch work far fewer times than
 * keystrokes.
 *
 * SIGNATURE:
 *   const debouncedValue = useDebounce(value, delayMs);
 */
import { useState, useEffect } from "react";

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clearing the previous timer on every change is what makes this
    // a debounce: fast keystrokes keep resetting the countdown, so the
    // update only fires once the user pauses.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
