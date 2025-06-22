import Image from 'next/image';
import React, { useRef } from 'react';

import { Button } from '@/components/ui/button';

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
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      className="pillars-animated-card shadow-nav absolute max-w-[500px]"
      onMouseOver={handleCardMouseOver}
      onMouseOut={handleCardMouseOut}
      style={{
        left,
        right,
        top,
        opacity: '0',
      }}
    >
      <div className="rounded-t-[40px] bg-neutral-300 p-5 pb-0">
        <h3 className="text-primary-700 h3_bold_36 mb-4">{title}</h3>
        <p className="text-neutral-700">{children}</p>
      </div>
      <div
        className="bg-neutral-300 px-5 py-8"
        style={{
          clipPath: 'url(#dynamic-shape)',
        }}
      >
        Learn more
      </div>
      <Button
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
      </Button>
    </div>
  );
};

export default PillarsCard;
