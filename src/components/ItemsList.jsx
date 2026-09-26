import { formatGraph } from '../utils/formatGraph';

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function badgeVariant(type) {
  const hand = type.includes('Handloom');
  const power = type.includes('Powerloom');
  if (hand && power) return 'mixed';
  return hand ? 'handloom' : 'powerloom';
}

function formatAmount(amount) {
  const n = parseFloat(amount);
  return Number.isNaN(n) ? '0' : n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

export default function ItemsList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>No Items Added.</p>
        <span>Please Add the Item From Form.</span>
      </div>
    );
  }

  return (
    <div className="items-list">
      <div className="items-header">
        <span className="area-name">Item</span>
        <span className="area-type">Weave Type</span>
        <span className="area-meta">
          <span>Chaok</span>
          <span>Khewa</span>
          <span>Graph</span>
          <span>Rate</span>
        </span>
        <span className="area-price">Amount</span>
        <span className="area-actions">Actions</span>
      </div>

      {items.map((it, idx) => (
        <div className="item-row" key={it.id}>
          <div className="item-row-name area-name">
            <span className="item-index">{idx + 1}</span>
            <div className="item-title">
              <span className="item-name" title={it.item}>
                {it.item}
              </span>
              {it.itemPart && <span className="item-part">{it.itemPart}</span>}
            </div>
          </div>

          <div className="item-row-type area-type">
            {it.itemType ? (
              <span className={`type-badge ${badgeVariant(it.itemType)}`}>{it.itemType}</span>
            ) : (
              <span className="muted-dash">—</span>
            )}
          </div>

          <div className="item-row-meta area-meta">
            <div className="item-row-value" data-label="Chaok">
              {it.chaok || '—'}
            </div>
            <div className="item-row-value" data-label="Khewa">
              {it.khewa || '—'}
            </div>
            <div className="item-row-value" data-label="Graph">
              {formatGraph(it) || '—'}
            </div>
            <div className="item-row-value" data-label="Rate">
              {it.rate || '—'}
            </div>
          </div>

          <div className="item-row-value item-row-price area-price" data-label="Amount">
            ₹{formatAmount(it.amount)}
          </div>

          <div className="item-row-actions area-actions">
            <button type="button" className="icon-btn" aria-label="Edit item" onClick={() => onEdit(it)}>
              <EditIcon />
            </button>
            <button
              type="button"
              className="icon-btn danger"
              aria-label="Delete item"
              onClick={() => onDelete(it)}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
