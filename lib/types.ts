export interface User {
  id: string
  name: string
  email: string
  department: string
  graduationYear: string
}

export interface Internship {
  id: string
  company: string
  location: string
  subject: string
  missions: string
  tutor: string
  duration: number
  year: string
  type: "1A" | "2A" | "3A" | "Césure" // Ajout du type de stage
  canRefer: boolean
  isPublic: boolean
  studentFeedback?: string
  student: User
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  content: string
  internship: Internship
  sender: User
  isRead: boolean
  createdAt: Date
}

export interface InternshipFilters {
  query?: string
  year?: string
  type?: string // Ajout du filtre par type
  minDuration?: number
  maxDuration?: number
  canRefer?: boolean
  page?: number
}

export interface PaginatedInternships {
  internships: Internship[]
  totalPages: number
  currentPage: number
}

