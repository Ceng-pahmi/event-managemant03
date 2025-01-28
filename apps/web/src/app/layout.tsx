'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const htmlElement = document.documentElement;

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    };

    darkModeMediaQuery.addEventListener('change', handleChange);
    
    // Initial check
    if (darkModeMediaQuery.matches) {
      htmlElement.classList.add('dark'); 
    } else {
      htmlElement.classList.remove('dark');
    }

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
