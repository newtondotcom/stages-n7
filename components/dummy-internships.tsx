"use client";
import { InternshipCard } from "@/components/internship-card";
import type { Internship, User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const dummyUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    department: "Computer Science",
    graduationYear: "2023",
  },
];

const internships: Internship[] = [
  {
    id: "1",
    company: "Airbus",
    location: "Toulouse, France",
    subject:
      "Development of a machine learning algorithm for aircraft maintenance prediction",
    missions:
      "Develop and implement ML models to predict maintenance needs based on sensor data.\n\n- Analyze historical maintenance data and identify patterns\n- Design and train machine learning models\n- Implement a prototype system for real-time prediction\n- Validate the model with test data\n- Document the solution and present findings to stakeholders",
    tutor: "Jean Dupont",
    duration: 6,
    year: "2023",
    canRefer: true,
    isPublic: true,
    studentFeedback:
      "This internship was a great learning experience. I had the opportunity to work with cutting-edge technologies and a supportive team. The company has a good work-life balance and the projects were challenging but rewarding.",
    student: dummyUsers[0],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "2",
    company: "Thales",
    location: "Paris, France",
    subject:
      "Implementation of a secure communication protocol for IoT devices",
    missions:
      "Design and implement a lightweight encryption protocol for resource-constrained IoT devices.\n\n- Research existing security protocols for IoT\n- Design a lightweight encryption solution\n- Implement the protocol on test devices\n- Perform security analysis and penetration testing\n- Optimize for performance on low-power devices",
    tutor: "Marie Lefevre",
    duration: 4,
    year: "2023",
    canRefer: false,
    isPublic: true,
    studentFeedback:
      "Working at Thales was an excellent opportunity to apply my theoretical knowledge in a practical setting. The team was very knowledgeable and I learned a lot about security in IoT environments.",
    student: dummyUsers[0],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "3",
    company: "EDF",
    location: "Lyon, France",
    subject:
      "Optimization of energy distribution networks using graph algorithms",
    missions:
      "Develop algorithms to optimize energy flow in distribution networks to minimize losses.\n\n- Model the energy distribution network as a graph\n- Implement various optimization algorithms\n- Analyze performance and energy savings\n- Create visualization tools for network operators\n- Document findings and recommendations",
    tutor: "Pierre Dubois",
    duration: 5,
    year: "2022",
    canRefer: true,
    isPublic: true,
    studentFeedback:
      "EDF provided a stimulating environment to work on real-world energy problems. The internship gave me valuable insights into the energy sector and allowed me to apply my algorithm knowledge to practical challenges.",
    student: dummyUsers[0],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "4",
    company: "Capgemini",
    location: "Bordeaux, France",
    subject: "Development of a web application for project management",
    missions:
      "Design and implement a full-stack web application for internal project management.\n\n- Gather requirements from stakeholders\n- Design the database schema and API\n- Implement the frontend using React\n- Develop backend services with Node.js\n- Deploy and test the application",
    tutor: "Luc Moreau",
    duration: 3,
    year: "2023",
    canRefer: true,
    isPublic: true,
    studentFeedback:
      "The internship at Capgemini was very hands-on. I was given significant responsibility and was able to contribute meaningfully to the project. The team was supportive and I improved my full-stack development skills considerably.",
    student: dummyUsers[0],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-02"),
  },
  /*
  {
    id: "5",
    company: "Orange",
    location: "Paris, France",
    subject: "Development of a 5G network optimization tool",
    missions:
      "Create a tool to analyze and optimize 5G network performance.\n\n- Collect and analyze network performance data\n- Develop algorithms for network optimization\n- Create a dashboard for visualizing network metrics\n- Test the tool in a simulated environment\n- Document the solution and provide training materials",
    tutor: "Philippe Martin",
    duration: 5,
    year: "2023",
    canRefer: true,
    isPublic: true,
    studentFeedback:
      "The internship at Orange was a great opportunity to work with the latest telecommunications technology. I learned a lot about 5G networks and gained valuable experience in network optimization and data analysis.",
    student: dummyUsers[0],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-02"),
    },*/
];

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
  );
}
