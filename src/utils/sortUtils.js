/**
 * sortUtils — pure sorting logic for the leads table.
 *
 * sortBy: 'name' | 'company' | 'value' | 'createdAt' | 'status'
 * direction: 'asc' | 'desc'
 *
 * IMPORTANT: Array.prototype.sort() mutates in place — copy first with
 * [...leadsList] so the source (React state) reference never changes.
 */

const LEAD_SORT_FIELDS = new Set([
  "name",
  "company",
  "status",
  "value",
  "createdAt",
]);

export function sortLeads(leadsList, sortBy, direction = "asc") {
  if (!sortBy || !LEAD_SORT_FIELDS.has(sortBy)) return leadsList;

  const copy = [...leadsList];
  const dir = direction === "desc" ? -1 : 1;
  const normalize = (field) => (field ?? "").toString().toLowerCase();

  copy.sort((a, b) => {
    let cmp = 0;

    if (sortBy === "value") {
      cmp = (a.value || 0) - (b.value || 0);
    } else if (sortBy === "createdAt") {
      // ISO 8601 strings compare lexicographically == chronologically
      cmp = normalize(a.createdAt).localeCompare(normalize(b.createdAt));
    } else {
      cmp = normalize(a[sortBy]).localeCompare(normalize(b[sortBy]));
    }

    return cmp * dir;
  });

  return copy;
}
