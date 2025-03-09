import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCardChart() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-12 rounded-xl" />
            <div className="space-x-3 flex items-end">

                <div className="space-x-1 flex items-end">
                    <Skeleton className="h-48 w-12" />
                    <Skeleton className="h-48 w-12" />
                </div>
                <div className="space-x-1 flex items-end">
                    <Skeleton className="h-40 w-12" />
                    <Skeleton className="h-52 w-12" />
                </div>            </div>
            <div>
                <Skeleton className="w-10/12 mx-auto h-4 " />
            </div>
        </div>
    )
}
