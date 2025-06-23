import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ClippedInnovationCarouselCard from '@/components/shared/ClippedInnovationCarouselCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { innovationCarouselItems } from '@/constants';

// import ClippedCard from '@/components/shared/ClippedCard';

const Section4 = () => {
  return (
    <div className="px-20 py-[164px]">
      <div>
        {/* Badge */}
        <Badge variant="muted">Featured Highlights</Badge>
      </div>
      <div className="mb-20 flex items-end justify-between">
        <h2 className="h3_medium_64 text-primary-900">Innovation in Motion</h2>
        <p className="text-3xl leading-[150%] font-normal text-neutral-900">
          Knowledge, and action shaping the future
          <br /> of AI.
        </p>
      </div>

      <Carousel>
        <CarouselContent>
          {innovationCarouselItems.map((item) => (
            <CarouselItem key={item.title} className="pl-10 md:basis-[31%]">
              <div className="p-1">
                <ClippedInnovationCarouselCard
                  link={item.href}
                  title={item.title}
                  imgSrc={item.imgSrc}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center">
        <Button
          className="flex rounded-full px-2"
          size="lg"
          variant="default"
          asChild
        >
          <Link href="/" className="inline-flex">
            All Projects
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
      {/* <ClippedCard /> */}
    </div>
  );
};

export default Section4;
