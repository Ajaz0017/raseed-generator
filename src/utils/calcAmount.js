// Amount = [(Chaok * Rate) / 100] * Khewa
export function calcAmount({ chaok, rate, khewa }) {
  const c = parseFloat(chaok);
  const r = parseFloat(rate);
  const k = parseFloat(khewa);
  if ([c, r, k].some(Number.isNaN)) return '';
  return (Math.round(((c * r) / 100) * k * 100) / 100).toString();
}
