import PageHeader from "@/components/shared/PageHeader"
import SendEmailFormContainer from "@/components/shared/send-email-form/SendEmailFormContainer"

const VodafoneInvoiceUploadPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Vodafone számla feltöltés" action="vodafone" />
            <SendEmailFormContainer />
        </div>
    )
}

export default VodafoneInvoiceUploadPage