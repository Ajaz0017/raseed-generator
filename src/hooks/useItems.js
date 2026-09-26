import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEY } from '../constants';
import { calcAmount } from '../utils/calcAmount';

// Items saved before the price → rate rename still carry `price`.
function migrateItem(it) {
  if (it.rate !== undefined) return it;
  const { price, ...rest } = it;
  const migrated = { ...rest, rate: price ?? '' };
  return { ...migrated, amount: calcAmount(migrated) };
}

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw).map(migrateItem) : [];
  } catch {
    return [];
  }
}

export function useItems() {
  const [items, setItems] = useState(loadItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item) => {
    setItems((prev) => [...prev, { ...item, id: crypto.randomUUID() }]);
  }, []);

  const updateItem = useCallback((id, updated) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...updated } : it)));
  }, []);

  const deleteItem = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  return { items, addItem, updateItem, deleteItem, clearAll };
}
