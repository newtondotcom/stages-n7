import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  Building,
  User,
  Mail,
  GraduationCap,
} from "lucide-react";
import { getInternshipById } from "@/lib/internships";
import { ContactInternForm } from "@/components/contact-intern-form";
import { auth } from "@/lib/auth";

interface InternshipDetailPageProps {
  params: {
    id: string;
  };
}

export default async function InternshipDetailPage({
  params,
}: InternshipDetailPageProps) {
  const user = await auth();
  if (!user) {
    redirect("/auth/signin");
  }

  const internship = await getInternshipById(params.id);

  if (!internship) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/internships"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Retour aux stages
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{internship.subject}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">
              <Building className="h-3.5 w-3.5 mr-1" />
              {internship.company}
            </Badge>
            <Badge variant="outline">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {internship.location}
            </Badge>
            <Badge variant="outline">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {internship.year}
            </Badge>
            <Badge variant="outline">
              <GraduationCap className="h-3.5 w-3.5 mr-1" />
              {internship.type || "3A"}
            </Badge>
          </div>
        </div>

        <Badge
          variant={internship.canRefer ? "default" : "secondary"}
          className="text-sm py-1 px-3"
        >
          {internship.canRefer ? "Peut pistonner" : "Sans piston"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Détails du stage</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Durée
                </h3>
                <p>{internship.duration} mois</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Missions
                </h3>
                <p className="whitespace-pre-line">{internship.missions}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Tuteur
                </h3>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{internship.tutor}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Expérience de l'étudiant
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2 mt-1">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{internship.student.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {internship.student.department} • Promotion{" "}
                    {internship.student.graduationYear}
                  </p>
                </div>
              </div>

              {internship.studentFeedback && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Retour d'expérience
                  </h3>
                  <p className="whitespace-pre-line">
                    {internship.studentFeedback}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Contacter l'étudiant</h2>

            {internship.canRefer ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Cet étudiant est prêt à recommander de nouveaux étudiants pour
                  ce stage. Remplissez le formulaire ci-dessous pour le
                  contacter.
                </p>
                <ContactInternForm internshipId={internship.id} />
              </div>
            ) : (
              <div className="text-center py-4">
                <Mail className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Cet étudiant ne propose pas actuellement de recommandations
                  pour ce stage.
                </p>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Stages similaires</h2>

            {internship.similarInternships &&
            internship.similarInternships.length > 0 ? (
              <div className="space-y-3">
                {internship.similarInternships.map((similar) => (
                  <Link
                    key={similar.id}
                    href={`/internships/${similar.id}`}
                    className="block p-3 border rounded-md hover:bg-muted transition-colors"
                  >
                    <p className="font-medium line-clamp-1">
                      {similar.subject}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>{similar.company}</span>
                      <span>•</span>
                      <span>{similar.year}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-2">
                Aucun stage similaire trouvé.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
