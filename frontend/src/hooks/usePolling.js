import { useEffect, useRef } from 'react';

export function usePolling(callback, interval = 10000) {
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
      tick();
      const id = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval]);
}
