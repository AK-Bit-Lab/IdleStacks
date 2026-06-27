import { useState, useEffect } from 'react';

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
};

/**
 * Custom hook for tracking the browser window dimensions.
 * Returns width, height, and convenience boolean flags for common breakpoints.
 *
 * @returns {{ width: number|undefined, height: number|undefined, isMobile: boolean, isTablet: boolean, isDesktop: boolean }}
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : undefined,
    height: typeof window !== 'undefined' ? window.innerHeight : undefined,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width } = windowSize;
  const isMobile = width !== undefined && width < BREAKPOINTS.mobile;
  const isTablet = width !== undefined && width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet;
  const isDesktop = width !== undefined && width >= BREAKPOINTS.tablet;

  return { ...windowSize, isMobile, isTablet, isDesktop };
}
