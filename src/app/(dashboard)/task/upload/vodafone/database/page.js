import DataBaseTabContainer from "@/components/vodafone/DataBaseTabContainer"
import { Suspense } from "react"
import Loading from "../loading"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"


const DataBasePage = () => {
    return (
        <div className="flex flex-col gap-4">
            <Card className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between">
                <CardHeader className="w-full sm:flex-1 flex items-center sm:items-center">
                    <CardTitle className="w-full">
                        <h2>Vodafone</h2>
                    </CardTitle>
                </CardHeader>
            </Card>
            <Suspense fallback={<Loading />}>
                <DataBaseTabContainer />
            </Suspense>
        </div>
    )
}

export default DataBasePage