import { useEffect, useRef } from 'react';

/**
 * Custom hook that triggers a callback when a click happens outside the referenced element.
 * Optimized to prevent unnecessary re-attachments of event listeners on re-renders.
 *
 * @param {Function} handler - The callback function to execute on outside click.
 * @returns {import('react').RefObject<HTMLElement>} Ref to attach to the target DOM element.
 */
export function useClickOutside(handler) {
  const ref = useRef(null);
  const handlerRef = useRef(handler);

  // Update handler ref on every render without triggering useEffects below
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handlerRef.current?.(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return ref;
}
