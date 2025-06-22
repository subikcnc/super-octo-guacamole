'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

import PillarsCard from '@/components/shared/PillarsCard';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const pillarsSectionRef = useRef<HTMLDivElement>(null);
  const pillarsSectionTitleRef = useRef<HTMLHeadingElement>(null);

  const topValues = [38, 40, 45];
  const hoverTopValues = [34, 36, 41];

  const pillarImageInitialSrc = [
    '/images/pillars/pillar-1.png',
    '/images/pillars/pillar-2.png',
    '/images/pillars/pillar-3.png',
  ];

  const pillarImageHoveredSrc = [
    '/images/pillars/pillar-inactive-1.png',
    '/images/pillars/pillar-inactive-2.png',
    '/images/pillars/pillar-inactive-3.png',
  ];

  useEffect(() => {
    const mainTrigger = ScrollTrigger.create({
      trigger: '#pillars-section',
      pin: true,
      start: 'top top',
      markers: false,
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
      ?.querySelectorAll('.pillars-block-image');

    console.log('These are the image', images);

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
        start: 'bottom center', // start when section comes to center
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
        start: 'bottom center', // start when section comes to center
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

  const handleCardMouseOver = (index: number) => {
    if (!pillarsSectionRef.current) return;

    const images = pillarsSectionRef.current.querySelectorAll(
      '.pillars-block-image'
    );
    gsap.to(images[index], { top: `${hoverTopValues[index]}%` });
    images.forEach((img, i) => {
      if (i !== index) {
        console.log('img src to set', `${pillarImageHoveredSrc[i]}`);
        img.setAttribute('src', `${pillarImageHoveredSrc[i]}`);
      }
    });
  };

  const handleCardMouseOut = (index: number) => {
    if (!pillarsSectionRef.current) return;

    const images = pillarsSectionRef.current.querySelectorAll(
      '.pillars-block-image'
    );
    gsap.to(images[index], { top: `${topValues[index]}%` });

    images.forEach((img, i) => {
      img.setAttribute('src', `${pillarImageInitialSrc[i]}`);
    });
  };
  return (
    <div
      id="pillars-section"
      className="relative w-full bg-transparent"
      ref={pillarsSectionRef}
    >
      {/* SVG for clipping path */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="dynamic-shape" clipPathUnits="objectBoundingBox">
            <path d="M1 0 H0 V0.8198 C0 0.9193, 0.0133 1, 0.0298 1 H0.774 C0.7853 1, 0.7957 0.9614, 0.8007 0.8998 L0.8522 0.2797 C0.8572 0.2187, 0.8676 0.179, 0.8789 0.179 H0.9701 C0.9866 0.179, 1 0.0995, 1 0 Z" />
          </clipPath>
        </defs>
      </svg>
      {/* SVG for clipping path */}
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
        <img
          src="/images/pillars/pillar-1.png"
          // width={362}
          // height={199}
          alt="animated block"
          className="pillars-block-image absolute"
          style={{
            top: '0',
            left: '40%',
            opacity: '0',
            visibility: 'hidden',
          }}
          // Target top: 38%
        />
        {/* Pillar Card Research */}
        <PillarsCard
          title="Research"
          right="120px"
          top="15%"
          handleCardMouseOver={() => handleCardMouseOver(0)}
          handleCardMouseOut={() => handleCardMouseOut(0)}
        >
          We pursue AI research to expand the horizons of human knowledge. Our
          work addresses urgent challenges spanning diverse sectors with bold
          ideas, rigorous methods, and a deep commitment to turn insights into
          impact.
        </PillarsCard>
        <img
          src="/images/pillars/pillar-2.png"
          width={222}
          height={258}
          alt="animated block"
          className="pillars-block-image absolute"
          style={{
            top: '0',
            left: '35%',
            opacity: '0',
            visibility: 'hidden',
          }}
          // Target top: 40%;
        />
        {/* Pillar Card Education */}
        <PillarsCard
          title="Education"
          left="120px"
          top="60%"
          handleCardMouseOver={() => handleCardMouseOver(1)}
          handleCardMouseOut={() => handleCardMouseOut(1)}
        >
          We unite curious minds to co-create globally competitive startups and
          deep tech spin-offs, giving ideas a path to grow into practically
          relevant, purpose-driven products.
        </PillarsCard>
        <img
          src="/images/pillars/pillar-3.png"
          width={317}
          height={208}
          alt="animated block"
          className="pillars-block-image absolute"
          style={{
            top: '0',
            left: '42.5%',
            opacity: '0',
            visibility: 'hidden',
          }}
          // Target top: 46%;
        />
        {/* Pillar Card Industry */}
        <PillarsCard
          title="Industry"
          right="120px"
          top="60%"
          handleCardMouseOver={() => handleCardMouseOver(2)}
          handleCardMouseOut={() => handleCardMouseOut(2)}
        >
          Through practical learning programs, we disseminate our knowledge to
          build the capabilities across individuals, organizations, and
          institutions, so they can innovate with AI.
        </PillarsCard>
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
