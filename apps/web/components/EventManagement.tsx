"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import Link from "next/link"

type Event = {
  id: number
  name: string
  date: string
  attendees: number
}

export default function EventManagement() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    // Fetch events data from API
    // This is a mock implementation
    setEvents([
      { id: 1, name: "Summer Music Festival", date: "2023-07-15", attendees: 5000 },
      { id: 2, name: "Tech Conference 2023", date: "2023-09-22", attendees: 1200 },
      { id: 3, name: "Food and Wine Expo", date: "2023-11-05", attendees: 3500 },
    ])
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Button asChild className="mb-4">
          <Link href="/create-event">Create New Event</Link>
        </Button>
        <ul className="divide-y">
          {events.map((event) => (
            <li key={event.id} className="py-2">
              <h3 className="font-semibold">{event.name}</h3>
              <p className="text-sm text-gray-500">Date: {event.date}</p>
              <p className="text-sm text-gray-500">Attendees: {event.attendees}</p>
              <div className="mt-2">
                <Button variant="outline" size="sm" asChild className="mr-2">
                  <Link href={`/edit-event/${event.id}`}>Edit</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/event-details/${event.id}`}>View Details</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

