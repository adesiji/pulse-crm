/**
 * leadsReducer — all the leads-list UI state in one reducer so the
 * transitions are explicit and testable in a single place.
 *
 * SHAPE OF STATE:
 * {
 *   leads: [],                // the fetched array
 *   searchTerm: '',
 *   statusFilter: 'all',      // 'all' | 'new' | 'contacted' | 'qualified' | 'lost'
 *   sortBy: '',               // '' | 'name' | 'company' | 'value' | 'createdAt'
 *   sortDirection: 'asc',     // 'asc' | 'desc'
 * }
 *
 * NOTE: `data`, `isLoading`, `error`, and `currentPage` intentionally
 * live OUTSIDE this reducer (in LeadsPage) — they're async/transient
 * state that a pure reducer shouldn't own. `page` is omitted too: the
 * usePagination hook derives the page and clamps it when the filtered
 * list shrinks, which keeps the reducer free of derived values.
 */

export const initialLeadsState = {
  leads: [],
  searchTerm: "",
  statusFilter: "all",
  sortBy: "",
  sortDirection: "asc",
};

export function leadsReducer(state, action) {
  switch (action.type) {
    case "SET_LEADS":
      return { ...state, leads: action.payload };

    case "ADD_LEAD":
      return { ...state, leads: [action.payload, ...state.leads] };

    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };

    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload };

    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortDirection: action.payload.sortDirection,
      };

    case "RESET_FILTERS":
      return { ...state, searchTerm: "", statusFilter: "all" };

    default:
      return state;
  }
}
