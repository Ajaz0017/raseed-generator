import { useCallback, useEffect, useState } from 'react';
import { BILL_SETTINGS_KEY, DEFAULT_BILL_SETTINGS, SIGNATURE_KEY } from '../constants';

function loadSettings() {
  try {
    const raw = localStorage.getItem(BILL_SETTINGS_KEY);
    if (raw) return { ...DEFAULT_BILL_SETTINGS, ...JSON.parse(raw) };
    // Carry over the signature switch saved before settings were grouped.
    const legacySignature = localStorage.getItem(SIGNATURE_KEY);
    return {
      ...DEFAULT_BILL_SETTINGS,
      showSignature: legacySignature === null ? true : legacySignature !== 'false',
    };
  } catch {
    return DEFAULT_BILL_SETTINGS;
  }
}

export function useBillSettings() {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    localStorage.setItem(BILL_SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = useCallback((field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }, []);

  return { settings, updateSetting };
}
