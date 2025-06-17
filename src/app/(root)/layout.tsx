import { ReactNode } from 'react';

import Navbar from '@/components/navigation/Navbar';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <header className="fixed top-0 left-0 z-50 w-full bg-white">
        <Navbar />
      </header>
      <div className="flex pt-[63px] md:pt-[126px]">{children}</div>
    </main>
  );
};

export default RootLayout;
