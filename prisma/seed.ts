import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // First, clean up existing data if needed
  await prisma.message.deleteMany({})
  await prisma.internship.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('Creating users...')

  // Create users (students)
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Sophie Martin',
        email: 'sophie.martin@etu.enseeiht.fr',
        department: 'Computer Science',
        graduationYear: '2024',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Thomas Bernard',
        email: 'thomas.bernard@etu.enseeiht.fr',
        department: 'Electronics',
        graduationYear: '2023',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Emma Petit',
        email: 'emma.petit@etu.enseeiht.fr',
        department: 'Electrical Engineering',
        graduationYear: '2023',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Lucas Roux',
        email: 'lucas.roux@etu.enseeiht.fr',
        department: 'Computer Science',
        graduationYear: '2024',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Antoine Leroy',
        email: 'antoine.leroy@etu.enseeiht.fr',
        department: 'Mechanical Engineering',
        graduationYear: '2023',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Julie Dubois',
        email: 'julie.dubois@etu.enseeiht.fr',
        department: 'Hydraulics',
        graduationYear: '2022',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Maxime Girard',
        email: 'maxime.girard@etu.enseeiht.fr',
        department: 'Telecommunications',
        graduationYear: '2024',
      },
    }),
  ])

  console.log(`Created ${users.length} users`)

  console.log('Creating internships...')

  // Create internships
  const internships = [
    {
      company: 'Airbus',
      location: 'Toulouse, France',
      subject: 'Development of a machine learning algorithm for aircraft maintenance prediction',
      missions: 'Develop and implement ML models to predict maintenance needs based on sensor data.\n\n- Analyze historical maintenance data and identify patterns\n- Design and train machine learning models\n- Implement a prototype system for real-time prediction\n- Validate the model with test data\n- Document the solution and present findings to stakeholders',
      tutor: 'Jean Dupont',
      duration: 6,
      year: '2023',
      canRefer: true,
      isPublic: true,
      studentFeedback: 'This internship was a great learning experience. I had the opportunity to work with cutting-edge technologies and a supportive team. The company has a good work-life balance and the projects were challenging but rewarding.',
      studentId: users[0].id,
    },
    {
      company: 'Thales',
      location: 'Paris, France',
      subject: 'Implementation of a secure communication protocol for IoT devices',
      missions: 'Design and implement a lightweight encryption protocol for resource-constrained IoT devices.\n\n- Research existing security protocols for IoT\n- Design a lightweight encryption solution\n- Implement the protocol on test devices\n- Perform security analysis and penetration testing\n- Optimize for performance on low-power devices',
      tutor: 'Marie Lefevre',
      duration: 4,
      year: '2023',
      canRefer: false,
      isPublic: true,
      studentFeedback: 'Working at Thales was an excellent opportunity to apply my theoretical knowledge in a practical setting. The team was very knowledgeable and I learned a lot about security in IoT environments.',
      studentId: users[1].id,
    },
    {
      company: 'EDF',
      location: 'Lyon, France',
      subject: 'Optimization of energy distribution networks using graph algorithms',
      missions: 'Develop algorithms to optimize energy flow in distribution networks to minimize losses.\n\n- Model the energy distribution network as a graph\n- Implement various optimization algorithms\n- Analyze performance and energy savings\n- Create visualization tools for network operators\n- Document findings and recommendations',
      tutor: 'Pierre Dubois',
      duration: 5,
      year: '2022',
      canRefer: true,
      isPublic: true,
      studentFeedback: 'EDF provided a stimulating environment to work on real-world energy problems. The internship gave me valuable insights into the energy sector and allowed me to apply my algorithm knowledge to practical challenges.',
      studentId: users[2].id,
    },
    {
      company: 'Capgemini',
      location: 'Bordeaux, France',
      subject: 'Development of a web application for project management',
      missions: 'Design and implement a full-stack web application for internal project management.\n\n- Gather requirements from stakeholders\n- Design the database schema and API\n- Implement the frontend using React\n- Develop backend services with Node.js\n- Deploy and test the application',
      tutor: 'Luc Moreau',
      duration: 3,
      year: '2023',
      canRefer: true,
      isPublic: true,
      studentFeedback: 'The internship at Capgemini was very hands-on. I was given significant responsibility and was able to contribute meaningfully to the project. The team was supportive and I improved my full-stack development skills considerably.',
      studentId: users[3].id,
    },
    {
      company: 'Safran',
      location: 'Toulouse, France',
      subject: 'Simulation of fluid dynamics for aircraft engine components',
      missions: 'Develop and validate computational fluid dynamics models for engine components.\n\n- Create 3D models of engine components\n- Set up CFD simulations\n- Analyze simulation results\n- Optimize component designs\n- Present findings to the engineering team',
      tutor: 'Claire Blanc',
      duration: 6,
      year: '2022',
      canRefer: false,
      isPublic: true,
      studentFeedback: 'Safran offered an incredible opportunity to work on cutting-edge aerospace technology. The internship was challenging but extremely rewarding, and I gained valuable experience in CFD simulation and aerospace engineering.',
      studentId: users[4].id,
    },
    {
      company: 'Orange',
      location: 'Paris, France',
      subject: 'Development of a 5G network optimization tool',
      missions: 'Create a tool to analyze and optimize 5G network performance.\n\n- Collect and analyze network performance data\n- Develop algorithms for network optimization\n- Create a dashboard for visualizing network metrics\n- Test the tool in a simulated environment\n- Document the solution and provide training materials',
      tutor: 'Philippe Martin',
      duration: 5,
      year: '2023',
      canRefer: true,
      isPublic: true,
      studentFeedback: 'The internship at Orange was a great opportunity to work with the latest telecommunications technology. I learned a lot about 5G networks and gained valuable experience in network optimization and data analysis.',
      studentId: users[6].id,
    },
    {
      company: 'Total Energies',
      location: 'Pau, France',
      subject: 'Hydraulic simulation for offshore platforms',
      missions: 'Develop hydraulic models to simulate fluid flow in offshore oil platforms.\n\n- Create mathematical models of hydraulic systems\n- Implement simulation software\n- Validate models with experimental data\n- Optimize system parameters\n- Present results to the engineering team',
      tutor: 'Sylvie Rousseau',
      duration: 6,
      year: '2022',
      canRefer: true,
      isPublic: true,
      studentFeedback: 'Total Energies provided an excellent environment to apply my hydraulic engineering knowledge. The internship was challenging and gave me valuable insights into the oil and gas industry.',
      studentId: users[5].id,
    },
    {
      company: 'Airbus',
      location: 'Toulouse, France',
      subject: 'Development of an automated testing framework for avionics software',
      missions: 'Design and implement an automated testing framework for critical avionics software.\n\n- Analyze existing testing processes\n- Design a framework for automated testing\n- Implement test cases and scenarios\n- Integrate with CI/CD pipelines\n- Document the framework and train the team',
      tutor: 'Michel Blanc',
      duration: 4,
      year: '2023',
      canRefer: true,
      isPublic: true,
      studentFeedback: 'My second internship at Airbus was focused on software quality assurance. I gained valuable experience in automated testing and learned about the strict requirements for avionics software development.',
      studentId: users[0].id,
    },
    {
      company: 'Dassault Systèmes',
      location: 'Vélizy-Villacoublay, France',
      subject: '3D modeling and simulation for industrial processes',
      missions: 'Develop 3D models and simulations for industrial manufacturing processes.\n\n- Create detailed 3D models of manufacturing equipment\n- Implement physics-based simulations\n- Optimize process parameters\n- Validate simulations with real-world data\n- Present findings to stakeholders',
      tutor: 'Hélène Petit',
      duration: 5,
      year: '2022',
      canRefer: false,
      isPublic: true,
      studentFeedback: 'Dassault Systèmes is at the forefront of 3D modeling and simulation. The internship gave me hands-on experience with industry-leading software and allowed me to work on challenging industrial problems.',
      studentId: users[4].id,
    },
    {
      company: 'CNES',
      location: 'Toulouse, France',
      subject: 'Satellite trajectory optimization for Earth observation',
      missions: 'Develop algorithms to optimize satellite trajectories for Earth observation missions.\n\n- Model satellite dynamics and constraints\n- Implement trajectory optimization algorithms\n- Analyze coverage and observation quality\n- Optimize for fuel efficiency\n- Document findings and recommendations',
      tutor: 'François Dubois',
      duration: 6,
      year: '2023',
      canRefer: true,
      isPublic: true,
      studentFeedback: 'The internship at CNES was a dream come true for someone interested in space technology. I worked on challenging problems in orbital mechanics and gained valuable experience in trajectory optimization.',
      studentId: users[2].id,
    },
    {
      company: 'Siemens',
      location: 'Grenoble, France',
      subject: 'Development of a digital twin for industrial automation',
      missions: 'Create a digital twin system for monitoring and optimizing industrial automation processes.\n\n- Design the architecture for the digital twin\n- Implement data collection and processing\n- Develop visualization and monitoring interfaces\n- Implement predictive maintenance algorithms\n- Test and validate the system in a production environment',
      tutor: 'Anna Schmidt',
      duration: 5,
      year: '2022',
      canRefer: true,
      isPublic: true,
      studentFeedback: 'Siemens provided an excellent environment to work on cutting-edge industrial automation technology. The internship was challenging and gave me valuable experience in digital twin development and Industry 4.0 concepts.',
      studentId: users[1].id,
    },
    {
      company: 'Naval Group',
      location: 'Lorient, France',
      subject: 'Hydrodynamic simulation for submarine design',
      missions: 'Develop and validate hydrodynamic models for submarine design optimization.\n\n- Create 3D models of submarine components\n- Set up CFD simulations for underwater conditions\n- Analyze simulation results\n- Optimize hull designs for performance\n- Present findings to the naval architecture team',
      tutor: 'Jacques Moreau',
      duration: 6,
      year: '2023',
      canRefer: false,
      isPublic: true,
      studentFeedback: 'The internship at Naval Group was an incredible opportunity to work on advanced naval technology. I gained valuable experience in hydrodynamic simulation and learned about the complex requirements of submarine design.',
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
  console.log('Creating messages...')

  const messages = [
    {
      content: "Hello, I'm very interested in the internship you did at Airbus. Could you tell me more about the application process and if there might be similar opportunities this year?",
      internshipId: (await prisma.internship.findFirst({ where: { company: 'Airbus', subject: { contains: 'machine learning' } } }))!.id,
      senderId: users[3].id,
      isRead: true,
    },
    {
      content: "Hi, I saw your internship at EDF and it aligns perfectly with my interests. Would you be willing to refer me or provide some tips for applying?",
      internshipId: (await prisma.internship.findFirst({ where: { company: 'EDF' } }))!.id,
      senderId: users[1].id,
      isRead: false,
    },
    {
      content: "I'm interested in the Capgemini internship you did. I have experience with React and Node.js. Would you mind sharing your contact's details or putting in a good word for me?",
      internshipId: (await prisma.internship.findFirst({ where: { company: 'Capgemini' } }))!.id,
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

  console.log('Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

