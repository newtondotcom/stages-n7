import { NewInternshipForm } from "@/components/new-internship-form"

export default function NewInternshipPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Declare Your Internship</h1>
      <p className="text-muted-foreground mb-8">
        Share your internship experience to help future ENSEEIHT students find opportunities.
      </p>

      <NewInternshipForm />
    </div>
  )
}

