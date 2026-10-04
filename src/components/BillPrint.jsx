import numberToWords from '../utils/numberToWords';
import { formatGraph } from '../utils/formatGraph';
import { BUSINESS } from '../constants';
import headerSaree from '../assets/header-saree.webp';
import headerJacquard from '../assets/header-jacquard.jpg';
import watermarkKairy from '../assets/paisley-motif.png';
import { QRCodeSVG } from 'qrcode.react';
import googlePayLogo from '../assets/pay-apps/google-pay.svg';
import phonePeLogo from '../assets/pay-apps/phonepe.svg';
import paytmLogo from '../assets/pay-apps/paytm.svg';
import bhimLogo from '../assets/pay-apps/bhim.svg';

// Optional asset: drop the owner's signature at src/assets/signature.png.
// Globbing (instead of a static import) keeps the build working without it.
const signatureImg = Object.values(
  import.meta.glob('../assets/signature.png', { eager: true, import: 'default' })
)[0];

const MIN_ROWS = 15;
const UPI_APPS = [
  { name: 'Google Pay', logo: googlePayLogo },
  { name: 'PhonePe', logo: phonePeLogo },
  { name: 'Paytm', logo: paytmLogo },
  { name: 'BHIM', logo: bhimLogo },
];

// `optional` columns are dropped from the bill when no item has a value for them.
// `width` values are relative weights, normalised to percentages at render time.
const COLUMNS = [
  { key: 'sno', label: 'S.No', width: 6, render: (_, idx) => idx + 1 },
  { key: 'item', label: 'Item', width: 21, render: (it) => it.item },
  { key: 'itemPart', label: 'Item Type', width: 10, optional: true, render: (it) => it.itemPart },
  { key: 'chaok', label: 'Chaok', width: 8, render: (it) => it.chaok },
  { key: 'khewa', label: 'Khewa', width: 8, render: (it) => it.khewa },
  {
    key: 'graph',
    label: 'Graph',
    width: 9,
    optional: true,
    style: { textTransform: 'lowercase' },
    render: (it) => formatGraph(it),
  },
  { key: 'rate', label: 'Rate', width: 7, render: (it) => it.rate },
  { key: 'weave', label: 'Weave Type', width: 20, className: 'weave-cell', render: (it) => it.itemType },
  {
    key: 'amount',
    label: 'Amount',
    width: 11,
    className: 'amount-cell',
    render: (it) => formatMoney(it.amount),
  },
];

// UPI deep link with the bill amount pre-filled, so the payer's app opens
// with the amount already entered after scanning.
function upiPayLink(amount, note) {
  const params = new URLSearchParams({
    pa: BUSINESS.upiId,
    pn: BUSINESS.upiName,
    cu: 'INR',
  });
  if (amount > 0) params.set('am', amount.toFixed(2));
  if (note) params.set('tn', note);
  return `upi://pay?${params.toString()}`;
}

function formatDate(dateString) {
  const date = dateString ? new Date(`${dateString}T00:00:00`) : new Date();
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatMoney(value, fractionDigits = 0) {
  const n = parseFloat(value);
  if (Number.isNaN(n)) return '';
  return n.toLocaleString('en-IN', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2,
  });
}

