import DataTableLoading from '@/components/shared/DataTableLoading'
import PageHeaderSkeleton from '@/components/shared/PageHeaderLoading'

const Loading = () => {
    return (
        <>
            <PageHeaderSkeleton />
            <DataTableLoading />
        </>
    )
}

export default Loading