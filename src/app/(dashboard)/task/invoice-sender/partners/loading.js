import DataTableLoading from '@/components/shared/DataTableLoading'
import PageHeaderSkeleton from '@/components/shared/PageHeaderLoading'

const Loading = () => {
    return (
        <div className="flex flex-col gap-4">
            <PageHeaderSkeleton />
            <DataTableLoading />
        </div>
    )
}

export default Loading