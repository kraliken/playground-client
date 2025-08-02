import DataTableContainer from "@/components/shared/DataTableContainer"
import { getPartersAction } from "@/lib/actions/partner.actions"
import { Suspense } from "react"
import PageHeader from "@/components/shared/PageHeader"
import Loading from "./loading"
import { partnerColumns } from "@/components/invoice-sender-page/partner-data-table/partner-columns"

const PartnersPage = () => {

    return (
        <div className="flex flex-col gap-4 pb-4">
            <Suspense fallback={<Loading />}>
                <PageHeader title="Partnerek" action="partner" />
                <DataTableContainer
                    getData={getPartersAction}
                    columns={partnerColumns}
                    emptyTableMessage="Nincsenek partnerek."
                />
            </Suspense>
        </div>
    )
}
export default PartnersPage