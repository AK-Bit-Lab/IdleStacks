import { useState, useEffect, useRef } from 'react';

/**
 * Constant safely detecting the browser environment to prevent SSR errors
 * @type {boolean}
 */
const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';

/**
 * Custom hook for tracking the visibility of the current document (tab active/hidden).
 * Useful for pausing/resuming expensive operations like polling or animations.
 *
 * @returns {{ isVisible: boolean, hiddenCount: number }} Visibility state and number of times hidden
 */
export function useDocumentVisibility() {
  const [isVisible, setIsVisible] = useState(
    IS_BROWSER ? document.visibilityState === 'visible' : true
  );
  const [hiddenCount, setHiddenCount] = useState(0);
  const prevVisible = useRef(isVisible);

  useEffect(() => {
    if (!IS_BROWSER) return;

    const handleVisibilityChange = () => {
      const visible = document.visibilityState === 'visible';
      if (!visible && prevVisible.current) {
        setHiddenCount((c) => c + 1);
      }
      prevVisible.current = visible;
      setIsVisible(visible);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    return () => {
      if (IS_BROWSER) {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }, []);

  return { isVisible, hiddenCount };
}
