'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useMemo, useRef } from 'react';

import PillarsCard from '@/components/shared/PillarsCard';
import { useDevicePixelRatio } from '@/hooks/useDevicePixelRatio';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const pillarsSectionRef = useRef<HTMLDivElement>(null);
  const pillarsSectionTitleRef = useRef<HTMLHeadingElement>(null);
  const pillarsCanvasRef = useRef<HTMLCanvasElement>(null);

  const dpr = useDevicePixelRatio();
  console.log('dpr is', dpr);

  const topValues = useMemo(
    () => [38, dpr >= 1.25 ? 39 : 40, dpr >= 1.25 ? 42 : 45],
    [dpr]
  );
  const lineValues = useMemo(
    () => [
      {
        startX: 0.66,
        startY: 0.26,
        midX: 0.585,
        midY: 0.26,
        endX: 0.5,
        endY: 0.35,
      },
      {
        startX: 0.2,
        startY: 0.58,
        midX: 0.26,
        midY: dpr >= 1.25 ? 0.45 : 0.5,
        endX: dpr >= 1.25 ? 0.38 : 0.34,
        endY: dpr >= 1.25 ? 0.45 : 0.5,
      },
      {
        startX: 0.8,
        startY: 0.58,
        midX: 0.7,
        midY: dpr >= 1.25 ? 0.45 : 0.5,
        endX: dpr >= 1.25 ? 0.55 : 0.6,
        endY: dpr >= 1.25 ? 0.45 : 0.5,
      },
    ],
    [dpr]
  );
  const hoverTopValues = [36, dpr >= 1.25 ? 37 : 38, dpr >= 1.25 ? 40 : 43];

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

  // Global Draw all lines function
  const drawAllLinesGlobal = (
    progressArray: number[],
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    canvasWidth: number,
    canvasHeight: number
  ) => {
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
        startY * canvasHeight + (midY - startY) * canvasHeight * Math.min(t, 1)
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

    // const totalFrames = 30;

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

    const titleTimeline = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5, ease: 'power2' },
    });

    titleTimeline
      .set(pillarsSectionTitleRef.current, { position: 'absolute' })
      .to(pillarsSectionTitleRef.current, {
        left: `${dpr >= 1.25 ? '40' : '120'}`,
        top: `${dpr >= 1.25 ? '16' : '164'}`,
        width: 580,
        color: '#620002',
      });

    ScrollTrigger.create({
      trigger: '#pillars-section-title',
      start: 'top center',
      end: 'bottom top',
      markers: false,
      onEnter: () => {
        titleTimeline.play();
      },
      onLeaveBack: () => {
        titleTimeline.reverse();
      },
    });

    // Main ScrollTrigger
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#pillars-section',
        pin: true,
        scrub: 1.5,
        start: 'top top',
        end: '+=3000',
        markers: false,
      },
    });
    if (!pillarsSectionRef.current) return;

    // const innerSections = pillarsSectionRef.current.querySelectorAll(
    //   '.pillars-inner-section'
    // );
    const images = pillarsSectionRef.current
      .querySelector('.pillars-animated-content')
      ?.querySelectorAll('.pillars-block-image');
    const cards = pillarsSectionRef.current
      .querySelector('.pillars-animated-content')
      ?.querySelectorAll('.pillars-animated-card');

    const drawProgressArray = lineValues.map(() => ({ value: 0 }));
    console.log('This is draw progress array', drawProgressArray);
    // const drawStep = (stepIndex: number) => ({
    //   value: 1,
    //   onUpdate: () => {
    //     const progressArray = new Array(lineValues.length).fill(0);
    //     for (let i = 0; i < lineValues.length; i++) {
    //       if (i < stepIndex) {
    //         progressArray[i] = 2;
    //       } else if (i === stepIndex) {
    //         progressArray[i] = drawProgress.value * 2;
    //       }
    //     }
    //     drawAllLines(progressArray);
    //   },
    //   onStart: () => {
    //     drawProgress.value = 0;
    //   },
    // });

    if (!images || !cards) return;
    mainTimeline
      .addLabel('step1')
      .to(images[0], { autoAlpha: 1, top: `${topValues[0]}%` }, 'step1')
      .to(cards[0], { autoAlpha: 1 }, 'step1')
      .to(
        drawProgressArray[0],
        {
          value: 2,
          duration: 0.5,
          ease: 'power1.inOut',
          onUpdate: () => drawAllLines(drawProgressArray.map((p) => p.value)),
        },
        'step1+=0.2'
      )

      .addLabel('step2')
      .add(() => {
        drawProgressArray[0].value = 0;
        drawAllLines(drawProgressArray.map((p) => p.value));
      }, 'step2') // instantly clear line from step 1

      .to(images[1], { autoAlpha: 1, top: `${topValues[1]}%` }, 'step2')
      .to(cards[1], { autoAlpha: 1 }, 'step2')
      .to(
        drawProgressArray[1],
        {
          value: 2,
          duration: 0.5,
          ease: 'power1.inOut',
          onUpdate: () => drawAllLines(drawProgressArray.map((p) => p.value)),
        },
        'step2+=0.2'
      )

      .addLabel('step3')
      .add(() => {
        drawProgressArray[1].value = 0;
        drawAllLines(drawProgressArray.map((p) => p.value));
      }, 'step3') // instantly clear line from step 2

      .to(images[2], { autoAlpha: 1, top: `${topValues[2]}%` }, 'step3')
      .to(cards[2], { autoAlpha: 1 }, 'step3')
      .to(
        drawProgressArray[2],
        {
          value: 2,
          duration: 0.5,
          ease: 'power1.inOut',
          onUpdate: () => drawAllLines(drawProgressArray.map((p) => p.value)),
        },
        'step3+=0.2'
      )
      .add(() => {
        drawProgressArray[2].value = 0;
        drawAllLines(drawProgressArray.map((p) => p.value));
      }, 'step3+=1');

    // ScrollTrigger.create({
    //   trigger: '#pillars-section',
    //   pin: true,
    //   start: 'top top',
    //   end: '+=4000',
    //   markers: false,
    //   onEnter: () => {
    //     // titleTimeline.play();
    //     // if (!pillarsSectionTitleRef.current) return;
    //     // gsap.set(pillarsSectionTitleRef.current, { position: 'absolute' });
    //     // gsap.to(pillarsSectionTitleRef.current, {
    //     //   left: 120,
    //     //   top: 164,
    //     //   width: 580,
    //     //   color: '#620002',
    //     //   duration: 0.5,
    //     //   ease: 'power2',
    //     // });
    //   },
    //   onLeaveBack: () => {
    //     // titleTimeline.reverse();
    //     // if (!pillarsSectionTitleRef.current) return;
    //     // gsap.to(pillarsSectionTitleRef.current, {
    //     //   left: '', // resets to original
    //     //   top: '', // resets to original
    //     //   width: 868, // resets to original
    //     //   color: '#474d59', // resets to original
    //     //   duration: 0.5,
    //     //   ease: 'power2',
    //     //   onComplete: () => {
    //     //     gsap.set(pillarsSectionTitleRef.current, { position: 'relative' }); // restore positioning
    //     //   },
    //     // });
    //   },
    // });

    // innerSections.forEach((section, index) => {
    //   const img = images[index];
    //   const card = cards[index];
    //   if (!img || !card) return;

    //   ScrollTrigger.create({
    //     trigger: section,
    //     start: 'bottom+=200 center',
    //     end: 'bottom+=200 center',
    //     scrub: 1,
    //     snap: 1 / 3,
    //     markers: true,
    //     onEnter: () => {
    //       // gsap.fromTo(
    //       //   img,
    //       //   { top: '30%', autoAlpha: 0 },
    //       //   { top: `${topValues[index]}%`, autoAlpha: 1, ease: 'none' }
    //       // );
    //       // gsap.fromTo(card, { autoAlpha: 0 }, { autoAlpha: 1 });

    //       const progressArray = new Array(lineValues.length).fill(0);
    //       let frame = 0;

    //       const draw = () => {
    //         // Setup line progress
    //         for (let i = 0; i <= lineValues.length - 1; i++) {
    //           if (i < index) {
    //             progressArray[i] = 2;
    //           } else if (i === index) {
    //             progressArray[i] = (frame / totalFrames) * 2;
    //           }
    //         }
    //         drawAllLines(progressArray);

    //         if (frame < totalFrames) {
    //           frame++;
    //           requestAnimationFrame(draw);
    //         }
    //       };
    //       draw();
    //     },
    //     onEnterBack: () => {
    //       // gsap.fromTo(
    //       //   img,
    //       //   { top: `${topValues[index]}%`, autoAlpha: 1 },
    //       //   { top: '30%', autoAlpha: 0 }
    //       // );
    //       // gsap.fromTo(card, { autoAlpha: 1 }, { autoAlpha: 0 });

    //       const progressArrayReverse = new Array(lineValues.length).fill(0);
    //       let reverseFrame = totalFrames;

    //       const reverseDraw = () => {
    //         for (let i = 0; i <= lineValues.length - 1; i++) {
    //           if (i < index) {
    //             progressArrayReverse[i] = 2;
    //           } else if (i === index) {
    //             progressArrayReverse[i] = (reverseFrame / totalFrames) * 2;
    //           } else {
    //             progressArrayReverse[i] = 0;
    //           }
    //         }
    //         drawAllLines(progressArrayReverse);

    //         if (reverseFrame > 0) {
    //           reverseFrame--;
    //           requestAnimationFrame(reverseDraw);
    //         }
    //       };
    //       reverseDraw();
    //     },
    //   });
    // });
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      // window.removeEventListener('resize', resizeCanvas);
    };
  }, [lineValues, topValues, dpr]);

  const handleCardMouseOver = (index: number) => {
    if (!pillarsSectionRef.current) return;

    const images = pillarsSectionRef.current.querySelectorAll(
      '.pillars-block-image'
    );
    gsap.to(images[index], { top: `${hoverTopValues[index]}%` });
    images.forEach((img, i) => {
      if (i !== index) {
        console.log('img src to set', `${pillarImageHoveredSrc[i]}`);
        const innerImg = img.querySelector('img');
        if (!innerImg) return;
        innerImg.setAttribute('src', `${pillarImageHoveredSrc[i]}`);
      }
    });

    // Animating the lines on hover

    if (!pillarsCanvasRef.current) return;

    const canvas = pillarsCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const drawProgressArray = lineValues.map(() => ({ value: 0 }));
    console.log('This is draw progress array', drawProgressArray);
    gsap.to(drawProgressArray[index], {
      value: 2,
      duration: 0.5,
      ease: 'power1.inOut',
      onUpdate: () =>
        drawAllLinesGlobal(
          drawProgressArray.map((p) => p.value),
          ctx,
          canvas,
          canvasWidth,
          canvasHeight
        ),
    });

    // gsap.to()
  };

  const handleCardMouseOut = (index: number) => {
    if (!pillarsSectionRef.current) return;

    const images = pillarsSectionRef.current.querySelectorAll(
      '.pillars-block-image'
    );
    gsap.to(images[index], { top: `${topValues[index]}%` });

    images.forEach((img, i) => {
      const innerImg = img.querySelector('img');
      if (!innerImg) return;
      innerImg.setAttribute('src', `${pillarImageInitialSrc[i]}`);
    });

    // Animating the lines on hover

    if (!pillarsCanvasRef.current) return;

    const canvas = pillarsCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const drawProgressArray = lineValues.map(() => ({ value: 0 }));
    console.log('This is draw progress array', drawProgressArray);
    gsap.to(drawProgressArray[index], {
      value: 0,
      duration: 0.5,
      ease: 'power1.inOut',
      onUpdate: () =>
        drawAllLinesGlobal(
          drawProgressArray.map((p) => p.value),
          ctx,
          canvas,
          canvasWidth,
          canvasHeight
        ),
    });
  };
  return (
    <div
      id="pillars-section"
      className="relative flex h-[100vh] w-full flex-col bg-transparent"
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
          className="h2_regular_56 font_body dpi125:max-w-100 max-w-[54.25rem] text-neutral-900"
        >
          By building the foundation of Research, Education, and Industry.
        </h2>
      </div>
      <div className="pillars-animated-content absolute top-0 left-0 flex h-full w-full items-center justify-center">
        <div
          className="pillars-block-image dpi150:left-[43%] dpi125:w-[11.3125rem] dpi125:left-[43%] absolute top-[30%] left-[40%] w-[22.625rem] opacity-0"
          // style={{
          //   top: '0',
          //   left: '40%',
          //   opacity: '0',
          // }}
        >
          <div className="w-full pt-[54.97%]">
            <img
              src="/images/pillars/pillar-1.png"
              alt="animated blocks"
              className="absolute top-0 left-0 h-[100%] w-[100%] object-cover"
            />
          </div>
        </div>
        {/* <img
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
        /> */}
        {/* Pillar Card Research */}
        <PillarsCard
          containerClasses="dpi125:right-[2.5rem] right-[7.5rem] top-[15%]"
          title="Research"
          // right="120px"
          // top="15%"
          handleCardMouseOver={() => handleCardMouseOver(0)}
          handleCardMouseOut={() => handleCardMouseOut(0)}
        >
          We pursue AI research to expand the horizons of human knowledge. Our
          work addresses urgent challenges spanning diverse sectors with bold
          ideas, rigorous methods, and a deep commitment to turn insights into
          impact.
        </PillarsCard>
        <div
          className="pillars-block-image dpi150:left-[39.5%] dpi125:left-[40.3%] dpi125:w-[6.94rem] absolute top-[30%] left-[35%] w-[13.875rem] opacity-0"
          // style={{
          //   top: '0',
          //   left: '35%',
          //   opacity: '0',
          // }}
        >
          <div style={{ width: '100%', paddingTop: '116.212%' }}>
            <img
              src="/images/pillars/pillar-2.png"
              // width={222}
              // height={258}
              alt="animated block"
              className="absolute"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              // Target top: 40%;
            />
          </div>
        </div>
        {/* <img
          src="/images/pillars/pillar-2.png"
          // width={222}
          // height={258}
          alt="animated block"
          className="pillars-block-image absolute"
          style={{
            top: '0',
            left: '35%',
            opacity: '0',
            visibility: 'hidden',
          }}
          // Target top: 40%;
        /> */}
        {/* Pillar Card Education */}
        <PillarsCard
          containerClasses="dpi125:left-[2.5rem] left-[7.5rem] top-[60%]"
          title="Education"
          // left="120px"
          // top="60%"
          handleCardMouseOver={() => handleCardMouseOver(1)}
          handleCardMouseOut={() => handleCardMouseOut(1)}
        >
          We unite curious minds to co-create globally competitive startups and
          deep tech spin-offs, giving ideas a path to grow into practically
          relevant, purpose-driven products.
        </PillarsCard>
        <div
          className="pillars-block-image dpi125:w-[9.9rem] dpi150:left-[44.5%] dpi125:left-[44%] absolute top-[30%] left-[42.5%] w-[19.8125rem] opacity-0"
          // style={{
          //   top: '0',
          //   left: '42.5%',
          //   opacity: '0',
          // }}
        >
          <div style={{ width: '100%', paddingTop: '65.615%' }}>
            <img
              src="/images/pillars/pillar-3.png"
              // width={222}
              // height={258}
              alt="animated block"
              className="absolute"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              // Target top: 40%;
            />
          </div>
        </div>
        {/* <img
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
        /> */}
        {/* Pillar Card Industry */}
        <PillarsCard
          containerClasses="dpi125:right-[2.5rem] right-[7.5rem] top-[60%]"
          title="Industry"
          // right="120px"
          // top="60%"
          handleCardMouseOver={() => handleCardMouseOver(2)}
          handleCardMouseOut={() => handleCardMouseOut(2)}
        >
          Through practical learning programs, we disseminate our knowledge to
          build the capabilities across individuals, organizations, and
          institutions, so they can innovate with AI.
        </PillarsCard>
      </div>

      <div className="pillars-inner-section w-full flex-1" data-step="1">
        &nbsp;
      </div>
      <div className="pillars-inner-section flex-1" data-step="2"></div>
      <div className="pillars-inner-section flex-1" data-step="3"></div>
    </div>
  );
};

export default Section3;
