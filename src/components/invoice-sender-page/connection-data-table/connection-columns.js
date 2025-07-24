"use client"

import { Badge } from "@/components/ui/badge";
import ActionsCell from "./ActionCell";

export const connectionColumns = [
    {
        accessorKey: "partner_name",
        header: "Partner neve",
    },
    {
        accessorKey: "email",
        header: "E-mail",
    },
    {
        accessorKey: "type",
        header: "Típus",
        cell: ({ row }) => {
            const type = row.original.type;
            if (type === "to") {
                return <Badge variant="secondary">címzett</Badge>;
            }
            if (type === "cc") {
                return <Badge variant="outline ">másolatot kap</Badge>;
            }
            return null;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionsCell row={row} />
    }
]