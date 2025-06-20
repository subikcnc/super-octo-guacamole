'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useState } from 'react';

import ShaderCanvas from '@/components/shaderTest/canvas';
import StaggerText from '@/components/shared/StaggerText';

const Section2 = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: '#particles-canvas',
      pin: true,
      markers: false,
      start: 'top top+=50',
      end: '+=200%', // Pin for 100vh
      pinSpacing: true,
      scrub: 1.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });
  }, []);
  return (
    <div id="particles-canvas" className="relative mt-[-70vh] h-screen w-full">
      {/* Text Animation using GSAP */}
      <StaggerText
        text="Building an ecosystem of research and innovation in the Global South"
        otherClasses="h3_medium_64 inline-block w-[920px] overflow-hidden text-center text-primary-900 absolute z-1"
        scrollProgress={scrollProgress}
        animationThreshold={0.5}
      />

      <ShaderCanvas scrollProgress={scrollProgress} particlesCount={200} />
    </div>
  );
};

export default Section2;
