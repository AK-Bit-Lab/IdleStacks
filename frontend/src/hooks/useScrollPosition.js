import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for tracking the window scroll position.
 * Uses a passive listener and requestAnimationFrame throttling for performance.
 *
 * @returns {{ x: number, y: number }} Current horizontal and vertical scroll offsets
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    x: typeof window !== 'undefined' ? window.scrollX : 0,
    y: typeof window !== 'undefined' ? window.scrollY : 0,
  });
  const rafId = useRef(null);

  const handleScroll = useCallback(() => {
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      setScrollPosition({ x: window.scrollX, y: window.scrollY });
      rafId.current = null;
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  return scrollPosition;
}

/**
 * Custom hook that returns true when the page is scrolled to the top.
 *
 * @returns {boolean} True if scrollY is 0
 */
export function useIsAtTop() {
  const { y } = useScrollPosition();
  return y === 0;
}

/**
 * Custom hook that returns true when the page is scrolled near the bottom.
 *
 * @param {number} [threshold=50] - Pixels from bottom to consider "at bottom"
 * @returns {boolean}
 */
export function useIsAtBottom(threshold = 50) {
  const { y } = useScrollPosition();
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  const distanceFromBottom = document.documentElement.scrollHeight - window.innerHeight - y;
  return distanceFromBottom <= threshold;
}

/**
 * Custom hook that returns the scroll direction ('up', 'down', or null on init).
 *
 * @returns {'up' | 'down' | null}
 */
export function useScrollDirection() {
  const { y } = useScrollPosition();
  const [direction, setDirection] = useState(null);
  const prevY = useRef(y);

  useEffect(() => {
    if (y > prevY.current) setDirection('down');
    else if (y < prevY.current) setDirection('up');
    prevY.current = y;
  }, [y]);

  return direction;
}
