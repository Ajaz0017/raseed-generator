import { useEffect, useState } from 'react';
import { EMPTY_FORM, ITEM_PARTS, ITEM_TYPES } from '../constants';
import { calcAmount } from '../utils/calcAmount';

export default function BillForm({ onAdd, onUpdate, editingItem, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (editingItem) {
      const { id, ...rest } = editingItem;
      setForm(rest);
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingItem]);

  function handleChange(field) {
    return (e) =>
      setForm((f) => {
        const next = { ...f, [field]: e.target.value };
        return { ...next, amount: calcAmount(next) };
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.item.trim() || form.rate === '') return;

    if (editingItem) {
      onUpdate(editingItem.id, form);
    } else {
      onAdd(form);
    }
    setForm(EMPTY_FORM);
  }

  return (
    <form className="card bill-form" onSubmit={handleSubmit}>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="f-item">Item</label>
          <input id="f-item" value={form.item} onChange={handleChange('item')} />
        </div>
        <div className="field">
          <label htmlFor="f-part">Item Type</label>
          <select id="f-part" value={form.itemPart ?? ''} onChange={handleChange('itemPart')}>
            <option value="">Select</option>
            {ITEM_PARTS.map((part) => (
              <option key={part} value={part}>
                {part}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-chaok">Chaok</label>
          <input type="tel" id="f-chaok" value={form.chaok} onChange={handleChange('chaok')} />
        </div>
        <div className="field">
          <label htmlFor="f-khewa">Khewa</label>
          <input type="tel" id="f-khewa" value={form.khewa} onChange={handleChange('khewa')} />
        </div>
        <div className="field">
          <label htmlFor="f-graph-x">Graph</label>
          <div className="graph-inputs">
            <input
              type="tel"
              id="f-graph-x"
              value={form.graphX ?? ''}
              onChange={handleChange('graphX')}
              placeholder="20"
              aria-label="Graph width"
            />
            <span aria-hidden="true">x</span>
            <input
              type="tel"
              value={form.graphY ?? ''}
              onChange={handleChange('graphY')}
              placeholder="20"
              aria-label="Graph height"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="f-rate">Rate</label>
          <input
            id="f-rate"
            type="number"
            min="0"
            step="0.01"
            value={form.rate}
            onChange={handleChange('rate')}
            placeholder="0.00"
          />
        </div>
        <div className="field">
          <label htmlFor="f-amount">Amount</label>
          <input id="f-amount" type="number" value={form.amount} readOnly placeholder="0.00" />
        </div>
        <div className="field">
          <label htmlFor="f-type">Weave Type</label>
          <select id="f-type" value={form.itemType} onChange={handleChange('itemType')}>
            <option value="" disabled>
              Select
            </option>
            {ITEM_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingItem ? 'Update' : 'Add'}
        </button>
        {editingItem && (
          <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
