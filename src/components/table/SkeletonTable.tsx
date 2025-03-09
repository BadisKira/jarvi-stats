import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCardTable() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-12 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div>
      <Skeleton className="w-10/12 mx-auto h-4 " />
      </div>
    </div>
  )
}
