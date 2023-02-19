'use client';
import { Poppins } from '@next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const poppins = Poppins({
  variable: '--font-poppins',
  display: 'swap',
  subsets: ['devanagari'],
  weight: ['200', '400', '600'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} `}>
      <body>
        <main className="font-sans ">
          <SessionProvider>{children}</SessionProvider>
        </main>
      </body>
    </html>
  );
}
