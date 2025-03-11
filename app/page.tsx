import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { InternshipCard } from "@/components/internship-card"
import { getLatestInternships } from "@/lib/internships"

export default async function Home() {
  const latestInternships = await getLatestInternships(5)

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">ENSEEIHT Internship Platform</h1>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Discover, share, and connect with internship opportunities for ENSEEIHT students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link href="/internships/new">Declare Your Internship</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/internships">
                <Search className="mr-2 h-4 w-4" />
                Browse Internships
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Internships</h2>
          <Button asChild variant="ghost">
            <Link href="/internships">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestInternships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </section>

      <section className="py-8 md:py-12 bg-muted rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Share Your Experience</h3>
            <p className="text-muted-foreground">Document your internship details to help future students.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Find Opportunities</h3>
            <p className="text-muted-foreground">Search through past internships to discover potential placements.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Connect & Refer</h3>
            <p className="text-muted-foreground">
              "Pistonner" new students by referring them to your previous internship.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

