'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect } from 'react';

import ShaderCanvas from '@/components/shaderTest/canvas';

const Section2 = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: '#particles-canvas',
      pin: true,
      markers: true,
      start: 'top top',
      end: '+=100%', // Pin for 100vh
      pinSpacing: true,
    });
  }, []);
  return (
    <div id="particles-canvas" className="h-screen w-full">
      <ShaderCanvas />
    </div>
  );
};

export default Section2;
