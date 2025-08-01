import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SendEmailForm from "./SendEmailForm"

const SendEmailFormContainer = () => {
    return (
        <div className="flex">
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>
                        <h2>Számla küldés könyvelésre</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent className="">
                    <SendEmailForm />
                </CardContent>
            </Card>
        </div>
    )
}

export default SendEmailFormContainer