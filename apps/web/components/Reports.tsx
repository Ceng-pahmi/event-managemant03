"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type ReportData = {
  date: string
  attendees: number
  revenue: number
}

const mockData: Record<string, ReportData[]> = {
  year: [
    { date: "2023", attendees: 5000, revenue: 300000 },
    { date: "2024", attendees: 7500, revenue: 450000 },
  ],
  month: [
    { date: "Jan", attendees: 400, revenue: 24000 },
    { date: "Feb", attendees: 300, revenue: 18000 },
    { date: "Mar", attendees: 200, revenue: 12000 },
    { date: "Apr", attendees: 278, revenue: 16680 },
    { date: "May", attendees: 189, revenue: 11340 },
    { date: "Jun", attendees: 239, revenue: 14340 },
  ],
  day: [
    { date: "01", attendees: 50, revenue: 3000 },
    { date: "02", attendees: 40, revenue: 2400 },
    { date: "03", attendees: 60, revenue: 3600 },
    { date: "04", attendees: 45, revenue: 2700 },
    { date: "05", attendees: 55, revenue: 3300 },
  ],
}

export default function Reports() {
  const [range, setRange] = useState("month")

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="year">Per Year</SelectItem>
            <SelectItem value="month">Per Month</SelectItem>
            <SelectItem value="day">Per Day</SelectItem>
          </SelectContent>
        </Select>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData[range]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="attendees" stroke="#8884d8" name="Attendees" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue (IDR)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

