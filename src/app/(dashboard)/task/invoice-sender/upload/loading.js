import DataTableLoading from '@/components/shared/DataTableLoading'
import PageHeaderSkeleton from '@/components/shared/PageHeaderLoading'
import TabsHeaderSkeleton from '@/components/shared/TabsLoading'

const Loading = () => {
    return (
        <>
            <PageHeaderSkeleton />
            <TabsHeaderSkeleton />
            <DataTableLoading />
        </>
    )
}

export default Loading