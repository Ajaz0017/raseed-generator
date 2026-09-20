import { useCallback, useEffect, useState } from 'react';
import { CUSTOMER_STORAGE_KEY, EMPTY_CUSTOMER } from '../constants';

function loadCustomer() {
  try {
    const raw = localStorage.getItem(CUSTOMER_STORAGE_KEY);
    return raw ? { ...EMPTY_CUSTOMER, ...JSON.parse(raw) } : EMPTY_CUSTOMER;
  } catch {
    return EMPTY_CUSTOMER;
  }
}

export function useCustomer() {
  const [customer, setCustomer] = useState(loadCustomer);

  useEffect(() => {
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
  }, [customer]);

  const updateCustomer = useCallback((field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  }, []);

  const clearCustomer = useCallback(() => {
    setCustomer(EMPTY_CUSTOMER);
  }, []);

  return { customer, updateCustomer, clearCustomer };
}
