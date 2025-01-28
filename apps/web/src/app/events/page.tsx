"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { EventDetailsModal } from "../../components/events-details-modal";
import { MainNav } from "@/components/main-nav";

interface Event {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string; // Keep this as string for now
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

  const url = "http://localhost:5000/api/events";

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

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleAuthClick = () => {
    console.log("Auth button clicked");
  };


  return (
    <div className="min-h-screen bg-background">
      <MainNav onAuthClick={handleAuthClick} />
      <div className="bg-primary/5 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Discover Amazing Events</h1>
          <div className="grid gap-4 md:grid-cols-[1fr,auto,auto] items-end">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-9" />
            </div>
            <Select defaultValue="all">
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
          {events.map((event) => {
            console.log("Event Image URL:", event.image); // Log the image URL
            return (
              <div
                key={event.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/9] relative">
                  <Image
                    src={event.image ? event.image : "/placeholder.svg"} // Fallback to placeholder
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
                    <span className="font-semibold">Rp {event.price}</span>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedEvent(event)}
                      >
                        View Details
                      </Button>
                      <Button variant="default" size="sm" asChild>
                        <Link href={`/events/${event.slug}/book`}>
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
