import { useCallback, useMemo } from 'react';
import { useClicker } from './useClicker';
import { useTipJar } from './useTipJar';
import { useQuickPoll } from './useQuickPoll';

/**
 * Standard duration for haptic feedback pulse on mobile devices
 * @type {number}
 */
const HAPTIC_PULSE_MS = 40;

/**
 * Collector hook that unifies all smart contract interaction hooks into a single interface.
 * Centralizes the onTxSubmit logic and provides a stable, memoized API for the main application grid.
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onTxSubmit - Shared callback for all transaction broadcasts
 * @returns {Object} { clicker, tipjar, quickpoll, pingAll }
 * @property {Object} clicker - API for the Clicker contract
 * @property {Object} tipjar - API for the TipJar contract
 * @property {Object} quickpoll - API for the QuickPoll contract
 * @property {Function} pingAll - Unified function to trigger heartbeat pings across all contracts
 * @example
 * const { clicker, pingAll } = useInteractions({ onTxSubmit: handleTx });
 * // clicker.click() sends a single click transaction
 * // pingAll() pings all three contracts simultaneously
 */
export function useInteractions({ onTxSubmit }) {
  /**
   * Enhanced callback that adds tactile haptic feedback (Vibration API)
   * to transaction submissions to improve mobile game feel.
   */
  const handleTxSubmit = useCallback(
    (action, txId) => {
      // Trigger short haptic pulse if supported
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(HAPTIC_PULSE_MS);
      }

      // Continue with original submission callback
      onTxSubmit?.(action, txId);
    },
    [onTxSubmit]
  );

  const clicker = useClicker({ onTxSubmit: handleTxSubmit });
  const tipjar = useTipJar({ onTxSubmit: handleTxSubmit });
  const quickpoll = useQuickPoll({ onTxSubmit: handleTxSubmit });

  /**
   * Triggers heartbeat/ping transactions for all active smart contracts simultaneously.
   * Each contract hook handles its own loading state and error handling independently.
   */
  const pingAll = useCallback(() => {
    // Fire-and-forget keeps each domain hook responsible for its own loading and error handling.
    clicker?.ping?.();
    tipjar?.handleSelfPing?.();
    quickpoll?.handlePollPing?.();
  }, [clicker, tipjar, quickpoll]);

  return useMemo(
    () => ({
      clicker,
      tipjar,
      quickpoll,
      pingAll,
    }),
    [clicker, tipjar, quickpoll, pingAll]
  );
}
