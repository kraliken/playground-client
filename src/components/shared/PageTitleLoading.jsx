import { Skeleton } from "@/components/ui/skeleton"

export default function CenterTitleSkeleton() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <Skeleton className="h-16 w-96 rounded-xl" />
        </div>
    )
}
