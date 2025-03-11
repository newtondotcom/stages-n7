import { type Internship, type InternshipFilters, type PaginatedInternships } from "@/lib/types"
import { db } from "@/lib/db"

export async function getLatestInternships(limit: number = 5): Promise<Internship[]> {
  try {
    const internships = await db.internship.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
            graduationYear: true,
          },
        },
      },
    })

    return internships.map(mapPrismaInternshipToInternship)
  } catch (error) {
    console.error('Error fetching latest internships:', error)
    return []
  }
}

export async function getFilteredInternships(
  filters: InternshipFilters
): Promise<PaginatedInternships> {
  try {
    const where: any = {
      isPublic: true,
    }

    // Apply filters
    if (filters.query) {
      const query = filters.query.toLowerCase()
      where.OR = [
        { company: { contains: query, mode: 'insensitive' } },
        { location: { contains: query, mode: 'insensitive' } },
        { subject: { contains: query, mode: 'insensitive' } },
        { missions: { contains: query, mode: 'insensitive' } },
      ]
    }

    if (filters.year) {
      where.year = filters.year
    }

    if (filters.minDuration !== undefined) {
      where.duration = {
        ...where.duration,
        gte: filters.minDuration,
      }
    }

    if (filters.maxDuration !== undefined) {
      where.duration = {
        ...where.duration,
        lte: filters.maxDuration,
      }
    }

    if (filters.canRefer !== undefined) {
      where.canRefer = filters.canRefer
    }

    // Count total matching internships for pagination
    const totalInternships = await db.internship.count({ where })

    // Pagination
    const page = filters.page || 1
    const pageSize = 6
    const totalPages = Math.ceil(totalInternships / pageSize)

    // Fetch paginated internships
    const internships = await db.internship.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
            graduationYear: true,
          },
        },
      },
    })

    return {
      internships: internships.map(mapPrismaInternshipToInternship),
      totalPages,
      currentPage: page,
    }
  } catch (error) {
    console.error('Error fetching filtered internships:', error)
    return {
      internships: [],
      totalPages: 0,
      currentPage: 1,
    }
  }
}

export async function getInternshipById(id: string): Promise<Internship | null> {
  try {
    const internship = await db.internship.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
            graduationYear: true,
          },
        },
      },
    })

    if (!internship) {
      return null
    }

    // Find similar internships
    const similarInternships = await db.internship.findMany({
      where: {
        id: { not: id },
        OR: [
          { company: internship.company },
          { location: internship.location },
        ],
        isPublic: true,
      },
      take: 3,
      select: {
        id: true,
        subject: true,
        company: true,
        year: true,
      },
    })

    return {
      ...mapPrismaInternshipToInternship(internship),
      similarInternships,
    }
  } catch (error) {
    console.error('Error fetching internship by ID:', error)
    return null
  }
}

// Helper function to map Prisma Internship to our Internship type
function mapPrismaInternshipToInternship(internship: any): Internship {
  return {
    id: internship.id,
    company: internship.company,
    location: internship.location,
    subject: internship.subject,
    missions: internship.missions,
    tutor: internship.tutor,
    duration: internship.duration,
    year: internship.year,
    canRefer: internship.canRefer,
    studentFeedback: internship.studentFeedback || undefined,
    student: {
      id: internship.student.id,
      name: internship.student.name,
      email: internship.student.email,
      department: internship.student.department,
      graduationYear: internship.student.graduationYear,
    },
  }
}

