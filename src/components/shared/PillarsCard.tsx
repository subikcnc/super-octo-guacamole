import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

interface Props {
  title: string;
  left?: string;
  right?: string;
  top?: string;
  children: React.ReactNode;
  handleCardMouseOver?: () => void;
  handleCardMouseOut?: () => void;
}

const PillarsCard = ({
  title,
  left = 'unset',
  right = 'unset',
  top = 'unset',
  children,
  handleCardMouseOver,
  handleCardMouseOut,
}: Props) => {
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
    <div
      className="pillars-animated-card absolute max-w-[500px]"
      onMouseOver={handleCardMouseOver}
      onMouseOut={handleCardMouseOut}
      style={{
        left,
        right,
        top,
        opacity: '0',
      }}
    >
      <style>{`
        .apply-light-shadow {
          filter: url(#shadow-md-filter);
        }
      `}</style>
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
      <div className="apply-light-shadow">
        <div className="rounded-t-[20px] bg-white">
          <div className="p-5 pb-0">
            <h3 className="text-primary-700 h3_bold_36 mb-4">{title}</h3>
            <p className="text-neutral-700">{children}</p>
          </div>
        </div>
        <svg
          className="h-[120px] w-full"
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
      {/* <div
        className="px-5 py-8"
        style={{
          clipPath: 'url(#dynamic-shape)',
        }}
      >
        Learn more
      </div> */}
      {/* <Button
        ref={buttonRef}
        className="bg-primary-700 hover:bg-primary-700 absolute right-0 bottom-0 size-[57px] cursor-pointer rounded-full p-0"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMosueOut}
      >
        <Image
          src="/icons/arrow-up-light.svg"
          className="transition-all"
          width={16}
          height={16}
          alt="arrow icon up"
        />
      </Button> */}
      <Link
        href={'/'}
        ref={buttonRef}
        className="bg-primary-700 hover:bg-primary-700 absolute right-0 bottom-[24px] inline-flex size-[57px] cursor-pointer items-center justify-center rounded-full p-0"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMosueOut}
      >
        <Image
          src="/icons/arrow-up-light.svg"
          className="transition-all"
          width={16}
          height={16}
          alt="arrow icon up"
        />
      </Link>
    </div>
  );
};

export default PillarsCard;
