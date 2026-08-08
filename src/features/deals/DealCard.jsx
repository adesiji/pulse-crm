import React from 'react';
import { formatCurrency } from '../../utils/formatters.js';

// Presentational — one deal, rendered as a small card. Draggability is
// NOT implemented here (see DealsPipelinePage TODOs) — this component
// only knows how to display a deal.
export function DealCard({ deal }) {
  return (
    <div className="deal-card">
      <strong>{deal.title}</strong>
      <p className="text-muted" style={{ margin: '4px 0' }}>{deal.company}</p>
      <div className="table-numeric">{formatCurrency(deal.value)}</div>
    </div>
  );
}
