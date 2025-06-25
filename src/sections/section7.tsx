import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

const Section7 = () => {
  return (
    <div className="grid grid-cols-2 gap-4 px-[100px] py-20">
      <div className="flex flex-col">
        <h2 className="h2_regular_64 text-primary-900">
          Help shape an AI
          <br /> ecosystem where
          <br /> knowledge leads to
          <br /> change.
        </h2>
        <div className="mt-20 flex gap-6">
          <Button variant="default" asChild>
            <Link className="uppercase" href="/">
              Explore Our Research
            </Link>
          </Button>
          <Button variant="default" asChild>
            <Link className="uppercase" href="/">
              Join Our Programs
            </Link>
          </Button>
          <Button variant="default" asChild>
            <Link className="uppercase" href="/">
              Collaborate With Us
            </Link>
          </Button>
        </div>
      </div>
      <Image
        src="/images/knowledge.jpg"
        width={715}
        height={586}
        alt="ai ecosystem"
      />
    </div>
  );
};

export default Section7;
