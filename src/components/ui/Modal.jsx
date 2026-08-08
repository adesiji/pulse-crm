import React, { useRef } from 'react';
// TODO: import { createPortal } from 'react-dom';

/**
 * Modal — YOURS TO BUILD.
 *
 * Used by: LeadForm ("New Lead" dialog), and potentially a deal detail
 * view later.
 *
 * STAGE: mainly useRef, but ties into effects too (Esc-key listener).
 *
 * TODO:
 * // 1. Render through a PORTAL (createPortal) into document.body,
 * //    rather than wherever <Modal> happens to sit in the tree — this
 * //    avoids z-index/overflow fights with parent containers. There's
 * //    already a <div id="root"> in index.html; you can add a sibling
 * //    <div id="modal-root"> there, or just portal into document.body.
 * // 2. Use the `dialogRef` below (already created with useRef) on your
 * //    modal panel element. useRef here gives you a DIRECT handle to
 * //    the actual DOM node — something props/state can't do — which
 * //    you need for:
 * //      a) detecting a click OUTSIDE the panel (compare
 * //         event.target against dialogRef.current, close if it's
 * //         not inside)
 * //      b) moving keyboard focus into the modal when it opens
 * //         (dialogRef.current.focus(), with tabIndex={-1} on the panel)
 * // 3. useEffect to listen for the Escape key while open, and clean up
 * //    the listener when the modal closes/unmounts
 * // 4. Accept `isOpen` and `onClose` props; render `null` when closed
 *    rather than hiding with CSS — cheaper, and resets any internal
 *    form state for free
 *
 * HINTS:
 * - useRef does NOT cause a re-render when you mutate `.current`. That's
 *   exactly why it's the right tool here — you're reaching into the DOM
 *   imperatively, not describing UI declaratively.
 * - Don't forget a visible focus outline on the panel itself for
 *   accessibility (there's already a global :focus-visible rule you can
 *   rely on).
 *
 * COMMON MISTAKES:
 * - Attaching the outside-click listener to the modal panel instead of
 *   `document` (it needs to catch clicks happening OUTSIDE the panel).
 * - Forgetting `event.stopPropagation()` on the panel if you attach the
 *   close handler to the overlay's onClick instead of a document listener
 *   — otherwise every click inside the modal bubbles up and closes it.
 *
 * QUESTIONS TO THINK ABOUT:
 * - Why is "render null when closed" usually better than
 *   "display: none"? What state would you lose either way?
 * - What's the difference between what useRef gives you here and what
 *   useState would give you, if you tried to track "the DOM node" in
 *   state instead?
 */
export function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null);

  if (!isOpen) return null;

  // TODO: replace this with a real overlay + panel, rendered via portal
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(20,20,43,0.4)' }}>
      <div ref={dialogRef} className="card" style={{ maxWidth: 480, margin: '10vh auto' }}>
        <div className="flex-between">
          <h3>{title}</h3>
          <button className="btn btn-ghost" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
