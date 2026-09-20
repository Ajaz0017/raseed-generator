import { useEffect, useState } from 'react';
import { EMPTY_FORM, ITEM_TYPES } from '../constants';

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
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.item.trim() || form.price === '') return;

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
          <label htmlFor="f-chaok">Chaok</label>
          <input type="number" id="f-chaok" value={form.chaok} onChange={handleChange('chaok')} />
        </div>
        <div className="field">
          <label htmlFor="f-khewa">Khewa</label>
          <input type="number" id="f-khewa" value={form.khewa} onChange={handleChange('khewa')} />
        </div>
        <div className="field">
          <label htmlFor="f-price">Price</label>
          <input
            id="f-price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange('price')}
            placeholder="0.00"
          />
        </div>
        <div className="field">
          <label htmlFor="f-type">Item Type</label>
          <select id="f-type" value={form.itemType} onChange={handleChange('itemType')}>
            <option value="" disabled>
              Select type
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
