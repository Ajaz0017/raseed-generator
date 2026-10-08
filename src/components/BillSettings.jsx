import { useState } from 'react';
import { BILL_FONTS } from '../constants';
import SignatureToggle from './SignatureToggle';
import watermarkKairy from '../assets/paisley-motif.png';

// `collapsible` (mobile) folds the controls behind a one-line summary, like
// the customer card.
export default function BillSettings({ settings, onChange, collapsible = false }) {
  const [expanded, setExpanded] = useState(false);
  const showControls = !collapsible || expanded;
  const { showSignature, watermarkOpacity, fontId } = settings;
  const activeFont = BILL_FONTS.find((f) => f.id === fontId) ?? BILL_FONTS[0];

  return (
    <div className={`card bill-settings${collapsible ? ' collapsible' : ''}`}>
      {collapsible ? (
        <button
          type="button"
          className="customer-summary"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          <span className="customer-summary-text">
            <span className="customer-summary-label">Bill Style</span>
            <span className="customer-summary-name" style={{ fontFamily: activeFont.stack }}>
              {activeFont.label}
            </span>
          </span>
          <span className="customer-summary-date">Watermark {watermarkOpacity}%</span>
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
          <h2>Bill Style</h2>
        </div>
      )}

      {showControls && (
        <div className="bill-settings-body">
          <div className="settings-block">
            <div className="settings-block-head">
              <label htmlFor="s-watermark">Watermark</label>
              <span className="settings-value">{watermarkOpacity}%</span>
            </div>
            <div className="watermark-control">
              <span className="watermark-preview" aria-hidden="true">
                <img src={watermarkKairy} alt="" style={{ opacity: watermarkOpacity / 100 }} />
              </span>
              <input
                id="s-watermark"
                type="range"
                className="range-input"
                min="0"
                max="100"
                step="5"
                value={watermarkOpacity}
                style={{ '--fill': `${watermarkOpacity}%` }}
                onChange={(e) => onChange('watermarkOpacity', Number(e.target.value))}
              />
            </div>
            <div className="range-scale" aria-hidden="true">
              <span>Off</span>
              <span>Halka</span>
              <span>Gehra</span>
            </div>

            <SignatureToggle
              className="settings-signature"
              checked={showSignature}
              onChange={(value) => onChange('showSignature', value)}
            />
          </div>

          <div className="settings-block">
            <div className="settings-block-head">
              <span id="s-font-label">Font Style</span>
            </div>
            <div className="font-options" role="radiogroup" aria-labelledby="s-font-label">
              {BILL_FONTS.map((font) => (
                <button
                  key={font.id}
                  type="button"
                  role="radio"
                  aria-checked={font.id === activeFont.id}
                  className="font-option"
                  onClick={() => onChange('fontId', font.id)}
                >
                  <span className="font-option-sample" style={{ fontFamily: font.stack }}>
                    Aa ₹12
                  </span>
                  <span className="font-option-name">{font.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
