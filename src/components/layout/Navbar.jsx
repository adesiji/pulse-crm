import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { Avatar } from "../ui/Avatar.jsx";
import { Button } from "../ui/Button.jsx";

/**
 * Navbar (topbar) — consumes ThemeContext directly via useTheme(), and
 * AuthContext to show the logged-in user + a logout action.
 *
 * Notice this component reaches INTO context rather than receiving
 * theme/toggleTheme as props from AppLayout. That's the point of
 * Context: this could be nested five components deep and this line
 * wouldn't change.
 */
export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast("Logged out", "info");
    navigate("/login", { replace: true });
  };

  return (
    <header className="app-topbar">
      <div />
      <div className="flex-row">
        <Button variant="ghost" onClick={toggleTheme}>
          {theme === "light" ? "Dark mode" : "Light mode"}
        </Button>
        <Avatar name={user?.name || "Guest"} size={32} />
        <span className="text-muted">{user?.name || "Signed out"}</span>
        <Button variant="ghost" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </header>
  );
}
