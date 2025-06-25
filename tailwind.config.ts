// src/tailwind.config.ts

import type { Config } from 'tailwindcss';

export default {
  /**
   * This is the most important part. Tailwind needs to know where
   * to look for your class names to generate the necessary CSS.
   */
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Add any other directories that contain Tailwind classes
  ],

  theme: {
    screens: {
      dpi125: { raw: '(min-resolution: 120dpi)' },
      dpi150: { raw: '(min-resolution: 144dpi)' },
    },
  },

  // The 'theme' and 'plugins' keys are optional.
  // If you have no custom theme values or plugins, you can omit them.
} satisfies Config;
