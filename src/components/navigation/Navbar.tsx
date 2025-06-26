import React from 'react';

import LeftNavbar from '@/components/navigation/LeftNavbar';
import RightNavbar from '@/components/navigation/RightNavbar';

const Navbar = () => {
  return (
    <div className="dpi125:px-[2.5rem] mx-auto flex w-full items-center justify-between bg-transparent p-4 py-10 sm:px-2 lg:px-[6.25rem]">
      <LeftNavbar />
      <RightNavbar />
    </div>
  );
};

export default Navbar;
