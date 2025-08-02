import PageHeader from '@/components/shared/PageHeader'
import React, { Suspense } from 'react'
import Loading from './loading'
import DataTableContainer from '@/components/shared/DataTableContainer'
import { connectionColumns } from '@/components/invoice-sender-page/connection-data-table/connection-columns'
import { getLinkEmailToPartnerAction } from '@/lib/actions/connection.actions'

const ConnectionsPage = () => {
    return (
        <div className="flex flex-col gap-4 pb-4">
            <Suspense fallback={<Loading />}>
                <PageHeader title="Kapcsolatok" action="connect" />
                <DataTableContainer
                    getData={getLinkEmailToPartnerAction}
                    columns={connectionColumns}
                    emptyTableMessage="Nincsenek kapcsolatok."
                />
            </Suspense>
        </div>

    )
}

export default ConnectionsPage