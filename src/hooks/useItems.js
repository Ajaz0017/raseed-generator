import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEY } from '../constants';

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
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
