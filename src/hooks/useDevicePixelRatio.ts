// hooks/useDevicePixelRatio.js

import { useState, useEffect } from 'react';

/**
 * A custom React hook that returns the current device pixel ratio (DPR)
 * and updates it whenever the browser is resized or the display scaling changes.
 *
 * @returns {number} The current device pixel ratio.
 */
export function useDevicePixelRatio(): number {
  // A helper function to get the DPR, handling server-side rendering
  const getDpr = () =>
    typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  // Initialize state with the current DPR
  const [dpr, setDpr] = useState(getDpr());

  useEffect(() => {
    // This handler will be called on resize events
    const handleResize = () => {
      setDpr(getDpr());
    };

    // The 'resize' event covers both window resizing and OS display scale changes
    window.addEventListener('resize', handleResize);

    // This is the cleanup function that React will run when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount and cleanup on unmount

  return dpr;
}
