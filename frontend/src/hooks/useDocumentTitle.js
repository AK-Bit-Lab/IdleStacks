import { useEffect, useRef, useCallback } from 'react';

/**
 * Constant safely detecting the browser environment to prevent SSR errors
 * @type {boolean}
 */
const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';

/**
 * Custom hook for dynamically updating the document title.
 * Useful for providing reactive feedback (e.g., interaction counts) in the browser tab.
 *
 * @param {Object} options - Hook options
 * @param {string} options.title - Base title for the document
 * @param {number} [options.count=0] - Numerical value to display in parentheses before the title
 * @param {boolean} [options.restoreOnUnmount=true] - Whether to restore the previous title on unmount
 * @param {string} [options.suffix] - Optional suffix appended with a separator
 * @returns {{ resetTitle: Function }} Object with a `resetTitle` function to manually restore the previous title
 */
export function useDocumentTitle({ title, count = 0, restoreOnUnmount = true, suffix }) {
  const previousTitle = useRef(IS_BROWSER ? document.title : '');

  useEffect(() => {
    if (!IS_BROWSER) return;
    if (!title || typeof title !== 'string') return;
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const safeCount = Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
    const fullTitle = suffix ? `${trimmedTitle} • ${suffix}` : trimmedTitle;
    document.title = safeCount > 0 ? `(${safeCount}) ${fullTitle}` : fullTitle;
    return () => {
      if (restoreOnUnmount) {
        document.title = previousTitle.current;
      }
    };
  }, [title, count, restoreOnUnmount, suffix]);

  const resetTitle = useCallback(() => {
    if (IS_BROWSER) {
      document.title = previousTitle.current;
    }
  }, []);

  return { resetTitle };
}
