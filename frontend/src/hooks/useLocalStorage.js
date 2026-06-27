import { useState, useCallback } from 'react';

/**
 * Custom hook for persisting state in localStorage.
 * Supports functional updates, removal, and reset to initial value.
 *
 * @template T
 * @param {string} key - The localStorage key
 * @param {T} initialValue - The default value used when the key is absent
 * @returns {[T, Function, Function, Function]} [value, setValue, removeItem, reset]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('[useLocalStorage] read error:', error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn('[useLocalStorage] write error:', error);
      }
    },
    [key, storedValue]
  );

  const removeItem = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn('[useLocalStorage] remove error:', error);
    }
  }, [key, initialValue]);

  const reset = useCallback(() => setValue(initialValue), [setValue, initialValue]);

  return [storedValue, setValue, removeItem, reset];
}
