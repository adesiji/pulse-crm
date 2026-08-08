import React, { useState } from "react";
import { Card } from "../../components/ui/Card.jsx";
import { SearchInput } from "../../components/ui/SearchInput.jsx";
import { FilterBar } from "../../components/ui/FilterBar.jsx";
import { Avatar } from "../../components/ui/Avatar.jsx";
import { EmptyState } from "../../components/ui/EmptyState.jsx";
import { api } from "../../services/api.js";
import { LoadingSkeleton } from "../../components/ui/LoadingSkeleton.jsx";
import { useFetch } from "../../hooks/useFetch.js";

/**
 * ContactsPage — YOURS TO BUILD.
 *
 * Deliberately less scaffolded than LeadsPage — you've now seen the
 * fetch -> filter -> render pattern once in detail. This page is where
 * you prove you can reproduce it with less hand-holding, using a
 * simpler list (no sorting, no pagination required, just search).
 *
 * STAGE: 3, 5, 6 — a good page to build RIGHT AFTER Dashboard, before
 * tackling the bigger LeadsPage.
 *
 * TODO:
 * // 1. Fetch contacts with api.getContacts() (useState + useEffect)
 * // 2. Local state for a search term, filtering by name OR company
 * //    (you can reuse the pattern from filterUtils.js, or write a
 * //    one-off filter here — your call, but be ready to justify it)
 * // 3. Render each contact as a small card (Avatar + name + role +
 * //    company + email + phone) in the existing .card-grid layout
 * // 4. Show EmptyState when the filtered list is empty
 *
 * QUESTIONS TO THINK ABOUT:
 * - This page and LeadsPage both need "search box wired to a filtered
 *   list." Is there enough shared logic to justify a shared custom hook
 *   (e.g. useFilteredList), or is the actual filtering different enough
 *   per-entity that forcing a shared abstraction would hurt more than
 *   help? There's no single right answer — form an opinion.
 */
export function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: contacts,
    error,
    isLoading,
  } = useFetch(() => api.getContacts(), []);

  // filter logic
  const filteredContacts = (contacts || []).filter((contact) => {
    const cleanSearch = searchTerm.toLowerCase().trim();

    // show all if search is empty
    if (!cleanSearch) return true;

    const matchesName = contact.name?.toLowerCase().includes(cleanSearch);
    const matchesCompany = contact.company?.toLowerCase().includes(cleanSearch);

    return matchesName || matchesCompany;
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h1>Contacts</h1>
      <p>Everyone you're actively working with.</p>

      <FilterBar>
        <SearchInput
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value);
          }}
          placeholder="Search contacts…"
        />
      </FilterBar>

      {filteredContacts.length === 0 ? (
        <Card>
          <EmptyState
            title="No contacts yet"
            description="Fetch data from the mock API and remove this placeholder."
          />
        </Card>
      ) : (
        <div className="card-grid">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="flex-row">
              <Avatar name={contact.name} />
              <div>
                <strong>{contact.name}</strong>
                <p className="text-muted">
                  {contact.role} · {contact.company}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
