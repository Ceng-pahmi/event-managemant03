"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreatePromotion() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    eventId: "",
    discountType: "percentage",
    discountValue: "",
    maxUses: "",
    expirationDate: "",
    referralCode: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, discountType: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement promotion creation logic here
    console.log("Promotion data:", formData)
    // After successful creation, redirect to the events page
    router.push("/events")
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Promotion</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="eventId">Event ID</Label>
              <Input id="eventId" name="eventId" value={formData.eventId} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="discountType">Discount Type</Label>
              <Select value={formData.discountType} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="discountValue">Discount Value</Label>
              <Input
                id="discountValue"
                name="discountValue"
                type="number"
                value={formData.discountValue}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="maxUses">Maximum Uses</Label>
              <Input
                id="maxUses"
                name="maxUses"
                type="number"
                value={formData.maxUses}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <Input
                id="expirationDate"
                name="expirationDate"
                type="date"
                value={formData.expirationDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="referralCode">Referral Code (optional)</Label>
              <Input id="referralCode" name="referralCode" value={formData.referralCode} onChange={handleChange} />
            </div>
          </div>
          <CardFooter className="flex justify-end mt-6">
            <Button type="submit">Create Promotion</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

