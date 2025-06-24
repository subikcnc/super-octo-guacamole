'use client';
import React, { useEffect, useRef } from 'react';

const SectionCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    canvasRef.current.width = canvasRef.current.clientWidth;
    canvasRef.current.height = canvasRef.current.clientHeight;

    ctx?.beginPath();
    ctx?.moveTo(10, 10);
    ctx?.lineTo(20, 20);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx?.stroke();
  }, []);
  return (
    <div className="h-screen w-full border border-amber-200">
      <canvas ref={canvasRef} className="h-full w-full"></canvas>
    </div>
  );
};

export default SectionCanvas;
