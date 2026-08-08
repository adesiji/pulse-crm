import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * ProtectedRoute — wraps routes that require login.
 *
 * Reads useAuth() and redirects to /login (preserving the intended
 * destination in location.state) if there's no logged-in user.
 *
 * STAGE: 8 (Context) — "Redirect if not logged in" is a rendering
 * decision, so it lives in the route tree as a wrapper component.
 */
export function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
