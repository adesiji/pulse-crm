import React from 'react';

/**
 * Table — a generic, reusable table shell.
 *
 * `columns` shape: [{ key, header, sortable?, render?(row) }]
 * `rows` shape: array of data objects, each MUST have a stable unique
 * `getRowId(row)` — used as the React `key`.
 *
 * Why getRowId instead of just `row.id`? Because this component is meant
 * to be reused for leads, contacts, and anything else — we don't want to
 * hardcode the id field name.
 *
 * KEYS: notice `key={getRowId(row)}` below. React uses this to match
 * elements between renders during reconciliation — it's how React knows
 * "row 3 is still the same lead" instead of tearing down and rebuilding
 * every row whenever the list re-sorts or re-filters. Using the array
 * INDEX as a key here would break exactly that guarantee the moment the
 * list gets sorted or filtered (the row at index 3 might now be a
 * completely different lead). This is "How React works behind the
 * scenes" in practice, not just theory.
 *
 * Sorting itself is NOT implemented here — this component only renders
 * a clickable header and calls `onSort(columnKey)` when clicked. The
 * actual sort logic (utils/sortUtils.js + LeadsPage state) decides what
 * happens next. That's the container/presentational split again: this
 * component doesn't know what "sorted" even means.
 */
export function Table({ columns, rows, getRowId, sortBy, sortDirection, onSort }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={col.sortable ? () => onSort?.(col.key) : undefined}
              style={col.sortable ? { cursor: 'pointer' } : undefined}
            >
              {col.header}
              {sortBy === col.key ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={getRowId(row)}>
            {columns.map((col) => (
              <td key={col.key} className={col.numeric ? 'table-numeric' : undefined}>
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
