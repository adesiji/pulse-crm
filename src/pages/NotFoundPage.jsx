import React from 'react';
import { Link } from 'react-router-dom';

// A trivial page — nothing to practice here, it's just so the router
// tree isn't missing a catch-all `*` route (try visiting a nonsense URL
// once the app is running and you'll land here instead of a blank page).
export function NotFoundPage() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', textAlign: 'center' }}>
      <div>
        <h1>404</h1>
        <p>That page doesn't exist.</p>
        <Link to="/">← Back to dashboard</Link>
      </div>
    </div>
  );
}
