/**
 * useFetch — a generic "call this async function and track its lifecycle"
 * hook. Used by pages that fetch once from services/api.js.
 *
 * SIGNATURE:
 *   const { data, error, isLoading, refetch } = useFetch(fetchFn, deps);
 *
 * where `fetchFn` is something like `() => api.getContacts()`.
 *
 * BEHAVIOR:
 * - Runs `fetchFn` when the component mounts and whenever `deps` change.
 * - Tracks `data`, `error`, and `isLoading` over the lifecycle.
 * - Exposes `refetch()` to manually re-trigger the fetch (e.g. after a
 *   form submit creates a new record).
 * - Guards against the race condition: a stale response from a previous
 *   render cannot overwrite a newer one.
 */
import { useState, useEffect, useCallback, useRef } from "react";

export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [version, setVersion] = useState(0); // bump to re-trigger the fetch

  // Always call the latest fetchFn, even from a cached refetch callback.
  // Without this, an inline arrow `() => api.getContacts()` would capture
  // a stale reference in the memoized refetch.
  const fetchFnRef = useRef(fetchFn);
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchFnRef
      .current()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || "Something went wrong.");
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true; // guard against stale responses
    };
    // `deps` is the caller-controlled dependency array; `fetchFn` is kept
    // fresh via fetchFnRef so it doesn't need to be a direct dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, version]);

  const refetch = useCallback(() => {
    setVersion((v) => v + 1);
  }, []);

  return { data, error, isLoading, refetch };
}
