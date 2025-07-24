import { Skeleton } from "@/components/ui/skeleton"

export default function PageHeaderSkeleton() {
    return (
        <div className="flex flex-row items-center justify-between rounded-2xl bg-[#101627] p-4 mb-2">
            <Skeleton className="h-7 w-32 rounded" />
            <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
    )
}
