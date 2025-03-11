"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function InternshipSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set("q", query)
    } else {
      params.delete("q")
    }

    router.push(`/internships?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-3xl mx-auto gap-2">
      <Input
        type="text"
        placeholder="Search by company, location, subject..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  )
}

