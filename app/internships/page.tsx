import { Suspense } from "react"
import { InternshipSearch } from "@/components/internship-search"
import { InternshipList } from "@/components/internship-list"
import { InternshipFilters } from "@/components/internship-filters"
import { Skeleton } from "@/components/ui/skeleton"

export default async function InternshipsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explorer les stages</h1>

      <InternshipSearch />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="md:col-span-1">
          <InternshipFilters />
        </div>
        <div className="md:col-span-3">
          <Suspense fallback={<InternshipListSkeleton />}>
            <InternshipList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function InternshipListSkeleton() {
  return (
    <div className="space-y-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
    </div>
  )
}

