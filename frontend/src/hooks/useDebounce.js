import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to debounce a rapidly changing value.
 *
 * @template T
 * @param {T} value - The input value to debounce.
 * @param {number} [delay=500] - The delay in milliseconds.
 * @param {Object} [options]
 * @param {boolean} [options.leading=false] - Fire immediately on the first change, then debounce.
 * @returns {T} The debounced value.
 */
export function useDebounce(value, delay = 500, { leading = false } = {}) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const isFirstCall = useRef(true);

  useEffect(() => {
    if (leading && isFirstCall.current) {
      isFirstCall.current = false;
      setDebouncedValue(value);
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, leading]);

  return debouncedValue;
}
