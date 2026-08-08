/**
 * usePagination — slices a list into pages.
 *
 * SIGNATURE:
 *   const {
 *     currentPage,
 *     totalPages,
 *     pageItems,   // the slice of `items` for the current page
 *     nextPage,
 *     prevPage,
 *     goToPage,
 *   } = usePagination(items, itemsPerPage);
 *
 * totalPages and pageItems are DERIVED, not stored — keeping them out of
 * state prevents them from silently going out of sync with `items`.
 */
import { useState, useEffect } from "react";

export function usePagination(items, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // If the list shrinks (e.g. a filter is applied) and currentPage is
  // now past the end, clamp it back to the last valid page.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = items.slice(start, start + itemsPerPage);

  const nextPage = () =>
    setCurrentPage((page) => Math.min(page + 1, totalPages));

  const prevPage = () => setCurrentPage((page) => Math.max(page - 1, 1));

  const goToPage = (page) => {
    const target = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(target);
  };

  return { currentPage, totalPages, pageItems, nextPage, prevPage, goToPage };
}
