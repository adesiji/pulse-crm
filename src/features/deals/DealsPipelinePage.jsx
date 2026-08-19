import React, { useEffect, useMemo, useReducer, useState } from "react";
import { DealColumn } from "./DealColumn.jsx";
import { DEAL_STAGES } from "../../services/mockData/deals.js";
import { api } from "../../services/api.js";
import { LoadingSkeleton } from "../../components/ui/LoadingSkeleton.jsx";
import { useFetch } from "../../hooks/useFetch.js";
import { useToast } from "../../context/ToastContext.jsx";

/**
 * DealsPipelinePage — a kanban board: one column per pipeline stage
 * (DEAL_STAGES, imported above so the columns and the data agree on
 * valid stage names).
 *
 * State: `deals` lives in a reducer (MOVE_DEAL is a clean single-action
 * transition for "move a deal from stage A to stage B"). Which deal is
 * currently being dragged is separate, transient UI state (useState) —
 * it doesn't need to survive a re-fetch and isn't part of what gets
 * persisted, only drag-feedback styling in DealCard/DealColumn.
 *
 * Drag-and-drop: native HTML5 DnD. DealCard is the drag source
 * (onDragStart/onDragEnd), DealColumn is the drop target
 * (onDragOver/onDragLeave/onDrop). On drop, the move is applied
 * optimistically via MOVE_DEAL, then persisted with
 * api.updateDealStage — if that fails, the same MOVE_DEAL action rolls
 * the card back to its original stage and a toast explains why.
 *
 * Grouping deals by stage is a pure function of `state.deals`, memoized
 * with useMemo so drag-driven re-renders (which only touch the local
 * `draggedDealId` state) don't re-group the whole board every time.
 */
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

// utils/dealUtils.js candidate — pure, so it's a clean useMemo dependency
// below (see the "Pipeline grouping" note in the README's Stage 10).
function groupDealsByStage(deals) {
  return deals.reduce((acc, deal) => {
    if (!acc[deal.stage]) {
      acc[deal.stage] = [];
    }
    acc[deal.stage].push(deal);
    return acc;
  }, {});
}

export function DealsPipelinePage() {
  const [state, dispatch] = useReducer(dealReducer, initialState);
  const { showToast } = useToast();

  // "Deal being dragged" is transient, UI-only state — it doesn't affect
  // what's persisted, only drag-feedback styling (DealCard/DealColumn),
  // so it lives here as plain useState rather than in the reducer.
  const [draggedDealId, setDraggedDealId] = useState(null);

  const { data, error, isLoading } = useFetch(() => api.getDeals(), []);

  // Sync the fetched deals into the reducer (which owns the array so
  // MOVE_DEAL can update individual stage transitions).
  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_DEALS", payload: data });
    }
  }, [dispatch, data]);

  // Grouping is a pure derived value of `state.deals` — memoized so
  // dragging (which only touches the local `draggedDealId` state above)
  // doesn't re-group the whole board on every dragover-driven re-render.
  const groupedDeals = useMemo(
    () => groupDealsByStage(state.deals),
    [state.deals]
  );

  const handleDragStart = (dealId) => setDraggedDealId(dealId);
  const handleDragEnd = () => setDraggedDealId(null);

  const handleDropDeal = async (dealId, toStage) => {
    const deal = state.deals.find((d) => d.id === dealId);
    if (!deal || deal.stage === toStage) return; // no-op drop

    const fromStage = deal.stage;

    // Optimistic update: move the card immediately, then persist.
    dispatch({ type: "MOVE_DEAL", payload: { dealId, toStage } });

    try {
      await api.updateDealStage(dealId, toStage);
    } catch (err) {
      // Persistence failed — roll back to the previous stage and let the
      // user know, using the same ToastContext pattern the rest of the
      // app uses for async feedback.
      dispatch({ type: "MOVE_DEAL", payload: { dealId, toStage: fromStage } });
      showToast(
        err?.message || "Failed to move deal. Please try again.",
        "error"
      );
    }
  };

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Deals</h1>
      <p>Drag deals across stages as they progress.</p>
      <div className="kanban-board mt-4">
        {DEAL_STAGES.map((stage) => (
          <DealColumn
            key={stage}
            stage={stage}
            deals={groupedDeals[stage] || []}
            draggedDealId={draggedDealId}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDropDeal={handleDropDeal}
          />
        ))}
      </div>
    </div>
  );
}

