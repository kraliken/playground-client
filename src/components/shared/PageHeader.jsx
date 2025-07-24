import InvoiceUploadForm from "../invoice-sender-page/InvoiceUploadForm"
import NewEmailDialog from "../invoice-sender-page/NewEmailDialog"
import NewPartnerDialog from "../invoice-sender-page/NewPartnerDialog"
import SendInvoicesButton from "../invoice-sender-page/SendInvoicesButton"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const PageHeader = ({ title, action, disabledButton }) => {

    return (
        <Card className="flex flex-row items-center justify-between">
            <CardHeader className="flex-1 flex items-center">
                <CardTitle>
                    <h2>{title}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex justify-end">
                {action === "upload" && <InvoiceUploadForm />}
                {action === "send" && <SendInvoicesButton disabledButton={disabledButton} />}
                {action === "partner" && <NewPartnerDialog />}
                {action === "email" && <NewEmailDialog />}
            </CardContent>
        </Card>
    )
}

export default PageHeader