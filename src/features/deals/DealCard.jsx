import React, { memo } from 'react';
import { formatCurrency } from '../../utils/formatters.js';

// Presentational — one deal, rendered as a small draggable card.
//
// Drag source: sets the dragged deal's id in dataTransfer so the drop
// target (DealColumn) knows which deal to move. `onDragStart`/`onDragEnd`
// also notify the parent so it can track "which card is being dragged"
// for drag-feedback styling (see DealsPipelinePage — that state lives
// there, not here, since DealColumn needs to know too).
//
// Wrapped in React.memo: DealCard renders once per deal and its props
// (`deal`, `isDragging`) are stable between unrelated re-renders of
// sibling columns, so this avoids re-rendering every card on the board
// whenever one card's drag state changes.
function DealCardComponent({ deal, isDragging, onDragStart, onDragEnd }) {
  return (
    <div
      className={`deal-card${isDragging ? ' deal-card--dragging' : ''}`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', deal.id);
        e.dataTransfer.effectAllowed = 'move';
        onDragStart?.(deal.id);
      }}
      onDragEnd={() => onDragEnd?.()}
    >
      <strong>{deal.title}</strong>
      <p className="text-muted" style={{ margin: '4px 0' }}>{deal.company}</p>
      <div className="table-numeric">{formatCurrency(deal.value)}</div>
    </div>
  );
}

export const DealCard = memo(DealCardComponent);
