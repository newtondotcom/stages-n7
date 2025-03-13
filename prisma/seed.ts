import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting database seeding...")

  // First, clean up existing data if needed
  await prisma.message.deleteMany({})
  await prisma.internship.deleteMany({})
  await prisma.user.deleteMany({})

  console.log("Creating users...")

  // Create users (students)
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Sophie Martin",
        email: "sophie.martin@etu.enseeiht.fr",
        department: "Informatique",
        graduationYear: "2024",
      },
    }),
    prisma.user.create({
      data: {
        name: "Thomas Bernard",
        email: "thomas.bernard@etu.enseeiht.fr",
        department: "Électronique",
        graduationYear: "2023",
      },
    }),
    prisma.user.create({
      data: {
        name: "Emma Petit",
        email: "emma.petit@etu.enseeiht.fr",
        department: "Génie Électrique",
        graduationYear: "2023",
      },
    }),
    prisma.user.create({
      data: {
        name: "Lucas Roux",
        email: "lucas.roux@etu.enseeiht.fr",
        department: "Informatique",
        graduationYear: "2024",
      },
    }),
    prisma.user.create({
      data: {
        name: "Antoine Leroy",
        email: "antoine.leroy@etu.enseeiht.fr",
        department: "Génie Mécanique",
        graduationYear: "2023",
      },
    }),
    prisma.user.create({
      data: {
        name: "Julie Dubois",
        email: "julie.dubois@etu.enseeiht.fr",
        department: "Hydraulique",
        graduationYear: "2022",
      },
    }),
    prisma.user.create({
      data: {
        name: "Maxime Girard",
        email: "maxime.girard@etu.enseeiht.fr",
        department: "Télécommunications",
        graduationYear: "2024",
      },
    }),
  ])

  console.log(`Created ${users.length} users`)

  console.log("Creating internships...")

  // Create internships
  const internships = [
    {
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
      studentId: users[0].id,
    },
    {
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
      studentId: users[1].id,
    },
    {
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
      studentId: users[2].id,
    },
    {
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
      studentId: users[3].id,
    },
    {
      company: "Safran",
      location: "Toulouse, France",
      subject: "Simulation de dynamique des fluides pour les composants de moteurs d'avion",
      missions:
        "Développer et valider des modèles de dynamique des fluides computationnelle pour les composants de moteurs.\n\n- Créer des modèles 3D de composants de moteurs\n- Configurer des simulations CFD\n- Analyser les résultats de simulation\n- Optimiser les conceptions de composants\n- Présenter les résultats à l'équipe d'ingénierie",
      tutor: "Claire Blanc",
      duration: 6,
      year: "2022",
      type: "3A",
      canRefer: false,
      isPublic: true,
      studentFeedback:
        "Safran a offert une opportunité incroyable de travailler sur des technologies aérospatiales de pointe. Le stage était difficile mais extrêmement gratifiant, et j'ai acquis une expérience précieuse en simulation CFD et en ingénierie aérospatiale.",
      studentId: users[4].id,
    },
    {
      company: "Orange",
      location: "Paris, France",
      subject: "Développement d'un outil d'optimisation de réseau 5G",
      missions:
        "Créer un outil pour analyser et optimiser les performances du réseau 5G.\n\n- Collecter et analyser les données de performance du réseau\n- Développer des algorithmes pour l'optimisation du réseau\n- Créer un tableau de bord pour visualiser les métriques du réseau\n- Tester l'outil dans un environnement simulé\n- Documenter la solution et fournir des supports de formation",
      tutor: "Philippe Martin",
      duration: 5,
      year: "2023",
      type: "Césure",
      canRefer: true,
      isPublic: true,
      studentFeedback:
        "Le stage chez Orange a été une excellente opportunité de travailler avec les dernières technologies de télécommunications. J'ai beaucoup appris sur les réseaux 5G et j'ai acquis une expérience précieuse en optimisation de réseau et en analyse de données.",
      studentId: users[6].id,
    },
    {
      company: "Total Energies",
      location: "Pau, France",
      subject: "Simulation hydraulique pour plateformes offshore",
      missions:
        "Développer des modèles hydrauliques pour simuler l'écoulement des fluides dans les plateformes pétrolières offshore.\n\n- Créer des modèles mathématiques de systèmes hydrauliques\n- Implémenter un logiciel de simulation\n- Valider les modèles avec des données expérimentales\n- Optimiser les paramètres du système\n- Présenter les résultats à l'équipe d'ingénierie",
      tutor: "Sylvie Rousseau",
      duration: 6,
      year: "2022",
      type: "2A",
      canRefer: true,
      isPublic: true,
      studentFeedback:
        "Total Energies a fourni un excellent environnement pour appliquer mes connaissances en ingénierie hydraulique. Le stage était stimulant et m'a donné des informations précieuses sur l'industrie pétrolière et gazière.",
      studentId: users[5].id,
    },
    {
      company: "Airbus",
      location: "Toulouse, France",
      subject: "Développement d'un framework de test automatisé pour les logiciels avioniques",
      missions:
        "Concevoir et implémenter un framework de test automatisé pour les logiciels avioniques critiques.\n\n- Analyser les processus de test existants\n- Concevoir un framework pour les tests automatisés\n- Implémenter des cas de test et des scénarios\n- Intégrer avec les pipelines CI/CD\n- Documenter le framework et former l'équipe",
      tutor: "Michel Blanc",
      duration: 4,
      year: "2023",
      type: "1A",
      canRefer: true,
      isPublic: true,
      studentFeedback:
        "Mon deuxième stage chez Airbus était axé sur l'assurance qualité des logiciels. J'ai acquis une expérience précieuse en tests automatisés et j'ai appris les exigences strictes pour le développement de logiciels avioniques.",
      studentId: users[0].id,
    },
    {
      company: "Dassault Systèmes",
      location: "Vélizy-Villacoublay, France",
      subject: "Modélisation 3D et simulation pour les processus industriels",
      missions:
        "Développer des modèles 3D et des simulations pour les processus de fabrication industrielle.\n\n- Créer des modèles 3D détaillés d'équipements de fabrication\n- Implémenter des simulations basées sur la physique\n- Optimiser les paramètres du processus\n- Valider les simulations avec des données réelles\n- Présenter les résultats aux parties prenantes",
      tutor: "Hélène Petit",
      duration: 5,
      year: "2022",
      type: "Césure",
      canRefer: false,
      isPublic: true,
      studentFeedback:
        "Dassault Systèmes est à la pointe de la modélisation et de la simulation 3D. Le stage m'a donné une expérience pratique avec des logiciels de pointe et m'a permis de travailler sur des problèmes industriels stimulants.",
      studentId: users[4].id,
    },
    {
      company: "CNES",
      location: "Toulouse, France",
      subject: "Optimisation de trajectoire de satellite pour l'observation de la Terre",
      missions:
        "Développer des algorithmes pour optimiser les trajectoires des satellites pour les missions d'observation de la Terre.\n\n- Modéliser la dynamique et les contraintes des satellites\n- Implémenter des algorithmes d'optimisation de trajectoire\n- Analyser la couverture et la qualité d'observation\n- Optimiser l'efficacité du carburant\n- Documenter les résultats et les recommandations",
      tutor: "François Dubois",
      duration: 6,
      year: "2023",
      type: "3A",
      canRefer: true,
      isPublic: true,
      studentFeedback:
        "Le stage au CNES était un rêve devenu réalité pour quelqu'un intéressé par la technologie spatiale. J'ai travaillé sur des problèmes stimulants en mécanique orbitale et j'ai acquis une expérience précieuse en optimisation de trajectoire.",
      studentId: users[2].id,
    },
    {
      company: "Siemens",
      location: "Grenoble, France",
      subject: "Développement d'un jumeau numérique pour l'automatisation industrielle",
      missions:
        "Créer un système de jumeau numérique pour surveiller et optimiser les processus d'automatisation industrielle.\n\n- Concevoir l'architecture du jumeau numérique\n- Implémenter la collecte et le traitement des données\n- Développer des interfaces de visualisation et de surveillance\n- Implémenter des algorithmes de maintenance prédictive\n- Tester et valider le système dans un environnement de production",
      tutor: "Anna Schmidt",
      duration: 5,
      year: "2022",
      type: "2A",
      canRefer: true,
      isPublic: true,
      studentFeedback:
        "Siemens a fourni un excellent environnement pour travailler sur des technologies d'automatisation industrielle de pointe. Le stage était stimulant et m'a donné une expérience précieuse dans le développement de jumeaux numériques et les concepts de l'Industrie 4.0.",
      studentId: users[1].id,
    },
    {
      company: "Naval Group",
      location: "Lorient, France",
      subject: "Simulation hydrodynamique pour la conception de sous-marins",
      missions:
        "Développer et valider des modèles hydrodynamiques pour l'optimisation de la conception des sous-marins.\n\n- Créer des modèles 3D de composants de sous-marins\n- Configurer des simulations CFD pour les conditions sous-marines\n- Analyser les résultats de simulation\n- Optimiser les conceptions de coque pour les performances\n- Présenter les résultats à l'équipe d'architecture navale",
      tutor: "Jacques Moreau",
      duration: 6,
      year: "2023",
      type: "3A",
      canRefer: false,
      isPublic: true,
      studentFeedback:
        "Le stage chez Naval Group a été une opportunité incroyable de travailler sur des technologies navales avancées. J'ai acquis une expérience précieuse en simulation hydrodynamique et j'ai appris les exigences complexes de la conception des sous-marins.",
      studentId: users[5].id,
    },
  ]

  for (const internship of internships) {
    await prisma.internship.create({
      data: internship,
    })
  }

  console.log(`Created ${internships.length} internships`)

  // Create some messages
  console.log("Creating messages...")

  const messages = [
    {
      content:
        "Bonjour, je suis très intéressé par le stage que vous avez fait chez Airbus. Pourriez-vous m'en dire plus sur le processus de candidature et s'il pourrait y avoir des opportunités similaires cette année ?",
      internshipId: (await prisma.internship.findFirst({
        where: { company: "Airbus", subject: { contains: "apprentissage automatique" } },
      }))!.id,
      senderId: users[3].id,
      isRead: true,
    },
    {
      content:
        "Salut, j'ai vu ton stage chez EDF et il correspond parfaitement à mes intérêts. Serais-tu prêt à me recommander ou à me donner quelques conseils pour postuler ?",
      internshipId: (await prisma.internship.findFirst({
        where: { company: "EDF" },
      }))!.id,
      senderId: users[1].id,
      isRead: false,
    },
    {
      content:
        "Je suis intéressé par le stage que tu as fait chez Capgemini. J'ai de l'expérience avec React et Node.js. Pourrais-tu partager les coordonnées de ton contact ou mettre un bon mot pour moi ?",
      internshipId: (await prisma.internship.findFirst({
        where: { company: "Capgemini" },
      }))!.id,
      senderId: users[0].id,
      isRead: true,
    },
  ]

  for (const message of messages) {
    await prisma.message.create({
      data: message,
    })
  }

  console.log(`Created ${messages.length} messages`)

  console.log("Database seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

