import React from 'react';

// Plain layout primitive. Composition over configuration: instead of a
// giant `<Card title="" footer="" ...>` API, we just accept children and
// let the caller compose whatever's inside. This IS "Thinking in React"
// composition in practice — worth noticing how little this component
// needs to know.
export function Card({ children, className = '', ...rest }) {
  return (
    <div className={`card ${className}`} {...rest}>
      {children}
    </div>
  );
}
