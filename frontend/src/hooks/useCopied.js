import { useState, useCallback } from 'react';

export function useCopied(duration = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback((text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }
    
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, duration);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
    
    return true;
  }, [duration]);

  return [isCopied, copy];
}
