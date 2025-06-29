'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const StaggerText = ({
  text,
  otherClasses,
}: {
  text: string;
  otherClasses?: string;
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: 'bottom top', // or adjust as needed
        end: '+=1500',
        scrub: 1.5,
        markers: false,
      },
    });

    tl.to(chars, {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      ease: 'none', // no easing for scrub
      duration: 0.5,
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={textRef}
      className={cn(otherClasses)}
      style={{
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-55%)',
      }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ opacity: 0, transform: 'translateY(10px)' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default StaggerText;
