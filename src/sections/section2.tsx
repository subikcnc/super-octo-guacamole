'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useState } from 'react';

import ShaderCanvas from '@/components/shaderTest/canvas';

const Section2 = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: '#particles-canvas',
      pin: true,
      markers: true,
      start: 'top top',
      end: '+=200%', // Pin for 100vh
      pinSpacing: true,
      scrub: 2.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });
  }, []);
  return (
    <div id="particles-canvas" className="mt-[-70vh] h-screen w-full">
      <ShaderCanvas scrollProgress={scrollProgress} />
    </div>
  );
};

export default Section2;
