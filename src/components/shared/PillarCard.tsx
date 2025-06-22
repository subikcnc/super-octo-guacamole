// components/PillarCard.jsx

import React from 'react';

// The props this card will accept
interface PillarCardProps {
  title: string;
  children: React.ReactNode;
  useCustomShape?: boolean; // A prop to decide if we use the clip-path
  className?: string; // To pass additional classes like position
  style?: React.CSSProperties; // To pass GSAP styles like opacity
}

const PillarCard = ({
  title,
  children,
  useCustomShape = false,
  className,
  style,
}: PillarCardProps) => {
  // Define the base style for the card body
  const cardBodyStyle: React.CSSProperties = {
    backgroundColor: '#e9e8e6', // Use the background color from our design
  };

  // If useCustomShape is true, apply the clip-path
  if (useCustomShape) {
    cardBodyStyle.clipPath = 'url(#card-shape)';
    cardBodyStyle.width = '532px'; // Must have fixed dimensions for the clip-path
    cardBodyStyle.height = '332px';
    cardBodyStyle.filter = 'drop-shadow(0 2px 8px 0 rgba(0,0,0,0.15))';
  } else {
    // Otherwise, use standard border-radius
    cardBodyStyle.borderRadius = '30px';
    cardBodyStyle.boxShadow = '0 2px 8px 0 rgba(0,0,0,0.15)';
  }

  return (
    // 1. The Wrapper: Handles positioning and holds both card and button.
    // It receives the className and style from the parent for GSAP animations.
    <div
      className={`${className}`}
      style={{
        ...style,
        width: useCustomShape ? '532px' : 'auto', // Set width for layout
        maxWidth: '500px',
      }}
    >
      {/* 2. The Card Body: This is the element that gets clipped or rounded. */}
      <div
        className="h-full w-full"
        style={{
          ...cardBodyStyle,
          filter: 'drop-shadow(0 2px 8px 0 rgba(0,0,0,0.15))',
        }}
      >
        <div className="p-10">
          <h3 className="mb-4 text-4xl font-bold text-[#b94517]">{title}</h3>
          <p className="text-lg text-[#6c6c6c]">{children}</p>
          <a href="#" className="mt-8 inline-block font-semibold text-[#333]">
            Learn more
          </a>
        </div>
      </div>

      {/* 3. The Button: It's a sibling, so it's NOT clipped. */}
      {/* It only renders if the custom shape is used. */}
      {useCustomShape && (
        <a
          href="#"
          className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#b94517] shadow-lg"
          style={{ bottom: '31px', right: '41px', display: 'none' }}
        >
          {/* Arrow */}
          <span
            className="h-4 w-4 border-t-2 border-r-2 border-white"
            style={{ transform: 'rotate(45deg)' }}
          ></span>
        </a>
      )}
    </div>
  );
};

export default PillarCard;
