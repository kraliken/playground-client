"use client"

import { CirclePlus, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useState } from "react"
import DeletePartnerAlertDialog from "./DeletePartnerAlertDialog"
import EditPartnerDialog from "./EditPartnerDialog"
import AddRecipientDialog from "./AddRecipientDialog"
import AddCarbonCopyDialog from "./AddCarbonCopyDialog"
// import EditTodoSheet from "../sheets/EditTodoSheet"
// import EditTodoForm from "../forms/EditTodoForm"
// import DeleteTodoAlertDialog from "./DeleteTodoAlertDialog"
// import TodoViewDialog from "../todo/TodoViewDialog"

const ActionsCell = ({ row }) => {

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isAddRecipientDialogOpen, setIsAddRecipientDialogOpen] = useState(false);
    const [isAddCarbonCopyDialogOpen, setIsAddCarbonCopyDialogOpen] = useState(false);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const [isTodoViewOpen, setIsTodoViewOpen] = useState(false);

    const handleEditClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false); // Dropdown bezárása
        setIsEditDialogOpen(true);
    };
    const handleAddRecipientClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false); // Dropdown bezárása
        setIsAddRecipientDialogOpen(true);
    };
    const handleAddCarbonCopyClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false); // Dropdown bezárása
        setIsAddCarbonCopyDialogOpen(true);
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false); // Dropdown bezárása
        setIsAlertDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsEditDialogOpen(false);
    };

    return (
        <div className="flex items-center gap-2">
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left" align="center">
                    <DropdownMenuItem onClick={handleAddRecipientClick}>
                        <CirclePlus />
                        Címzett
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleAddCarbonCopyClick}>
                        <CirclePlus />
                        Másolatot kap
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleEditClick}>
                        <Pencil />
                        Szerkesztés
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDeleteClick}>
                        <Trash2 />
                        Törlés
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeletePartnerAlertDialog
                partner={row.original}
                isOpen={isAlertDialogOpen}
                onOpenChange={setIsAlertDialogOpen}
            />
            <EditPartnerDialog
                partner={row.original}
                isOpen={isEditDialogOpen}
                onOpenChange={handleCloseDialog}
            />
            <AddRecipientDialog
                partner={row.original}
                isOpen={isAddRecipientDialogOpen}
                onOpenChange={() => setIsAddRecipientDialogOpen(false)}
            />
            <AddCarbonCopyDialog
                partner={row.original}
                isOpen={isAddCarbonCopyDialogOpen}
                onOpenChange={() => setIsAddCarbonCopyDialogOpen(false)}
            />
            {/*
            <TodoViewDialog
                todo={row.original}
                isOpen={isTodoViewOpen}
                onOpenChange={setIsTodoViewOpen}
            />

            <EditTodoSheet
                title="Edit Todo"
                triggerLabel="Edit"
                isOpen={isEditSheetOpen}
                onOpenChange={setIsEditSheetOpen}
            >
                <EditTodoForm todo={row.original} />
            </EditTodoSheet> */}
        </div>
    );
};

export default ActionsCell