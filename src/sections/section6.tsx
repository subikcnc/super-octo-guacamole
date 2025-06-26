import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { news } from '@/constants';

const Section6 = () => {
  return (
    <div className="dpi125:px-10 px-20 lg:py-[164px]">
      <div>
        {/* Badge */}
        <Badge variant="muted">Featured Highlights</Badge>
      </div>
      <div className="mb-20 flex items-end justify-between">
        <h2 className="h3_medium_64 text-primary-900 uppercase">
          News & Insights
        </h2>
        <p className="text-3xl leading-[150%] font-normal text-neutral-900">
          Stay informed with the latest updates from NAAMII —<br /> including
          news highlights, upcoming events, media <br />
          features, and insights into our AI initiatives.
        </p>
      </div>
      <div className="mx-auto mt-20 mb-8 max-w-[75rem]">
        {news.map((item) => (
          <div
            key={item.title}
            className="grid grid-cols-3 not-last:mb-[5.75rem]"
          >
            <Image
              src={item.imgSrc}
              width={296}
              height={234}
              alt="news image"
            />
            <div className="font-medium text-neutral-700 uppercase">
              {item.type}
            </div>
            <div className="flex flex-col gap-9">
              <div className="font-medium text-neutral-900">{item.date}</div>
              <p className="text-2xl leading-[150%] font-medium text-neutral-900">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button className="flex rounded-full px-2" size="lg" asChild>
          <Link className="inline-flex" href="/">
            Explore All News & Insights
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
    </div>
  );
};

export default Section6;
