import React from "react";

/**
 * LoadingSkeleton — PARTIALLY built. The static block below is enough to
 * reserve layout space (prevents content "jumping" when data arrives),
 * but it doesn't shimmer yet.
 *
 * TODO:
 * // 1. In styles/global.css, add a @keyframes shimmer rule that
 * //    animates `background-position` on .skeleton
 * // 2. Apply `animation: shimmer 1.4s ease-in-out infinite;` to .skeleton
 * // 3. Use this component in DashboardPage / LeadsPage while
 * //    `isLoading` is true (from your useFetch hook) instead of
 * //    rendering nothing
 *
 * QUESTIONS TO THINK ABOUT:
 * - Why show a skeleton shaped like the real content instead of a
 *   generic spinner? What does the shape communicate to the user?
 */
export function LoadingSkeleton({ width = "100%", height = "16px" }) {
  return <div className="skeleton" style={{ width, height }} />;
}
