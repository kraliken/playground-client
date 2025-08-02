import InvoiceUploadForm from "../invoice-sender-page/InvoiceUploadForm"
import NewEmailDialog from "../invoice-sender-page/NewEmailDialog"
import NewPartnerDialog from "../invoice-sender-page/NewPartnerDialog"
import SendInvoicesForm from "../invoice-sender-page/SendInvoicesForm"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import UploadForm from "./UploadForm"

const PageHeader = ({ title, action, disabledButton }) => {

    return (
        // <Card className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between">
        <Card className={`flex flex-col sm:flex-row ${action === "send" ? "items-start" : "items-stretch sm:items-center"} justify-between`}>
            <CardHeader className="w-full sm:flex-1 flex items-center sm:items-center">
                <CardTitle className="w-full">
                    <h2>{title}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent className="w-full sm:flex-1 flex justify-end">
                {action === "upload" && <InvoiceUploadForm />}
                {action === "send" && <SendInvoicesForm disabledButton={disabledButton} />}
                {action === "partner" && <NewPartnerDialog />}
                {action === "email" && <NewEmailDialog />}
                {action === "volvo" && <UploadForm endpointSuffix="nijhof/upload/invoice/volvo" />}
                {action === "multialarm" && <UploadForm endpointSuffix="nijhof/upload/invoice/multialarm" />}
                {action === "vodafone" && <UploadForm endpointSuffix="esselte/upload/invoice/vodafone" />}
            </CardContent>
        </Card>
    )
}

export default PageHeader