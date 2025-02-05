"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type ReviewFormProps = {
  eventId: number
}

export default function ReviewForm({ eventId }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement review submission logic here
    console.log("Review data:", { eventId, ...formData })
    // Clear form after submission
    setFormData({ rating: "", comment: "" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="comment">Comment</Label>
              <Textarea id="comment" name="comment" value={formData.comment} onChange={handleChange} required />
            </div>
          </div>
          <CardFooter className="flex justify-end mt-6">
            <Button type="submit">Submit Review</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

