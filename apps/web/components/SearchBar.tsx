"use client"

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { debounce } from "lodash"
import type React from "react" // Added import for React

export default function SearchBar() {
  const [search, setSearch] = useState("")

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      // Implement the search logic here
      console.log("Searching for:", searchTerm)
    }, 300),
    [],
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    debouncedSearch(e.target.value)
  }

  return (
    <div className="relative">
      <Input type="text" placeholder="Search events..." value={search} onChange={handleSearch} className="pl-10" />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  )
}

