"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface MainNavProps {
  onAuthClick: () => void;
}

export function MainNav({ onAuthClick }: MainNavProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center space-x-2">
          <Calendar className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            EventHub
          </span>
        </div>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-foreground/80">
            Home
          </Link>
          <Link href="/events" className="transition-colors hover:text-foreground/80">
            Events
          </Link>
          <Link href="/organizers" className="transition-colors hover:text-foreground/80">
            Organizers
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground/80">
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onAuthClick}>
            Sign In
          </Button>
          <Button onClick={onAuthClick}>
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}