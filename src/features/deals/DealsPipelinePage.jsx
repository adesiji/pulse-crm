import React, { useEffect, useReducer } from "react";
import { DealColumn } from "./DealColumn.jsx";
import { DEAL_STAGES } from "../../services/mockData/deals.js";
import { api } from "../../services/api.js";
import { LoadingSkeleton } from "../../components/ui/LoadingSkeleton.jsx";
import { useFetch } from "../../hooks/useFetch.js";

/**
 * DealsPipelinePage — YOURS TO BUILD.
 *
 * A kanban board: one column per pipeline stage (DEAL_STAGES, imported
 * above so the columns and the data agree on valid stage names). This
 * page is a good place to practice component decomposition ON PURPOSE:
 * decide what state lives here vs. in DealColumn vs. in DealCard.
 *
 * STAGE: 5-6 (fetch deals), then a stretch goal in drag-and-drop which
 * touches Stage 9 (useReducer) nicely.
 *
 * TODO:
 * // 1. useEffect + useState (or useFetch, once built) to load
 * //    api.getDeals()
 * // 2. Group the flat `deals` array by `stage` — one array per stage in
 * //    DEAL_STAGES. Where should this grouping logic live: inline here,
 * //    or a small pure function in utils/? (Compare to filterUtils.js
 * //    for precedent.)
 * // 3. Render one <DealColumn> per stage, passing it only the deals for
 * //    that stage.
 *
 * STRETCH GOAL — drag and drop between columns:
 * // 4. Make DealCard draggable (native HTML drag events: onDragStart,
 * //    or a library if you prefer) and DealColumn a drop target
 * //    (onDragOver, onDrop).
 * // 5. On drop, call api.updateDealStage(dealId, newStage) and update
 * //    local state. This is a great candidate for useReducer: the
 * //    "move a deal from stage A to stage B" transition is exactly the
 * //    kind of multi-field state update that's awkward with useState
 * //    but natural as a single reducer action:
 * //    { type: 'MOVE_DEAL', payload: { dealId, toStage } }
 *
 * COMMON MISTAKES:
 * - Grouping deals by stage INSIDE the render return (fine at this
 *   scale, but get in the habit of naming it above the return so it's
 *   trivial to wrap in useMemo later — same note as LeadsPage).
 * - Forgetting a stage can legitimately have zero deals — DealColumn
 *   should render fine with an empty array, don't special-case it away.
 *
 * QUESTIONS TO THINK ABOUT:
 * - If you build drag-and-drop, where does the "deal being dragged"
 *   live — component state in DealCard, or lifted up to this page? What
 *   does DealColumn need to know to accept a drop?
 */
export function DealsPipelinePage() {
  const initialState = {
    deals: [],
  };

  function dealReducer(state, action) {
    switch (action.type) {
      case "SET_DEALS":
        return { ...state, deals: action.payload };
      case "MOVE_DEAL":
        return {
          ...state,
          deals: state.deals.map((deal) =>
            deal.id === action.payload.dealId
              ? { ...deal, stage: action.payload.toStage }
              : deal
          ),
        };
      default:
        return state;
    }
  }

  // utils/dealUtils.js
  function groupDealsByStage(deals) {
    return deals.reduce((acc, deal) => {
      if (!acc[deal.stage]) {
        acc[deal.stage] = [];
      }
      acc[deal.stage].push(deal);
      return acc;
    }, {});
  }

  const [state, dispatch] = useReducer(dealReducer, initialState);

  const { data, error, isLoading } = useFetch(() => api.getDeals(), []);

  // Sync the fetched deals into the reducer (which owns the array so
  // MOVE_DEAL can update individual stage transitions).
  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_DEALS", payload: data });
    }
  }, [dispatch, data]);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <div>Error: {error}</div>;

  const groupedDeals = groupDealsByStage(state.deals);

  return (
    <div>
      <h1>Deals</h1>
      <p>
        Drag deals across stages as they progress (once you build that part).
      </p>
      <div className="kanban-board mt-4">
        {DEAL_STAGES.map((stage) => (
          <DealColumn
            key={stage}
            stage={stage}
            deals={groupedDeals[stage] || []}
          />
        ))}
      </div>
    </div>
  );
}

/*
 * ── CHECKPOINT ───────────────────────────────────────────────────────
 * Build next:   Fetch and group deals by stage.
 * Practice:     useEffect, data transformation, component composition.
 * Stretch:      Drag-and-drop + useReducer for stage transitions.
 * ────────────────────────────────────────────────────────────────────
 */
