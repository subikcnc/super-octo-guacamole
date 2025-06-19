import { ReactNode } from 'react';

import Navbar from '@/components/navigation/Navbar';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <header className="w-full bg-transparent">
        <Navbar />
      </header>
      <div className="pt-[63px] md:pt-[156px]">{children}</div>
    </main>
  );
};

export default RootLayout;
