"use client"

export const vodafoneColumns = [
    {
        accessorKey: "phone_number",
        header: "Telefonszám",
    },
    {
        accessorKey: "name",
        header: "Név",
        accessorFn: row => row.employee?.name || "-",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "axapta_name",
        header: "Axapta név",
        accessorFn: row => row.employee?.axapta_name || "-",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "cost_center",
        header: "Cost Center",
        accessorFn: row => row.employee?.cost_center || "-",
        cell: info => info.getValue(),
    },

]