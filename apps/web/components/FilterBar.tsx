"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Updated import path

export default function FilterBar() {
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="music">Music</SelectItem>
          <SelectItem value="sports">Sports</SelectItem>
          <SelectItem value="arts">Arts</SelectItem>
          <SelectItem value="food">Food</SelectItem>
          <SelectItem value="technology">Technology</SelectItem>
        </SelectContent>
      </Select>
      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="jakarta">Jakarta</SelectItem>
          <SelectItem value="surabaya">Surabaya</SelectItem>
          <SelectItem value="bandung">Bandung</SelectItem>
          <SelectItem value="bali">Bali</SelectItem>
          <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
