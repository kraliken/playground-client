import { completeColumns } from "@/components/invoice-sender-page/complete-invoices/complete-columns"
import PageHeader from "@/components/shared/PageHeader"
import { getUploadInvoicesAction } from "@/lib/actions/invoice.actions"
import { Suspense } from "react"
import Loading from "./loading"
import DataTable from "@/components/shared/DataTable"

const SendIncoicesPage = async () => {

    const { complete } = await getUploadInvoicesAction()
    const disabledButton = complete?.length === 0

    return (
        <div className="flex flex-col gap-4 pb-4">
            <Suspense fallback={<Loading />}>
                <PageHeader title="Vevő számlák kiküldése" action="send" disabledButton={disabledButton} />
                <DataTable columns={completeColumns} data={complete} emptyTableMessage="Nincsenek küldhető számlák" />
            </Suspense>
        </div>
    )
}

export default SendIncoicesPage