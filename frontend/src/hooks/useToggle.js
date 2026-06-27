import { useState, useCallback } from 'react';

/**
 * Small boolean toggle hook with explicit setters and reset support.
 *
 * @param {boolean} [initialState=false]
 * @returns {[boolean, Function, Function, Function]} [state, toggle, setState, reset]
 */
export function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState((state) => !state), []);
  const reset = useCallback(() => setState(initialState), [initialState]);

  return [state, toggle, setState, reset];
}
