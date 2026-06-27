import { useState, useEffect } from 'react';

/**
 * Reads the current effective connection type from the Network Information API.
 * Falls back to null when the API is not supported.
 *
 * @returns {string|null}
 */
function getConnectionType() {
  const conn = navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection;
  return conn?.effectiveType ?? null;
}

/**
 * Custom hook for monitoring online/offline status and connection quality.
 *
 * @returns {{ isOnline: boolean, connectionType: string|null }}
 */
export function useNetwork() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [connectionType, setConnectionType] = useState(
    typeof navigator !== 'undefined' ? getConnectionType() : null
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleConnectionChange = () => setConnectionType(getConnectionType());

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const conn = navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection;
    conn?.addEventListener('change', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      conn?.removeEventListener('change', handleConnectionChange);
    };
  }, []);

  return { isOnline, connectionType };
}
