import React from 'react';
import { Button } from './Button.jsx';

/**
 * Pagination — presentational. Renders controls for whatever page state
 * it's handed; it does not compute anything itself.
 *
 * Wire this up to your hooks/usePagination.js once that hook is built:
 *   const pagination = usePagination(filteredAndSortedLeads, 10);
 *   <Pagination
 *     currentPage={pagination.currentPage}
 *     totalPages={pagination.totalPages}
 *     onPrev={pagination.prevPage}
 *     onNext={pagination.nextPage}
 *   />
 */
export function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <div className="flex-between mt-4">
      <Button variant="ghost" onClick={onPrev} disabled={currentPage <= 1}>
        Previous
      </Button>
      <span className="text-muted">
        Page {currentPage} of {totalPages}
      </span>
      <Button variant="ghost" onClick={onNext} disabled={currentPage >= totalPages}>
        Next
      </Button>
    </div>
  );
}
