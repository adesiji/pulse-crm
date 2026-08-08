import React, { createContext, useContext, useCallback, useState } from "react";
import { api } from "../services/api.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

/**
 * AuthContext — the "current user" + auth status for the whole app.
 *
 * STAGE: 8 (Context), ties into 6 (Data Fetching) for a real login call.
 *
 * BEHAVIOR:
 * - `user` is persisted via useLocalStorage so a refresh keeps the
 *   session.
 * - `status` tracks the lifecycle: 'idle' | 'loading' | 'authenticated'
 *   | 'error'. `isLoggedIn` is derived from `user` (single source of
 *   truth, no drift).
 * - `login(email, password)` calls the fake API, sets the user, and
 *   updates status on success/failure.
 * - `logout()` clears the user and resets status.
 */
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("pulse.auth.user", null);
  const [status, setStatus] = useState(user ? "authenticated" : "idle");

  const login = useCallback(
    async (email, password) => {
      setStatus("loading");
      try {
        const loggedInUser = await api.login(email, password);
        setUser(loggedInUser);
        setStatus("authenticated");
        return loggedInUser;
      } catch (err) {
        setStatus("error");
        throw err;
      }
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    setStatus("idle");
  }, [setUser]);

  const value = {
    user,
    status,
    isLoggedIn: user !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
