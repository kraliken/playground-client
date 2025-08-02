import DataTableContainer from "@/components/shared/DataTableContainer"
import PageHeader from "@/components/shared/PageHeader"
import { getEmailsAction } from "@/lib/actions/email.actions"
import { Suspense } from "react"
import Loading from "./loading"
import { emailColumns } from "@/components/invoice-sender-page/email-data-table/email-columns"

const EmailsPage = () => {
    return (
        <div className="flex flex-col gap-4 pb-4">
            <Suspense fallback={<Loading />}>
                <PageHeader title="E-mailek" action="email" />
                <DataTableContainer
                    getData={getEmailsAction}
                    columns={emailColumns}
                    emptyTableMessage="Nincsenek emailek."
                />
            </Suspense>
        </div>
    )
}
export default EmailsPage