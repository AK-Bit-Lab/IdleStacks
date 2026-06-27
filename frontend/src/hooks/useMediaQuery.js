import { useState, useEffect } from 'react';

/**
 * Custom hook for evaluating a CSS media query.
 * SSR-safe: initialises with false on the server and syncs on the client.
 *
 * @param {string} query - A valid CSS media query string, e.g. "(max-width: 768px)"
 * @returns {boolean} Whether the query currently matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
