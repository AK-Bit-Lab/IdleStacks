import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Hook to manage a "copied to clipboard" state, optimized to prevent premature resets on spam clicks.
 * @param {number} duration - Time in ms before the copied state resets.
 * @returns {[boolean, (text: string) => boolean]}
 */
export function useCopied(duration = 2000) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef(null);

  const copy = useCallback(
    (text) => {
      if (!navigator?.clipboard) {
        console.warn('Clipboard not supported');
        return false;
      }

      navigator.clipboard
        .writeText(text)
        .then(() => {
          setIsCopied(true);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setIsCopied(false);
          }, duration);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });

      return true;
    },
    [duration]
  );

  return [isCopied, copy];
}
