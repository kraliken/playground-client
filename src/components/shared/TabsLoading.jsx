import { Skeleton } from "@/components/ui/skeleton"

export default function TabsHeaderSkeleton() {
    return (
        <div className="flex items-center justify-between w-full mb-2">
            <div className="flex gap-2">
                <Skeleton className="h-8 w-44 rounded-xl" />
                <Skeleton className="h-8 w-36 rounded-xl" />
            </div>
            <Skeleton className="h-10 w-20 rounded-xl" />
        </div>
    )
}
