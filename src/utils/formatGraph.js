// "20 x 20" — empty when either side is missing.
export function formatGraph({ graphX, graphY }) {
  return graphX && graphY ? `${graphX} x ${graphY}` : '';
}
