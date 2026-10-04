import { useEffect, useState } from 'react';
import { SIGNATURE_KEY } from '../constants';

function loadSignature() {
  try {
    return localStorage.getItem(SIGNATURE_KEY) !== 'false';
  } catch {
    return true;
  }
}

export function useSignature() {
  const [showSignature, setShowSignature] = useState(loadSignature);

  useEffect(() => {
    localStorage.setItem(SIGNATURE_KEY, String(showSignature));
  }, [showSignature]);

  return { showSignature, setShowSignature };
}
