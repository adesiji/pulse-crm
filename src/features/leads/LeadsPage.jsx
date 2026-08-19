import React, { useEffect, useMemo, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Badge } from "../../components/ui/Badge.jsx";
import { SearchInput } from "../../components/ui/SearchInput.jsx";
import { FilterBar } from "../../components/ui/FilterBar.jsx";
import { Table } from "../../components/ui/Table.jsx";
import { Pagination } from "../../components/ui/Pagination.jsx";
import { EmptyState } from "../../components/ui/EmptyState.jsx";
import { LoadingSkeleton } from "../../components/ui/LoadingSkeleton.jsx";
import { Modal } from "../../components/ui/Modal.jsx";
import { LeadForm } from "./LeadForm.jsx";
import { api } from "../../services/api.js";
import { applyLeadFilters } from "../../utils/filterUtils.js";
import { sortLeads } from "../../utils/sortUtils.js";
import { formatCurrency, formatDate } from "../../utils/formatters.js";
import { useDebounce } from "../../hooks/useDebounce.js";
import { usePagination } from "../../hooks/usePagination.js";
import {
  leadsReducer,
  initialLeadsState,
} from "../../reducers/leadsReducer.js";

/**
 * LeadsPage — the biggest page in the app.
 *
 * State lives in a reducer (leadsReducer) for the "UI state that changes
 * together": fetched leads, search text, status filter, sort field, and
 * sort direction. The async lifecycle (isLoading / error / modal open)
 * stays in plain useState because it's transient and independent.
 *
 * Filtering, sorting, and slicing happen in useMemo so unrelated renders
 * don't recompute the whole list from scratch.
 */
export function LeadsPage() {
  const [state, dispatch] = useReducer(leadsReducer, initialLeadsState);
  const { leads, searchTerm, statusFilter, sortBy, sortDirection } = state;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 5;

  // Debounce the search input so filtering waits until the user pauses.
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // ── Fetch on mount ──────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await api.getLeads();
        if (!cancelled) {
          dispatch({ type: "SET_LEADS", payload: result });
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch leads:", err);
          setError(err.message || "Failed to load leads. Please try again.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Derived: filter → sort → paginate ─────────────────────────────
  const { filteredAndSorted } = useMemo(() => {
    const filtered = applyLeadFilters(leads, {
      searchTerm: debouncedSearchTerm,
      status: statusFilter,
    });
    const sorted = sortLeads(filtered, sortBy, sortDirection);
    return { filteredAndSorted: sorted };
  }, [leads, debouncedSearchTerm, statusFilter, sortBy, sortDirection]);

  const { currentPage, totalPages, pageItems, nextPage, prevPage } =
    usePagination(filteredAndSorted, pageSize);

  // Keep page size normalized — if a filter empties the list entirely.
  const totalCount = filteredAndSorted.length;
  const hasLeads = leads.length > 0;

  // SearchInput passes the raw string value (not an event), while the
  // status <select> passes an event — so we handle both shapes.
  const handleSearchChange = (value) => {
    dispatch({ type: "SET_SEARCH", payload: value });
  };

  const handleFilterChange = (e) => {
    dispatch({ type: "SET_STATUS_FILTER", payload: e.target.value });
  };

  const handleResetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  const hasActiveFilters = searchTerm.trim() !== "" || statusFilter !== "all";

  const handleSort = (columnKey) => {
    dispatch({
      type: "SET_SORT",
      payload: {
        sortBy: columnKey,
        sortDirection: sortDirection === "desc" ? "asc" : "desc",
      },
    });
  };

  const handleNewLeadSuccess = (newLead) => {
    if (newLead) {
      dispatch({ type: "ADD_LEAD", payload: newLead });
    }
    setIsModalOpen(false);
  };

  const columns = [
    { key: "name", header: "Name", sortable: true },
    { key: "company", header: "Company", sortable: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (lead) => <Badge status={lead.status} />,
    },
    {
      key: "value",
      header: "Value",
      sortable: true,
      numeric: true,
      render: (lead) => formatCurrency(lead.value),
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      render: (lead) => formatDate(lead.createdAt),
    },
    {
      key: "view",
      header: "",
      render: (lead) => <Link to={`/leads/${lead.id}`}>View →</Link>,
    },
  ];

  return (
    <div>
      <div className="flex-between">
        <div>
          <h1>Leads</h1>
          <p>Everyone currently in your funnel.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>New Lead</Button>
      </div>

      <FilterBar>
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search leads…"
        />
        <select
          className="field"
          value={statusFilter}
          onChange={handleFilterChange}
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="lost">Lost</option>
        </select>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={handleResetFilters}>
            Reset filters
          </Button>
        )}
      </FilterBar>

      {error && (
        <Card>
          <div className="field-error" role="alert">
            {error}
          </div>
          <Button variant="ghost" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Card>
      )}

      {isLoading && !hasLeads && (
        <Card>
          <LoadingSkeleton height="24px" />
          <LoadingSkeleton height="24px" />
          <LoadingSkeleton height="24px" />
        </Card>
      )}

      {!isLoading && !error && (
        <Card>
          {leads.length === 0 ? (
            <EmptyState
              title="No leads yet"
              description="Create your first lead with the New Lead button above."
            />
          ) : totalCount === 0 ? (
            <EmptyState
              title="No matching leads"
              description="Try a different search term or status filter."
            />
          ) : (
            <Table
              columns={columns}
              rows={pageItems}
              getRowId={(lead) => lead.id}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          )}
        </Card>
      )}

      {!isLoading && !error && totalCount > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={prevPage}
          onNext={nextPage}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Lead"
      >
        <LeadForm onSuccess={handleNewLeadSuccess} />
      </Modal>
    </div>
  );
}
