'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

import PillarsCard from '@/components/shared/PillarsCard';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const pillarsSectionRef = useRef<HTMLDivElement>(null);
  const pillarsSectionTitleRef = useRef<HTMLHeadingElement>(null);
  const pillarsCanvasRef = useRef<HTMLCanvasElement>(null);

  const topValues = [38, 40, 45];
  const lineValues = [
    {
      startX: 0.66,
      startY: 0.3,
      midX: 0.585,
      midY: 0.3,
      endX: 0.5,
      endY: 0.37,
    },
    {
      startX: 0.2,
      startY: 0.58,
      midX: 0.26,
      midY: 0.5,
      endX: 0.34,
      endY: 0.5,
    },
    {
      startX: 0.8,
      startY: 0.58,
      midX: 0.7,
      midY: 0.5,
      endX: 0.6,
      endY: 0.5,
    },
  ];
  const hoverTopValues = [36, 38, 43];

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

  // useEffect(() => {
  //   if (!pillarsCanvasRef.current) return;
  //   const canvas = pillarsCanvasRef.current;
  //   const ctx = pillarsCanvasRef.current.getContext('2d');

  //   if (!ctx) return;

  //   pillarsCanvasRef.current.width = pillarsCanvasRef.current.clientWidth;
  //   pillarsCanvasRef.current.height = pillarsCanvasRef.current.clientHeight;
  //   const canvasWidth = canvas.width;
  //   const canvasHeight = canvas.height;
  //   console.log('canvaswidth and heights ', canvasWidth, canvasHeight);

  //   ctx?.beginPath();
  //   ctx?.moveTo(0.5 * canvasWidth, 0.37 * canvasHeight);
  //   // ctx.lineTo(900, 600);
  //   // ctx?.lineTo(0.67 * canvasWidth, 0.15 * canvasHeight);
  //   ctx?.lineTo(0.585 * canvasWidth, 0.3 * canvasHeight);
  //   ctx.strokeStyle = '#EF7073';
  //   ctx.lineWidth = 2;
  //   ctx.stroke();

  //   ctx.moveTo(0.585 * canvasWidth, 0.3 * canvasHeight);
  //   ctx.lineTo(0.66 * canvasWidth, 0.3 * canvasHeight);
  //   ctx.strokeStyle = '#EF7073';
  //   ctx.lineWidth = 2;
  //   ctx.stroke();
  // }, []);

  useEffect(() => {
    if (!pillarsCanvasRef.current) return;

    const canvas = pillarsCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const totalFrames = 30;

    const drawAllLines = (progressArray: number[]) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < lineValues.length; i++) {
        const { startX, startY, midX, midY, endX, endY } = lineValues[i];
        const t = progressArray[i];
        if (t <= 0) continue;

        // Segment A
        ctx.beginPath();
        ctx.moveTo(startX * canvasWidth, startY * canvasHeight);
        ctx.lineTo(
          startX * canvasWidth + (midX - startX) * canvasWidth * Math.min(t, 1),
          startY * canvasHeight +
            (midY - startY) * canvasHeight * Math.min(t, 1)
        );
        ctx.strokeStyle = '#EF7073';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Segment B
        if (t > 1) {
          const t2 = t - 1;
          ctx.beginPath();
          ctx.moveTo(midX * canvasWidth, midY * canvasHeight);
          ctx.lineTo(
            midX * canvasWidth + (endX - midX) * canvasWidth * Math.min(t2, 1),
            midY * canvasHeight + (endY - midY) * canvasHeight * Math.min(t2, 1)
          );
          ctx.stroke();
        }

        // Circles
        ctx.beginPath();
        ctx.arc(startX * canvasWidth, startY * canvasHeight, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#EF7073';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(startX * canvasWidth, startY * canvasHeight, 5, 0, Math.PI * 2);
        ctx.strokeStyle = '#EF7073';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    // Main ScrollTrigger
    ScrollTrigger.create({
      trigger: '#pillars-section',
      pin: true,
      start: 'top top',
      end: 'bottom top',
      markers: false,
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
      },
    });

    if (!pillarsSectionRef.current) return;

    const innerSections = pillarsSectionRef.current.querySelectorAll(
      '.pillars-inner-section'
    );
    const images = pillarsSectionRef.current
      .querySelector('.pillars-animated-content')
      ?.querySelectorAll('.pillars-block-image');
    const cards = pillarsSectionRef.current
      .querySelector('.pillars-animated-content')
      ?.querySelectorAll('.pillars-animated-card');

    if (!images || !cards) return;

    innerSections.forEach((section, index) => {
      const img = images[index];
      const card = cards[index];
      if (!img || !card) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'bottom center',
        end: 'bottom center',
        scrub: 2.5,
        markers: false,
        onEnter: () => {
          gsap.fromTo(
            img,
            { top: '30%', autoAlpha: 0 },
            { top: `${topValues[index]}%`, autoAlpha: 1, ease: 'none' }
          );
          gsap.fromTo(card, { autoAlpha: 0 }, { autoAlpha: 1 });

          const progressArray = new Array(lineValues.length).fill(0);
          let frame = 0;

          const draw = () => {
            // Setup line progress
            for (let i = 0; i <= lineValues.length - 1; i++) {
              if (i < index) {
                progressArray[i] = 2;
              } else if (i === index) {
                progressArray[i] = (frame / totalFrames) * 2;
              }
            }
            drawAllLines(progressArray);

            if (frame < totalFrames) {
              frame++;
              requestAnimationFrame(draw);
            }
          };
          draw();
        },
        onEnterBack: () => {
          gsap.fromTo(
            img,
            { top: `${topValues[index]}%`, autoAlpha: 1 },
            { top: '30%', autoAlpha: 0 }
          );
          gsap.fromTo(card, { autoAlpha: 1 }, { autoAlpha: 0 });

          const progressArrayReverse = new Array(lineValues.length).fill(0);
          let reverseFrame = totalFrames;

          const reverseDraw = () => {
            for (let i = 0; i <= lineValues.length - 1; i++) {
              if (i < index) {
                progressArrayReverse[i] = 2;
              } else if (i === index) {
                progressArrayReverse[i] = (reverseFrame / totalFrames) * 2;
              } else {
                progressArrayReverse[i] = 0;
              }
            }
            drawAllLines(progressArrayReverse);

            if (reverseFrame > 0) {
              reverseFrame--;
              requestAnimationFrame(reverseDraw);
            }
          };
          reverseDraw();
        },
      });
    });
  }, [lineValues, topValues]);

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
      <canvas
        className="absolute h-full w-full"
        ref={pillarsCanvasRef}
      ></canvas>
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
