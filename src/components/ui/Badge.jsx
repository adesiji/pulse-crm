import React from "react";

// Renders a status/stage string as a colored pill.
// Styling comes entirely from CSS classes (.badge-{status}) defined in
// global.css — no inline styles needed.
// Purely presentational — takes a value, renders a value.

export function Badge({ status }) {
  if (!status) return null;

  return (
    <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>
  );
}
