import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { DashboardPage } from "./features/dashboard/DashboardPage.jsx";
import { LeadsPage } from "./features/leads/LeadsPage.jsx";
import { LeadDetailPage } from "./features/leads/LeadDetailPage.jsx";
import { DealsPipelinePage } from "./features/deals/DealsPipelinePage.jsx";
import { ContactsPage } from "./features/contacts/ContactsPage.jsx";
import { LoginPage } from "./features/auth/LoginPage.jsx";
import { SettingsPage } from "./features/settings/SettingsPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

/**
 * Route tree. AppLayout wraps every "inside the app" page so the
 * sidebar/topbar don't need to be repeated per page — see its <Outlet />.
 * LoginPage is deliberately OUTSIDE that layout (no sidebar while
 * logged out).
 *
 * Everything except /login is wrapped in <ProtectedRoute>, which reads
 * useAuth() and redirects to /login if there's no logged-in user.
 */
export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/leads/:leadId" element={<LeadDetailPage />} />
        <Route path="/deals" element={<DealsPipelinePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
