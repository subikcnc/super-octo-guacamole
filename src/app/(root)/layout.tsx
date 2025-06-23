import { ReactNode } from 'react';

import Navbar from '@/components/navigation/Navbar';
import Footer from '@/sections/footer';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <header className="w-full bg-transparent">
        <Navbar />
      </header>
      <div className="">{children}</div>
      <Footer />
    </main>
  );
};

export default RootLayout;
