import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for tracking the hover state of an element.
 * Supports optional enter/leave delays to debounce rapid mouse movements.
 *
 * @param {Object} [options]
 * @param {number} [options.enterDelay=0] - ms to wait before marking as hovered
 * @param {number} [options.leaveDelay=0] - ms to wait before marking as not hovered
 * @returns {[React.MutableRefObject, boolean, Function]} [ref, isHovered, resetHover]
 */
export function useHover({ enterDelay = 0, leaveDelay = 0 } = {}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const enterTimer = useRef(null);
  const leaveTimer = useRef(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
      enterTimer.current = setTimeout(() => setIsHovered(true), enterDelay);
    };
    const handleMouseLeave = () => {
      if (enterTimer.current) clearTimeout(enterTimer.current);
      leaveTimer.current = setTimeout(() => setIsHovered(false), leaveDelay);
    };

    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      node.addEventListener('mouseleave', handleMouseLeave, { passive: true });

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
        if (enterTimer.current) clearTimeout(enterTimer.current);
        if (leaveTimer.current) clearTimeout(leaveTimer.current);
      };
    }
    return undefined;
  }, [enterDelay, leaveDelay]);

  const resetHover = useCallback(() => setIsHovered(false), []);

  return [ref, isHovered, resetHover];
}

/**
 * Custom hook for tracking whether an element has ever been hovered.
 * Useful for lazy-loading or reveal-on-interaction patterns.
 *
 * @returns {[Object, boolean]} [ref, hasBeenHovered]
 */
export function useHasBeenHovered() {
  const [hasBeenHovered, setHasBeenHovered] = useState(false);
  const [ref, isHovered] = useHover();

  useEffect(() => {
    if (isHovered) setHasBeenHovered(true);
  }, [isHovered]);

  return [ref, hasBeenHovered];
}
