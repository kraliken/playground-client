"use client"

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Copy, Files, Mail } from "lucide-react";

export const completeColumns = [
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
        accessorKey: "tax_number",
        header: "Adószám",
        accessorFn: row => row.partner_data?.tax_number || "-",
        cell: info => info.getValue(),
    },
    {
        header: "Számlák",
        accessorFn: row => row.invoices ?? [],
        cell: info => {
            const invoices = info.getValue();
            if (!invoices.length) return <span className="text-muted-foreground">0</span>;
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="px-2 h-7 flex gap-1 items-center"
                        >
                            <Files className="w-4 h-4" />
                            <span className="font-medium">{invoices.length}</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                        <div className="font-medium mb-2 text-primary">Számlák:</div>
                        <div className="flex flex-col gap-1">
                            {invoices.map((inv, i) => (
                                <span key={inv.id || i} className="text-xs break-all">
                                    {inv.filename}
                                </span>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            );
        }
    },
]