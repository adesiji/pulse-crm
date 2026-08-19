# Pulse — Sales CRM (Learning Scaffold)

A sales CRM for a fictional B2B startup. The
architecture, routing, design system, mock backend, and component shells
are done. 

## Running it

```bash
npm install
npm run dev
```



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



  want the editor hints; migrating to real `.ts` is a reasonable stretch
  goal after everything else works
