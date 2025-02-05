"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PointsAndPrizes() {
  const [points, setPoints] = useState(0)
  const [expiryDate, setExpiryDate] = useState("")

  useEffect(() => {
    // Fetch points data from API
    // This is a mock implementation
    setPoints(30000)
    setExpiryDate("March 28, 2024")
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Points and Prizes</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{points.toLocaleString()} points</p>
        <p className="text-sm text-gray-500">Available until {expiryDate}</p>
        <div className="mt-4">
          <h3 className="font-semibold">How it works:</h3>
          <ul className="list-disc list-inside text-sm">
            <li>Earn 10,000 points for each referral</li>
            <li>Points expire after 3 months</li>
            <li>Use points to reduce ticket prices</li>
            <li>Referral users get 10% discount for 3 months</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

