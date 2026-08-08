import React, { createContext, useContext, useEffect, useReducer } from "react";

/**
 * ToastContext — a global way to say "Saved!" or "Something went wrong"
 * from ANYWHERE in the tree — a form deep inside a modal, an API call
 * inside a custom hook, etc.
 *
 * STAGE: 8 (Context) + 9 (Reducers)
 *
 * The reducer owns *what toasts exist*; the context makes
 * `showToast()` callable from anywhere.
 *
 * BEHAVIOR:
 * - showToast(message, type) adds a toast to the stack.
 * - Each toast auto-dismisses after TOAST_DURATION_MS.
 * - ToastViewport renders the fixed-position stack (bottom-right).
 * - useToast() is the ergonomic consumer hook.
 */
const ToastContext = createContext(undefined);

const TOAST_DURATION_MS = 4000;

let toastId = 0;

function toastsReducer(state, action) {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.payload];
    case "REMOVE_TOAST":
      return state.filter((toast) => toast.id !== action.payload.id);
    default:
      return state;
  }
}

function ToastViewport({ toasts }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        zIndex: 9999,
      }}
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.type}`}
          role="alert"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(toastsReducer, []);

  // Auto-remove each toast after the duration. The cleanup clears the
  // timer if the toast is removed earlier (manual dismiss / unmount).
  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        dispatch({ type: "REMOVE_TOAST", payload: { id: toast.id } });
      }, TOAST_DURATION_MS)
    );

    // Clear ALL pending timers when the toast list changes so we never
    // try to remove (set state on) a toast that's already gone.
    return () => timers.forEach((t) => clearTimeout(t));
  }, [toasts]);

  const showToast = (message, type = "info") => {
    dispatch({ type: "ADD_TOAST", payload: { id: ++toastId, message, type } });
  };

  const removeToast = (id) => {
    dispatch({ type: "REMOVE_TOAST", payload: { id } });
  };

  const value = { showToast, removeToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (ctx === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
