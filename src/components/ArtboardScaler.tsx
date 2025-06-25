// hooks/useArtboardScaler.js
import { useEffect } from 'react';

const DESIGN_WIDTH = 1440; // The fixed width of your #artboard

export const useArtboardScaler = () => {
  useEffect(() => {
    const scaleArtboard = () => {
      const artboard = document.getElementById('artboard');
      const container = document.getElementById('artboard-container');

      if (!artboard || !container) return;

      const viewportWidth = window.innerWidth;
      const scale = viewportWidth / DESIGN_WIDTH;

      // Apply the scale transform to the artboard
      // We use Math.min to prevent upscaling on screens larger than 1440px
      // Remove Math.min if you want it to scale up as well.
      artboard.style.transform = `scale(${Math.min(scale, 1)})`;

      // Adjust the height of the container to match the scaled height of the artboard
      // This ensures scrollbars work correctly.
      const artboardHeight = artboard.getBoundingClientRect().height;
      container.style.height = `${artboardHeight}px`;
    };

    // Run on initial load
    scaleArtboard();

    // Run on window resize
    window.addEventListener('resize', scaleArtboard);

    // Also run on orientation change for mobile
    window.addEventListener('orientationchange', scaleArtboard);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('resize', scaleArtboard);
      window.removeEventListener('orientationchange', scaleArtboard);
    };
  }, []);
};
