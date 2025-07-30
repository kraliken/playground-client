import { getUploadInvoicesAction } from "@/lib/actions/invoice.actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { completeColumns } from "./complete-invoices/complete-columns"
import { incompleteColumns } from "./incomplete-invoices/incomplete-columns"
import DeleInvoicesButton from "./DeleInvoicesButton"
import DataTable from "../shared/DataTable"

const DataTableContainer = async () => {

    const { complete, incomplete } = await getUploadInvoicesAction()

    const disabledButton = complete.length === 0 && incomplete.length === 0

    return (
        <div className="">
            <Tabs defaultValue="complete-invoices" className="min-w-[400px] gap-4">
                <div className="flex items-center justify-between gap-4">
                    <TabsList >
                        <TabsTrigger value="complete-invoices" className="min-w-[220px]">Küldhető számlák</TabsTrigger>
                        <TabsTrigger value="incomplete-invoices" className="min-w-[220px]">Hiányzó adatok</TabsTrigger>
                    </TabsList>
                    <DeleInvoicesButton disabledButton={disabledButton} />
                </div>
                <TabsContent value="complete-invoices">
                    <DataTable columns={completeColumns} data={complete} emptyTableMessage="Nincsenek küldhető számlák." />
                </TabsContent>
                <TabsContent value="incomplete-invoices">
                    <DataTable columns={incompleteColumns} data={incomplete} emptyTableMessage="Nincs hiányzó adat." />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default DataTableContainer