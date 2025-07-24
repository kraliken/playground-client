"use client"

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Copy, Files, Mail } from "lucide-react";

export const incompleteColumns = [
    {
        accessorKey: "partner_data.name",
        header: "Partner neve",
        accessorFn: row => row.partner_data?.name || "-",
        cell: info => info.getValue(),
    },
    {
        header: "Címzettek (TO)",
        accessorFn: row =>
            row.partner_data?.emails?.filter(e => e.type === "to") ?? [],
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
        header: "Másolat (CC)",
        accessorFn:
            row =>
                row.partner_data?.emails?.filter(e => e.type === "cc") ?? [],
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
        accessorKey: "partner_tax_id",
        header: "Adószám",
    },
    {
        accessorKey: "filename",
        header: "Számla",
    },
]