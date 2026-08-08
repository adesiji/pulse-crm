import React from 'react';
import { initials } from '../../utils/formatters.js';

export function Avatar({ name, size = 36 }) {
  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    background: 'var(--color-primary-soft)',
    color: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: size * 0.38,
    flexShrink: 0,
  };
  return (
    <div style={style} aria-hidden="true">
      {initials(name)}
    </div>
  );
}
