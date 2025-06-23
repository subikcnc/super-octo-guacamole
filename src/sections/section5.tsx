import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

import { collaboratorsCarousel } from '@/constants';

const Section5 = () => {
  return (
    <div className="bg-muted px-20 lg:py-[164px]">
      <h2 className="h2_medium_80 text-primary-900 mb-36 text-center">
        Built In Collaboration With
        <br /> Leading Minds and Institutions
      </h2>
      <Marquee
        pauseOnHover={true}
        speed={50} // Adjust sp  eed
        gradient={true} // Adds a fade effect at the edges
        gradientColor="oklch(var(--secondary))" // Match your background color!
        gradientWidth={100}
      >
        {collaboratorsCarousel.map((item, index) => (
          // The wrapper for each logo
          <div key={index} className="relative mx-8 h-24 w-64">
            <Image src={item} fill alt={item} className="object-contain" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Section5;
