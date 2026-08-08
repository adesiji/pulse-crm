import React from 'react';

/**
 * PulseDivider — the app's signature visual element (see theme.css
 * comment header). A single heartbeat-monitor line, used sparingly:
 * once in the sidebar under the logo, once on the dashboard. Resist the
 * temptation to sprinkle it everywhere — restraint is what makes a
 * signature element read as intentional instead of decorative noise.
 */
export function PulseDivider() {
  return (
    <svg className="pulse-divider" viewBox="0 0 200 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <polyline
        points="0,10 60,10 72,10 80,2 88,18 96,10 110,10 200,10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
