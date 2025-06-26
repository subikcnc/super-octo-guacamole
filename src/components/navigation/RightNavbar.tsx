import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { navbarLinks } from '@/constants';

const RightNavbar = () => {
  return (
    <div
      className="dpi125:gap-4 dpi125:right-[2.5rem] fixed top-6 right-[6.25rem] z-10 flex items-center gap-8 rounded-full bg-white px-6 py-2"
      style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.15)' }}
    >
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
      <Button className="flex rounded-full px-2" size="lg" asChild>
        <Link href="/" className="inline-flex">
          Get Involved
          <span className="bg-primary-500 inline-flex size-10 items-center justify-center rounded-full">
            <Image
              src="/icons/arrow-up.svg"
              height={16}
              width={16}
              alt="icon arrow up"
            />
          </span>
        </Link>
      </Button>
    </div>
  );
};

export default RightNavbar;
