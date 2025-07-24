"use client"

import ActionsCell from "./ActionCell"

export const emailColumns = [
    {
        accessorKey: "email",
        header: "E-mail",
    },
    {
        accessorKey: "type",
        header: "Típus",
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionsCell row={row} />
    }
]