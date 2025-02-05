"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type StatData = {
  name: string
  attendees: number
  revenue: number
}

export default function Statistics() {
  const [data, setData] = useState<StatData[]>([])

  useEffect(() => {
    // Fetch statistics data from API
    // This is a mock implementation
    setData([
      { name: "Jan", attendees: 400, revenue: 24000 },
      { name: "Feb", attendees: 300, revenue: 18000 },
      { name: "Mar", attendees: 200, revenue: 12000 },
      { name: "Apr", attendees: 278, revenue: 16680 },
      { name: "May", attendees: 189, revenue: 11340 },
      { name: "Jun", attendees: 239, revenue: 14340 },
    ])
  }, [])

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Event Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="attendees" fill="#8884d8" name="Attendees" />
            <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue (IDR)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

