"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type StatData = {
  name: string
  attendees: number
  revenue: number
}

export default function EventStatistics() {
  const [data, setData] = useState<StatData[]>([])
  const [timeRange, setTimeRange] = useState("month")

  useEffect(() => {
    // Fetch statistics data from API based on timeRange
    // This is a mock implementation
    const mockData: StatData[] = [
      { name: "Event 1", attendees: 400, revenue: 24000000 },
      { name: "Event 2", attendees: 300, revenue: 18000000 },
      { name: "Event 3", attendees: 200, revenue: 12000000 },
      { name: "Event 4", attendees: 278, revenue: 16680000 },
      { name: "Event 5", attendees: 189, revenue: 11340000 },
    ]
    setData(mockData)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
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

