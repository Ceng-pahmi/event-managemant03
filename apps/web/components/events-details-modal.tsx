import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventDetailsModalProps {
  event: {
    slug: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    price: string;
    attendees: number;
    image: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailsModal({
  event,
  isOpen,
  onClose,
}: EventDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>Event Details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-[16px,1fr] items-start gap-4">
            <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground" />
            <div>
              <p className="font-medium">{event.date}</p>
              <p className="text-sm text-muted-foreground">{event.time}</p>
            </div>
          </div>
          <div className="grid grid-cols-[16px,1fr] items-start gap-4">
            <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
            <p>{event.location}</p>
          </div>
          <div className="grid grid-cols-[16px,1fr] items-start gap-4">
            <Users className="w-4 h-4 mt-0.5 text-muted-foreground" />
            <p>{event.attendees} attendees</p>
          </div>
          <p className="text-sm text-muted-foreground">{event.description}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">{event.price}</p>
          <Button asChild>
            <Link href={`/events/${event.slug}/book`}>Book Now</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
