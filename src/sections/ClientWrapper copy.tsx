'use client';
import React, { useState, useEffect } from 'react';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isAdjusted, setIsAdjusted] = useState(false);
  const scaleRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scale = window.devicePixelRatio;

    if (scale !== 1 && scaleRef.current) {
      scaleRef.current.style.transform = `scale(${1 / scale})`;
      scaleRef.current.style.transformOrigin = 'top left';
      scaleRef.current.style.width = `${100 * scale}%`;
      scaleRef.current.style.height = `${100 * scale}%`;
    }

    setIsAdjusted(true);
  }, []);

  if (!isAdjusted) {
    return <div style={{ visibility: 'hidden' }}></div>;
  }

  return (
    <div
      id="client_wrapper"
      ref={scaleRef}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </div>
  );
}
