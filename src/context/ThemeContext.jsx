import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

/**
 * ThemeContext — a WORKED EXAMPLE.
 *
 * This one is fully implemented so you can see the *shape* of the Context
 * pattern before you're asked to build your own (see ToastContext and
 * AuthContext, which are left for you).
 *
 * The pattern is always three pieces:
 *   1. createContext()      -> the "channel"
 *   2. a Provider component -> owns the state, passes it down
 *   3. a custom hook        -> the ergonomic way consumers read the context
 *
 * The theme is persisted to localStorage and applied to the <html>
 * element via the `data-theme` attribute, which the CSS in theme.css
 * targets with `[data-theme='dark']`.
 */

const THEME_STORAGE_KEY = "pulse-theme";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage(THEME_STORAGE_KEY, "light");

  // Apply the current theme to the DOM so the CSS `[data-theme='dark']`
  // selectors actually match. Runs on mount and whenever theme changes.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // We pass an object down. Every consumer re-renders when this object's
  // identity changes — worth remembering once you reach Stage 10
  // (Performance Optimization) and start asking "why did this re-render?".
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom hook wrapper — nicer call sites (`useTheme()`) and a friendly
// error if someone forgets to wrap the tree in <ThemeProvider>.
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