function WhatsAppIcon() {
  return (
    <svg className="contact-icon" viewBox="0 0 24 24" aria-label="WhatsApp" role="img">
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

function PinIcon() {
  return (
    <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"
      />
    </svg>
  );
}

export default function BillPrint({ items, customer, showSignature }) {
  const [brandFirst, ...brandRestWords] = BUSINESS.name.split(' ');
  const brandRest = brandRestWords.join(' ');
  const total = items.reduce((sum, it) => sum + (parseFloat(it.amount) || 0), 0);
  const amountInWords = numberToWords(Math.round(total));
  const blankRows = Math.max(0, MIN_ROWS - items.length);
  const billDate = formatDate(customer?.date);
  const totalLabel = formatMoney(total, 2);
  const upiLink = upiPayLink(total, customer?.name ? `Bill - ${customer.name}` : 'Bill payment');
  const columns = COLUMNS.filter(
    (col) => !col.optional || items.some((it, idx) => String(col.render(it, idx) ?? '').trim())
  );
  const totalWidth = columns.reduce((sum, col) => sum + col.width, 0);

  return (
    <div className="bill-print">
      <img className="bill-watermark" src={watermarkKairy} alt="" aria-hidden="true" />

      <div className="bill-content">
        {/* Letterhead: brand + contacts on the left, slogan panel on the right */}
        <header className="bill-header">
          <div className="bill-header-left">
            <figure className="header-media">
              <img src={headerJacquard} alt="" />
            </figure>
            <div className="brand-block">
              <h1 className="brand-name">
                <span className="brand-name-script">{brandFirst}</span>
                <span className="brand-name-caps">{brandRest}</span>
              </h1>
              <p className="brand-tagline">{BUSINESS.tagline}</p>
              <div className="brand-contacts">
                <span>
                  <PinIcon />
                  {BUSINESS.address}
                </span>
                <span>
                  <PhoneIcon />
                  {BUSINESS.contact}
                  <span className="contact-sep">|</span>
                  <WhatsAppIcon />
                  {BUSINESS.contact}
                </span>
              </div>
            </div>
          </div>

          <div className="bill-header-panel">
            <img src={headerSaree} alt="" className="panel-photo" aria-hidden="true" />
            <p className="panel-slogan">
              {BUSINESS.slogan.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>
        </header>

        <div className="deco-trim" aria-hidden="true" />

        <div className="bill-info-row">
          <div className="billed-to-panel">
            <span className="billed-to-title">Billed To</span>
            <div className="bill-meta">
              <div>
                <span>Name</span>
                <span>:</span>
                <span className="value">{customer?.name}</span>
              </div>
              <div>
                <span>Address</span>
                <span>:</span>
                <span className="value address">{customer?.address}</span>
              </div>
              <div>
                <span>P.No</span>
                <span>:</span>
                <span className="value">{customer?.phone}</span>
              </div>
            </div>
          </div>

          <div className="bill-date-box">
            <span>Bill Date</span>
            <strong>{billDate}</strong>
          </div>
        </div>

        <table className="bill-table">
          <colgroup>
            {columns.map((col) => (
              <col key={col.key} style={{ width: `${(col.width / totalWidth) * 100}%` }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={it.id}>
                {columns.map((col) => (
                  <td key={col.key} className={col.className} style={col.style}>
                    {col.render(it, idx)}
                  </td>
                ))}
              </tr>
            ))}
            {Array.from({ length: blankRows }).map((_, i) => (
              <tr key={`blank-${i}`} className="blank-row">
                {columns.map((col, c) => (
                  <td key={col.key}>{c === 0 ? i + items.length + 1 : null}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="summary-row">
          <div className="bill-words">
            <strong>Rupees In Word :</strong>&nbsp;{amountInWords}
          </div>
          <div className="total-box">
            <span>Grand Total</span>
            <strong>₹{totalLabel}</strong>
          </div>
        </div>

        {/* Payment strip */}
        <div className="payment-strip">
          <div className="pay-qr-card">
            <div className="pay-qr">
              <QRCodeSVG
                value={upiLink}
                level="M"
                marginSize={0}
                role="img"
                aria-label={`UPI QR code for ₹${totalLabel} to ${BUSINESS.upiId}`}
              />
            </div>
            <div className="pay-qr-label">
              <strong>Scan</strong>
              <strong>&amp; Pay</strong>
              <span>via UPI</span>
            </div>
          </div>

          <div className="pay-details">
            <div>
              <span>UPI ID</span>
              <strong>{BUSINESS.upiId}</strong>
            </div>
            <div>
              <span>Name</span>
              <strong>{BUSINESS.upiName}</strong>
            </div>
            <div>
              <span>Amount</span>
              <strong className="pay-amount">₹{totalLabel}</strong>
            </div>
          </div>

          <div className="pay-apps">
            <span className="pay-apps-title">Pay with any UPI app</span>
            <div className="pay-apps-list">
              {UPI_APPS.map((app) => (
                <span key={app.name} className="pay-app-tile">
                  <img src={app.logo} alt={app.name} />
                </span>
              ))}
            </div>
          </div>

          <div className="signature-box">
            {showSignature && signatureImg && (
              <img className="signature-img" src={signatureImg} alt="Signature" />
            )}
            <span className="signature-line" />
            <span className="signature-caption">Authorised Signature</span>
          </div>
        </div>

        <footer className="bill-footer-bar">
          <span className="bill-thanks">Thank you for your trust!</span>
          <span>{BUSINESS.name}</span>
        </footer>
      </div>
    </div>
  );
}
