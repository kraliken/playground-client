import DataTable from "./DataTable";

const DataTableContainer = async ({ getData, columns, emptyTableMessage }) => {

    const data = await getData()

    return (
        <>
            <DataTable columns={columns} data={data} emptyTableMessage={emptyTableMessage} />
        </>
    )
}

export default DataTableContainer