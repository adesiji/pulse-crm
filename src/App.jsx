import React from 'react';
import { AppRouter } from './router.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

/**
 * App — composition root for providers.
 *
 * Order can matter: a provider can only be READ by things below it in
 * the tree. Right now that order doesn't matter much since none of
 * these three depend on each other — but once you build ToastContext
 * and want AuthContext's login()/logout() to trigger a toast on
 * success/failure, ToastProvider needs to wrap AuthProvider (so
 * AuthProvider's children — including itself, if it calls useToast() —
 * can reach it).
 *
 * TODO (you): once AuthContext.login() is implemented, decide whether
 * it should call useToast() internally, and reorder these providers if
 * needed.
 */
export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
