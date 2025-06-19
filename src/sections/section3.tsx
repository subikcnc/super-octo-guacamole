'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const pillarsSectionRef = useRef<HTMLDivElement>(null);
  const topValues = [38, 40, 45];
  useEffect(() => {
    ScrollTrigger.create({
      trigger: '#pillars-section',
      pin: true,
      start: 'top top',
      end: 'bottom top',
      onEnter: () => console.log('Entered animation section'),
      onLeave: () => console.log('Left animation section'),
    });

    if (!pillarsSectionRef.current) return;

    const innerSections = pillarsSectionRef.current.querySelectorAll(
      '.pillars-inner-section'
    );
    const images = pillarsSectionRef.current
      .querySelector('.pillars-animated-content')
      ?.querySelectorAll('img');
    console.log('all images', images);

    if (!images) return;

    innerSections.forEach((section, index) => {
      const img = images[index];
      if (!img) return;

      // Animate one image per section with scroll
      gsap.fromTo(
        img,
        {
          top: '30%', // start lower (or use any default)
          autoAlpha: 0, // fully hidden initially
        },
        {
          top: `${topValues[index]}%`, // target top
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top center', // start when section comes to center
            end: 'bottom center', // end when section is about to leave
            scrub: 1.5,
            markers: true,
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
  });
  return (
    <div
      id="pillars-section"
      className="relative w-full bg-transparent"
      ref={pillarsSectionRef}
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
            top: '0',
            left: '40%',
            opacity: '0',
            visibility: 'hidden',
          }}
          // Target top: 38%
        />
        <Image
          src="/images/pillars/pillar-2.png"
          width={222}
          height={258}
          alt="animated block"
          className="absolute"
          style={{
            top: '0',
            left: '35%',
            opacity: '0',
            visibility: 'hidden',
          }}
          // Target top: 40%;
        />
        <Image
          src="/images/pillars/pillar-3.png"
          width={317}
          height={208}
          alt="animated block"
          className="absolute"
          style={{
            top: '0',
            left: '42%',
            opacity: '0',
            visibility: 'hidden',
          }}
          // Target top: 46%;
        />
      </div>
      <div
        className="pillars-inner-section h-[300px] w-full flex-1 bg-neutral-300"
        data-step="1"
      >
        &nbsp;
      </div>
      <div
        className="pillars-inner-section h-[300px] flex-1 bg-neutral-500"
        data-step="2"
      ></div>
      <div
        className="pillars-inner-section h-[300px] flex-1 bg-neutral-700"
        data-step="3"
      ></div>
    </div>
  );
};

export default Section3;
