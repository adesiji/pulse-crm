import React from "react";
import { Card } from "../../components/ui/Card.jsx";
import { StatCard } from "./StatCard.jsx";
import { PulseDivider } from "../../components/ui/PulseDivider.jsx";
import { api } from "../../services/api.js";
import { formatCurrency, formatRelativeTime } from "../../utils/formatters.js";
import { LoadingSkeleton } from "../../components/ui/LoadingSkeleton.jsx";
import { useState, useEffect } from "react";

/**
 * DashboardPage — the first "real" page. Static shell is here; the data
 * is not.
 *
 * STAGE: 5 (Effects) -> 6 (Data Fetching) -> 7 (Custom Hooks, once you
 * refactor to useFetch).
 *
 * WHAT'S ALREADY HERE:
 * - Layout: four StatCards in a grid, plus an activity feed card.
 * - Fake numbers hardcoded directly in JSX so you can see the target
 *   layout before wiring real data.
 *
 * TODO:
 * // 1. Replace the hardcoded stat numbers with real ones, computed
 * //    from leads + deals you fetch from `api.getLeads()` /
 * //    `api.getDeals()`. Things worth showing: total pipeline value,
 * //    count of qualified leads, count of deals won this month, count
 * //    of new leads this week. You decide the exact four.
 * // 2. Start with a plain useEffect + useState (isLoading, error, data)
 * //    — don't reach for useFetch yet, you haven't built it. Get the
 * //    ugly-but-correct version working FIRST.
 * // 3. Fetch `api.getActivity()` too and render it below, replacing the
 * //    placeholder list. Use formatRelativeTime() on each timestamp.
 * // 4. Show a loading state (LoadingSkeleton is available) while
 * //    fetching, and an error message if the request fails — remember
 * //    api.js randomly fails 5% of the time on purpose, so you WILL see
 * //    this path if you refresh enough.
 * // 5. LATER (after Stage 7): replace your useEffect with
 * //    `useFetch(() => api.getLeads(), [])` etc. once that hook exists.
 * //    Compare how much code disappears.
 *
 * HINTS:
 * - You'll fetch from two endpoints here (leads/deals + activity).
 *   Either two separate effects, or one effect with Promise.all — think
 *   about which makes the loading state easier to reason about.
 *
 * COMMON MISTAKES:
 * - Forgetting the dependency array on useEffect entirely — that
 *   re-fetches on EVERY render, which for a fake API with artificial
 *   latency will make the page feel like it never finishes loading.
 * - Calculating derived stats (like "total pipeline value") inside the
 *   fetch effect and storing them in their OWN state, instead of just
 *   storing the raw deals and computing the sum during render. Fewer
 *   sources of truth is usually better.
 *
 * QUESTIONS TO THINK ABOUT:
 * - If both requests are independent, does it matter whether they run
 *   in parallel or one-after-another for the user's experience?
 * - Once real numbers are wired up, does this page still need to know
 *   HOW leads/deals are shaped, or could StatCard's inputs be computed
 *   somewhere else (e.g. a selectors/ file) and just handed in?
 */
export function DashboardPage() {
  const [leads, setLeads] = useState([]); //etc — or useFetch later
  const [deals, setDeals] = useState([]);
  const [activities, setActivities] = useState([]);
  // void api; // (remove this line once you actually call api.* below)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      setIsLoading(true);
      //Wait until all requests are either fulfilled or rejected
      const results = await Promise.allSettled([
        api.getLeads(),
        api.getDeals(),
        api.getActivity(),
      ]);

      // Destructure individual settlement results in order
      const [leadsResult, dealsResult, activitiesResult] = results;

      // Handle the lead outcome independently
      if (leadsResult.status === "fulfilled") {
        setLeads(leadsResult.value);
      } else {
        setError((prev) => ({
          ...prev,
          leads: "Failed to load leads data.",
        }));
      }

      // Handle the deal outcome independently
      if (dealsResult.status === "fulfilled") {
        setDeals(dealsResult.value);
      } else {
        setError((prev) => ({
          ...prev,
          deals: "Failed to load deals data.",
        }));
      }

      // Handle the activity outcome independently
      if (activitiesResult.status === "fulfilled") {
        setActivities(activitiesResult.value);
      } else {
        setError((prev) => ({
          ...prev,
          activities: "Failed to load activity data.",
        }));
      }

      setIsLoading(false);
    }
    fetchDashboardData();
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  // Compute the four dashboard stats from the raw fetched data.
  const pipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const qualifiedLeads = leads.filter((l) => l.status === "qualified").length;
  const dealsWon = deals.filter((d) => d.stage === "won").length;
  const newThisWeek = leads.filter(
    (l) =>
      Date.now() - new Date(l.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000
  ).length;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Your pipeline at a glance.</p>
      <PulseDivider />

      {error && (
        <div className="error-banner mb-4">
          {Object.values(error).map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </div>
      )}

      <div className="card-grid mt-6">
        <StatCard
          label="Pipeline value"
          value={formatCurrency(pipelineValue)}
        />
        <StatCard label="Qualified leads" value={qualifiedLeads} />
        <StatCard label="Deals won" value={dealsWon} />
        <StatCard label="New this week" value={newThisWeek} />
      </div>

      <Card className="mt-6">
        <h3>Recent activity</h3>
        {activities.length === 0 ? (
          <p className="text-muted">No recent activity.</p>
        ) : (
          <ul className="activity-list">
            {activities.map((note) => (
              <li key={note.id}>
                {note.message}{" "}
                <span className="text-muted">
                  ({formatRelativeTime(note.timestamp)})
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

/*
 * ── CHECKPOINT ───────────────────────────────────────────────────────
 * Build next:   Wire up real data for this page (Stage 5-6 above).
 * Practice:     useEffect, useState, loading/error states, Promise.all.
 * Then move to: features/leads/LeadsPage.jsx — the biggest page in the
 *               app, and where Stages 4, 7, 9, 10 really live.
 * ────────────────────────────────────────────────────────────────────
 */
