import DataTableLoading from '@/components/shared/DataTableLoading'
import PageHeaderSkeleton from '@/components/shared/PageHeaderLoading'
import TabsHeaderSkeleton from '@/components/shared/TabsLoading'

const Loading = () => {
    return (
        <div className="flex flex-col gap-4">
            <PageHeaderSkeleton />
            <TabsHeaderSkeleton />
            <DataTableLoading />
        </div>
    )
}

export default Loading