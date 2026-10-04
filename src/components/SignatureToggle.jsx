export default function SignatureToggle({ checked, onChange, className = '' }) {
  return (
    <label className={`signature-toggle ${className}`.trim()}>
      <span className="signature-toggle-label">Signature</span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="switch-track" aria-hidden="true">
        <span className="switch-thumb" />
      </span>
    </label>
  );
}
