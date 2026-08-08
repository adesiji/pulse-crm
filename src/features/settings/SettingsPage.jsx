import React, { useState } from "react";
import { Card } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";

/**
 * SettingsPage — workspace preferences.
 *
 * - Theme toggle (ThemeContext).
 * - Profile form (name/email) seeded from AuthContext, saved + toasted.
 * - Notification preferences backed by useLocalStorage (the low-stakes
 *   use of that hook the TODO calls out).
 * - A "Send test notification" button that proves the toast system works
 *   from anywhere in the app.
 */
export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  // Notification preferences persist across refreshes.
  const [notifications, setNotifications] = useLocalStorage(
    "pulse.settings.notifications",
    {
      email: true,
      push: false,
      weeklyDigest: true,
    }
  );

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    // In a real app this would call an api.updateProfile() endpoint; here
    // we persist to localStorage and confirm with a toast.
    try {
      window.localStorage.setItem(
        "pulse.settings.profile",
        JSON.stringify(profile)
      );
      showToast("Profile saved", "success");
    } catch {
      showToast("Could not save profile", "error");
    }
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTestNotification = () => {
    showToast("Notifications are working!", "success");
  };

  const notificationRows = [
    { key: "email", label: "Email notifications" },
    { key: "push", label: "Push notifications" },
    { key: "weeklyDigest", label: "Weekly digest" },
  ];

  return (
    <div>
      <h1>Settings</h1>
      <p>Workspace preferences.</p>

      <Card>
        <h3>Theme</h3>
        <div className="flex-between">
          <p className="text-muted">Currently: {theme}</p>
          <Button variant="secondary" onClick={toggleTheme}>
            Toggle
          </Button>
        </div>
      </Card>

      <Card className="mt-6">
        <h3>Profile</h3>
        <form onSubmit={handleProfileSave}>
          <div className="field">
            <label htmlFor="settings-name">Name</label>
            <input
              id="settings-name"
              name="name"
              type="text"
              value={profile.name}
              onChange={handleProfileChange}
            />
          </div>
          <div className="field">
            <label htmlFor="settings-email">Email</label>
            <input
              id="settings-email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleProfileChange}
            />
          </div>
          <Button type="submit">Save profile</Button>
        </form>
      </Card>

      <Card className="mt-6">
        <h3>Notification preferences</h3>
        <div className="flex-between">
          <div>
            <strong>Available</strong>
            <p className="text-muted">Test the app-wide toast system.</p>
          </div>
          <Button variant="secondary" onClick={handleTestNotification}>
            Send test notification
          </Button>
        </div>
        <div className="mt-4">
          {notificationRows.map((row) => (
            <div
              key={row.key}
              className="flex-between"
              style={{ padding: "var(--space-2) 0" }}
            >
              <label htmlFor={`notif-${row.key}`}>{row.label}</label>
              <input
                id={`notif-${row.key}`}
                type="checkbox"
                checked={!!notifications[row.key]}
                onChange={() => toggleNotification(row.key)}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
