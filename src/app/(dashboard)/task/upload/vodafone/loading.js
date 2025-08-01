import DataTableLoading from '@/components/shared/DataTableLoading'
import TabsHeaderSkeleton from '@/components/shared/TabsLoading'

const Loading = () => {
    return (
        <>
            <TabsHeaderSkeleton />
            <DataTableLoading />
        </>
    )
}

export default Loading