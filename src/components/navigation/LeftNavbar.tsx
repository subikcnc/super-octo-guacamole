import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LeftNavbar = () => {
  return (
    <Link
      href="/"
      className="dpi125:w-40 dpi125:h-[35.2px] relative inline-flex h-11 w-50"
    >
      <Image src="/logo.svg" fill className="object-contain" alt="logo" />
    </Link>
  );
};

export default LeftNavbar;
