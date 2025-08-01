import { getMappingTableAction, getPhoneBookAction } from "@/lib/actions/vodafone.actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { vodafoneColumns } from "./vodafone-columns";
import DataTable from "../shared/DataTable";
import { mappingTableColumns } from "./mapping-table-columns";


const DataBaseTabContainer = async () => {

    const phonebook = await getPhoneBookAction()
    const mappingTable = await getMappingTableAction()


    return (
        <Tabs defaultValue="phonebook" className="min-w-[400px] gap-4">
            <div className="flex items-center justify-between gap-4">
                <TabsList >
                    <TabsTrigger value="phonebook" className="min-w-[220px]">Telefonkönyv</TabsTrigger>
                    <TabsTrigger value="mapping-table" className="min-w-[220px]">Mapping tábla</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="phonebook">
                <DataTable columns={vodafoneColumns} data={phonebook} emptyTableMessage="A telefonkönyv üres." />
            </TabsContent>
            <TabsContent value="mapping-table">
                <DataTable columns={mappingTableColumns} data={mappingTable} emptyTableMessage="A mapping tábla üres." />
            </TabsContent>
        </Tabs>
    )
}

export default DataBaseTabContainer
