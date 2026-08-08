import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.jsx';
import { Navbar } from './Navbar.jsx';

/**
 * AppLayout — the shell every page renders inside (see router.jsx).
 *
 * <Outlet /> is where React Router injects whichever page component
 * matched the current route. This is COMPOSITION at the routing level:
 * AppLayout doesn't know or care whether it's showing DashboardPage or
 * LeadsPage — that's exactly the kind of decoupling "Thinking in React"
 * asks you to design for everywhere, not just here.
 */
export function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Navbar />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
