import React, { useState } from "react";
import { Card } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { PulseDivider } from "../../components/ui/PulseDivider.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../services/api.js";

/**
 * LoginPage — YOURS TO BUILD.
 *
 * Ties together: controlled forms (like LeadForm), AuthContext (once
 * you build it), and React Router's useNavigate for redirecting after a
 * successful login.
 *
 * STAGE: 8 (Context) applied — this is the FIRST real consumer of
 * AuthContext.login().
 *
 * TODO:
 * // 1. useState for { email, password } — same controlled-input
 * //    pattern as LeadForm
 * // 2. Pull `login` from useAuth()
 * // 3. handleSubmit: preventDefault(), call await login(email,
 * //    password), track isSubmitting + error
 * // 4. On success, useNavigate()('/') to land on the dashboard
 * // 5. Once ProtectedRoute exists (see AuthContext TODOs), test that
 * //    visiting "/" while logged out redirects here, and that logging
 * //    in sends you back to where you were trying to go
 *
 * HINTS:
 * - api.login() in services/api.js accepts any non-empty email/password
 *   — there's no real credential check, it's here to practice the FLOW,
 *   not build real auth.
 *
 * COMMON MISTAKES:
 * - Calling useNavigate() conditionally or inside handleSubmit's async
 *   callback in a way that violates the Rules of Hooks — call the hook
 *   at the top of the component, use the function it returns wherever
 *   you need it.
 *
 * QUESTIONS TO THINK ABOUT:
 * - Should the error message distinguish "wrong credentials" from
 *   "network failed"? Does the fake API even let you tell the
 *   difference right now?
 */
export function LoginPage() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const switchMode = (next) => {
    setMode(next);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (mode === "register") {
        // Register the new user, then log them in.
        await api.register({
          name: form.name,
          email: form.email,
          password: form.password,
        });
        showToast("Account created — welcome aboard!", "success");
      }
      await login(form.email, form.password);
      showToast("Signed in successfully", "success");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password");
      showToast(err.message || "Something went wrong", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRegister = mode === "register";

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <Card style={{ width: 360 }}>
        <div className="pulse-logo">Pulse</div>
        <PulseDivider />
        <h2 className="mt-4">{isRegister ? "Create account" : "Sign in"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="field">
              <label htmlFor="login-name">Name</label>
              <input
                id="login-name"
                name="name"
                type="text"
                value={form.name}
                required
                disabled={isSubmitting}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={form.email}
              required
              disabled={isSubmitting}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              disabled={isSubmitting}
              value={form.password}
              required
              onChange={handleChange}
            />
          </div>
          {error && (
            <div className="field-error" role="alert">
              {error}
            </div>
          )}
          <Button
            type="submit"
            style={{ width: "100%" }}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isRegister
                ? "Creating account…"
                : "Signing in…"
              : isRegister
              ? "Create account"
              : "Sign in"}
          </Button>
        </form>

        <div className="mt-4" style={{ textAlign: "center" }}>
          {isRegister ? (
            <Button variant="ghost" onClick={() => switchMode("login")}>
              Already have an account? Sign in
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => switchMode("register")}>
              Don't have an account? Sign up
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
