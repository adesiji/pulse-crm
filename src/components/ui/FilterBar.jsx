import React from 'react';

// Thin layout wrapper for a row of filter controls (search box, status
// select, sort select...). It just arranges children — the actual
// filter STATE and CONTROLS live in the page that uses this, per
// "presentational vs container" from Button.jsx.
export function FilterBar({ children }) {
  return <div className="toolbar">{children}</div>;
}
