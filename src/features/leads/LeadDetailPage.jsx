import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card.jsx';
import { api } from '../../services/api.js';

/**
 * LeadDetailPage — YOURS TO BUILD.
 *
 * Reached via /leads/:leadId (see router.jsx and the "View →" link in
 * LeadsPage's Table). useParams() is how you read `:leadId` out of the
 * URL — Router owns that piece of state, not you.
 *
 * STAGE: 5-6 (effects/fetching) again, but with a twist: the effect
 * needs to re-run whenever `leadId` CHANGES, not just on mount (a user
 * can navigate from one lead's page directly to another one without
 * this component unmounting).
 *
 * TODO:
 * // 1. const { leadId } = useParams();
 * // 2. useState for lead / isLoading / error
 * // 3. useEffect that calls api.getLeadById(leadId) — include leadId
 * //    in the dependency array so navigating leads/1 -> leads/2 refetches
 * // 4. Render the lead's full details once loaded
 * // 5. Add a status-change control (a <select> is fine) that calls
 * //    api.updateLeadStatus(leadId, newStatus) and updates local state
 * //    optimistically or after the call resolves — your choice, but be
 * //    intentional about which and why
 *
 * HINTS:
 * - "Optimistic update" means updating the UI BEFORE the API call
 *   confirms success, then rolling back if it fails. It makes the UI
 *   feel instant but means you need a rollback path. Try the simple
 *   "wait for the response" version first.
 *
 * COMMON MISTAKES:
 * - Leaving `leadId` out of the effect's dependency array — the page
 *   will keep showing the FIRST lead you visited even after the URL
 *   changes.
 *
 * QUESTIONS TO THINK ABOUT:
 * - If the user edits the status here, should LeadsPage's list (if they
 *   navigate back) show the updated status? What does that imply about
 *   where "the real" leads data should live vs. where it's cached?
 */
export function LeadDetailPage() {
  const { leadId } = useParams();
  void api; // (remove once you call api.getLeadById)

  return (
    <div>
      <Link to="/leads">← Back to leads</Link>
      <Card className="mt-4">
        <h2>Lead detail: {leadId}</h2>
        <p className="text-muted">TODO: fetch and render this lead's full details.</p>
      </Card>
    </div>
  );
}
