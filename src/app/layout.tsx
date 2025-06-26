import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const generalSans = localFont({
  src: './fonts/generalSans.ttf',
  variable: '--font-generalSans',
  weight: '300 400 500 600 700',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NAAMII',
  description: 'NAAMII',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${generalSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
