import React from 'react';

/**
 * Button — a fully worked example of a REUSABLE, PRESENTATIONAL component.
 *
 * Notice what it does NOT know: nothing about leads, deals, or forms.
 * It only knows how to look like a button and forward whatever props/
 * handlers it's given. That's the "presentational vs. container"
 * split you'll lean on throughout this project — keep components like
 * this one dumb, and put business logic in the pages/features that use
 * them (Thinking in React, Stage 1-2).
 */
export function Button({ variant = 'primary', children, ...rest }) {
  const className = `btn btn-${variant}`;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
