import DataTableContainer from "@/components/invoice-sender-page/DataTableContainer"
import PageHeader from "@/components/shared/PageHeader"
import { Suspense } from "react"
import Loading from "./loading"

const InvoiceSenderPage = () => {

    return (
        <div className="flex flex-col gap-4">
            <Suspense fallback={<Loading />}>
                <PageHeader title="Számlafeltöltés" action="upload" />
                <DataTableContainer />
            </Suspense>
        </div>
    )
}

export default InvoiceSenderPage