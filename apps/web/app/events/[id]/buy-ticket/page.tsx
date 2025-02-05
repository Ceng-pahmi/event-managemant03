import { Suspense } from 'react';
import { EventDetails } from './event-details';

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
};

const fetchEvent = async (id: number): Promise<Event> => {
  const response = await fetch(`http://localhost:5000/api/events/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  return response.json();
};

export const generateStaticParams = async () => {
  const response = await fetch('http://localhost:5000/api/events');
  const events: Event[] = await response.json();
  return events.map((event) => ({
    id: event.id.toString(),
  }));
};

const BuyTicketPage = async ({ params }: { params: Promise<{ id: number }> }) => {

  const { id } = await params

  const event = await fetchEvent((await params).id);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails event={event} />
      </Suspense>
    </div>
  );
};

export default BuyTicketPage;
