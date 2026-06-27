import { useEffect, useRef } from 'react';

/**
 * Declarative polling hook.
 *
 * @param {Function} callback - Function to invoke on each poll
 * @param {number|null} [interval=10000] - Polling interval in ms, or null to pause
 * @param {Object} [options]
 * @param {boolean} [options.immediate=true] - Run callback immediately before the first interval tick
 */
export function usePolling(callback, interval = 10000, { immediate = true } = {}) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (interval !== null) {
      if (immediate) tick();
      const id = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval, immediate]);
}
