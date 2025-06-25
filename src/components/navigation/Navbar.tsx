import React from 'react';

import LeftNavbar from '@/components/navigation/LeftNavbar';
import RightNavbar from '@/components/navigation/RightNavbar';

const Navbar = () => {
  return (
    <div className="mx-auto flex w-full items-center justify-between bg-transparent p-4 py-10 sm:px-2 lg:px-[40px]">
      <LeftNavbar />
      <RightNavbar />
    </div>
  );
};

export default Navbar;
