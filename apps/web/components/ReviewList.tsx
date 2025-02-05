"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Review = {
  id: number
  rating: number
  comment: string
  userName: string
}

type ReviewListProps = {
  eventId: number
}

export default function ReviewList({ eventId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    // Fetch reviews from API
    // This is a mock implementation
    const mockReviews: Review[] = [
      { id: 1, rating: 5, comment: "Amazing event! Can't wait for the next one.", userName: "John Doe" },
      {
        id: 2,
        rating: 4,
        comment: "Great experience overall. Could improve on the sound system.",
        userName: "Jane Smith",
      },
      { id: 3, rating: 5, comment: "Absolutely fantastic! The lineup was incredible.", userName: "Bob Johnson" },
    ]
    setReviews(mockReviews)
  }, [])

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader>
            <CardTitle>Rating: {review.rating}/5</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{review.comment}</p>
            <p className="text-sm text-gray-500 mt-2">- {review.userName}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

