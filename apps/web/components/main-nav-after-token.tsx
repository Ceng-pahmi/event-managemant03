'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Calendar } from 'lucide-react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface MainNavTokenProps {
  onSearch: (searchTerm: string) => void; // Ensure onSearch is defined
}

export const MainNavToken: React.FC<MainNavTokenProps> = ({ onSearch }) => {
  const router = useRouter();

  const handleSignOut = () => {
    Cookies.remove('token');
    router.push('/');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between max-w-full">
        <div className="mr-8 flex items-center space-x-2">
          <Calendar className="h-9 w-10" />
          <span className="hidden font-bold sm:inline-block text-orange-600">
            <Link href="/">EventHub</Link>
          </span>
        </div>
        <nav className="flex flex-1 items-center space-x-7 text-sm font-medium">
          <Link
            href="/events"
            className="transition-colors hover:text-foreground/80"
          >
            Events
          </Link>
          <Link
            href="/help"
            className="transition-colors hover:text-foreground/80"
          >
            Help Center
          </Link>
          <div className="grid gap-4 md:grid-cols-[1fr,auto,auto] items-end"></div>
        </nav>
        <div className="flex items-center space-x-4 ml-auto">
          <Button onClick={handleProfile}>User Profile</Button>
          <Button variant="ghost" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};
