import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground grid grid-cols-[1fr_3fr] p-20 lg:gap-[264px]">
      <div className="">
        <div>
          <Image
            src="/logo-inverse.svg"
            width={200}
            height={44}
            alt="inverse logo"
            className="mt-3"
          />
        </div>
        <div className="mt-28">
          <h3 className="mb-10 font-medium text-neutral-500 uppercase">
            Contact
          </h3>
          <div className="flex flex-col gap-1">
            <h3 className="font-medium text-neutral-500">Address</h3>
            <p className="font-medium">Jwagal, lalitpur, Nepal</p>
            <h3 className="font-medium text-neutral-500">Email</h3>
            <p className="font-medium">info@naamii.org.np</p>
            <h3 className="font-medium text-neutral-500">Whatsapp</h3>
            <p className="font-medium">+977 9745941890</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="h2_medium_64 mb-20 leading-[80px] uppercase">
          BIG THINGS CAN HAPPEN
          <br /> FROM SMALL PLACES
        </h2>
        <div>
          <Button variant="secondary" size={'lg'} asChild>
            <Link href="/" className="inline-flex">
              Sign Up Newsletter
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-neutral-500">
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
        <div className="mt-[145px] grid grid-cols-3 gap-y-20">
          <div className="">
            <h3 className="mb-6 font-medium text-neutral-500 uppercase">
              Research
            </h3>
            <div className="flex flex-col gap-4">
              <h4 className="">
                <Link href="/">Research Groups & Labs</Link>
              </h4>
              <h4 className="">
                <Link href="/">Research Projects</Link>
              </h4>
              <h4 className="">
                <Link href="/"></Link>
                <Link href="/">Publications</Link>
              </h4>
            </div>
          </div>
          <div className="">
            <h3 className="mb-6 font-medium text-neutral-500 uppercase">
              Education & outreach
            </h3>
            <div className="flex flex-col gap-4">
              <h4 className="">
                <Link href="/">ANAIS</Link>
              </h4>
              <h4 className="">
                <Link href="/">Talent Pull & AI-Workshops</Link>
              </h4>
            </div>
          </div>
          <div className="">
            <h3 className="mb-6 font-medium text-neutral-500 uppercase">
              Innovation & Industry
            </h3>
            <div className="flex flex-col gap-4">
              <h4 className="">
                <Link href="/">Incubating & Supporting Startups</Link>
              </h4>
              <h4 className="">
                <Link href="/">Industry Training</Link>
              </h4>
              <h4 className="">
                <Link href="/">Research & Development</Link>
              </h4>
            </div>
          </div>
          <div className="">
            <h3 className="mb-6 font-medium text-neutral-500 uppercase">
              NAAMII
            </h3>
            <div className="flex flex-col gap-4">
              <h4 className="">
                <Link href="/">Our Story</Link>
              </h4>
              <h4 className="">
                <Link href="/">Team & Leadership</Link>
              </h4>
              <h4 className="">
                <Link href="/">Organizational Structure</Link>
              </h4>
              <h4 className="">
                <Link href="/">Policy Statement</Link>
              </h4>
            </div>
          </div>
          <div className="">
            <h3 className="mb-6 font-medium text-neutral-500 uppercase">
              News & Insight
            </h3>
            <div className="flex flex-col gap-4">
              <h4 className="">
                <Link href="/">Newsletter</Link>
              </h4>
              <h4 className="">
                <Link href="/">News & Events</Link>
              </h4>
              <h4 className="">
                <Link href="/">Media Coverage</Link>
              </h4>
              <h4 className="">
                <Link href="/">Blogs</Link>
              </h4>
            </div>
          </div>
          <div>
            <h3 className="mb-6 font-medium text-neutral-500 uppercase">
              Connect
            </h3>
            <div className="flex gap-3">
              <Button variant="secondary" className="size-[72px] p-0" asChild>
                <Link
                  href="/"
                  className="flex size-[72px] items-center justify-center rounded-full bg-neutral-700"
                >
                  <Image
                    src="/images/icon-twitter.svg"
                    width={18}
                    height={17}
                    alt="twitter logo"
                  />
                </Link>
              </Button>
              <Button variant="secondary" className="size-[72px] p-0" asChild>
                <Link
                  href="/"
                  className="flex size-[72px] items-center justify-center rounded-full bg-neutral-700"
                >
                  <Image
                    src="/images/icon-linkedin.svg"
                    width={18}
                    height={17}
                    alt="linkedin logo"
                  />
                </Link>
              </Button>
              <Button variant="secondary" className="size-[72px] p-0" asChild>
                <Link
                  href="/"
                  className="flex size-[72px] items-center justify-center rounded-full bg-neutral-700"
                >
                  <Image
                    src="/images/icon-youtube.svg"
                    width={18}
                    height={17}
                    alt="youtube logo"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
