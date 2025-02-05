'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { AuthDialog } from '../components/auth-dialog';
import { MainNav } from '../components/main-nav';
import { MainNavToken } from '../components/main-nav-after-token';
import { Footer } from '../components/footer';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../components/ui/carousel';
import { Calendar, MapPin, Ticket, Users } from 'lucide-react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
  description: string;
}

const Home = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialToken, setInitialToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // State for error handling

  const url = 'http://localhost:5000/api/events';

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token') || null;
    setInitialToken(token);
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEventsData(data);
      } catch (error) {
        setError((error as Error).message); // Set the error message to state
      }
    };

    fetchEvents();
  }, []);

  const handleAuthClick = () => {
    Cookies.remove('token'); // Clear the token
    setIsLoggedIn(false); // Update the logged-in state
    setIsAuthOpen(false);
    redirect('http://localhost:3000');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {isLoggedIn ? (
        <MainNavToken onSearch={function (searchTerm: string): void {
          throw new Error('Function not implemented.');
        } }  />
      ) : (
        <MainNav
          onAuthClick={() => setIsAuthOpen(true)}
          isLoggedIn={isLoggedIn}
        />
      )}

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&h=1200&fit=crop"
            alt="Hero background"
            width={500}
            height={500}
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Amazing Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Join thousands of people discovering unique events every day. Find
            your next unforgettable experience.
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10"
              onClick={() => setIsAuthOpen(true)}
            >
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10">
              Browser Event
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
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
          </div>
          <Carousel>
            <CarouselContent>
              {eventsData.map((event) => (
                <CarouselItem
                  key={event.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={event.image}
                    alt={`Event ${event}`}
                    width={5000}
                    height={5000}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date.split('T')[0]}</span>
                      <MapPin className="w-4 h-4 ml-2" />
                      <span>{event.location}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(Number(event.price))}
                      </span>
                      <Button variant="outline">
                        <Link href={`/events/${event.id}/Book`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Events List Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventsData.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date.split('T')[0]}</span>
                    <MapPin className="w-4 h-4 ml-2" />
                    <span>{event.location}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(Number(event.price))}
                    </span>
                    <Button variant="outline">
                      <Link href={`/events/${event.id}/Book`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2">
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
      <Footer />
    </div>
  );
};

export default Home;
