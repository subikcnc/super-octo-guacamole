'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  useEffect(() => {
    ScrollTrigger.create({
      trigger: '#pillars-section',
      pin: true,
      start: 'top top',
      end: 'bottom top',
      onEnter: () => console.log('Entered animation section'),
      onLeave: () => console.log('Left animation section'),
    });
    // const durationInPixels = 500;
    // const tl = gsap.timeline();
    // tl.to('.content h1', { y: -100, opacity: 0, duration: 1 });
    // tl.to('.content p', { x: -200, opacity: 1, duration: 3 });
    // ScrollTrigger.create({
    //   trigger: '#pillars-section',
    //   start: 'top top',
    //   end: `+=${tl.duration() * durationInPixels}`,
    //   pin: true,
    //   scrub: true,
    //   markers: true,
    //   animation: tl,
    // });
  });
  return (
    <div
      id="pillars-section"
      className="relative flex h-[100vh] w-full flex-col bg-transparent"
    >
      <div className="mb-6 flex w-full justify-center">
        <h2 className="h2_regular_56 text-neutral-900">
          That Connects Research,
          <br /> Education, and Industry.
        </h2>
      </div>
      <div className="pillars-animated-content absolute top-0 left-0 flex h-full w-full items-center justify-center">
        <Image
          src="/images/pillars/pillar-1.png"
          width={362}
          height={199}
          alt="animated block"
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <Image
          src="/images/pillars/pillar-2.png"
          width={222}
          height={258}
          alt="animated block"
          className="absolute"
          style={{ top: '40%', left: '35%' }}
        />
        <Image
          src="/images/pillars/pillar-3.png"
          width={317}
          height={208}
          alt="animated block"
          className="absolute"
          style={{ top: '46%', left: '51%', transform: 'translateX(-50%)' }}
        />
      </div>
      <div className="inner-marker flex-1 bg-neutral-300" data-step="1"></div>
      <div className="inner-marker flex-1 bg-neutral-500" data-step="2"></div>
      <div className="inner-marker flex-1 bg-neutral-700" data-step="3"></div>
    </div>
  );
};

export default Section3;
