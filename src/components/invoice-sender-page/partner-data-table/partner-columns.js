"use client"

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Copy, Mail } from "lucide-react";
import ActionsCell from "./ActionCell";

export const partnerColumns = [
    {
        accessorKey: "name",
        header: "Partner neve",
    },
    {
        accessorKey: "tax_number",
        header: "Adószám",
    },
    {
        header: "Címzett (TO)",
        accessorFn: row =>
            row.emails?.filter(e => e.type === "to") ?? [],
        cell: info => {
            const emails = info.getValue();
            if (!emails.length) return <span className="text-muted-foreground">0</span>;
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="px-2 h-7 flex gap-1 items-center"
                        >
                            <Mail className="w-4 h-4" />
                            {emails.length}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                        <div className="font-medium mb-2 text-primary">Címzettek (TO):</div>
                        <div className="flex flex-col gap-1">
                            {emails.map((e, i) => (
                                <span key={e.id || i} className="text-xs break-all">{e.email}</span>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            );
        }
    },
    {
        header: "Másolatot kap (CC)",
        accessorFn:
            row =>
                row.emails?.filter(e => e.type === "cc") ?? [],
        cell: info => {
            const emails = info.getValue();
            if (!emails.length) return <span className="text-muted-foreground">0</span>;
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="px-2 h-7 flex gap-1 items-center"
                        >
                            <Copy className="w-4 h-4" />
                            {emails.length}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="">
                        <div className="font-medium mb-2 text-primary">Másolat (CC):</div>
                        <div className="flex flex-col gap-1">
                            {emails.map((e, i) => (
                                <span key={e.id || i} className="text-xs break-all">{e.email}</span>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            );
        }
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionsCell row={row} />
    }
]