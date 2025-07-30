import InvoiceUploadForm from "../invoice-sender-page/InvoiceUploadForm"
import NewEmailDialog from "../invoice-sender-page/NewEmailDialog"
import NewPartnerDialog from "../invoice-sender-page/NewPartnerDialog"
import SendInvoicesButton from "../invoice-sender-page/SendInvoicesButton"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import UploadForm from "./UploadForm"

const PageHeader = ({ title, action, disabledButton }) => {

    return (
        // <Card className="flex flex-col sm:flex-row items-center justify-between">
        <Card className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between">
            {/* <CardHeader className="flex-1 flex items-center"> */}
            <CardHeader className="w-full sm:flex-1 flex items-center sm:items-center">
                {/* <CardTitle> */}
                <CardTitle className="w-full">
                    <h2>{title}</h2>
                </CardTitle>
            </CardHeader>
            {/* <CardContent className="flex-1 flex justify-end"> */}
            <CardContent className="w-full sm:flex-1 flex justify-end">
                {action === "upload" && <InvoiceUploadForm />}
                {action === "send" && <SendInvoicesButton disabledButton={disabledButton} />}
                {action === "partner" && <NewPartnerDialog />}
                {action === "email" && <NewEmailDialog />}
                {action === "volvo" && <UploadForm />}
            </CardContent>
        </Card>
    )
}

export default PageHeader