import numberToWords from '../utils/numberToWords';
import { BUSINESS } from '../constants';
import paisleyMotif from '../assets/paisley-motif.png';
import watermarkFlower from '../assets/watermark-flower.png';

const MIN_ROWS = 15;

function formatDate(dateString) {
  const date = dateString ? new Date(`${dateString}T00:00:00`) : new Date();
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function BillPrint({ items, customer }) {
  const total = items.reduce((sum, it) => sum + (parseFloat(it.price) || 0), 0);
  const amountInWords = numberToWords(Math.round(total));
  const blankRows = Math.max(0, MIN_ROWS - items.length);
  const billDate = formatDate(customer?.date);

  return (
    <div className="bill-print">
      <img className="bill-watermark" src={watermarkFlower} alt="" aria-hidden="true" />

      <div className="bill-content">
        <div className="brand-band">
          <div className="motif-badge">
            <img src={paisleyMotif} alt="" className="letterhead-motif letterhead-motif-left" />
          </div>
          <div className="letterhead-text">
            <h1 className="brand-name">{BUSINESS.name}</h1>
            <p className="brand-tagline">Fine Handloom &amp; Powerloom Textiles</p>
          </div>
          <div className="motif-badge">
            <img src={paisleyMotif} alt="" className="letterhead-motif letterhead-motif-right" />
          </div>
        </div>

        <div className="deco-trim" aria-hidden="true" />

        <div className="brand-subbar">
          <span>
            {BUSINESS.address} &nbsp;|&nbsp; Contact No : {BUSINESS.contact}
          </span>
          <span className="brand-date">Date : {billDate}</span>
        </div>

        <div className="billed-to-panel">
          <span className="billed-to-title">Billed To</span>
          <div className="bill-meta">
            <div>
              <span>Name</span>
              <span>:</span>
              {customer?.name ? <span className="value line">{customer.name}</span> : <span className="line" />}
            </div>
            <div>
              <span>Address</span>
              <span>:</span>
              {customer?.address ? (
                <span className="value line">{customer.address}</span>
              ) : (
                <span className="line" />
              )}
            </div>
            <div>
              <span>P.No</span>
              <span>:</span>
              {customer?.phone ? <span className="value line">{customer.phone}</span> : <span className="line" />}
            </div>
          </div>
        </div>

        <table className="bill-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Item</th>
              <th>Chaok</th>
              <th>Khewa</th>
              <th>Rate</th>
              <th>Item Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={it.id}>
                <td>{idx + 1}</td>
                <td className="item-width">{it.item}</td>
                <td>{it.chaok}</td>
                <td>{it.khewa}</td>
                <td>{it.price}</td>
                <td>{it.itemType}</td>
                <td>{it.price}</td>
              </tr>
            ))}
            {Array.from({ length: blankRows }).map((_, i) => (
              <tr key={`blank-${i}`} className="blank-row">
                <td>{i + items.length + 1}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="summary-row">
          <div className="bill-words">
            <strong>Rupees In Word :</strong> {amountInWords}
          </div>
          <div className="total-box">
            <span>Total</span>
            <strong>₹{total.toFixed(2)}</strong>
          </div>
        </div>

        <div className="bill-footer">
          <span>Terms &amp; Condition :</span>
          <div className="signature-box">
            <span className="signature-name">Waseem Ahmad</span>
            <span className="signature-dots">.....................................</span>
            <span className="signature-caption">Signature</span>
          </div>
        </div>

        <div className="deco-trim" aria-hidden="true" />

        <p className="bill-thanks">Thank you!</p>
      </div>
    </div>
  );
}
