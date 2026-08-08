import React from 'react';

/**
 * SearchInput — a controlled, presentational input.
 *
 * It owns NO state itself — `value` and `onChange` are fully controlled
 * by the parent. This is deliberate: the parent (LeadsPage) is where
 * you'll later decide whether to debounce this value before using it to
 * filter (see hooks/useDebounce.js). Keeping this component dumb means
 * you can add that debouncing without touching this file at all.
 */
export function SearchInput({ value, onChange, placeholder = 'Search…' }) {
  return (
    <div className="search-input">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
}
