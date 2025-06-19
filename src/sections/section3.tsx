'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const pillarsSectionRef = useRef<HTMLDivElement>(null);
  const topValues = [38, 40, 46];
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
          top: '20%', // start lower (or use any default)
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
            scrub: true,
            markers: true,
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });

    // innerSections.forEach((section, index) => {
    //   ScrollTrigger.create({
    //     trigger: section,
    //     start: 'top top',
    //     end: 'bottom bottom',
    //     scrub: true,
    //     markers: true,
    //     pinSpacing: true,
    //     onEnter: () => {
    //       gsap.to(images[index], {
    //         top: `${topValues[index]}%`,
    //         autoAlpha: 1,
    //         duration: 1,
    //         ease: 'elastic.inOut',
    //       });
    //     },
    //     onUpdate: (self) => {
    //       console.log(`Progress for index ${index}`, self.progress);
    //     },
    //   });
    // });
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
        className="pillars-inner-section flex-1 bg-neutral-300"
        data-step="1"
      ></div>
      <div
        className="pillars-inner-section flex-1 bg-neutral-500"
        data-step="2"
      ></div>
      <div
        className="pillars-inner-section flex-1 bg-neutral-700"
        data-step="3"
      ></div>
    </div>
  );
};

export default Section3;
