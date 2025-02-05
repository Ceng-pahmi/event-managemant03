'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { EventDetailsModal } from '../../components/events-details-modal';
import { MainNavToken } from '@/components/main-nav-after-token';
import { useRouter } from 'next/navigation';

interface Event {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
  featured: boolean;
  description: string;
  attendees: number;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('all');

  const url = 'http://localhost:5000/api/events';

  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents =
    category === 'all'
      ? events
      : events.filter((event) => event.category === category);

  const handleSearch = (searchTerm: string) => {
    // Implement search functionality here
    // For example, filter events based on the search term
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-2xl">
        Loading events...
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-background">
      <MainNavToken onSearch={handleSearch} />
      <div className="bg-primary/5 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Discover Amazing Events</h1>
          <div className="grid gap-4 md:grid-cols-[1fr,auto,auto] items-end">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-9" />
            </div>
            <Select defaultValue="all" onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-stone-800">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="exhibition">Exhibition</SelectItem>
                <SelectItem value="concert">Concert</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => {
            return (
              <div
                key={event.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/9] relative">
                  <Image
                    src={event.image ? event.image : '/placeholder.svg'}
                    alt={event.title}
                    layout="responsive"
                    width={500}
                    height={300}
                  />
                  {event.featured && (
                    <div className="absolute top-2 left-2 bg-primary px-2 py-1 rounded text-xs text-primary-foreground">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toDateString()}</span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(Number(event.price))}
                    </span>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedEvent(event)}
                      >
                        View Details
                      </Button>
                      <Button variant="default" size="sm" asChild>
                        <Link href={`/events/${event.id}/buy-ticket`}>
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Load More Events
          </Button>
        </div>
      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
