/**
 * filterUtils — filtering logic kept in plain functions (not inline in a
 * component): (1) testable without rendering React, (2) easy to memoize
 * with useMemo since it's a pure function of its inputs, (3) reusable
 * between LeadsPage and ContactsPage.
 *
 * These run on the client for the mock-data app. With a real backend,
 * this same logic would move to server query params — but the pure
 * functions stay the same shape, just called with different inputs.
 */

/**
 * Case-insensitive match against lead name, company, AND email.
 * Always returns a NEW array (via .filter) — never mutates the input.
 */
export function filterLeadsBySearch(leadsList, searchTerm) {
  const term = (searchTerm || "").trim().toLowerCase();
  if (!term) return leadsList;

  return leadsList.filter((lead) => {
    const haystack = [lead.name, lead.company, lead.email]
      .map((field) => (field || "").toLowerCase())
      .join(" ");
    return haystack.includes(term);
  });
}

/**
 * If status is 'all' (or falsy), return leads unchanged.
 * Otherwise filter by exact status match.
 */
export function filterLeadsByStatus(leadsList, status) {
  if (!status || status === "all") return leadsList;
  return leadsList.filter((lead) => lead.status === status);
}

/**
 * Convenience composition used by LeadsPage so the component doesn't
 * have to chain the two filters itself. Filtering order doesn't affect
 * correctness (both are pass-through predicates), only the order of the
 * resulting array — which sorting below then re-orders anyway.
 */
export function applyLeadFilters(leadsList, { searchTerm, status }) {
  return filterLeadsByStatus(
    filterLeadsBySearch(leadsList, searchTerm),
    status
  );
}
