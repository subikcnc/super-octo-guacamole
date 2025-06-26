'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

interface Props {
  imgSrc: string;
  title: string;
  link: string;
}

const ClippedInnovationCarouselCard = ({ imgSrc, title, link }: Props) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseOver = () => {
    if (!buttonRef.current) return;

    const image = buttonRef.current.querySelector('img');
    if (!image) return;
    image.style.rotate = '45deg';
  };

  const handleMosueOut = () => {
    if (!buttonRef.current) return;

    const image = buttonRef.current.querySelector('img');
    if (!image) return;
    image.style.rotate = '0deg';
  };
  return (
    <>
      {/* 
        Define the SVG filter here. It's hidden using absolute positioning.
      */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          {/* A filter that mimics Tailwind's 'shadow-md' class */}
          <filter
            id="shadow-md-filter"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            {/* First layer of the shadow */}
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="3" // blur-6px / 2
              floodColor="rgb(0 0 0 / 0.1)"
              result="shadow1"
            />
            {/* Second layer of the shadow */}
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2" // blur-4px / 2
              floodColor="rgb(0 0 0 / 0.1)"
              result="shadow2"
            />
            {/* Merge the two shadows and place the original element on top */}
            <feMerge>
              <feMergeNode in="shadow1" />
              <feMergeNode in="shadow2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* A style tag to apply our new lighter filter. */}
      <style>{`
        .apply-light-shadow {
          filter: url(#shadow-md-filter);
        }
      `}</style>

      <div className="relative">
        <div className="absolute bottom-[55px] left-5 z-10 text-lg font-medium text-neutral-900">
          Learn More
        </div>
        {/* 
            This wrapper now gets the new, lighter shadow filter applied.
          */}
        <div className="apply-light-shadow relative">
          {/* No shadow class on this div */}
          <div className="rounded-t-4xl bg-white p-5">
            <div className="flex flex-col">
              <Image
                src={imgSrc}
                width={512}
                height={404}
                alt={`${title} image`}
              />
              <h4 className="h4_regular_32 mt-5 line-clamp-2">{title}</h4>
            </div>
          </div>

          <svg
            className="hdpi125:h-[80px] h-[7.5rem] w-full"
            viewBox="0 0 500 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M500 0H0V74.6036C0 83.6593 6.68231 91 14.9254 91H387.046C392.699 91 397.866 87.492 400.395 81.9384L426.11 25.4579C428.64 19.9043 433.807 16.3964 439.459 16.3964H485.075C493.318 16.3964 500 9.05548 500 0Z"
              fill="white"
            />
            {/* Learn More
            <text x="5" y="20" fill="red">
              Learn More
            </text> */}
          </svg>
        </div>
        <Link
          ref={buttonRef}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMosueOut}
          href={link}
          className="bg-primary-700 hover:bg-primary-700 dpi125:bottom-[18px] dpi125:size-[2.625rem] absolute right-0 bottom-[1.75rem] inline-flex size-[3.5625rem] cursor-pointer items-center justify-center rounded-full p-0"
        >
          <span className="relative inline-flex size-4">
            <Image
              src="/icons/arrow-up-light.svg"
              className="object-cover transition-all"
              fill
              alt="arrow icon up"
            />
          </span>
        </Link>
      </div>
    </>
  );
};

export default ClippedInnovationCarouselCard;
