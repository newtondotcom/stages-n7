import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { DummyInternships } from "@/components/dummy-internships"

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            <span className="text-primary"> ENSEEIHT </span>
            Plateforme de Stages
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Découvrez, partagez et connectez-vous avec des opportunités de stage pour les étudiants de l'ENSEEIHT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link href="/internships/new">Déclarer votre stage</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/internships">
                <Search className="mr-2 h-4 w-4" />
                Explorer les stages
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Derniers stages</h2>
          <Button asChild variant="ghost">
            <Link href="/internships">Voir tous</Link>
          </Button>
        </div>
        <DummyInternships />
      </section>

      <section className="py-8 md:py-12 bg-muted rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Comment ça
          <span className="text-primary"> fonctionne</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Partagez votre expérience</h3>
            <p className="text-muted-foreground">
              Documentez les détails de votre stage pour aider les futurs étudiants.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Trouvez des opportunités</h3>
            <p className="text-muted-foreground">
              Recherchez parmi les stages passés pour découvrir des placements potentiels.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Connectez & Référez</h3>
            <p className="text-muted-foreground">
              Peut-être que l'étudiant peut vous recommander auprès d'une entreprise où il a effectué son stage.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

