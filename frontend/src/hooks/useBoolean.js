import { useState, useCallback } from 'react';

/**
 * Custom hook to manage a boolean state safely and efficiently.
 *
 * @param {boolean} [initialValue=false] - The initial boolean value.
 * @returns {{
 *   value: boolean,
 *   setValue: import('react').Dispatch<import('react').SetStateAction<boolean>>,
 *   setTrue: () => void,
 *   setFalse: () => void,
 *   toggle: () => void
 * }} An object containing the boolean value and functions to update it.
 */
export function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return { value, setValue, setTrue, setFalse, toggle };
}
