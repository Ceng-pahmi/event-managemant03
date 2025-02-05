'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Calendar } from 'lucide-react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface MainNavProps {
  onAuthClick: () => void;
  isLoggedIn: boolean;
}

export function MainNav({ onAuthClick, isLoggedIn }: MainNavProps) {
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);

  const handleProfileClick = () => {
    setProfilePopupOpen(true);
  };

  const handleClosePopup = () => {
    setProfilePopupOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between max-w-full">
        <div className="mr-8 flex items-center space-x-2">
          <Calendar className="h-9 w-10" />
          <span className="hidden font-bold sm:inline-block">
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
            href="/CreateEvent"
            className="transition-colors hover:text-foreground/80"
          >
            Create Event
          </Link>
          <Link
            href="/help"
            className="transition-colors hover:text-foreground/80"
          >
            Help Center
          </Link>
          <Link
            href="/tickets"
            className="transition-colors hover:text-foreground/80"
          >
            Find My Tickets
          </Link>
          <div className="grid gap-4 md:grid-cols-[1fr,auto,auto] items-end">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-9" />
            </div>
          </div>
        </nav>
        <div className="flex items-center space-x-4 ml-auto">
          <Button variant="ghost" onClick={onAuthClick}>
            Sign In
          </Button>
          <Button onClick={onAuthClick}>Get Started</Button>
        </div>
      </div>
    </header>
  );
}
