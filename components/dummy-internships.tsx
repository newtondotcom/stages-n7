"use client"
import { InternshipCard } from "@/components/internship-card"
import type { Internship, User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

const dummyUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    department: "Computer Science",
    graduationYear: "2023",
  },
]

const internships: Internship[] = [
  {
    id: "1",
    company: "Airbus",
    location: "Toulouse, France",
    subject: "Développement d'un algorithme d'apprentissage automatique pour la prédiction de maintenance d'aéronefs",
    missions:
      "Développer et implémenter des modèles d'IA pour prédire les besoins de maintenance basés sur les données des capteurs.\n\n- Analyser les données historiques de maintenance et identifier des modèles\n- Concevoir et entraîner des modèles d'apprentissage automatique\n- Implémenter un système prototype pour la prédiction en temps réel\n- Valider le modèle avec des données de test\n- Documenter la solution et présenter les résultats aux parties prenantes",
    tutor: "Jean Dupont",
    duration: 6,
    year: "2023",
    type: "3A",
    canRefer: true,
    isPublic: true,
    studentFeedback:
      "Ce stage a été une excellente expérience d'apprentissage. J'ai eu l'opportunité de travailler avec des technologies de pointe et une équipe solidaire. L'entreprise a un bon équilibre travail-vie personnelle et les projets étaient stimulants mais gratifiants.",
    student: dummyUsers[0],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "2",
    company: "Thales",
    location: "Paris, France",
    subject: "Implémentation d'un protocole de communication sécurisé pour les appareils IoT",
    missions:
      "Concevoir et implémenter un protocole de chiffrement léger pour les appareils IoT à ressources limitées.\n\n- Rechercher les protocoles de sécurité existants pour l'IoT\n- Concevoir une solution de chiffrement légère\n- Implémenter le protocole sur des appareils de test\n- Effectuer une analyse de sécurité et des tests de pénétration\n- Optimiser les performances sur des appareils à faible consommation",
    tutor: "Marie Lefevre",
    duration: 4,
    year: "2023",
    type: "3A",
    canRefer: false,
    isPublic: true,
    studentFeedback:
      "Travailler chez Thales a été une excellente opportunité d'appliquer mes connaissances théoriques dans un cadre pratique. L'équipe était très compétente et j'ai beaucoup appris sur la sécurité dans les environnements IoT.",
    student: dummyUsers[0],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "3",
    company: "EDF",
    location: "Lyon, France",
    subject: "Optimisation des réseaux de distribution d'énergie à l'aide d'algorithmes de graphes",
    missions:
      "Développer des algorithmes pour optimiser le flux d'énergie dans les réseaux de distribution afin de minimiser les pertes.\n\n- Modéliser le réseau de distribution d'énergie sous forme de graphe\n- Implémenter divers algorithmes d'optimisation\n- Analyser les performances et les économies d'énergie\n- Créer des outils de visualisation pour les opérateurs de réseau\n- Documenter les résultats et les recommandations",
    tutor: "Pierre Dubois",
    duration: 5,
    year: "2022",
    type: "2A",
    canRefer: true,
    isPublic: true,
    studentFeedback:
      "EDF a fourni un environnement stimulant pour travailler sur des problèmes énergétiques réels. Le stage m'a donné des informations précieuses sur le secteur de l'énergie et m'a permis d'appliquer mes connaissances en algorithmes à des défis pratiques.",
    student: dummyUsers[0],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "4",
    company: "Capgemini",
    location: "Bordeaux, France",
    subject: "Développement d'une application web pour la gestion de projets",
    missions:
      "Concevoir et implémenter une application web full-stack pour la gestion de projets internes.\n\n- Recueillir les besoins des parties prenantes\n- Concevoir le schéma de base de données et l'API\n- Implémenter le frontend avec React\n- Développer des services backend avec Node.js\n- Déployer et tester l'application",
    tutor: "Luc Moreau",
    duration: 3,
    year: "2023",
    type: "1A",
    canRefer: true,
    isPublic: true,
    studentFeedback:
      "Le stage chez Capgemini était très pratique. On m'a confié des responsabilités importantes et j'ai pu contribuer de manière significative au projet. L'équipe était solidaire et j'ai considérablement amélioré mes compétences en développement full-stack.",
    student: dummyUsers[0],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-02"),
  },
]

export function DummyInternships() {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 blur-sm">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>

      <div className="absolute inset-0 flex justify-center items-center">
        <Button
          className="blur-0"
          variant="outline"
          onClick={() => signIn("authentik", { callbackUrl: "/internships" })}
        >
          Vous devez être connecté pour voir les stages publiés
        </Button>
      </div>
    </div>
  )
}

