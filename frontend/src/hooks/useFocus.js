import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for tracking the focus state of an element.
 *
 * @param {Object} [options]
 * @param {boolean} [options.autoFocus=false] - Focus the element when it mounts
 * @returns {[React.MutableRefObject, boolean, Function, Function]} [ref, isFocused, blur, focus]
 */
export function useFocus({ autoFocus = false } = {}) {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const node = ref.current;
    if (node) {
      node.addEventListener('focus', handleFocus, { capture: true });
      node.addEventListener('blur', handleBlur, { capture: true });

      return () => {
        node.removeEventListener('focus', handleFocus, { capture: true });
        node.removeEventListener('blur', handleBlur, { capture: true });
      };
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  const blur = useCallback(() => ref.current?.blur(), []);
  const focus = useCallback((options) => ref.current?.focus(options), []);
  return [ref, isFocused, blur, focus];
}
