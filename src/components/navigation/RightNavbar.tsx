import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { navbarLinks } from '@/constants';

const RightNavbar = () => {
  return (
    <div className="flex items-center gap-8 rounded-full bg-white px-6 py-[26px] shadow-(--shadow-nav)">
      {navbarLinks.map((item) => (
        <Link
          key={item.route}
          href={item.route}
          className="flex gap-1.5 font-medium"
        >
          {item.label}
          <Image
            src="/icons/arrow-down.svg"
            width={20}
            height={20}
            alt="arrow down icon"
          />
        </Link>
      ))}
    </div>
  );
};

export default RightNavbar;
