export default function CustomerForm({ customer, onChange, onClear }) {
  return (
    <div className="card customer-form">
      <div className="customer-form-header">
        <h2>Customer Details</h2>
        <button type="button" className="btn btn-outline btn-sm" onClick={onClear}>
          Clear
        </button>
      </div>
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
      </div>
    </div>
  );
}
