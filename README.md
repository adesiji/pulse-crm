# Pulse — Sales CRM (Learning Scaffold)

A partially-built sales CRM for a fictional B2B startup. The
architecture, routing, design system, mock backend, and component shells
are done. **The React logic is not.** That's intentional — this repo is
a teaching scaffold, not a finished app. You should end up writing
roughly 60–70% of the actual application code yourself.

## Running it

```bash
npm install
npm run dev
```

It will run and render right now — routes work, layout works, styling
works. What you'll see instead of real data is empty states, hardcoded
placeholder numbers, and forms that log a console warning instead of
doing anything. That's the starting line, not a bug.

## How this repo is organized

```
src/
  components/
    layout/     AppLayout, Sidebar, Navbar — the app shell (done)
    ui/         Reusable presentational components (mostly done —
                Modal is a notable exception, see its file)
  context/      ThemeContext (done, study this one first),
                ToastContext + AuthContext (skeletons)
  features/     One folder per product area — dashboard, leads, deals,
                contacts, auth, settings. This is where most of your
                work happens.
  hooks/        useLocalStorage (done, study this one first),
                useDebounce / usePagination / useFetch (skeletons)
  reducers/     leadsReducer (skeleton, for Stage 9)
  services/     api.js — a fake backend with realistic async behavior
                (500ms latency, 5% random failures) — this file is
                finished, treat it like a real REST API
  styles/       Design tokens (theme.css) + global styles (done)
  utils/        formatters.js (done), filterUtils.js / sortUtils.js
                (skeletons)
  types/        JSDoc typedefs for Lead / Contact / Deal / ActivityEvent
```

Every unfinished file has a comment block at the top explaining **what
to build, in what order, with hints — not the solution.** Read those
before you start typing.

## Suggested build order (the "difficulty progression")

Work top to bottom. Don't skip ahead to useReducer or useMemo before the
plain useState version of a page actually works — every later stage is
written assuming the earlier one is already solid.

| Stage | Concept | Where |
|---|---|---|
| 1 | Static UI | Already done — the shell, styles, placeholder pages |
| 2 | Props | Study `Button`, `Card`, `Badge`, `StatCard` — reused with different props |
| 3 | Local state | `LeadForm`, `ContactsPage` search box, `LoginPage` |
| 4 | Lifting state | Read the note in `LeadsPage.jsx` — lift only when siblings actually share it |
| 5 | Effects | `DashboardPage`, then `LeadsPage`, `ContactsPage`, `DealsPipelinePage` |
| 6 | Data fetching | Same pages — loading/error states, `api.js` |
| 7 | Custom hooks | `useDebounce`, `usePagination`, `useFetch` — then refactor Stage 5/6 code to use them |
| 8 | Context | `ToastContext`, `AuthContext`, then `LoginPage` + a `ProtectedRoute` |
| 9 | Reducers | `leadsReducer` for `LeadsPage`, optionally a reducer for deal-stage moves |
| 10 | Performance | `useMemo` for filter/sort, `React.memo` on row components, verify with React DevTools |
| 11 | Testing | Not scaffolded at all — pick a page you've finished and add tests yourself (Vitest + React Testing Library is a reasonable choice, not installed) |

## How React works behind the scenes — where you'll actually feel it

This isn't a separate file to read; you'll run into it while building:

- **`components/ui/Table.jsx`** has a long comment on why `key` must be
  a stable id (`lead.id`), not the array index, and how that connects to
  reconciliation.
- **`DealsPipelinePage`**, once you add drag-and-drop, will make you
  think hard about *where* state should live so moving one card doesn't
  re-render the entire board.
- Once you reach Stage 10, use the React DevTools "Highlight updates"
  setting on `LeadsPage` while typing in the search box, *before* and
  *after* you add `useMemo` / `useDebounce`. Seeing the difference is
  the point — don't just add the optimization and move on.

## Ground rules for yourself

- If you find yourself about to paste a full solution to a TODO from
  somewhere else without understanding it, stop and reread the hint
  block first — the hints are calibrated to get you unstuck without
  finishing the thought for you.
- When a TODO says "questions to think about," actually answer them
  (out loud, in a comment, whatever) before moving on. Several of them
  don't have a single correct answer — the value is in reasoning it
  through, not landing on the "right" one.
- It's fine to build a page the "ugly but correct" way first (plain
  `useState`/`useEffect`) and refactor to a custom hook or reducer
  later. That refactor is itself part of the curriculum — don't skip
  straight to the advanced version.

## What's deliberately NOT here

- No tests (Stage 11 — your call on tooling)
- No real backend — `services/api.js` is the ceiling of "real" here
- No `Modal` implementation, no drag-and-drop, no working search/sort/
  filter/pagination — these are the point of the exercise
- No TypeScript — JSDoc typedefs in `types/index.js` are there if you
  want the editor hints; migrating to real `.ts` is a reasonable stretch
  goal after everything else works
