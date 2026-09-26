import { useState } from 'react';

function formatShortDate(dateString) {
  if (!dateString) return '';
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
  });
}

// `collapsible` (mobile) folds the fields behind a one-line summary so the
// items list stays on screen.
export default function CustomerForm({ customer, onChange, onClear, collapsible = false }) {
  const [expanded, setExpanded] = useState(() => !customer.name);
  const showFields = !collapsible || expanded;

  return (
    <div className={`card customer-form${collapsible ? ' collapsible' : ''}`}>
      {collapsible ? (
        <button
          type="button"
          className="customer-summary"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          <span className="customer-summary-text">
            <span className="customer-summary-label">Customer</span>
            <span className="customer-summary-name">{customer.name || 'Add customer details'}</span>
          </span>
          {customer.date && <span className="customer-summary-date">{formatShortDate(customer.date)}</span>}
          <svg
            className="chevron"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      ) : (
        <div className="customer-form-header">
          <h2>Customer Details</h2>
          <button type="button" className="btn btn-outline btn-sm" onClick={onClear}>
            Clear
          </button>
        </div>
      )}
      {showFields && (
        <div className="field-grid">
          <div className="field">
            <label htmlFor="c-name">Name</label>
            <input id="c-name" value={customer.name} onChange={(e) => onChange('name', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="c-address">Address</label>
            <input
              id="c-address"
              value={customer.address}
              onChange={(e) => onChange('address', e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="c-phone">Phone No</label>
            <input
              id="c-phone"
              type="tel"
              maxLength={10}
              value={customer.phone}
              onChange={(e) => onChange('phone', e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="c-date">Date</label>
            <input
              id="c-date"
              type="date"
              value={customer.date}
              onChange={(e) => onChange('date', e.target.value)}
            />
          </div>
          {collapsible && (
            <div className="customer-collapsible-actions">
              <button type="button" className="btn btn-outline btn-sm" onClick={onClear}>
                Clear
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setExpanded(false)}>
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
