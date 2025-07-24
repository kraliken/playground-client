import { Skeleton } from "@/components/ui/skeleton"

const DataTableLoading = () => {
    return (
        <div className="rounded-2xl overflow-hidden border bg-background">
            <table className="w-full table-auto">
                <tbody>
                    {[...Array(3)].map((_, i) => (
                        <tr key={i} className="border-b">
                            <td className="py-4 px-4"><Skeleton className="h-5 w-48 rounded" /></td>
                            <td className="py-4 px-4"><Skeleton className="h-5 w-36 rounded" /></td>
                            <td className="py-4 px-4"><Skeleton className="h-7 w-16 rounded-full" /></td>
                            <td className="py-4 px-4"><Skeleton className="h-7 w-16 rounded-full" /></td>
                            <td className="py-4 px-4"><Skeleton className="h-6 w-6 rounded-full" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataTableLoading