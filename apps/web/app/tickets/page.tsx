import { Footer } from '../../components/footer';
import { MainNav } from '../../components/main-nav';
import { Button } from '../../components/ui/button';
import { CalendarIcon, MapPinIcon } from 'lucide-react';

const tickets = [
  {
    eventName: "WHISKY LIVE JAKARTA 2025",
    date: "01 Feb - 02 Feb 2025",
    location: "Four Seasons Hotel Ballroom, Jakarta",
    ticketType: "General Admission",
    ticketId: "SBF2024-GA-001"
  },
  {
    eventName: "Tech Innovation Summit",
    date: "September 10, 2024",
    location: "Convention Center",
    ticketType: "VIP Access",
    ticketId: "TIS2024-VIP-002"
  },
  {
    eventName: " Tech Innovation Summit",
    date: "September 10, 2024",
    location: "Convention Center",
    ticketType: "VIP Access",
    ticketId: "TIS2024-VIP-002"
  },
];

export default function TicketsPage() {
  
  return (
    <div>
      <MainNav  />
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Tickets</h1>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              className="rounded-lg border p-4 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{ticket.eventName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {ticket.ticketType}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {ticket.date}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  {ticket.location}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Ticket ID: {ticket.ticketId}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
