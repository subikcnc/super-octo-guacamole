import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LeftNavbar = () => {
  return (
    <Link href="/">
      <Image src="/logo.svg" width={200} height={44} alt="logo" />
    </Link>
  );
};

export default LeftNavbar;
