import React from 'react';
import { DealCard } from './DealCard.jsx';

// One pipeline stage = one column. `deals` is already filtered to this
// stage by the parent (DealsPipelinePage) — this component just renders
// what it's given, another presentational/container split.
export function DealColumn({ stage, deals }) {
  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <span>{stage}</span>
        <span className="text-muted">{deals.length}</span>
      </div>
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}
