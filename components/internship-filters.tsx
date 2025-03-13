"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function InternshipFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [year, setYear] = useState<string>(searchParams.get("year") || "")
  const [type, setType] = useState<string>(searchParams.get("type") || "")
  const [duration, setDuration] = useState<number[]>([
    Number.parseInt(searchParams.get("minDuration") || "1"),
    Number.parseInt(searchParams.get("maxDuration") || "6"),
  ])
  const [canRefer, setCanRefer] = useState<boolean>(searchParams.get("canRefer") === "true")

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams)

    if (year) {
      params.set("year", year)
    } else {
      params.delete("year")
    }

    if (type) {
      params.set("type", type)
    } else {
      params.delete("type")
    }

    params.set("minDuration", duration[0].toString())
    params.set("maxDuration", duration[1].toString())

    if (canRefer) {
      params.set("canRefer", "true")
    } else {
      params.delete("canRefer")
    }

    router.push(`/internships?${params.toString()}`)
  }

  const handleReset = () => {
    setYear("")
    setType("")
    setDuration([1, 6])
    setCanRefer(false)
    router.push("/internships")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="year">Année académique</Label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger id="year">
              <SelectValue placeholder="Sélectionner l'année" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type de stage</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Sélectionner le type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1A">1A</SelectItem>
              <SelectItem value="2A">2A</SelectItem>
              <SelectItem value="3A">3A</SelectItem>
              <SelectItem value="Césure">Césure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Durée (mois)</Label>
          <Slider value={duration} min={1} max={12} step={1} onValueChange={setDuration} />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{duration[0]} mois</span>
            <span>{duration[1]} mois</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="canRefer" checked={canRefer} onCheckedChange={(checked) => setCanRefer(checked as boolean)} />
          <Label htmlFor="canRefer">Peut pistonner</Label>
        </div>

        <div className="space-y-2 pt-2">
          <Button onClick={handleApplyFilters} className="w-full">
            Appliquer les filtres
          </Button>
          <Button onClick={handleReset} variant="outline" className="w-full">
            Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

