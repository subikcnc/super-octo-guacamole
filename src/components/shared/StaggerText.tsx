'use client';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

const StaggerText = ({
  text,
  otherClasses,
  scrollProgress,
}: {
  text: string;
  otherClasses?: string;
  scrollProgress?: number;
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false); // Track animation state

  useEffect(() => {
    console.log('This is the scroll progress now', scrollProgress);
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');
    if (scrollProgress && scrollProgress >= 0.7 && !hasAnimatedRef.current) {
      gsap.to(chars, {
        opacity: 1,
        stagger: 0.05,
        ease: 'power2.out',
        duration: 0.3,
      });
      hasAnimatedRef.current = true;
    } else if (
      scrollProgress &&
      scrollProgress < 0.7 &&
      hasAnimatedRef.current
    ) {
      gsap.to(chars, {
        opacity: 0,
        y: 10,
        stagger: 0.03,
        ease: 'power2.in',
        duration: 0.3,
      });
      hasAnimatedRef.current = false;
    }
  }, [scrollProgress]);

  return (
    <div
      ref={textRef}
      className={cn(otherClasses, 'hello')}
      style={{
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-55%)',
      }}
    >
      {text.split('').map((char, i) => (
        <span key={i} className="char inline-block" style={{ opacity: '0' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default StaggerText;
