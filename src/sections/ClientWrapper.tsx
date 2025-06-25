'use client';
import React, { useState, useEffect } from 'react';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdjusted, setIsAdjusted] = useState(false);

  useEffect(() => {
    const scale = window.devicePixelRatio;

    if (scale !== 1) {
      console.log('scaling is not equal to 1');
      document.body.style.transform = `scale(${1 / scale})`;
      document.body.style.transformOrigin = 'top left';
      document.body.style.width = `${100 * scale}%`;
      document.body.style.height = `${100 * scale}%`;
    }

    setIsAdjusted(true);
  }, []);

  if (!isAdjusted) {
    return <div style={{ visibility: 'hidden' }}></div>; // Hide until adjusted
  }

  return <>{children}</>;
}
