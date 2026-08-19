import React, { memo, useState } from 'react';
import { DealCard } from './DealCard.jsx';

// One pipeline stage = one column. `deals` is already filtered to this
// stage by the parent (DealsPipelinePage) — this component just renders
// what it's given, plus the drop-target half of drag-and-drop.
//
// `isDragOver` is local UI-only state (just a highlight while something
// is dragged over this column) — it doesn't need to live in the parent
// reducer, unlike the actual stage move.
//
// Wrapped in React.memo: with 5 columns on the board, moving a card
// (which re-renders DealsPipelinePage) would otherwise re-render every
// column even though only two of them actually changed deals.
function DealColumnComponent({ stage, deals, draggedDealId, onDragStart, onDragEnd, onDropDeal }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault(); // required to allow a drop
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    // Only clear when actually leaving the column, not when moving
    // between child elements inside it.
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const dealId = e.dataTransfer.getData('text/plain');
    if (dealId) onDropDeal?.(dealId, stage);
  };

  return (
    <div
      className={`kanban-column${isDragOver ? ' kanban-column--drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="kanban-column-header">
        <span>{stage}</span>
        <span className="text-muted">{deals.length}</span>
      </div>
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          deal={deal}
          isDragging={deal.id === draggedDealId}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  );
}

export const DealColumn = memo(DealColumnComponent);
