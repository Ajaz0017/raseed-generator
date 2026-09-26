import { useEffect } from 'react';

const DURATION_MS = 2500;

// `toast` is { id, message }; a new id restarts the timer even for the same text.
export default function Toast({ toast, onDone }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(onDone, DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast, onDone]);

  if (!toast) return null;

  return (
    <div className="toast no-print" role="status" aria-live="polite" key={toast.id}>
      <span className="toast-icon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}
