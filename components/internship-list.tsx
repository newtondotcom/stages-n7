import { InternshipCard } from "@/components/internship-card"
import { getFilteredInternships } from "@/lib/internships"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

interface InternshipListProps {
  searchParams?: {
    q?: string
    year?: string
    type?: string
    minDuration?: string
    maxDuration?: string
    canRefer?: string
    page?: string
  }
}

export async function InternshipList({ searchParams = {} }: InternshipListProps) {
  const page = Number.parseInt(searchParams.page || "1")
  const { internships, totalPages } = await getFilteredInternships({
    query: searchParams.q,
    year: searchParams.year,
    type: searchParams.type,
    minDuration: searchParams.minDuration ? Number.parseInt(searchParams.minDuration) : undefined,
    maxDuration: searchParams.maxDuration ? Number.parseInt(searchParams.maxDuration) : undefined,
    canRefer: searchParams.canRefer === "true",
    page,
  })

  if (internships.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">Aucun stage trouvé</h3>
        <p className="text-muted-foreground">
          Essayez d'ajuster votre recherche ou vos filtres pour trouver ce que vous cherchez.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`/internships?${new URLSearchParams({
                    ...searchParams,
                    page: (page - 1).toString(),
                  })}`}
                />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`/internships?${new URLSearchParams({
                    ...searchParams,
                    page: pageNum.toString(),
                  })}`}
                  isActive={pageNum === page}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            {page < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href={`/internships?${new URLSearchParams({
                    ...searchParams,
                    page: (page + 1).toString(),
                  })}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

