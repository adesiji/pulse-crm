import React from 'react';

// "Treat emptiness as a moment for direction" — an empty list should
// tell the user what to do next, not just show blank space.
export function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}
