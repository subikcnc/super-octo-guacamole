import React from 'react';
import Marquee from 'react-fast-marquee';

import { marqueeList } from '@/constants';

const Section8 = () => {
  return (
    <div className="border border-t-neutral-900 py-[7.5rem]">
      <Marquee>
        {marqueeList.map((item, index) => (
          <h2
            className="font_body mx-5 flex items-center gap-10 text-[5.37rem] font-light text-neutral-700"
            key={`${item}${index}`}
          >
            {item}
            <div className="size-[1.375rem] rounded-full bg-neutral-700"></div>
          </h2>
        ))}
      </Marquee>
    </div>
  );
};

export default Section8;
