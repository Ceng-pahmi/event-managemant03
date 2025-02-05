'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventStatistics from '@/components/EventStatistics';
import { TransactionList } from '@/components/TransactionList';
import Cookies from 'js-cookie';
import { MainNavToken } from '@/components/main-nav-after-token';

type Transaction = {
  id: number;
  eventName: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'refunded';
  customerName: string;
  customerEmail: string;
};

export default function OrganizerDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [eventOrganizer, setEventOrganizer] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState(searchParams.get('filter') || 'all');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'date');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      const url = 'http://localhost:5000/api/users/user';

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch event organizer data');
        }
        const data = await response.json();
        setEventOrganizer(data.data);
        if (data.data.role !== 'EventOrganizer') {
          router.push('/profile');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [router]);

  if (!eventOrganizer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background my">
      <MainNavToken
        onSearch={function (searchTerm: string): void {
          throw new Error('Function not implemented.');
        }}
      />
      <h1 className="text-3xl font-bold py-8">Event Organizer Dashboard</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            Welcome,{' '}
            {eventOrganizer.first_name + ' ' + eventOrganizer.last_name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button asChild variant="outline">
              <Link href="/CreateEvent">Create New Event</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/create-promotion">Create Promotion</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="events">
        <TabsList>
          <TabsTrigger value="events">My Events</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="events">{/*  */}</TabsContent>
        <TabsContent value="statistics">
          <EventStatistics />
        </TabsContent>
        <TabsContent value="transactions">
          <div className="flex items-center justify-center text-orange-600 text-xl hover:text-orange-300">
            <Link href="/transactions">Click for see purchased tickets</Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
