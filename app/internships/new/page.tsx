import { NewInternshipForm } from "@/components/new-internship-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewInternshipPage() {
  const user = await auth();
  if (!user) {
    redirect("/auth/signin");
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Déclarer votre stage</h1>
      <p className="text-muted-foreground mb-8">
        Partagez votre expérience de stage pour aider les futurs étudiants de
        l'ENSEEIHT à trouver des opportunités.
      </p>

      <NewInternshipForm />
    </div>
  );
}
