import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, GraduationCap } from "lucide-react"

interface DashboardInternshipsProps {
  internships: any[]
}

export function DashboardInternships({ internships }: DashboardInternshipsProps) {
  if (internships.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground mb-4">Vous n'avez pas encore déclaré de stage.</p>
          <Button asChild>
            <Link href="/internships/new">Déclarer un stage</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Vos stages</h2>
        <Button asChild>
          <Link href="/internships/new">Ajouter</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((internship) => (
          <Card key={internship.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="line-clamp-2">{internship.subject}</CardTitle>
                <Badge variant={internship.canRefer ? "default" : "secondary"}>
                  {internship.canRefer ? "Peut pistonner" : "Sans piston"}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{internship.location}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {internship.duration} mois • {internship.year}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>Stage {internship.type || "3A"}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{internship.company}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline" size="sm">
                <Link href={`/internships/${internship.id}`}>Voir</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/internships/${internship.id}/edit`}>Modifier</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

