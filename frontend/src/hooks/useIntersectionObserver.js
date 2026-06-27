import { useState, useEffect, useRef } from 'react';

/**
 * Default internal threshold for the IntersectionObserver
 * @type {number}
 */
const DEFAULT_THRESHOLD = 0.1;

/**
 * Custom hook for using the Intersection Observer API.
 * Useful for scroll-triggered animations, lazy loading, or infinite scroll.
 *
 * @param {Object} options - IntersectionObserver configuration
 * @param {string} [options.rootMargin='0px'] - Margin around the root
 * @param {number} [options.threshold=DEFAULT_THRESHOLD] - Percentage of visibility to trigger the callback
 * @param {boolean} [options.triggerOnce=true] - If true, the observer will disconnect after the first intersection
 * @returns {[React.MutableRefObject, boolean, number]} A ref to attach to the element, a boolean indicating visibility, and intersection ratio
 */
export function useIntersectionObserver({
  root = null,
  rootMargin = '0px',
  threshold = DEFAULT_THRESHOLD,
  triggerOnce = true,
} = {}) {
  const safeThreshold = Number.isFinite(threshold) ? Math.min(1, Math.max(0, threshold)) : DEFAULT_THRESHOLD;
  const [isIntersecting, setIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
        setIntersectionRatio(entry.intersectionRatio);
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      { root, rootMargin, threshold: safeThreshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [root, rootMargin, safeThreshold, triggerOnce]);

  return [elementRef, isIntersecting, intersectionRatio];
}
