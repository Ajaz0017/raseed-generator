import numberToWords from '../utils/numberToWords';
import { formatGraph } from '../utils/formatGraph';
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

function WhatsAppIcon() {
  return (
    <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-label="WhatsApp" role="img">
      <path
        fill="#25D366"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Z"
      />
      <path
        fill="#fff"
        d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"
      />
    </svg>
  );
}

export default function BillPrint({ items, customer }) {
  const [brandFirst, ...brandRestWords] = BUSINESS.name.split(' ');
  const brandRest = brandRestWords.join(' ');
  const total = items.reduce((sum, it) => sum + (parseFloat(it.amount) || 0), 0);
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
            <h1 className="brand-name">
              <span className="brand-name-script">{brandFirst}</span>
              <span className="brand-name-caps">{brandRest}</span>
            </h1>
            <p className="brand-tagline">{BUSINESS.tagline}</p>
          </div>
          <div className="motif-badge">
            <img src={paisleyMotif} alt="" className="letterhead-motif letterhead-motif-right" />
          </div>
        </div>

        <div className="deco-trim" aria-hidden="true" />

        <div className="brand-subbar">
          <span className="brand-contact">
            {BUSINESS.address} &nbsp;|&nbsp; Contact No : {BUSINESS.contact} &nbsp;|&nbsp;
            <span className="whatsapp">
              <WhatsAppIcon />
              {BUSINESS.contact}
            </span>
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
          <colgroup>
            <col style={{ width: '6%' }} />
            <col style={{ width: '21%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '9%' }} />
            <col style={{ width: '7%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '11%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Item</th>
              <th>Item Type</th>
              <th>Chaok</th>
              <th>Khewa</th>
              <th>Graph</th>
              <th>Rate</th>
              <th>Weave Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={it.id}>
                <td>{idx + 1}</td>
                <td title={it.item}>{it.item}</td>
                <td>{it.itemPart}</td>
                <td>{it.chaok}</td>
                <td>{it.khewa}</td>
                <td style={{textTransform : 'lowercase'}}>{formatGraph(it)}</td>
                <td>{it.rate}</td>
                <td className="weave-cell">{it.itemType}</td>
                <td>{it.amount}</td>
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
          <span>
            {/* Terms &amp; Condition : */}

          </span>
          <div className="signature-box">
            {/* <span className="signature-name">Waseem Ahmad</span> */}
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
