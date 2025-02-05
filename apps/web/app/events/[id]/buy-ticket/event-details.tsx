'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MainNavToken } from '@/components/main-nav-after-token';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
};

interface EventDetailsProps {
  event: Event;
}

interface CustomJWTPayload extends JwtPayload {}

export const EventDetails = ({ event }: EventDetailsProps) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number.parseInt(e.target.value) || 1);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  const handlePurchase = async () => {
    const token = Cookies.get('token');
    const user = jwt.decode(token as string, process.env.JWT_SECRET as any) as unknown as CustomJWTPayload;

    try {
      const response = await fetch(
        'http://localhost:5000/api/events/buy-ticket',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: event.id,
            userId: user?.id,
            quantity,
          }),
        },
      );

      if (response.ok) {
        const ticketPurchase = await response.json();
        console.log('Ticket Purchase Successful:', ticketPurchase);
        router.push('/transactions');
      } else {
        console.error(
          'Failed to purchase ticket:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error purchasing ticket:', error);
    }
  };

  const dateObject = new Date(event.date);
  const timeObject = new Date(`1970-01-01T${event.time}`);

  return (
    <div className="min-h-screen bg-background">
      <MainNavToken
        onSearch={function (searchTerm: string): void {
          // Implement the search function or remove this if not needed
        }}
      />
      <div className="py-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Detail Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="event">Event</Label>
                <Input id="event" value={event.title} disabled />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" value={dateObject.toDateString()} disabled />
              </div>
              <div>
                <Label htmlFor="date">Time</Label>
                <Input
                  id="date"
                  value={timeObject.toTimeString().split(' ')[0]}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={event.location} disabled />
              </div>
              <div>
                <Label htmlFor="price">Price per Ticket</Label>
                <Input
                  id="price"
                  value={new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(Number(event.price))}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <div>
                <Label htmlFor="total">Total Price</Label>
                <Input
                  id="total"
                  value={new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(Number(event.price * quantity))}
                  disabled
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handlePurchase} className="w-full border">
              Confirm Purchase
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
