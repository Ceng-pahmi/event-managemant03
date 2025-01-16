"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Search, Ticket, Users, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AuthDialog } from "@/components/auth-dialog";
import { MainNav } from "@/components/main-nav";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MainNav onAuthClick={() => setIsAuthOpen(true)} />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&h=1200&fit=crop"
            alt="Hero background"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Amazing Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Join thousands of people discovering unique events every day. Find your next unforgettable experience.
          </p>
          <div className="flex gap-4">
            <Button size="lg" onClick={() => setIsAuthOpen(true)}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10">
              Browse Events
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <Ticket className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-muted-foreground">
                Book tickets in seconds with our simple booking system
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Trusted Community</h3>
              <p className="text-muted-foreground">
                Join a community of event enthusiasts and organizers
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Curated Events</h3>
              <p className="text-muted-foreground">
                Discover hand-picked events that match your interests
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <Button variant="outline">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1540575467063-178a50c2df87' : i === 2 ? '1523580494863-6f3031224c94' : '1475721027785-f74eccf877e2'}?q=80&w=1000&h=600&fit=crop`}
                  alt={`Event ${i}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Apr 15, 2024</span>
                    <MapPin className="w-4 h-4 ml-2" />
                    <span>Jakarta</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Tech Innovation Summit 2024</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    Join industry leaders for a day of innovation and networking
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Rp 1.500.000</span>
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community and discover amazing events happening around you.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setIsAuthOpen(true)}
          >
            Sign Up Now
          </Button>
        </div>
      </section>

      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </div>
  );
}