'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const pillarsSectionRef = useRef<HTMLDivElement>(null);
  const pillarsSectionTitleRef = useRef<HTMLHeadingElement>(null);

  const topValues = [38, 40, 45];
  useEffect(() => {
    const mainTrigger = ScrollTrigger.create({
      trigger: '#pillars-section',
      pin: true,
      start: 'top top',
      markers: true,
      end: 'bottom top',
      onEnter: () => {
        if (!pillarsSectionTitleRef.current) return;
        gsap.set(pillarsSectionTitleRef.current, { position: 'absolute' });
        gsap.to(pillarsSectionTitleRef.current, {
          left: 120,
          top: 164,
          width: 580,
          color: '#620002',
          duration: 0.5,
          ease: 'power2',
        });
        // gsap.to()
      },
      onLeave: () => mainTrigger.kill(),
    });

    if (!pillarsSectionRef.current) return;

    const innerSections = pillarsSectionRef.current.querySelectorAll(
      '.pillars-inner-section'
    );
    const images = pillarsSectionRef.current
      .querySelector('.pillars-animated-content')
      ?.querySelectorAll('img');

    const cards = pillarsSectionRef.current
      .querySelector('.pillars-animated-content')
      ?.querySelectorAll('.pillars-animated-card');

    if (!images || !cards) return;

    innerSections.forEach((section, index) => {
      const img = images[index];
      const card = cards[index];

      if (!img || !card) return;

      // Animate one image per section with scroll
      const imagesTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top center', // start when section comes to center
        end: 'bottom center', // end when section is about to leave
        scrub: 2.5,
        markers: false,
        toggleActions: 'play reverse play reverse',
        // onLeave: () => {
        //   imagesTrigger.kill();
        // },
      });

      const cardsTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top center', // start when section comes to center
        end: 'bottom center', // end when section is about to leave
        scrub: 2.5,
        markers: false,
        // toggleActions: 'play none none none',
        toggleActions: 'play reverse play reverse',
        // onLeave: () => {
        //   cardsTrigger.kill();
        // },
      });

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
          scrollTrigger: imagesTrigger,
        }
      );

      gsap.fromTo(
        card,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          scrollTrigger: cardsTrigger,
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
        <h2
          ref={pillarsSectionTitleRef}
          id="pillars-section-title"
          className="h2_regular_56 text-neutral-900"
        >
          By building the foundation of
          <br /> Research, Education, and Industry.
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
        <div
          className="pillars-animated-card absolute max-w-[500px] rounded-[40px] bg-white p-5"
          style={{ right: '120px', top: '15%', opacity: '0' }}
        >
          <h3 className="text-primary-700 h3_bold_36 mb-4">Research</h3>
          <p className="text-neutral-700">
            We pursue AI research to expand the horizons of human knowledge. Our
            work addresses urgent challenges spanning diverse sectors with bold
            ideas, rigorous methods, and a deep commitment to turn insights into
            impact.
          </p>
        </div>
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
        <div
          className="pillars-animated-card absolute max-w-[500px] rounded-[40px] bg-white p-5"
          style={{ left: '120px', top: '70%', opacity: '0' }}
        >
          <h3 className="text-primary-700 h3_bold_36 mb-4">Education</h3>
          <p className="text-neutral-700">
            We unite curious minds to co-create globally competitive startups
            and deep tech spin-offs, giving ideas a path to grow into
            practically relevant, purpose-driven products.
          </p>
        </div>
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
        <div
          className="pillars-animated-card absolute max-w-[500px] rounded-[40px] bg-white p-5"
          style={{ right: '120px', top: '70%', opacity: '0' }}
        >
          <h3 className="text-primary-700 h3_bold_36 mb-4">Industry</h3>
          <p className="text-neutral-700">
            Through practical learning programs, we disseminate our knowledge to
            build the capabilities across individuals, organizations, and
            institutions, so they can innovate with AI.
          </p>
        </div>
      </div>

      <div
        className="pillars-inner-section h-[300px] w-full flex-1"
        data-step="1"
      >
        &nbsp;
      </div>
      <div
        className="pillars-inner-section h-[300px] flex-1"
        data-step="2"
      ></div>
      <div
        className="pillars-inner-section h-[300px] flex-1"
        data-step="3"
      ></div>
    </div>
  );
};

export default Section3;
